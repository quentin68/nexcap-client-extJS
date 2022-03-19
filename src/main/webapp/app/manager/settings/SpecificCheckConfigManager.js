Ext.define('Dashboard.manager.settings.SpecificCheckConfigManager', {
    extend: 'Ext.app.Controller',
    alias: 'specificCheckConfigManager',
    singleton: true,
    
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'SPECIFIC_CHECK_CONFIG_ADMIN', 0, false, true, true), 
    

    store: Ext.create('Dashboard.store.settings.SpecificCheckConfig',{
          autoLoad: false,
          sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
      }),
    
        
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try{
            
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    
                    Dashboard.tool.Utilities.info('[SpecificCheckConfigManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function(record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);
                        
                        // mantis : 6843
                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }
                        
                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[SpecificCheckConfigManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'SpecificCheckConfigManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[SpecificCheckConfigManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[SpecificCheckConfigManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[SpecificCheckConfigManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[SpecificCheckConfigManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[SpecificCheckConfigManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    /**
     * 
     * @param {int} id
     * @param {type} controller
     * @param {string} action
     * @returns {Dashboard.model.settings.SpecificCheckConfig}
     */
    getOne: function (id, controller, action) {
        try {
            Dashboard.model.settings.SpecificCheckConfig.load(id, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[SpecificCheckConfigManager.getOne] error: loading failure');
                },
                success: function (record, operation) {
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.settings.SpecificCheckConfig', response.data);

                    if (model.data.properties) {
                        Ext.each(model.data.properties, function (property) {
                            property.configuration.control = Ext.decode(property.configuration.control);
                        });
                    }

                    Dashboard.tool.Utilities.info('[SpecificCheckConfigManager.getOne] loading success. SpecificCheckConfig : ' + model.data.name);

                    if (action === 'onLoadSpecificCheckConfig') {
                        controller.onLoadSpecificCheckConfig(model);
                    }
                },
                callback: function (record, operation, success) {
                    // nothing
                }
            });
        } catch (err) {
            Dashboard.tool.Utilities.error('[SpecificCheckConfigManager.getOne] error: ' + err);
        }
    },
    
  save: function(model, controller, action){
        if(!model){
            throw new Error('[SpecificCheckConfigManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.save({
            scope:this,
            success: function(record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[SpecificCheckConfigManager.save] save and read success : name: '+ model.data.name);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if(action === 'doPostSaveAction'){
                    controller.doPostSaveAction(model);
                }
            },
            failure: function(record, response) {                    
            }
        }); 
    },
    

    update: function(model, controller, action){
        if(!model){
            throw new Error('[SpecificCheckConfigManager.update] model is null or empty!');
        }        
        
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
    
    exportPdf: function (model, controller, action) {
        if (!model) {
            throw new Error('[SpecificCheckConfigManager.exportPdf] model is null or empty!');
        }
        
        delete model.data.id;
        model.data.executionDate = Ext.Date.format(new Date(), 'c');
        model.save({
            scope: this,
            success: function (record, response) {
            	
                var url = response._response.responseText;
                var file = new Blob([url], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            },
            failure: function(record, response) {    
            	
                var url = response._response.responseText;
                var file = new Blob([url], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        });
    }, 
    
    /**
     * Delete item by id
     * @param {int} id
     * @param {object} controller
     * @param {object} action 
     * @returns {undefined}
     */
    deleteOne: function(id, controller, action){
        if(!id){
            throw new Error('[SpecificCheckConfigManager.deleteOne] user is null or empty!');
        }
        
        var model = Ext.create('Dashboard.model.settings.SpecificCheckConfig', {
            id:id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('[SpecificCheckConfigManager.deleteOne] success: alert deleted');
                
                //todo msg
                if(action === 'refresh'){
                    controller.refresh();
                }
            }
        });
    },

    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[SpecificCheckConfigManager.displayInMain] show server configuration Management feature');

        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[SpecificCheckConfigManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }

        mainController.displayInMain(
            { 
                xtype: 'specificCheckConfigMain',
                store: this.store,
                configuration: configuration,
                feature: feature
            }
        );
    },
    
    getConfiguration: function(){
        
        var configuration = {

            enabledTools: {
                create: true,
                edit: true,
                read: false,
                destroy: true,
                duplicate: false,
                exportToFile: false,
                configViewList: true
            },

            //Grid
            table: {

                columns:[
                    {
                        text     : getText('Name'),
                        locked   : false,
                        flex     : 1,
                        sortable : true,
                        dataIndex: 'name',
                        cellWrap: false
                    },{
                        text     : getText('Nb paragraph'),
                        locked   : false,
                        flex     : 1,
                        sortable : false,
                        dataIndex: 'count',
                        cellWrap: false
                    }
                ],
                extendedProperties : {
					properties : []
				}
            }

        };

        return configuration;
    },

      getProperties: function(){

        return [
            
             {
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            },
            {
                name: 'count',
                label: getText('Nb paragraph'),
                type: 'INT'
            }
        ];
    } 
    
});