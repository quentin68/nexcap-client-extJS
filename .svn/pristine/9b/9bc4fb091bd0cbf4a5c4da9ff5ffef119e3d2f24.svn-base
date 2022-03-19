Ext.define('Dashboard.view.shared.filtering.EnumFilter',{
    extend: 'Ux.TextField',
    xtype : 'filter.enumFilter',
    type: 'filter',
    
    config:{
        filterModel:null
    },
   
    fieldLabel: null,
    name: null,
    maxLength: 255,
    placeHolder: getText('Empty'),
    width: 250,
            
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
        }
    
        this.callParent();
    },
    
    setFieldValue: function (val){
        this.setValue(val);
    },
            
    getFilter: function(){

        var value = this.getValue();
        
        if (!value){
            return;
        }
        
        value = value.trim();
        
        var filterData = this.getFilterModel().data;
        
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },
            
    buildFilter: function(name, value, comparison){
        if(!comparison){
            comparison = 'CONTAINS';
        }
        return {
            'property': name,
            'value': value,
            'type': 'ENUM',
            'comparison': comparison
        };
    }
});