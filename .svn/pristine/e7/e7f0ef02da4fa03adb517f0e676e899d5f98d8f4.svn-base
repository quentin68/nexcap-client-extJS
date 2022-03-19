
Ext.define('Dashboard.store.cartography.GeoLocSystems', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.geoLocSystems',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.cartography.GeoLocSystem',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/geolocsystems/search'
    })
});   