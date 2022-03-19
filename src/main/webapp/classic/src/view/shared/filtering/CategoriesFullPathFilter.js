/* global Ext */

Ext.define('Dashboard.view.shared.filtering.CategoriesFullPathFilter',{
    extend: 'Dashboard.view.shared.component.AutocompleteComboBox',//'Ux.ComboBox',
    xtype : 'filter.categoriesFullPathFilter',
    type: 'filter',

    config:{
        filterModel:null
    },
    
    maxWidth: 600,
    width: 400,
    labelWidthAuto: true,
    border: false,
    name: null,
    fieldLabel: getText('Category'),
    displayField: 'fullPath',
    valueField: 'fullPath',
    //filter: [{property: 'name', comparison: 'contains', type: 'string', value: ''}],
    
    requires : ['Dashboard.store.Categories'],
    
    store: Ext.create('Dashboard.store.Categories', {
        autoLoad: false,
        sorters: [ {
            property: 'fullPath',
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