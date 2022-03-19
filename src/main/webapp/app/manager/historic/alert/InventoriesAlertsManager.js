/* global Ext  */

Ext.define('Dashboard.manager.historic.alert.InventoriesAlertsManager', {
    extend: 'Ext.app.Controller',
    alias: 'histoInventoriesAlertsManager',
    singleton: true,

    requires: ['Dashboard.tool.Utilities'],

    store: Ext.create('Dashboard.store.historic.alerts.Inventories', {
        sorters: [{
                property: 'startDate',
                direction: 'DESC'
            }],
        autoLoad: false
    }),

    // feature: Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_ALERTS', 0, false, true, true),

    loadConfiguration: function (feature){

        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation){
                    Dashboard.tool.Utilities.info('[InventoriesAlertsManager.loadConfiguration] error: loading failure');
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

                        Dashboard.tool.Utilities.info('[InventoriesAlertsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'InventoriesAlertsManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[InventoriesAlertsManager.loadConfiguration] error: ' + err);
        }

    },

    loadUserConfiguration: function (feature){

        try {

            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;

            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function (record, operation){
                    Dashboard.tool.Utilities.info('[InventoriesAlertsManager.loadUserConfiguration] error: loading failure');
                    delete feature.data.userConfiguration;
                    this.displayInMain(feature);
                },
                success: function (record, operation){
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data.value);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response';
                        }

                        var configuration = Ext.create('Dashboard.model.UserConfiguration', jsonData);
                        feature.data.userConfiguration = configuration;

                        Dashboard.tool.Utilities.info('[InventoriesAlertsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);

                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[InventoriesAlertsManager.loadUserConfiguration] loading error: ' + ex);
                    }

                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[InventoriesAlertsManager.loadConfiguration] error: ' + err);
        }
    },

    displayInMain: function (feature){

        Dashboard.tool.Utilities.info('[InventoriesAlertsManager.displayInMain] show alerts Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[InventoriesAlertsManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'historicAlertMain',
            title: getText('Inventories alerts', 'title'),
            store: this.store,
            configuration: configuration,
            feature: feature,
            modelProperties: this.getProperties(),
            tag: 'main',
            detailAlias: 'historicInventoryAlertDetail'
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
                configViewList: true,
                detailToggle: true
            },

            // Grid
            table: {

                displayRowNumbers: false,

                columns: [
                    {
                        text: getText('Alert'),
                        locked: true,
                        width: 300,
                        sortable: true,
                        dataIndex: 'alertConfigurationName',
                        cellWrap: false
                    }, {
                        text: getText('Creation date'),
                        locked: false,
                        width: 150,
                        sortable: true,
                        dataIndex: 'startDate',
                        formatter: 'date("' + getText('m/d/Y H:i:s') + '")',
                        cellWrap: false
                    }, {
                        text: getText('Resolution date'),
                        locked: false,
                        width: 150,
                        sortable: true,
                        dataIndex: 'endDate',
                        formatter: 'date("' + getText('m/d/Y H:i:s') + '")',
                        cellWrap: false
                    }, {
                        text: getText('Acknowledgment date'),
                        locked: false,
                        width: 150,
                        sortable: true,
                        dataIndex: 'acknowledgmentDate',
                        formatter: 'date("' + getText('m/d/Y H:i:s') + '")',
                        cellWrap: false
                    }, {
                        text: getText('Source address'),
                        locked: false,
                        width: 300,
                        sortable: true,
                        dataIndex: 'sourceAddress',
                        cellWrap: false
                    }, {
                        text: getText('Operator'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'userSticker',
                        cellWrap: false
                    }
                ]
            }

        };

        return configuration;
    },

    /**
     * Get one item
     * 
     * @param {type}
     *                id
     * @param {type}
     *                controller
     * @param {type}
     *                action
     * @returns {undefined}
     */
    getOne: function (id, controller, action){

        try {
            Dashboard.model.historic.alerts.InventoryAlert.load(id, {
                scope: this,
                failure: function (record, operation){
                    Dashboard.tool.Utilities.info('[InventoriesAlertsManager.getOne] error: loading failure');
                },
                success: function (record, operation){

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.alerts.InventoryAlert', response.data);

                    Dashboard.tool.Utilities.info('[InventoriesAlertsManager.getOne] loading success. Profile: ' + model.data.name);

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
            Dashboard.tool.Utilities.error('[InventoriesAlertsManager.getOne] error: ' + err);
        }

    },

    getProperties: function (){

        return [{
                name: 'startDate',
                label: getText('Creation date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'endDate',
                label: getText('Resolution date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'acknowledgmentDate',
                label: getText('Acknowledgment date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            },
            // {
            // name: 'sourceLocation',
            // label: getText('Source location'),
            // type: 'STRING',
            // control:Ext.encode({
            // field: {
            // fieldType: 'address',
            // width: 400
            // }
            // })
            // },
            {
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
                name: 'userSticker',
                label: getText('Operator'),
                type: 'STRING'
            },  {
                name: 'isAcknowledged',
                label: getText('Is acknowledged'),
                type: 'BOOLEAN'
            }, {
                name: 'inventoryContext',
                label: getText('Inventory type'),
                type: 'STRING'
            }, {
                name: 'inventoryReference',
                label: getText('Criteria'),
                type: 'STRING'
            }, {
                name: 'inventoryComments',
                label: getText('Comments'),
                type: 'STRING'
            }, {
                name: 'inventoryAddress',
                label: getText('Inventory address'),
                type: 'STRING'
            }
        ];
    }

});