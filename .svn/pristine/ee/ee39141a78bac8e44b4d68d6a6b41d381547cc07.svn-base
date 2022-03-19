Ext.define('Dashboard.view.shared.filtering.IntegerFilter',{
    extend: 'Ux.NumberField',
    xtype : 'filter.integerFilter',
    type: 'filter',
    
    config:{
        filterModel:null
    },
   
    fieldLabel: null,
    name: null,
    minValue: 0,
    maxValue: null,
    step: 1,
    allowDecimals: false,
            
    initComponent: function() {
                
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        if(filterData.configuration.field){
            var field = filterData.configuration.field;
            this.minValue = field.minValue;
            this.maxValue = field.maxValue;
            this.step = field.step?field.step:1;
        }
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
        }
    
        this.callParent();
    },
            
    getFilter: function(){
    
        var value = this.getValue();
        if (value === undefined || value === null){
            return;
        }
        
        var filterData = this.getFilterModel().data;
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },
            
    buildFilter: function(name, value, comparison){
        if(!comparison){
            comparison = 'EQ';
        }
        return {
            'property': name,
            'value': value,
            'type': 'INT',
            'comparison': comparison
        };
    }

});