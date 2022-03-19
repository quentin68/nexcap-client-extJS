Ext.define('Dashboard.store.historic.alerts.Locations', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.historicAlertsLocations',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.historic.alerts.LocationAlert',
    
    sorters: [
        {
            property: 'alertConfigurationName',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/locations/search'
    })
});