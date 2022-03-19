
Ext.define('Dashboard.model.administration.Profile', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'features',
            type: 'auto'
        },{
            name: 'level',
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/profiles',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/profiles',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/profiles',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/profiles'
        }
    })

});