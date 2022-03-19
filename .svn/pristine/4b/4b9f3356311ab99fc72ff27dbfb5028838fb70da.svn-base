Ext.define('Dashboard.model.consultation.MaterialsSet', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    fields: [
        {
            name: 'id', 
            type: 'auto'
        },{
            name: 'productReference', 
            type: 'auto'
        },{
            name: 'identified',
            type: 'boolean'
        },{
            name: 'codeList',
            type: 'auto'
        },{
            name: 'materialIdList',
            type: 'auto'
        },{
            name: 'materialSetIdList',
            type: 'auto'
        },{
            name: 'interventionOrderList',
            type: 'auto'
        },{
            name: 'assignedLocation',
            type: 'string'
        },{
            name: 'location',
            type: 'auto'
        },{
            name: 'count',
            type: 'int'
        },{
            name: 'useCount',
            type: 'int'
        },{
            name: 'unitWeight',
            type: 'auto'
        },{
            name: 'picture',
            type: 'auto',
            convert: function(val,record){
                if(record.data.productReference && record.data.productReference.picture){
                    return record.data.productReference.picture;
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
            convert: function(val,record) {
                
                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
                                                
                if(record.data.productReference === undefined || !record.data.productReference.picture){
                    return thumbnailSrc;
                }
                
                var picture = record.data.productReference.picture;

                var zoomHidden = true;

                if(picture.thumbnailName !== undefined && picture.thumbnailName){
                    if(picture.pictureSourceType !== null && picture.pictureSourceType !== ""){
                        thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL 
                            + picture.pictureSourceType.toUpperCase()
                            + '/' 
                            + picture.pictureSourceId
                            + '?temp=' + Date.now();

                        zoomHidden = false;
                    }
                }
                
                return thumbnailSrc; 
            }	
        },{
            name: 'imageSrc', 
            type: 'string',
            convert: function(val,record) {
                
                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
                
                if(record.data.productReference === undefined || !record.data.productReference.picture){
                    return thumbnailSrc;
                }
                
                var picture = record.data.productReference.picture;

                var zoomHidden = true;

                if(picture.pictureName !== undefined && picture.pictureName){
                    if(picture.pictureSourceType !== null && picture.pictureSourceType !== ""){
                        thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_IMAGE
                            + picture.pictureSourceType.toUpperCase()
                            + '/' 
                            + picture.pictureSourceId
                            + '?temp=' + Date.now();

                        zoomHidden = false;
                    }
                }
                
                return thumbnailSrc; 
            }	
        },
         {
            name: 'propertiesObject',
            type: 'auto',
            convert: function (val, record) {
                var props = {};
                if (!record.data.productReference) {
                    return props;
                }

                if (!record.data.productReference.properties) {
                    return props;
                }
                Ext.each(record.data.productReference.properties, function (prop) {
                    props[prop.name] = prop;
                });
                return props;
            }
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/materialsets',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/materialsets',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/materialsets',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/materialsets'
        }
    })

});   