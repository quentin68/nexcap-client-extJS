Ext.define('Dashboard.model.alerts.AlertsConfiguration', {
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
            name: 'alertLevel', // LOW | HIGH
            type: 'string'
        }, {
            name: 'alertType', // Dashboard.store.enums.AlertModelType
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'enabled',
            type: 'boolean'
        }, {
            name: 'params', //jSon params
            type: 'auto'
        }, {
            name: 'alertConfigurationBean', // object
            type: 'auto'
        }, {
            name: 'triggers', // list
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {            
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfiguration',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfiguration',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfiguration',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/alertconfiguration'
        }
    })

});   