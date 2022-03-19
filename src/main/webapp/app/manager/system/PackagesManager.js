Ext.define('Dashboard.manager.system.PackagesManager',{
    extend: 'Ext.app.Controller',
    alias: 'packagesManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.system.Packages',{
        autoLoad: false,
        sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
    }),
    
    className: 'MainController',
    
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
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[PackagesManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[PackagesManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[PackagesManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[PackagesManager.loadConfiguration] error: ' + err);
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
                xtype: 'updatePackageMain',
                store: this.store,
                configuration: configuration,
                feature: feature
            }
        );
    },
            
    
    getConfiguration: function(){
        
        var configuration = {
            
            enabledTools: {
                create: false,
                edit: false,
                read: false,
                destroy: true,
                authorized: false,
                acknowledged: false,
                add: true,
                affect: true,
                duplicate: false,
                exportToFile: false,
                configViewList: true
            },

            //Grid
            table: {

                displayRowNumbers: true,

                columns:[
                    {
                        text     : getText('Identifier'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'identifier',
                        cellWrap: false
                    },{
                        text     : getText('Package'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'name',
                        cellWrap: false
                    },{
                        text     : getText('Type'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'deviceType',
                        cellWrap: false
                    },{
                        text     : getText('Update Version'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'targetVersion',
                        cellWrap: false
                    },{
                        text     : getText('Servers Compatibility'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'serverCompatibility',
                        cellWrap: false
                    },{
                        text     : getText('Description'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'description',
                        cellWrap: false
                    }
                ],

                extendedProperties:{
                    properties:[
                        {
                            property: 'identifier',
                            label: getText('User identifier')
                        },
                        {
                            property: 'name',
                            label: getText('Package name')
                        },
                        {
                            property: 'deviceType',
                            label: getText('Type')
                        },
                        {
                            property: 'targetVersion',
                            label: getText('Update Version')
                        },
                        {
                            property: 'serverCompatibility',
                            label: getText('Servers Compatibility')
                        },
                        {
                            property: 'description',
                            label: getText('Description')
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
            Dashboard.model.system.Package.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.system.Package', response.data);
                    
                    Dashboard.tool.Utilities.info('['+this.className+'.getOne] loading success. Package: '+ model.data.name);
                                        
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

    
    
    /**
     * Delete item by id
     * @param {int} id
     * @param {object} sender (grid, treePanel)
     * @returns {undefined}
     */
    deleteOne: function(id, controller, action){
        if(!id){
            throw new Error('['+this.className+'.deleteOne] user is null or empty!');
        }

        var model = Ext.create('Dashboard.model.system.Package', {
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
    
    
    getProperties: function(action){
        
        return [
            {
                name: 'identifier',
                label: getText('User identifier'),
                type: 'STRING'
            },{
                name: 'name',
                label: getText('Package name'),
                type: 'STRING'
            },{
                name: 'deviceType',
                label: getText('Type'),
                type: 'STRING'
            },{
                name: 'targetVersion',
                label: getText('Update Version'),
                type: 'STRING'
            },{
                name: 'serverCompatibility',
                label: getText('Servers Compatibility'),
                type: 'STRING'
            },{
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }
        ];
    }
   
    
});