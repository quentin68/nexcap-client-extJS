
Ext.define('Dashboard.store.cartography.OutdoorMapsWithMaterialsFilter', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.outdoorMapsWithMaterialsFilter',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],

    model: 'Dashboard.model.cartography.OutdoorMap',
    remoteSort : true,
    autoLoad : false,
    pageSize : 1,
    
//    proxy: {
//        type: 'ajax',
//        url: 'resources/data/geoloc/searchwithfiltersoutdoormap.json',
//        reader: {
//            type: 'json',
//            rootProperty: 'data',
//            encoding : 'utf8',
//            successProperty : 'success',
//            totalProperty : 'total'
//        }
//    }

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor/search', //'/carto/cartomaps/searchwithfiltersoutdoormap'
        actionMethods: {read: 'POST'}
    })
});   