/* global Ext  */

Ext.define('Dashboard.manager.administration.LocationsManager', {
    extend: 'Ext.app.Controller',
    alias: 'locationsManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.administration.Locations',{
        autoLoad: false,
        leadingBufferZone: 300,
        pageSize: 100
    }),
    
    
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[LocationsManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.displayInMain(feature);
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
                        Dashboard.tool.Utilities.info('[LocationsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        this.displayInMain(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'LocationsManager'); // 6843
                    }                   
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[LocationsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[LocationsManager.displayInMain] show locations Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[LocationsManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
        
        mainController.displayInMain(
            { 
                xtype: 'locationMain',
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
                destroy: true,
                duplicate: false,
                exportToFile: false,
                detailToggle: true,
                configDetail: true
            }
            
        };
        
        return configuration;
        
    },
    
    
    /**
     * Get one location
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function(id, controller, action){

        try{
            Dashboard.model.administration.Location.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[LocationsManager.getOne] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.administration.Location', response.data);
                    
                    Dashboard.tool.Utilities.info(
                            '[LocationsManager.getOne] loading success. Location: '+ model.data.name);
                                        
                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    } else if (action === 'addToRefrence') {
                        controller.addLocationToList(model);
                    } else if (action === 'setLocationData') {
                        controller.setLocationData(model);
                    }
                },
                callback: function(record, operation, success) {
                    //nothing
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[LocationsManager.getOne] error: ' + err);
        }

    },
    
    
    
    save: function(model, controller, action){
        if(!model){
            throw new Error('[LocationsManager.save] model is null or empty!');
        }
        
        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope:this,
            success: function(record, response) {
                
                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[LocationsManager.save] save and read success : location.name: '+ model.data.name);
                
                Dashboard.manager.administration.FilesManager.saveThumbnail(
                        model.data.id, 'location', 'doAfterThumbnailSaved', this);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
            
                if(action === 'doPostSaveAction'){
                    controller.doPostSaveAction(model);
                }
            }
        }); 
    },
    
    
    doAfterThumbnailSaved: function(){
        //this.store.load();
        try{
            Ext.ComponentQuery.query('locationMain')[0].getController().refresh();
            //this.store.load();
        }catch(ex){}
    },
    

    update: function(model, controller, action){
        if(!model){
            throw new Error('[LocationsManager.update] model is null or empty!');
        }
        
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        
        model.save({
            scope:this,
            success: function(record, response) {
                                
                //var responseText = Ext.decode(response._response.responseText);
                var model = Ext.create('Dashboard.model.administration.Location', record.data);
                
                Dashboard.manager.administration.FilesManager.saveThumbnail(
                        model.data.id, 'location', 'doAfterThumbnailSaved', this);
                
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
            
                if(action === 'doPostEditAction'){
                    controller.doPostEditAction(model);
                }
            }
        });
    },
    
    
    /**
     * Delete location by id
     * @param {int} id
     * @param {object} sender (grid, treePanel)
     * @returns {undefined}
     */
    deleteOne: function(id, controller, action){
        if(!id){
            throw new Error('[LocationsManager.deleteOne] location is null or empty!');
        }

        var model = Ext.create('Dashboard.model.administration.Location', {
            id:id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('[LocationsManager.deleteOne] success: location deleted');
                
                //todo msg
                if(action === 'refresh'){
                    controller.refresh();
                }
            }
        });
    }

});