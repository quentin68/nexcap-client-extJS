Ext.define('Dashboard.model.historic.alerts.StockAlert', {
    extend: 'Dashboard.model.historic.alerts.Alert',

    fields: [
        {
            name: 'productReferenceName',
            type: 'string'
        }, {
            name: 'productReferenceDesignation',
            type: 'string'
        }, {
            name: 'productReferenceCode',
            type: 'string'
        }, {
            name: 'stockLevellocationName',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/stocklevel'
        }
    })
});



