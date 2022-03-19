/* global Ext  */

Ext.define('Dashboard.manager.operation.CalibrationsManager', {
    extend: 'Ext.app.Controller',
    alias: 'calibrationsManager',
    singleton: true,
    requires: ['Dashboard.tool.Utilities'],
    
    store: Ext.create('Dashboard.store.operation.Calibrations', {
        autoLoad: false
    }),
    
    loadConfiguration: function(feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[CalibrationsManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[CalibrationsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'MaterialManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[CalibrationsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[CalibrationsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[CalibrationsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[CalibrationsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[CalibrationsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature) {

        Dashboard.tool.Utilities.info('[CalibrationsManager.displayInMain] show calibrations feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[CalibrationsManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'consultationCalibrationsMain',
            store: this.store,
            configuration: configuration,
            feature: feature,
            tag: 'main'
        });
    },
    getConfiguration: function() {

        var configuration = {
            enabledTools: {
                create: false,
                edit: false,
                read: false,
                destroy: false,
                duplicate: false,
                exportToFile: true,
                configViewList: true
            },
            // Grid
            table: {
                displayRowNumbers: true,
                columns: [{
                        text: getText('Operation date'),
                        locked: true,
                        width: 150,
                        sortable: true,
                        formatter: 'date("' + getText('m/d/Y H:i:s') + '")',
                        dataIndex: 'date'
                    }, {
                        text: getText('Operator'),
                        locked: true,
                        width: 200,
                        sortable: true,
                        dataIndex: 'actorName',
                        cellWrap: false
                    }, {
                        text: getText('Item'),
                        locked: true,
                        width: 200,
                        sortable: true,
                        dataIndex: 'materialName',
                        cellWrap: false
                    }, {
                        text: getText('Ref. code'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productReferenceCode'
                    }, {
                        text: getText('Ref. designation'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productReferenceDesignation'
                    }, {
                        text: getText('Category'),
                        hidden: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productCategoryName'
                    }, {
                        text: getText('Source address'),
                        minWidth: 300,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'sourceAddress',
                        cellWrap: false
                    }, {
                        text: getText('Uses count'),
                        minWidth: 300,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'useCount',
                        cellWrap: false
                    }]
            }
        };

        return configuration;

    },
    getOne: function(id, controller, action) {

        try {
            Dashboard.model.operation.Calibration.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[CalibrationsManager.getMaterial] error: loading failure');
                },
                success: function(record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.operation.Calibration', response.data);

                    Dashboard.tool.Utilities.info('[CalibrationsManager.getOne] loading success : ' + model.data.name);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    }
                },
                callback: function(record, operation, success) {
                    // nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[CalibrationsManager.getOne] error: ' + err);
        }

    },
    getProperties: function() {

        return [{
                name: 'date',
                label: getText('Operation date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'actorName',
                label: getText('Operator'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'users',
                        width: 200
                    }
                })
            }, {
                name: 'sourceAddress',
                label: getText('Source address'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'comboItemRefCat',
                label: getText('Combo Item - Reference - Category'),
                type: 'STRING',
                filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'comboitemrefcat',
                        width: 400,
                        mapProperties: {
                            material: 'materialName',
                            productReferenceCode: 'productReferenceCode',
                            productReferenceDesignation: 'productReferenceDesignation',
                            category: 'productCategoryName'
                        }
                    }
                })
            }, {
                name: 'assignedLocationAddress',
                label: getText('Assigned location'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                label: getText('Category'),
                name: 'productCategoryName',
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'categories',
                        width: 400
                    }
                })
            }, {
                name: 'productReferenceCode',
                label: getText('Ref. code'),
                type: 'STRING'
            }, {
                name: 'productReferenceDesignation',
                label: getText('Ref. designation'),
                type: 'STRING'
            }, {
                name: 'materialName',
                label: getText('Item'),
                type: 'STRING'
            }, {
                name: 'useCount',
                label: getText('Uses count'),
                type: 'INT'
            }];
    }

});