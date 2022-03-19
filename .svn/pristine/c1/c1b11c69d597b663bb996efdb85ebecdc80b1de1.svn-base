/* global Ext */

Ext.define('Dashboard.manager.operation.SendingsManager', {
    extend: 'Ext.app.Controller',
    alias: 'sendingsManager',
    singleton: true,
    
    requires: ['Dashboard.tool.Utilities'],
    
    store: Ext.create('Dashboard.store.operation.Sendings', {
        autoLoad: false
    }),
    
    loadConfiguration: function(feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[SendingsManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[SendingsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'SendingsManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[SendingsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[SendingsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[SendingsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[SendingsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[SendingsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature) {

        Dashboard.tool.Utilities.info('[SendingsManager.displayInMain] show sendings feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[SendingsManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'consultationSendingsMain',
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
                        dataIndex: 'userSticker',
                        cellWrap: false
                    }, {
                        text: getText('Item'),
                        locked: true,
                        width: 200,
                        sortable: true,
                        dataIndex: 'name',
                        cellWrap: false
                    }, {
                        text: getText('Ref. code'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        // formatter: 'usMoney',
                        dataIndex: 'productReferenceCode'
                    }, {
                        text: getText('Ref. designation'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        // formatter: 'usMoney',
                        dataIndex: 'productReferenceDesignation'
                    }, {
                        text: getText('Category'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productCategoryName',
                        cellWrap: false
                    }, {
                        text: getText('Source address'),
                        minWidth: 300,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'sourceAddress',
                        cellWrap: false
                    }, {
                        text: getText('Destination path'),
                        minWidth: 300,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'destinationPath',
                        cellWrap: false
                    }, {
                        text: getText('Expedition number'),
                        width: 200,
                        sortable: true,
                        dataIndex: 'sendingNumber'
                    }, {
                        text: getText('Recipient'),
                        width: 200,
                        sortable: true,
                        dataIndex: 'recipient',
                        cellWrap: false
                    }]
            }
        };

        return configuration;

    },
    getOne: function(id, controller, action) {

        try {
            Dashboard.model.operation.Sending.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[SendingsManager.getOne] error: loading failure');
                },
                success: function(record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.operation.Sending', response.data);

                    Dashboard.tool.Utilities.info('[SendingsManager.getOne] loading success : ' + model.data.name);

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
            Dashboard.tool.Utilities.error('[SendingsManager.getOne] error: ' + err);
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
                name: 'name',
                label: getText('Item'),
                type: 'STRING'
            }, {
                name: 'productReferenceCode',
                label: getText('Ref. code'),
                type: 'STRING'
            }, {
                name: 'productReferenceDesignation',
                label: getText('Ref. designation'),
                type: 'STRING'
            }, {
                name: 'userSticker',
                label: getText('Operator'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'users',
                        width: 200
                    }
                })
            }, {
                name: 'recipient',
                label: getText('Recipient'),
                type: 'STRING'
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
                name: 'destinationPath',
                label: getText('Destination path'),
                type: 'STRING'
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
                name: 'quantity',
                label: getText('Quantity'),
                type: 'INT'
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
                name: 'useCount',
                label: getText('Uses count'),
                type: 'INT'
            }, {
                name: 'identified',
                label: getText('Identified'),
                type: 'BOOLEAN'
            }, {
                name: 'sendingNumber',
                label: getText('Sending number'),
                type: 'STRING'
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
                            material: 'name',
                            productReferenceCode: 'productReferenceCode',
                            productReferenceDesignation: 'productReferenceDesignation',
                            category: 'productCategoryName'
                        }
                    }
                })
            }];
    }

});
