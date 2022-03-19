/* global Ext */

Ext.define('Dashboard.manager.system.ContextManager', {
    extend: 'Ext.app.Controller',
    alias: 'contextManager',
    singleton: true,

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.model.system.ContextUpdateUsers',
        'Dashboard.model.system.ContextUpdateDevices',
        'Dashboard.model.system.ContextUpdateMaterials',
        'Dashboard.model.system.ContextUpdateProperties',
        'Dashboard.model.system.ContextRemoveUsers',
        'Dashboard.model.system.ContextRemoveDevices',
        'Dashboard.model.system.ContextRemoveMaterials',
        'Dashboard.model.system.ContextRemoveProperties'
    ],

    store: Ext.create('Dashboard.store.system.Context', {
        autoLoad: false,
        sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
    }),

    loadConfiguration: function (feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var allRightProfile = false;
        var highProfilecurrentUser = currentUser.data.highProfileLevel;
        for (i=0;i<currentUser.data.profiles.length;i++) {
            if (currentUser.data.profiles[i].name === "All rights") {
                allRightProfile = true;
            }
        }
        if (highProfilecurrentUser === "MAX" && allRightProfile === false) {
            feature.data.enabledTools.create = false;
            feature.data.enabledTools.destroy = false;
        }
        try {
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[ContextManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function (record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        // mantis : 6843
                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[ContextManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        this.loadUserConfiguration(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ContextManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ContextManager.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ContextManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ContextManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ContextManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ContextManager.loadConfiguration] error: ' + err);
        }
    },

    displayInMain: function (feature) {
        Dashboard.tool.Utilities.info('[ContextManager.displayInMain] show context Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[ContextManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'contextMain',
            store: this.store,
            configuration: configuration, // default conf
            feature: feature
        });
    },

    getConfiguration: function () {

        var configuration = {
            enabledTools: {
                create: true,
                edit: true,
                read: false,
                destroy: true,
                duplicate: false,
                exportToFile: true,
                configViewList: false,
                detailToggle: true
            },
            table: {// Grid
                multiSelection: false,
                displayRowNumbers: true,
                displayThumbnail: false,
                columns: [{
                        text: getText('Name'),
                        sortable: true,
                        width: 'auto',
                        flex: 1,
                        dataIndex: 'name',
                        cellWrap: false
                    }],
                extendedProperties: {
                    properties: [{
                            property: 'name',
                            label: getText('Name')
                        }]
                }
            }

        };

        return configuration;
    },

    getOne: function (id, controller, action) {
        try {
            Dashboard.model.system.Context.load(id, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[ContextManager.getOne] error: loading failure');
                },
                success: function (record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.system.Context', response.data);

                    if (model.data.properties) {
                        Ext.each(model.data.properties, function (property) {
                            property.configuration.control = Ext.decode(property.configuration.control);
                        });
                    }

                    Dashboard.tool.Utilities.info('[ContextManager.getOne] loading success. Context: ' + model.data.name);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    }
                },
                callback: function (record, operation, success) {
                    // nothing
                }
            });
        } catch (err) {
            Dashboard.tool.Utilities.error('[ContextManager.getOne] error: ' + err);
        }
    },

    save: function (model, controller, action) {
        if (!model) {
            throw new Error('[ContextManager.save] model is null or empty!');
        }

        delete model.data.id;

        model.save({
            scope: this,
            success: function (record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[ContextManager.save] save and read success : context.name: ' + model.data.name);

                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model, Ext.decode(response._response.responseText));
                } else if(action === 'doPostRestriction'){
                    controller.doPostSaveRestriction(model);
                }
            }
        });
    },
    

    update: function (model, controller, action) {
        if (!model) {
            throw new Error('[ContextManager.update] model is null or empty!');
        }
                
        this.updateUsers(model, controller, action);
        this.updateDevices(model, controller, action);
        this.updateMaterials(model, controller, action);
        this.updateProperties(model, controller, action);
        
        this.deleteUsers(model, controller, action);
        this.deleteDevices(model, controller, action);
        this.deleteMaterials(model, controller, action);
        this.deleteProperties(model, controller, action);
        
        this.cleanUpData(model);
        
        model.save({
            scope: this,
            success: function (record, response) {
                if (action === 'doPostEditAction') {
                    controller.doPostEditAction(model, Ext.decode(response._response.responseText));
                }
            },
            failure: function (record, operation) {
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + model.data.name);
            }
        });
    },
    
    
    cleanUpData: function(model){
        
        delete(model.data.addedMaterialsList);
        delete(model.data.addedUsersList);
        delete(model.data.addedDevicesList);
        delete(model.data.addedPropertiesList);
        delete(model.data.removedMaterialsList);
        delete(model.data.removedUsersList);
        delete(model.data.removedDevicesList);
        delete(model.data.removedPropertiesList);
        
        model.data.userIdList = null;
        model.data.deviceIdList = null;
        model.data.materialIdList = null;
        model.data.propertyConfigurationIdList = null;
        
        return model;
    },
    
    
    updateMaterials: function(_model, controller, action){
        if(_model.data.addedMaterialsList.length < 1){
            return;
        }
        
        var model = Ext.create('Dashboard.model.system.ContextUpdateMaterials',{
            id: _model.data.id,
            objectIds: _model.data.addedMaterialsList
        });
        
        model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + _model.data.id + '/addmaterials';
        
        model.save({
            scope: this,
            success: function (record, response) {
                model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '';
            },
            failure: function (record, operation) {
                model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '';
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + _model.data.name);
            }
        });
        
        controller.addedMaterialsList = [];
        
    },
    
    
    updateDevices: function(_model, controller, action){
        if(_model.data.addedDevicesList.length < 1){
            return;
        }
        
        var model = Ext.create('Dashboard.model.system.ContextUpdateDevices',{
            id: _model.data.id,
            objectIds: _model.data.addedDevicesList
        });
        
        model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + _model.data.id + '/adddevices';
        
        model.save({
            scope: this,
            success: function (record, response) {
                model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '';
            },
            failure: function (record, operation) {
                model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '';
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + _model.data.name);
            }
        });
        
        controller.addedDevicesList = [];
        
    },
    
    updateUsers: function(_model, controller, action){
        if(_model.data.addedUsersList.length < 1){
            return;
        }
        
        var model = Ext.create('Dashboard.model.system.ContextUpdateUsers',{
            id: _model.data.id,
            objectIds: _model.data.addedUsersList
        });
        
        model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + _model.data.id + '/addusers';
        
        model.save({
            scope: this,
            success: function (record, response) {
                model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '';
            },
            failure: function (record, operation) {
                model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '';
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + _model.data.name);
            }
        });
        
        controller.addedUsersList = [];
        
    },
    
    updateProperties: function(_model, controller, action){
        if(_model.data.addedPropertiesList.length < 1){
            return;
        }
        
        var model = Ext.create('Dashboard.model.system.ContextUpdateProperties',{
            id: _model.data.id,
            objectIds: _model.data.addedPropertiesList
        });
        
        model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + _model.data.id + '/adddynamicproperties';
        
        model.save({
            scope: this,
            success: function (record, response) {
                model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '';
            },
            failure: function (record, operation) {
                model.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '';
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + _model.data.name);
            }
        });
        
        controller.addedPropertiesList = [];
        
    },
    
    
    deleteMaterials: function(_model, controller, action){
        if(_model.data.removedMaterialsList.length < 1){
            return;
        }
                
        var model = Ext.create('Dashboard.model.system.ContextRemoveMaterials',{
            id: _model.data.id,
            objectIds: _model.data.removedMaterialsList
        });
        
        model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + _model.data.id + '/removematerials';
        
        model.erase({
            scope: this,
            success: function (record, response) {
                model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '';
            },
            failure: function (record, operation) {
                model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '';
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + _model.data.name);
            }
        });
        
        controller.removedMaterialsList = [];
        
    },
    
    
    deleteDevices: function(_model, controller, action){
        if(_model.data.removedDevicesList.length < 1){
            return;
        }
        
        var model = Ext.create('Dashboard.model.system.ContextRemoveDevices',{
            id: _model.data.id,
            objectIds: _model.data.removedDevicesList
        });
        
        model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + _model.data.id + '/removedevices';
        
        model.erase({
            scope: this,
            success: function (record, response) {
                model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '';
            },
            failure: function (record, operation) {
                model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '';
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + _model.data.name);
            }
        });
        
        controller.removedDevicesList = [];
        
    },
    
    deleteUsers: function(_model, controller, action){
        if(_model.data.removedUsersList.length < 1){
            return;
        }
        
        var model = Ext.create('Dashboard.model.system.ContextRemoveUsers',{
            id: _model.data.id,
            objectIds: _model.data.removedUsersList
        });
        
        model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + _model.data.id + '/removeusers';
        
        model.erase({
            scope: this,
            success: function (record, response) {
                model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '';
            },
            failure: function (record, operation) {
                model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '';
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + _model.data.name);
            }
        });
        
        controller.removedUsersList = [];
        
    },
    
    deleteProperties: function(_model, controller, action){
        if(_model.data.removedPropertiesList.length < 1){
            return;
        }
        
        var model = Ext.create('Dashboard.model.system.ContextRemoveProperties',{
            id: _model.data.id,
            objectIds: _model.data.removedPropertiesList
        });
        
        model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + _model.data.id + '/removedynamicproperties';
        
        model.erase({
            scope: this,
            success: function (record, response) {
                model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '';
            },
            failure: function (record, operation) {
                model.getProxy().api.destroy = Dashboard.config.Config.SERVER_HOST_NAME + '';
                Dashboard.tool.Utilities.info('[ContextManager.update] failed : ' + _model.data.name);
            }
        });
        
        controller.removedPropertiesList = [];
        
    },
    

    deleteOne: function (id, controller, action) {
        if (!id) {
            throw new Error('[ContextManager.delete] model is null or empty!');
        }

        var model = Ext.create('Dashboard.model.system.Context', {
            id: id
        });

        model.erase({
            success: function () {
                Dashboard.tool.Utilities.info('[ContextManager.delete] success: model deleted');
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },

    getProperties: function (action) {

        return [{
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            }
        ];
    }

});