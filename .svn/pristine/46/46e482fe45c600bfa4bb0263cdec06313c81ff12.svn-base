/* global Ext */

Ext.define('Dashboard.store.properties.PropertiesByProcessor',{
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.propertiesByProcessor',
    
    requires:[
        'Dashboard.model.PropertyConfiguration',
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.PropertyConfiguration',
    
    sorters: [{
         property: 'name',
         direction: 'ASC'
    }],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        limitParam: false,
        pageParam: false,
        startParam: false,
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties/processor/'
    })
});

