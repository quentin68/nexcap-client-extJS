Ext.define('Dashboard.model.administration.StocksCreate', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'minLevel',
            type: 'auto'
        },{
            name: 'maxLevel',
            type: 'auto'
        },
        {
            name: 'productReferenceId',
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel'
        }
    })

});

