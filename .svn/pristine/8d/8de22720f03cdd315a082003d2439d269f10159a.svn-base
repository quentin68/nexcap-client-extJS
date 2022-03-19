Ext.define('Dashboard.model.Indicator', {
    extend: 'Ext.data.Model',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'indicatorType',
            type: 'string'
        }, {
            name: 'title',
            type: 'string'
        }, {
            name: 'creationDate',
            type: 'string'
        }, {
            name: 'authorName',
            type: 'string'
        }, {
            name: 'iconName',
            type: 'string'
        }, {
            name: 'dataBinding',
            type: 'auto'
        }, {
            name: 'dashboardIds',
            type: 'auto'
        }, {
            name: 'color',
            type: 'string'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/indicators',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/indicators',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/indicators',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/indicators'
        }
    })
});