Ext.define('Dashboard.model.system.ContextCreate', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'rootPositionIdList',
            type: 'auto'
        }, {
            name: 'userIdList',
            type: 'auto'
        }, {
            name: 'deviceIdList',
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        actionMethods: {
            update: 'PUT'
        },
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/contexts',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/contexts'
        }
    })
});   