Ext.define('Dashboard.model.settings.NotifMailConfig', {
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
            name: 'description',
            type: 'string'
        },
        {
            name: 'controlId',
            type: 'int'
        },
        {
            name: 'triggers',
            type: 'auto'
        },
        {
            name: 'profileIds',
            type: 'auto'
        },
        {
            name: 'mailFrom',
            type: 'string'
        },
        {
            name: 'mailHeader',
            type: 'string'
        },
        {
            name: 'mailFooter',
            type: 'string'
        },
        {
            name: 'columns',
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {            
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders'
        }
    })
});   