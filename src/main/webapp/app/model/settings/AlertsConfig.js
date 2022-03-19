Ext.define('Dashboard.model.settings.AlertsConfig', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },
        {
            name: 'number',
            type: 'int'
        },
        {
            name: 'alertLevel',//
            type: 'int'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'raisedByOnGoingOp',
            type: 'boolean'
        },
        {
            name: 'enabled',
            type: 'boolean'
        },
        {
            name: 'params',
            type: 'auto'
        },
        {
            name: 'controlDefinition',
            type: 'auto'
        },
        {
            name: 'operations',
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {            
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/control',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/control',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/control',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/control'
        }
    })

});   