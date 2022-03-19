Ext.define('Dashboard.store.administration.Requirements', {
	extend : 'Dashboard.store.StoreBase',
	alias : 'store.requirements',

	requires : [ 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.administration.Requirement',
	remoteSort : true,
	autoLoad : false,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,

	proxy : Ext.create('Dashboard.store.Proxy', {
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/requirements/search'
	})
});