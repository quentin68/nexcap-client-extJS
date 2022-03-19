/*  global Ext  */

Ext.define('Dashboard.manager.FiltersManager',{
    extend: 'Ext.app.Controller',
    alias: 'filtersManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities',
        'Dashboard.store.FilterTypes'
    ],
    
    filterTypesStore : Ext.create('Dashboard.store.FilterTypes'),
    
    getFilterTypeByPropertyType: function(propertyValueType){
        return this.filterTypesStore.findRecord('propertyValueType', propertyValueType, 0, false, true, true);
    },
    
    
    getFiltersListByFeature: function(feature){
                
        var filtersList = [];
        var filtersConfiguration = Dashboard.manager.FeaturesManager.getFiltersConfiguration(feature);
        
        if(!filtersConfiguration){
            Dashboard.tool.Utilities.error('[FiltersManager.getFiltersListByFeature] configuration null or empty !');
            return [];
        }

        for (var i = 0; i < filtersConfiguration.length; i++) {
            var filter = Ext.create('Dashboard.model.Filter', filtersConfiguration[i]);
            filtersList.push(filter);
        }

        return filtersList;
    },
            
            
    getProperties: function(){
        
        return [
            {
                property:{
                    name: 'dateStartDateEnd',
                    label: getText('Item'),
                    type: 'FX'
                }
            }
        ];
        
    }


});