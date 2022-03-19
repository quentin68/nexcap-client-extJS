/* global Ext  */

Ext.define('Dashboard.manager.administration.PositionsManager', {
    extend: 'Ext.app.Controller',
    alias: 'positionsManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities',
        'Dashboard.ux.TreeStateful'
    ],
    
    store: Ext.create('Dashboard.store.administration.PositionsTree',{
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
                    Dashboard.tool.Utilities.info('[PositionsManager.loadConfiguration] error: loading failure');
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
                        

                        Dashboard.tool.Utilities.info('[PositionsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        this.displayInMain(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'PositionsManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[PositionsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[PositionsManager.displayInMain] show positions Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[PositionsManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
        
        mainController.displayInMain(
            { 
                xtype: 'positionMain',
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
     * Get one position
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function(id, controller, action){
        
        try{
            Dashboard.model.administration.Position.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[PositionsManager.getOne] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.administration.Position', response.data);
                    
                    Dashboard.tool.Utilities.info(
                            '[PositionsManager.getOne] loading success. Position: '+ model.data.name);
                                        
                    if(action === 'edit'){
                        controller.edit(model);
                    }else if(action === 'displayDetail'){
                        controller.displayDetail(model);
                    }
                },
                callback: function(record, operation, success) {
                    //nothing
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[PositionsManager.getOne] error: ' + err);
        }

    },
    
    
    
    save: function(model, controller, action){
        if(!model){
            throw new Error('[PositionsManager.save] model is null or empty!');
        }
        
        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope:this,
            success: function(record, response) {
                
                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[PositionsManager.save] save and read success : position.name: '+ model.data.name);
                
                Dashboard.manager.administration.FilesManager.saveThumbnail(
                        model.data.id, 'position', 'doAfterThumbnailSaved', this);

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
            Ext.ComponentQuery.query('positionMain')[0].getController().refresh();
            //this.store.load();
        }catch(ex){}
    },
    

    update: function(model, controller, action){
        if(!model){
            throw new Error('[PositionsManager.update] model is null or empty!');
        }
        
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        
        model.save({
            scope:this,
            success: function(record, response) {
                
                Dashboard.manager.administration.FilesManager.saveThumbnail(
                        model.data.id, 'position', 'doAfterThumbnailSaved', this);
                
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
            
                if(action === 'doPostEditAction'){
                    controller.doPostEditAction(model);
                }
            }
        });
    },
    
    
    /**
     * Delete position by id
     * @param {int} id
     * @param {object} sender (grid, treePanel)
     * @returns {undefined}
     */
    deleteOne: function(id, controller, action){
        if(!id){
            throw new Error('[PositionsManager.deleteOne] position is null or empty!');
        }

        var model = Ext.create('Dashboard.model.administration.Position', {
            id:id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('[PositionsManager.deleteOne] success: position deleted');
                
                //todo msg
                if(action === 'refresh'){
                    controller.refresh();
                }
            }
        });
    },
    
    getProperties: function(){
        
        return [
            
        ];
    }

});