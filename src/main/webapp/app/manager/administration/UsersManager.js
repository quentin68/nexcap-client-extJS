/* global Ext  */

Ext.define('Dashboard.manager.administration.UsersManager', {
    extend: 'Ext.app.Controller',
    alias: 'usersManager',
    singleton: true,

    requires: ['Dashboard.tool.Utilities'],
    
    store: Ext.create('Dashboard.store.Users', {
        autoLoad: false
    }),
    
    config: {
        currentUser: Ext.create('Dashboard.model.User', {
            id: 1,
            sticker: 'admin'
        }),
        token: null,
        expirationDate: null
    },
    
    loadConfiguration: function(feature) {

        feature.data.enabledTools = this.getConfiguration().enabledTools;
        if (feature.data.name === "USER_PROFILE_ADMIN" || feature.data.name === "USER_DEVICE_ADMIN" || feature.data.name === "USER_BOTH_PROFILE_DEVICE_ADMIN") {
            // not allowed to create the User
            feature.data.enabledTools.create = false;
            //not allowed to delete the User
            feature.data.enabledTools.destroy = false;
        }
        try {
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[UsersManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    
                    this.loadUserConfiguration(feature);
                },
                success: function(record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response';
                        }
                        
                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[UsersManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        
                        this.loadUserConfiguration(feature);
                                                
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'UsersManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[UsersManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = this.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[UsersManager.loadUserConfiguration] error: loading failure');
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
                        Dashboard.tool.Utilities.info('[UsersManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[UsersManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[UsersManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature) {

        Dashboard.tool.Utilities.info('[UsersManager.displayInMain] show users Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[UsersManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'userMain',
            store: this.store,
            configuration: configuration,
            feature: feature
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
    getOne: function(id, controller, action) {

        try {
            Dashboard.model.User.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[UserManager.getOne] error: loading failure');
                },
                success: function(record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.User', response.data);

                    if (model.data.properties) {
                        Ext.each(model.data.properties, function(property) {
                            property.configuration.control = Ext.decode(property.configuration.control);
                        });
                    }

                    Dashboard.tool.Utilities.info('[UserManager.getOne] loading success. User: ' + model.data.sticker);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    }else if (action === 'setUserData') {
                        controller.setUserData(model);
                    }
                },
                callback: function(record, operation, success) {
                    // nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[UserManager.getOne] error: ' + err);
        }

    },
    
    save: function(model, controller, action) {
        if (!model) {
            throw new Error('[UserManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function(record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[UserManager.save] save and read success : material.name: ' + model.data.name);

                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'user', 'doAfterThumbnailSaved', this);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model);
                }
            }
        });
    },
    
    update: function(model, controller, action) {
        if (!model) {
            throw new Error('[UserManager.update] model is null or empty!');
        }

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function(record, response) {

                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'user', 'doAfterThumbnailSaved', this);

                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostEditAction') {
                    controller.doPostEditAction(model);
                }
            }
        });
    },
    
    doAfterThumbnailSaved: function() {

        //this.store.load();
        try{
            Ext.ComponentQuery.query('userMain')[0].getController().refresh();
            //this.store.load();
        }catch(ex){}

    },
            
    deleteOne: function(id, controller, action) {
        if (!id) {
            throw new Error('[UserManager.deleteOne] user is null or empty!');
        }

        var model = Ext.create('Dashboard.model.User', {
            id: id
        });

        model.erase({
            success: function() {

                Dashboard.tool.Utilities.info('[UserManager.deleteOne] success: user deleted');

                // todo msg
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },
    
    deleteMultiple: function (ids, controller, action) {
        if (!ids || ids.length === 0) {
            throw new Error('[UserManager.deleteMultiple] users is null or empty!');
        }

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/users',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'DELETE',
            jsonData: JSON.stringify(ids),
            success: function (response, opts) {
                Dashboard.tool.Utilities.info('[UserManager.deleteMultiple] success: users deleted');
                if (action === 'refresh') {
                    controller.refresh();
                }
            },
            failure: function (response, opts) {
                Dashboard.engine.ResponseManager.showFailure(getText('Failed'));
            }
        });
    },
    
    updateMultiple: function (data, controller, action) {
        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/users/multiupdate',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            jsonData: JSON.stringify(data),
            success: function (response, opts) {
                Dashboard.tool.Utilities.info('[UserManager.updateMultiple] success: users updated');
                if (action === 'refresh') {
                    controller.refresh();
                }
            },
            failure: function (response, opts) {
                Dashboard.engine.ResponseManager.showFailure(getText('Failed'));
            }
        });
    },
    
    
    getConfiguration: function() {

        var configuration = {
            enabledTools: {
                create: true,
                edit: true,
                read: false,
                destroy: true,
                duplicate: false,
                exportToFile: true,
                detailToggle: true,
                configDetail: true
            },
            list: {
                viewModelType: 'userViewModel',
                viewModelBinding: 'viewListBinding',
                mainProperties: {
                    thumb: 'thumbnailSrc',
                    title: 'sticker',
                    subTitle: {
                        property: 'activated',
                        label: 'Activated',
                        type: 'string',
                        // style: 'text-transform: uppercase; color: red; float: right; font-size: 14px;',
                        option: {
                            type: 'condition',
                            cases: [{
                                    operator: '=', // 'EQ' | 'CONTAINS' | 'GT' | 'LT'
                                    value: true,
                                    style: 'text-transform: uppercase; color: red; float: right; font-size: 14px;'
                                }, {
                                    operator: false,
                                    value: 'En service',
                                    style: 'text-transform: uppercase; color: green; float: right; font-size: 14px;'
                                }]
                        }
                    },
                    properties: [{
                            property: 'sticker',
                            label: getText('Identifier')
                                    // ,
                                    // style: 'color:red;'
                        }, {
                            property: 'firstName',
                            label: getText('Firstname')
                                    // ,
                                    // style: 'color:red;'
                        }, {
                            property: 'lastName',
                            label: getText('Lastname')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
                        }]
                },
                extendedProperties: {
                    properties: [{
                            property: 'email',
                            label: getText('Email')
                                    // ,
                                    // style: 'color:red;'
                        }, {
                            property: 'lastUpdateDate',
                            label: getText('Last update')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
                        }, {
                            property: 'badgeNumber',
                            label: getText('Badge number')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
                        }]

                }
            },
            album: {
                thumb: 'imageSrc',
                caption: 'sticker',
                size: 's',
                properties: [{
                        property: 'sticker',
                        label: getText('Identifier')
                                // ,
                                // style: 'color:red;'
                    }, {
                        property: 'firstName',
                        label: getText('Firstname')
                                // ,
                                // style: 'color:green; font-size:16px;'
                    }, {
                        property: 'lastName',
                        label: getText('Lastname')
                    }, {
                        property: 'activated',
                        label: 'Activated',
                        option: {
                            type: 'condition',
                            cases: [{
                                    operator: '=', // 'EQ' | 'CONTAINS' | 'GT' | 'LT'
                                    value: false,
                                    style: 'text-transform: uppercase; color: red; float: right; font-size: 14px;'
                                }, {
                                    operator: '=',
                                    value: true,
                                    style: 'text-transform: uppercase; color: green; float: right; font-size: 14px;'
                                }]
                        }
                    }]

            },
            // Grid
            table: {
                multiSelection: true,
                displayRowNumbers: true,
                displayThumbnail: true,
                columns: [{
                        text: getText('Identifier'),
                        locked: true,
                        width: 200,
                        sortable: true,
                        dataIndex: 'sticker',
                        cellWrap: false
                    }, {
                        text: getText('First name'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'firstName',
                        cellWrap: false
                    }, {
                        text: getText('Last name'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'lastName',
                        cellWrap: false
                    }, {
                        text: getText('Technical user'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'technical',
                        cellWrap: false
                    }
                    // ,{
                    // text : getText('Profiles'),
                    // locked : false,
                    // flex : 1,
                    // sortable : false,
                    // dataIndex: 'profilesNames',
                    // cellWrap: true
                    // }
                ],
                extendedProperties: {
                    properties: [{
                            property: 'email',
                            label: getText('Email')
                                    // ,
                                    // style: 'color:red;'
                        }, {
                            property: 'lastUpdateDate',
                            label: getText('Last update')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
                        }, {
                            property: 'badgeNumber',
                            label: getText('Badge number')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
                        }]
                }
            }

        };

        return configuration;

    },
            
    getProperties: function() {

        return [
            {
                name: 'firstName',
                label: getText('First name'),
                type: 'STRING'
            }, {
                name: 'lastName',
                label: getText('Last name'),
                type: 'STRING'
            }, {
                name: 'email',
                label: getText('Email'),
                type: 'STRING'
            },
//            {
//                name: 'badgeNumber',
//                label: getText('Badge number'),
//                type: 'STRING'
//            },
//             {
//                name: 'profilesNames',
//                label: getText('Profiles list'),
//                type: 'STRING'
//             }, 
             {
                name: 'activated',
                label: getText('Activated'),
                type: 'BOOLEAN'
            }, {
                name: 'technical',
                label: getText('Technical user'),
                type: 'BOOLEAN'
            }, {
                name: 'sticker',
                label: getText('Identifier'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'users',
                        width: 400
                    }
                })
            }, {
                name: 'badgeNumber',
                label: getText('Badge number'),
                type: 'STRING',
                control: Ext.encode({
                    field: {
                        fieldType: 'badgenumber',
                        width: 400
                    }
                })
            }, {
                name: 'profiles.name',
                label: getText('Profiles list'),
                type: 'STRING',
                filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'profiles',
                        width: 400
                    }
                })
            }
            /* 0007364
             * , {
                name: 'authorizedLocations.address',
                label: getText('Address'),
                type: 'STRING',
                filterOnly: true,
                control: Ext.encode({
                    field: {
                        fieldType: 'address',
                        width: 400
                    }
                })
            } */
        ];
    },
    
    getConfigurableProperties: function() {

        return [
            {
                name: 'firstName',
                label: getText('First name'),
                type: 'STRING'
            }, {
                name: 'lastName',
                label: getText('Last name'),
                type: 'STRING'
            }, {
                name: 'firstNameLastName',
                label: getText('First name / Last name'),
                type: 'STRING'
            }, {
                name: 'email',
                label: getText('Email'),
                type: 'STRING'
            }, {
                name: 'sticker',
                label: getText('Identifier'),
                type: 'STRING'
            }, {
                name: 'login',
                label: getText('Login'),
                type: 'STRING'
            }, 
//            {
//                name: 'pin',
//                label: getText('Pin code'),
//                type: 'STRING'
//            }, 
            {
                name: 'badgeNumber',
                label: getText('Badge number'),
                type: 'STRING'
            }
        ];
    }

});