/*  global Ext  */

Ext.define('Dashboard.view.shared.detail.detailWindow', {
    extend: 'Ext.window.Window',
    xtype: 'detailWindow',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    controller: null,
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    //modal: true,
    constrain: true,
    closeAction: 'destroy',
    width: 600,
    height: 800,
    record: null,
    
    winWidth: 600,
    winHeight: 600,
    winX: null,
    winY: null,
    isMinimized: false,
    isMaximized: false,
    thumbnailWidth: '90%',
    
    tools: [
        {  
            type: 'minimize',
            handler: function( evt,toolEl,owner,tool ){

                var win = owner.up( 'window' );
                
                win.resizeThumbnail('minimized');
                
                if(!win.isMinimized && !win.isMaximized){
                    win.winWidth = win.getWidth();
                    win.winHeight = win.getHeight();
                    win.winX = win.getX();
                    win.winY = win.getY();
                }
                
                win.collapse();
                win.setWidth(240);
                win.alignTo(Ext.getBody(), 'bl-bl');

                win.isMinimized = true;
                win.isMaximized = false;
                owner.tools['maximize'].show();
                this.hide();
            }                                
        }, {
            type: 'restore',
            
            handler: function (evt, toolEl, owner, tool) {
                
                var win = owner.up('window');
                
                win.resizeThumbnail('restored');
                
                if(win.winWidth && win.winHeight){
                    win.setWidth(win.winWidth);
                    win.setHeight(win.winHeight);
                    win.setX(win.winX);
                    win.setY(win.winY);
                    
                }else{
                    win.setWidth(600);
                    win.setHeight(800);
                    win.center();
                }
                win.expand('', false);
                win.isMinimized = false;
                win.isMaximized = false;
                owner.tools['minimize'].show();
                owner.tools['maximize'].show();
            }
        }, {  
            type: 'maximize',
            handler: function( evt,toolEl,owner,tool ){
                                
                var win = owner.up( 'window' );
                
                if(!win.isMinimized && !win.isMaximized){
                    win.winWidth = win.getWidth();
                    win.winHeight = win.getHeight();
                    win.winX = win.getX();
                    win.winY = win.getY();
                }
                
                win.resizeThumbnail('maximized');
                
                var bodySize = Ext.getBody().getViewSize();
                win.setWidth(bodySize.width);
                win.setHeight(bodySize.height);
                win.setX(0);
                win.setY(0);
                win.expand(false);

                win.isMinimized = false;
                win.isMaximized = true;
                owner.tools['minimize'].show();
                this.hide();
                
            }                                
        }
    ],
        
    initComponent: function(){
                        
        this.items = [
            {
                xtype: 'panel',
                layout: 'border',
                reference: 'detailInWindowContainer',
                defaults:{
                    region: 'center',
                    toolBarVisible: false,
                    flex: 1
                }
            }
        ];

        this.buttons = [
            {
                text: getText('Close'),
                scope: this,
                handler: this.close
            }
        ];
        
        this.listeners = {
            scope: this,
            show: function ( win, width, height, eOpts )
{
                var defaultTitle = getText('Detail sheet');
                var detailTitle = this.down('displayfield[cls=material-detail-title]');
                
                detailTitle.setListeners({
                    scope: this,
                    change: function(field, newValue, oldValue, eOpts){
                        
                        if(newValue){
                            this.setTitle(newValue);
                        }else{
                            this.setTitle(defaultTitle);
                        }
                    }
                });
            }
        };

        this.callParent(arguments);
        
    },
    
    resizeThumbnail: function(state){
        
        var bodySize = Ext.getBody().getViewSize();
        var alfScreenSize = {
            width: bodySize.width / 2,
            height: bodySize.height / 2
        };
        var img = this.down('image[reference=thumbnail]');
        
        if(state === 'maximized'){
            this.thumbnailWidth = img.getWidth();
            img.setWidth(alfScreenSize.width);
        }else{
            img.setWidth(this.thumbnailWidth);
        }

     }
   
});