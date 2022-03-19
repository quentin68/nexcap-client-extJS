Ext.define('Dashboard.model.system.Context', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'rootPositionList',
            type: 'auto'
        }, {
            name: 'userList',
            type: 'auto'
        }, {
            name: 'deviceList',
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/light',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/contexts'
        }
    })
});   