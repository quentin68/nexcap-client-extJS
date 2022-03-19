
Ext.define('Dashboard.store.system.Devices', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.devices',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.system.Device',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/search'
    })
});   