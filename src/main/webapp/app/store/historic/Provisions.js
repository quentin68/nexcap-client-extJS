Ext.define('Dashboard.store.historic.Provisions', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.provisions',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.historic.Provision',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/provisions/search'
    })
});   