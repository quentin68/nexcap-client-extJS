
Ext.define('Dashboard.model.operation.Return', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id',
            type: 'int'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/return',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/return',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/return',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/return'
        }
    })

});