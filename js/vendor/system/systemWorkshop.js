var SystemWorkshop = function(idContent) {
    this.idContent = idContent;
    this.elementHtml = new Array();
    this.elementHtml['layer'] = document.getElementById(this.idContent);
    this.layer;
}

SystemWorkshop.prototype.setLayer = function(layer) {
    this.layer = layer.get();
}

SystemWorkshop.prototype.get = function() {
    this.elementHtml['layer'].appendChild(this.layer);
}

