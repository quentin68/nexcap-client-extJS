Ext.define('Dashboard.store.settings.ControlDefinition', {
	extend : 'Dashboard.store.StoreBase',
	alias : 'store.controlDefinition',

	requires : [ 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.settings.ControlDefinition',
	remoteSort : true,
	autoLoad : false,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,

	proxy : Ext.create('Dashboard.store.Proxy', {
		//actionMethods : { read : 'GET' },
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/controlDefinition/search'
	})
});