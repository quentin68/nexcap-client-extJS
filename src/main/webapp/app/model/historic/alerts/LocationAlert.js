Ext.define('Dashboard.model.historic.alerts.LocationAlert', {
    extend: 'Dashboard.model.historic.alerts.Alert',

    fields: [
        {
            name: 'locationName',
            type: 'string'
        }, {
            name: 'locationDescription',
            type: 'string'
        }, {
            name: 'locationAdress',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/locations'
        }
    })
});
