Ext.define('Dashboard.model.system.Authorize', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id', 
            type: 'auto'
        },{
            name: 'positionId',
            type: 'int'
        },{
            name: 'positionName',
            type: 'string'
        },{
            name: 'locationName',
            type: 'string'
        },{
            name: 'deviceType',
            type: 'string'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        appendId: false,
        actionMethods: {read: 'GET', create: 'POST', update: 'POST', destroy: 'DELETE'},
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/authorize',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/authorize',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/authorize',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/authorize'
        }
    })
});   