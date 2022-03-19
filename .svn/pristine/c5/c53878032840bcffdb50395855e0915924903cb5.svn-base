Ext.define('Dashboard.store.administration.Stocks', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.stocks',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.administration.Stocks',
    remoteSort: true,
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel/search'
    })
    
});   