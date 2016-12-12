function App() {
    this.res;
    this.arg;
    this.module = new Array();
    this.proc;
    this.obj = {};

    this.settings = function(settings)
    {
      this.res = settings.view;
    }

    this.setModule = function(name, obj, func, arg)
    {
      var module = {name: name, obj: obj, arg: arg, func: func, type: 'method'};
      this.module.push(module);
    }
    
    this.setObject = function(name, obj)
    {
      this.obj[name] = obj;
      this.obj[name].proc = this.proc;
    }

    this.getModule = function(name, arg)
    {
      for (var i = 0; i < this.module.length; i++) {
        if (this.module[i].name == name) {

          if (arg == undefined) {
            arg = this.module[i].arg;
          }
          
          if (this.module[i].func == undefined) {
            alert('No exist function for module ' + name);
            return false;
          }

          this.obj[this.module[i].obj][this.module[i].func](arg);
          
          return true;
        }
      }

      alert('No exist name module: ' + name);
      return false;
    }

    this.run = function(name)
    {      
      this.getModule(name); 
    }
}

