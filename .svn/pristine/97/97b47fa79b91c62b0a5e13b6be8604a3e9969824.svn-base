Ext.define('Dashboard.model.historic.alerts.DeviceAlert', {
    extend: 'Dashboard.model.historic.alerts.Alert',

    fields: [
        {
            name: 'deviceName',
            type: 'string'
        }, {
            name: 'deviceSignature',
            type: 'string'
        }, {
            name: 'deviceDescription',
            type: 'string'
        }, {
            name: 'deviceType',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/items'
        }
    })
});
