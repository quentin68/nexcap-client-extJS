Ext.define('Dashboard.manager.administration.StocksManager', {
    extend: 'Ext.app.Controller',
    alias: 'stocksManager',
    singleton: true,
    
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'STOCK_ADMIN', 0, false, true, true), 
    

    store: Ext.create('Dashboard.store.administration.Stocks',{
        autoLoad: false
    }),
    
        
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try{
             
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    
                    Dashboard.tool.Utilities.info('[stocksManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[stocksManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'stocksManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[stocksManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[stocksManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[stocksManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[stocksManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[stocksManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    save: function(model, controller, action){
        if(!model){
            throw new Error('[stocksManager.save] model is null or empty!');
        }
        
        delete model.data.id;

        model.save({
            scope:this,
            success: function(record, response) {
                
                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[stocksManager.save] save and read success : name: '+ model.data.name);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
            
                if(action === 'doPostSaveAction'){
                    controller.doPostSaveAction(model);
                }
            },
            failure: function(record, response) {
                }
        }); 
    },
    

    update: function(model, controller, action){
        if(!model){
            throw new Error('[stocksManager.update] model is null or empty!');
        }
        

        
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
    
    /**
     * Delete item by id
     * @param {int} id
     * @param {object} sender (grid, treePanel)
     * @returns {undefined}
     */
    deleteOne: function(id, controller, action){
        if(!id){
            throw new Error('[stocksManager.deleteOne] user is null or empty!');
        }
        
        var model = Ext.create('Dashboard.model.administration.StocksCreate', {
            id:id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('[stocksManager.deleteOne] success: alert deleted');
                
                if(action === 'refresh'){
                    controller.refresh();
                }
            }
        });
    },

    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[stocksManager.displayInMain] show server configuration Management feature');

        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[stocksManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }

        mainController.displayInMain(
            { 
                xtype: 'stocksMain',
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
                read: false,
                destroy: true,
                duplicate: false,
                exportToFile: false,
                configDetail: false
            },
           

            table: {


                columns:[
                    {
                        text     : getText('Category'),
                        flex     : 2,
                        dataIndex: 'productCategoryName'
                    }, 
                      {
                        text     : getText('Safe threshold'),
                        flex     : 1,
                        dataIndex: 'secuLevel'
                    },
                    
                    {
                        text     : getText('Reference'),
                        flex     : 2,
                        dataIndex: 'productReferenceCode',
                        tpl: '{productReferenceCode}<br/><i>{productReferenceDesignation}</i>'
                    }, {
                        text     : getText('Type'),
                        flex     : 1,
                        dataIndex: 'type',
                        sortable: true,
                        getSortParam: function () {
                            return 'identified';
                        }
                    }, {
                        text     : getText('Address'),
                        flex     : 3,
                        dataIndex: 'address'
                    }, {
                        text: getText('Lower threshold'), 
                        dataIndex: 'minLevel', 
                        flex: 1
                    }, {
                        text: getText('Quantity'), 
                        dataIndex: 'quantity', 
                        flex: 1
                    }, {
                        text: getText('Higher threshold'), 
                        dataIndex: 'maxLevel', 
                        flex: 1
                    }, {
                        text: getText('Compliance'),
                        dataIndex: 'levelIsCorrect',
                        flex: 2,
                        renderer: function(val){
                            if (val === true){
                                return getText('Compliant');                               
                            }else{
                                return getText('No Compliant');
                            }
                        }
                    }
                ]
            }

        };
        
        return configuration;
    },
    
    getProperties: function(){
        
        return [
            {
                name: 'productReferenceCode',
                label: getText('Ref. code'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'referencescode',
                        width: 400
                    }
                })
            }, {
                name: 'productCategoryName',
                label: getText('Category'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'categories',
                        width: 400
                    }
                })
            }, 
            {
                name: 'secuLevel',
                label: getText('Safe threshold'),
                type: 'FLOAT',
            },
            
            {
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
                name: 'identified',
                label: getText('Type'),
                type: 'BOOLEAN',
                control:Ext.encode({
                    field: {
                        fieldType: 'referencesIdentified',
                        width: 400
                    }
                })
                //enabledInFilters : false
            }, {
                name: 'minLevel',
                label: getText('Lower threshold'),
                type: 'FLOAT'
            }, { 
                name: 'quantity',
                label: getText('Quantity'),
                type: 'FLOAT'
            }, {
                name: 'maxLevel',
                label: getText('Higher threshold'),
                type: 'FLOAT'
            }, {
                name: 'levelIsCorrect',
                label: getText('Compliance'),
                type: 'BOOLEAN'
            }
        ];
    },

    /**
     * Get one item
     *
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function (id, controller, action) {

        try {
            Dashboard.model.administration.Stocks.load(id, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[StocksManager.getStock] error: loading failure');
                },
                success: function (record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.administration.Stocks', response.data);

                    if (model.data.properties) {
                        Ext.each(model.data.properties, function (property) {
                            property.configuration.control = Ext.decode(property.configuration.control);
                        });
                    }

                    Dashboard.tool.Utilities.info('[StocksManager.getStock] loading success. Stock: ' + model.data.name);

                    if (action === 'setStockData') {
                        controller.setStockData(model);
                    }
                },
                callback: function (record, operation, success) {
                    // nothing
                }
            });
        } catch (err) {
            Dashboard.tool.Utilities.error('[StocksManager.getStocks] error: ' + err);
        }
    }

});
