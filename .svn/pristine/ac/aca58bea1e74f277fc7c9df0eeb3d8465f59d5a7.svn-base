/* global Ext  */

Ext.define('Dashboard.model.system.DeviceConfigurationProperty', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'type',
            type: 'string'
        },{
            name: 'modifiable',
            type: 'boolean'
        },{
            name: 'group',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'value',
            type: 'string'
        },{
            name: 'serverValue',
            type: 'string'
        },{
            name: 'errorFlag',
            type: 'boolean'
        },{
            name: 'errorMessage',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/configuration',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/configuration',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/configuration',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/configuration'
        }
    })
});