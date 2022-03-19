/* global Ext  */
//old
Ext.define('Dashboard.manager.historic.AlertsManager', {
    extend : 'Ext.app.Controller',
    alias : 'alertsManager',
    singleton : true,

    requires : [ 'Dashboard.tool.Utilities' ],

    store : Ext.create('Dashboard.store.historic.OperationsAlerts', {
	sorters : [ {
	    property : 'startDate',
	    direction : 'DESC'
	} ],
	autoLoad : false
    }),

    // feature: Ext.create('Dashboard.store.Features').findRecord('name', 'HISTO_ALERTS', 0, false, true, true),

    loadConfiguration : function(feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

	try {

	    Dashboard.model.FeatureConfiguration.load(feature.data.name, {
		scope : this,
		failure : function(record, operation) {
		    Dashboard.tool.Utilities.info('[AlertsManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
		    this.loadUserConfiguration(feature);
		},
		success : function(record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        // mantis : 6843
                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[AlertsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'AlertsManager'); // 6843
                    }
		}
	    });

	} catch (err) {
	    Dashboard.tool.Utilities.error('[AlertsManager.loadConfiguration] error: ' + err);
	}

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[AlertsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[AlertsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[AlertsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[AlertsManager.loadConfiguration] error: ' + err);
        }
    },
    

    displayInMain : function(feature) {

	Dashboard.tool.Utilities.info('[AlertsManager.displayInMain] show alerts Management feature');
	var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

	var configuration = null;
	try {
	    configuration = feature.data.configuration.data.viewListConfiguration;
	} catch (ex) {
	    Dashboard.tool.Utilities.error('[AlertsManager.displayInMain] configuration error: ' + ex);
	}
	if (!configuration) {
	    configuration = this.getConfiguration();
	}

	mainController.displayInMain({
	    xtype : 'historicAlertMain',
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
                configViewList: true,
                detailToggle: true
            },

	    // Grid
	    table : {

		displayRowNumbers : false,

		columns : [ {
		    text : getText('Alert'),
		    locked : true,
		    width : 300,
		    sortable : true,
		    dataIndex : 'controlName',
		    cellWrap : false
		}, {
		    text : getText('Creation date'),
		    locked : false,
		    width : 150,
		    sortable : true,
		    dataIndex : 'startDate',
		    formatter : 'date("' + getText('m/d/Y H:i:s') + '")',
		    cellWrap : false
		}, {
		    text : getText('Resolution date'),
		    locked : false,
		    width : 150,
		    sortable : true,
		    dataIndex : 'endDate',
		    formatter : 'date("' + getText('m/d/Y H:i:s') + '")',
		    cellWrap : false
		}, {
		    text : getText('Acknowledgment date'),
		    locked : false,
		    width : 150,
		    sortable : true,
		    dataIndex : 'acknowledgmentDate',
		    formatter : 'date("' + getText('m/d/Y H:i:s') + '")',
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
		    dataIndex : 'productCategoryName',
		    cellWrap : false
		}, {
		    text : getText('Operator'),
		    locked : false,
		    width : 200,
		    sortable : true,
		    dataIndex : 'userSticker',
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
	    Dashboard.model.alerts.OperationHistoryAlert.load(id, {
		scope : this,
		failure : function(record, operation) {
		    Dashboard.tool.Utilities.info('[AlertsManager.getOne] error: loading failure');
		},
		success : function(record, operation) {

		    var response = Ext.decode(operation._response.responseText);
		    var model = Ext.create('Dashboard.model.alerts.Alert', response.data);

		    Dashboard.tool.Utilities.info('[AlertsManager.getOne] loading success. Profile: ' + model.data.name);

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
	    Dashboard.tool.Utilities.error('[AlertsManager.getOne] error: ' + err);
	}

    },

    getProperties : function() {

	return [ {
	    name : 'startDate',
	    label : getText('Creation date'),
	    type : 'DATETIME',
	    control : Ext.encode({
		field : {
		    fieldType : 'datesrange'
		}
	    })
	}, {
	    name : 'endDate',
	    label : getText('Resolution date'),
	    type : 'DATETIME',
	    control : Ext.encode({
		field : {
		    fieldType : 'datesrange'
		}
	    })
	}, {
	    name : 'acknowledgmentDate',
	    label : getText('Acknowledgment date'),
	    type : 'DATETIME',
	    control : Ext.encode({
		field : {
		    fieldType : 'datesrange'
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
			category : 'productCategoryName'
		    }
		}
	    })
	}, {
	    name : 'materialName',
	    label : getText('Item'),
	    type : 'STRING'
	}, {
	    name : 'productReferenceCode',
	    label : getText('Ref. code'),
	    type : 'STRING'
	}, {
	    name : 'productReferenceDesignation',
	    label : getText('Ref. designation'),
	    type : 'STRING'
	}, {
	    label : getText('Category'),
	    name : 'productCategoryName',
	    type : 'STRING'
	}, {
	    label : getText('Alert'),
	    name : 'controlName',
	    type : 'STRING',
            control: Ext.encode({
                field: {
                    fieldType: 'alertName',
                    width: 400
                }
            })
	}, {
	    label : getText('Operation'),
	    name : 'operationName',
	    type : 'STRING'
	} ];
    }

});