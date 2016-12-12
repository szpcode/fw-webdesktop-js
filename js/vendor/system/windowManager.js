var WindowManager = function() {
    this.template = 'slim';
    this.windows = new Array();
    this.uid = 0;
    this.zIndex = 0;
    this.windowLast;
    this.sid = new Set();
    this.elementHtml = new Array();
    this.wallpaper;
    this.minimalize = new Array();
    this.id = 'system-workshop';
    this.isOpen = false;
    this.type = 'title'; // 'small window', 'title'
}

WindowManager.prototype.setWallpaper = function(wallpaper) {
    this.wallpaper = wallpaper;
}

WindowManager.prototype.setWindow = function(window) {
    if (window.sid != undefined) {

        if (this.sid.has(window.sid)) {
            for (var key in this.windows) {
                if (this.windows[key].sid == window.sid) {
                    window = this.windows[key];
                    window.setZIndex(this.zIndex);
                }
            }
        } else {
            window.id = this.id + this.uid;
            window.desktopId = this.id;
            window.create();
            window.setZIndex(this.zIndex);
            this.windows.unshift(window);
            document.getElementById('system-window-' + window.id).addEventListener("mousedown", this.eventZIndex.bind(this, window), false);
            document.getElementById('system-window-' + window.id + '-close').addEventListener("mousedown", this.windowClose.bind(this, window), false);
            this.sid.add(window.sid);
            this.uid++;
        }

    } else {
        window.id = this.id + this.uid;
        window.desktopId = this.id;
        window.create();
        window.setZIndex(this.zIndex);
        this.windows.unshift(window);
        document.getElementById('system-window-' + window.id).addEventListener("mousedown", this.eventZIndex.bind(this, window), false);
        document.getElementById('system-window-' + window.id + '-close').addEventListener("mousedown", this.windowClose.bind(this, window), false);
        this.uid++;
    }

    // if (window.sid == undefined) {
    // for (var key in this.windows) {
    // if (this.windows[key].active == true) {
    // this.windowLast = this.windows[key];
    // }
    // }
    // }

    if (this.windowLast == undefined) {
        this.windowLast = this.windows.slice(-1)[0];
        this.windowLast.setActive();
        this.windowLast.eventShow();
    } else {
        this.windowLast.setUnactive();
        this.windowLast = window;
        window.eventShow();
        window.setActive();
    }

    this.windowLast = window;
    this.zIndex++;
}

WindowManager.prototype.eventZIndex = function(window, e) {

    // this.windowLast
    // console.log('windowLast:');
    // console.log(this.windowLast);
    // console.log('windowLastId:');
    // console.log(this.windowLast.id);
    // console.log('window:');
    // console.log(window);
    // console.log('windowId:');
    // console.log(window.id);

    this.zIndex++;
    window.zIndex = this.zIndex;
    window.eventZIndex(e);
    if (this.windowLast.id != window.id) {
        this.windowLast.setUnactive();
        window.setActive();
    }
    this.windowLast = window;
}

WindowManager.prototype.openWindow = function() {
    this.elementHtml['window-manager'].style.display = 'none';
}

WindowManager.prototype.eventActiveWindow = function(window, e) {

    this.close();
    this.openWindow();
    window.eventZIndex(e);
    this.eventZIndex(window, e);
    window.eventShow();
}

WindowManager.prototype.close = function() {
    this.elementHtml['window-manager'].style.display = 'none';
    this.isOpen = false;
    this.showOpenWindows();
}

WindowManager.prototype.windowClose = function(window, wm) {
    window.eventClose();

    if (window.sid != undefined) {
        this.sid.delete(window.sid);
    }

    for (var key in this.windows) {
        if (this.windows[key] == window) {
            delete this.windows[key];
        }
    }

    if (wm == true) {
        if (this.type == 'small window') {
            this.close();
        }
        this.open();
    }
}

WindowManager.prototype.windowSizeMaximize = function(window, e) {
    this.showOpenWindows();
    this.close();
    this.eventActiveWindow(window, e)
    window.setSizeMaximize();
}

WindowManager.prototype.windowSizeDefault = function(window, e) {
    this.showOpenWindows();
    this.close();
    this.eventActiveWindow(window, e)
    window.setSizeDefault();
}

WindowManager.prototype.showOpenWindows = function() {
    for (var key in this.windowHide) {
        var nr = this.windowHide[key];
        this.windows[nr].eventMinimize();
    }
    
    for (var key in this.windowShow) {
        var nr = this.windowShow[key];
        this.windows[nr].eventShow();
    }
}

WindowManager.prototype.open = function() {
    this.elementHtml['window-manager'].style.display = 'block';
    
    this.elementHtml['layer'] = this.elementHtml['window-manager'].parentElement;
    
    this.isOpen = true;
    this.windowHide = new Array();
    this.windowShow = new Array();
    for (var key in this.windows) {
        if (this.windows[key].minimize == true) {
            this.windowHide.push(key);
        } else {
            this.windowShow.push(key);
        }
        
        if (this.type == 'small window') {
            this.windows[key].eventShow();
        }
        
        if (this.type == 'title') {
            this.windows[key].eventMinimize();   
        }
    }

    for (var key in this.windows) {
        if (this.windows[key].close == true) {
            delete this.windows[key];
        }
    }
    
    var width = this.elementHtml['layer'].offsetWidth;
    var height = this.elementHtml['layer'].offsetHeight;
    var elementHtml = new Array();
    
    if (this.type == 'small window') {
        this.elementHtml['window-manager-scale'].innerHTML = '';
    }
    
    if (this.type == 'title') {
        this.elementHtml['window-manager-content'].innerHTML = '';
    }
    
    for (var key in this.windows) {
        var view = new View();
        view.setElementById([
            'window-manager-size-default', 
            'window-manager-size-maximize',
            'window-manager-close'
        ]);
        
        if (this.type == 'title') {
            view.setElementById([
                'window-manager-item'
            ]);    
            
        }
        

        if (this.type == 'small window') {
            var windowContent = this.windows[key].elementHtml['system_window'].outerHTML;
            windowContent = windowContent.replace(/id="[^"]+"/gi, "");
            windowContent = windowContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
            
            var content = view.render('view/vendor/system/windowManager/'+ this.template +'.twig', {width: width, height: height, window: this.windows[key], windowContent: windowContent}, { block: 'item'});
        }
        
        if (this.type == 'title') {
            var content = view.render('view/vendor/system/windowManager/'+ this.template +'.twig', {window: this.windows[key]}, { block: 'item'}); 
        }
        
        elementHtml = view.getElementById();
        

        elementHtml['window-manager-close'].addEventListener("click", this.windowClose.bind(this, this.windows[key], true), false);
        
        
        if (this.windows[key].maximize == true) {
            elementHtml['window-manager-size-default'].addEventListener("click", this.windowSizeDefault.bind(this, this.windows[key]), false);
        } else {
            elementHtml['window-manager-size-maximize'].addEventListener("click", this.windowSizeMaximize.bind(this, this.windows[key]), false);
        }
        
        if (this.type == 'title') {
 
            elementHtml['window-manager-item'].addEventListener("click", this.eventActiveWindow.bind(this, this.windows[key]), false); 
        }
        
        if (this.type == 'small window') {
            this.elementHtml['window-manager-scale'].appendChild(content);
        }
        
        if (this.type == 'title') {
            this.elementHtml['window-manager-content'].appendChild(content);  
        }
    }

    if (this.type == 'small window') {
        this.showOpenWindows();
    }
    
    if (this.type == 'small window') {
        var height = this.elementHtml['window-manager-scale'].offsetHeight / 2;
        this.elementHtml['window-manager-content'].style.height = height + 'px';
    }

    $(this.elementHtml['window-manager-container']).mCustomScrollbar({
        scrollInertia: 100,
        alwaysShowScrollbar: 1,
        theme: "system"
    });

}

WindowManager.prototype.go = function() {
    if (this.isOpen == true) {
        this.close();
    } else {
        this.open();
    }
}

WindowManager.prototype.get = function() {
    var view = new View();
    view.setElementById([
        'window-manager', 
        'window-manager-container',
        'window-manager-close',
        'window-manager-content'

    ]);
    
    if (this.type == 'small window') {
        view.setElementById([
            'window-manager-scale'
        ]);
    }
    
    var data = {};
    if (this.type == 'small window') {
        data = { wallpaper: this.wallpaper };
    }
    var content = view.render('view/vendor/system/windowManager/'+ this.template +'.twig', data, { block: 'content'});

    this.elementHtml = view.getElementById();

    this.elementHtml['window-manager-close'].addEventListener("click", this.close.bind(this), false);
    
    document.getElementById(this.id).appendChild(content);
}