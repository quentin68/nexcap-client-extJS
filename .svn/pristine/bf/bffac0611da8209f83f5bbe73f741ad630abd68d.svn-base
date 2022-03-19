Ext.define('Dashboard.model.Reference', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],
    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'designation',
            type: 'string'
        }, {
            name: 'identified',
            type: 'boolean'
        }, {
            name: 'referenceCode',
            type: 'string'
        }, {
            name: 'assignedLocForPositionDtos',
            type: 'auto'
        }, {
            name: 'lastUpdateDate',
            type: 'date',
            convert: function (val) {
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
            name: 'type',
            type: 'string',
            convert: function (val, record) {
                return record.data.identified ? getText('Items') : getText('Materials set'); 
            }
        }, {
            name: 'productCategoryId',
            type: 'int'
        }, {
            name: 'productCategoryName',
            type: 'string'
        }, {
            name: 'pictureName',
            type: 'string'
        }, {
            name: 'thumbnailName',
            type: 'string'
        }, {
            name: 'pictureSourceType',
            type: 'string'
        }, {
            name: 'pictureSourceId',
            type: 'int'
        }, {
            name: 'picture',
            type: 'auto'// ,
                    // convert: function(val,record) {
                    // if(!val){
                    // return {thumbnailName:null, pictureName:null, pictureSourceType:null};
                    // }
                    // }
        }, {
            name: 'codeList',
            type: 'auto'
        }, {
            name: 'materialIdList',
            type: 'auto'
        }, {
            name: 'materialSetIdList',
            type: 'auto'
        }, {
            name: 'interventionOrderList',
            type: 'auto'
        }, {
            name: 'files',
            type: 'auto'
        }, {
            name: 'properties',
            type: 'auto'
        }, {
            name: 'propertiesObject',
            type: 'auto',
            convert: function (val, record) {
                var props = {};
                if (!record.data.properties) {
                    return props;
                }
                Ext.each(record.data.properties, function (prop) {
                    props[prop.name] = prop;
                });
                return props;
            }
        }, {
            name: 'materialPropertyConfigurationList',
            type: 'auto'
        }, {
            name: 'inheritedMaterialPropertyConfigurationList',
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
            convert: function(val, record){

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
            convert: function(val, record){

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
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/productreference',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/productreference'
        }
    })
});