function classSelect2Field() {
    this.name = '';
    this.value = new Array();
    this.items = new Array();
    this.multiple = false;
    this.template = 'default';
    this.elementHtml = new Array();
    this.placeholderFieldSearch = 'Szukaj...';
    this.placeholderField = '- dowolny - ';
    this.readOnly = false; 
    this.scrollbar = false;
    this.show = ['search', 'add new', 'clear'];
    
    this.getScrollbar = function()
    {
        return this.scrollbar;
    }

    this.setScrollbar = function(scrollbar)
    {
        this.scrollbar = scrollbar;
    }
    
    this.getMultiple = function()
    {
        return this.multiple;
    }

    this.setMultiple = function(multiple)
    {
        this.multiple = multiple;
    }
    
    this.getReadOnly = function()
    {
        return this.readOnly;
    }

    this.setReadOnly = function(readOnly)
    {
        this.readOnly = readOnly;
    }
    
    this.getName = function()
    {
        return this.name;
    }
    
    this.setPlaceholderField = function(placeholderField)
    {
        this.placeholderField = placeholderField;
    }
    
    this.getPlaceholderField = function()
    {
        return this.placeholderField;
    }

    this.setName = function(name)
    {
        this.name = name;
    }
    
    this.setValue = function(value)
    {
        this.value = value;
    }
    
    this.getValue = function()
    {
        return this.value;
    }
    
    this.setItems = function(items)
    {
        this.items = items;
    }
    
    this.getItems = function()
    {
        return this.items;
    }
    
    this.setVisInputValue = function()
    {
        var value = new Array();
        for (var i in this.value) {
            value.push(this.items[this.value[i]]);
        }
        
        this.elementHtml['vis_input'].value = value.join(', ');
        this.elementHtml['input'].value = this.value.join(', ');
        
        if (value.length <= 0) {
            this.elementHtml['vis_input'].value = this.placeholderField;
        }
    }
    
    this.checked = function(nr, key)
    {
        if (this.multiple == true) {
            
            if (this.value.indexOf(key) >= 0) {
                this.value.splice(this.value.indexOf(key), 1);
                this.elementHtml['item_'+ nr].classList.remove('classSelect2Field_'+ this.template +'_itemActive');
            } else {
                this.value.push(key);
                this.elementHtml['item_'+ nr].classList.add('classSelect2Field_'+ this.template +'_itemActive');
            }
            this.setVisInputValue();
        } else {
            this.setValue([key]);
            this.setVisInputValue();
            this.loadChecked();
            this.windowClose();
        }
    }
    
    this.loadChecked = function() 
    {
        var nr = 0;
        for (var key in this.items) {
            if (this.value.indexOf(key) >= 0) {
                this.elementHtml['item_'+ nr].classList.add('classSelect2Field_'+ this.template +'_itemActive');
            } else {
                this.elementHtml['item_'+ nr].classList.remove('classSelect2Field_'+ this.template +'_itemActive');
            }
            nr++;
        }
    }
    
    this.setMultiple = function(multiple)
    {
        this.multiple = multiple;
    }
    
    this.getMultiple = function()
    {
        this.multiple;
    }
    
    this.windowOpen = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }  
        this.elementHtml['window'].style.display = 'block';
    }
    
    this.windowClose = function()
    {
        this.elementHtml['window'].style.display = 'none';
    }
    
    this.open = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }   
        if (this.elementHtml['window'].style.display == 'none') {
           this.windowOpen();
        } else {
           this.windowClose();
        }
    }
    
    this.clear = function(e)
    {
        this.setValue([]);
        this.setVisInputValue();
        this.loadChecked();
    }
    
    this.search = function(e)
    {
        var value = this.elementHtml['search'].value;
        var nr = 0;
        for (var key in this.items) {
            if (this.items[key].indexOf(value) >= 0) {
                this.elementHtml['item_'+ nr].style.display = 'block';
            } else {
                this.elementHtml['item_'+ nr].style.display = 'none';
            }
            nr++;
        }
    }
    
    this.searchFocus = function(e)
    {
        if (this.elementHtml['search'].value == this.placeholderFieldSearch) {
            this.elementHtml['search'].value = '';
        }
    }
    
    this.searchBlur = function(e)
    {
        if (this.elementHtml['search'].value == '') {
            this.elementHtml['search'].value = this.placeholderFieldSearch;
        }
    }
    
    this.fieldFocus = function(e)
    {
        if (this.elementHtml['vis_input'].value == this.placeholderField) {
            this.elementHtml['vis_input'].value = '';
        }
    }

    this.fieldBlur = function(e)
    {
        if (this.elementHtml['vis_input'].value == '') {
            this.elementHtml['vis_input'].value = this.placeholderField;
        }
    }

    
    this.add = function()
    {
        if (this.readOnly) {
            return true;
        }
        
        if (this.multiple == false) {
            this.value = new Array();  
            this.windowClose();
        }

        var valueAdd = this.elementHtml['input_add'].value;
        if (valueAdd != '') {
            var value = this.elementHtml['input'].value;
            value = value.split(', ');
            if (value.indexOf(valueAdd) < 0) {
                if (this.items[valueAdd] == undefined) {
                    this.items[valueAdd] = valueAdd;
                }
                
                this.value.push(valueAdd);
                this.itemRender();
            }
        }
        this.elementHtml['input_add'].value = '';
        this.setVisInputValue();
    }
    
    this.addFromKey = function(e)
    {
        if (e != undefined) {
            if (e.keyCode == 13) {
                this.add();
            }
        } 
    }
    
    this.itemRender = function()
    {
        var i = 0;
        if (this.scrollbar == true) {
            $(this.elementHtml['button_options']).mCustomScrollbar("destroy");
        }
        
        this.elementHtml['button_options'].innerHTML = '';

        for (var key in this.items) {
            var item = '<div id="classSelect2Field_'+ this.name +'_item_'+ i +'" class="classSelect2Field_default_buttonOptions_item">'+ this.items[key] +'</div>';
            item = item.toDOM();
            this.elementHtml['button_options'].appendChild(item);
            this.elementHtml['item_'+ i] = document.getElementById('classSelect2Field_'+ this.name +'_item_'+ i);
            if (this.readOnly == false) {
                this.elementHtml['item_'+ i].addEventListener("click", this.checked.bind(this, i, key), false);
            } else {
                this.elementHtml['item_'+ i].style.cursor = 'default';
            }
            i++;
        }
        if (this.scrollbar == true) {
            $(this.elementHtml['button_options']).mCustomScrollbar({
                scrollInertia: 100,
                theme: "system"
            }); 
        }
        this.loadChecked();
    }    

    this.render = function()
    {
                console.log(this.items);
        this.elementHtml['window'] = document.getElementById('classSelect2Field_'+ this.name +'_window');
        this.elementHtml['button_options'] = document.getElementById('classSelect2Field_'+ this.name +'_buttonOptions');
        this.elementHtml['window'].style.display = 'none';
        this.elementHtml['input'] = document.getElementById(this.name);
        this.elementHtml['vis_input'] = document.getElementById('vis_'+ this.name);
        this.elementHtml['field'] = document.getElementById('classSelect2Field_'+ this.name +'_field');
        this.elementHtml['container'] = document.getElementById('classSelect2Field_'+ this.name +'_container');
        this.elementHtml['button_clear'] = document.getElementById('classSelect2Field_'+ this.name +'_buttonClear');
        this.elementHtml['search'] = document.getElementById('classSelect2Field_'+ this.name +'_fieldSearch');
        this.elementHtml['content_search'] = document.getElementById('classSelect2Field_'+ this.name +'_contentSearch');
        this.elementHtml['button_add'] = document.getElementById('classSelect2Field_'+ this.name +'_buttonAdd');
        this.elementHtml['input_add'] = document.getElementById('classSelect2Field_'+ this.name +'_fieldAdd');     
        this.elementHtml['content_add'] = document.getElementById('classSelect2Field_'+ this.name +'_contentAdd');
        this.elementHtml['buttons_content'] = document.getElementById('classSelect2Field_'+ this.name +'_contentButtons');
        
        
        this.elementHtml['button_clear'].addEventListener("mousedown", this.clear.bind(this), false);
        
        this.elementHtml['field'].addEventListener("mousedown", this.open.bind(this), false);
        this.elementHtml['vis_input'].addEventListener("blur", this.fieldBlur.bind(this), false);
        this.elementHtml['vis_input'].addEventListener("focus", this.fieldFocus.bind(this), false);
        this.elementHtml['window'].addEventListener("mousedown", this.windowOpen.bind(this), false);
        
        this.elementHtml['search'].value = this.placeholderFieldSearch;
        this.elementHtml['search'].addEventListener("keyup", this.search.bind(this), false);
        this.elementHtml['search'].addEventListener("blur", this.searchBlur.bind(this), false);
        this.elementHtml['search'].addEventListener("focus", this.searchFocus.bind(this), false);
        this.elementHtml['button_add'].addEventListener("click", this.add.bind(this), false);
        this.elementHtml['input_add'].addEventListener("keyup", this.addFromKey.bind(this), false);
        
        if (this.show.indexOf('add new') < 0) {
            this.elementHtml['content_add'].style.display = 'none';
        }
        
        if (this.show.indexOf('search') < 0) {
            this.elementHtml['content_search'].style.display = 'none';
        }
        
        if (this.show.indexOf('clear') < 0) {
            this.elementHtml['buttons_content'].style.display = 'none';
        }
        
        this.itemRender();
        this.setVisInputValue();
        
        if (this.readOnly) {
            this.elementHtml['input_add'].readOnly = true;
        }
        
        if (this.scrollbar == true) {
            $(this.elementHtml['button_options']).mCustomScrollbar({
                scrollInertia: 100,
                theme: "dark-3"
            }); 
        }
        
        var self = this;
        document.addEventListener('mousedown', function() {   
            self.windowClose();
        }, false);

    }
}