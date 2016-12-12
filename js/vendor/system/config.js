var Config = function() {
    this.path = 'js/app/config/';
    var data = new Array();
    this.current;
    
    this.load = function(file)
    {
        var path = this.path + file +'.json'; 
        Ajax.get( {
            type: "GET",
            url: path,
            onError: function(msg) {
                console.warn(msg)
            },
            onSuccess: function(msg) {
                this.data[file] = JSON.parse(msg);
            }           
        });
        
        this.current = file;
        
        return this;
    }
    
    this.get = function(param1, param2, param3, param4)
    {
        if ((param1 != undefined) && (param2 == undefined) && (param3 == undefined) && (param4 == undefined)) {
            return this.data[this.current][param1]; 
        }
        
        if ((param1 != undefined) && (param2 != undefined) && (param3 == undefined) && (param4 == undefined)) {
            return this.data[this.current][param1][param2]; 
        }
        
        if ((param1 != undefined) && (param2 != undefined) && (param3 != undefined) && (param4 == undefined)) {
            return this.data[this.current][param1][param2][param3]; 
        }
        
        if ((param1 != undefined) && (param2 == undefined) && (param3 == undefined) && (param4 == undefined)) {
            return this.data[this.current][param1][param2][param3][param4]; 
        }
    }
    
}