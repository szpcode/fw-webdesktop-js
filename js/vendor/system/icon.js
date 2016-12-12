var Icon = function() {
    this.id = '';
    this.list = new Array();
    this.height = 100;
    this.eventAll;
    this.template = 'default';
    this.theme = 'light' // dark | light
    this.elementHtml = new Array();
    this.align = 'horizontal';
}

Icon.prototype.set = function(icon) {
    this.list.push(icon);
}

Icon.prototype.get = function() {
    
    var el = new Array();
    for (var i = 0; i < this.list.length; i++) {
        el.push('icon-'+ i);
    }
    
    var view = new View(); 
    view.setElementById(el);
    var content = view.render('view/vendor/system/icon/'+ this.template +'.twig', {list: this.list, height: this.height, theme: this.theme, align: this.align});
    this.elementHtml = view.getElementById();

    for (var i = 0; i < this.list.length; i++) {
        this.elementHtml['icon-'+ i].addEventListener("click", this.list[i].event, false);
    }

    return content;
}