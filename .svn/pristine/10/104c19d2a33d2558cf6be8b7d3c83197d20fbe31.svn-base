/* global Ext */

Ext.define('Dashboard.manager.historic.ChecksManager', {
    extend : 'Ext.app.Controller',
    alias : 'checksManager',
    singleton : true,

    requires : [ 'Dashboard.tool.Utilities' ],

    store : Ext.create('Dashboard.store.historic.Checks', {
	sorters : [ {
	    property : 'executionDate',
	    direction : 'DESC'
	} ],
	autoLoad : false
    }),


    loadConfiguration : function(feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

	try {

	    Dashboard.model.FeatureConfiguration.load(feature.data.name, {
		scope : this,
		failure : function(record, operation) {
		    Dashboard.tool.Utilities.info('[ChecksManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ChecksManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ChecksManager'); // 6843
                    }
		}
	    });

	} catch (err) {
	    Dashboard.tool.Utilities.error('[ChecksManager.loadConfiguration] error: ' + err);
	}

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ChecksManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ChecksManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ChecksManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ChecksManager.loadConfiguration] error: ' + err);
        }
    },
    

    displayInMain : function(feature) {

	Dashboard.tool.Utilities.info('[ChecksManager.displayInMain] show checks Management feature');
	var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

	var configuration = null;
	try {
	    configuration = feature.data.configuration.data.viewListConfiguration;
	} catch (ex) {
	    Dashboard.tool.Utilities.error('[ChecksManager.displayInMain] configuration error: ' + ex);
	}
	if (!configuration) {
	    configuration = this.getConfiguration();
	}

	mainController.displayInMain({
	    xtype : 'checkMain',
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

		displayRowNumbers : true,

		columns : [ {
		    text : getText('Date of control'),
		    locked : true,
		    width : 150,
		    sortable : true,
		    dataIndex : 'executionDate',
		    cellWrap : false,
                    renderer: function (val) {
                        return Ext.Date.format(val, getText('m/d/Y H:i:s'));
                    }
		}, {
		    text : getText('Compliance'),
		    xtype : 'booleancolumn',
		    trueText : getText('Compliant'),
		    falseText : getText('Non-compliant'),
		    locked : true,
		    width : 100,
		    sortable : true,
		    dataIndex : 'isRight',
		    cellWrap : false
		}, {
		    text : getText('Operator'),
		    locked : true,
		    flex : 1,
		    sortable : true,
		    dataIndex : 'operator',
		    cellWrap : false
		}, {
		    text : getText('Ref. Code'),
		    locked : false,
		    dataIndex : 'productReferenceCode',
		    flex : 2
		}, {
		    text : getText('Ref. Designation'),
		    locked : false,
		    dataIndex : 'productReferenceDesignation',
		    flex : 2
		}, {
		    text : getText('Item'),
		    locked : false,
		    dataIndex : 'materialName',
		    flex : 1
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
	    Dashboard.model.historic.Profile.load(id, {
		scope : this,
		failure : function(record, operation) {
		    Dashboard.tool.Utilities.info('[ChecksManager.getOne] error: loading failure');
		},
		success : function(record, operation) {

		    var response = Ext.decode(operation._response.responseText);
		    var model = Ext.create('Dashboard.model.historic.Check', response.data);

		    Dashboard.tool.Utilities.info('[ChecksManager.getOne] loading success. Profile: ' + model.data.name);

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
	    Dashboard.tool.Utilities.error('[ChecksManager.getOne] error: ' + err);
	}

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
    getReport : function(id, controller, action) {

	try {
	    Dashboard.model.settings.SpecificCheckReport.load(id, {
		scope : this,
		failure : function(record, operation) {
		    Dashboard.tool.Utilities.info('[ChecksManager.getReport] error: loading failure');
		},
		success : function(record, operation) {

		    var response = Ext.decode(operation._response.responseText);
		    var model = Ext.create('Dashboard.model.settings.SpecificCheckReport', response.data);

		    Dashboard.tool.Utilities.info('[ChecksManager.getReport] loading success. Profile: ' + model.data.name);

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
	    Dashboard.tool.Utilities.error('[ChecksManager.getOne] error: ' + err);
	}

    },

    getProperties : function() {

	return [ 
        {
	    name : 'name',
	    label : getText('Control name'),
	    type : 'STRING'
	}, {
	    name : 'operator',
	    label : getText('Operator'),
	    type : 'STRING'
	}, {
	    name : 'materialName',
	    label : getText('Item'),
	    type : 'STRING'
	}, {
	    label : getText('Compliance'),
	    name : 'isRight',
	    type : 'BOOLEAN'
	}, {
	    label : getText('Date of control'),
	    name : 'executionDate',
	    type : 'DATETIME',
            control: Ext.encode({
                field: {
                    fieldType: 'datesrange'
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
	}, {
	    label : getText('Category'),
	    name : 'productCategoryName',
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
	} 
    ];
    }

});