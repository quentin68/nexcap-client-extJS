Ext.define('Dashboard.store.historic.alerts.Devices', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.historicAlertsDevices',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.historic.alerts.DeviceAlert',
    
    sorters: [
        {
            property: 'alertConfigurationName',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/devices/search'
    })
});