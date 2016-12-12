var Desktop = function() {
  this.wallpaper = 'img/system/desktop/wallpaper/2.jpg';
  this.id = 'system-desktop';
  this.elementHtml = new Array();
}

Desktop.prototype.setWallpaper = function(wallpaper) {
  this.wallpaper = wallpaper;
}

Desktop.prototype.getWallpaper = function() {
  return this.wallpaper;
}

Desktop.prototype.show = function() {
  this.elementHtml['desktop'].style.zIndex = 900;
}
Desktop.prototype.hide = function() {
  this.elementHtml['desktop'].style.zIndex = 0;
}

Desktop.prototype.get = function() {
  this.elementHtml['desktop'] = document.getElementById(this.id);
  this.elementHtml['desktop'].style.backgroundImage = 'url('+ this.wallpaper +')';
}