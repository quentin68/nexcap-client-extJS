/* global Ext */

Ext.define('Dashboard.manager.historic.OperationsManager', {
    extend: 'Ext.app.Controller',
    alias: 'operationsManager',
    singleton: true,

    requires: ['Dashboard.tool.Utilities', 'Dashboard.store.OperationType'],

    store: Ext.create('Dashboard.store.historic.Operations', {
        sorters: [{
                property: 'operationDate',
                direction: 'DESC'
            }],
        autoLoad: false
    }),


    loadConfiguration: function (feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation){
                    Dashboard.tool.Utilities.info('[OperationsManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function (record, operation){
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        // mantis : 6843
                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[OperationsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'MaterialManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[OperationsManager.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[OperationsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[OperationsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[OperationsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[OperationsManager.loadConfiguration] error: ' + err);
        }
    },

    displayInMain: function (feature){

        Dashboard.tool.Utilities.info('[OperationsManager.displayInMain] show operations Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[OperationsManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'operationMain',
            store: this.store,
            configuration: configuration,
            feature: feature,
            tag: 'main'
        });
    },

    getConfiguration: function (){

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
                        text: getText('Operation'),
                        locked: true,
                        width: 200,
                        sortable: true,
                        dataIndex: 'operationType',
                        cellWrap: false
                    }, {
                        text: getText('Operator'),
                        locked: true,
                        dataIndex: 'operator',
                        width: 200
                    }, {
                        text: getText('Date'),
                        locked: true,
                        width: 150,
                        sortable: true,
                        dataIndex: 'operationDate',
                        formatter: 'date("' + getText('m/d/Y H:i:s') + '")',
                        cellWrap: false
                    }, {
                        text: getText('Quantity'),
                        locked: false,
                        width: 90,
                        sortable: true,
                        dataIndex: 'quantity',
                        cellWrap: false
                    }, {
                        text: getText('Item'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'materialName',
                        cellWrap: false
                    }, {
                        text: getText('Ref. code'),
                        locked: false,
                        dataIndex: 'productReferenceCode',
                        width: 300
                    }, {
                        text: getText('Ref. designation'),
                        locked: false,
                        dataIndex: 'productReferenceDesignation',
                        width: 300
                    }, {
                        text: getText('Category'),
                        locked: false,
                        dataIndex: 'productCategoryName',
                        width: 200
                    }, {
                        text: getText('Source'),
                        locked: false,
                        dataIndex: 'sourceAddress',
                        width: 300
                    }, {
                        text: getText('Destination'),
                        locked: false,
                        dataIndex: 'destinationAddress',
                        width: 300
                    }, {
                        text: getText('User'),
                        locked: false,
                        dataIndex: 'userName',
                        width: 200
                    }, {
                        text: getText('Recipient'),
                        locked: false,
                        dataIndex: 'recipient',
                        width: 200
                    }, {
                        text: getText('Intervention order number'),
                        locked: false,
                        dataIndex: 'interventionOrderNumber',
                        width: 200
                    }, {
                        text: getText('Sending Number'),
                        locked: false,
                        dataIndex: 'sendingNumber',
                        width: 200
                    }]
            }

        };

        return configuration;
    },

    /**
     * Get one item
     * 
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function (id, controller, action){

        try {
            Dashboard.model.historic.Profile.load(id, {
                scope: this,
                failure: function (record, operation){
                    Dashboard.tool.Utilities.info('[MovementsManager.getOne] error: loading failure');
                },
                success: function (record, operation){

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.historic.Movement', response.data);

                    Dashboard.tool.Utilities.info('[MovementsManager.getOne] loading success. Movement: ' + model.data.name);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    }
                },
                callback: function (record, operation, success){
                    // nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[MovementsManager.getOne] error: ' + err);
        }

    },

    getProperties: function (){

        return [{
                name: 'operationType',
                label: getText('Operation'),
                type: 'STRING'
            }, 
//            {
//                name: 'operationDate',
//                label: getText('Operation date'),
//                type: 'DATETIME',
//                control: Ext.encode({
//                    field: {
//                        fieldType: 'datesrange'
//                    }
//                })
//            }, 
            {
                name: 'operationDate',
                label: getText('Operation date'),
                type: 'DATETIME',
                filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'datestimerange',
                        label: ''
                    }
                })
            }, {
                name: 'quantity',
                label: getText('Quantity'),
                type: 'LONG'
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
                name: 'destinationAddress',
                label: getText('Destination address'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'userName',
                label: getText('User'),
                type: 'STRING'
            }, {
                name: 'operator',
                label: getText('Operator'),
                type: 'STRING'
            }, {
                name: 'recipient',
                label: getText('Recipient'),
                type: 'STRING'
            }, {
                name: 'interventionOrderNumber',
                label: getText('Intervention order number'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'interventionorders',
                        label: getText('IO number'),
                        width: 400,
                        displayField: 'number'
                    }
                })
            }, {
                name: 'interventionOrderLabel',
                label: getText('Intervention order label'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'interventionorders',
                        label: getText('IO number'),
                        width: 400,
                        displayField: 'label'
                    }
                })
            }, {
                name: 'interventionOrderDescription',
                label: getText('Intervention order description'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'interventionorders',
                        label: getText('IO number'),
                        width: 400,
                        displayField: 'description'
                    }
                })
            }, {
                name: 'sendingNumber',
                label: getText('Sending Number'),
                type: 'STRING'
            }, {
                name: 'materialName',
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
                label: getText('Category'),
                name: 'productCategoryName',
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'categoriesFullPath',
                        width: 400
                    }
                })
            },
            {
                name: 'SourceOrDest',
                label: getText('Origin or Destination'),
                type: 'STRING',
                filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            },
            {
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
            }];
    }
});
