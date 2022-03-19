Ext.define('Dashboard.model.alerts.InventoryAlert', {
    extend: 'Dashboard.model.alerts.Alert',
    
    fields: [
        {
            name: 'inventory', // object
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/inventory'
        }
    })
});
