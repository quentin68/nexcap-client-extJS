/*  global Ext */

Ext.define('Dashboard.manager.settings.UserSettingsManager', {
    extend: 'Ext.app.Controller',
    alias: 'userSettingsManager',
    singleton: true,
    
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'USER_SETTINGS', 0, false, true, true), 
    
    
    config:{

    },
        
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        if(currentUser.data.profiles[0].name === 'All rights'){
            
            Ext.Msg.show({
                title: getText('Warning'),
                message: getText('This feature is not available for a super admin user.'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
        
        try{
             
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    
                    Dashboard.tool.Utilities.info('[UserSettingsManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.displayInMain(feature);
                },
                success: function(record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);

                        feature.data.configuration = model;
                        Dashboard.tool.Utilities.info('[UserSettingsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.displayInMain(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'MaterialManager');
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[UserSettingsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    update: function(model, controller, action){
        if(!model){
            throw new Error('[UserSettingsManager.update] model is null or empty!');
        }
        
        model.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/configuration/';
        model.save({
            scope:this,
            success: function(record, response) {   
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));       
                if(action === 'doPostEditAction'){
                    controller.doPostEditAction(model);
                }
            }
        });
    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[WebClientManager.displayInMain] show web client configuration feature');
        
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        mainController.displayInMain(
            { 
                xtype: 'userSettings',
                store: this.store,
                configuration: null,
                feature: feature
            }
        );
    },
    
    
    /**
     * Dashboard.manager.settings.UserSettingsManager.saveCurrentUserSettings()
     * @param {type} unsecured
     * @returns {undefined}
     */
    saveCurrentUserSettings: function(unsecured){
                        
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var settings = currentUser.data.userSettings;
                
        if(settings.id){
            delete settings.id;
        }

        var userSetting = Ext.create('Dashboard.model.UserSettings', settings);
        
        userSetting.save({
            scope: this,
            success: function(record, response) {
                Dashboard.tool.Utilities.info(
                        '[UserSettingsManager.saveCurrentUserSettings] success. true : '+ Ext.encode(settings));
            },
            failure: function(record, response) {
                var error = response.error.response.responseText;
                Dashboard.tool.Utilities.info(
                        '[UserSettingsManager.saveCurrentUserSettings] success. false : '+ error);
            }
        }); 
    },
    
            
    getConfiguration: function() {

        var configuration = {
            
            enabledTools: {
                create: false,
                edit: false,
                read: false,
                destroy: false,
                toggle: false,
                duplicate: false,
                authorize: false,
                exportToFile: false,
                detailToggle: false,
                configViewList: false,
                configDetail: false                
            }
        };
        
        return configuration;
    },
    
            
   getProperties: function(){
        
        return [];
    },
    
    
    getDefaultUserSettings: function(){
        
        var defaultUserSettings = { 
            personalFilters: false,
            personalColumns: false
        };
        
        return defaultUserSettings;
    }
    
});