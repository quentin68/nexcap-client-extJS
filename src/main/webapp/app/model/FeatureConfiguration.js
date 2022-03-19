Ext.define('Dashboard.model.FeatureConfiguration', {
	extend : 'Dashboard.model.Base',
	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.config.Config' ],

	fields : [ {
		name : 'id',
		type : 'auto'
	}, {
		name : 'featureName',
		type : 'string'
	}, {
		name : 'filtersConfiguration',
		type : 'auto'
	}, {
		name : 'viewListConfiguration',
		type : 'auto'
	}, {
		name : 'toolsConfiguration',
		type : 'auto'
	}, {
		name : 'detailConfiguration',
		type : 'auto'
	}, {
		name : 'appearance',
		type : 'auto'
	} ],

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			create : Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration',
			read : Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration',
			update : Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration',
			destroy : Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration'
		}
	})
});