/* global Ext  */

Ext.define('Dashboard.model.system.Plugin', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'signature',
            type: 'string'
        },{
            name: 'version',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'lastUpdateDate',
            type: 'date',
            convert: function (val) {
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        },{
            name: 'enabled',
            type: 'boolean'
        },{
            name: 'initialized',
            type: 'boolean'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/plugins/install',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/plugins',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/plugins',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/plugins'
        }
    })
});
