Ext.define('Dashboard.manager.consultation.MaterialsSetsManager',{
    extend: 'Ext.app.Controller',
    alias: 'materialsSetsManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.consultation.MaterialsSets',{
        autoLoad: false
    }),
    
    
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[MaterialsSetsManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[MaterialsSetsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        
                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'MaterialsSetsManager'); // 6843
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[MaterialsSetsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[MaterialsSetsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[MaterialsSetsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[MaterialsSetsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[MaterialsSetsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature){
                
        Dashboard.tool.Utilities.info('[MaterialsSetsManager.displayInMain] show items inventory feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[MaterialsSetsManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
        
        var previousMain = Ext.ComponentQuery.query('consultationMaterialsSetsMain')[0];
        if(previousMain){
            previousMain.destroy();
        }
                
        mainController.displayInMain({
            xtype: 'consultationMaterialsSetsMain',
            store: this.store,
            configuration: configuration,
            feature: feature,
            tag: 'main'
        });
    },
            
    
    getConfiguration: function(){
        
        var configuration = {
            
            enabledTools: {
                create: false,
                edit: false,
                read: false,
                destroy: false,
                duplicate: false,
                exportToFile: true,
                detailToggle: true,
                configDetail: true
            },

            list:{

                viewModelType: 'itemsViewModel',
                viewModelBinding: 'viewListBinding',

                mainProperties: {

                    thumb: 'thumbnailSrc',
                    title: 'productReference.designation',
                    style: 'color:blue;',
//                    subTitle: {
//                        property: 'materialName',
//                        label: '  ',
//                        type: 'string'
//                    },
                            
                    properties:[
                        {
                            property: 'productReference.referenceCode', 
                            label: getText('Ref. code'),
                            style: 'color:black;'
                        },{
                            property: 'productReference.designation', 
                            label: getText('Ref. designation'),
                            style: 'color:black;'
                        },{
                            property: 'count', 
                            label: getText('Quantity'),
                            style: 'color:black;'
                        }
                    ]
                },

                extendedProperties: {

                    properties:[
                        {
                            property: 'productReference.description',
                            label: getText('Ref. description'),
                            style: 'color:black;'
                        },{
                            property: 'location.address',
                            label: getText('Address'),
                            style: 'color:black;'
                        }
//                        ,{
//                            property: 'useCount',
//                            label: getText('Use count'),
//                            style: 'color:black;'
//                        }
                    ]

                }
            },

            album: {

                thumb: 'imageSrc',
                caption: 'name',
                size: 's',
                properties:[
                    {
                        property: 'productReference.referenceCode', 
                        label: getText('Ref. code'),
                        style: 'color:black;'
                    },{
                        property: 'productReference.designation',
                        label: getText('Ref. designation'),
                        style: 'color:black;'
                    },{
                        property: 'count', 
                        label: getText('Quantity'),
                        style: 'color:black;'
                    }
                ]

            },

            //Grid
            table: {

                displayRowNumbers: false,
                displayThumbnail: true,

                columns:[
                    {
                        text     : getText('Ref. code'),
                        locked   : true,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'productReference.referenceCode',
                        cellWrap: false
                    }, {
                        text     : getText('Ref. designation'),
                        locked   : true,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'productReference.designation',
                        cellWrap: false
                    }, {
                        text     : getText('Category'),
                        locked   : false,
                        width    : 200,
                        sortable : true,
                        dataIndex: 'productReference.productCategory.name',//fullPath
                        cellWrap: false
                    }, {
                        text     : getText('Quantity'),
                        locked   : true,
                        width    : 90,
                        sortable : true,
                        dataIndex: 'count',
                        cellWrap: false
                    }, {
                        text     : getText('Address'),
                        locked   : false,
                        minWidth    : 300,
                        flex: 1,
                        sortable : true,
                        dataIndex: 'location.address',
                        cellWrap: false
                    }//,
//                    ,{
//                        dataIndex: 'assignedLocForPositions',
//                        text: getText('Assigned location'),
//                        locked: false,
//                        minWidth : 300,
//                        flex: 1,
//                        sortable : true,
//                        cellWrap: false
//                    },
//                    {
//                        text     : getText('Use count'),
//                        locked   : false,
//                        width    : 120,
//                        sortable : true,
//                        renderer : function(val) {
//                            if (val < 1) {
//                                return '<span style="color:red;">' + val + '</span>';
//                            } else if (val >= 1) {
//                                return '<span style="color:green;">' + val + '</span>';
//                            }
//                            return val;
//                        },
//                        dataIndex: 'useCount'
//                    }
                ],

                extendedProperties:{
                    properties:[
                        {
                            property: 'productReference.referenceCode', 
                            label: getText('Ref. code'),
                            style: 'color:black;'
                        },{
                            property: 'productReference.designation', 
                            label: getText('Ref. designation'),
                            style: 'color:black;'
                        },{
                            property: 'productReference.description',
                            label: getText('Ref. description'),
                            style: 'color:black;'
                        },{
                            property: 'location.address',
                            label: getText('Address'),
                            style: 'color:black;'
                        }//,
//                        {
//                            property: 'useCount',
//                            label: getText('Use count'),
//                            style: 'color:black;'
//                        }
                    ]
                }
            }

        };
        
        return configuration;
        
    },
    
    
     getOne: function(id, controller, action) {

        try {
                        
            Dashboard.model.consultation.MaterialsSet.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[MaterialsSetsManager.getOne] error: loading failure');
                },
                success: function(record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.consultation.MaterialsSet', response.data);

                    Dashboard.tool.Utilities.info('[MaterialsSetsManager.getOne] loading success. materialsSet: ' + model.data.id);

                    if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    }
                },
                callback: function(record, operation, success) {
                    // nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[MaterialsSetsManager.getOne] error: ' + err.message);
        }

    },
            
            
//    //Get one
//    getItem: function(id, controller, action){
//        
//        try{
//            Dashboard.manager.administration.MaterialManager.getMaterial(id, controller, action);
//        }catch(err){
//            Dashboard.tool.Utilities.error('[ItemsManager.getItem] error: ' + err);
//        }
//    },
//            
//            
//     //Get one        
//    getItemsSet: function(id, controller, action){
//        
//        try{
//            Dashboard.manager.administration.ReferencesManager.getReference(id, controller, action);
//        }catch(err){
//            Dashboard.tool.Utilities.error('[ItemsManager.getItemSet] error: ' + err);
//        }
//    },
    
    
    getProperties: function(){
        
        return [
            {
                name: 'count',
                label: getText('Quantity'),
                type: 'LONG'
            },
//            {
//                name: 'useCount',
//                label: getText('Uses count'),
//                type: 'INT'
//            },
            {
                name: 'location.address',
                label: getText('Address'),
                type: 'STRING',
                control:Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            },{
                name: 'productReference.referenceCode',
                label: getText('Ref. code'),
                type: 'STRING'
            },{
                name: 'productReference.designation',
                label: getText('Ref. designation'),
                type: 'STRING'
            },{
                name: 'productReference.description',
                label: getText('Ref. description'),
                type: 'STRING'
            },{
                name: 'productReference.productCategory.name',//fullPath
                label: getText('Category'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'categories',
                        width: 400
                    }
                })
            }
//            ,{
//                name: 'productReference.assignedLocForPositions',
//                label: getText('Assigned location'),
//                type: 'STRING',
//                control:Ext.encode({
//                    field: {
//                        fieldType: 'address',
//                        width: 400
//                    }
//                })
//            }
        ];
    }
    
});