Ext.define('Dashboard.store.alerts.Devices', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsDevices',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.alerts.DeviceAlert',
    
    sorters: [
        {
            property: 'startDate',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/device/search'
    })
});