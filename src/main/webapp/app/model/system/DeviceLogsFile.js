/* global Ext  */

Ext.define('Dashboard.model.system.DeviceLogsFile', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/logs',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/logs',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/logs',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/logs'
        }
    })
});
