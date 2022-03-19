Ext.define('Dashboard.store.Proxy', {
	extend : 'Ext.data.proxy.Rest',

	type : 'rest',
	paramsAsJson : true,
	pageParam : false, // to remove param "page"
	noCache : false, // to remove param "_dc"
	queryParam : false, //to remove param "query"
	timeout : Dashboard.config.Config.PROXY_TIMEOUT,
	simpleSortMode : false, // to remove directionParam "dir"
        
        cors: true,
        useDefaultXhrHeader: false,
        withCredentials: true,

	actionMethods : {
            read : 'POST',
            create : 'POST',
            update : 'PUT',
            destroy : 'DELETE'
	},

	headers : {},
	api : {},

	reader : {
		type : 'json',
		rootProperty : 'data',
		encoding : 'utf8',
		successProperty : 'success',
		totalProperty : 'total'
	},

	extraParams : {
		// default filter needed by server
		filter : []
	},

	listeners : {
		exception : function(proxy, response, operation) {
			Dashboard.tool.Utilities.error(response);
			Dashboard.engine.ResponseManager.errorHandler(proxy, response, operation);
		}
	}
});