Ext.define('Dashboard.model.alerts.StockAlert', {
    extend: 'Dashboard.model.alerts.Alert',

    fields: [
        {
            name: 'stockLevel', // object
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/stocklevel'
        }
    })
});



