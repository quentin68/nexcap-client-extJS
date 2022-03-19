Ext.define('Dashboard.view.shared.filtering.NumberFilter',{
    extend: 'Ux.NumberField',
    xtype : 'filter.numberFilter',
    type: 'filter',
    
    config:{
        filterModel:null
    },
   
    fieldLabel: null,
    name: null,
    minValue: 0,
    maxValue: null,
    step: 1,
    decimalSeparator: ',',
    allowDecimals: true,
    decimalPrecision: 3,

            
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;

        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
        }
        
        if(filterData.configuration.field){
            var field = filterData.configuration.field;
            this.minValue = field.minValue;
            this.maxValue = field.maxValue;
            this.step = field.step? field.step:1;
            this.decimalSeparator = getText(',');
            this.allowDecimals = field.allowDecimals;
            this.decimalPrecision = field.decimalPrecision;
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
            'type': 'FLOAT',
            'comparison': comparison
        };
    }

});