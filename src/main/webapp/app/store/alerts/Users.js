Ext.define('Dashboard.store.alerts.Users', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsUsers',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.alerts.UserAlert',
    
    sorters: [
        {
            property: 'startDate',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/user/search'
    })
});