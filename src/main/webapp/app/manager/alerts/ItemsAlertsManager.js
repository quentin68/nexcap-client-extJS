/* global Ext */
//old
Ext.define('Dashboard.manager.alerts.ItemsAlertsManager', {
    extend: 'Ext.app.Controller',
    alias: 'currentAlertsManager',
    singleton: true,
    
    requires: ['Dashboard.tool.Utilities'],
    
    store: Ext.create('Dashboard.store.alerts.ItemsAlerts', {
        autoLoad: false,
        leadingBufferZone: 300,
        pageSize: 100
    }),
    
    loadConfiguration: function (feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[ItemsAlertsManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function (record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[ItemsAlertsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                        
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ItemsAlertsManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ItemsAlertsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ItemsAlertsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ItemsAlertsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ItemsAlertsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ItemsAlertsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[CurrentAlertsManager.displayInMain] show alerts Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[CurrentAlertsManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'currentAlertMain',
            store: this.store,
            configuration: configuration,
            feature: feature,
            tag: 'main'
        });
    },
    
    
    getConfiguration: function () {

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
            // Grid
            table: {
                displayRowNumbers: false,
                columns: [{
                        text: getText('Alert'),
                        locked: true,
                        width: 300,
                        sortable: true,
                        dataIndex: 'controlName',
                        cellWrap: false
                    }, {
                        text: getText('Alert level'),
                        locked: false,
                        width: 130,
                        sortable: true,
                        dataIndex: 'alertLevel',
                        cellWrap: false
                    }, {
                        text: getText('Operation'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'operationName',
                        cellWrap: false
                    }, {
                        text: getText('Current address'),
                        locked: false,
                        width: 300,
                        sortable: true,
                        dataIndex: 'address',
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
                        width: 200,
                        sortable: true,
                        dataIndex: 'productReferenceCode',
                        cellWrap: false
                    }, {
                        text: getText('Ref. designation'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productReferenceDesignation',
                        cellWrap: false
                    }, {
                        text: getText('Category'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productCategoryPath',
                        cellWrap: false
                    }, {
                        text: getText('User'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'userSticker',
                        cellWrap: false
                    }, {
                        text: getText('Date'),
                        locked: true,
                        width: 150,
                        sortable: true,
                        dataIndex: 'startDate',
                        //formatter: 'date("' + getText('m/d/Y H:i:s') + '")',
                        cellWrap: false,
                        renderer: function (val) {
                            return Ext.Date.format(val, getText('m/d/Y H:i:s'));
                        }
                    }
                ]
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
    getOne: function (id, controller, action) {

        try {
            Dashboard.model.alerts.ItemAlert.load(id, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[CurrentAlertsManager.getOne] error: loading failure');
                },
                success: function (record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.alerts.Alert', response.data);

                    if (model.data.materials) {
                        model.data.materials = Ext.decode(model.data.materials);
                    }

                    Dashboard.tool.Utilities.info('[CurrentAlertsManager.getOne] loading success. Profile: ' + model.data.name);

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
            Dashboard.tool.Utilities.error('[CurrentAlertsManager.getOne] error: ' + err);
        }

    },

    acknowledgeAlert : function(alertModel, controller, action) {

        try {
            if (!alertModel) {
                throw new Error('[AlertsManager.acknowledgeAlert] model is null or empty!');
            }

            // call alerts/operations/acknowledge/{alertId}
            alertModel.getProxy().api.update = Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/acknowledge/';
            alertModel.save({
                scope : this,
                success : function(record, response) {
                    controller.refresh();
                    Ext.Msg.alert(getText('Info'), getText('Alerte acquittée !'));
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[AlertsManager.acknowledgeAlert] error: ' + err);
        }

    },


    getProperties: function () {

        return [
            {
                name: 'startDate',
                label: getText('Date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'address',
                label: getText('Current address'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'userSticker',
                label: getText('User identifier'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'users',
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
                            category: 'productCategoryPath'
                        }
                    }
                })
            }, {
                label: getText('Alert'),
                name: 'controlName',
                type: 'STRING'
            }, {
                label: getText('Operation'),
                name: 'operationName',
                type: 'STRING'
            }, {
                name: 'materialName',
                label: getText('Item'),
                type: 'STRING'
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
            }, {
                name: 'productReferenceCode',
                label: getText('Ref. code'),
                type: 'STRING'
            }, {
                name: 'productReferenceDesignation',
                label: getText('Ref. designation'),
                type: 'STRING'
            }, {
                label: getText('Alert level'),
                name: 'alertLevel',
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'alertLevel',
                        width: 200
                    }
                })
            }
        ];
    }

});
