/* global Ext  */

Ext.define('Dashboard.view.shared.filtering.DatesTimeRangeFilter',{
    extend: 'Ext.container.Container',
    xtype : 'filter.datesTimeRangeFilter',
    type: 'filter',
    
    require:['Ux.DateField'],
    
    config:{
        filterModel:null
    },
    
    maxWidth: null,
    layout: 'hbox',
    border: false,
    name: null,
    
    items:[ ],
    
    defaults:{
        margin: '0 0 0 12',
        formatText: ''
    },
   
    initComponent: function() {
                
        this.items = [
            {
                xtype: 'label',
                name: 'labelDateTimeRange',
                margin: '8 0 0 5'
            }, {
                xtype: 'ux-datefield',
                vtype: 'daterange',
                maxWidth: 280,
                format: getText('m/d/Y'),
                maxValue: new Date(),
                listeners: {
                    "select" : function(ctrl, evt) {
                        ctrl.up('container[type=filter]').updateDatesCombobox();
                    }
                },
                fieldLabel: getText('from', 'filter'),
                labelSeparator: getText(':'),
                name: 'dateStart',
                endDateField: 'dateEnd'
            },{
                xtype: 'timefield',
                name: 'timeStart',
                fieldLabel: '',
                margin: '0 0 0 4',
                width: 90,
                increment: 60,
                snapToIncrement: false,
                format: 'H:i',
                listeners: {
                    "select" : function(ctrl, evt) {
                        ctrl.up('container[type=filter]').checkTime();
                    }
                }
            },{
                xtype: 'ux-datefield',
                vtype: 'daterange',
                maxWidth: 280,
                format: getText('m/d/Y'),
                maxValue: new Date(),
                listeners: {
                    "select" : function(ctrl, evt) {
                        ctrl.up('container[type=filter]').updateDatesCombobox();
                    }
                },
                fieldLabel: getText('to', 'filter'),
                labelSeparator: getText(':'),
                name: 'dateEnd',
                startDateField: 'dateStart'
            },{
                xtype: 'timefield',
                name: 'timeEnd',
                fieldLabel: '',
                margin: '0 0 0 4',
                width: 90,
                increment: 60,
                snapToIncrement: false,
                format: 'H:i',
                listeners: {
                    "select" : function(ctrl, evt) {
                        ctrl.up('container[type=filter]').checkTime();
                    }
                }
            }
        ];
        
        
        this.name = this.getFilterModel().data.name;        
        var now = new Date();
        
        // Add the additional 'advanced' VTypes
        Ext.apply(Ext.form.field.VTypes, {
            daterange: function(val, field) {
                                
                var date = field.parseDate(val);

                if (!date) {
                    return false;
                }
                if (field.startDateField && (!this.dateRangeMax || (date.getTime() !== this.dateRangeMax.getTime()))) {
                    var start = field.up().query('datefield[name="dateStart"]')[0]; //Ext.ComponentQuery                   
                    
                    start.setMaxValue(now);
                    
                    // start.validate();
                    this.dateRangeMax = now;
                }
                else if (field.endDateField && (!this.dateRangeMin || (date.getTime() !== this.dateRangeMin.getTime()))){
                    var end = field.up().query('datefield[name="dateEnd"]')[0];
                    end.setMinValue(date);
                    end.setMaxValue(now);
                    
                    //end.validate();
                    this.dateRangeMin = date;
                }

                // Always return true since we're only using this vtype to set the
                // min/max allowed values (these are tested for after the vtype test)
                return true;
            },

            daterangeText: getText('Start date must be less than end date')
        });
        
        this.callParent();
        
        // Add label        
        try {
            var fieldLabelText = this.getFilterModel().data.label || '';
            var start = this.query('label[name="labelDateTimeRange"]')[0];
            start.setText(fieldLabelText);
            
        } catch (ex) {
            Dashboard.tool.Utilities.error('[DatesTimeRangeFilter.initComponent] error setting label : ' + ex);
        }
    },
    
    
    /**
     * If booth date fields completed reload datagrid with filters.
     */
    updateDatesCombobox: function(){
        
        //get values
        var startDateField = this.down('datefield[name="dateStart"]');
        var endDateField = this.down('datefield[name="dateEnd"]');

        var start = startDateField.getValue();
        var end = endDateField.getValue();

        var startTimeField = this.down('timefield[name="timeStart"]');
        var endTimeField = this.down('timefield[name="timeEnd"]');

        var startTime = startTimeField.getValue();
        var endTime = endTimeField.getValue();

        try {
            if (start) {
                endDateField.setMinValue(start);
                //this.down('timefield[name=timeStart]').setValue(new Date('00:00'));
                if(start.toString() === end.toString() && startTime > endTime){
                    this.down('timefield[name=timeEnd]').setValue(startTime);
                    endTime = startTime;
            }
            }
            if (end) {
                startDateField.setMaxValue(end);
                //this.down('timefield[name=timeEnd]').setValue(new Date('00:00'));
                if(start.toString() === end.toString() && startTime > endTime){
                    this.down('timefield[name=timeStart]').setValue(endTime);
                    startTime = endTime;
            }
            }
            

        } catch (ex) {
            console.log(ex);
        }
    },
    
    
    checkTime: function(){
                
        var startDateField = this.down('datefield[name="dateStart"]');
        var endDateField = this.down('datefield[name="dateEnd"]');
        var start = startDateField.getRawValue();
        var end = endDateField.getRawValue();
        
//        if(start || end ){
//            if(start !== end){
//                return;
//            }
//        }else{
//            return;
//        }
        
        if(start && start.toString() === end.toString()){
        
        //get values
        var startTimeField = this.down('timefield[name="timeStart"]');
        var endTimeField = this.down('timefield[name="timeEnd"]');

        var startTime = startTimeField.getValue();
        var endTime = endTimeField.getValue();

        try {
            if (startTime) {
                endTimeField.setMinValue(startTime);
            }
            if (endTime) {
                startTimeField.setMaxValue(endTime);
            }
        } catch (ex) {
            console.log(ex);
        }
        }
    },
    
    
    setValueStart: function (value) {
        var dateStart = this.down('datefield[name=dateStart]');
        var timeStart = this.down('timefield[name=timeStart]');
        dateStart.setValue(value);
        timeStart.setValue(value);
    },

    setValueEnd: function (value) {
        var dateEnd = this.down('datefield[name=dateEnd]');
        var timeEnd = this.down('timefield[name=timeEnd]');
        dateEnd.setValue(value);
        timeEnd.setValue(value);
    },
            
    getValueStart: function(){
        
        if(!this.down('datefield[name=dateStart]').getRawValue()){
            return null;
        }
        
        if(!this.down('timefield[name=timeStart]').getRawValue()){
            this.down('timefield[name=timeStart]').setValue(new Date('00:00'));
        }

        var date = this.down('datefield[name=dateStart]').value;
        var time = this.down('timefield[name=timeStart]').value;
        var datetime = this.concatDateAndTime(date,time);
        
        return datetime;
    },  
    
    
    getValueEnd: function(){
        
        if(!this.down('datefield[name=dateEnd]').getRawValue()){
            return null;
        }
        
        if(!this.down('timefield[name=timeEnd]').getRawValue()){
            
            if(this.down('timefield[name=timeStart]').getValue()){
                this.down('timefield[name=timeEnd]').setValue(this.down('timefield[name=timeStart]').getValue());
            }
            
            this.down('timefield[name=timeEnd]').setValue(new Date('00:00'));
        }

        var date = this.down('datefield[name=dateEnd]').value;
        var time = this.down('timefield[name=timeEnd]').value;
        var datetime = this.concatDateAndTime(date,time);
        
        return datetime;
    }, 
    
            
    getFilter: function(){
                
        var filters = [];
        var filterStart = null;
        var filterEnd = null;
        
        if (this.getValueStart()){
            var valueStart = new Date(this.getValueStart());
            var convertedValueStart = Ext.Date.format(valueStart, 'c');
            
            filterStart = this.buildFilter(this.name, convertedValueStart, 'GT');
            filters.push(filterStart);
        }
        
        if (this.getValueEnd()) {
            var valEnd = this.getValueEnd();
            
            //var valEndPlusOne = new Date(valEnd);
            //valEndPlusOne.setDate(valEndPlusOne.getDate() + 1);
            //var convertedValueEnd = Ext.Date.format(valEndPlusOne, 'c');
            
            var convertedValueEnd = Ext.Date.format(valEnd, 'c');
            
            filterEnd = this.buildFilter(this.name, convertedValueEnd, 'LT');
            filters.push(filterEnd);
        }
        
        if(filters.length === 1){
            return filters[0];
        }

        return filters;
    },
    
    
    concatDateAndTime: function(d, t){
        
       return new Date(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            t.getHours(),
            t.getMinutes(),
            t.getSeconds(),
            t.getMilliseconds()
        );
    },
            
            
    buildFilter: function(property, value, comparison){
        
        return {
            'property': property,
            'value': value,
            'type': 'DATETIME',
            'comparison': comparison
        };
    }

});