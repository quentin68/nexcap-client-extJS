/* global Ext */

Ext.define('Dashboard.manager.alerts.LocationsAlertsManager', {
    extend: 'Ext.app.Controller',
    alias: 'locationsAlertsManager',
    singleton: true,
    
    requires: ['Dashboard.tool.Utilities'],
    
    store: Ext.create('Dashboard.store.alerts.Locations', {
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
                    Dashboard.tool.Utilities.info('[LocationsAlertsManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[LocationsAlertsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                        
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'LocationsAlertsManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[LocationsAlertsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[LocationsAlertsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[LocationsAlertsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[LocationsAlertsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[LocationsAlertsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[LocationsAlertsManager.displayInMain] show alerts Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[LocationsAlertsManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'currentAlertMain',
            title: getText('Locations alerts', 'title'),
            store: this.store,
            configuration: configuration,
            feature: feature,
            modelProperties: this.getProperties(),
            tag: 'main',
            detailAlias: 'currentAlertLocationDetail'
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
                acknowledged : true,
                exportToFile: true,
                configViewList: true,
                detailToggle: true
            },
            // Grid
            table: {
                displayRowNumbers: false,
                columns: [
                    {
                        text: getText('Creation Date'),
                        locked: true,
                        width: 150,
                        sortable: true,
                        dataIndex: 'startDate',
                        cellWrap: false,
                        renderer: function (val) {
                            return Ext.Date.format(val, getText('m/d/Y H:i:s'));
                        }
                    }, {
                        text: getText('Alert name'),
                        locked: true,
                        width: 300,
                        sortable: true,
                        dataIndex: 'alertConfiguration.name',
                        cellWrap: false
                    }, {
                        text: getText('Alert level'),
                        locked: false,
                        width: 130,
                        sortable: true,
                        dataIndex: 'alertConfiguration.alertLevel',
                        cellWrap: false
                    }, {
                        text: getText('Trigger'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'triggerEventLabel',
                        cellWrap: false
                    }, {
                        text: getText('Is acknowledged'),
                        locked: false,
                        width: 300,
                        sortable: true,
                        dataIndex: 'isAcknowledged',
                        cellWrap: false
                    }, {
                        text: getText('Name'),
                        locked: false,
                        width: 300,
                        sortable: true,
                        dataIndex: 'location.name',
                        cellWrap: false
                    }, {
                        text:  getText('Address'),
                        locked: false,
                        width: 300,
                        sortable: true,
                        dataIndex: 'location.address',
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
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function (id, controller, action) {

        try {
            Dashboard.model.alerts.LocationAlert.load(id, {
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
        alertModel.getProxy().extraParams.description = alertModel.data.description;
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
                label: getText('Alert name'),
                name: 'alertConfiguration.name',
                type: 'STRING'
            }, {
                label: getText('Alert level'),
                name: 'alertConfiguration.alertLevel',
                type: 'ENUM',
                control: Ext.encode({
                    field: {
                        fieldType: 'alertLevel',
                        width: 200
                    }
                })
            }, {
                label: getText('Trigger'),
                name: 'triggerEventLabel',
                type: 'STRING'
            }, {
                name: 'userSticker',
                label: getText('Alert manager'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'users',
                        width: 400
                    }
                })
            }, {
                name: 'startDate',
                label: getText('Creation Date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'isAcknowledged',
                label: getText('Is acknowledged'),
                type: 'BOOLEAN'
            }, {
                name: 'location.name',
                label: getText('Name'),
                type: 'STRING'
            }, {
                name: 'location.address',
                label: getText('Address'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }
        ];
    }

});
