function classDateTimeField() {  
    this.id;
    this.value = new Array();
    this.cursor = new Array();
    this.minDate = new Array();
    this.maxDate = new Array();
    this.show = new Array();
    this.template = 'default';
    this.objectName;
    
    this.setObjectName = function(objectName)
    {
        this.objectName = objectName;
    }
    
    this.getObjectName = function()
    {
        return this.objectName;
    }
    
    this.setId = function(id)
    {
        this.id = id;
    }
    
    this.getId = function()
    {
        return this.id;
    }
    
    this.setMinDate = function(value)
    {
        var value1 = value.split('-');
        value1['year'] = parseInt(value1[0]);
        value1['month'] = parseInt(value1[1]) - 1;
        value1['day'] = parseInt(value1[2]);
        this.minDate = value1;
    }
    
    this.setMaxDate = function(value)
    {
        var value1 = value.split('-');
        value1['year'] = parseInt(value1[0]);
        value1['month'] = parseInt(value1[1]) - 1;
        value1['day'] = parseInt(value1[2]);
        this.maxDate = value1;
    }
    
    this.setInput = function()
    {
        var year = this.value['year'];
        var month = this.value['month'];
        month++;
        var day = this.value['day'];
        if (year < 10) year = '0'+ year;
        if (month < 10) month = '0'+ month;
        if (day < 10) day = '0'+ day;
    
        var hour = this.value['hour'];
        var minute = this.value['minute'];
        var second = this.value['second'];
        
        if (hour < 10) hour = '0'+ hour;
        if (minute < 10) minute = '0'+ minute;
        if (second < 10) second = '0'+ second;
        
        var input = '';
		if (this.value['year'] != undefined && this.value['month'] != undefined && this.value['day'] != undefined) {
			if (this.show['date'] == true) input += year +'-'+ month +'-'+ day;
		}
		
        if (this.show['date'] == true && this.show['time'] == true) input += ' ';
		
		if (this.value['hour'] != undefined && this.value['minute'] != undefined && this.value['second'] != undefined) {
			if (this.show['time'] == true) input += hour +':'+ minute +':'+ second; 
		}
        document.getElementById(this.id).value = input; 
    }
    
    this.setVisibleInput = function()
    {
		
        var year = this.value['year'];
        var month = this.value['month'];
        month++;
        var day = this.value['day'];
        if (year < 10) year = '0'+ year;
        if (month < 10) month = '0'+ month;
        if (day < 10) day = '0'+ day;
    
        var hour = this.value['hour'];
        var minute = this.value['minute'];
        var second = this.value['second'];
        
        if (hour < 10) hour = '0'+ hour;
        if (minute < 10) minute = '0'+ minute;
        if (second < 10) second = '0'+ second;
        
        var input = '';
		if (this.value['year'] != undefined && this.value['month'] != undefined && this.value['day'] != undefined) {
			if (this.show['date'] == true) input += day +'.'+ month +'.'+ year;
		}
		
        if (this.show['date'] == true && this.show['time'] == true) input += ' ';
		
		if (this.value['hour'] != undefined && this.value['minute'] != undefined && this.value['second'] != undefined) {
			if (this.show['time'] == true) input += hour +':'+ minute +':'+ second; 
		}

        document.getElementById('vis_'+ this.id).value = input; 
    }
	
	this.setType = function(type)
	{
		if (type == 'date') {
            this.show['date'] = true;
		}
		
		if (type == 'time') {
            this.show['time'] = true;
		}
		
		if (type == 'datetime') {
            this.show['time'] = true;
            this.show['date'] = true;
		}
	}
    
    this.setValue = function(date, time)
    {     
        if (date != undefined) {
            var value2 = date.split('-');
            this.cursor['year'] = parseInt(value2[0]);
            this.cursor['month'] = parseInt(value2[1]) - 1;
            this.cursor['day'] = parseInt(value2[2]);
            
            var value1 = date.split('-');
            this.value['year'] = parseInt(value1[0]);
            this.value['month'] = parseInt(value1[1]) - 1;
            this.value['day'] = parseInt(value1[2]);
            this.value['dateFull'] = parseInt(value1[0]) +'-'+ parseInt(value1[1]) +'-'+ parseInt(value1[2]);
        }
        
        if (time !=  undefined) {
            time = time.split(':');
            this.value['hour'] = parseInt(time[0]);
            this.value['minute'] = parseInt(time[1]);
            this.value['second'] = parseInt(time[2]);
        }
        
        this.setInput();
        this.setVisibleInput();
    }
    
    this.buttonActive = function(value)
    {
		if (value == undefined) return false;
		
        if (document.getElementById('classDateTimeField_content_button_'+ this.id +'-'+ this.value['dateFull']) != null) document.getElementById('classDateTimeField_content_button_'+ this.id +'-'+ this.value['dateFull']).className = '';

        var value1 = value.split('-');
        this.value['year'] = value1[0];
        this.value['month'] = parseInt(value1[1]) - 1;
        this.value['day'] = value1[2];
        this.value['dateFull'] = value;
        
        if (document.getElementById('classDateTimeField_content_button_'+ this.id +'-'+ this.value['dateFull']) != null) document.getElementById('classDateTimeField_content_button_'+ this.id +'-'+ this.value['dateFull']).className = 'classDateTimeField_'+ this.template +'_buttonActive';
    }
    
    this.getMonthName = function(nr)
    {
        var name = new Array();
        name[0] = 'Styczeń';
        name[1] = 'Luty';
        name[2] = 'Marzec';
        name[3] = 'Kwiecień';
        name[4] = 'Maj';
        name[5] = 'Czerwiec';
        name[6] = 'Lipiec';
        name[7] = 'Sierpień';
        name[8] = 'Wrzesień';
        name[9] = 'Październik';
        name[10] = 'Listopad';
        name[11] = 'Grudzień';

        return name[nr];
    }
    
    this.getMonthNameShortForm = function(nr)
    {
        var name = new Array();
        name[0] = 'Sty';
        name[1] = 'Lu';
        name[2] = 'Mar';
        name[3] = 'Kw';
        name[4] = 'Maj';
        name[5] = 'Cze';
        name[6] = 'Lip';
        name[7] = 'Sie';
        name[8] = 'Wrz';
        name[9] = 'Pa';
        name[10] = 'Lis';
        name[11] = 'Gru';

        return name[nr];
    } 
    
    this.getDaysMonth = function(month, year)
    {
        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
            return 31;
        } else if (month == 3 || month == 5 || month == 8 || month == 10) {
            return 30;
        } else if (month == 1) {
            if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) 
            {
                return 29;
            } 
            else 
            {
                return 28;
            }
        }
    }
    
    this.renderContentMonth = function(e) 
    {
        e.stopPropagation();
        var month;
        var time = '';
        var view = '<table class="classDateTimeField_'+ this.template +'_contentMonth">';
        var k = 0;
        for (var i = 0; i < 4; i++) {
            view +='<tr>'
            for (var j = 0; j < 3; j++) {
                month = k + 1;
                if (this.checkMinDate(this.cursor['year'], k, this.cursor['day']) && this.checkMaxDate(this.cursor['year'], k, this.cursor['day'])) {
                    view +='<td class="classDateTimeField_'+ this.template +'_button" id="classDateTimeField_content_button_'+ this.id +'-'+ this.cursor['year'] +'-'+ month +'-'+ this.cursor['day'] +'" onclick="'+ this.objectName +'.buttonActiveMonth(\''+ this.cursor['year'] +'-'+ month +'-'+ this.cursor['day'] +'\', event);">'+ this.getMonthNameShortForm(k) +'</td>';
                } else {
                    view +='<td class="classDateTimeField_'+ this.template +'_buttonDisable" id="classDateTimeField_content_button_'+ this.id +'-'+ this.cursor['year'] +'-'+ month +'-'+ this.cursor['day'] +'">'+ this.getMonthNameShortForm(k) +'</td>';
                }
                k++;
            }
            view +='</tr>';
        }
        view += '</table>';
        document.getElementById('classDateTimeField_'+ this.id +'_main').innerHTML = view;
        this.buttonActive(this.value['dateFull']);
        this.renderHeaderMonth();
    }
    
    this.renderContentYear = function(e)
    {
        e.stopPropagation();
        var month = this.cursor['month'] + 1;
        var time = '';
        var view = '<table class="classDateTimeField_'+ this.template +'_contentYear">';
        var year = this.cursor['year'];
        for (var i = 0; i < 4; i++) {
            view +='<tr>'
            for (var j = 0; j < 3; j++) {
                if (this.checkMinDate(year, this.cursor['month'], this.cursor['day']) && this.checkMaxDate(year, this.cursor['month'], this.cursor['day'])) {
                    view +='<td class="classDateTimeField_'+ this.template +'_button" id="classDateTimeField_content_button_'+ this.id +'-'+ year +'-'+ month +'-'+ this.cursor['day'] +'" onclick="'+ this.objectName +'.buttonActiveYear(\''+ year +'-'+ month +'-'+ this.cursor['day'] +'\', event);">'+ year +'</td>';
                } else {
                    view +='<td class="classDateTimeField_'+ this.template +'_buttonDisable" id="classDateTimeField_content_button_'+ this.id +'-'+ year +'-'+ month +'-'+ this.cursor['day'] +'">'+ year +'</td>';
                }
                year++;
            }
            view +='</tr>';
        }
        view += '</table>';
        document.getElementById('classDateTimeField_'+ this.id +'_main').innerHTML = view;

        this.buttonActive(this.value['dateFull']);
        this.renderHeaderYear();
    }
    
    this.renderContentDay = function(e) 
    {
        if (e != undefined) { e.stopPropagation(); }
        var month = this.cursor['month'];
        var year = this.cursor['year'];

        var day = 1;
        var counter = 1;
        
        var dayStart = new Date(year, month, '01');
        dayStart = dayStart.getDay();
        var dayEnd = this.getDaysMonth(month, year);

        month = month + 1;
        var content = '';
        var time = '';
        for (var i = 0; i < 5; i++) {
            content += '<tr>';
            for (var j = 0; j < 7; j++) {
                if (dayStart <= counter && day <= dayEnd) {
                    if (this.checkMinDate(year, this.cursor['month'], day) && this.checkMaxDate(year, this.cursor['month'], day)) {
                        'classDateTimeField_default_buttonActive'
                        content += '<td class="classDateTimeField_'+ this.template +'_button" id="classDateTimeField_content_button_'+ this.id +'-'+ year +'-'+ month +'-'+ day +'" onclick="'+ this.objectName +'.buttonActiveDay(\''+ year +'-'+ month +'-'+ day +'\', event)">'+ day +'</td>';
                    } else {
                        content += '<td class="classDateTimeField_'+ this.template +'_buttonDisable" id="classDateTimeField_content_button_'+ this.id +'-'+ year +'-'+ month +'-'+ day +'">'+ day +'</td>';
                    }
                    day++;
                } else {
                    content += '<td></td>';
                }
                counter++;
            }
            content += '</tr>';
        }

        document.getElementById('classDateTimeField_'+ this.id +'_main').innerHTML = '<table class="classDateTimeField_'+ this.template +'_contentDay"><tr><th>Pn</th><th>Wt</th><th>Śr</th><th>Cz</th><th>Pt</th><th>So</th><th>N</th></tr>'+ content +'</table>';
        this.buttonActive(this.value['dateFull']);
    }
    
    this.buttonActiveDay = function(value, e)
    {
        e.stopPropagation();
        this.buttonActive(value);
        this.setValue(value);
    }
    
    
    this.buttonActiveYear = function(value, e)
    {
        this.setValue(value);
        this.renderHeaderMonth();
        this.renderContentMonth(e);
        this.renderYearField();
        this.buttonActive(value);
    }
    
    this.buttonActiveMonth = function(value, e)
    {
        e.stopPropagation();
        this.setValue(value);
        this.renderHeaderDay();
        this.renderContentDay(e);
        this.renderMonthField();
        this.renderYearField();
        this.buttonActive(value);
    }
    
    this.renderMonthField = function() 
    {
        document.getElementById('classDateTimeField_'+ this.id +'_monthField').innerHTML = this.getMonthName(this.cursor['month']); 
    }
    
    this.renderYearField = function() 
    {
        document.getElementById('classDateTimeField_'+ this.id +'_yearField').innerHTML = this.cursor['year']; 
    }
    
    this.renderYearBetweenField = function() 
    {
        var yearFrom = this.cursor['year'];
        var yearTo = this.cursor['year'] + 11;
        document.getElementById('classDateTimeField_'+ this.id +'_yearField').innerHTML = yearFrom +' - '+ yearTo; 
    }
    
    this.checkMinDate = function(year, month, day)
    {
        var dateCursor = new Date(year, month, day, 0, 0, 0); // maj to month = 4
        dateCursor = dateCursor.getTime();

        var dateMin = new Date(this.minDate['year'], this.minDate['month'], this.minDate['day'], 0, 0, 0);
        dateMin = dateMin.getTime();

        if (dateCursor >= dateMin) return true;
        return false;
    }
    
    this.checkMaxDate = function(year, month, day)
    {
        var dateCursor = new Date(year, month, day, 0, 0, 0);
        dateCursor = dateCursor.getTime();
        
        var dateMax = new Date(this.maxDate['year'], this.maxDate['month'], this.maxDate['day'], 0, 0, 0);
        dateMax = dateMax.getTime();
 
        if (dateCursor <= dateMax) return true;
        return false;
    }
    
    this.buttonPrevDay = function(e)
    { 
        e.stopPropagation();
        var date = new Date(this.cursor['year'], this.cursor['month'], '01');
        date.setMonth(this.cursor['month'] - 1);
        if (this.checkMinDate(date.getFullYear(), date.getMonth(), this.minDate['day'])) {
            this.cursor['month'] = date.getMonth();
            this.cursor['year'] = date.getFullYear();
            
            this.renderContentDay(e);
            this.renderMonthField();
            this.renderYearField();
            this.buttonActive(this.value['dateFull']);
        }
    }
    
    this.buttonNextDay = function(e)
    {
        e.stopPropagation();
        var date = new Date(this.cursor['year'], this.cursor['month'], '01');
        date.setMonth(this.cursor['month'] + 1);
        
        if (this.checkMaxDate(date.getFullYear(), date.getMonth(), this.maxDate['day'])) {
            this.cursor['month'] = date.getMonth();
            this.cursor['year'] = date.getFullYear();

            this.renderContentDay(e);
            this.renderMonthField();
            this.renderYearField();
            this.buttonActive(this.value['dateFull']);
        }
    }
    
    this.buttonNextMonth = function(e)
    {
        e.stopPropagation();
        if (this.checkMaxDate(this.cursor['year'] + 1, this.cursor['month'], this.maxDate['day'])) {
            this.cursor['year'] = this.cursor['year'] + 1;
            this.renderYearField();
            this.renderContentMonth(e);
        }
    }
    
    this.buttonPrevMonth = function(e)
    {
        e.stopPropagation();
        if (this.checkMinDate(this.cursor['year'] - 1, this.cursor['month'], this.minDate['day'])) {
            this.cursor['year'] = this.cursor['year'] - 1;
            this.renderYearField();
            this.renderContentMonth(e);
        }
    }
    
    this.buttonNextYear = function(e)
    {
        e.stopPropagation();
        var step = 12;
        if (this.checkMaxDate(this.cursor['year'] + step, this.cursor['month'], this.cursor['day'])) {
            this.cursor['year'] = this.cursor['year'] + step;
        } else {
            this.cursor['year'] = this.maxDate['year'];
        }
        this.renderYearBetweenField();
        this.renderContentYear(e);
    }
    
    this.buttonPrevYear = function(e)
    {
        e.stopPropagation();
        var step = 12;
        if (this.checkMinDate(this.cursor['year'] - step, this.cursor['month'], this.cursor['day'])) {
            this.cursor['year'] = this.cursor['year'] - step;
        } else {
            this.cursor['year'] = this.minDate['year'];
        }
        this.renderYearBetweenField();
        this.renderContentYear(e);
    }
    
    this.renderHeaderDay = function()
    {
        document.getElementById('classDateTimeField_'+ this.id +'_header').innerHTML = '<div onclick="'+ this.objectName +'.buttonPrevDay(event)" class="classDateTimeField_'+ this.template +'_buttonPrev"></div><div class="classDateTimeField_'+ this.template +'_buttonNext" onclick="'+ this.objectName +'.buttonNextDay(event)"></div><div class="classDateTimeField_'+ this.template +'_buttonChangeContent" onclick="'+ this.objectName +'.renderContentMonth(event)"><span id="classDateTimeField_'+ this.id +'_monthField"></span> <span id="classDateTimeField_'+ this.id +'_yearField"></span></div>';
    }
    
    this.renderHeaderMonth = function()
    {
        document.getElementById('classDateTimeField_'+ this.id +'_header').innerHTML = '<div onclick="'+ this.objectName +'.buttonPrevMonth(event)" class="classDateTimeField_'+ this.template +'_buttonPrev" ></div><div onclick="'+ this.objectName +'.buttonNextMonth(event)" class="classDateTimeField_'+ this.template +'_buttonNext" ></div><div class="classDateTimeField_'+ this.template +'_buttonChangeContent" onclick="'+ this.objectName +'.renderContentYear(event)"><span id="classDateTimeField_'+ this.id +'_yearField"></span></div>';
        this.renderYearField();
    }
    
    this.renderHeaderYear = function()
    {
        document.getElementById('classDateTimeField_'+ this.id +'_header').innerHTML = '<div onclick="'+ this.objectName +'.buttonPrevYear(event)" class="classDateTimeField_'+ this.template +'_buttonPrev"></div><div onclick="'+ this.objectName +'.buttonNextYear(event)" class="classDateTimeField_'+ this.template +'_buttonNext"></div><div onclick="'+ this.objectName +'.renderContentYear(event)" class="classDateTimeField_'+ this.template +'_buttonChangeContent"><span id="classDateTimeField_'+ this.id +'_yearField"></span></div>';
        this.renderYearBetweenField();
    }
    
    this.renderCalendar = function(e)
    {
        if (e != undefined) e.stopPropagation();
        
        var view = '<div id="classDateTimeField_'+ this.id +'_header" class="classDateTimeField_'+ this.template +'_header"></div>'
        +'<div id="classDateTimeField_'+ this.id +'_main"></div>';
        if (this.show['time'] == true) view += '<div id="classDateTimeField_'+ this.id +'_icon" onclick="'+ this.objectName +'.renderClock(event)"></div>';
        
        document.getElementById('classDateTimeField_'+ this.id +'_content').innerHTML = view;
        
        this.renderContentDay(e);
        this.renderHeaderDay();
        this.renderMonthField();
        this.renderYearField();
        
        this.setIcon('classDateTimeField_'+ this.template +'_iconClock', 'classDateTimeField_'+ this.id +'_icon');
        this.setIcon('classDateTimeField_'+ this.template +'_iconCalendarInput', 'classDateTimeField_'+ this.id +'_iconInput'); 
    }
    
    this.setIcon = function(className, id)
    {
        var element = document.getElementById(id);
		element.className = className;
    }
    
    this.renderClock = function(e)
    {		
        if (e != undefined) { e.stopPropagation(); }
        var view = '<div class="classDateTimeField_'+ this.template +'_contentTime">'
        +'<div class="classDateTimeField_'+ this.template +'_contentCounter">'
        +'<div class="classDateTimeField_'+ this.template +'_hourContent" id="classDateTimeField_'+ this.id +'_hour"></div>'
        +'<div class="classDateTimeField_'+ this.template +'_minuteContent" id="classDateTimeField_'+ this.id +'_minute"></div>'
        +'<div class="classDateTimeField_'+ this.template +'_secondContent" id="classDateTimeField_'+ this.id +'_second"></div>'
        +'</div>';
        if (this.show['date'] == true) view += '<div id="classDateTimeField_'+ this.id +'_icon" onclick="'+ this.objectName +'.renderCalendar(event)"></div>';
        view += '</div>';
        document.getElementById('classDateTimeField_'+ this.id +'_content').innerHTML = view;
        this.renderHour();

        this.renderMinute();
        this.renderSecond();
        this.setIcon('classDateTimeField_'+ this.template +'_iconCalendar', 'classDateTimeField_'+ this.id +'_icon');
        this.setIcon('classDateTimeField_'+ this.template +'_iconClockInput', 'classDateTimeField_'+ this.id +'_iconInput'); 
    }
    
    this.hourAdd = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        if (this.value['hour'] == 23) this.value['hour'] = -1;
        this.value['hour']++;
        this.renderHour();
    }
    
    this.hourMinus = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        if (this.value['hour'] == 0) this.value['hour'] = 24;
        this.value['hour']--;
        this.renderHour();
    }
    
    this.minuteMinus = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        if (this.value['minute'] == 0) this.value['minute'] = 60;
        this.value['minute']--;
        this.renderMinute();
    }
    
    this.minuteAdd = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        if (this.value['minute'] == 59) this.value['minute'] = 0;
        this.value['minute']++;
        this.renderMinute();
    }
    
    this.secondMinus = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        if (this.value['second'] == 0) this.value['second'] = 60;
        this.value['second']--;
        this.renderSecond();
    }
    
    this.secondAdd = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        if (this.value['second'] == 59) this.value['second'] = 0;
        this.value['second']++;
        this.renderSecond();
    }
    
    this.setHour = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        var value = document.getElementById('classDateTimeField_'+ this.id +'_hourInput').value;
        if (value != '') {
            value = parseInt(value);
            if (isNaN(value)) value = 1;
            if (value > 24 || value <= 1) {
                value = 1;
            }
        }
        this.value['hour'] = value;
        document.getElementById('classDateTimeField_'+ this.id +'_hourInput').value = value;
        this.setInput();
        this.setVisibleInput();
    }
    
    this.setMinute = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        var value = document.getElementById('classDateTimeField_'+ this.id +'_minuteInput').value;
        if (value != '') {
            value = parseInt(value);
            if (isNaN(value)) value = 0;
            if (value >= 60 || value <= 0) {
                value = 0;
            }
        }
        this.value['minute'] = value;
        document.getElementById('classDateTimeField_'+ this.id +'_minuteInput').value = value;
        this.setInput();
        this.setVisibleInput();
    }
    
    this.setSecond = function(e)
    {
        if (e != undefined) { e.stopPropagation(); }
        var value = document.getElementById('classDateTimeField_'+ this.id +'_secondInput').value;
        if (value != '') {
            value = parseInt(value);
            if (isNaN(value)) value = 0;
            if (value >= 60 || value <= 0) {
                value = 0;
            }
        }
        this.value['second'] = value;
        document.getElementById('classDateTimeField_'+ this.id +'_secondInput').value = value;
        this.setInput();  
        this.setVisibleInput();
    }
    
    this.renderHour = function()
    {
        document.getElementById('classDateTimeField_'+ this.id +'_hour').innerHTML = 
        '<div class="classDateTimeField_'+ this.template +'_hourAdd" id="classDateTimeField_'+ this.id +'_hourAdd" onclick="'+ this.objectName +'.hourAdd(event)"></div>'
        +'<input  class="classDateTimeField_'+ this.template +'_hourInput" onkeyup="'+ this.objectName +'.setHour(event)" id="classDateTimeField_'+ this.id +'_hourInput" value="'+ this.value['hour'] +'">'
        +'<div class="classDateTimeField_'+ this.template +'_hourMinus" id="classDateTimeField_'+ this.id +'_hourMinus" onclick="'+ this.objectName +'.hourMinus(event)"></div>'
        +'<div class="classDateTimeField_'+ this.template +'_hourHeader">godzina</div>';
        this.setInput();
        this.setVisibleInput();
    }
    
    this.renderMinute = function()
    {
        document.getElementById('classDateTimeField_'+ this.id +'_minute').innerHTML = 
        '<div class="classDateTimeField_'+ this.template +'_minuteAdd" id="classDateTimeField_'+ this.id +'_minuteAdd" onclick="'+ this.objectName +'.minuteAdd(event)"></div>'
        +'<input class="classDateTimeField_'+ this.template +'_minuteInput" onkeyup="'+ this.objectName +'.setMinute(event)" id="classDateTimeField_'+ this.id +'_minuteInput" value="'+ this.value['minute'] +'">'
        +'<div class="classDateTimeField_'+ this.template +'_minuteMinus" id="classDateTimeField_'+ this.id +'_minuteMinus" onclick="'+ this.objectName +'.minuteMinus(event)"></div>'
        +'<div class="classDateTimeField_'+ this.template +'_minuteHeader">minuta</div>';
        this.setInput();
        this.setVisibleInput();
    }
    
    this.renderSecond = function()
    {
        document.getElementById('classDateTimeField_'+ this.id +'_second').innerHTML = 
        '<div class="classDateTimeField_'+ this.template +'_secondAdd" id="classDateTimeField_'+ this.id +'_secondAdd" onclick="'+ this.objectName +'.secondAdd(event)"></div>'
        +'<input class="classDateTimeField_'+ this.template +'_secondInput" onkeyup="'+ this.objectName +'.setSecond(event)" id="classDateTimeField_'+ this.id +'_secondInput" value="'+ this.value['second'] +'">'
        +'<div class="classDateTimeField_'+ this.template +'_secondMinus" id="classDateTimeField_'+ this.id +'_secondMinus" onclick="'+ this.objectName +'.secondMinus(event)"></div>'
        +'<div class="classDateTimeField_'+ this.template +'_secondHeader">sekunda</div>';
        this.setInput();
        this.setVisibleInput();
    }
    
    this.render = function()
    {
        if (this.minDate.length <= 0) {
            var dateMin = new Date();
            dateMin.setFullYear(dateMin.getFullYear() - 100);
            this.minDate['year'] = dateMin.getFullYear();
            this.minDate['month'] = dateMin.getMonth();
            this.minDate['day'] = dateMin.getDate();
        }
        
        if (this.maxDate.length <= 0) {
            var dateMax = new Date();
            dateMax.setFullYear(dateMax.getFullYear() + 100);
            this.maxDate['year'] = dateMax.getFullYear();
            this.maxDate['month'] = dateMax.getMonth();
            this.maxDate['day'] = dateMax.getDate();
        }
		
        if (this.show['time'] == true && this.show['date'] != true) this.renderClock();  
        if (this.show['date'] == true) this.renderCalendar();
        
        /* w momencie gdy zamknie się okno to odwołuje się kod do niestniejących elementów */
        document.getElementById('classDateTimeField_'+ this.id +'_container').addEventListener('mousedown', function(event) {
            event.stopPropagation();
        });
        
        var self = this;
        document.addEventListener('mousedown', function() {   
            self.close();
        }, false);

        this.setVisibleInput();
    }
    
    this.close = function()
    {
        if (document.getElementById('classDateTimeField_'+ this.id +'_container') != null) {
            if (this.show['date'] == true) {
                this.renderCalendar();
            }
            document.getElementById('classDateTimeField_'+ this.id +'_content').style.display = 'none';
        }
    }
    
    this.open = function(e)
    {
        e.stopPropagation();
        
		var date = new Date();
		var dateCurr = parseInt(date.getFullYear()) +'-'+ parseInt(date.getMonth() + 1) +'-'+ date.getDate();
		var timeCurr = parseInt(date.getHours()) +':'+ parseInt(date.getMinutes()) +':'+ date.getSeconds();
		
		if (this.show['date'] == true && this.show['time'] != true) {
			if (this.value['year'] == undefined && this.value['month'] == undefined && this.value['day'] == undefined) {
				this.setValue(dateCurr, undefined);
				this.render();
			}
		}
		
		if (this.show['time'] == true && this.show['date'] != true) {
			if (this.value['hour'] == undefined && this.value['minute'] == undefined && this.value['second'] == undefined) {
				this.setValue(undefined, timeCurr);
				this.render();
			}
		}
		
		if (this.show['date'] == true && this.show['time'] == true) {
			if (this.value['hour'] == undefined && this.value['minute'] == undefined && this.value['second'] == undefined) {
				var valueTime = timeCurr;
			}
			
			if (this.value['year'] == undefined && this.value['month'] == undefined && this.value['day'] == undefined) {
				var valueDate = dateCurr;
			}
			
			if (valueTime != undefined || valueDate != undefined) {
				this.setValue(valueDate, valueTime);
				this.render();
			}
		}
	
        if (document.querySelector('#classDateTimeField_'+ this.id +'_content').style.display == 'none') {
            document.getElementById('classDateTimeField_'+ this.id +'_content').style.display = 'table';
        } else {
           this.close();
        }
    }
 
}

