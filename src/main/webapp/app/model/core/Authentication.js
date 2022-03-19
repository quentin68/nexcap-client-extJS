Ext.define('Dashboard.model.core.Authentication', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'username', 
            type: 'string'
        },{
            name: 'password',
            type: 'string'
        }
    ],
    
    proxy : {
        
        type: 'rest',
        noCache: true,
        timeout: 30000,
        appendId: true,
        
        cors: true,
        useDefaultXhrHeader: false,
        withCredentials: true,
        
        async: false,
                
        api: {},
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/authentication/login',
        actionMethods: {read: 'GET', create: 'POST', update: 'POST', destroy: 'DELETE'},
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