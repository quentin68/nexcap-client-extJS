Ext.define('Dashboard.view.authentication.Header',{
    extend: 'Ext.panel.Panel',
    xtype: 'authenticationHeader',
    
    ui: 'menu-header',
    
    configuration: null,
    
    height: 70,
    width: '100%',
    layout: 'hbox',
    border: false,
    
     initComponent: function () {
        var me = this;
                        
        var hostName = Dashboard.config.Config.SERVER_HOST_NAME;
        var logoSrc = Dashboard.config.Config.DEFAULT_LOGO_NEXESS;

        if(this.configuration.logoPicture !== Dashboard.config.Config.DEFAULT_LOGO_NEXESS ){
            logoSrc = hostName + encodeURI(this.configuration.logoPicture) + '?temp=' + Date.now();
        }    
        
         var logoNexess = {
            xtype: 'image',
            reference: 'nexesslogo',
            src: 'resources/images/icons/nexess_white.png',
            height: 44,
            margin: '13 20 13 20',
            alt: 'Nexess logo',
            width: 110
        };
        
        
        var logoClient = {
            xtype: 'image',
            reference: 'logo',
            src: logoSrc,//'resources/images/icons/logo_nexcap.png',
            height: 44,
            margin: '13 20 13 20',
            alt: 'nexess logo',
            listeners: {
                render: function (image) {

                    var widthMax = 200;
                    image.el.dom.onload = function () {

                        var originalImageSize = {
                            width: image.el.dom.width,
                            height: image.el.dom.height
                        };

                        if(originalImageSize.width > widthMax){
                            image.setHeight(44 * widthMax / originalImageSize.width);
                            image.setWidth(widthMax);
                        }
                    };
                }
            }
        };
       
        me.items = [
            {
                xtype: 'container',
                items: logoClient,
                flex: 1
            },{
                xtype: 'container',
                items: logoNexess
            }            
        ],
            
        me.callParent(arguments);
     }
    
});