Ext.define('Dashboard.model.alerts.OperationAlert', {
	extend : 'Dashboard.model.alerts.Alert',

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			read : Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/operations'
		}
	})
});
