Ext.define('Dashboard.store.operation.Maintenances', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.operationMaintenances',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.operation.Maintenance',
    
    sorters: [
        {
            property: 'date',
            direction: 'DESC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/maintenances/search'
    })
});   