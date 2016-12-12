function classNumberField() {
    this.name;
    this.step = 1;
    this.value = '';
    this.max = 9999999999999;
    this.min = -9999999999999;
    this.elementHtml = new Array();
    this.valueDefault;
    this.type = 'int';
    this.intervalPlus = 0;
    this.intervalPlusFast = 0;
    this.counter = 0;
    this.counterFast = 0;
    this.eventPlusAutoStop;
    this.eventPlusFastAutoStop;
    this.eventMinusAutoStop;
    this.eventMinusFastAutoStop;
    this.format = {decNumber: 0, decimals: 3, decPoint: ' ', thousandsSep: '.'}
    var self = this;
    
    this.setType = function(type)
    {
        this.type = type;
    }
    
    this.setFormat = function(decNumber, decimals, decPoint, thousandsSep)
    {
    this.format = {decNumber: decNumber, decimals: decimals, decPoint: decPoint, thousandsSep: thousandsSep} 
    }
    
    this.setName = function(name)
    {
        this.name = name;
    }
    
    this.setStep = function(step)
    {
        this.step = step;
    }
    
    this.setMax = function(max)
    {
        this.max = max;
    }
    
    this.setMin = function(min)
    {
        this.min = min;
    }
    
    this.setValue = function(value) 
    {   
        this.value = value;
    }
    
    this.setValueLimit = function(event) 
    {   

        var value = this.value;
        console.log(value);
        if (event != undefined) {
            var keyCode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 173, 46, 8];

            if (keyCode.indexOf(event.keyCode) < 0) {
                this.value = this.value.toLowerCase();

                var str = String.fromCharCode(event.keyCode);
                str = str.toLowerCase();
                this.value = this.value.replace(str, '');

                return false;
            }
        }
        
        // console.log('value.toString().length: ');
                // console.log(value.toString().length);
        if (value.toString().length > 0) {
            
            // console.log('x:');
            // console.log(value);

            if (/^[-]?[0-9]+([.]?[0-9]+)?$/.test(value.toString())) {
                if (this.type == 'int') {
                    value = parseInt(value);
                }
                
                if (this.type == 'float') {
                    value = parseFloat(value);
                }

                if (value <= this.max && value >= this.min) {
                    this.value = value;
                } else {
                    if (value > this.max) {
                        this.value = this.max;
                    }
                    if (value < this.min) {
                        this.value = this.min;
                    }
                }
            }
 
        } else {
            this.value = '';
        }

    }
    
    
    this.setValueDefault = function(value) 
    {
        this.valueDefault = value;
    }

    this.setValueDefaultEventBlur = function() 
    {
        if (this.value == '' || this.value == '-') {
            this.value = this.valueDefault;
            this.setInputValue();
        }
    }
    
    // start - function button plus
    this.buttonPlusAutoStart = function(e) {
        this.intervalPlus = setInterval(function() { self.buttonPlus(); self.setVisInputValue(); }, 100);
        self.eventPlusAutoStop = self.buttonPlusAutoStop.bind(this);
        document.addEventListener("mouseup", self.eventPlusAutoStop, false);
    }
    
    this.buttonPlusFastAutoStart = function(e) {    
        if (self.intervalPlusFast == 0) {
            setTimeout(function() {
                self.intervalPlusFast = setInterval(function() { 
                    self.buttonPlus();
                    self.setVisInputValue();
                }, 50);
                self.eventPlusFastAutoStop = self.buttonPlusAutoStop.bind(this);
                document.addEventListener("mouseup", self.eventPlusFastAutoStop, false);                
            }, 1000);
        };
    }
    
    this.buttonPlusAutoStop = function(e) {
        clearInterval(this.intervalPlus);
        clearInterval(this.intervalPlusFast);
        this.intervalPlus = 0;
        document.removeEventListener("mouseup", this.eventPlusAutoStop, false);
        document.removeEventListener("mouseup", this.eventPlusFastAutoStop, false); 
    }
    
    this.buttonPlus = function() 
    {
        if (this.value == '') this.value = 0;
        
        if (this.type == 'int') {
            this.value = parseInt(this.value);
        }
        
        if (this.type == 'float') {
            this.value = parseFloat(this.value);
        } 
        
        if (this.value + this.step <= this.max) {
            this.value = this.value + this.step;
            this.setInputValue();
        }
    }
    // end - function button plus
    
    // start - function button minus
    this.buttonMinusAutoStart = function(e) {
        this.counter = setInterval(function() { self.buttonMinus(); self.setVisInputValue(); }, 100);
        self.eventMinusAutoStop = self.buttonMinusAutoStop.bind(this);
        document.addEventListener("mouseup", self.eventMinusAutoStop, false);     
    }
    
    this.buttonMinusFastAutoStart = function(e) {    


        setTimeout(function() {
            if (self.counter > 0) {
                self.counterFast = setInterval(function() { 
                    self.buttonMinus();
                    self.setVisInputValue();
                }, 50);
            };
            
            self.eventMinusFastAutoStop = self.buttonMinusAutoStop.bind(this);
            document.addEventListener("mouseup", self.eventMinusFastAutoStop, false);          
        }, 1000);
    }
    
    this.buttonMinusAutoStop = function(e) {
        clearInterval(this.counter);
        clearInterval(this.counterFast);
        this.counter = 0;
        document.removeEventListener("mouseup", this.eventMinusAutoStop, false);
        document.removeEventListener("mouseup", this.eventMinusFastAutoStop, false); 
    }
    
    this.buttonMinus = function() 
    {
        if (this.value == '') this.value = 0;
        
        if (this.type == 'int') {
            this.value = parseInt(this.value);
        }
        
        if (this.type == 'float') {
            this.value = parseFloat(this.value);
        }
        
        if (this.value - this.step >= this.min) {
            this.value = this.value - this.step;
            this.setInputValue();
        }
    }
    // end - function button minus 
    
    this.setInputValue = function() {
        this.elementHtml['input'].value = this.value;
    }
    
    this.getInputValue = function() {
        this.value = this.elementHtml['input'].value;
    }
    
    this.getVisInputValue = function() {
        var value;
        value = this.elementHtml['vis_input'].value;
        value = value.replace(' ', '');
        // value = value.replace('.', '');
        this.elementHtml['input'].value = value;
    }
    
    this.setVisInputValue = function() {
        this.getInputValue();
        this.setValueLimit();
        // console.log(this.value);
        var value = this.value;
        var valueOld = this.value;
        var valueVis = this.value;

        if (value.toString().length > 3 && value.toString().indexOf('.') < 0) {
            value = parseInt(value);
            valueVis = value.format(this.format.decNumber, this.format.decimals, this.format.decPoint, this.format.thousandsSep);
        }
        
        if (value.toString().indexOf('.') >= 0) {
            var tmp = value.split('.');
            if (tmp[1].length > 2) {
                value = parseFloat(value);
                valueVis = value.format(2, 3, ' ', '.');
            } else {
                // value = valueOld;
            }
        }

        this.elementHtml['input'].value = value;
        this.elementHtml['vis_input'].value = valueVis;

        // this.getInputValue();
        // this.setInputValue();
        
    }
    
    this.render = function()
    {
        this.elementHtml['button_minus'] = document.getElementById(this.name +'_minus');
        this.elementHtml['button_plus'] = document.getElementById(this.name +'_plus');
        this.elementHtml['input'] = document.getElementById(this.name);
        this.elementHtml['vis_input'] = document.getElementById('vis_'+ this.name);

        this.elementHtml['button_minus'].addEventListener("click", this.buttonMinus.bind(this), false);
        this.elementHtml['button_minus'].addEventListener("click", this.setVisInputValue.bind(this), false);  
        this.elementHtml['button_minus'].addEventListener("mousedown", this.buttonMinusAutoStart.bind(this), false);
        
        // this.elementHtml['button_minus'].addEventListener("mouseup", this.buttonMinusFastAutoStart.bind(this), false);
        
        this.elementHtml['button_plus'].addEventListener("click", this.buttonPlus.bind(this), false);
        this.elementHtml['button_plus'].addEventListener("click", this.setVisInputValue.bind(this), false); 
        this.elementHtml['button_plus'].addEventListener("mousedown", this.buttonPlusAutoStart.bind(this), false);
        // this.elementHtml['button_plus'].addEventListener("mousedown", this.buttonPlusFastAutoStart.bind(this), false);
        
        // this.elementHtml['input'].addEventListener("blur", this.setValueDefaultEventBlur.bind(this), false);  
        
        
        this.elementHtml['vis_input'].addEventListener("keyup", this.getVisInputValue.bind(this), false); 
        this.elementHtml['vis_input'].addEventListener("keyup", this.setVisInputValue.bind(this), false); 
        this.elementHtml['vis_input'].addEventListener("blur", this.setVisInputValue.bind(this), false); 
        
        this.setValueLimit();
        this.setInputValue();
    }
    
}
