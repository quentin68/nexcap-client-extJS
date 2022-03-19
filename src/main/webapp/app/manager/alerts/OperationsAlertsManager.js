/* global Ext */
//old
Ext.define('Dashboard.manager.alerts.OperationsAlertsManager', {
    extend : 'Ext.app.Controller',
    alias : 'operationsAlertsManager',
    singleton : true,
    
    requires : [ 'Dashboard.tool.Utilities' ],
    
    store : Ext.create('Dashboard.store.alerts.OperationsAlerts', {

	autoLoad : false,
	leadingBufferZone : 300,
	pageSize : 100
    }),
    
    loadConfiguration : function(feature) {

        feature.data.enabledTools = this.getConfiguration().enabledTools;

	try {

	    Dashboard.model.FeatureConfiguration.load(feature.data.name, {
		scope : this,
		failure : function(record, operation) {
		    Dashboard.tool.Utilities.info('[OperationsAlertsManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
		    this.loadUserConfiguration(feature);
		},
		success : function(record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;

                        Dashboard.tool.Utilities.info('[OperationsAlertsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'OperationsAlertsManager'); // 6843
                    }
		}
	    });

	} catch (err) {
	    Dashboard.tool.Utilities.error('[OperationsAlertsManager.loadConfiguration] error: ' + err);
	}

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[OperationsAlertsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[OperationsAlertsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[OperationsAlertsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[OperationsAlertsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain : function(feature) {

	Dashboard.tool.Utilities.info('[OperationsAlertsManager.displayInMain] show alerts Management feature');
	var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

	var configuration = null;
	try {
	    configuration = feature.data.configuration.data.viewListConfiguration;
	} catch (ex) {
	    Dashboard.tool.Utilities.error('[OperationsAlertsManager.displayInMain] configuration error: ' + ex);
	}
	if (!configuration) {
	    configuration = this.getConfiguration();
	}

	// this.store.getProxy().extraParams.filter.push({
	// 'property': 'raisedByOnGoingOp',
	// 'value': true,
	// 'type': 'BOOLEAN',
	// 'comparison': 'EQ'
	// });

	mainController.displayInMain({
	    xtype : 'operationAlertMain',
	    store : this.store,
	    configuration : configuration,
	    feature : feature,
	    tag : 'main'
	});
    },
    getConfiguration : function() {
        

	var configuration = {
	    enabledTools : {
		create : false,
		edit : false,
		read : false,
		destroy : false,
		duplicate : false,
		exportToFile : true,
		acknowledged : true,
                configViewList: true,
                detailToggle: true
	    },
	    // Grid
	    table : {
		displayRowNumbers : true,
		columns : [ {
		    text : getText('Alert'),
		    locked : true,
		    width : 300,
		    sortable : true,
		    dataIndex : 'controlName',
		    cellWrap : false
		}, {
		    text : getText('Alert level'),
		    locked : false,
		    width : 130,
		    sortable : true,
		    dataIndex : 'alertLevel',
		    cellWrap : false
		}, {
		    text : getText('Operation'),
		    locked : false,
		    width : 200,
		    sortable : true,
		    dataIndex : 'operationName',
		    cellWrap : false
		}, {
		    text : getText('Source address'),
		    locked : false,
		    width : 300,
		    sortable : true,
		    dataIndex : 'sourceAddress',
		    cellWrap : false
		}, {
		    text : getText('Item'),
		    locked : false,
		    width : 200,
		    sortable : true,
		    dataIndex : 'materialName',
		    cellWrap : false
		}, {
		    text : getText('Ref. code'),
		    locked : false,
		    width : 200,
		    sortable : true,
		    dataIndex : 'productReferenceCode',
		    cellWrap : false
		}, {
		    text : getText('Ref. designation'),
		    locked : false,
		    width : 200,
		    sortable : true,
		    dataIndex : 'productReferenceDesignation',
		    cellWrap : false
		}, {
		    text : getText('Category'),
		    locked : false,
		    width : 200,
		    sortable : true,
		    dataIndex : 'productCategoryPath',
		    cellWrap : false
		}, {
		    text : getText('Operator'),
		    locked : false,
		    width : 200,
		    sortable : true,
		    dataIndex : 'userSticker',
		    cellWrap : false
		}, {
		    text : getText('Date'),
		    locked : true,
		    width : 150,
		    sortable : true,
		    dataIndex : 'startDate',
		    //formatter : 'date("' + getText('m/d/Y H:i:s') + '")',
		    cellWrap : false,
                    renderer: function (val) {
                        return Ext.Date.format(val, getText('m/d/Y H:i:s'));
                    }
		}, {
		    text : getText('Acknowledged'),
		    locked : true,
		    width : 100,
		    sortable : true,
		    dataIndex : 'isAcknowledged',
		    cellWrap : false
		} ]
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
    getOne : function(id, controller, action) {

	try {
	    Dashboard.model.alerts.OperationAlert.load(id, {
		scope : this,
		failure : function(record, operation) {
		    Dashboard.tool.Utilities.info('[OperationsAlertsManager.getOne] error: loading failure');
		},
		success : function(record, operation) {

		    var response = Ext.decode(operation._response.responseText);
		    var model = Ext.create('Dashboard.model.alerts.Alert', response.data);

		    if (model.data.materials) {
			model.data.materials = Ext.decode(model.data.materials);
		    }

		    Dashboard.tool.Utilities.info('[OperationsAlertsManager.getOne] loading success. Profile: ' + model.data.name);

		    if (action === 'edit') {
			controller.edit(model);
		    } else if (action === 'displayDetail') {
			controller.displayDetail(model);
		    }
		},
		callback : function(record, operation, success) {
		    // nothing
		}
	    });

	} catch (err) {
	    Dashboard.tool.Utilities.error('[OperationsAlertsManager.getOne] error: ' + err);
	}

    },
    
    acknowledgeAlert : function(alertModel, controller, action) {

	try {
	    if (!alertModel) {
		throw new Error('[OperationsAlertsManager.acknowledgeAlert] model is null or empty!');
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
	    Dashboard.tool.Utilities.error('[OperationsAlertsManager.acknowledgeAlert] error: ' + err);
	}

    },
    
    update : function(model, controller, action) {
	if (!model) {
	    throw new Error('[UserManager.update] model is null or empty!');
	}

	model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

	model.save({
	    scope : this,
	    success : function(record, response) {

		Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

		if (action === 'refresh') {
		    controller.refresh();
		}
	    }
	});
    },
    getProperties : function() {

	return [ {
	    name : 'startDate',
	    label : getText('Date'),
	    type : 'DATETIME',
	    control : Ext.encode({
		field : {
		    fieldType : 'datesrange'
		}
	    })
	}, {
	    name : 'sourceAddress',
	    label : getText('Source address'),
	    type : 'STRING',
	    control : Ext.encode({
		field : {
		    fieldType : 'address',
		    width : 400
		}
	    })
	}, {
	    name : 'userSticker',
	    label : getText('Operator'),
	    type : 'STRING'
	}, {
	    name : 'comboItemRefCat',
	    label : getText('Combo Item - Reference - Category'),
	    type : 'STRING',
	    filterOnly : true,
	    control : Ext.encode({
		field : {
		    fieldType : 'comboitemrefcat',
		    width : 400,
		    mapProperties : {
			material : 'materialName',
			productReferenceCode : 'productReferenceCode',
			productReferenceDesignation : 'productReferenceDesignation',
			category : 'productCategoryPath'
		    }
		}
	    })
	}, {
	    label : getText('Alert'),
	    name : 'controlName',
	    type : 'STRING'
	}, {
	    label : getText('Operation'),
	    name : 'operationName',
	    type : 'STRING'
	}, {
	    name : 'materialName',
	    label : getText('Item'),
	    type : 'STRING'
	}, {
	    label : getText('Category'),
	    name : 'productCategoryPath',
	    type : 'STRING',
		control: Ext.encode({
			field: {
				fieldType: 'categoriesFullPath',
				width: 400
			}
		})
	}, {
	    name : 'productReferenceCode',
	    label : getText('Ref. code'),
	    type : 'STRING'
	}, {
	    name : 'productReferenceDesignation',
	    label : getText('Ref. designation'),
	    type : 'STRING'
	} , {
            label : getText('Acknowledged'),
	    name : 'isAcknowledged',
	    type : 'BOOLEAN'
	}, {
                label: getText('Alert level'),
                name: 'alertLevel',
                type: 'INT',
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
