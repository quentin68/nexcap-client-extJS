Ext.define('Dashboard.store.system.Context', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.context',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],

    model: 'Dashboard.model.system.Context',

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/search'
    })
});   