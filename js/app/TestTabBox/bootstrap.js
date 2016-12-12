Asset.addJs('app/TestTabBox/src/Controller/TestTabBoxController.js');

app[proc] = new App();
app[proc].proc = proc;

app[proc].setObject('TestTabBoxController', new TestTabBoxController());
app[proc].setModule('TestTabBox', 'TestTabBoxController', 'showAction', {});

app[proc].run('TestTabBox');

