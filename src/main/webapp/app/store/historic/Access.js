/* global Ext  */
Ext.define('Dashboard.store.historic.Access', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.access',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.historic.Access',
    
    filterModels: null,
    oldFilterModels: null,
    
    listeners:{
        beforeload: function( store , operation , eOpts){                        
            var filters = this.getProxy().extraParams.filter;
            
            if(store.oldFilterModels){
                var index = filters.indexOf(store.oldFilterModels);
                filters.splice(index, index+1);
                store.oldFilterModels = null;
            }
            if(store.filterModels){
                this.getProxy().extraParams.filter.push(store.filterModels);
                store.oldFilterModels = store.filterModels;
            }
        }
    },
            
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/loginrecords/search'
    })
});   