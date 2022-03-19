Ext.define('Dashboard.store.settings.AlertsConfiguration', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsConfig',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.alerts.AlertsConfiguration',
    remoteSort : true,
    
    proxy : Ext.create('Dashboard.store.Proxy',{   
        actionMethods: {read: 'GET', create: 'POST', update: 'PUT', destroy: 'DELETE'},
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfiguration'
    })
});   