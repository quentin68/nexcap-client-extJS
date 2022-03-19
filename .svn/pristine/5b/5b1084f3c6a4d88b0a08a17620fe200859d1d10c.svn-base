/* global Ext */

Ext.define('Dashboard.view.main.MainPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'app_main',

    requires: [
        'Ext.list.Tree',
        'Dashboard.view.dashboard.DashboardEditor',
        'Dashboard.store.main.NavigationTree',
        'Dashboard.view.menu.BottomMenu',
        'Ext.plugin.Viewport',
        'Dashboard.manager.ConfigurationManager'
    ],

    controller: 'main',

    plugins: 'viewport',

    layout: 'border',
    margin: 0,

    listeners: {
        render: 'onRenderMain'
    },

    defaults: {
        bodyPadding: 0
    },

    items: [
        {
            xtype: 'panel',
            border: false,
            name: 'bottomBar',
            region: 'north',
            width: '100%',
            layout: 'vbox',

            plugins: 'responsive',
            responsiveConfig: {
                'width >= 800': {
                    hidden: true
                },
                'width < 800|| tall': {
                    hidden: false
                }
            },
            items: [
                {
                    xtype: 'panel',
                    ui: 'menu-header',
                    height: 70,
                    width: '100%',
                    layout: 'center',
                    border: false,

                    items: [
                        {
                            xtype: 'image',
                            src: 'resources/images/icons/logo_nexcap.png',
                            width: 140,
                            height: 44,
                            alt: 'Nexcap logo'
                        }
//                        {
//                            xtype: 'displayfield',
//                            itemId: 'logo',
//                            ui: 'menu-header',
//                            value: 'NexCapMat'
//                        }
                    ]
                }
            ]

        }, {
            xtype: 'panel',
            border: false,
            region: 'west',
            reference: 'westMenu',
            autoHeight: true,
            height: '100%',

            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },

            plugins: 'responsive',
            responsiveConfig: {
                'width >= 800': {
                    hidden: false
                },
                'width < 800|| tall': {
                    hidden: true
                }
            },

            items: [
                {
                    xtype: 'panel',
                    ui: 'menu-header',
                    height: 80,
                    flex: 0,
                    layout: 'center',
                    border: true,

                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'image',
                                    reference: 'menuLogo',
                                    alt: 'Nexess logo',
                                    id: 'menuLogo',
                                    src: null, //'resources/images/icons/logo_nexcap.png',
                                    height: 44,
                                    listeners: {
                                        render: function (image) {
                                            var logingScreenFeature = Dashboard.manager.FeaturesManager.getFeatureByName('LOGIN_SCREEN');
                                            var configuration = logingScreenFeature.data.configuration.data.appearance;
                                            var hostName = Dashboard.config.Config.SERVER_HOST_NAME;
                                            
                                            var url = Dashboard.config.Config.DEFAULT_LOGO_NEXESS;
                                            if(configuration.logoPicture !== Dashboard.config.Config.DEFAULT_LOGO_NEXESS ){
                                                url = hostName + encodeURI(configuration.logoPicture) + '?temp=' + Date.now();
                                            }
                                            
                                            image.setSrc(url);

                                            var widthMax = 200;
                                            image.el.dom.onload = function () {

                                                var originalImageSize = {
                                                    width: image.el.dom.width,
                                                    height: image.el.dom.height
                                                };

                                                if (originalImageSize.width > widthMax) {
                                                    image.setHeight(44 * widthMax / originalImageSize.width);
                                                    image.setWidth(widthMax);
                                                }
                                            };
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',  // Login menu
                    ui: 'menu-header',
                    border: true,
                    anchor: '100%',
                    layout: 'hbox',
                    bodyPadding: '12 6 12 12',
                    items: [
                        {
                            xtype: 'label',
                            reference: 'userName',
                            flex: 1,
                            style: {color: '#C2C6D6'},
                            listeners: {
                                scope: this,
                                afterrender: function (me) {
                                    var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
                                    me.setHtml(user.data.sticker);
                                }
                            }
                        }, {
                            xtype: 'button',
                            ui: 'nav', //'menu-header',
                            hidden: Dashboard.manager.ConfigurationManager.autoLoginMode,
                            scale: 'small',
                            iconCls: 'fa fa-power-off',
                            cls: 'powerOffButton',
                            reference: 'powerOff',
                            handler: 'powerOff',
                            tooltip: 'Log out',
                            listeners: {
                                render: function(me){
                                    me.setHidden(Dashboard.manager.ConfigurationManager.autoLoginMode);
                                },
                                afterrender: function (me) {
                                    me.setTooltip(getText('Log out'));
                                }
                            }
                        }
                    ]

                },{
                    xtype: 'form',  //Context menu
                    ui: 'menu-header',
                    border: true,
                    anchor: '100%',
                    layout: 'hbox',
                    bodyPadding: '12 6 12 12',
                    items: [
                        {
                            xtype: 'label',
                            reference: 'contextName',
                            flex: 1,
                            style: {color: '#C2C6D6'},
                            listeners: {
                                scope: this,
                                afterrender: function (me) {
                                    me.setText(Dashboard.config.Config.contexts.selected);
                                }
                            }
                        }, {
                            xtype: 'button',
                            ui: 'nav',
                            scale: 'small',
                            iconCls: 'fa fa-sitemap',
                            cls: 'powerOffButton',
                            reference: 'contextButton',
                            listeners: {
                                afterrender: function (me) {
                                    me.setTooltip(Dashboard.config.Config.contexts.selected);
                                }, 
                                click: function (me) {
                                    var data = Dashboard.config.Config.contexts.store;
                                    if (data.length >= 2) {
                                        var contextSelectWindow = Ext.create('Dashboard.view.dashboard.contextSelectWindow', {
                                            isClosable: true
                                        });
                                        contextSelectWindow.setData(data);
                                        contextSelectWindow.setParentScope(me, 'dashboard');

                                        contextSelectWindow.show();
                                    }
                                }
                            }
                        }
                    ],
                    listeners: {
                        beforerender: function (me) {
                            if (Dashboard.config.Config.contexts.selected === undefined) {
                                me.hide();
                            }
                        }
                    }

                }, {
                    xtype: 'panel', // main tree menu
                    name: 'treeMenuContainer',
                    ui: 'menu',
                    border: true,
                    autoScroll: true,
                    scrollable: 'y',
                    layout: 'fit',
                    flex: 1
                }, {
                    xtype: 'panel', // menu footer
                    ui: 'menu-header',
                    height: 120,
                    flex: 0,
                    layout: 'center',
                    border: true,
                    items: {
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'image',
                                reference: 'logo',
                                alt: 'Nexess Logo',
                                src: 'resources/images/icons/nexess_white.png',
                                height: 44,
                                margin: '12 20 6 20'
                            },{
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'component',
                                        html: '<div style="color:grey; font-size:12px;">' +
                                                '© 2010-2018 NEXESS SA' +
                                                '</div>',
                                        ui: 'menu',
                                        reference: 'copirate',
                                        margin: '0 15 0 0'
                                    }, 
//                                    {
//                                        xtype: 'button',
//                                        ui: 'nav',
//                                        scale: 'small',
//                                        iconCls: 'fa fa-wrench',
//                                        hidden: true,
//                                        reference: 'globalConfigurationButton',
//                                        handler: 'configGlobalConfiguration',
//                                        margin: '0 0 0 0',
//                                        listeners: {
//                                            afterrender: function (me) {
//                                                me.setTooltip(getText('Global configuration'));
//                                            }
//                                        }
//                                    }, 
                                    {
                                        xtype: 'button',
                                        ui: 'nav',
                                        scale: 'small',
                                        iconCls: 'fa fa-info-circle',
                                        reference: 'buttonAbout',
                                        handler: 'onAbout',
                                        tooltip: 'About',
                                        margin: '0 0 0 8',
                                        listeners: {
                                            afterrender: function (me) {
                                                me.setTooltip(getText('About'));
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }, {
            xtype: 'panel',
            id: 'mainPanelCenter',
            reference: 'mainContainer',
            name: 'viewPortCenter',
            region: 'center',
            layout: 'fit',
            border: false,
            items: [
                {
                    xtype: 'dashboardEditor'
                }
            ]
        }, {
            xtype: 'bottom_menu', // Tablet menu
            region: 'south',
            width: '100%',
            plugins: 'responsive',
            responsiveConfig: {
                'width >= 800': {
                    hidden: true
                },
                'width < 800|| tall': {
                    hidden: false
                }
            }
        }
    ]
});
