Ext.define('Dashboard.model.alerts.LocationAlert', {
    extend: 'Dashboard.model.alerts.Alert',
    
    fields: [
        {
            name: 'location', // object
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/location'
        }
    })
});



