Ext.define('Dashboard.model.settings.ServerConfig', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    
    fields: [
        {
            name: 'security', 
            type: 'auto'
        },{
            name: 'application',
            type: 'auto'
        },
        {
            name: 'alert',
            type: 'auto'
        },
        {
            name: 'specificCheck',
            type: 'auto'
        },
        {
            name: 'toolTracking.core',
            type: 'auto'
        },
        {
            name: 'technicalConfiguration',
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {},
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/configuration/application'
    })

});   