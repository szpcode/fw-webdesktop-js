Asset.addJs('app/Cms/src/Controller/CmsMainController.js');

Asset.addCss('app/Cms/style.css');

app[proc] = new App();
app[proc].proc = proc;
app[proc].setObject('CmsMainController', new CmsMainController());
app[proc].setModule('CmsStart', 'CmsMainController', 'startAction', {});
app[proc].run('CmsStart');