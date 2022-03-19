
Ext.define('Dashboard.store.cartography.MapsWithMaterialsFilter', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.mapsWithMaterialsFilter',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],

    model: 'Dashboard.model.cartography.Map',
    remoteSort : true,
    autoLoad : false,
    pageSize : 1,

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/cartomaps/searchwithmatfilters',
        actionMethods: {read: 'POST'}
    })
});   