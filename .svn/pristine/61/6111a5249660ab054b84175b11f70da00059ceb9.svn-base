/* global Ext  */

Ext.define('Dashboard.manager.consultation.ItemsManager',{
    extend: 'Ext.app.Controller',
    alias: 'itemsManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities'
    ],
    
    store: Ext.create('Dashboard.store.consultation.Items',{
        autoLoad: false
    }),
    
    
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try{
    
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ItemsManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ItemsManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        
                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ItemsManager'); 
                    }
                }
            });
            
        }catch(err){
            Dashboard.tool.Utilities.error('[ItemsManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ItemsManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ItemsManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ItemsManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ItemsManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[ItemsManager.displayInMain] show items inventory feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        var configuration = null;
        try{
            configuration = feature.data.configuration.data.viewListConfiguration;
        }catch(ex){
            Dashboard.tool.Utilities.error('[ItemsManager.displayInMain] configuration error: ' + ex);
        }
        if(!configuration){
            configuration = this.getConfiguration();
        }
                
        mainController.displayInMain({
            xtype: 'consultationItemsMain',
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
                configViewList: true,
                detailToggle: true,
                configDetail: true
            },

            list:{

                viewModelType: 'itemsViewModel',
                viewModelBinding: 'viewListBinding',

                mainProperties: {

                    thumb: 'thumbnailSrc',
                    title: 'name',
                    //style: 'color:blue;',
                    subTitle: {
                        property: 'curState',
                        label: '  ',
                        type: 'string',
                        option: {
                            type: 'condition',
                            cases: [{
                                    operator: '=', // 'EQ' | 'CONTAINS' | 'GT' | 'LT'
                                    value: getText('Out of order'),
                                    style: 'text-transform: uppercase; color: red; float: right; font-size: 14px;'
                                }, {
                                    operator: '=',
                                    value: getText('To verify'),
                                    style: 'text-transform: uppercase; color: orange; float: right; font-size: 14px;'
                                }, {
                                    operator: '=',
                                    value: getText('In service'),
                                    style: 'text-transform: uppercase; color: green; float: right; font-size: 14px;'
                                }]
                        }
                    },
                            
                    properties:[
                        {
                            property: 'productReference.productCategory.fullPath',
                            label: getText('Category')
                        }, {
                            property: 'productReference.referenceCode',
                            label: getText('Ref. code')
                        }, {
                            property: 'productReference.designation',
                            label: getText('Ref. designation')
                        }, {
                            property: 'location.address',
                            label: getText('Address')
                        }
                    ]
                },

                extendedProperties: {

                    properties:[
                        {
                            property: 'address',
                            label: getText('Address')
                        }, {
                            property: 'lastActionUpdateDate',
                            label: getText('Last operation date')
                        }
                    ]

                }
            },

            album: {

                thumb: 'imageSrc',
                caption: 'name',
                size: 's',
                properties:[
                    {
                        property: 'productReference.productCategory.fullPath',
                        label: getText('Category')
                    }, {
                        property: 'productReference.referenceCode',
                        label: getText('Ref. code')
                    }, {
                        property: 'productReference.designation',
                        label: getText('Ref. designation')
                    }, {
                        property: 'location.address',
                        label: getText('Address')
                    }
                ]

            },

            //Grid
            table: {
                displayRowNumbers: false,
                displayThumbnail: true,
                columns:[
                     {
                        text: getText('Item'),
                        locked : !Dashboard.manager.administration.MaterialManager.isAdmin,
                        width: 200,
                        sortable: true,
                        dataIndex: 'name',
                        cellWrap: false
                    }, {
                        text: getText('Ref. code'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productReference.referenceCode'
                    }, {
                        text: getText('Ref. designation'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productReference.designation'
                    }, {
                        text: getText('Category'),
                        hidden: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productReference.productCategory.fullPath'
                    }, {
                        text: getText('Use count'),
                        sortable: true,
                        renderer: function (val) {
                            if (val < 15) {
                                return '<span style="color:green;">' + val + '</span>';
                            } else if (val >= 15) {
                                return '<span style="color:red;">' + val + '</span>';
                            }
                            return val;
                        },
                        dataIndex: 'useCount'
                    }, {
                        text: getText('Assigned Address'),
                        width: 300,
                        sortable: true,
                        dataIndex: 'assignedLocation.address',
                        cellWrap: false
                    }, {
                        text: getText('Current address'),
                        width: 300,
                        sortable: true,
                        dataIndex: 'location.address',
                        cellWrap: false
                    }, 
//                    {
//                        text: getText('Current state'),
//                        width: 200,
//                        sortable: false,
//                        dataIndex: 'curState',
//                        cellWrap: true,
//                        renderer: function (val, metaData, record) {
//                            var curState, curStateString = '', style = '';
//                            try {
//                                record.data.properties.forEach(function (prop) {
//                                    if (prop.name === 'curState') {
//                                        curState = prop;
//                                    }
//                                });
//
//                                if (curState === undefined) {
//                                    curStateString = 'Undefined';
//                                    curState = {
//                                        value: ''
//                                    };
//                                } else {
//                                    curStateString = curState.value || '';
//                                }
//
//                                switch (curState.value) {
//                                    case '':
//                                        style = 'color:#A9A9A9;';
//                                        break;
//                                    case 'Out of order':
//                                        style = 'color:red;';
//                                        break;
//                                    case 'To verify':
//                                        style = 'color:orange;';
//                                        break;
//                                    default:
//                                        style = 'color:green;';
//                                }
//
//                            } catch (ex) {
//                                Dashboard.tool.Utilities.info('[MaterialManager.table] error: ' + ex);
//                            }
//
//                            return '<span style="' + style + '">' + curStateString + '</span>';
//                        }
//                    }, 
                    {
                        text: getText('Last update date'),
                        width: 150,
                        sortable: true,
                        dataIndex: 'lastUpdateDate',
                        renderer: function (val) {
                            return Ext.Date.format(val, getText('m/d/Y H:i:s'));
                        }
                    }
                ],

                extendedProperties:{
                    properties:[
                        {
                            property: 'productReference.productCategory.fullPath',
                            label: getText('Category')
                        }, {
                            property: 'productReference.referenceCode',
                            label: getText('Ref. code')
                        }, {
                            property: 'productReference.designation',
                            label: getText('Ref. designation')
                        }, {
                            property: 'location.address',
                            label: getText('Address')
                        }
                    ]
                }
            }

        };
        
        return configuration;
        
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
            Dashboard.model.Material.load(id, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[MaterialManager.getMaterial] error: loading failure');
                },
                success: function (record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.Material', response.data);

                    if (model.data.properties) {
                        Ext.each(model.data.properties, function (property) {
                            property.configuration.control = Ext.decode(property.configuration.control);
                        });
                    }

                    Dashboard.tool.Utilities.info('[MaterialManager.getMaterial] loading success. Material: ' + model.data.name);

                    if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    } 
                },
                callback: function (record, operation, success) {
                    // nothing
                }
            });
        } catch (err) {
            Dashboard.tool.Utilities.error('[MaterialManager.getMaterial] error: ' + err);
        }
    },
            
            
    //Get one
    getItem: function(id, controller, action){
        
        try{
            Dashboard.manager.administration.MaterialManager.getMaterial(id, controller, action);
        }catch(err){
            Dashboard.tool.Utilities.error('[ItemsManager.getItem] error: ' + err);
        }
    },
            
            
     //Get one        
    getItemsSet: function(id, controller, action){
        
        try{
            Dashboard.manager.administration.ReferencesManager.getReference(id, controller, action);
        }catch(err){
            Dashboard.tool.Utilities.error('[ItemsManager.getItemSet] error: ' + err);
        }
    },
    
    
    getProperties: function(){
        
        return [
            {
                name: 'name',
                label: getText('Item'),
                type: 'STRING'
            }, 
            {
                name: 'codes.code',
                label: getText('Code'),
                type: 'STRING',
                //filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'code'
                    }
                })
            },
//            {
//                name: 'code.code',
//                label: getText('Code'),
//                type: 'STRING'
//            }, 
            {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }, {
                name: 'productReference.referenceCode',
                label: getText('Ref. code'),
                type: 'STRING'
            }, {
                name: 'productReference.designation',
                label: getText('Ref. designation'),
                type: 'STRING'
            }, {
                name: 'productReference.description',
                label: getText('Ref. description'),
                type: 'STRING'
            }, {
                name: 'productReference.productCategory.fullPath',
                label: getText('Category'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'categoriesFullPath',
                        width: 400
                    }
                })
            }, {
                name: 'useCount',
                label: getText('Use count'),
                type: 'INT'
            }, {
                name: 'alerts.controlName',
                label: getText('Alert'),
                filterOnly: true,
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'alertName',
                        width: 400
                    }
                })
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
                name: 'location.address',
                label: getText('Address'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'assignedLocation.address',
                label: getText('Assigned location'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            }, {
                name: 'comboItemRefCat',
                label: getText('Combo Item - Reference - Category'),
                type: 'STRING',
                filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'comboitemrefcat',
                        width: 400
                    }
                })
            }
        ];
    }
    
});