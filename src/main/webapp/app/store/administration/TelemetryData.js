Ext.define('Dashboard.store.administration.TelemetryData', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.telemetryData',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.administration.TelemetryData',
    remoteSort: true,
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/search'
    })
    
});   