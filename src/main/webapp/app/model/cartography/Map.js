Ext.define('Dashboard.model.cartography.Map', {
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
            name: 'rootPosition',
            type: "auto"
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
        }, {
            name: 'thumbnailSrc',
            type: 'string',
            convert: function (val, record) {

                var thumbnailSrc = Dashboard.config.Config.DEFAULT_MAP_BACKGROUND;
                
                if (!record.data.picture) {
                    return thumbnailSrc;
                }
                var zoomHidden = true;

                if (record.data.picture.imageSrc !== undefined && record.data.picture.imageSrc) {
                    
                    thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_IMAGE_CARTO
                            + record.data.id + '/'
                            + record.data.picture.imageSrc;
                            + '?temp=' + Date.now();

                    zoomHidden = false;
                }

                return thumbnailSrc;
            }
        }, {
            name: 'imageSrc',
            type: 'string',
            convert: function (val, record) {
                
                //https://localhost:8443/nexcap/api/v0.1/carto/resources/image/CARTOMAP/11/picture.jpg

                var thumbnailSrc = Dashboard.config.Config.DEFAULT_MAP_BACKGROUND;

                if (!record.data.picture) {
                    return thumbnailSrc;
                }
                var zoomHidden = true;

                if (record.data.picture.imageSrc !== undefined && record.data.picture.imageSrc) {
                    
                    thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_IMAGE_CARTO
                            + record.data.id + '/'
                            + record.data.picture.imageSrc
                            + '?temp=' + Date.now();

                    zoomHidden = false;
                }

                return thumbnailSrc;
            }
        }
    ],
    

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/cartomaps',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/cartomaps',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/cartomaps',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/cartomaps'
        }
    })
});   