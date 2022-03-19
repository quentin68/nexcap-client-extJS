/* global Ext  */

Ext.define('Dashboard.store.StoreBase', {
	extend : 'Ext.data.Store',
	requires : [ 'Dashboard.tool.Utilities' ],

	remoteSort : true,
	remoteFilter : true,
	autoLoad : false,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,

	listeners : {
		beforeload : function(store, operation, eOpts) {},
		
		beforesort : function(store, sorters, eOpts) {
                    if (this.getProxy().actionMethods.read === 'GET') {
                        this.getProxy().extraParams.sp = [];
                        this.getProxy().extraParams.sd = [];
                        if (sorters.length > 0) {
                            var sort = sorters[0]; 
                            this.getProxy().extraParams.sp.push(sort._property);
                            this.getProxy().extraParams.sd.push(sort._direction);
                        }
                    } else {
                        // Only one sort at a time
                        this.getProxy().extraParams.sort = [];
			Ext.each(sorters, function(sort) {
                            
                            //debugger;
                            var mySort = {
					property : sort._property,
					direction : sort._direction
                            };
                            this.getProxy().extraParams.sort.push(mySort);
                        }, this);
                    }
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
	}
});
