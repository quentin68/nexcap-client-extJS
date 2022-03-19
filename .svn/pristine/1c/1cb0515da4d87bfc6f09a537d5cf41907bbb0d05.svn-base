Ext.define('Dashboard.store.Users', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.users',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],

    model: 'Dashboard.model.User',

    sorters: [{
            property: 'sticker',
            direction: 'ASC'
        }],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/users/search'
    })
});   