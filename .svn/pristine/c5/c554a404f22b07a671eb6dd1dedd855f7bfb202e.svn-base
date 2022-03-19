Ext.define('Dashboard.store.historic.alerts.Items', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.historicAlertsItems',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.historic.alerts.ItemAlert',
    
    sorters: [
        {
            property: 'alertConfigurationName',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/materials/search'
    })
});