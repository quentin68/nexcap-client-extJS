
Ext.define('Dashboard.view.shared.imagesViewer.ImagesViewerPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'imagesViewerPanel',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.engine.ExportToFile',
        'Ext.tip.*'
    ], 

    config: {
        parentWidth: 0, //The width of the container
        pictures: [], //Array of pictures url
        thumbSize: 40, //Size in px of a picture thumb
        itemId: 0
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
        
//        Ext.define('Dashboard.model.ImageNexess', {
//            extend: 'Ext.data.Model',
//            fields: [
//                { 
//                    name:'src', 
//                    type:'string',
//                    convert: function(v,record){
//                        //Convert image file to generate src of thumb picture
//                        return  Dashboard.config.Config.SERVER_URL_DOWNLOAD_PICTURE + '/' + me.itemId + '/' + record.raw;
//                    }
//                },
//                { 
//                    name:'thumbSrc', 
//                    type:'string',
//                    convert: function(v,record){
//                        //Convert image file to generate src of thumb picture
//                        return  Dashboard.tool.DateTime.replace(record.data.src, '.jpg', '_thumb.jpg');
//                    }
//                }
//            ]
//        });
        
        var myStore = Ext.create('Ext.data.Store', {
            id:'imagesStore',
            //model: 'Dashboard.model.ImageNexess',
            fields: [
                { 
                    name:'src', 
                    type:'string',
                    convert: function(v,record){
                        //Convert image file to generate src of thumb picture
                        return  Dashboard.config.Config.SERVER_URL_DOWNLOAD_PICTURE + '/' + me.itemId + '/' + record.raw;
                    }
                },
                { 
                    name:'thumbSrc', 
                    type:'string',
                    convert: function(v,record){
                        //Convert image file to generate src of thumb picture
                        if(record.data.src !== undefined){
                            return  Dashboard.tool.DateTime.replace(record.data.src, '.jpg', '_thumb.jpg');
                        }                        
                    }
                }
            ],
            data: me.getPictures()
        }); 
        
        //The dataview to display thumbs like a gallery
        var dataview = Ext.create('Ext.view.View', {            
            layout:'fit',            
            store: myStore,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{thumbSrc}">',
                    '<div class="thumb"><img src="{thumbSrc}" title="{thumbSrc}"></div>',
                    '<span></span></div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            width: me.getPictures().length * 45 + 8, //Size of a thumb including padding and margin.
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: getText('No picture available'),
            padding: '0 4 0 0',
            style: {
                margin: '0 auto 0 auto' //Horizontally center dataview/gallery in container                
            },
            listeners:{                
                itemclick : function(record, item, index){  //Update full img on gallery item click              
                    Ext.getCmp('fullImgPanel').removeAll(); 
                    var myImage = Ext.create ('Ext.Img',{  
                        id: 'fullImg',                                                                 
                        src: item.data.src, //Full image source is the same as the thumb source without the suffix "thumb"                      
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
                    
                    //Add a tooltip to inform the user he can double click the image to download it
                    Ext.create('Ext.tip.ToolTip', {
                        target: 'fullImgPanel',
                        trackMouse: true,
                        html: 'Double-cliquer sur l\'image pour la télécharger'
                    }); 
                    Ext.QuickTips.init(); //Important to activate tooltip
                    
                    Ext.getCmp('fullImgPanel').add(myImage);
                },
                viewready : function(view){ 
                    if (view.getWidth() > view.up().getWidth()) { 
                        //If dataview container needs to display a scrollbar, we have to increase the height to reserve space for scrollbar
                        view.up().setHeight(me.getThumbSize() + 11 + 17); //Set new height : 11 (margins + borders) + 17px (space for scrollbar)
                    } else {
                        view.up().setHeight(me.getThumbSize() + 11); //Set new height : 11 (margins + borders)
                    }
                    
                    if (me.getPictures().length > 0) { //Select first photo by fireing click event on firest item                        
                        view.fireEvent('itemclick', view, view.getStore().getAt(0),0, view.getTargetEl()); 
                    }
                }
            }  
        });
       
        this.items = [  
            {       
                //Top panel to display full adjusted img
                xtype: 'panel',
                id: 'fullImgPanel',                
                flex: 1,
                border: false,
                bodyPadding : 5,
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: []
            },
            {
                //Bottom panel to display thumbs gallery
                xtype: 'panel',
                id: 'thumbsView',               
                border: false,               
                width: me.parentWidth - 12, //Substract margin and padding
                autoScroll: true,
                items: [                                
                    dataview                   
                ]
            }
        ];
        this.callParent(arguments);  
    }   
});