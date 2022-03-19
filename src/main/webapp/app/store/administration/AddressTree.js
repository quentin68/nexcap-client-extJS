Ext.define('Dashboard.store.administration.AddressTree', {
	extend : 'Ext.data.TreeStore',
	alias : 'store.addressTree',

	requires : [ 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.administration.AddressTree',

	autoLoad : true,
	lazyFill : true,
	filterer : 'bottomup',
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,

	defaultRootText : 'name',
	nodeParam : 'id',

	expanded : true,
	folderSort : true,
	sorters : [ {
		property : 'text',
		direction : 'ASC'
	} ],

	proxy : Ext.create('Dashboard.store.Proxy', {
		actionMethods : {
			read : 'GET'
		},

		api : {
			read : Dashboard.config.Config.SERVER_HOST_NAME + '/positions/getTree'
		},
		reader : {
			rootProperty : function(node) {
				if (node.data) {
					return node.data[0];
				} else {
					return node.children;
				}
			},
			type : 'json',
			encoding : 'utf8',
			successProperty : 'success',
			totalProperty : 'total'
		}
	})
});