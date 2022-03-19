Ext.define('Dashboard.model.settings.LocalServerConfig', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    
    fields: [

        {
            name: 'domain', 
            type: 'string'
        },{
            name: 'key',
            type: 'string'
        },
        {
            name: 'value',
            type: 'auto'
        },
        {
            name: 'typeData',
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {            
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/configuration',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/configuration'
        }
    })
});   