/* global Ext */
Ext.define('Dashboard.manager.system.DynamicPropertiesManager', {
    extend: 'Ext.app.Controller',
    alias: 'dynamicPropertiesManager',
    singleton: true,

    requires: ['Dashboard.tool.Utilities'],

    store: Ext.create('Dashboard.store.properties.Properties', {
        autoLoad: false,
        sorters: [
            {
                property: 'name',
                direction: 'ASC'
            }
        ]
    }),

    className: 'MainController',

    loadConfiguration: function (feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[' + this.className + '.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function (record, operation) {
                    try {
                        var response = Ext.decode(operation._response.responseText);
                        var model = Ext.create('Dashboard.model.FeatureConfiguration', Ext.decode(response.data, true)); // mantis : 6843
                        // 'true' => Ext.decode returns 'undefined' in case of a JSON error
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[' + this.className + '.loadConfiguration] loading success. Feature: ' + model.data.featureName);

                        this.loadUserConfiguration(feature);
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[' + this.className + '.loadConfiguration] decoding response error');
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[' + this.className + '.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[DynamicPropertiesManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[DynamicPropertiesManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[DynamicPropertiesManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[DynamicPropertiesManager.loadConfiguration] error: ' + err);
        }
    },

    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[' + this.className + '.displayInMain] show profile Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[' + this.className + '.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'dynamicPropertiesMain',
            store: this.store,
            configuration: configuration,
            feature: feature,
            tag: 'main'
        });
    },

    getConfiguration: function () {

        var configuration = {

            enabledTools: {
                create: true,
                edit: true,
                read: false,
                destroy: true,
                authorize: false,
                acknowledged: false,
                duplicate: false,
                exportToFile: false,
                configViewList: true,
                detailToggle: true
            },

            // Grid
            table: {

                displayRowNumbers: false,

                columns: [
                    {
                        text: getText('Name'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'name',
                        cellWrap: false
                    }, {
                        text: getText('Label'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'label',
                        cellWrap: false
                    }, {
                        text: getText('Type'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'type',
                        cellWrap: false
                    }, {
                        text: getText('Valorization'),//getText('Linked object'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'propertyConfigurationType',
                        cellWrap: false
                    }, {
                        text: getText('Origin'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'origin',
                        cellWrap: false
                    }
                ],

                extendedProperties: {
                    properties: [
                        {
                            label: getText('Name'),
                            property: 'name'
                        }, {
                            label: getText('Type'),
                            property: 'type'
                        }, {
                            label: getText('Label'),
                            property: 'label'
                        }, {
                            label: getText('Displayed on devices'),
                            property: 'isDisplayed'
                        }, {
                            label: getText('Editable'),
                            property: 'isEditable'
                        }, {
                            label: getText('System'),
                            property: 'isSystem'
                        }, {
                            label: getText('Valorization'),//getText('Linked object'),
                            property: 'propertyConfigurationType'
                        }
                    ]
                }
            }

        };

        return configuration;
    },
    
    getByConfigurationType: function (data, controller, action) {
        
        var propertiesStore = Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().extraParams.filter = [{
                            property: 'propertyConfigurationType',
                            value: data.propertyConfigurationType,
                            type: 'ENUM',
                            comparison: 'EQ'
                        }];
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                    
                    var propConfigArray = [];
                    
                    store.data.items.forEach(function (item) {
                        propConfigArray.push(Ext.create('Dashboard.model.PropertyConfiguration', item.data));
                    });
                                        
                    if (action === 'onUserCreatePropertiesLoad') {
                        controller.onUserCreatePropertiesLoad(propConfigArray, data.securityConfiguration);
                    } else if (action === 'onUserEditPropertiesLoad') {
                        controller.onUserEditPropertiesLoad(data.model, propConfigArray, data.securityConfiguration);
                    } else if (action === 'onLocationCreatePropertiesLoad') {
                        controller.onLocationCreatePropertiesLoad(propConfigArray);
                    } else if (action === 'onLocationEditPropertiesLoad') {
                        controller.onLocationEditPropertiesLoad(data.model, propConfigArray);
                    } 
                }
            }
        });
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
            Dashboard.model.PropertyConfiguration.load(id, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[' + this.className + '.getOne] error: loading failure');
                },
                success: function (record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.PropertyConfiguration', response.data);

                    Dashboard.tool.Utilities.info('[' + this.className + '.getOne] loading success. Property: ' + model.data.name);

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
            Dashboard.tool.Utilities.error('[' + this.className + '.getOne] error: ' + err);
        }
    },
    

    getLinkedObject: function (propertyName, controller, action) {
        try {
            if (propertyName.trim() === '') {
                Dashboard.tool.Utilities.error('[' + this.className + '.getLinkedObject] Empty propertyName');
                return;
            }

            Ext.Ajax.request({
                url: Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties/linkedobject/' + propertyName,
                cors: true,
                useDefaultXhrHeader: false,
                withCredentials: true,
                
                method: 'GET',
                success: function (response, opts) {
                    var model = JSON.parse(response.responseText);
                    if (action === 'displayLinkedObject') {
                        controller.displayLinkedObject(model.data);
                        return;
                    }
                    Dashboard.tool.Utilities.error('[' + this.className + '.getLinkedObject] unsupported action : ' + action);
                }, failure: function (response, opts) {
                    Dashboard.tool.Utilities.info('[' + this.className + '.getLinkedObject] error: loading failure');
                }
            });
        } catch (err) {
            Dashboard.tool.Utilities.error('[' + this.className + '.getLinkedObject] error: ' + err);
        }
    },



    deleteOne: function (id, controller, action) {
        if (!id) {
            throw new Error('[' + this.className + '.deleteOne] user is null or empty!');
        }

        var model = Ext.create('Dashboard.model.PropertyConfiguration', {
            id: id
        });

        model.erase({
            success: function () {

                Dashboard.tool.Utilities.info('[' + this.className + '.deleteOne] success: deleted');

                // todo msg
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },

    save: function (model, controller, action) {
        if (!model) {
            throw new Error('[DynamicPropertiesManager.save] model is null or empty!');
        }

        delete model.data.id;

        model.save({
            success: function (record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[DynamicPropertiesManager.save] save and read success : property.name: ' + model.data.name);
                // Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostActionSaveProperty') {
                    controller.doPostActionSaveProperty(model);
                }
            }
        });
    },

    update: function (model, controller, action) {
        if (!model) {
            throw new Error('[DynamicPropertiesManager.update] model is null or empty!');
        }

        model.save({
            success: function (record, response) {

                // this.saveThumbnail(model);

                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostUpdateAction') {
                    controller.doPostUpdateAction(); // not used ?
                }

                if (action === 'doPostActionEditProperty') {
                    controller.doPostActionEditProperty(model);
                }
            }
        });
    },

    getProperties: function () {

        return [
            {
                label: getText('Name'),
                name: 'name',
                type: 'STRING'
            }, {
                label: getText('Type'),
                name: 'type',
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'propertyType',
                        width: 400
                    }
                })
            }, {
                label: getText('Label'),
                name: 'label',
                type: 'STRING'
            }, {
                label: getText('Editable'),
                name: 'isEditable',
                type: 'BOOLEAN'
            }, {
                label: getText('Displayed on devices'),
                name: 'isDisplayed',
                type: 'BOOLEAN'
            }, {
                label: getText('System'),
                name: 'isSystem',
                type: 'BOOLEAN'
            }, {
                label: getText('Valorization'),//getText('Linked object'),
                name: 'propertyConfigurationType',
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'propertyConfigurationType',
                        width: 400
                    }
                })
            }, {
                label: getText('Origin'),
                name: 'origin',
                type: 'STRING'//,
//                control: Ext.encode({
//                    field: {
//                        fieldType: 'propertyConfigurationType',
//                        width: 400
//                    }
//                })
            }
        ];
    }

});
