/* global Ext, moment */

Ext.define('Dashboard.model.alerts.UserAlert', {
    extend: 'Dashboard.model.alerts.Alert',
    
    fields: [
        {
            name: 'user', // object
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/user'
        }
    })
});
