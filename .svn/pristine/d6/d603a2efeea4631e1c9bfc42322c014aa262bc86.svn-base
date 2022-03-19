/* global Ext, moment */

Ext.define('Dashboard.model.system.Processor', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'params',
            type: 'auto'
        }, {
            name: 'resultType',
            type: 'string'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/processorconfiguration',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/processorconfiguration',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/processorconfiguration',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/processorconfiguration'
        }
    })

});