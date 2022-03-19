/* global Ext, moment */

Ext.define('Dashboard.model.administration.Location', {
    extend: 'Dashboard.model.Base',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],

    fields: [
        {
            name: 'id',
            type: 'auto'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'parentPosition',
            type: 'auto'
        }, {
            name: 'parentPositionId',
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
            }
        }, {
            name: 'path',
            type: 'string'
        }, {
            name: 'address',
            type: 'string'
        }, {
            neme: 'authorizedUsers',
            type: 'auto'
        }, {
            name: 'stock',
            type: 'boolean'
        }, {
            name: 'isStock',
            type: 'boolean'
        }, {
            name: 'pictureSourceType',
            type: 'string'
        }, {
            name: 'pictureSourceId',
            type: 'int'
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

                return thumbnailSrc;
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
        },
        {
            name: 'properties',
            type: 'auto'
        }, {
            name: 'propertiesObject',
            type: 'auto',
            convert: function (val, record){
                var props = {};
                if (!record.data.properties) {
                    return props;
                }
                Ext.each(record.data.properties, function (prop){
                    props[prop.name] = prop;
                });
                return props;
            }
        }
    ],
    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/locations',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/locations',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/locations',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/locations'
        }
    })
});   