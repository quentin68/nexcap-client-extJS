Ext.define('Dashboard.store.Indicators', {
	extend : 'Dashboard.store.StoreBase',

	requires : [ 'Dashboard.model.Indicator', 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.Indicator',
	remoteSort : true,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,
	autoLoad : false,

	proxy : Ext.create('Dashboard.store.Proxy', {
		actionMethods : { read : 'GET', create : 'POST', update : 'PUT', destroy : 'DELETE' }
	}),

	/**
	 * Update URL before loading
	 * 
	 * @param {type} dashboardId
	 * @returns {undefined}
	 */
	filterByDashboardId : function(dashboardId) {
		
		var url = Dashboard.config.Config.SERVER_HOST_NAME + '/dashboards/' + dashboardId + '/indicators';
		// var url = 'resources/data/indicators.json';
		this.getProxy().setUrl(url);
	}
});
