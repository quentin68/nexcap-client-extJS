/* global Ext */

Ext.define('Dashboard.view.shared.filtering.DeviceTypeFilter',{
    extend: 'Dashboard.view.shared.component.AutocompleteComboBox',//'Ux.ComboBox',
    xtype : 'filter.deviceTypeFilter',
    type: 'filter',

    config:{
        filterModel:null
    },
    
    maxWidth: 600,
    width: 400,
    labelWidthAuto: true,
    border: false,
    name: null,
    fieldLabel: getText('Device type'),
    displayField: 'label',
    valueField: 'value',
    forceSelection: true,
    //filter: [{property: 'name', comparison: 'contains', type: 'string', value: ''}],
    
    requires : ['Dashboard.store.administration.ServerDevicesTypes'],
    
    store: Ext.create('Dashboard.store.administration.ServerDevicesTypes', {
        autoLoad: false,
        sorters: [ {
            property: 'label',
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

        var value = this.getValue();
        
        if (!value){
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
            'property': 'systemType',
            'value': value,
            'type': 'ENUM',
            'comparison': comparison
        };
    }

});