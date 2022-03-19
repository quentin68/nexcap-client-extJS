Ext.define('Dashboard.view.authentication.BodyEdit',{
    extend: 'Ext.panel.Panel',
    xtype: 'authenticationBodyEdit',
    
    require:[
        'Dashboard.view.authentication.Background'
    ],
    
    configuration: null,
    
    width: '100%',
    heigth: '100%',
    border: false,
    layout:'absolute',    
    
    controller: 'webClientMain',
    
//    listeners:{
//        
//        afterLayout: function(me){
//            var width = this.getSize().width;
//            var height = this.getSize().height;
//            var x = this.getLocalX();
//            var y = this.getLocalY();
//            alert( width + ' - ' + height + ' - ' + x +'/'+ y);
//        }
//    },

    initComponent: function () {
        var me = this;
        
        var maskTitle = this.configuration.title;
        var maskColor = this.configuration.color;
        var hostName = Dashboard.config.Config.SERVER_HOST_NAME;
        var backgroundSrc = 'url(' +Dashboard.config.Config.DEFAULT_LOGING_SCREEN_BACKGROUND + ')';
        
        if(this.configuration.backgroundPicture !== Dashboard.config.Config.DEFAULT_LOGING_SCREEN_BACKGROUND ){
            backgroundSrc = 'url(' + hostName + encodeURI(this.configuration.backgroundPicture) + ')';
        } 
        
        var title = {
            xtype: 'label',
            reference: 'title',
            text: maskTitle,//'Welcome to Burning Man',
            style: {
                color: '#ffffff',
                'font-weight': 'light',
                'font-size': '4vw',
                'line-height': '100%'
            }
        };
        
        var colorButton = {
            xtype: 'button',
            text: getText('color'),
            iconCls: 'fa fa-wrench',
            scale: 'small',
            ui: 'view-list',
            border: false,
            handler: 'onEditColor',
            reference: 'buttonColor'
        };
        
        var backgroundButton = {
            xtype: 'button',
            text: getText('background'),
            iconCls: 'fa fa-wrench',
            scale: 'small',
            ui: 'view-list',
            border: false,
            handler: 'onEditBackground',
            reference: 'buttonEditBackground'
        };
        
        var logoButton = {
            xtype: 'button',
            text: getText('logo'),
            iconCls: 'fa fa-wrench',
            scale: 'small',
            ui: 'view-list',
            border: false,
            handler: 'onEditLogo',
            reference: 'buttonEditLogo'
        };
        
        var titleButton = {
            xtype: 'button',
            text: getText('title'),
            iconCls: 'fa fa-wrench',
            scale: 'small',
            ui: 'view-list',
            border: false,
            handler: 'onEditTitle',
            reference: 'buttonEditTitle'
        };
        
        var background = {
            xtype: 'container',
            reference: 'background',
            anchor:'100% 100%',
            border: false,
            style: {
                backgroundImage: backgroundSrc,//'url(resources/images/background.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }
        };
        
        
        var resetButton = {
            xtype: 'button',
            text: getText('reset'),
            iconCls: 'fa fa-undo',
            scale: 'small',
            ui: 'view-list',
            border: false,
            handler: 'onReset',
            reference: 'buttonReset'
        };
        
        
        var mask = {
            xtype: 'container',
            reference: 'mask',
            height: 150,
            width: '100%',
            layout: {
                type: 'center'
            },
            style: {
                backgroundColor: maskColor,//'#3f5c96',
                opacity: 1,
                margin: '0px auto 0px auto',
                'text-align': 'center'
            },
            items:[
                title
            ],
            listeners:{
                scope: this,
                afterLayout: function(me){
            
                    var width = this.getSize().width;
                    var height = this.getSize().height;
                    var posY = height - me.getSize().height;
                    me.setLocalY(posY); 
                    
                    var colorButton = this.down('button[reference=buttonColor]');
                    colorButton.setLocalXY( width - colorButton.getSize().width - 20,  posY +20);

                    var title = this.down('label[reference=title]');
                    var titleButton = this.down('button[reference=buttonEditTitle]');
                    titleButton.setLocalXY(width - (titleButton.getSize().width + 20), height - titleButton.getSize().height - 20);
                    
                    var backgroundButton = this.down('button[reference=buttonEditBackground]');
                    backgroundButton.setLocalXY( width - backgroundButton.getSize().width - 20, 20); 
                    
                    var logoButton = this.down('button[reference=buttonEditLogo]');
                    var logo = Ext.ComponentQuery.query('image[reference=logo]')[0];
                    logoButton.setLocalXY(20, 20);
                    
                    var resetButton = this.down('button[reference=buttonReset]');
                    resetButton.setLocalXY(20, height - resetButton.getSize().height - 20);
                }
            }
        };
        
        
        me.items = [
            background,
            mask,
            backgroundButton,
            colorButton,
            titleButton,
            logoButton,
            resetButton
        ];


        me.callParent(arguments);
    }

});