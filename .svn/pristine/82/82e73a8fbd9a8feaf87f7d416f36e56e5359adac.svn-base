Ext.define('Dashboard.store.alerts.Inventories', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsInventories',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.alerts.InventoryAlert',
    
    sorters: [
        {
            property: 'startDate',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/inventory/search'
    })
});