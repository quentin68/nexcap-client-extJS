/* global Ext */

Ext.define('Dashboard.manager.operation.BorrowingsManager',{
    extend: 'Ext.app.Controller',
    alias: 'borrowingsManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.operation.Borrowings',{
        autoLoad: false
    }),
    
    
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[BorrowingsManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[BorrowingsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'BorrowingsManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[BorrowingsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[BorrowingsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[BorrowingsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[BorrowingsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[BorrowingsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[BorrowingsManager.displayInMain] show items inventory feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[BorrowingsManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
                
        mainController.displayInMain(
            { 
                xtype: 'consultationBorrowingsMain',
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
                configViewList: true
            },
                    

            //Grid
            table: {

                displayRowNumbers: true,

                columns:[
                    {
                        text     : getText('Operation date'),
                        locked   : true,
                        width    : 150,
                        sortable : true,
                        dataIndex: 'date',
                        renderer: function (val) {
                            return Ext.Date.format(val, getText('m/d/Y H:i:s'));
                        }
                    },{
                        text     : getText('Operator'),
                        locked   : true,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'userSticker',
                        cellWrap: false
                    },{
                        text     : getText('Item'),
                        locked   : true,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'materialName',
                        cellWrap: false
                    },{
                        text     : getText('Ref. code'),
                        lockable: false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'productReferenceCode'
                    }, {
                        text     : getText('Ref. designation'),
                        lockable: false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'productReferenceDesignation'
                    },{
                        text     : getText('Category'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'productCategoryPath',
                        cellWrap: false
                    },{
                        text     : getText('Source address'),
                        minWidth    : 300,
                        flex:1,
                        sortable : true,
                        dataIndex: 'sourceAddress',
                        cellWrap: false
                    },{
                        dataIndex: 'assignedLocationAddress',
                        text: getText('Assigned location'),
                        locked : false,
                        minWidth : 300,
                        flex: 1,
                        sortable : true,
                        cellWrap: false
                    },{
                        text     : getText('Borrower'),
                        width    : 200,
                        sortable : true,
                        dataIndex: 'actorSticker',
                        cellWrap: false
                    },{
                        text     : getText('Intervention order'),
                        width    : 200,
                        sortable : true,
                        dataIndex: 'interventionOrderNumber'
                    }
                ]
            }
        };
        
        return configuration;
        
    },
            
            

    getOne: function(id, controller, action){
        
        try{
            Dashboard.model.operation.Borrowing.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[BorrowingsManager.getMaterial] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.operation.Borrowing', response.data);
                                        
                    Dashboard.tool.Utilities.info('[BorrowingsManager.getOne] loading success : '+ model.data.name);
                                        
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
            Dashboard.tool.Utilities.error('[BorrowingsManager.getOne] error: ' + err);
        }

    },
            
    
    
    getProperties: function(){
        
        return [
            {
                name: 'date',
                label: getText('Operation date'),
                type: 'DATETIME',
                control:Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'interventionOrderNumber',
                label: getText('Intervention order number'),
                type: 'STRING',
                control:Ext.encode({
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
                        displayField: 'descrption'
                    }
                })
            }, {
                name: 'userSticker',
                label: getText('Operator'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'users',
                        width: 200
                    }
                })
            }, {
                name: 'actorSticker',
                label: getText('Borrower'),
                type: 'STRING'
            }, {
                name: 'sourceAddress',
                label: getText('Source address'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'assignedLocationAddress',
                label: getText('Assigned location'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                label: getText('Category'),
                name: 'productCategoryPath',
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'categoriesFullPath',
                        width: 400
                    }
                })
            },{
                name: 'quantity',
                label: getText('Quantity'),
                type: 'INT'
            }, {
                name: 'useCount',
                label: getText('Uses count'),
                type: 'INT'
            }, {
                name: 'productReferenceCode',
                label: getText('Ref. code'),
                type: 'STRING'
            }, {
                name: 'productReferenceDesignation',
                label: getText('Ref. designation'),
                type: 'STRING'
            }, {
                name: 'identified',
                label: getText('Identified'),
                type : 'BOOLEAN'
            }, {
                name: 'materialName',
                label: getText('Item'),
                type : 'STRING'
            }
        ];
    },
    
    getNotifEmailProperties: function(){
        
        return [
            {
                name: 'date',
                label: getText('Operation date'),
                type: 'DATETIME',
                control:Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'interventionOrderNumber',
                label: getText('Intervention order'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'interventionorders',
                        label: getText('IO number'),
                        width: 400
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
                        width: 400
                    }
                })
            }, {
                name: 'userSticker',
                label: getText('Operator'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'users',
                        width: 200
                    }
                })
            }, {
                name: 'actorSticker',
                label: getText('Borrower'),
                type: 'STRING'
            }, {
                name: 'sourceAddress',
                label: getText('Source address'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }
        ];
    }
    
});