var Menu = function() {
    this.list = new Array();
	this.itemActive;
    this.classCss = 'skeleton-menu-left';
    this.contentId = '';
}

Menu.prototype.setItem = function(name, event, classIcon) {
  var item = document.createElement("li");
	item.classList.add('system-menu-item');
	if (classIcon != undefined) {
		var icon = document.createElement("i");
		icon.classList.add('fa');
		icon.classList.add(classIcon);
		item.appendChild(icon);
	}
	item.appendChild(document.createTextNode(name));
	item.addEventListener('click', event, false);
	item.addEventListener("click", this.setItemActive.bind(this, item), false);
    this.list.push(item);
}

Menu.prototype.setItemActive = function(item) {
	if (this.itemActive != undefined) {
		this.itemActive.classList.remove(this.classCss +'-link-active');
	}
	this.itemActive = item;
	this.itemActive.classList.add(this.classCss +'-link-active');
}

Menu.prototype.get = function() {
  var list = document.createElement("ul");
	list.classList.add(this.classCss +'-content');
	
	for (var key in this.list) {
		list.appendChild(this.list[key]);
	}
	
    if (this.contentId != '') {
        this.contentId.appendChild(list);
        return true;
    }
    
	return list;
}
