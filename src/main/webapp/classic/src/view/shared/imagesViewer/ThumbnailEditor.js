
Ext.define('Dashboard.view.shared.imagesViewer.ThumbnailEditor', {
    extend: 'Ext.panel.Panel',
    xtype: 'thumbnailEditor',
    requires: [
        'Dashboard.tool.Utilities'
    ], 

    record : {},
    thumbnailSourceType : null,
        
    initComponent: function() {
        
        var defaultThumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var picture = this.record.picture;
        var thumbnailSrc = defaultThumbnailSrc;
        
        if(picture !== undefined && picture.thumbnailName && picture.pictureSourceType){
            
           //Buid image src
           thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL 
                            + picture.pictureSourceType.toUpperCase()
                            + '/' 
                            + picture.pictureSourceId
                            + '?temp=' + Date.now();
            
            // If inherited image show default image
            switch (this.thumbnailSourceType){
                case 'PRODUCT_CATEGORY':
                    if(this.record.id !== picture.pictureSourceId ){
                        thumbnailSrc = defaultThumbnailSrc;
                    }
                    break;   
                 case 'PRODUCT_REFERENCE':
                 case 'MATERIAL':
                     if(this.thumbnailSourceType !== picture.pictureSourceType ){
                        thumbnailSrc = defaultThumbnailSrc;
                    }
                     break;
            }
        }
                

        var thumbnail = Ext.create('Ext.Img', {
            src : defaultThumbnailSrc, //thumbnailSrc,
            name: 'thumbnailToEdit',
            height: 96,
            style: 'border: 1px solid #b5b8c8',
            listeners: {
                render: function (image) { 
                    
                    var widthMax = 350;

                    image.el.dom.onload = function () {

                        var originalImageSize = {
                            width: image.el.dom.width,
                            height: image.el.dom.height
                        };
                        
                        if(originalImageSize.width > widthMax){
                            image.setHeight(96 * widthMax / originalImageSize.width);
                            image.setWidth(widthMax); 
                        }else{
                            image.setHeight(96);
                            image.setWidth(null);
                        }  
                    };
                }
            }
        });
        
        
        Ext.Ajax.request({
            scope:this,
            binary: true,  //set binary to true
            url: thumbnailSrc,
            success: function(response) {

                var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                url = window.URL.createObjectURL(blob);
        
                thumbnail.setSrc(url);
                thumbnail.setAlt('thumbnail');
            }
        });
        
        
        var me = this;
        
        Ext.apply( me, {
            name: 'thumbnailEditor',
            border: false,
            height: 96,
            width: '100%',
            margin: '12 0 12 0',
            layout: 'column',
            items:[
                
                thumbnail,
                {
                    xtype: 'panel',
                    name: 'tumbPanel',
                    border: false,
                    heigth: 96,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype:'button',
                            action: 'selectThumbnail',
                            iconCls: 'fa fa-pencil',
                            itemId: 'btEdit',
                            scale: 'small',
                            margin: '0 4 0 4',
                            tooltip: getText('Select new thumbnail')
                        },{
                            xtype:'button',
                            action: 'deleteThumbnail',
                            iconCls: 'fa fa-minus-circle',
                            itemId: 'btAdd',
                            scale: 'small',
                            margin: '4 4 0 4',
                            tooltip: getText('Delete thumbnail')
                        }
                    ]
                }
            ]
        });
        
        this.callParent(arguments);  
    }
    
            
});