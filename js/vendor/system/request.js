var Request = function() {
	this.value = new Array();
}

Request.prototype.setValue = function(name, value) {
	var stringUtils = new StringUtils();
	var id = stringUtils.random(20);
	
	this.value[name] = { id: id, value: value };
}

Request.prototype.getValue = function(name) {
	return this.value[name].value;
}

Request.prototype.getId = function(name) {
	return this.value[name].id;
}

Request.prototype.get = function() {
	return this.value;
}