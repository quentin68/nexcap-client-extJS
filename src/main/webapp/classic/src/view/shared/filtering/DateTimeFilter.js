Ext.define('Dashboard.view.shared.filtering.DateTimeFilter',{
    extend: 'Ext.container.Container',
    xtype : 'filter.dateTimeFilter',
    type: 'filter',
    
    config:{
        filterModel:null
    },
    
    fieldType: 'datetimefield',
    maxWidth: null,
    layout: 'hbox',
    name: null,
    
    defaults: {
        submitValue: false,
        margin: 0,
        labelWidth: 112
    },
   
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;
        
        var fieldLabel = this.getFilterModel().data.label;
        this.name = filterData.name;

        if(filterData.configuration.field){
            this.items = [
                {
                    xtype: 'datefield',
                    fieldLabel: fieldLabel,
                    flex:1,
                    format: getText('Y-m-d'),
                    maxValue: filterData.configuration.field.maxValue
                },{
                    xtype: 'timefield',
                    margin: '0 0 0 6',
                    formatText: '',
                    flex:0,
                    width: 90,
                    increment: 60,
                    snapToIncrement: false,
                    format: 'H:i'
                }
            ];
        }
        this.callParent();
    },
    
    setFilterValue: function (value){
        this.down('datefield').setValue(value);
        this.down('timefield').setValue(value);
    },

    getValue: function(){
                
        if(!this.down('datefield').getRawValue()){
            return null;
        }
        
        if(!this.down('timefield').getRawValue()){
            this.down('timefield').setValue(new Date());
        }

        var date = this.down('datefield').value;
        var time = this.down('timefield').value;
        var datetime = this.concatDateAndTime(date,time);
        
        return datetime;

    },      
            
    getFilter: function(){

        if (!this.getValue()){
            return;
        }
        
        var filterData = this.getFilterModel().data;

        var value = new Date(this.getValue());
        var convertedValue = Ext.Date.format(value, 'c');
        var filter = this.buildFilter(filterData.name, convertedValue, filterData.comparison);

        return filter;
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
            
    buildFilter: function(name, value, comparison){
        if(!comparison){
            comparison = 'EQ';
        }
        return {
            'property': name,
            'value': value,
            'type': 'DATETIME',
            'comparison': comparison
        };
    }

});