Ext.define('Dashboard.manager.settings.alert.UsersAlertsConfigManager', {
    extend: 'Ext.app.Controller',
    alias: 'usersAlertsConfigManager',
    singleton: true,
    
    isAdmin: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
        
    feature: null,
    

store: Ext.create('Dashboard.store.settings.AlertsConfiguration', {
        autoLoad: false,
        sorters: [
            {
                property: 'name',
                direction: 'ASC'
            }
        ],
        listeners: {
            scope: this,
            beforeLoad: function (store, operation, eOpts){

                if (!store.getProxy().extraParams.filter) {
                    store.getProxy().extraParams.filter = [];
                }

                var myFilter = {
                    property: 'alertType',
                    value: 'USER',
                    type: 'ENUM',
                    comparison: 'EQ'
                };

                if (!store.getProxy().extraParams.filter) {
                    store.getProxy().extraParams.filter = [];
                }

                store.getProxy().extraParams.filter.push(myFilter);

            },
            load: function (store, records, successful, operation, eOpts){
                if (store.getProxy().extraParams.filter) {
                    store.getProxy().extraParams.filter = [];
                }
            }
        }
    }),
    
        
    loadConfiguration: function(feature, isAdmin){
                
        if (isAdmin === undefined || isAdmin === null) {
            isAdmin = true;
        }
        Dashboard.manager.settings.alert.UsersAlertsConfigManager.isAdmin = isAdmin;
        
        //feature = Dashboard.manager.MainMenuManager.currentFeature;
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try{
             
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    
                    Dashboard.tool.Utilities.info('[UsersAlertsConfigManager.loadConfiguration] error: loading failure');
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
                        Dashboard.tool.Utilities.info('[UsersAlertsConfigManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'UsersAlertsConfigManager'); // 6843
                    }   
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[UsersAlertsConfigManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[UsersAlertsConfigManager.loadUserConfiguration] error: loading failure');
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
                        Dashboard.tool.Utilities.info('[UsersAlertsConfigManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[UsersAlertsConfigManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[UsersAlertsConfigManager.loadConfiguration] error: ' + err);
        }
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
            Dashboard.model.settings.AlertsConfig.load(id, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[UsersAlertsConfigManager.getOne] error: loading failure');
                },
                success: function (record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.alerts.Alert', response.data);

                    if (model.data.materials) {
                        model.data.materials = Ext.decode(model.data.materials);
                    }

                    Dashboard.tool.Utilities.info('[UsersAlertsConfigManager.getOne] loading success. Profile: ' + model.data.name);

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
            Dashboard.tool.Utilities.error('[UsersAlertsConfigManager.getOne] error: ' + err);
        }

    },
    
    
  save: function(model, controller, action){
        if(!model){
            throw new Error('[UsersAlertsConfigManager.save] model is null or empty!');
        }
        
        delete model.data.id;

        model.save({
            scope:this,
            success: function(record, response) {
                
                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[UsersAlertsConfigManager.save] save and read success : name: '+ model.data.name);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
            
                if(action === 'doPostSaveAction'){
                    controller.doPostSaveAction(model);
                }
            },
            failure: function(record, response) {
                    
//                    console.log(response);
                }
        }); 
    },
    

    update: function(model, controller, action){
        if(!model){
            throw new Error('[UsersAlertsConfigManager.update] model is null or empty!');
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
            throw new Error('[UsersAlertsConfigManager.deleteOne] user is null or empty!');
        }
        
        var model = Ext.create('Dashboard.model.settings.AlertsConfig', {
            id:id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('[UsersAlertsConfigManager.deleteOne] success: alert deleted');
                
                //todo msg
                if(action === 'refresh'){
                    controller.refresh();
                }
            }
        });
    },

    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[UsersAlertsConfigManager.displayInMain] show server configuration Management feature');

        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = this.getConfiguration();

        //renitialisation le proxy du control
//        this.store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/control/search';
//        this.store.getProxy().setActionMethods({read: 'POST'});
        
        mainController.displayInMain(
            { 
                xtype: 'alertsConfigMain',
                title: getText('Users alerts', 'title'),
                store: this.store,
                configuration: configuration,
                modelProperties: this.getProperties(),
                feature: feature,
                detailAlias: 'alertsConfigurationDetail',
                manager: this
            }
        );
    },
    
    getConfiguration: function(){
                
        var configuration = {

            enabledTools: {
                create: Dashboard.manager.settings.alert.UsersAlertsConfigManager.isAdmin,
                edit: Dashboard.manager.settings.alert.UsersAlertsConfigManager.isAdmin,
                read: false,
                destroy: Dashboard.manager.settings.alert.UsersAlertsConfigManager.isAdmin,
                duplicate: false,
                exportToFile: false,
                toggle: true,
                configViewList: true
            },

            //Grid
            table: {

                columns:[
                    {
                        text     : getText('Alert level'),
                        locked   : false,
                        flex     : 1,
                        sortable : true,
                        dataIndex: 'alertLevel',
                        cellWrap: false
                    },{
                        text     : getText('Name'),
                        locked   : false,
                        flex     : 3,
                        sortable : true,
                        dataIndex: 'name',
                        cellWrap: false
                    },{
                        text     : getText('Description'),
                        locked   : false,
                        flex     : 3,
                        sortable : true,
                        dataIndex: 'description',
                        cellWrap: false
                    },{
                        text     : getText('Type'),
                        locked   : false,
                        flex     : 2,
                        sortable : true,
                        dataIndex: 'alertType'
                    }, {
                        text     : getText('Enabled'),
                        locked   : false,
                        flex     : 1,
                        sortable : true,
                        dataIndex: 'enabled'
                    }, {
                        text     : getText('Type of control'),
                        locked   : false,
                        flex     : 2,
                        sortable : true,
                        dataIndex: 'alertConfigurationBean.description'
                    }
                ],
                extendedProperties : {
                    properties : []
		}
            }

        };
        
        
        if(Dashboard.manager.MainMenuManager.currentFeature === 'SYSTEM_ALERTS_USERS' ){
           
        }else if(Dashboard.manager.MainMenuManager.currentFeature === 'SETTINGS_ALERTS_USERS'){
            
            configuration.enabledTools.create = false;
            configuration.enabledTools.edit = false;
            configuration.enabledTools.destroy = false;
            
        }
        
        return configuration;
    },

    getProperties: function(){
        return [
            {
                name: 'alertLevel',
                label: getText('Alert level'),
                type: 'STRING'
            }, {
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            }, {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }, {
                name: 'alertType',
                label: getText('Type'),
                type: 'ENUM'
            }, {
                name: 'enabled',
                label: getText('Enabled'),
                type: 'BOOLEAN'
            }, {
                name: 'alertConfigurationBean.description',
                label: getText('Type of configuration'),
                type: 'STRING'
            }
        ];
    },
    
    getNotifEmailProperties: function(){
        return [
            {
                name: 'alertLevel',
                label: getText('Alert level'),
                type: 'STRING'
            }, {
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            }, {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }, {
                name: 'alertType',
                label: getText('Type'),
                type: 'ENUM'
            }, {
                name: 'enabled',
                label: getText('Enabled'),
                type: 'BOOLEAN'
            }
        ];
    } 
    
});