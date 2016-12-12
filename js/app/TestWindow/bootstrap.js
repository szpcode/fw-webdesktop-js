Asset.addJs('app/TestWindow/src/Controller/TestWindowController.js');

app[proc] = new App();
app[proc].proc = proc;

app[proc].setObject('TestWindowController', new TestWindowController());
app[proc].setModule('TestWindow', 'TestWindowController', 'showAction', {});
app[proc].run('TestWindow');

