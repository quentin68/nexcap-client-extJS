Ext.define('Dashboard.model.DashboardScene', {
	extend : 'Ext.data.Model',

	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.config.Config' ],

	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'title',
		type : 'string'
	}, {
		name : 'indicatorIds',
		type : 'auto'
	}, {
		name : 'creationDate',
		type : 'string'
	}, {
		name : 'authorName',
		type : 'string'
	}, {
		name : 'configuration',
		type : 'auto'
	}

	],

	proxy : Ext.create('Dashboard.model.Proxy', {
		api : {
			create : Dashboard.config.Config.SERVER_HOST_NAME + '/dashboards',
			read : Dashboard.config.Config.SERVER_HOST_NAME + '/dashboards',
			update : Dashboard.config.Config.SERVER_HOST_NAME + '/dashboards',
			destroy : Dashboard.config.Config.SERVER_HOST_NAME + '/dashboards'
		}
	})
});
