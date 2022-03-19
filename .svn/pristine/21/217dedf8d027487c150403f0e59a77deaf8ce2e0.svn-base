Ext.define('Dashboard.model.cartography.GeoLocSystem', {
    extend: 'Dashboard.model.Base',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'label',
            type: 'auto'
        }, {
            name: 'landmark',
            type: 'auto'
        }, {
            name: 'locations',
            type: 'auto'
        }, {
            name: 'devices',
            type: 'auto'
        }, {
            name: 'items',
            type: 'auto'
        }, {
            name: 'labels',
            type: 'auto'
        }, {
            name: 'width',
            type: 'auto'
        }, {
            name: 'height',
            type: 'auto'
        }, {
            name: 'length',
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/geolocsystems',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/geolocsystems',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/geolocsystems'
        }
    })
});   