Ext.define('Dashboard.store.operation.Borrowings', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.operationBorrowings',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.operation.Borrowing',
    
    sorters: [
        {
            property: 'date',
            direction: 'DESC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/borrowings/search'
    })
});   