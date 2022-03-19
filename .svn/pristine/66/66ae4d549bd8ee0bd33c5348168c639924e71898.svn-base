Ext.define('Dashboard.manager.settings.NotifMailConfigManager', {
    extend: 'Ext.app.Controller',
    alias: 'notifMailConfigManager',
    singleton: true,
    
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    
    feature:  Ext.create('Dashboard.store.Features').findRecord('name', 'EMAIL_SENDERS_ADMIN', 0, false, true, true), 
    

    store: Ext.create('Dashboard.store.settings.NotifMailConfig',{
          autoLoad: false,
          sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
      }),
    
        
    loadConfiguration: function(feature){

        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try{

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    
                    Dashboard.tool.Utilities.info('[NotifMailConfigManager.loadConfiguration] error: loading failure');
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
                        Dashboard.tool.Utilities.info('[NotifMailConfigManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                        
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'NotifMailConfigManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[NotifMailConfigManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[notifMailConfigManager.loadUserConfiguration] error: loading failure');
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
                        Dashboard.tool.Utilities.info('[notifMailConfigManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[notifMailConfigManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[notifMailConfigManager.loadConfiguration] error: ' + err);
        }
    },
    
    
  save: function(model, controller, action){
        if(!model){
            throw new Error('[notifMailConfigManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.getProxy().api.create= Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders';
        model.save({
            scope:this,
            success: function(record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info(
                        '[notifMailConfigManager.save] save and read success : name: '+ model.data.name);

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
            throw new Error('[notifMailConfigManager.update] model is null or empty!');
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
    
    send: function(model, controller, action){     
        
        if(!model){
            throw new Error('[notifMailConfigManager.send] model is null or empty!');
        }        

        delete model.data.id;
        model.getProxy().api.create= Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders/sendTest';
        model.save({
            scope:this,
            success: function(record, response) {
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
            },
            failure: function(record, response) {                    
//                    console.log(response);
            }
        });
    },
    
    /**
     * Delete item by id
     * @param {int} id
     * @param {object} controller
     * @param {object} action 
     * @returns {undefined}
     */
    deleteOne: function(id, controller, action){
        if(!id){
            throw new Error('[NotifMailConfigManager.deleteOne] user is null or empty!');
        }
        
        var model = Ext.create('Dashboard.model.settings.NotifMailConfig', {
            id:id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('[NotifMailConfigManager.deleteOne] success: alert deleted');
                
                //todo msg
                if(action === 'refresh'){
                    controller.refresh();
                }
            }
        });
    },

    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[NotifMailConfigManager.displayInMain] show server configuration Management feature');

        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        var configuration = this.getConfiguration();

        mainController.displayInMain(
            { 
                xtype: 'notifMailConfigMain',
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
                configViewList: true
            },

            //Grid
            table: {

                columns:[
                    {
                        text     : getText('Name'),
                        locked   : false,
                        flex     : 1,
                        sortable : true,
                        dataIndex: 'name',
                        cellWrap: false
                    },{
                        text     : getText('Description'),
                        locked   : false,
                        flex     : 1,
                        sortable : true,
                        dataIndex: 'description',
                        cellWrap: false
                    }
                ],
                extendedProperties : {
                    properties : []
		}
            }

        };

        return configuration;
    },

      getProperties: function(){

        return [
           
            {
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            },
            {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }
        ];
    } 
    
});