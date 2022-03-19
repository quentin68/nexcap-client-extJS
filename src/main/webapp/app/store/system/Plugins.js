
Ext.define('Dashboard.store.system.Plugins', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.plugins',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.system.Plugin',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/plugins/search'
    })
});   