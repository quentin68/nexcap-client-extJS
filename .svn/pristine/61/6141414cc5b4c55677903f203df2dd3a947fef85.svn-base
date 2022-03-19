Ext.define('Dashboard.store.DataCollections', {
	extend : 'Ext.data.Store',

	requires : [ 'Dashboard.model.StatisticReference', 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.StatisticReference',
	remoteSort : true,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,
	autoLoad : false,

	proxy : {
		type : 'rest',

		pageParam : false,
		startParam : false,
		limitParam : false,
		appendId : false,
		noCache : false,
                
                cors: true,
                useDefaultXhrHeader: false,
                withCredentials: true,

		// url: 'resources/data/dataCollections.json',
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/statistics?fp=calculby&fv=now&fc=CONTAINS',

		timeout : 30000,

		headers : {},

		reader : {
			type : 'json',
			rootProperty : 'data',
			encoding : 'utf8',
			successProperty : 'success',
			totalProperty : 'total'
		},

		listeners : {
			exception : function(proxy, response, operation) {
				Dashboard.tool.Utilities.error(response);
				Dashboard.engine.ResponseManager.errorHandler(proxy, response, operation);
			}
		}
	}
});
