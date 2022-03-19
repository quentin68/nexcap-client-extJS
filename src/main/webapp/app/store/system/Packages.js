Ext.define('Dashboard.store.system.Packages', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.packages',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.system.Package',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/packages/search'
    })
});   