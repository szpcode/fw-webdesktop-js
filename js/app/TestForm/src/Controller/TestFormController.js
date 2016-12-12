var TestFormController = function() {
  this.elementHtml = {};
  this.num = 0;
}

TestFormController.prototype.showAction = function(arg) {

    var view = new View();
    view.setElementById(['button', 'content', 'container', 'datetime', 'text', 'field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7', 'field8', 'field9', 'field10', 'field11', 'field12', 'field13']);
    x = '<div id="x" style="width: 100px; height: 100px; background: red;"></div>';
    var container = view.render('view/app/Test/src/Controller/Form/showAction.twig', {'x': x});
    // >>>>>>>>>> document.getElementById('x').addEventListener("click", function() { alert('x') }, false);
    this.elementHtml = view.getElementById();
    // >>>>>>>>>> this.elementHtml['button'].addEventListener("click", this.www.bind(this), false);
    
    var win = new SystemWindow();
    win.title = 'Test form';
    win.content = container;
    win.positionX = 'center';
    win.positionY = 'center';
    win.width = 300;
    win.height = 300;
    win.resize = true;
    win.show.buttonMaximize = true;

    wm.setWindow(win);    
    

}

TestFormController.prototype.www = function(arg) {
  this.num++;
  // console.log(this.num);
  // console.log(this.elementHtml);
  


    var diag = new SystemWindow();
    diag.title = 'Narzędzia dew '+ this.num;
    diag.template = 'diagram';
    diag.positionX = this.elementHtml['container'].scrollLeft + 50;
    diag.positionY = this.elementHtml['container'].scrollTop + 50;
    diag.minWidth = 70;
    diag.minHeight = 50;
    diag.width = 100;
    diag.height = 100;
    diag.resize = true;
    diag.show.buttonMaximize = false;
    // console.log(diag);
    this.wm.setWindow(diag);
}