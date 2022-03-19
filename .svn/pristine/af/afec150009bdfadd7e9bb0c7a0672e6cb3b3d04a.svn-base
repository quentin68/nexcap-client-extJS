Ext.define('Dashboard.view.settings.webClient.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'webClientMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',  
        'Dashboard.view.settings.webClient.MainController'
    ],
  
    controller: 'webClientMain',
    feature: null,
    
    //configuration: null,
    
    iconCls : 'fa fa-paint-brush', 
    border: false,
    heigth: '100%',
    layout: 'fit',
    cls: 'view-list',

    listeners:{
        render: 'onRenderMain'
    },   
    
    defaults:{
        heigth: '100%'
    },
    
    initComponent: function() {  
        
        var logingScreenFeature = Dashboard.manager.FeaturesManager.getFeatureByName('LOGIN_SCREEN');
        var configuration = logingScreenFeature.data.configuration.data.appearance;
                
        this.title = getText('Web client configuration');
        
        this.dockedItems = [
                {
                    xtype: 'toolbar',
                    defaults:{
                        xtype: 'button',
                        scale: 'small',
                        ui: 'view-list',
                        border: false
                    },
                    items: [

                        '->',
                        {
                            iconCls: 'fa fa-wrench',
                            reference: 'globalConfigurationButton',
                            handler: 'configGlobalConfiguration',
                            margin: '0 12 0 12',
                            tooltip: getText('Global configuration')
                        }
                    ]
                }
            ];
        
        var home = {
            xtype: 'panel',
            layout: 'border',
            margin: 0,
            defaults: {
                bodyPadding: 0,
                border: false
            },

            items: [
                {
                    xtype: 'authenticationHeader',
                    region: 'north',
                    configuration: configuration
                },{
                    xtype: 'authenticationBodyEdit',
                    region: 'center',
                    configuration: configuration
                },{
                    xtype: 'authenticationFooter',
                    region: 'south'
                }
            ]
        };
    
        this.items = [
            home
        ];

        this.callParent(arguments);
    }
    
    
});