var Start = function() {
    this.elementHtml = new Array();
    this.containerId = 'system-workshop';
    this.isOpen = false;
    this.content;
    this.desktopShow = function() {};
    this.desktopHide = function() {};
}

Start.prototype.get = function() {

    var view = new View();
    view.setElementById(['start-button-close', 'start-container', 'start-content']);
    var container = view.render('view/vendor/system/start/default.twig');
    this.elementHtml = view.getElementById();

    this.elementHtml['start-content'].appendChild(this.content);
    this.elementHtml['start-button-close'].addEventListener("click", this.close.bind(this), false);
    this.elementHtml['layer'] = document.getElementById(this.containerId);
    this.elementHtml['layer'].appendChild(container);
    this.elementHtml['layer'].addEventListener("animationend", this.showHidden.bind(this), false);
}



Start.prototype.showHidden = function() {
    if (this.isOpen) {
        this.elementHtml['start-container'].style.display = 'block';
    } else {
        this.elementHtml['start-container'].style.display = 'none';
    }
}


Start.prototype.open = function() {
    this.elementHtml['start-container'].classList.remove('start-container-close');
    this.elementHtml['start-container'].classList.add('start-container-open');
    this.isOpen = true;
    this.desktopShow();
}


Start.prototype.close = function() {
    this.elementHtml['start-container'].classList.remove('start-container-open');
    this.elementHtml['start-container'].classList.add('start-container-close');
    this.isOpen = false;
    this.desktopHide();
}

Start.prototype.go = function() {
    this.elementHtml['start-container'].style.display = 'block';
    if (this.isOpen == false) {
        this.open();
    } else {
        this.close();
    }
}