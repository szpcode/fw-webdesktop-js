var Ajax = function() {
    this.get = function(options) {
        options = {
            type: options.type || "POST",
            url: options.url || "",
            onComplete: options.onComplete || function(){},
            onError: options.onError || function(){},
            onSuccess: options.onSuccess || function(){},
            async: options.async || false,
            data: options.data || {},
            dataType: options.dataType || "text"
        };
     
        var req = new XMLHttpRequest();
        req.open(options.type, options.url, options.async);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        if (options.async == true) {
            req.onreadystatechange = function(){
                if ( req.readyState == 4) {
                    if ( httpSuccess( req ) ) {
                        var returnData = (options.dataType=="xml")? req.responseXML : req.responseText
                        options.onSuccess( returnData );
                    } else {
                        options.onError();
                    }
                    options.onComplete();
                    req = null;
                }
            };
            req.send();
        } else {
            req.send(JSON.stringify(options.data));
            if (req.status === 200) {
                return req.responseText;
            }
        }
        
        function httpSuccess(r) {
            try {
                return ( r.status >= 200 && r.status < 300 || r.status == 304 || navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined")
            } catch(e) {
                return false;
            }       
        }
    }    
}
var Ajax = new Ajax();
