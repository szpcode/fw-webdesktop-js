function Asset() {
    this.cssPath = 'css/';
    this.cssLoaded = new Array();
    this.jsPath = 'js/';
    this.jsLoaded = new Array();
    this.lessPath = 'less/';
    this.lessLoaded = new Array();

    this.addJs = function(file, cached) {
        if (cached == '' || cached == undefined) {
            cached = true;
        }

        if (cached == true) {
            if (this.jsLoaded.indexOf(file) < 0) {
                $.ajax({
                    async: false,
                    url: this.jsPath + file,
                    dataType: "script",
                    error : function(xhr, ajaxOptions, thrownError){
                        alert('File JS no exists: '+ file);
                    }
                });
            }
        } else {
            $.ajax({
                async: false,
                url: this.jsPath + file,
                dataType: "script",
                error : function(xhr, ajaxOptions, thrownError){
                    alert('File JS no exists: '+ file);
                }
            });
        }
    }

    this.addCss = function(file) {
        if (this.cssLoaded.indexOf(file) < 0) {
            html = '<link rel="stylesheet" media="all" href="' + this.cssPath + file + '">';
            var tag = document.querySelectorAll('head');
            tag[0].insertAdjacentHTML('beforeend', html);
            this.cssLoaded.push(file);
        }
    }

    this.addLess = function(file) {
        if (this.lessLoaded.indexOf(file) < 0) {
            
            var stylesheetFile = this.lessPath + file;
            var link  = document.createElement('link');
            link.rel  = "stylesheet";
            link.type = "text/less";
            link.href = stylesheetFile;
            less.sheets.push(link);

            less.refresh();
        }
    }
}

var Asset = new Asset();