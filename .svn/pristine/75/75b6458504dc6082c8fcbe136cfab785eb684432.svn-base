/* global Ext */

Ext.define('Dashboard.store.system.IotDevices', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.iotdevices',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.system.IotDevice',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/iotdevices/search'
    })
});   