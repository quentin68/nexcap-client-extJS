//old
Ext.define('Dashboard.store.settings.AlertsConfig', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsConfig',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.settings.AlertsConfig',
    remoteSort : true,
    
    proxy : Ext.create('Dashboard.store.Proxy',{   
        actionMethods: {read: 'GET', create: 'POST', update: 'PUT', destroy: 'DELETE'},
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/control'
    })
});   