Ext.define('Dashboard.model.Proxy', {
    extend: 'Ext.data.proxy.Rest',

    type: 'rest',
    startParam: false,
    limitParam: false,
    pageParam: false, // to remove param "page"
    noCache: false, // to remove param "_dc"
    queryParam: false, //to remove param "query"
    timeout: Dashboard.config.Config.PROXY_TIMEOUT,
    appendId: true,
    simpleSortMode: false, // to remove directionParam "dir"
    
    cors: true,
    useDefaultXhrHeader: false,
    withCredentials: true,

    actionMethods: {
        read: 'GET',
        create: 'POST',
        update: 'PUT',
        destroy: 'DELETE'
    },

    headers: {},
    api: {},

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
        exception: function (proxy, response, operation){
            Dashboard.tool.Utilities.error(response);
            Dashboard.engine.ResponseManager.errorHandler(proxy, response, operation);
        }
    }
});