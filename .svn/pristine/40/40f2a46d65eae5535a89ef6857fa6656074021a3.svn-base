Ext.define('Dashboard.model.system.Package', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        },{
            name: 'identifier', 
            type: 'string'
        },{
            name: 'name', 
            type: 'string'
        },{
            name: 'deviceType', 
            type: 'string'
        },{
            name: 'targetVersion', 
            type: 'string'
        },{
            name: 'description', 
            type: 'string'
        },{
            name: 'selfCompatibility', 
            type: 'string'
        },{
            name: 'serverCompatibility', 
            type: 'string'
        },{
            name: 'storagePath', 
            type: 'string'
        },{
            name: 'localisedDeviceType',
            type: 'string'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/packages',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/packages',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/packages',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/packages'
        }
    })

});   