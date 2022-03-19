Ext.define('Dashboard.view.shared.filtering.InterventionOrdersFilter',{
    extend: 'Dashboard.view.shared.component.AutocompleteComboBox',//'Ux.ComboBox',
    xtype : 'filter.interventionOrdersFilter',
    type: 'filter',

    config:{
        filterModel:null
    },
    
    maxWidth: 600,
    width: 400,
    labelWidthAuto: true,
    border: false,
    name: null,
    fieldLabel: getText('Intervention order'),
    displayField: 'number',
    valueField: 'number',
    //filter: [{property: 'name', comparison: 'contains', type: 'string', value: ''}],
    requires : ['Dashboard.store.administration.InterventionOrders'],
    store: Ext.create('Dashboard.store.administration.InterventionOrders', {
        autoLoad: false,
        sorters: [ {
            property: 'number',
            direction: 'ASC'
        } ]
    }),
         
   
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
            
            try{
                if(filterData.configuration.field.displayField !== undefined && filterData.configuration.field.displayField){
                    this.displayField = filterData.configuration.field.displayField;
                }
            }catch(ex){}
            
        }
        
        this.store.getProxy().extraParams.filter = [],
                
        this.callParent();
    },  
            
            
    getFilter: function(){

        var value = this.getRawValue();
        
        if (!value){
            return;
        }
        
        var filterData = this.getFilterModel().data;
        var filter = this.buildFilter(filterData.name, value, filterData.comparison);

        return filter;
    },
            
            
    buildFilter: function(name, value, comparison){
        if(!comparison){
            comparison = 'CONTAINS';
        }
        return {
            'property': name,//'interventionOrderIdList.number',
            'value': value,
            'type': 'STRING',
            'comparison': comparison
        };
    }

});