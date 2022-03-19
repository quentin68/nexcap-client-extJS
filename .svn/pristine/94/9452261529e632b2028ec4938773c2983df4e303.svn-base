Ext.define('Dashboard.store.historic.Inventories', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.inventories',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.historic.Inventory',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/history/inventories/search'
    })
});   