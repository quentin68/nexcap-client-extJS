
Ext.define('Dashboard.view.shared.imagesViewer.Thumbnail', {
    extend: 'Ext.panel.Panel',
    xtype: 'thumbnailPanel',
    closeAction: 'destroy',
    requires: [
        'Dashboard.tool.Utilities'
    ], 

    record : {},
        
    initComponent: function() {
        
        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var zoomHidden = true;
        
        if(this.record.thumbnailName !== undefined && this.record.thumbnailName !== null){
            if(this.record.pictureSourceType !== null && this.record.pictureSourceType !== ""){
                thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL 
                    + this.record.pictureSourceType.toLowerCase()
                    + '/' 
                    + this.record.pictureSourceId
                    +'/thumbnail'
                    + '?temp=' + Date.now();
                                
                zoomHidden = false;
            }
        }
        
        
        var thumbnail = Ext.create('Ext.Img', { 
            src : thumbnailSrc,
            name: 'thumbnail',
            //style: 'border: 1px solid #b5b8c8',
            width: 96,
            height: 96,
            border : true,
            margin: '0 0 0 12',
            listeners: {  
                render: function(c){
                    c.el.on('dblclick', function(){
                       Ext.ComponentQuery.query('thumbnailPanel')[0].doZoom();
                    });
                }
            }
        });
        
        var me = this;
        
        Ext.apply( me, {
            name: 'thumbnailPanel',
            border: false,
            height: 96,
            width: '100%',
            margin: '12 0 12 0',
            layout: 'column',
            items:[
                thumbnail,
                {
                    xtype: 'panel',
                    name: 'tumbButtonsPanel',
                    border: false,
                    heigth: 96,
                    layout:'absolute',
                    items: [
                        {
                            xtype:'button',
                            action: 'zoom',
                            hidden: zoomHidden,
                            iconCls: 'iconFind',
                            itemId: 'btZoom',
                            scale: 'small',
                            x: 4,
                            y: 0,
                            scope: this,
                            handler: this.doZoom
                        } 
                    ]
                }
            ]

        });
        
        this.callParent(arguments);  
    },
            
    doZoom: function(){

        var view = Ext.widget('zoom',{
            autoShow: false, 
            record: this.record
        });
        
        view.show();

    }         
            
});