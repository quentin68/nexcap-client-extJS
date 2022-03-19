
Ext.define('Dashboard.store.References', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.references',
    storeId: 'referencesStore',

    requires: [
        'Dashboard.model.Reference',
        'Dashboard.tool.Utilities'
    ],

    model: 'Dashboard.model.Reference',

    sorters: [
        {
            property: 'designation',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/productreference/search'
    })

});
