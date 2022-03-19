Ext.define('Dashboard.model.settings.NotifMailTrigger', {
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
            name: 'trigger',
            type: 'string'
        },
        {
            name: 'parameters',
            type: 'string'
        },
        {
            name: 'nexcapActionId',
            type: 'int'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {            
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders/triggers',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders/triggers',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders/triggers',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders/triggers'
        }
    })
});   