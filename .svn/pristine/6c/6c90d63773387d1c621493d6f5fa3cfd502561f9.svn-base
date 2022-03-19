Ext.define('Dashboard.view.shared.filtering.ReferencesCodeFilter',{
    extend: 'Dashboard.view.shared.component.AutocompleteComboBox',//'Ux.ComboBox',
    xtype : 'filter.referencesCodeFilter',
    type: 'filter',

    config:{
        filterModel:null
    },
    
    maxWidth: 600,
    width: 400,
    labelWidthAuto: true,
    border: false,
    name: null,
    fieldLabel: getText('Reference code'),
    displayField: 'referenceCode',
    valueField: 'referenceCode',
    //filter: [{property: 'name', comparison: 'contains', type: 'string', value: ''}],
    requires : ['Dashboard.store.References'],
    store: Ext.create('Dashboard.store.References', {
        autoLoad: false,
        sorters: [ {
            property: 'referenceCode',
            direction: 'ASC'
        } ]
    }),
         
   
    initComponent: function() {
        
        var filterData = this.getFilterModel().data;
        this.fieldLabel = filterData.label;
        this.name = filterData.name;
        
        if(filterData.configuration && filterData.configuration.width){
            this.width = parseInt(filterData.configuration.width);
        }
        
        this.store.getProxy().extraParams.filter = [];
                
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
            'property': name,
            'value': value,
            'type': 'STRING',
            'comparison': comparison
        };
    }

});