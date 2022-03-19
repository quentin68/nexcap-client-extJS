/* global Ext */

Ext.define('Dashboard.manager.administration.ProfilesManager', {
    extend: 'Ext.app.Controller',
    alias: 'profilesManager',
    singleton: true,
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.administration.Profiles', {
        autoLoad: false,
        leadingBufferZone: 300,
        pageSize: 100
    }),
    
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation){
                    Dashboard.tool.Utilities.info('[ProfilesManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function(record, operation){
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[ProfilesManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ProfilesManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ProfilesManager.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ProfilesManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ProfilesManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ProfilesManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ProfilesManager.loadConfiguration] error: ' + err);
        }
    },
    
    displayInMain: function(feature){

        Dashboard.tool.Utilities.info('[ProfilesManager.displayInMain] show profile Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[ProfilesManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain(
                {
                    xtype: 'profileMain',
                    store: this.store,
                    configuration: configuration,
                    feature: feature,
                    tag: 'main'
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
                exportToFile: true,
                configViewList: true,
                detailToggle: true,
                configDetail: false
            },
            
            //Grid
            table: {
                displayRowNumbers: true,
                columns: [
                    {
                        text: getText('Profile'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'name',
                        cellWrap: false
                    }, {
                        text: getText('Description'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'description',
                        cellWrap: false
                    }
                ],
                extendedProperties: {
                    properties: [
                        {
                            label: getText('Profile'),
                            property: 'name'
                        }, {
                            label: getText('Description'),
                            property: 'description'
                        }
                    ]
                }
            }

        };

        return configuration;
    },
    /**
     * Get one item
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function(id, controller, action){

        try {
            Dashboard.model.administration.Profile.load(id, {
                scope: this,
                failure: function(record, operation){
                    Dashboard.tool.Utilities.info('[ProfileManager.getOne] error: loading failure');
                },
                success: function(record, operation){

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.administration.Profile', response.data);

                    Dashboard.tool.Utilities.info('[ProfileManager.getOne] loading success. Profile: ' + model.data.name);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    }
                },
                callback: function(record, operation, success){
                    //nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ProfileManager.getOne] error: ' + err);
        }
    },
    save: function(model, controller, action){
        if (!model) {
            throw new Error('[ProfileManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function(record, response){

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[ProfileManager.save] save and read success : name: ' + model.data.name);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model);
                }
            }
        });
    },
    update: function(model, controller, action){
        if (!model) {
            throw new Error('[ProfileManager.update] model is null or empty!');
        }

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function(record, response){

                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostEditAction') {
                    controller.doPostEditAction(model);
                }
            }
        });
    },
    /**
     * Delete item by id
     * @param {int} id
     * @param {object} sender (grid, treePanel)
     * @returns {undefined}
     */
    deleteOne: function(id, controller, action){
        if (!id) {
            throw new Error('[ProfileManager.deleteOne] user is null or empty!');
        }

        var model = Ext.create('Dashboard.model.administration.Profile', {
            id: id
        });

        model.erase({
            success: function(){

                Dashboard.tool.Utilities.info('[ProfileManager.deleteOne] success: profile deleted');

                //todo msg
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },
    getProperties: function(){

        return [
            {
                label: 'Profile',
                name: 'name',
                type: 'STRING'
            }, {
                label: 'Description',
                name: 'description',
                type: 'STRING'
            }

        ];
    }

});