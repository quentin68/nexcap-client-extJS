Ext.define('Dashboard.store.historic.Checks', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.checks',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.historic.Check',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheck/search'
    })
});   