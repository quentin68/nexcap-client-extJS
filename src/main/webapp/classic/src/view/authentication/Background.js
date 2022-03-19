
Ext.define('Dashboard.view.authentication.Background', {
    extend: 'Ext.panel.Panel',
    xtype: 'authenticationBackground',
    requires: [
        'Dashboard.tool.Utilities',
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
        
        //var imageSrc = '../resources/images/background.jpg'
        var imageSrc = 'resources/images/background.jpg';
        //var imageSrc = Dashboard.config.Config.SERVER_URL_LOGIN_PICTURE + '/' + me.materialId +'/'+ this.picture;
        
        var myImage = Ext.create ('Ext.Img',{ 
            name: 'img_'+ this.picture,
            src: imageSrc,
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
                        if (originalImageSize.width * imageContainerSize.height / originalImageSize.height < imageContainerSize.width) {
                            //stretch Horizontally    
                            image.setWidth(imageContainerSize.width + 5);
                            image.setHeight(originalImageSize.height * (imageContainerSize.width + 5) / originalImageSize.width);
                            
                            
                        } else {
                            //stretch Vertically
                            image.setWidth(originalImageSize.width * (imageContainerSize.height + 5) / originalImageSize.height);                                        
                            image.setHeight(imageContainerSize.height + 5);
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