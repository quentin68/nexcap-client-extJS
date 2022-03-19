/*  global Ext */

Ext.define('Dashboard.manager.administration.ReferencesManager', {
    extend: 'Ext.app.Controller',
    alias: 'referencesManager',
    singleton: true,
    
    requires: ['Dashboard.tool.Utilities'],
    
    store: Ext.create('Dashboard.store.References', {
        autoLoad: false
    }),
    
    loadConfiguration: function(feature){
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation){
                    Dashboard.tool.Utilities.info('[ReferencesManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function(record, operation){
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[ReferencesManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ReferencesManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ReferencesManager.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ReferencesManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ReferencesManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ReferencesManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ReferencesManager.loadConfiguration] error: ' + err);
        }
    },
    
    displayInMain: function(feature){
        
        Dashboard.tool.Utilities.info('[ReferencesManager.displayInMain] show references Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[ReferencesManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'referenceMain',
            store: this.store,
            configuration: configuration,
            feature: feature
        });
    },
            
    /**
     * Get one reference
     * 
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getReference: function(id, controller, action){

        try {
            Dashboard.model.Reference.load(id, {
                scope: this,
                failure: function(record, operation){
                    Dashboard.tool.Utilities.info('[ReferencesManager.getReference] error: loading failure');
                },
                success: function(record, operation){

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.Reference', response.data);

                    Dashboard.tool.Utilities.info('[ReferencesManager.getReference] loading success. Reference.id=' + model.data.id + ' Reference.designation=' + model.data.designation);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    } else if (action === 'buildFields') {
                        controller.buildFields(model);
                    } else if (action === 'onEditGetLocations') {
                        controller.onEditGetLocations(model);
                    } else if (action === 'onDuplicateRefrence') {
                        controller.onDuplicateRefrence(model);
                    }

                },
                callback: function(record, operation, success){
                    // nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ReferencesManager.getReference] error: ' + err);
        }

    },
    
    save: function(model, controller, action){
        if (!model) {
            throw new Error('[ReferenceManager.save] model is null or empty!');
        }
        
        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        
        model.save({
            scope: this,
            success: function (record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[ReferenceManager.save] save and read success : reference.name: ' + model.data.name);

                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'product_reference', 'doAfterThumbnailSaved', this);

                // Display user message
                //Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model, Ext.decode(response._response.responseText));
                }
            }
        });
    },
    
    doAfterThumbnailSaved: function(){
        //this.store.load();
        try{
            Ext.ComponentQuery.query('referenceMain')[0].getController().refresh();
            //this.store.load();
        }catch(ex){}
    },
            
    update: function(model, controller, action){
        if (!model) {
            throw new Error('[ReferenceManager.update] model is null or empty!');
        }

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        model.save({
            scope: this,
            success: function(record, response){

                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'product_reference', 'doAfterThumbnailSaved', this);

                // Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
                if (action === 'doPostEditAction') {
                    controller.doPostEditAction(model, Ext.decode(response._response.responseText));
                }
            }
        });
    },
    
    /**
     * Delete item by id
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    deleteReference: function(id, controller, action){
        if (!id) {
            throw new Error('[ReferenceManager.deleteReference] reference is null or empty!');
        }

        var model = Ext.create('Dashboard.model.Reference', {
            id: id
        });

        model.erase({
            success: function(){
                Dashboard.tool.Utilities.info('[ReferenceManager.deleteReference] success: reference deleted');
                // todo msg
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },
    
    deleteMultiple: function (ids, controller, action) {
        if (!ids || ids.length === 0) {
            throw new Error('[ReferenceManager.deleteMultiple] references is null or empty!');
        }

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/productreference',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'DELETE',
            jsonData: JSON.stringify(ids),
            success: function (response, opts) {
                Dashboard.tool.Utilities.info('[ReferenceManager.deleteMultiple] success: references deleted');
                if (action === 'refresh') {
                    controller.refresh();
                }
            },
            failure: function (response, opts) {
                var message = getText('Failed');
                if (response.responseText) {
                    message = JSON.parse(response.responseText);
                }
                Dashboard.engine.ResponseManager.showErrorMessage(message);
            }
        });
    },
    
    getConfiguration: function(){

        var configuration = {
            enabledTools: {
                create: true,
                edit: true,
                read: false,
                destroy: true,
                duplicate: true,
                exportToFile: true,
                configViewList: true,
                detailToggle: true,
                configDetail: true
            },
            list: {
                viewModelType: 'referenceViewModel',
                viewModelBinding: 'viewListBinding',
                mainProperties: {
                    thumb: 'thumbnailSrc',
                    title: 'designation',
                    subTitle: {
                        property: 'type',
                        label: getText('Type'),
                        style: 'font-size:14px; float: right; text-transform: uppercase;'
                    },
                    properties: [{
                            property: 'referenceCode',
                            label: getText('Code'),
                            type: 'string',
                            style: 'font-size: 14px;'
                        }, {
                            property: 'productCategory.name',//fullPath
                            label: getText('Category')
                        }, {
                            property: 'description',
                            label: getText('Description')
                        }]
                },
                extendedProperties: {
                    properties: []
                }
            },
            album: {
                thumb: 'imageSrc',
                caption: 'designation',
                size: 's',
                properties: [{
                        property: 'referenceCode',
                        label: getText('Code')
                    }, {
                        property: 'type',
                        label: getText('Type'),
                        style: 'font-size:16px;'
                    }, {
                        property: 'productCategory.name',//fullPath
                        label: getText('Category')
                    }, {
                        property: 'description',
                        label: getText('Description')
                    }]

            },
            table: {
                multiSelection: true,
                displayRowNumbers: true,
                displayThumbnail: true,
                columns: [{
                        text: getText('Designation'),
                        lockable: true,
                        width: 300,
                        sortable: true,
                        dataIndex: 'designation'
                    }, {
                        text: getText('Code'),
                        lockable: true,
                        width: 200,
                        sortable: true,
                        dataIndex: 'referenceCode'
                    }, {
                        text: getText('Category'),
                        hidden: false,
                        width: 200,
                        sortable: false,
                        dataIndex: 'productCategory.name', //'productCategory.fullPath'
                        renderer: function(value, metaData, record){
                            return record.getData().productCategory.name; //productCategory.fullPath
                        }
                    }, {
                        text: getText('Type'),
                        // width : 90,
                        flex:1,
                        sortable: true,
                        renderer: function (val) {
                            var type = val ? getText('Items') : getText('Materials set');
                            return '<span>' + type + '</span>';
                        },
                        dataIndex: 'identified'
                    }
//                    , {
//                        text: getText('Last Updated'),
//                        width : 160,
//                        sortable: true,
//                        formatter: 'date("' + getText('m/d/Y') + '")',
//                        dataIndex: 'lastUpdateDate'
//                    }
                ],
                extendedProperties: {
                    properties: []
                }
            }

        };

        return configuration;
    },
    
    getProperties: function(){

        return [
            {
                name: 'codeList.code',
                label: getText('Code RFID'),
                type: 'STRING',
                filterOnly: true
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
                name: 'interventionOrderList.number',
                label: getText('Intervention order'),
                type: 'STRING',
                filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'interventionorders',
                        width: 400
                    }
                })
            }, {
                name: 'referenceCode',
                label: getText('Ref. code'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'referencescode',
                        width: 400
                    }
                })
            }, {
                name: 'designation',
                label: getText('Ref. designation'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'referencesdesignation',
                        width: 400
                    }
                })
            }, {
                name: 'description',
                label: getText('Ref. description'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'referencesdescription',
                        width: 400
                    }
                })
            }, {
                name: 'productCategory.name',//'productCategory.fullPath'
                label: getText('Category'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'categories',
                        width: 400
                    }
                })
            }, {
                name: 'identified',
                label: getText('Type'),
                type: 'BOOLEAN',
                control: Ext.encode({
                    field: {
                        fieldType: 'referencesIdentified',
                        width: 400
                    }
                })
            }
        ];
    },
    
    getNotifEmailProperties: function(){

        return [
            {
                name: 'lastUpdateDate',
                label: getText('Last update date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'referenceCode',
                label: getText('Ref. code'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'referencescode',
                        width: 400
                    }
                })
            }, {
                name: 'designation',
                label: getText('Ref. designation'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'referencesdesignation',
                        width: 400
                    }
                })
            }, {
                name: 'description',
                label: getText('Ref. description'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'referencesdescription',
                        width: 400
                    }
                })
            }, {
                name: 'identified',
                label: getText('Type'),
                type: 'BOOLEAN',
                control: Ext.encode({
                    field: {
                        fieldType: 'referencesIdentified',
                        width: 400
                    }
                })
            }
        ];
    }

});
