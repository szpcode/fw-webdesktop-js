var View = function() {
    // this.loaded = new Array();
    this.path = '';
    this.id = new Array();
    this.htmlDom; 
    
    this.setElementById = function(arr)
    {
      var str = new StringUtils();
      for (var key in arr) {
        var id = str.random();
        this.id[arr[key]] = arr[key] +'-'+ id;
      }
    }
    
    this.getElementById = function()
    {
      var res = new Array();
      for (var key in this.id) {
        res[key] = this.htmlDom.getElementById(this.id[key]);
      }
      return res;
    }

    this.render = function(file, data, res)
    {
      var str = new StringUtils();
      var id = str.random();
    
      data = data || {};
      res = res || {};
      var path = this.path + file;

      // if (this.loaded.indexOf(path) < 0) {
          
          
          var template = twig({
            id: id,
            href: path,
            async: false
          });
          // this.loaded.push(path);
      // }


      if (Object.keys(this.id).length > 0) data.id = this.id;

      if (res.block != undefined) {
        output = {output: 'blocks'};
        var html = twig({ ref: id }).render(data, output);
        html = html[res.block];
      } else {
        var html = twig({ ref: id }).render(data);
      }
      this.htmlDom = html.toDOM();
      return this.htmlDom;
    }
}