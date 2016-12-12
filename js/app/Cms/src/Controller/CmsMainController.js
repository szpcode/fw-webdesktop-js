var CmsMainController = function() {
  this.elementHtml = {};
}

CmsMainController.prototype.startAction = function(arg) {
    
    var view = new View();
    view.setElementById(['content', 'menu1', 'menu2']);
    var container = view.render('view/app/Cms/src/Controller/CmsMainController/startAction.twig', {});
    this.elementHtml = view.getElementById(); 
    
    var win = new SystemWindow();
    win.title = 'Test menu';
    win.content = container;
    win.positionX = 'center';
    win.positionY = 'center';
    win.width = 300;
    win.height = 300;
    win.contentScroll = false;
    win.maximize = true;
    win.resize = true;
    win.show.buttonMaximize = true;
    
    wm.setWindow(win); 
    
    

    var self = this;
    var menu1 = new Menu();
    menu1.contentId = this.elementHtml['menu1']
    menu1.setItem('Dashboard', function() { 
        var link = new CmsLinkController();
        self.menuOption(link.listAction()) 
    }, 'fa-image');
    menu1.setItem('Post', function() { 
        console.log('w');
    }, 'fa-newspaper-o');
    menu1.setItem('Subpage', function() { 
        console.log('w');
    }, 'fa-file-text-o');
    menu1.setItem('Links', function() { 
        console.log('w');
    }, 'fa-link');
    menu1.setItem('Media', function() { 
        console.log('w');
    }, 'fa-image');
    menu1.setItem('Boxes', function() { 
        console.log('w');
    }, 'fa-rocket');
    menu1.get();

    var menu2 = new Menu();
    menu2.contentId = this.elementHtml['menu2']
    menu2.setItem('Menu', function() {
        console.log('fa-sitemap');
    }, 'fa-sitemap');
    menu2.setItem('Slugs', function() { 
        console.log('w');
    }, 'fa-sort-alpha-asc');
    menu2.setItem('Route', function() { 
        console.log('w');
    }, 'fa-bookmark');
    menu2.setItem('Category and tags', function() { 
        console.log('w');
    }, 'fa-link');
    menu2.setItem('Settings', function() { 
        console.log('w');
    }, 'fa-gear');
    menu2.get();
}

CmsMainController.prototype.menuOption = function(obj) {

    this.elementHtml['content'].innerHTML = '';
    this.elementHtml['content'].appendChild(obj);
}
