/* global Ext */

Ext.define('Dashboard.manager.operation.ReceivingsManager', {
    extend: 'Ext.app.Controller',
    alias: 'receivingsManager',
    singleton: true,

    requires: [
        'Dashboard.tool.Utilities'
    ],

    store: Ext.create('Dashboard.store.operation.Receivings', {
        autoLoad: false
    }),

    loadConfiguration: function (feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation){
                    Dashboard.tool.Utilities.info('[ReceivingsManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ReceivingsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ReceivingsManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ReceivingsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ReceivingsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ReceivingsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ReceivingsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ReceivingsManager.loadConfiguration] error: ' + err);
        }
    },
    

    displayInMain: function (feature){

        Dashboard.tool.Utilities.info('[ReceivingsManager.displayInMain] show receivings feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[ReceivingsManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain(
                {
                    xtype: 'operationReceivingsMain',
                    store: this.store,
                    configuration: configuration,
                    feature: feature,
                    tag: 'main'
                }
        );
    },

    getConfiguration: function (){

        var configuration = {

            enabledTools: {
                create: true,
                edit: false,
                read: false,
                destroy: false,
                duplicate: false,
                exportToFile: true
            },

            //Grid
            table: {

                displayRowNumbers: true,

                columns: [
                    {
                        text: getText('Operation date'),
                        locked: true,
                        width: 150,
                        sortable: true,
                        formatter: 'date("' + getText('m/d/Y H:i:s') + '")',
                        dataIndex: 'operationDate'
                    }, {
                        text: getText('Quantity'),
                        locked: true,
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
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productCategoryName',
                        cellWrap: false
                    }, {
                        text: getText('Operator'),
                        locked: true,
                        width: 200,
                        sortable: true,
                        dataIndex: 'userName',
                        cellWrap: false
                    }, {
                        text: getText('Destination Address'),
                        minWidth: 300,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'destinationAddress',
                        cellWrap: false
                    }
                ],

                extendedProperties: {
                    properties: [
                        {
                            property: 'productReferenceCode',
                            label: getText('Ref. code'),
                            style: 'color:black;'
                        }, {
                            property: 'productReferenceDesignation',
                            label: getText('Ref. designation'),
                            style: 'color:black;'
                        }, {
                            property: 'destinationAddress',
                            label: getText('Destination Address'),
                            style: 'color:black;'
                        }, {
                            property: 'quantity',
                            label: getText('Quantity'),
                            style: 'color:black;'
                        }
                    ]
                }
            }
        };

        return configuration;

    },

    getOne: function (id, controller, action){

        try {
            Dashboard.model.operation.Receiving.load(id, {
                scope: this,
                failure: function (record, operation){
                    Dashboard.tool.Utilities.info('[ReceivingsManager.getOne] error: loading failure');
                },
                success: function (record, operation){

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.operation.Receiving', response.data);

                    Dashboard.tool.Utilities.info('[ReceivingsManager.getOne] loading success : ' + model.data.name);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    }
                },
                callback: function (record, operation, success){
                    //nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ReceivingsManager.getOne] error: ' + err);
        }

    },

    save: function (data, controller, action){
        if (!data) {
            throw new Error('[ReceivingsManager.save] data is null or empty!');
        }

        var model = Ext.create('Dashboard.model.operation.Receiving');
        
        var date = moment();
        model.data = data;
        model.data.operationDate = date.toDate();

        model.save({
            scope: this,
            failure: function (record, operation) {
                Dashboard.tool.Utilities.info('[ReceivingsManager.save] failure');
                Dashboard.engine.ResponseManager.showFailure(getText('Failed'));
            },
            success: function (record, response){

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[ReceivingsManager.save] save and read success : receiving: ' + model.data.id);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model);
                }
            }
        });
    },
    
    saveMaterialsSet: function(data, controller, action){
        if (!data) {
            throw new Error('[ReceivingsManager.save] data is null or empty!');
        }

        var model = Ext.create('Dashboard.model.operation.ReceivingMaterialsSet');
                
        var date = moment();
        model.data = data;
        model.data.operationDate = date.toDate();

        model.save({
            scope: this,
            failure: function (record, operation) {
                Dashboard.tool.Utilities.info('[ReceivingsManager.saveMaterialsSet] failure');
                Dashboard.engine.ResponseManager.showFailure(getText('Failed'));
            },
            success: function (record, response){

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[ReceivingsManager.save] save and read success : receiving: ' + model.data.id);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model);
                }
            }
        });
    },
    
    saveMaterialsList: function (data, controller, action){
        if (!data) {
            throw new Error('[ReceivingsManager.saveList] data is null or empty!');
        }
                
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/operations/receive/list',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(data),
            scope: this,
            success: function(response) {
                Dashboard.engine.ResponseManager.showSuccess(response);
                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction();
                }
            },
            failure: function(response) {
                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
            }
        });  

    },
    
    saveMaterialsSetsList: function(data, controller, action){
        if (!data) {
            throw new Error('[ReceivingsManager.save] data is null or empty!');
        }

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/operations/receive/materialsets/list',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(data),
            scope: this,
            success: function(response) {
                Dashboard.engine.ResponseManager.showSuccess(response);
                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction();
                }
            },
            failure: function(response) {
                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
            }
        });  
    },
    

    getProperties: function (){

        return [
            {
                name: 'operationDate',
                label: getText('Operation date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
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
                name: 'userName',
                label: getText('Operator'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'users',
                        width: 200
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
                name: 'quantity',
                label: getText('Quantity'),
                type: 'LONG'
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
            }
        ];
    }

});