/*  global Ext  */

Ext.define('Dashboard.manager.authentication.LoginScreenManager', {
    extend: 'Ext.app.Controller',
    alias: 'loginScreenManager',
    singleton: true,
        
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    
    loadConfiguration: function(feature){
        
        try{
                
            Dashboard.model.FeatureConfigurationUnsecured.load('unsecured.'+feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[LoginScreenManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.displayInMain(feature);
                },
                success: function(record, operation) {
                    try {
                        var response = Ext.decode(operation._response.responseText);
                        var model = Ext.create('Dashboard.model.FeatureConfiguration', Ext.decode(response.data, true)); // mantis : 6843
                        // 'true' => Ext.decode returns 'undefined' in case of a JSON error
                        feature.data.configuration = model;
                        Dashboard.tool.Utilities.info('[LoginScreenManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.displayInMain(feature);
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[LoginScreenManager.loadConfiguration] decoding response error');
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[LoginScreenManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[LoginScreenManager.displayInMain] show login screen');
        
        var mainController = Ext.ComponentQuery.query('loginScreen')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.appearance;
        }catch(ex){
            Dashboard.tool.Utilities.error('[LoginScreenManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
            var model = Ext.create('Dashboard.model.FeatureConfiguration', configuration);
            feature.data.configuration = model;
        }
        
        if(Dashboard.manager.ConfigurationManager.autoLoginMode){
            mainController.redirectToDashboard();
        } else {
            mainController.buildScreen(feature);
        }
    },
    
    
//    loadConfiguration: function(currentFeature){
//        
//        var featureConfiguration = Ext.create('Dashboard.model.FeatureConfiguration');
//        
//        var serverAppearance = Dashboard.config.Config.LOGIN_SCREEN_CONFIGURATION;
//        
//        if(serverAppearance){
//            featureConfiguration = {
//                appearance: configuration
//            };
//        }else{
//            featureConfiguration = this.getConfiguration();
//        }
//        
//        currentFeature.data.configuration = featureConfiguration;
//        return featureConfiguration;
//    },
    
         
     getConfiguration: function(){
        
        var configuration = {
            appearance: {
                title: 'Nexcap solution management',
                color: '#3f5c96',
                logoPicture: 'resources/images/icons/logo_nexcap.png',
                backgroundPicture: 'resources/images/background.jpg'
            }
        };
        
        return configuration;
    },
    
    //keep the session open
    keepSession: function(){
        
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/resources/datetime',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            
            success: function(response) {
                //nope
            },
            failure: function(response) {
                //nope
            }
        });  
        
    }
    
    
});