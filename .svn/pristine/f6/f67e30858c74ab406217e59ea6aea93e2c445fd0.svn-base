Ext.define('Dashboard.model.core.LogOut', {
    extend: 'Dashboard.model.Base',
    
    fields: [],
    
    proxy : {
        
        type: 'rest',
        noCache: true,
        timeout: 30000,
        appendId: true,
        
        cors: true,
        useDefaultXhrHeader: false,
        withCredentials: true,
        
        api: {},
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/authentication/logout/',
        actionMethods: {read: 'GET', create: 'GET', update: 'GET'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            encoding: 'utf8',
            successProperty: 'success',
            totalProperty: 'total'
        },
        
        writer: {
            type: 'json',
            writeAllFields: true
        },
                
        listeners: {
            exception: function(proxy, response, operation) {
                Dashboard.tool.Utilities.error(response);
            }
        }
    }

});   