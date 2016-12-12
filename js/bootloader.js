window.CKEDITOR_BASEPATH = './js/vendor/ckeditor/';

Asset.addJs('vendor/system/formField/classDateTimeField.js');
Asset.addLess('vendor/system/formField/dateTimeField/default.less');

Asset.addJs('vendor/system/formField/classNumberField.js');
Asset.addLess('vendor/system/formField/numberField/default.less');


Asset.addJs('vendor/system/formField/classSelect2Field.js');
Asset.addLess('vendor/system/formField/select2Field/default.less');


Asset.addCss('vendor/select2/select2.css');
Asset.addJs('vendor/select2/select2.full.min.js');
Asset.addLess('vendor/select2/default.less');


Asset.addJs('vendor/ckeditor/ckeditor.js');


var url = Ajax.get({
    type: 'get',
    url: 'wallpaper.php',
    data: this.req,   
});

var desktop = new Desktop();
desktop.setWallpaper(url);
desktop.get();

var icon = new Icon();
icon.align = 'vertical';
icon.theme = 'light';
icon.set({name: 'TestWindow', event: function() { aw.run('TestWindow'); start.close(); }, img: 'img/icons/app/Windows Client-48.png'});
icon.set({name: 'TestTabBox', event: function() { aw.run('TestTabBox'); start.close(); }, img: 'img/icons/app/Briefcase-48.png'});
icon.set({name: 'TestForm', event: function() { aw.run('TestForm'); start.close(); }, img: 'img/icons/app/Google Docs-48.png'});
icon.set({name: 'Test menu', event: function() { aw.run('Cms'); start.close(); }, img: 'img/icons/app/Checklist-48.png'});
icon.set({name: 'Shop', event: function() { aw.run('No_Module'); start.close(); }, img: 'img/icons/app/Shopping Bag.png'});
icon.set({name: 'File manager', event: function() { aw.run('No_Module'); start.close(); }, img: 'img/icons/app/Filing Cabinet-64.png'});
icon.set({name: 'Settings', event: function() { aw.run('No_Module'); start.close(); }, img: 'img/icons/app/Robot-64.png'});
icon.set({name: 'Message', event: function() { aw.run('No_Module'); start.close(); }, img: 'img/icons/app/Message Squared-48.png'});
icon.set({name: 'Debug', event: function() { aw.run('No_Module'); start.close(); }, img: 'img/icons/app/Mite-48.png'});
icon.set({name: 'Music', event: function() { aw.run('No_Module'); start.close(); }, img: 'img/icons/app/Music Folder-48.png'});
icon.set({name: 'SMS', event: function() { aw.run('No_Module'); start.close(); }, img: 'img/icons/app/SMS-48.png'});





var icon = icon.get();

var start = new Start();
start.content = icon;
start.desktopShow = function() { desktop.show() };
start.desktopHide = function() { desktop.hide() };
start.get();

var taskbar = new Taskbar()
taskbar.setApplication();

var wm = new WindowManager();
wm.setWallpaper(desktop.getWallpaper());
wm.get();


// var workshop = new SystemWorkshop('system-workshop');
// workshop.setLayer(wm);
// workshop.get();

var app = new Array();
var proc;

function classApplicationManager() {
  this.list = new Array();
  
  this.addProc = function() {
    var str = new StringUtils();
    var proc = str.random(7);
    this.list.push(proc);
    return proc;
  } 
  
  this.kill = function(func) {
    for (var key in this.list) {
      if (this.list[key] == func) {
        delete this.list[key];
        delete app[key];
      }
    }
  }
  
  this.run = function(applicationName)
  {
    proc = this.addProc();
    Asset.addJs('app/'+ applicationName +'/bootstrap.js', false);
  }
}

var aw = new classApplicationManager();