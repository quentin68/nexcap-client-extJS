Ext.define('Dashboard.store.historic.Consumptions', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.consumptions',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.historic.Consumption',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/consumptions/search'
    })
});   