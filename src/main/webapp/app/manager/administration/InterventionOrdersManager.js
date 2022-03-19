/* global Ext */

Ext.define('Dashboard.manager.administration.InterventionOrdersManager', {
    extend: 'Ext.app.Controller',
    alias: 'interventionOrdersManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.administration.InterventionOrders',{
        autoLoad: false
    }),
        
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[InterventionOrdersManager.loadConfiguration] error: loading failure');
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
                        Dashboard.tool.Utilities.info('[InterventionOrdersManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        this.loadUserConfiguration(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'MaterialManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[InterventionOrdersManager.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[InterventionOrdersManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[InterventionOrdersManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[InterventionOrdersManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[InterventionOrdersManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[InterventionOrdersManager.displayInMain] show users Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[InterventionOrdersManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
        
        mainController.displayInMain(
            { 
                xtype: 'interventionOrderMain',
                store: this.store,
                configuration: configuration,
                feature: feature
            }
        );
    },
            
            
    /**
     * Get one item
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function(id, controller, action){
        
        try{
            Dashboard.model.administration.InterventionOrder.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[InterventionOrdersManager.getOne] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.administration.InterventionOrder', response.data);
                    
//                    if(model.data.productReferenceIds){
//                        model.data.productReferenceIds = Ext.decode(model.data.productReferenceIds);
//                    }
                    
                    Dashboard.tool.Utilities.info('[InterventionOrdersManager.getOne] loading success. Intervention order: '+ model.data.number);
                                        
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
            Dashboard.tool.Utilities.error('[InterventionOrdersManager.getOne] error: ' + err);
        }

    },
    
    
    
    save: function(model, controller, action){
        if(!model){
            throw new Error('[InterventionOrdersManager.save] model is null or empty!');
        }
        
        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope:this,
            success: function(record, response) {
                
                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[InterventionOrdersManager.save] save and read success : interventionOrder.name: '+ model.data.number);
                
                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
            
                if(action === 'doPostSaveAction'){
                    controller.doPostSaveAction(model);
                }
            }
        }); 
    },
    

    update: function(model, controller, action){
        if(!model){
            throw new Error('[InterventionOrdersManager.update] model is null or empty!');
        }
        
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        
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
    

    doAfterThumbnailSaved: function(){
        
        this.store.load();
        
        //TODO getSelection refresh detail
        
    },
    
    
    /**
     * Delete item by id
     * @param {int} id
     * @param {object} sender (grid, treePanel)
     * @returns {undefined}
     */
    deleteOne: function(id, controller, action){
        if(!id){
            throw new Error('[InterventionOrdersManager.deleteOne] id is null or empty!');
        }

        var model = Ext.create('Dashboard.model.administration.InterventionOrder', {
            id:id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('[InterventionOrdersManager.deleteOne] success: interventionOrder deleted');
                
                //todo msg
                if(action === 'refresh'){
                    controller.refresh();
                }
            }
        });
    },        
            
            
     getConfiguration: function(){
        
        var configuration = {
            
            enabledTools: {
                create: true,
                edit: true,
                read: false,
                destroy: true,
                duplicate: false,
                exportToFile: true,
                detailToggle: true,
                configDetail: false
            },
            //Grid
            table: {

                displayRowNumbers: true,

                columns:[
                    {
                        text     : getText('IO Number'),
                        locked   : false,
                        width    : 300,
                        sortable : true,
                        dataIndex: 'number',
                        cellWrap: false
                    },{
                        text     : getText('Label'),
                        locked   : false,
                        width    : 300,
                        sortable : true,
                        dataIndex: 'label',
                        cellWrap: false
                    },{
                        text     : getText('Description'),
                        locked   : false,
                        flex: 1,
                        sortable : true,
                        dataIndex: 'description',
                        cellWrap: false
                    }
                ],

                extendedProperties:{
                    properties:[
                        {
                            property: 'label',
                            label: getText('Label')
                        },{
                            property: 'description',
                            label: getText('Description')
                        }
                    ]
                }
            }

        };
        
        return configuration;
        
    },
            
            
    getProperties: function(){
        
        return [
            {
                name: 'label',
                label: getText('Label'),
                type: 'STRING'
            },{
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            },{
                name: 'number',
                label: getText('IO Number'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'interventionorders',
                        label: getText('IO number'),
                        width: 400
                    }
                })
            }
        ];
    }
    
});