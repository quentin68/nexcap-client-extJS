Ext.define('Dashboard.store.DashboardScenes', {
	extend : 'Dashboard.store.StoreBase',

	requires : [ 'Dashboard.model.DashboardScene', 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.DashboardScene',
	remoteSort : true,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,
	autoLoad : false,
        
        sorters: [
            {
                property: 'name',
                direction: 'ASC'
            }
        ],

	proxy : Ext.create('Dashboard.store.Proxy', {
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/dashboards',
		actionMethods : { read : 'GET', create : 'POST', update : 'PUT', destroy : 'DELETE' }
	})
});