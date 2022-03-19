/* global Ext  */

Ext.define('Dashboard.view.shared.filtering.DatesRangeFilter',{
    extend: 'Ext.container.Container',
    xtype : 'filter.datesRangeFilter',
    type: 'filter',
    
    require:['Ux.DateField'],
    
    config:{
        filterModel:null
    },
    
    //fieldType: 'datetimefield',
    maxWidth: null,
    layout: 'hbox',
    border: false,
    name: null,
    
    defaults: {
        xtype: 'ux-datefield',
        vtype: 'daterange',
        maxWidth: 280,
        format: getText('m/d/Y'),
        maxValue: new Date(),
        listeners: {
            //scope: this,
            "select" : function(ctrl, evt) {
                ctrl.up('container[type=filter]').updateDatesCombobox();
            }
        }
    },
    items:[ ],
            
   
    initComponent: function() {
                
        this.items = [
            {
                xtype: 'label',
                name: 'labelDateRange',
                margin: '8 0 0 5'
            },{
                fieldLabel: getText('from', 'filter'),
                name: 'dateStart',
                endDateField: 'dateEnd'
            },{
                fieldLabel: getText('to', 'filter'),
                name: 'dateEnd',
                startDateField: 'dateStart'
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
            var start = this.query('label[name="labelDateRange"]')[0];
            start.setText(fieldLabelText);
            
        } catch (ex) {
            Dashboard.tool.Utilities.error('[DatesRangeFilter.initComponent] error setting label : ' + ex);
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

        try {
            if (start) {
                endDateField.setMinValue(start);
            }
            if (end) {
                startDateField.setMaxValue(end);
            }
        } catch (ex) {
            console.log(ex);
        }
        //this.updateDataStore();
    },
    
    setValueStart: function (value) {
        var dateStart = this.down('datefield[name=dateStart]');
        dateStart.setValue(value);
    },

    setValueEnd: function (value) {
        var dateEnd = this.down('datefield[name=dateEnd]');
        dateEnd.setValue(value);
    },
            
    getValueStart: function(){
        return this.down('datefield[name=dateStart]').value;
    },  
    
    
    getValueEnd: function(){
        return this.down('datefield[name=dateEnd]').value;
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
            var valEndPlusOne = new Date(valEnd);
            valEndPlusOne.setDate(valEndPlusOne.getDate() + 1);
            var convertedValueEnd = Ext.Date.format(valEndPlusOne, 'c');
            
            filterEnd = this.buildFilter(this.name, convertedValueEnd, 'LT');
            filters.push(filterEnd);
        }
        
        if(filters.length === 1){
            return filters[0];
        }

        return filters;
    },
            
            
    buildFilter: function(property, value, comparison){
        
        return {
            'property': property,
            'value': value,
            'type': 'DATE',
            'comparison': comparison
        };
    }

});