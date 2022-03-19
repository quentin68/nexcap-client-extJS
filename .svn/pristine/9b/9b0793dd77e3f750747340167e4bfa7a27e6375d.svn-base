Ext.define('Dashboard.model.consultation.Item', {
    extend: 'Dashboard.model.Base',//'Ext.data.Model',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    fields: [
        {
            name: 'id', 
            type: 'auto'
        },{
            name: 'productReferenceId', 
            type: 'auto'
        },{
            name: 'productReferenceCode', 
            type: 'string'
        },{
            name: 'productReferenceDesignation', 
            type: 'string'
        },{
            name: 'productReferenceDescription', 
            type: 'string'
        },{
            name: 'identified',
            type: 'boolean'
        },{
            name: 'productCategoryId',
            type: 'auto'
        },{
            name: 'productCategoryName',
            type: 'string'
        },{
            name: 'materialId',
            type: 'auto'
        },{
            name: 'materialName',
            type: 'string'
        },{
            name: 'address',
            type: 'string'//,
//            convert: function(val,record) {
//                if(!val){
//                    return {address:''};
//                }
//            }
        },{
            name: 'assignedLocation',
            type: 'string'
            
        },{
            name: 'locationId',
            type: 'auto'
        },{
            name: 'count',
            type: 'int'
        },{
            name: 'useCount',
            type: 'int'
        },{
            name: 'modelType', 
            type: 'string',
            convert: function(val,record) {
                if(record.data.materialId){
                    return 'material';
                }
                return 'reference';
            }
        },{
            name: 'picture',
            type: 'auto'
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
                
                if(!record.data.picture){
                    return thumbnailSrc;
                }
                var zoomHidden = true;

                if(record.data.picture.thumbnailName !== undefined && record.data.picture.thumbnailName){
                    if(record.data.picture.pictureSourceType !== null && record.data.picture.pictureSourceType !== ""){
                        thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL 
                            + record.data.picture.pictureSourceType.toUpperCase()
                            + '/' 
                            + record.data.picture.pictureSourceId
                            + '?temp=' + Date.now();

                        zoomHidden = false;
                    }
                }
                
                return thumbnailSrc; //"https://localhost:8443/nexcap/api/v0.1/resources/thumbnail/MATERIAL/2";
            }	
        },{
            name: 'imageSrc', 
            type: 'string',
            convert: function(val,record) {
                
                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
                
                if(!record.data.picture){
                    return thumbnailSrc;
                }
                var zoomHidden = true;

                if(record.data.picture.pictureName !== undefined && record.data.picture.pictureName){
                    if(record.data.picture.pictureSourceType !== null && record.data.picture.pictureSourceType !== ""){
                        thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_IMAGE
                            + record.data.picture.pictureSourceType.toUpperCase()
                            + '/' 
                            + record.data.picture.pictureSourceId
                            + '?temp=' + Date.now();

                        zoomHidden = false;
                    }
                }
                
                return thumbnailSrc; //"https://localhost:8443/nexcap/api/v0.1/resources/thumbnail/MATERIAL/2";
            }	
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/materials',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/materials',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/materials',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/materials'
        }
    })

});   