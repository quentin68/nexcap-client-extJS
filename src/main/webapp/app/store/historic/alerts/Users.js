Ext.define('Dashboard.store.historic.alerts.Users', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.historicAlertsUsers',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.historic.alerts.UserAlert',
    
    sorters: [
        {
            property: 'alertConfigurationName',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/users/search'
    })
});