
Ext.define('Dashboard.view.shared.imagesViewer.ImageViewerPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'imageViewerPanel',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.engine.ExportToFile',
        'Ext.tip.*'
    ], 

    config: {
        parentWidth: 0, //The width of the container
        picture: null,
        materialId: 0
    },
        
    initComponent: function() {
        
        var me = this;
        
        Ext.apply( me, {  
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'end'
            },
            margin: '0 0 10'
        });
        
        //'../specificcheckreports/1/03.jpg'
        var imageSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_ATTACHMENT + '/' + me.materialId +'/'+ this.picture;
        
        //'../check-report-picture/download/1/03.jpg'
        //var imageSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_PICTURE + '/' + me.materialId +'/'+ '03.jpg';
        
        
        var myImage = Ext.create ('Ext.Img',{ 
            name: 'img_'+ this.picture,                                                                 
            src: imageSrc,   //'app/view/dashboard/picture.jpg' //'../check-report-picture/download/1/03.jpg',   
            width : 320,
            border: false,
            overCls: 'x-item-over',
            listeners: {
                render: function (image) { 
                    
                    image.el.dom.onload = function () { //Adjust picture size fo fit fullImg panel size without changing ratio                                  
                        var imageContainerSize = {
                            width: image.up().getWidth(),
                            height: image.up().getHeight()
                        };
                        var originalImageSize = {
                            width: image.el.dom.width,
                            height: image.el.dom.height
                        };
                        if (originalImageSize.width * imageContainerSize.height / originalImageSize.height > imageContainerSize.width) {
                            //stretch Horizontally                                        
                            image.setWidth(imageContainerSize.width - 5);
                            image.setHeight(originalImageSize.height * (imageContainerSize.width - 5) / originalImageSize.width);
                            
                        } else {
                            //stretch Vertically
                            image.setWidth(originalImageSize.width * (imageContainerSize.height - 5) / originalImageSize.height);                                        
                            image.setHeight(imageContainerSize.height - 5);
                        }                                
                    };
                },
                el: { 
                    dblclick: function(e,image,event) { //Download image on double click
                        Dashboard.engine.ExportToFile.loadFile(image.src, image.src, image.src);
                    }
                }
            }
        });
 
       
        this.items = [  
            {       
                xtype: 'panel',
                name: 'fullImgPanel', 
                itemId: 'img_'+ this.picture,
                flex: 1,
                border: false,
                bodyPadding : 5,
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [myImage]
            }
        ];

        this.callParent(arguments);
    }
    
});