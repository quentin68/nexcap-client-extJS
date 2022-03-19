Ext.define('Dashboard.store.historic.Movements', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.movements',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.historic.Movement',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/movements/search'
    })
});   