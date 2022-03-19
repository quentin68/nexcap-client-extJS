/* global Ext  */

Ext.define('Dashboard.manager.administration.MaterialManager', {
    extend: 'Ext.app.Controller',
    alias: 'materialManager',
    singleton: true,

    isAdmin: true,

    requires: ['Dashboard.tool.Utilities'],

    store: Ext.create('Dashboard.store.Materials', {
        autoLoad: false
    }),

    loadConfiguration: function (feature, isAdmin) {

        feature.data.enabledTools = this.getConfiguration().enabledTools;

        if (isAdmin === undefined) {
            isAdmin = true;
        }
        
        Dashboard.manager.administration.MaterialManager.isAdmin = isAdmin;

        try {
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[MaterialManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function (record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;

                        Dashboard.tool.Utilities.info('[MaterialManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        this.loadUserConfiguration(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'MaterialManager');
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[MaterialManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
                        
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[MaterialManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[MaterialManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[MaterialManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[MaterialManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[MaterialManager.displayInMain] show material Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[MaterialManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'materialMain',
            store: this.store,
            configuration: configuration, // default conf
            feature: feature
        });
    },

    getConfiguration: function () {

        var configuration = {
            enabledTools: {
                create: Dashboard.manager.administration.MaterialManager.isAdmin,
                edit: Dashboard.manager.administration.MaterialManager.isAdmin,
                read: false,
                destroy: Dashboard.manager.administration.MaterialManager.isAdmin,
                duplicate: Dashboard.manager.administration.MaterialManager.isAdmin,
                exportToFile: true,
                configViewList: true,
                detailToggle: true,
                configDetail: true
            },
            list: {
                viewModelType: 'materialViewModel',
                viewModelBinding: 'viewListBinding',
                mainProperties: {
                    thumb: 'thumbnailSrc',//'securedThumbnailSrc',
                    title: 'name',
                    subTitle: {
                        property: 'curState',
                        label: '',
                        type: 'string',
                        // style: 'text-transform: uppercase; color: red; float: right; font-size: 14px;',
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
                    properties: [
                        {
                            property: 'productReference.productCategory.fullPath',
                            label: getText('Category')
                                    // ,
                                    // style: 'color:red;'
                        }, {
                            property: 'productReference.referenceCode',
                            label: getText('Ref. code')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
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
                    properties: [
                        {
                            property: 'address',
                            label: getText('Address')
                                    // ,
                                    // style: 'color:red;'
                        }, {
                            property: 'lastActionUpdateDate',
                            label: getText('Last operation date')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
                        }
                    ]

                }
            },
            album: {
                thumb: 'imageSrc',
                caption: 'name',
                size: 's',
                properties: [
                    {
                        property: 'productReference.productCategory.fullPath',
                        label: getText('Category')
                                // ,
                                // style: 'color:red;'
                    }, {
                        property: 'productReference.referenceCode',
                        label: getText('Ref. code')
                                // ,
                                // style: 'color:green; font-size:16px;'
                    }, {
                        property: 'productReference.designation',
                        label: getText('Ref. designation')
                    }, {
                        property: 'location.address',
                        label: getText('Address')
                    }
                ]

            },
            // Grid
            table: {
                multiSelection: Dashboard.manager.administration.MaterialManager.isAdmin,
                displayRowNumbers: true,
                displayThumbnail: true,
                columns: [
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
                        // formatter: 'usMoney',
                        dataIndex: 'productReference.referenceCode'
                    }, {
                        text: getText('Ref. designation'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        // formatter: 'usMoney',
                        dataIndex: 'productReference.designation'
                    }, {
                        text: getText('Category'),
                        hidden: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'productReference.productCategory.fullPath'
                    }, {
                        text: getText('Use count'),
                        // width : 90,
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
                extendedProperties: {
                    properties: [
                        {
                            property: 'productReference.productCategory.fullPath',
                            label: getText('Category')
                                    // ,
                                    // style: 'color:red;'
                        }, {
                            property: 'productReference.referenceCode',
                            label: getText('Ref. code')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
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

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    } else if (action === 'onDuplicateMaterial') {
                        controller.onDuplicateMaterial(model);
                    } else if (action === 'setMaterialData') {
                        controller.setMaterialData(model);
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

    save: function (model, controller, action) {
        if (!model) {
            throw new Error('[MaterialManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function (record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[MaterialManager.save] save and read success : material.name: ' + model.data.name);

                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'material', 'doAfterThumbnailSaved', this);

                // Display user message
                // Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model, Ext.decode(response._response.responseText));
                }
            }
        });
    },

    update: function (model, controller, action) {
        if (!model) {
            throw new Error('[MaterialManager.update] model is null or empty!');
        }
        
        delete model.data.lastUpdateDate;
        delete model.data.lastActionUpdateDate;
        delete model.data.availabilityDate;
        delete model.data.calibrationDate;
        delete model.data.verificationFrequency;
        delete model.data.useDate;
        delete model.data.status;
        delete model.data.opLeavingToCalibrationId;
        delete model.data.opLeavingToMaintenanceId;

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function (record, response) {
                
                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'material', 'doAfterThumbnailSaved', this);

                // Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostEditAction') {
                    controller.doPostEditAction(model, Ext.decode(response._response.responseText));
                }
            }
        });
    },
    
    
    updateMultiple: function (list, controller, action) {
        
        if (!list) {
            throw new Error('[MaterialManager.updateMultiple] list is null or empty!');
        }
        
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/materials/update/list',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            params : Ext.JSON.encode(list),
            scope: this,
            
            success: function(response) {
                var message = Ext.decode(response.responseText);
                controller.doPostEditMultiple(message);
            },
            failure: function(response) {
                var data = JSON.parse(response.responseText);
                Dashboard.engine.ResponseManager.showErrorMessage(data);
            }
        });  
    },
    

    doAfterThumbnailSaved: function () {
        try{
            Ext.ComponentQuery.query('materialMain')[0].getController().refresh();
            //this.store.load();
        }catch(ex){}
            
    },
    
    duplicateMaterial: function (id, controller, action) {
        if (!id) {
            throw new Error('[MaterialManager.duplicateMaterial] material is null or empty!');
        }
    },

    deleteMaterial: function (id, controller, action) {
        if (!id) {
            throw new Error('[MaterialManager.deleteMaterial] material is null or empty!');
        }

        var model = Ext.create('Dashboard.model.Material', {
            id: id
        });

        model.erase({
            success: function () {

                Dashboard.tool.Utilities.info('[MaterialManager.deleteMaterial] success: material deleted');

                // todo msg
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },
    
    deleteMultiple: function (ids, controller, action) {
        if (!ids || ids.length === 0) {
            throw new Error('[MaterialManager.deleteMultiple] material is null or empty!');
        }

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/materials',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'DELETE',
            jsonData: JSON.stringify(ids),
            success: function (response, opts) {
                Dashboard.tool.Utilities.info('[MaterialManager.deleteMultiple] success: materials deleted');
                if (action === 'refresh') {
                    controller.refresh();
                }
            },
            failure: function (response, opts) {
                Dashboard.engine.ResponseManager.showFailure(getText('Failed'));
            }
        });
    },
   
    getProperties: function (action) {

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
            }, 
            {
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
    },
    
    getNotifEmailProperties: function (action) {

        return [
            {
                name: 'name',
                label: getText('Item'),
                type: 'STRING'
            }, {
                name: 'codes.code',
                label: getText('Code'),
                type: 'STRING',
                filterOnly: true
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
                name: 'useCount',
                label: getText('Use count'),
                type: 'INT'
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
            }
        ];
    }

});