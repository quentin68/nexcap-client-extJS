/* global Ext  */

Ext.define('Dashboard.manager.administration.TelemetryDataManager', {
    extend: 'Ext.app.Controller',
    alias: 'telemetryDataManager',
    singleton: true,

    requires: ['Dashboard.tool.Utilities'],
    
    store: Ext.create('Dashboard.store.administration.TelemetryData', {
        autoLoad: false
    }),

    
    loadConfiguration: function(feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try {
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[TelemetryDataManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[TelemetryDataManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        
                        this.loadUserConfiguration(feature);
                                                
                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'TelemetryDataManager');
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[TelemetryDataManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[TelemetryDataManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[TelemetryDataManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[TelemetryDataManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[TelemetryDataManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function(feature) {

        Dashboard.tool.Utilities.info('[TelemetryDataManager.displayInMain] show users Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[TelemetryDataManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'telemetryDataMain',
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
            Dashboard.model.administration.TelemetryData.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[TelemetryDataManager.getOne] error: loading failure');
                },
                success: function(record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.administration.TelemetryData', response.data);

                    if (model.data.properties) {
                        Ext.each(model.data.properties, function(property) {
                            try{
                                property.configuration.control = Ext.decode(property.configuration.control);
                            }catch(exeption){
                                Dashboard.tool.Utilities.error('[TelemetryDataManager.getOne] /get properties error: ' + exeption);
                            }
                        });
                    }

                    Dashboard.tool.Utilities.info('[TelemetryDataManager.getOne] loading success. User: ' + model.data.sticker);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    }
                },
                callback: function(record, operation, success) {
                    // nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[TelemetryDataManager.getOne] error: ' + err);
        }

    },
    
    save: function(model, controller, action) {
        if (!model) {
            throw new Error('[TelemetryDataManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function(record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[TelemetryDataManager.save] save and read success : name: ' + model.data.name);

                //Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'sensor', 'doAfterThumbnailSaved', this);

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
            throw new Error('[TelemetryDataManager.update] model is null or empty!');
        }

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function(record, response) {

                //Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'sensor', 'doAfterThumbnailSaved', this);

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
            Ext.ComponentQuery.query('telemetryDataMain')[0].getController().refresh();
            //this.store.load();
        }catch(ex){}

    },
            
    deleteOne: function(id, controller, action) {
        
        if (!id) {
            throw new Error('[TelemetryDataManager.deleteOne] user is null or empty!');
        }

        var model = Ext.create('Dashboard.model.administration.TelemetryData', {
            id: id
        });

        model.erase({
            success: function() {

                Dashboard.tool.Utilities.info('[TelemetryDataManager.deleteOne] success: telemetryData deleted');

                // todo msg
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },
    
    deleteMultiple: function (ids, controller, action) {
        if (!ids || ids.length === 0) {
            throw new Error('[TelemetryDataManager.deleteMultiple] users is null or empty!');
        }

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/sensor',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'DELETE',
            jsonData: JSON.stringify(ids),
            success: function (response, opts) {
                Dashboard.tool.Utilities.info('[TelemetryDataManager.deleteMultiple] success: telemetry data deleted');
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
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/sensor/multiupdate',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'POST',
            jsonData: JSON.stringify(data),
            success: function (response, opts) {
                Dashboard.tool.Utilities.info('[TelemetryDataManager.updateMultiple] success: telemetry data updated');
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
                toggle: false,
                duplicate: false,
                exportToFile: true,
                detailToggle: true,
                configViewList: true,
                configDetail: false
            },
            
            // Grid
            table: {
                
                multiSelection: false,
                displayRowNumbers: true,
                
                columns: [
                    {
                        text: getText('Name'),
                        locked: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'name',
                        cellWrap: false
                    }, {
                        text: getText('Value'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'value',
                        cellWrap: false
                    }, {
                        text: getText('Description'),
                        locked: false,
                        flex: 1,
                        sortable: true,
                        dataIndex: 'description',
                        cellWrap: false
                    }
                ],
                extendedProperties: {
                    properties: [
                        {
                            property: 'Description',
                            label: getText('description')
                                    // ,
                                    // style: 'color:red;'
                        }, {
                            property: 'lastUpdateDate',
                            label: getText('Last update')
                                    // ,
                                    // style: 'color:green; font-size:16px;'
                        }
                    ]
                }
            }

        };

        return configuration;

    },
            
    getProperties: function() {

        return [
            {
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            }, {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }, {
                name: 'value',
                label: getText('Value'),
                type: 'STRING'
            }, {
                name: 'sensorType.name',
                label: getText('Type'),
                type: 'STRING'
            }, {
                name: 'processors.name',
                label: getText('Processor'),
                type: 'STRING'
            }
        ];
    }

});