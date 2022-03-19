
/*  global Ext */

Ext.define('Dashboard.view.shared.imagesViewer.Zoom', {
    extend: 'Ext.window.Window',
    xtype: 'zoom',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    title: '',
    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction: 'destroy',
    
    record: {},

    initComponent: function() {
        
        var defaultPictureSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var pictureSrc = defaultPictureSrc;

        if(this.record.path && this.record.file){
            pictureSrc = this.record.path;
        }
        
        this.title = this.record.name;
        
        var picture = this.createThumbnail(pictureSrc, this.record.name);

        this.items = [
            
            {
                xtype: 'panel',
                name: 'thumbPanel',
                border: false,
                minHeight: 480,
                minWidth: 640,
//                layout: {
//                    type: 'vbox',
//                    align: 'center',
//                    pack: 'center'
//                },
                items: picture
            }
        ];  
        

        this.buttons = [
            {
                text: getText('Close'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
        
    },   
    
    
    createThumbnail: function(imgSource, name){
        
            if(imgSource === null){
                imgSource = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
            }
            
            var thumb = Ext.create('Ext.Img', {
                src : imgSource,
                name: 'thumbnailImage',
                height: 480,
                margin: '0 0 0 0',
                alt: name,
                
                listeners: {
                    render: function (image) {

                        var widthMax = 640;
                        image.el.dom.onload = function () {

                            var originalImageSize = {
                                width: image.el.dom.width,
                                height: image.el.dom.height
                            };

                            if(originalImageSize.width > widthMax){
                                image.setHeight(480 * widthMax / originalImageSize.width);
                                image.setWidth(widthMax); 
                            }else{
                                image.setHeight(480);
                                image.setWidth(null);
                            } 
                            
                            var leftMargin = (640 - image.width)/2;
                            var topMargin = (480 - image.height)/2;
                            
                            Ext.ComponentQuery.query("image[name=thumbnailImage]")[0].margin = '0 '+ leftMargin + ' 0 ' + topMargin;

                        };
                        
                        image.el.on('dblclick', function(){
                            Ext.ComponentQuery.query('zoom')[0].close();
                         });
                    }
                }
            });
            
            return thumb;
            
        },
    
    
    addThumbnail: function(imgSource){
        
        var target = Ext.ComponentQuery.query('panel[name=thumbPanel]')[0];
        var previousThumb =  Ext.ComponentQuery.query('image[name="thumbnailImage"]')[0];
        
        if(previousThumb !== undefined){
            target.remove(previousThumb);
        }
        
        target.add(this.createThumbnail(imgSource));
        
    }
    
});   