Ext.define('Dashboard.model.alerts.OperationHistoryAlert', {
	extend : 'Dashboard.model.alerts.Alert',

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			read : Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/operations'
		}
	})
});
