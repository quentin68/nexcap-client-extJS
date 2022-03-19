/*  global Ext */

Ext.define('Dashboard.manager.system.IotDevicesManager',{
    extend: 'Ext.app.Controller',
    alias: 'iotDevicesManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.system.IotDevices',{
        autoLoad: false,
        sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
    }),
    
    devicesTypes: null,
    
    className: 'IotDevicesManager',
    
    feature: null,

    
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        this.feature = feature;
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.feature = feature;
                    this.loadUserConfiguration(feature);
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.FeatureConfiguration', Ext.decode(response.data));
                    
                    feature.data.configuration = model;
                    
                    this.feature = feature;
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
                    Dashboard.tool.Utilities.info('[IotDevicesManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[IotDevicesManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[IotDevicesManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[IotDevicesManager.loadConfiguration] error: ' + err);
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
                xtype: 'iotDeviceMain',
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
                create: false,
                edit: Dashboard.manager.FeaturesManager.isEnabled('DEVICE_MAINTENANCE'),
                read: false,
                destroy: Dashboard.manager.FeaturesManager.isEnabled('DEVICE_MAINTENANCE'),
                manage: Dashboard.manager.FeaturesManager.isEnabled('OP_MAINTAIN'),
                authorize: Dashboard.manager.FeaturesManager.isEnabled('DEVICE_MAINTENANCE'),
                ban: Dashboard.manager.FeaturesManager.isEnabled('DEVICE_MAINTENANCE'),
                acknowledged: false,
                duplicate: false,
                exportToFile: true,
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
                        flex:1,
                        sortable : true,
                        dataIndex: 'name',
                        cellWrap: false
                    },{
                        text: getText('Type'),
                        locked: false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'deviceType',
                        cellWrap: false,
                        renderer: function (val, metaData, record) {
                            return record.data.deviceTypeLabel;
                        }
                    },{
                        text     : getText('Address'),
                        locked   : false,
                        flex:2,
                        sortable : true,
                        dataIndex: 'address',
                        cellWrap: true
                    },{
                        text     : getText('IP Address'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'ipAddress',
                        cellWrap: false
                    },{
                        text     : getText('Version'),
                        locked   : false,
                        //width    : 200,
                        flex:1,
                        sortable : true,
                        dataIndex: 'softwareVersion',
                        cellWrap: false
                    },{
                        text     : getText('Authorized'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'authorized',
                        cellWrap: false
                    }
                ],
                        
                extendedProperties:{
                    properties:[
                        {
                            label: getText('Name'),
                            property: 'name'
                        },{
                            label: getText('Type'),
                            property: 'deviceType'
                        },{
                            label: getText('Address'),
                            property: 'address'
                        },{
                            label: getText('IP Address'),
                            property: 'ipAddress'
                        },{
                            label: getText('Version'),
                            property: 'softwareVersion'
                        },{
                            label: getText('Authorized'),
                            property: 'authorized'
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
            Dashboard.model.system.Device.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.system.Device', response.data);
                    
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] loading success. Device: '+ model.data.name);
                                        
                    if(action === 'edit'){
                        controller.edit(model);
                    }else if(action === 'displayDetail'){
                        controller.displayDetail(model); 
                    }else if(action === 'manageDevice'){
                        controller.manageDevice(model); 
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
            throw new Error('[IotDevicesManager.update] model is null or empty!');
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

    authorize: function(model, controller, action){
        if(!model){
            throw new Error('['+this.className+'.update] model is null or empty!');
        }
        
        //delete model.data.id;
        //model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        
        model.save({
            scope:this,
            success: function(record, response) {
                
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
            
                if(action === 'doPostSaveAction'){
                    controller.doPostSaveAction(model);
                }
            }
        });
    },
    
    
    requireLogs: function(deviceId, controller, action){
        
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/iotdevices/requirelog',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(deviceId),
            scope: this,
            success: function(response) {
               //Dashboard.engine.ResponseManager.showSuccess(response);                
               if(action === 'afterRequireLogs'){
                   controller.afterRequireLogs(deviceId);
               }
            },
            failure: function(response) {
                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
            }
        });  
    },
    
    
    shareConfiguration: function(device, controller, action, params){
        
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/iotdevices/configuration/copy',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(params),
            scope: this,
            success: function(response) {
               //Dashboard.engine.ResponseManager.showSuccess(response);                
               if(action === 'afterConfigurationPropertyShared'){
                   controller.afterConfigurationPropertyShared(params);
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
            throw new Error('['+this.className+'.deleteOne] IOT device is null or empty!');
        }

        var model = Ext.create('Dashboard.model.system.IotDevice', {
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
    
    
    banDevice: function(id, controller, action){
        if(!id){
            throw new Error('['+this.className+'.banDevice] Iot device is null or empty!');
        }

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/iotdevices/unauthorize',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(id),
            scope: this,
            success: function(response) {
               Dashboard.engine.ResponseManager.showSuccess(response);                
               if(action === 'afterBanned'){
                   controller.afterBanned(id);
               }
            },
            failure: function(response) {
                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
            }
        });  
    },
    
    
    saveConfiguration: function(device, controller, action, temp){
        
        this.update(device, controller, action, temp);
        
    },
    
    
    getIconSrcByDeviceType: function(deviceTypeName){
        var deviceType = this.getDeviceTypeByType(deviceTypeName);
        return deviceType.data.iconSrc;
    },
    
    getLabelByDeviceType: function(deviceTypeName){
        var deviceType = this.getDeviceTypeByType(deviceTypeName);
        if(!deviceType){
            return deviceTypeName;
        }
        return deviceType.data.label;
    },
    
    getDeviceTypeByType: function(deviceTypeName){
        if(!this.devicesTypes){
            this.devicesTypes = Ext.create('Dashboard.store.system.DevicesTypes');
        }
        var deviceType = this.devicesTypes.findRecord('type', deviceTypeName);
        return deviceType;
    },
    
    getProperties: function(){
        
        return [
            {
                label: getText('Name'),
                name: 'name',
                type: 'STRING'
            },{
                label: getText('Type'),
                name: 'deviceType',
                type: 'STRING'
            },{
                label: getText('Address'),
                name: 'address',
                type: 'STRING'
            },{
                label: getText('IP Address'),
                name: 'ipAddress',
                type: 'STRING'
            },{
                label: getText('Software version'),
                name: 'softwareVersion',
                type: 'STRING'
            },{
                label: getText('Authorized'),
                name: 'authorized',
                type: 'BOOLEAN'
            },{
                label: getText('Signature'),
                name: 'signature',
                type: 'STRING'
            },{
                label: getText('Description'),
                name: 'description',
                type: 'STRING'
            }, {
                name: 'lastUpdateDate',
                label: getText('Last update date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'lastConnectionDate',
                label: getText('Last connection date'),
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