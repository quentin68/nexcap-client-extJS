Ext.define('Dashboard.model.system.ContextUpdateUsers', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'objectIds',
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        appendId : false,
        api: {
            update: Dashboard.config.Config.SERVER_HOST_NAME + '',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + ''
        },
        actionMethods : {
		read : 'GET',
		create : 'POST',
		update : 'POST',
		destroy : 'DELETE'
	}
    })
});   