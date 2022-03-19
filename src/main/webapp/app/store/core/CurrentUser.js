/* global Ext  */

Ext.define('Dashboard.store.core.CurrentUser', {
	extend : 'Dashboard.store.StoreBase',
	alias : 'store.currentUser',

	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.store.Proxy' ],

	model : 'Dashboard.model.User',

	remoteSort : true,
	remoteFilter : true,
	pageSize : Dashboard.config.Config.DATAGRID_NB_LINES,
	autoLoad : false,

	proxy : Ext.create('Dashboard.store.Proxy', {
            url : Dashboard.config.Config.SERVER_HOST_NAME + '/users/currentUser',
            actionMethods : {
                    read : 'GET'
            }
	})
});