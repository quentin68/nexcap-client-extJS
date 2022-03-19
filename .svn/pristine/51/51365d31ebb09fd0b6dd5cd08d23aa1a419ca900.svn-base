Ext.define('Dashboard.view.authentication.Body',{
    extend: 'Ext.panel.Panel',
    xtype: 'authenticationBody',
    
    require:[
        'Dashboard.view.authentication.LoginForm',
        'Dashboard.view.authentication.Background'
    ],
    
    configuration: null,
    
    width: '100%',
    heigth: '100%',
    border: false,
    defaultFocus : 'loginForm',
    layout:'absolute',

    initComponent: function () {
        
        Dashboard.manager.TranslationsManager.translate(Dashboard.config.Config.LOCALE);
        
        var me = this;
        
        var maskTitle = this.configuration.title;
        var maskColor = this.configuration.color;
        var hostName = Dashboard.config.Config.SERVER_HOST_NAME;
        
        var backgroundSrc = 'url(' +Dashboard.config.Config.DEFAULT_LOGING_SCREEN_BACKGROUND + ')';
        
        if(this.configuration.backgroundPicture !== Dashboard.config.Config.DEFAULT_LOGING_SCREEN_BACKGROUND ){
            backgroundSrc = 'url(' + hostName + encodeURI(this.configuration.backgroundPicture) + ')';
        }  
        
        this.loginPanel = {
            xtype: 'panel',
            anchor:'100% 100%',
            bodyStyle : 'background:none',
            border: false,
            margin:20,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack : 'end'
            },
            items:[
                {
                    xtype: 'panel',
                    reference: 'loginFormContainer',
                    bodyStyle : 'background:none',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack : 'center'
                    },
                    items:[
                        {
                            xtype: 'loginForm',
                            width: 300,
                            margin: 40
                        }
                    ]
                }
            ]
        };
        
        
        this.autoLoginPanel = {
            xtype: 'panel',
            anchor:'100% 100%',
            bodyStyle : 'background:none',
            border: false,
            margin: 20,
            layout: 'center',
            items:[
                {
                    xtype: 'panel',
                    header: false,
                    width: 400,
                    height: 100,
                    border: 1,
                    bodyStyle: 'background:none',
                    layout: 'absolute',
                    items: [
                        {
                            xtype: 'panel',
                            anchor: '100% 100%',
                            bodyStyle: 'opacity:0.5;'
                        }, {
                            xtype: 'panel',
                            anchor: '100% 100%',
                            bodyStyle: 'background:none',
                            margin: 16,
                            defaults: {
                                margin: '5 0'
                            },
                            layout: 'center',
                            items: [
                                {
                                    xtype: 'label',
                                    margin: 0,
                                    style: {
                                        color: '#000000',
                                        'font-weight': 'normal',
                                        'font-size': '16px'
                                    },
//                                    text: Dashboard.manager.TranslationsManager.getTranslation('Configuration in progress, please wait...')
                                      text: getText('Configuration in progress, please wait...')

                                }
                            ]
                        }
                    ]
                }
            ]
        };
        
        
        me.items = [
            {
                xtype: 'container',
                anchor:'100% 100%',
                border: false,
                style: {
                    backgroundImage: backgroundSrc,//'url(resources/images/background.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }
            }, {
                xtype: 'panel',
                anchor:'100% 100%',
                bodyStyle : 'background:none',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack : 'end'
                },
                items:[
                    {
                        xtype: 'container',
                        reference: 'mask',
                        height: 150,
                        width: '100%',
                        layout: 'center',
                        style: {
                            backgroundColor: maskColor,//'#3f5c96',
                            opacity: 1,
                            margin: '0px auto 0px auto',
                            'text-align': 'center'
                        },
                        items:[
                            {
                                xtype: 'label',
                                reference: 'title',
                                text: maskTitle, //'Welcome to Burning Man',
                                style: {
                                    color: '#ffffff',
                                    'font-weight': 'light',
                                    'font-size': '4vw',
                                    'line-height': '100%'
                                }
                            }
                        ]
                    }
                ]
            }, 
                   
            this.getLoginForm()
            
        ];

        me.callParent(arguments);

    },
    
    
    getLoginForm: function(){
                        
        var autoLoginMode = Dashboard.manager.ConfigurationManager.autoLoginMode;
        
        if(autoLoginMode === true){
            return this.autoLoginPanel;
        }else{
            return this.loginPanel;
        }
        
    }

});