var SystemWindow = function() {
    this.id;
    this.sid;
    this.title;
    this.positionX;
    this.positionY;
    this.content = '';
    this.width;
    this.height;
    this.minWidth = 300;
    this.minHeight = 300;
    this.elementHtml = new Array();
    this.pointX;
    this.pointY;
    this.eventMove;
    this.eventMoveStop;
    this.eventResize;
    this.eventResizeBottom;
    this.eventResizeBottomStop;
    this.eventResizeRight;
    this.eventResizeRightStop;
    this.eventResizeLeft;
    this.eventResizeLeftStop;
    this.edges = {
        n: true,
        nw: true,
        w: true,
        sw: true,
        s: true,
        se: true,
        e: true,
        ne: true
    };
    this.zIndex = 0;
    this.maximize = false;
    this.minimize = false;
    this.close = false;
    this.resize = true;
    this.desktopId = "system-desktop";
    this.show = {
        buttonClose: true,
        buttonMinimize: true,
        buttonMaximize: true
    };
    this.callbackResize = function() {};
    this.callbackClose = function() {};
    this.template = "default";
    this.contentScroll = true;
    this.blank = false;
}

SystemWindow.prototype.setUnactive = function() {
    this.elementHtml['system_window'].classList.remove('system-window-'+ this.template +'-active');
    this.elementHtml['system_window'].classList.add('system-window-'+ this.template +'-unactive');
}

SystemWindow.prototype.setActive = function() {
    this.elementHtml['system_window'].classList.remove('system-window-'+ this.template +'-unactive');
    this.elementHtml['system_window'].classList.add('system-window-'+ this.template +'-active');
}

SystemWindow.prototype.create = function() {
    if (arguments.callee.loadTemplate == undefined) {
        var template = twig({
            id: 'template',
            cache: true,
            href: 'view/vendor/system/window/'+ this.template +'.twig',
            async: false
        });
    }
    arguments.callee.loadTemplate = arguments.callee.loadTemplate || true;

    this.elementHtml['system_desktop'] = document.getElementById(this.desktopId);

    if (this.positionX == 'center') {
        this.positionX = (this.elementHtml['system_desktop'].offsetWidth / 2) - (this.width / 2);
    }

    if (this.positionX == 'left') {
        this.positionX = 0;
    }

    if (this.positionX == 'right') {
        this.positionX = this.elementHtml['system_desktop'].offsetWidth - this.width;
    }

    if (this.positionY == 'top') {
        this.positionY = 0;
    }

    if (this.positionY == 'bottom') {
        this.positionY = this.elementHtml['system_desktop'].offsetHeight - this.height;
    }

    if (this.positionY == 'center') {
        this.positionY = (this.elementHtml['system_desktop'].offsetHeight / 2) - (this.height / 2);
    }

    var data = {
        id: this.id,
        title: this.title,
        show: this.show,
        content: '',
        positionX: this.positionX,
        positionY: this.positionY,
        width: this.width,
        template: this.template,
        height: this.height
    }

    var html = twig({
        ref: 'template',
        cache: true
    }).render(data);

    if (this.desktopId != "") {
        var desktop = this.elementHtml['system_desktop'];
        
        desktop.insertAdjacentHTML('beforeend', html);
        this.bind();

        if (typeof(this.content) == 'object') {
            this.elementHtml['system_window_content'].appendChild(this.content);
        } else {
            this.elementHtml['system_window_content'].innerHTML = this.content;
        }
    }

    if (this.contentScroll) {
        $(this.elementHtml['system_window_content']).mCustomScrollbar({
            scrollInertia: 100,
            theme: "system"
        }); 
    }

    return html;
}

SystemWindow.prototype.blankActive = function() {
    if (this.blank == true) {
        this.elementHtml['system_window_content'].style.display = 'none';
    }
}

SystemWindow.prototype.blankUnactive = function() {
    this.elementHtml['system_window_content'].style.display = 'block';
}

SystemWindow.prototype.bind = function() {
    this.elementHtml['system_window'] = document.getElementById('system-window-' + this.id);
    this.elementHtml['system_window_left'] = document.getElementById('system-window-' + this.id + '-left');
    this.elementHtml['system_window_content'] = document.getElementById('system-window-' + this.id + '-content');
    this.elementHtml['system_window_right'] = document.getElementById('system-window-' + this.id + '-right');
    this.elementHtml['system_window_top'] = document.getElementById('system-window-' + this.id + '-top');
    this.elementHtml['system_window_bottom'] = document.getElementById('system-window-' + this.id + '-bottom');
    this.elementHtml['system_window_bottom_right'] = document.getElementById('system-window-' + this.id + '-bottom-right');
    this.elementHtml['system_window_bottom_left'] = document.getElementById('system-window-' + this.id + '-bottom-left');
    this.elementHtml['system_window_top_right'] = document.getElementById('system-window-' + this.id + '-top-right');
    this.elementHtml['system_window_top_left'] = document.getElementById('system-window-' + this.id + '-top-left');
    this.elementHtml['system_window_title'] = document.getElementById('system-window-' + this.id + '-title');
    this.elementHtml['system_window_container'] = document.getElementById('system-window-' + this.id + '-container');

    if (this.resize == true) {
        this.elementHtml['system_window_right'].addEventListener("mousedown", this.eventResizeRightStart.bind(this), false);
        this.elementHtml['system_window_bottom'].addEventListener("mousedown", this.eventResizeBottomStart.bind(this), false);
        this.elementHtml['system_window_left'].addEventListener("mousedown", this.eventResizeLeftStart.bind(this), false);
        this.elementHtml['system_window_top'].addEventListener("mousedown", this.eventResizeTopStart.bind(this), false);
        this.elementHtml['system_window_bottom_right'].addEventListener("mousedown", this.eventResizeBottomRightStart.bind(this), false);
        this.elementHtml['system_window_bottom_left'].addEventListener("mousedown", this.eventResizeBottomLeftStart.bind(this), false);
        this.elementHtml['system_window_top_right'].addEventListener("mousedown", this.eventResizeTopRightStart.bind(this), false);
        this.elementHtml['system_window_top_left'].addEventListener("mousedown", this.eventResizeTopLeftStart.bind(this), false);
    } else {
        this.edges = {
            n: false,
            nw: false,
            w: false,
            sw: false,
            s: false,
            se: false,
            e: false,
            ne: false
        };
    }

    if (this.show.buttonClose == true) {
        this.elementHtml['system_window_close'] = document.getElementById('system-window-' + this.id + '-close');
        this.elementHtml['system_window_close'].addEventListener("click", this.eventClose.bind(this), false);
    }

    if (this.show.buttonMaximize == true) {
        this.elementHtml['system_window_maximize'] = document.getElementById('system-window-' + this.id + '-maximize');
        this.elementHtml['system_window_maximize'].addEventListener("click", this.eventMaximize.bind(this), false);
        this.resizeEnable(this.edges.n, this.edges.nw, this.edges.w, this.edges.sw, this.edges.s, this.edges.se, this.edges.e, this.edges.ne);
    }

    if (this.show.buttonMinimize == true) {
        this.elementHtml['system_window_minimize'] = document.getElementById('system-window-' + this.id + '-minimize');
        this.elementHtml['system_window_minimize'].addEventListener("click", this.eventMinimize.bind(this), false);
    }

    this.elementHtml['system_window_title'].addEventListener("mousedown", this.eventMoveStart.bind(this), false);

    this.maximizeEnable(this.maximize);

    if (this.show.buttonMaximize == true) {
        if (this.maximize == false) {
            this.elementHtml['system_window_maximize'].classList.add('system-window-'+ this.template +'-button-type-min');
        } else {
            this.elementHtml['system_window_maximize'].classList.add('system-window-'+ this.template +'-button-type-max');
        }
    }

    if (this.minimize == true) {
        this.elementHtml['system_window'].style.display = 'none';
    } else {
        this.elementHtml['system_window'].style.display = 'flex';
    }

}

SystemWindow.prototype.eventClose = function() {
    this.elementHtml['system_window'].remove();
    this.close = true;
    this.callbackClose();
}

SystemWindow.prototype.eventMinimize = function() {
    this.elementHtml['system_window'].style.display = 'none';
    this.minimize = true;
}

SystemWindow.prototype.eventShow = function() {
    this.elementHtml['system_window'].style.display = 'flex';
    this.minimize = false;
}

SystemWindow.prototype.eventMove = function(e) {
    var positionX = e.clientX - this.pointX + this.positionX;
    var positionY = e.clientY - this.pointY + this.positionY;
    this.elementHtml['system_window'].style.left = positionX + 'px';
    this.elementHtml['system_window'].style.top = positionY + 'px';
    this.elementHtml['system_window'].style.right = 'auto';
    this.elementHtml['system_window'].style.bottom = 'auto';
}

SystemWindow.prototype.eventMoveStart = function(e) {
    if (this.maximize == true) return false;
    e.preventDefault();
    this.blankActive();

    this.elementHtml['system_window'].classList.add('system-window-'+ this.template +'-event-move');

    this.pointX = e.clientX;
    this.pointY = e.clientY;

    var offsets = this.elementHtml['system_window'];
    var window = {};
    window.lef = offsets.offsetLeft;
    window.top = offsets.offsetTop;

    this.positionX = window.lef;
    this.positionY = window.top;

    this.eventMove = this.eventMove.bind(this);
    this.eventMoveStop = this.eventMoveStop.bind(this);
    this.width = this.elementHtml['system_window'].offsetWidth;
    this.height = this.elementHtml['system_window'].offsetHeight;

    document.addEventListener("mousemove", this.eventMove, false);
    document.addEventListener("mouseup", this.eventMoveStop, false);
}

SystemWindow.prototype.eventMoveStop = function(e) {
    this.elementHtml['system_window'].classList.remove('system-window-'+ this.template +'-event-move');
    this.blankUnactive();

    var offsets = this.elementHtml['system_desktop'].getBoundingClientRect();
    var desktop = {};
    desktop.top = offsets.top;
    desktop.left = offsets.left;
    desktop.right = offsets.right;
    desktop.bottom = offsets.bottom;

    var offsets = this.elementHtml['system_window'].getBoundingClientRect();
    var window = {};
    window.left = offsets.left;
    window.right = offsets.right;
    window.top = offsets.top;
    window.bottom = offsets.bottom;

    var positionX = e.clientX - this.pointX + this.positionX;
    var positionY = e.clientY - this.pointY + this.positionY;

    if (this.show.buttonMaximize == true) {
        if (e.clientY <= desktop.top) {
            this.maximize = true;
            this.maximizeEnable(true);
        } else if (e.clientX <= desktop.left) {
            this.maximize = true;
            this.maximizeEnable(true);
            this.elementHtml['system_window'].style.width = '50%';
            this.elementHtml['system_window'].style.height = '100%';
            this.elementHtml['system_window'].style.left = 'auto';
            this.elementHtml['system_window'].style.left = '0px';
            this.elementHtml['system_window'].style.top = '0px';
            this.elementHtml['system_window'].style.bottom = '0px';
        } else if (e.clientX >= desktop.right - 1) {
            this.maximize = true;
            this.maximizeEnable(true);
            this.elementHtml['system_window'].style.width = '50%';
            this.elementHtml['system_window'].style.height = '100%';
            this.elementHtml['system_window'].style.right = '0px';
            this.elementHtml['system_window'].style.left = 'auto';
            this.elementHtml['system_window'].style.top = '0px';
            this.elementHtml['system_window'].style.bottom = '0px';
        } else {
            this.positionX = positionX;
            this.positionY = positionY;
            this.elementHtml['system_window'].style.left = this.positionX + 'px';
            this.elementHtml['system_window'].style.top = this.positionY + 'px';
            this.elementHtml['system_window'].style.right = 'auto';
            this.elementHtml['system_window'].style.bottom = 'auto';
        }
        
        if ((((e.clientX + 1) >= desktop.right) || e.clientX <= desktop.left) && (e.clientY <= desktop.top)) {
            this.maximize = true;
            this.maximizeEnable(true);
            this.elementHtml['system_window'].style.width = '100%';
            this.elementHtml['system_window'].style.height = '50%';
            this.elementHtml['system_window'].style.right = 'auto';
            this.elementHtml['system_window'].style.left = 'auto';
            this.elementHtml['system_window'].style.top = '0px';
            this.elementHtml['system_window'].style.bottom = 'auto';
        }
        
        if ((((e.clientX + 1) >= desktop.right) || e.clientX <= desktop.left) && (e.clientY >= desktop.bottom)) {
            this.maximize = true;
            this.maximizeEnable(true);
            this.elementHtml['system_window'].style.width = '100%';
            this.elementHtml['system_window'].style.height = '50%';
            this.elementHtml['system_window'].style.right = 'auto';
            this.elementHtml['system_window'].style.left = 'auto';
            this.elementHtml['system_window'].style.top = 'auto';
            this.elementHtml['system_window'].style.bottom = '0px';
        }

        if (window.top > desktop.bottom) {
            this.elementHtml['system_window'].style.top = 'auto';
            this.elementHtml['system_window'].style.bottom = '0px';
        }

        this.eventResize();
    } else { // to sprawdzić start
        if (window.right > desktop.right) {
            this.elementHtml['system_window'].style.left = 'auto';
            this.elementHtml['system_window'].style.right = '0px';
        }

        if (window.top < desktop.top) {
            this.elementHtml['system_window'].style.bottom = 'auto';
            this.elementHtml['system_window'].style.top = '0px';
        }

        if (window.bottom > desktop.bottom) {
            this.elementHtml['system_window'].style.top = 'auto';
            this.elementHtml['system_window'].style.bottom = '0px';
        }

        if (window.left < desktop.top) {
            this.elementHtml['system_window'].style.left = '0px';
            this.elementHtml['system_window'].style.right = 'auto';
        }

    } // to sprawdzić stop
    document.removeEventListener("mousemove", this.eventMove, false);
    document.removeEventListener("mouseup", this.eventMoveStop, false);
}

SystemWindow.prototype.eventResize = function() {
    this.elementHtml['system_window_container'].style.width = '100%';
    this.elementHtml['system_window_container'].style.height = '100%';
    // this.elementHtml['system_window_container'].style.width = this.elementHtml['system_window_container'].offsetWidth +'px';
    // this.elementHtml['system_window_container'].style.height = this.elementHtml['system_window_container'].offsetHeight +'px';
    this.callbackResize();
}

SystemWindow.prototype.getCurrentProperties = function() {
    var offsets = this.elementHtml['system_window'];
    var window = {};
    window.lef = offsets.offsetLeft;
    window.top = offsets.offsetTop;

    this.positionX = window.lef;
    this.positionY = window.top

    this.width = this.elementHtml['system_window'].offsetWidth;
    this.height = this.elementHtml['system_window'].offsetHeight;

    this.elementHtml['system_window'].style.left = this.positionX + 'px';
    this.elementHtml['system_window'].style.top = this.positionY + 'px';
    this.elementHtml['system_window'].style.right = 'auto';
    this.elementHtml['system_window'].style.bottom = 'auto';
    this.elementHtml['system_window'].style.width = this.width + 'px';
    this.elementHtml['system_window'].style.height = this.height + 'px';
}

SystemWindow.prototype.eventResizeBottomRightStart = function(e) {
    e.preventDefault();

    this.eventResizeRightStart(e);
    this.eventResizeBottomStart(e);
}

SystemWindow.prototype.eventResizeBottomLeftStart = function(e) {
    e.preventDefault();

    this.eventResizeLeftStart(e);
    this.eventResizeBottomStart(e);
}

SystemWindow.prototype.eventResizeTopRightStart = function(e) {
    e.preventDefault();

    this.eventResizeRightStart(e);
    this.eventResizeTopStart(e);
}

SystemWindow.prototype.eventResizeTopLeftStart = function(e) {
    e.preventDefault();

    this.eventResizeLeftStart(e);
    this.eventResizeTopStart(e);
}

SystemWindow.prototype.eventResizeRightStart = function(e) {
    e.preventDefault();

    var offsets = this.elementHtml['system_window'];
    var window = {};
    window.lef = offsets.offsetLeft;
    window.top = offsets.offsetTop;

    this.positionX = window.lef;
    this.positionY = window.top

    this.width = this.elementHtml['system_window'].offsetWidth;
    this.height = this.elementHtml['system_window'].offsetHeight;

    this.elementHtml['system_window'].style.left = this.positionX + 'px';
    // this.elementHtml['system_window'].style.top = this.positionY +'px';
    this.elementHtml['system_window'].style.right = 'auto';
    this.elementHtml['system_window'].style.bottom = 'auto';
    this.elementHtml['system_window'].style.width = this.width + 'px';
    // this.elementHtml['system_window'].style.height = this.height +'px';

    // this.getCurrentProperties();

    this.pointX = e.clientX;

    this.eventResizeRight = this.eventResizeRight.bind(this);
    this.eventResizeRightStop = this.eventResizeRightStop.bind(this);

    document.addEventListener("mousemove", this.eventResizeRight, false);
    document.addEventListener("mouseup", this.eventResizeRightStop, false);
    this.blankActive();
}

SystemWindow.prototype.eventResizeRight = function(e) {

    var width = this.width + e.clientX - this.pointX;
    width = this.setWidth(width);

    this.elementHtml['system_window'].style.width = width + 'px';
    this.eventResize();
}

SystemWindow.prototype.eventResizeRightStop = function(e) {
    this.width = this.width + e.clientX - this.pointX;
    this.width = this.setWidth(this.width);
    this.elementHtml['system_window'].style.width = this.width + 'px';

    document.removeEventListener("mousemove", this.eventResizeRight, false);
    document.removeEventListener("mouseup", this.eventResizeRightStop, false);
    this.blankUnactive();
}

SystemWindow.prototype.eventResizeBottom = function(e) {
    var height = this.height + e.clientY - this.pointY;
    height = this.setHeight(height);
    this.elementHtml['system_window'].style.height = height + 'px';
    this.eventResize();
}

SystemWindow.prototype.setHeight = function(height) {
    if (height < this.minHeight) {
        height = this.minHeight;
    }
    return height;
}

SystemWindow.prototype.setWidth = function(width) {
    if (width < this.minWidth) {
        width = this.minWidth;
    }
    return width;
}

SystemWindow.prototype.eventResizeBottomStart = function(e) {
    e.preventDefault();

    this.pointY = e.clientY;

    this.getCurrentProperties();

    this.eventResizeBottom = this.eventResizeBottom.bind(this);
    this.eventResizeBottomStop = this.eventResizeBottomStop.bind(this);

    document.addEventListener("mousemove", this.eventResizeBottom, false);
    document.addEventListener("mouseup", this.eventResizeBottomStop, false);
    this.blankActive();
}

SystemWindow.prototype.eventResizeBottomStop = function(e) {
    this.height = this.height + e.clientY - this.pointY;
    this.height = this.setHeight(this.height);

    this.elementHtml['system_window'].style.height = this.height + 'px';

    document.removeEventListener("mousemove", this.eventResizeBottom, false);
    document.removeEventListener("mouseup", this.eventResizeBottomStop, false);
    this.blankUnactive();
}

SystemWindow.prototype.eventResizeLeftStart = function(e) {
    e.preventDefault();

    var offsets = this.elementHtml['system_window'];
    var window = {};
    window.lef = offsets.offsetLeft;
    window.top = offsets.offsetTop;

    this.positionX = window.lef;
    this.positionY = window.top

    this.width = this.elementHtml['system_window'].offsetWidth;
    this.height = this.elementHtml['system_window'].offsetHeight;

    // this.elementHtml['system_window'].style.left = this.positionX +'px';
    // this.elementHtml['system_window'].style.top = this.positionY +'px';
    // this.elementHtml['system_window'].style.right = 'auto';
    // this.elementHtml['system_window'].style.bottom = 'auto';
    this.elementHtml['system_window'].style.width = this.width + 'px';
    // this.elementHtml['system_window'].style.height = this.height +'px';

    // this.getCurrentProperties();

    this.pointX = e.clientX;

    this.eventResizeLeft = this.eventResizeLeft.bind(this);
    this.eventResizeLeftStop = this.eventResizeLeftStop.bind(this);

    document.addEventListener("mousemove", this.eventResizeLeft, false);
    document.addEventListener("mouseup", this.eventResizeLeftStop, false);
    this.blankActive();
}

SystemWindow.prototype.eventResizeLeft = function(e) {
    var width = this.width + this.pointX - e.clientX;
    width = this.setWidth(width);
    if (width > this.minWidth) {
        if (this.elementHtml['system_window'].style.right != '0px') {
            var left = this.positionX + (this.width + e.clientX - this.pointX) - this.width;
            this.elementHtml['system_window'].style.left = left + 'px';
        }
        this.elementHtml['system_window'].style.width = width + 'px';
    }
    this.eventResize();
}

SystemWindow.prototype.eventResizeLeftStop = function(e) {
    this.width = this.width + this.pointX - e.clientX;
    this.width = this.setWidth(this.width);

    var offsets = this.elementHtml['system_window'];
    this.positionX = offsets.offsetLeft;

    document.removeEventListener("mousemove", this.eventResizeLeft, false);
    document.removeEventListener("mouseup", this.eventResizeLeftStop, false);
    this.blankUnactive();
}

SystemWindow.prototype.eventResizeTopStart = function(e) {
    e.preventDefault();

    this.pointY = e.clientY;

    this.getCurrentProperties();

    this.eventResizeTop = this.eventResizeTop.bind(this);
    this.eventResizeTopStop = this.eventResizeTopStop.bind(this);

    document.addEventListener("mousemove", this.eventResizeTop, false);
    document.addEventListener("mouseup", this.eventResizeTopStop, false);
    this.blankActive(); 
}

SystemWindow.prototype.eventResizeTop = function(e) {
    var height = this.height + this.pointY - e.clientY;
    height = this.setHeight(height);
    if (height > this.minHeight) {

        var top = this.positionY + (this.height + e.clientY - this.pointY) - this.height;
        this.elementHtml['system_window'].style.height = height + 'px';
        this.elementHtml['system_window'].style.top = top + 'px';
    }
    this.eventResize();
}

SystemWindow.prototype.eventResizeTopStop = function(e) {
    this.height = this.height + this.pointY - e.clientY;
    this.height = this.setHeight(this.height);

    var offsets = this.elementHtml['system_desktop'];
    var offsets2 = this.elementHtml['system_window'];

    this.positionY = offsets2.offsetTop - offsets.offsetTop;

    document.removeEventListener("mousemove", this.eventResizeTop, false);
    document.removeEventListener("mouseup", this.eventResizeTopStop, false);
    this.blankUnactive();
}

SystemWindow.prototype.eventZIndex = function(e) {
    this.setZIndex(this.zIndex);
}

SystemWindow.prototype.setZIndex = function(zIndex) {
    this.zIndex = zIndex;
    this.elementHtml['system_window'].style.zIndex = this.zIndex;
}

SystemWindow.prototype.maximizeEnable = function(mode) {
    var window = this.elementHtml['system_window'];

    if (mode == true) {
        this.elementHtml['system_window_title'].classList.remove('system-window-'+ this.template +'-move');
        this.elementHtml['system_window'].classList.add('system-window-'+ this.template +'-resize');
        this.resizeEnable(false, false, false, false, false, false, false, false);
        window.style.top = "0px";
        window.style.bottom = "0px";
        window.style.left = "0px";
        window.style.right = "0px";
        window.style.width = '100%';
        window.style.height = '100%';
    } else {
        this.elementHtml['system_window_title'].classList.add('system-window-'+ this.template +'-move');
        this.elementHtml['system_window'].classList.remove('system-window-'+ this.template +'-resize');
        this.resizeEnable(this.edges.n, this.edges.nw, this.edges.w, this.edges.sw, this.edges.s, this.edges.se, this.edges.e, this.edges.ne);
        window.style.top = this.positionY + 'px';
        window.style.bottom = "auto";
        window.style.left = this.positionX + 'px';
        window.style.right = "auto";
        window.style.width = this.width + "px";
        window.style.height = this.height + "px";
    }
}

SystemWindow.prototype.setSizeMaximize = function() {
    this.elementHtml['system_window_maximize'].classList.remove('system-window-'+ this.template +'-button-type-min');
    this.elementHtml['system_window_maximize'].classList.add('system-window-'+ this.template +'-button-type-max');

    this.maximizeEnable(true);
    this.maximize = true;

    this.eventResize();
}

SystemWindow.prototype.setSizeDefault = function() {
    this.elementHtml['system_window_maximize'].classList.remove('system-window-'+ this.template +'-button-type-max');
    this.elementHtml['system_window_maximize'].classList.add('system-window-'+ this.template +'-button-type-min');

    this.maximizeEnable(false);
    this.maximize = false;

    this.eventResize();
}

SystemWindow.prototype.eventMaximize = function() {
    if (this.maximize == false) {
        this.setSizeMaximize();
    } else {
        this.setSizeDefault();
    }
}


SystemWindow.prototype.resizeEnable = function(n, nw, w, sw, s, se, e, ne) {
    if (n == false) {
        this.elementHtml['system_window_top'].style.display = 'none';
    }

    if (nw == false) {
        this.elementHtml['system_window_top_left'].style.display = 'none';
    }

    if (w == false) {
        this.elementHtml['system_window_left'].style.display = 'none';
    }

    if (sw == false) {
        this.elementHtml['system_window_bottom_left'].style.display = 'none';
    }

    if (s == false) {
        this.elementHtml['system_window_bottom'].style.display = 'none';
    }

    if (se == false) {
        this.elementHtml['system_window_bottom_right'].style.display = 'none';
    }

    if (e == false) {
        this.elementHtml['system_window_right'].style.display = 'none';
    }

    if (ne == false) {
        this.elementHtml['system_window_top_right'].style.display = 'none';
    }

    if (n == true) {
        this.elementHtml['system_window_top'].style.display = 'block';
    }

    if (nw == true) {
        this.elementHtml['system_window_top_left'].style.display = 'block';
    }

    if (w == true) {
        this.elementHtml['system_window_left'].style.display = 'block';
    }

    if (sw == true) {
        this.elementHtml['system_window_bottom_left'].style.display = 'block';
    }

    if (s == true) {
        this.elementHtml['system_window_bottom'].style.display = 'block';
    }

    if (se == true) {
        this.elementHtml['system_window_bottom_right'].style.display = 'block';
    }

    if (e == true) {
        this.elementHtml['system_window_right'].style.display = 'block';
    }

    if (ne == true) {
        this.elementHtml['system_window_top_right'].style.display = 'block';
    }
}