/*  global Ext */

Ext.define('Dashboard.manager.settings.WebClientManager', {
    extend: 'Ext.app.Controller',
    alias: 'webClientManager',
    singleton: true,
    
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'EXTERNAL_CONFIGURATION_ADMIN', 0, false, true, true), 
    
    config:{

    },
        
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try{
             
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    
                    Dashboard.tool.Utilities.info('[WebClientManager.loadConfiguration] error: loading failure');
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
                        Dashboard.tool.Utilities.info('[WebClientManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.displayInMain(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'MaterialManager');
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[WebClientManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    update: function(model, controller, action){
        if(!model){
            throw new Error('[WebClientManager.update] model is null or empty!');
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
                xtype: 'webClientMain',
                store: this.store,
                configuration: null,
                feature: feature
            }
        );
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
    } 
    
});