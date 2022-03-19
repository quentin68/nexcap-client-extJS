/* global Ext, moment */

Ext.define('Dashboard.model.Category', {
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
            name: 'parentCategory',
            type: 'auto'
        }, {
            name: 'subCategoryList',
            type: 'auto'
        }, {
            name: 'path',
            type: 'string'
        }, {
            name: 'fullPath',
            type: 'string'
        }, {
            name: 'productReferenceIdList',
            type: 'auto'
        }, { // Usefull to display in combobox
            name: 'hasReferences',
            convert: function (v, record){

                if (record.data.productReferenceIdList === undefined || record.data.subCategoryList === undefined) {
                    return;
                }

                if (record.data.productReferenceIdList.length > 0 || record.data.subCategoryList.length > 0) {
                    return true;
                } else {
                    record.data.reasonNotSelectable = getText('This category is linked to any reference and sub-category.');
                    return false;
                }
            }
        }, { // Usefull to display a qtip when not selectable in combobox
            name: 'reasonNotSelectable'
        }, {
            name: 'picture',
            type: 'auto'// ,
                    // convert: function(val,record) {
                    // if(!val){
                    // return {thumbnailName:null, pictureName:null, pictureSourceType:null};
                    // }
                    // }
        }, {
            name: 'materialPropertyConfigurationList',
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
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/productcategory',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/productcategory'
        }
    })
});