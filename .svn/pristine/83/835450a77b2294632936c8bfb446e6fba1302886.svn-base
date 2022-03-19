/* global Ext */

Ext.define('Dashboard.manager.alerts.UsersAlertsManager', {
    extend: 'Ext.app.Controller',
    alias: 'usersAlertsManager',
    singleton: true,
    
    requires: ['Dashboard.tool.Utilities'],
    
    store: Ext.create('Dashboard.store.alerts.Users', {
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
                    Dashboard.tool.Utilities.info('[UsersAlertsManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[UsersAlertsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                        
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'UsersAlertsManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[UsersAlertsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[UsersAlertsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[UsersAlertsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[UsersAlertsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[UsersAlertsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[UsersAlertsManager.displayInMain] show alerts Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[UsersAlertsManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'currentAlertMain',
            title: getText('Users alerts', 'title'),
            store: this.store,
            configuration: configuration,
            feature: feature,
            modelProperties: this.getProperties(),
            tag: 'main',
            detailAlias: 'currentAlertUserDetail'
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
                        text: getText('Alert'),
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
                        text: getText('User'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'userSticker',
                        cellWrap: false
                    }, {
                        text: getText('Is acknowledged'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'isAcknowledged',
                        cellWrap: false
                    },  {
                        text: getText('Login'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'user.login',
                        cellWrap: false
                    }, {
                        text: getText('First name'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'user.firstName',
                        cellWrap: false
                    }, {
                        text: getText('Last name'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'user.lastName',
                        cellWrap: false
                    }, {
                        text: getText('Badge number'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'user.badgeNumber',
                        cellWrap: false
                    }, {
                        text: getText('Email'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'user.email',
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
            Dashboard.model.alerts.UserAlert.load(id, {
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
                name: 'user.login',
                label: getText('Login'),
                type: 'STRING'
            }, {
                name: 'user.firstName',
                label: getText('First name'),
                type: 'STRING'
            }, {
                name: 'user.lastName',
                label: getText('Last name'),
                type: 'STRING'
            }, {
                name: 'user.badgeNumber',
                label: getText('Badge number'),
                type: 'STRING'
            }, {
                name: 'user.email',
                label: getText('Email'),
                type: 'STRING'
            }
        ];
    }

});
