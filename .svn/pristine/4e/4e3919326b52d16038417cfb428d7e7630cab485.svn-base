/*  global Ext */

Ext.define('Dashboard.store.system.Processors', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.processors',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.system.Processor',
    remoteSort: true,
    
    sorters: [
        {
            property: 'name', 
            direction: 'ASC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/processorconfiguration/search'
    })
    
});   