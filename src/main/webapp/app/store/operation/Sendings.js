Ext.define('Dashboard.store.operation.Sendings', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.operationSendings',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.operation.Sending',
    
    sorters: [
        {
            property: 'date',
            direction: 'DESC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/sendings/search'
    })
});   