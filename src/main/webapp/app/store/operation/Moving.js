Ext.define('Dashboard.store.operation.Moving', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.operationMoving',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.operation.Moving',
   
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/operations/borrow/search'
    })
});   