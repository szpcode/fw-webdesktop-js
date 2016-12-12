var TabBox = function() {
    this.active;
    this.elementHtml = new Array();
    this.tab = new Array();
    this.id = '';
    this.template = 'default';
}

TabBox.prototype.setTab = function(name, content) {
    this.tab.push({name: name, content: content});
}

TabBox.prototype.renderTab = function(tabName) {
    var view = new View();
    view.setElementById([
        'tabBox-tab'
    ]);
    var tab = view.render('view/vendor/system/tabBox/'+ this.template +'.twig', {name: tabName, template: this.template}, { block: 'tab'});
    var elementHtml = view.getElementById();
    this.elementHtml['tab'][tabName] = elementHtml['tabBox-tab'];
    this.elementHtml['tab'][tabName].addEventListener("click", this.buttonActive.bind(this, tabName), false);
    return tab;
}

TabBox.prototype.renderContent = function(name, content) {
    var view = new View();
    view.setElementById([
        'tabBox-content'
    ]); 
    var content = view.render('view/vendor/system/tabBox/'+ this.template +'.twig', {content: content, template: this.template}, { block: 'content'});
    var elementHtml = view.getElementById();
    this.elementHtml['content'][name] = elementHtml['tabBox-content'];
    
    return content;
}

TabBox.prototype.buttonActive = function(name) {

    this.elementHtml['content'][this.active].style.display = 'none';
    this.elementHtml['tab'][this.active].classList.remove('tabBox-'+ this.template +'-button-active');
    
    this.elementHtml['content'][name].style.display = 'block';
    this.elementHtml['tab'][name].classList.add('tabBox-'+ this.template +'-button-active');
    
    this.active = name;
    
}

TabBox.prototype.get = function() {
    Asset.addLess('vendor/system/tabBox/'+ this.template +'.less');
    
    var view = new View();
    view.setElementById([
        'tabBox-content', 
        'tabBox-tab',
        'tabBox-container'
    ]);
    
    var container = view.render('view/vendor/system/tabBox/'+ this.template +'.twig', {template: this.template}, { block: 'container'});
    this.elementHtml = view.getElementById();
    this.elementHtml['tab'] = new Array();
    this.elementHtml['content'] = new Array();
    
    for (var key in this.tab) {
        if (this.active == undefined) {
            this.active = this.tab[key].name;
        }
        
        var tab = this.renderTab(this.tab[key].name);
        this.elementHtml['tabBox-tab'].appendChild(tab);
        
        var content = this.renderContent(this.tab[key].name, this.tab[key].content);
        this.elementHtml['tabBox-content'].appendChild(content);
    }
    
    this.buttonActive(this.active);

    if (this.id != '') {
        document.getElementById(this.id).appendChild(container);
        return true;
    }
    
    return container;
}

