Ext.define('Dashboard.model.alerts.DeviceAlert', {
    extend: 'Dashboard.model.alerts.Alert',
    
    fields: [
        {
            name: 'device', // object
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/device'
        }
    })
});
