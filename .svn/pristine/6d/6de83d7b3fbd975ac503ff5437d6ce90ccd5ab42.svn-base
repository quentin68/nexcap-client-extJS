Ext.define('Dashboard.model.administration.Position', {
    extend: 'Dashboard.model.Base',

    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],

    fields: [
        {
            name: 'id',
            type: 'auto'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'parent',
            type: 'auto'
        }, {
            name: 'locations',
            type: 'auto'
        }, {
            name: 'counterIdList',
            type: 'auto'
        }, {
            name: 'lastUpdateDate',
            type: 'date',
            convert: function (val){
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            },
            dateFormat: 'd/m/Y h:m:s'
        }, {
            name: 'posX',
            type: 'auto'
        }, {
            name: 'posY',
            type: 'auto'
        }, {
            name: 'path',
            type: 'string'
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'picture',
            type: 'auto'
        }, {
            name: 'children',
            type: 'auto',
            convert: function (val, record){
                if (record.data.locations && record.data.locations.length > 0) {
                    var newVal = val;
                    for (var i = 0; i < record.data.locations.length; i++) {
                        newVal.push(record.data.locations[i]);
                    }
                    return newVal;
                }
            }
        }, {
            name: 'picture',
            type: 'auto'
        }, {
            name: 'securedThumbnailSrc',
            type: 'string'
        }, {
            name: 'securedImageSrc',
            type: 'string'
        }, {
            name: 'thumbnailSrc',
            type: 'string',
            convert: function (val, record){

                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                if (!record.data.picture) {
                    return thumbnailSrc;
                }
                var zoomHidden = true;

                if (record.data.picture.thumbnailName !== undefined && record.data.picture.thumbnailName) {
                    if (record.data.picture.pictureSourceType !== null && record.data.picture.pictureSourceType !== "") {
                        thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL + record.data.picture.pictureSourceType.toUpperCase() + '/'
                                + record.data.picture.pictureSourceId + '?temp=' + Date.now();

                        zoomHidden = false;
                    }
                }

                return thumbnailSrc; // "https://localhost:8443/nexcap/api/v0.1/resources/thumbnail/MATERIAL/2";
            }
        }, {
            name: 'imageSrc',
            type: 'string',
            convert: function (val, record){

                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                if (!record.data.picture) {
                    return thumbnailSrc;
                }
                var zoomHidden = true;

                if (record.data.picture.pictureName !== undefined && record.data.picture.pictureName) {
                    if (record.data.picture.pictureSourceType !== null && record.data.picture.pictureSourceType !== "") {
                        thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_IMAGE + record.data.picture.pictureSourceType.toUpperCase() + '/'
                                + record.data.picture.pictureSourceId + '?temp=' + Date.now();

                        zoomHidden = false;
                    }
                }

                return thumbnailSrc; // "https://localhost:8443/nexcap/api/v0.1/resources/thumbnail/MATERIAL/2";
            }
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/positions',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/positions'
        }
    })

});