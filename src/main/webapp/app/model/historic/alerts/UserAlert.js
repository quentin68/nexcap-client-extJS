Ext.define('Dashboard.model.historic.alerts.UserAlert', {
    extend: 'Dashboard.model.historic.alerts.Alert',

    fields: [
        {
            name: 'userInAlertSticker',
            type: 'string'
        }, {
            name: 'userInAlertLastName',
            type: 'string'
        }, {
            name: 'userInAlertFirstName',
            type: 'string'
        }, {
            name: 'userInAlertLogin',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/users'
        }
    })
});
