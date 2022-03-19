
Ext.define('Dashboard.store.historic.Maintenances', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.maintenances',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.historic.Maintenance',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/maintenances/search'
    })
    
});   