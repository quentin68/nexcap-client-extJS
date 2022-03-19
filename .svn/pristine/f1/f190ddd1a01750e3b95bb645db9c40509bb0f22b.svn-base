Ext.define('Dashboard.model.ImportCreate', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],

    fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'filename',
            type: 'string'
        }, {
            name: 'importationDate',
            type: 'string'
        }, {
            name: 'username',
            type: 'string'
        }, {
            name: 'nbErrors',
            type: 'int'
        }],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/import/file',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/import/file',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/import/'
        }
    })
});