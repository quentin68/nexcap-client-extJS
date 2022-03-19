Ext.define('Dashboard.model.historic.alerts.InventoryAlert', {
    extend: 'Dashboard.model.historic.alerts.Alert',

    fields: [
        {
            name: 'inventoryAdress',
            type: 'string'
        }, {
            name: 'inventoryContext',
            type: 'string'
        }, {
            name: 'inventoryReference',
            type: 'string'
        }, {
            name: 'inventoryComments',
            type: 'string'
        }, {
            name: 'inventoryDate',
            type: 'date',
            convert: function (val){
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate();
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/inventory'
        }
    })
});
