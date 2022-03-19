Ext.define('Dashboard.store.historic.OperationsAlerts', {
	extend : 'Dashboard.store.StoreBase',
	alias : 'store.HistoricOperationsAlerts',

	requires : [ 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.alerts.OperationHistoryAlert',

	proxy : Ext.create('Dashboard.store.Proxy', {
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/operations/search'
	})
});
