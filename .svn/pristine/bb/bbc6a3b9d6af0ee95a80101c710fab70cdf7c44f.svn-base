/*  global Ext */

Ext.define('Dashboard.store.system.Sensors', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.sensors',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.system.Sensor',
    remoteSort: true,
    
    sorters: [
        {
            property: 'name', 
            direction: 'ASC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/search'
    })
    
});   