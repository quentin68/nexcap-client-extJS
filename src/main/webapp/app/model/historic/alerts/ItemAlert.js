Ext.define('Dashboard.model.historic.alerts.ItemAlert', {
    extend: 'Dashboard.model.historic.alerts.Alert',

    fields: [
        {
            name: 'materialName',
            type: 'string'
        }, {
            name: 'productReferenceDesignation',
            type: 'string'
        }, {
            name: 'productReferenceCode',
            type: 'string'
        }, {
            name: 'productCategoryName',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/materials'
        }
    })
});
