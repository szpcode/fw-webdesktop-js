var TestTabBoxController = function() {
}

TestTabBoxController.prototype.showAction = function(arg) {    
    console.log('TestTabBoxController');
    var tabBox = new TabBox();
    tabBox.setTab('HTML', '1asdfasf');
    tabBox.setTab('CSS', '2asdfasf');
    tabBox.setTab('JS', '3asdfasf');
    tabBox.setTab('ddd', '<span style="color: red;">4asdfasf</span>');
    tabBox.setTab('eee', '5asdfasf');
    container = tabBox.get();
    
    var win = new SystemWindow();
    win.title = 'TabBox testing';
    win.content = container;
    win.positionX = 'center';
    win.positionY = 'center';
    win.width = 300;
    win.height = 300;
    win.resize = true;
    win.maximize = true;
    win.show.buttonMaximize = true;

    wm.setWindow(win);    
}