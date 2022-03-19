Ext.define('Dashboard.store.BufferedMaterials', {
	extend : 'Ext.data.BufferedStore',
	alias : 'store.bufferedMaterials',
	storeId : 'bufferedMaterialsStore',

	requires : [ 'Dashboard.model.Material', 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.Material',

	remoteGroup : true,
	pageSize : 100,// Dashboard.config.Config.BUFFERED_DATAGRID_NB_LINES,
	leadingBufferZone : 300,
	autoLoad : true,

	listeners : {
		beforesort : function(store, sorters, eOpts) {
			if (this.getProxy().extraParams.sort === undefined || this.getProxy().simpleSortMode === true) {
				this.getProxy().extraParams.sort = [];
			}

			Ext.each(sorters, function(sort) {
				var mySort = {
					property : sort._property,
					direction : sort._direction
				};
				this.getProxy().extraParams.sort.push(mySort);
			}, this);
		},

		beforefilter : function(store, filters, eOpts) {
			if (this.getProxy().extraParams.filter === undefined) {
				this.getProxy().extraParams.filter = [];
			}

			Ext.each(filters, function(filter) {
				var myFilter = {
					property : filter._property,
					value : filter._value,
					type : filter._type,
					comparison : filter._comparison
				};
				this.getProxy().extraParams.filter.push(myFilter);
			}, this);
		}
	},

	proxy : Ext.create('Dashboard.store.Proxy', {
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/materials/search'
	})
});
