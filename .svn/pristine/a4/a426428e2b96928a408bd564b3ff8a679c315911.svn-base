

Ext.define('Dashboard.view.authentication.LoginScreen', {
    extend: 'Ext.panel.Panel',
    xtype: 'loginScreen',

    requires: [
        'Ext.plugin.Viewport',
        'Dashboard.view.authentication.LoginScreenController',
        'Dashboard.view.authentication.Header',
        'Dashboard.view.authentication.Body',
        'Dashboard.view.authentication.Footer'
    ],
    
    controller: 'loginScreen',
    
    plugins: 'viewport',
    
    configuration: null,
    
    layout: 'border',
    margin: 0,
    
    listeners:{
        render: 'onRenderMain'
    },

    defaults: {
        bodyPadding: 0,
        border: false
    },
    
    initComponent: function () {
        var me = this;
        
        if(Dashboard.config.Config.AUTHENTICATION === "OAUTH2"){
            Dashboard.manager.ConfigurationManager.autoLoginMode = true;
            Dashboard.manager.authentication.MyAtService.initAuthorizationFlow(this.getController());
        }
        
        me.items = [];
                
        me.callParent(arguments);

    },
    
    
    setConfiguration: function(config){
                
        this.add({
            xtype: 'authenticationHeader',
            region: 'north',
            configuration: config
        });
        
        this.add({
            xtype: 'authenticationBody',
            region: 'center',
            configuration: config
        });
        
        this.add({
            xtype: 'authenticationFooter',
            region: 'south'
        });

    }
    
    
});
