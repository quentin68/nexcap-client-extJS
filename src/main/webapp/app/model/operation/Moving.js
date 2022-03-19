
Ext.define('Dashboard.model.operation.Move', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id',
            type: 'int'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/move',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/move',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/move',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/move'
        }
    })

});