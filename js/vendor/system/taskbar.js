Taskbar = function() {
  this.isOpen = false;
  // this.applications = Array();
  // this.lastApplication = false;
}

Taskbar.prototype.setApplication = function(htmlId, application) { 
  document.getElementById('system-button-window-manager').addEventListener("click", function() { wm.go(); }, false);
  document.getElementById('system-button-start').addEventListener("click", function() { start.go(); wm.isOpen = false; wm.elementHtml['window-manager'].style.display = 'none'; }, false);
  
  document.getElementById('system-taskbar-button-left').addEventListener("click", function() { start.isOpen = false; start.elementHtml['start-container'].style.display = 'none'; });
	
  // this.applications[htmlId] = application;
}

