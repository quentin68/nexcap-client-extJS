Ext.define('Dashboard.model.cartography.OutdoorMap', {
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
            type: 'string',
            convert: function (val, record) {
                if(!val || val === undefined){
                    return record.data.title;
                }else{
                    return val;
                }
            }
        }, {
            name: 'title',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'picture',
            type: 'auto'
        }, {
            name: 'geoLocSystem',
            type: 'auto'
        }, {
            name: 'geoLocArea',
            type: 'auto'
        }, {
            name: 'materialsLayer',
            type: 'auto'
        }, {
            name: 'devicesLayer',
            type: 'auto'
        }, {
            name: 'locationsLayer',
            type: 'auto'
        }, {
            name: 'linkingZonesLayer',
            type: 'auto'
        }, {
            name: 'labelsLayer',
            type: 'auto'
        }
    ],
    

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor'
        }
    })
});   