/* global Ext */

Ext.define('Dashboard.manager.historic.InventoriesManager',{
    extend: 'Ext.app.Controller',
    alias: 'inventoriesManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.historic.Inventories',{
	autoLoad: false,
        sorters: [{
                property: 'executionDate',
                direction: 'DESC'
            }]
    }),
    
    loadConfiguration: function(feature){
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[InventoriesManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function(record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[InventoriesManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'MaterialManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[InventoriesManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[InventoriesManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[InventoriesManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[InventoriesManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[InventoriesManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[InventoriesManager.displayInMain] show inventories Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[InventoriesManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
                
        mainController.displayInMain(
            { 
                xtype: 'inventoryMain',
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
                create: false,
                edit: false,
                read: false,
                destroy: false,
                duplicate: false,
                exportToFile: true,
                configViewList: true,
                detailToggle: true
            },

            //Grid
            table: {

                displayRowNumbers: false,

                columns:[
                    {
                        text     : getText('Date'),
                        locked   : true,
                        width    : 150,
                        sortable : true,
                        dataIndex: 'executionDate',
                        formatter: 'date("'+ getText('m/d/Y H:i:s') +'")',
                        cellWrap: false
                    }, {
                        text     : getText('logistic operation'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'logisticOperation',
                        cellWrap: false
                    }, {
                        text     : getText('Criteria 1'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'criteriaKey1',
                        cellWrap: false
                    }, {
                        text     : getText('Value criteria 1'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'criteriaValue1',
                        cellWrap: false
                    }, {
                        text     : getText('Criteria 2'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'criteriaKey2',
                        cellWrap: false
                    }, {
                        text     : getText('Value criteria 2'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'criteriaValue2',
                        cellWrap: false
                    }, {
                        text     : getText('Operator'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'operator',
                        cellWrap: false
                    }, {
                        text     : getText('Expected items'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'expectedMaterialCount',
                        cellWrap: false
                    }, {
                        text     : getText('Expected lot references'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'expectedMaterialSetCount',
                        cellWrap: false
                    },{
                        text     : getText('Present items'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'presentMaterialCount',
                        cellWrap: false
                    }, {
                        text     : getText('Missing items'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'missingMaterialCount',
                        cellWrap: false
                    }, {
                        text     : getText('Foreign items'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'foreignMaterialCount',
                        cellWrap: false
                    }
                ]
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
        
        try{
            Dashboard.model.historic.Profile.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[InventoriesManager.getOne] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.historic.Inventory', response.data);
                    
                    if(model.data.materials){
                        model.data.materials = Ext.decode(model.data.materials);
                    }
                    
                    Dashboard.tool.Utilities.info('[InventoriesManager.getOne] loading success. Profile: '+ model.data.name);
                                        
                    if(action === 'edit'){
                        controller.edit(model);
                    }else if(action === 'displayDetail'){
                        controller.displayDetail(model);
                    } else if (action === 'setInventoryData') {
                        controller.setInventoryData(model);
                    }
                },
                callback: function(record, operation, success) {
                    //nothing
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[InventoriesManager.getOne] error: ' + err);
        }

    },
    
    
    getProperties: function(){
        
        return [
            {
                name: 'executionDate',
                label: getText('Execution date'),
                type: 'DATETIME',
                control:Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'address',
                label: getText('Address'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'operator',
                label: getText('Operator'),
                type: 'STRING'
            }, {
                label: getText('Expected items'),
                name: 'expectedMaterialCount',
                type: 'LONG',
                control:Ext.encode({
                    field: {
                        minValue: 0
                    }
                })
            }, {
                label: getText('Expected lot references'),
                name: 'expectedMaterialSetCount',
                type: 'LONG',
                control:Ext.encode({
                    field: {
                        minValue: 0
                    }
                })
            },{
                label: getText('Present items'),
                name: 'presentMaterialCount',
                type: 'LONG',
                control:Ext.encode({
                    field: {
                        minValue: 0
                    }
                })
            }, {
                label: getText('Missing items'),
                name: 'missingMaterialCount',
                type: 'LONG',
                control:Ext.encode({
                    field: {
                        minValue: 0
                    }
                })
            }, {
                label: getText('Foreign items'),
                name: 'foreignMaterialCount',
                type: 'LONG',
                control:Ext.encode({
                    field: {
                        minValue: 0
                    }
                })
            }, {
                label: getText('Scanned items'),
                name: 'scannedMaterialCount',
                type: 'LONG',
                control:Ext.encode({
                    field: {
                        minValue: 0
                    }
                })
            }, {
                label: getText('Unknown items'),
                name: 'unknownMaterialCount',
                type: 'LONG',
                control:Ext.encode({
                    field: {
                        minValue: 0
                    }
                })
            }, {
                label: getText('logistic operation'),
                name: 'logisticOperation',
                type: 'STRING'
            },{
                label: getText('Criteria 1'),
                name: 'criteriaKey1',
                type: 'STRING'
            },
            {
                label: getText('Value criteria 1'),
                name: 'criteriaValue1',
                type: 'STRING'
            },
            {
                label: getText('Criteria 2'),
                name: 'criteriaKey2',
                type: 'STRING'
            },
            {
                label: getText('Value criteria 2'),
                name: 'criteriaValue2',
                type: 'STRING'
            }
            // {
            //     label: getText('Inventory type'),
            //     name: 'context',
            //     type: 'STRING'
            // }
        ];
    }
    
});