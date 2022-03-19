/* global Ext  */

Ext.define('Dashboard.model.system.Device', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'signature',
            type: 'string'
        },{
            name: 'softwareVersion',
            type: 'string'
        },{
            name: 'location',
            type: 'auto'
        },{
            name: 'position',
            type: 'auto'
        },{
            name: 'address',
            type: 'string',
            convert: function(val, record){
                if (record.data.location && record.data.location.address ) {
                    return record.data.location.address;
                }else if (record.data.position && record.data.position.address ) {
                    return record.data.position.address;
                }else{
                    return '';
                }
            }
        },{
            name: 'deviceType',
            type: 'string'
        },{
            name: 'databaseId',
            type: 'int'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'authorized',
            type: 'bool'
        },{
            name: 'deviceTypeLabel',
            type: 'string',
            convert: function(val, record){
                if (record.data.deviceType) {
                    var deviceType = Dashboard.manager.system.DevicesManager.getDeviceTypeByType(record.data.deviceType);
                    if(deviceType){
                        return getText(deviceType.data.label);
                    }else{
                        return record.data.deviceType;
                    }
                }
            }
        },{
            name: 'ipAddress',
            type: 'string'
        },{
            name: 'configuration',
            type: 'auto'
        },{
            name: 'properties',
            type: 'auto'
        },{
            name: 'logFileRequired',
            type: 'boolean'
        },{
            name: 'files',
            type: 'auto'
        },{
            name: 'logFiles',
            type: 'auto'
        },{
            name: 'picture',
            type: 'auto',
            convert: function (val, record){
                if (!val) {
                    return {
                        thumbnailName: null,
                        pictureName: null,
                        pictureSourceType: null
                    };
                }
            }
        }, {
            name: 'securedThumbnailSrc',
            type: 'string'
        }, {
            name: 'securedImageSrc',
            type: 'string'
        },{
            name: 'thumbnailSrc',
            type: 'string',
            convert: function (val, record){

                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                if (record.data.picture === undefined && !record.data.picture) {
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
        },{
            name: 'imageSrc',
            type: 'string',
            convert: function (val, record){

                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                if (record.data.picture === undefined && !record.data.picture) {
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
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/devices',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/devices',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/devices',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/devices'
        }
    })
});
