/*  global Ext */

Ext.define('Dashboard.manager.historic.AccessManager',{
    extend: 'Ext.app.Controller',
    alias: 'accessManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.historic.Access',{
        autoLoad: false,
        sorters: [
            {
                property: 'logoutDate',
                direction: 'DESC'
            }
        ]
    }),

    className: 'AccessManager',
    
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
                    Dashboard.tool.Utilities.info('[AccessManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[AccessManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[AccessManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[AccessManager.loadConfiguration] error: ' + err);
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
                xtype: 'accessMain',
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
                edit: false,
                read: false,
                destroy: false,
                toggle: false,
                exportToFile: true,
                configViewList: true,
                detailToggle: false
            },

            //Grid
            table: {

                displayRowNumbers: false,

                columns:[
                    {
                        text : getText('Login date'),
                        locked : false,
                        width : 160,
                        dataIndex : 'loginDate',
                        formatter : 'date("' + getText('m/d/Y H:i:s') + '")'
                    }, {
                        text : getText('Logout date'),
                        locked : false,
                        width : 160,
                        dataIndex : 'logoutDate',
                        formatter : 'date("' + getText('m/d/Y H:i:s') + '")'
                    }, {
                        text : getText('User'),
                        locked : false,
                        dataIndex : 'userSticker',
                        flex : 1
                    }, 
//                    {
//                        text : getText('Operator'),
//                        locked : false,
//                        dataIndex : 'operator',
//                        width : 200
//                    }, 
//                    {
//                        text : getText('Address'),
//                        locked : false,
//                        dataIndex : 'address',
//                        width : 300
//                    }, 
                    {
                        text : getText('Device name'),
                        locked : false,
                        dataIndex : 'deviceName',
                        flex : 1
                    }, {
                        text : getText('System type'),
                        locked : false,
                        dataIndex : 'systemType',
                        flex : 1
                    }//, 
//                    {
//                        text : getText('Tag reader name'),
//                        locked : false,
//                        dataIndex : 'tagReaderName',
//                        width : 200
//                    }
                ],
                        
                extendedProperties:{
                    properties:[
//                        {
//                            label: getText('Tag reader name'),
//                            property: 'tagReaderName'
//                        },
                        {
                            label: getText('Device Name'),
                            property: 'deviceName'
                        },{
                            label: getText('System type'),
                            property: 'systemType'
                        },{
                            label: getText('Address'),
                            property: 'address'
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
            Dashboard.model.historic.Access.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] error: loading failure');
                },
                success: function(record, operation) {
                                        
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.historic.Access', response.data);
                    
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] loading success. Access: '+ model.data.name);
                                        
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
            
    
    saveConfiguration: function(device, controller, action, temp){
        
        this.update(device, controller, action, temp);
    },

    
    getProperties: function(){
        
        return [
            {
                label: getText('Login date'),
                name: 'loginDate',
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'logoutDate',
                label: getText('Logout date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'userSticker',
                label: getText('User'),
                type: 'STRING'
            }, 
//            {
//                name: 'operator',
//                label: getText('Operator'),
//                type: 'STRING'
//            }, 
            {
                name: 'deviceSignature',
                label: getText('Signature'),
                type: 'STRING'
            }, {
                name: 'userLogin',
                label: getText('User login'),
                type: 'STRING'
            },{
                name: 'userFirstname',
                label: getText('User firstname'),
                type: 'STRING'
            },{
                name: 'userLastname',
                label: getText('User lastname'),
                type: 'STRING'
            },
//            {
//                name : 'Address',
//                label : getText('Address'),
//                type : 'STRING',
//                control : Ext.encode({
//                        field : {
//                                fieldType : 'address',
//                                width : 400
//                        }
//                })
//            }, 
            {
                label: getText('Device name'),
                name: 'deviceName',
                type: 'STRING'
            }, 
            {
                name: 'systemType',
                label: getText('Type'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'deviceType'
                    }
                })
            }//,
//            {
//                name: 'systemType',
//                label: getText('System type'),
//                type: 'ENUM'
//            }//, 
//            {
//                name: 'tagReaderName',
//                label: getText('Tag reader name'),
//                type: 'STRING'
//            }
        ];
    }
    
});