var TestWindowController = function() {
}

TestWindowController.prototype.showAction = function(arg) {     

    var win = new SystemWindow();
    win.title = 'Window testing';
    win.content = '<div></div>';
    win.positionX = 'center';
    win.positionY = 'center';
    win.width = 300;
    win.height = 300;
    win.resize = true;
    win.show.buttonMaximize = true;

    wm.setWindow(win);    
}