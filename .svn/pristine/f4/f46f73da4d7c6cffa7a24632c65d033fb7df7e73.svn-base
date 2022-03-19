/*  global Ext */

Ext.define('Dashboard.manager.system.PluginsManager',{
    extend: 'Ext.app.Controller',
    alias: 'pluginsManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.system.Plugins',{
        autoLoad: false,
        sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
    }),

    className: 'PluginsManager',
    
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.FeatureConfiguration', Ext.decode(response.data));
                    
                    feature.data.configuration = model;
                    
                    Dashboard.tool.Utilities.info('['+this.className+'.loadConfiguration] loading success. Feature: '+ model.data.featureName);
                                        
                    this.loadUserConfiguration(feature);
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('['+this.className+'.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('['+this.className+'.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('['+this.className+'.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('['+this.className+'.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('['+this.className+'.displayInMain] show profile Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[' + this.className + '.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
                
        mainController.displayInMain(
            { 
                xtype: 'pluginMain',
                store: this.store,
                configuration: configuration,
                feature: feature,
                tag: 'main'
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
                toggle: true,
                exportToFile: false,
                configViewList: true,
                detailToggle: true
            },

            //Grid
            table: {

                displayRowNumbers: false,

                columns:[
                    {
                        text     : getText('Name'),
                        locked   : false,
                        flex:3,
                        sortable : true,
                        dataIndex: 'name',
                        cellWrap: false
                    }, {
                        text     : getText('Enabled'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'enabled',
                        cellWrap: true
                    }, {
                        text     : getText('Initialized'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'initialized',
                        cellWrap: false
                    }, {
                        text     : getText('Version'),
                        locked   : false,
                        flex:2,
                        sortable : true,
                        dataIndex: 'softwareVersion',
                        cellWrap: false
                    }
                ],
                        
                extendedProperties:{
                    properties:[
                        {
                            label: getText('Name'),
                            property: 'name'
                        },{
                            label: getText('Signature'),
                            property: 'signature'
                        },{
                            label: getText('Description'),
                            property: 'description'
                        },{
                            label: getText('Last update date'),
                            property: 'lastUpdateDate'
                        }
                    ]
                }
            }

        };
        
        return configuration;
    },
            
            
    /**
     * Get one item
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getOne: function(id, controller, action){
        
        try{
            Dashboard.model.system.Plugin.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] error: loading failure');
                },
                success: function(record, operation) {
                                        
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.system.Plugin', response.data);
                    
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] loading success. Plug-in: '+ model.data.name);
                                        
                    if(action === 'edit'){
                        controller.edit(model);
                    }else if(action === 'displayDetail'){
                        controller.displayDetail(model); 
                    }
                },
                callback: function(record, operation, success) {
                    //nothing
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('['+this.className+'.getOne] error: ' + err);
        }
    },
    

    update: function (model, controller, action, temp) {
        if (!model) {
            throw new Error('[PluginManager.update] model is null or empty!');
        }

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        
        model.save({
            scope: this,
            success: function (record, response) {
                if (action === 'doPostEditAction') {
                    controller.doPostEditAction(model);
                }else if(action === 'afterConfigurationPropertySaved'){
                    controller.afterConfigurationPropertySaved(temp);
                }
            }
        });
    },
    
    
    enable: function(plugin, controller, action){
        
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/plugins/enable/' + plugin.data.id,
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(plugin.data.id),
            scope: this,
            success: function(response) {
                //Dashboard.engine.ResponseManager.showSuccess(response);
                if(action === 'afterEnableChange'){
                    controller.afterEnableChange(plugin);
                }
            },
            failure: function(response) {
                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
            }
        });  
    },
    
    
    disable: function(plugin, controller, action){
        
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/plugins/disable/' + plugin.data.id,
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(plugin.data.id),
            scope: this,
            success: function(response) {
                Dashboard.engine.ResponseManager.showSuccess(response);
                if(action === 'afterEnableChange'){
                    controller.afterEnableChange(plugin);
                }
            },
            failure: function(response) {
                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
            }
        });  
    },


    deleteOne: function(id, controller, action){
        if(!id){
            throw new Error('['+this.className+'.deleteOne] plugin is null or empty!');
        }

        var model = Ext.create('Dashboard.model.system.Plugin', {
            id:id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('['+this.className+'.deleteOne] success: deleted');
                
                //todo msg
                if(action === 'refresh'){
                    controller.refresh();
                }
            }
        });
    },
    
    
    saveConfiguration: function(device, controller, action, temp){
        
        this.update(device, controller, action, temp);
    },

    
    getProperties: function(){
        
        return [
            {
                label: getText('Name'),
                name: 'name',
                type: 'STRING'
            }, {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }, {
                name: 'signature',
                label: getText('Signature'),
                type: 'STRING'
            }, {
                label: getText('Version'),
                name: 'softwareVersion',
                type: 'STRING'
            }, {
                name: 'enabled',
                label: getText('Enabled'),
                type: 'BOOLEAN'
            }, {
                name: 'initialized',
                label: getText('Initialized'),
                type: 'BOOLEAN'
            }, {
                name: 'lastUpdateDate',
                label: getText('Last update date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }
        ];
    }
    
});