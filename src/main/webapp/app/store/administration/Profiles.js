Ext.define('Dashboard.store.administration.Profiles', {
	extend : 'Dashboard.store.StoreBase',
	alias : 'store.profiles',

	requires : [ 'Dashboard.tool.Utilities' ],

	model : 'Dashboard.model.administration.Profile',
	remoteSort : true,
	autoLoad : false,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,
        
        sorters: [{property: 'name', direction: 'ASC'}],

	proxy : Ext.create('Dashboard.store.Proxy', {
		url : Dashboard.config.Config.SERVER_HOST_NAME + '/profiles/search'
	}),
	listeners: {
		load: function(records, operation, eOpts) {
			var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
			var highProfilecurrentUser = currentUser.data.highProfileLevel;
			//console.log("highProfilecurrentUser",highProfilecurrentUser);
			var recordLength = records.getData().length;
			switch (highProfilecurrentUser) {
				case "LOW":
					//console.log("Your level is LOW");
					for ( i = recordLength-1; i >= 0 ; --i) {
						var orig_level = records.getData().items[i].data.level;
						if(orig_level === "MEDIUM" || orig_level === "HIGH" || orig_level === "MAX") {
							records.remove(records.getData().items[i]);
						}
					}
					break;
				case "MEDIUM":
					//console.log("You chose level MEDIUM");
					for ( i = recordLength-1; i >= 0 ; --i) {
						var orig_level = records.getData().items[i].data.level;
						if(orig_level === "HIGH"|| orig_level === "MAX") {
							records.remove(records.getData().items[i]);
						}
					}
					break;
				case "HIGH":
					//console.log("You chose level HIGH");
					for ( i = recordLength-1; i >= 0 ; --i) {
						var orig_level = records.getData().items[i].data.level;
						if(orig_level === "MAX") {
							records.remove(records.getData().items[i]);
						}
					}
			}
		}
	}
});