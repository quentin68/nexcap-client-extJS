/* global Ext */

Ext.define('Dashboard.store.Addresses', {
	extend : 'Dashboard.store.StoreBase',
	requires : [ 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.Address',
	remoteSort : true,
	autoLoad : false,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,

	proxy : Ext.create('Dashboard.store.Proxy', {
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/addresses/search'
	})
});