Ext.define('Dashboard.manager.settings.ServerConfigManager', {
    extend : 'Ext.app.Controller',
    alias : 'ServerConfigManager',
    singleton : true,

    requires : [ 'Dashboard.tool.Utilities' ],

    feature : Ext.create('Dashboard.store.Features').findRecord('name', 'SERVER_CONFIG_ADMIN', 0, false, true, true),

    config : {
	currentServerConfig : Ext.create('Dashboard.model.settings.ServerConfig', {
	    id : 1,
	    sticker : 'admin'
	})
    },

    loadConfiguration : function(feature) {

        feature.data.enabledTools = this.getConfiguration().enabledTools;

	try {

	    Dashboard.model.FeatureConfiguration.load(feature.data.name, {
		scope : this,
		failure : function(record, operation) {

		    Dashboard.tool.Utilities.info('[ServerConfigManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
		    this.loadUserConfiguration(feature);
		},
		success : function(record, operation) {
		    try {
			var response = JSON.parse(operation._response.responseText);
			var jsonData = JSON.parse(response.data);

			// mantis : 6843
			if (response === undefined || jsonData === undefined) {
			    throw 'Bad JSON in response'; // If error is not thrown, for some reason
			}

			var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);

			feature.data.configuration = model;
			Dashboard.tool.Utilities.info('[ServerConfigManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

			this.loadUserConfiguration(feature);
		    } catch (ex) {
			Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ServerConfigManager'); // 6843
		    }
		}
	    });

	} catch (err) {
	    Dashboard.tool.Utilities.error('[ServerConfigManager.loadConfiguration] error: ' + err);
	}

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ServerConfigManager.loadUserConfiguration] error: loading failure');
                    delete feature.data.userConfiguration;
                    this.displayInMain(feature);
                },
                success: function(record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data.value);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; 
                        }
                        
                        var configuration = Ext.create('Dashboard.model.UserConfiguration', jsonData);
                        feature.data.userConfiguration = configuration;
                        Dashboard.tool.Utilities.info('[ServerConfigManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ServerConfigManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ServerConfigManager.loadConfiguration] error: ' + err);
        }
    },
    

    update : function(model, win) {
	if (!model) {
	    throw new Error('[ServerConfigManager.update] model is null or empty!');
	}

	model.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/configuration/';
	model.save({
	    scope : this,
	    success : function(record, response) {
		Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
		win.close();
		var feature = Dashboard.manager.FeaturesManager.setCurrentFeature('SERVER_CONFIG_ADMIN');
		this.displayInMain(feature);

	    },
	    failure : function(record, operation) {
		var response = operation.error.response;
		if (response.status === 500 && operation.error.response.responseText !== undefined) {
		    var responseText = Ext.decode(operation.error.response.responseText);
		    if (responseText.error.name !== undefined && responseText.error.name === 'PROPERTY_CONFIGURATION_SERVER_RESTART_NEEDED') {
			win.close();
		    }
		}
	    }
	});
    },

    displayInMain : function(feature) {

	Dashboard.tool.Utilities.info('[ServerConfigManager.displayInMain] show server configuration Management feature');

	var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

	mainController.displayInMain({
	    xtype : 'ServerConfigMain',
	    store : this.store,
	    configuration : null,
	    feature : feature
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
    

    getProperties : function() {

	return [];
    }

});