Asset.addJs('app/TestForm/src/Controller/TestFormController.js');


app[proc] = new App();
app[proc].proc = proc;
app[proc].setObject('TestFormController', new TestFormController());
app[proc].setModule('TestForm', 'TestFormController', 'showAction', {});
app[proc].run('TestForm');

