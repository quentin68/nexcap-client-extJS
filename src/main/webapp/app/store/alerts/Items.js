Ext.define('Dashboard.store.alerts.Items', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsItems',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.alerts.ItemAlert',
    
    sorters: [
        {
            property: 'startDate',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/items/search'
    })
});