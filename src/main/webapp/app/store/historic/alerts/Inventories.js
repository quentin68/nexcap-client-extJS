Ext.define('Dashboard.store.historic.alerts.Inventories', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.historicAlertsInventories',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.historic.alerts.InventoryAlert',
    
    sorters: [
        {
            property: 'alertConfigurationName',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/inventories/search'
    })
});