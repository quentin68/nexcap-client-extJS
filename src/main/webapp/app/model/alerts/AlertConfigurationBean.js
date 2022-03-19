Ext.define('Dashboard.model.alerts.AlertsConfigurationBean', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    
    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'springBeanName',
            type: 'string'
        }, {
            name: 'compatibleAlertType', // list string
            type: 'auto'
        }, {
            name: 'compatibleTriggers', // list object
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {            
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfigurationbean',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfigurationbean',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfigurationbean',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfigurationbean'
        }
    })

});   