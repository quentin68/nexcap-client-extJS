//old
Ext.define('Dashboard.store.alerts.ItemsAlerts', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsItemsOld',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.alerts.ItemAlert',
    
    sorters: [
        {
            property: 'controlName',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/items/search'
    })
});
