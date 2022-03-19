Ext.define('Dashboard.model.alerts.ItemAlert', {
    extend: 'Dashboard.model.alerts.Alert',

    fields: [
        {
            name: 'material',
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/items'
        }
    })
});
