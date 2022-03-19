Ext.define('Dashboard.store.alerts.Locations', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsLocations',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.alerts.LocationAlert',
    
    sorters: [
        {
            property: 'startDate',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/location/search'
    })
});