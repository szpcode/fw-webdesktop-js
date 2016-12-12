var Model = function(service) {
    this.url = '';
    this.req = {};
    this.res = {};
    this.method = 'post';
    this.service = service;
}

Model.prototype.setMethod = function(method) {
    this.method = method;
}

Model.prototype.setRes = function(res) {
    this.res = res;
}

Model.prototype.setReq = function(req) {
    this.req = req;
}

Model.prototype.get = function() {
    url =  this.url + this.service;

    data = Ajax.get({
        type: this.method,
        url: url,
        dataType: 'json',
        data: this.req,
        onError: function(msg) {
            console.warn(msg)
        },
        onSuccess: function(data) {
            return data;
        }    
    });
    console.log(data);
    return JSON.parse(data);
}
