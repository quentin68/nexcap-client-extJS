/* global Ext  */

Ext.define('Dashboard.manager.administration.CategoriesManager', {
    extend: 'Ext.app.Controller',
    alias: 'categoriesManager',
    singleton: true,

    requires: ['Dashboard.tool.Utilities',
        'Dashboard.ux.TreeStateful'],

    store: Ext.create('Dashboard.store.Categories', {
        autoLoad: false,
        leadingBufferZone: 300,
        pageSize: 100
    }),

    loadConfiguration: function (feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {

            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[CategoriesManager.loadConfiguration] error: loading failure');
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
                        Dashboard.tool.Utilities.info('[CategoriesManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        this.loadUserConfiguration(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'CategoriesManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[CategoriesManager.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[CategoriesManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[CategoriesManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[CategoriesManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[CategoriesManager.loadConfiguration] error: ' + err);
        }
    },

    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[CategoriesManager.displayInMain] show categories Management feature');

        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[CategoriesManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'categoryMain',
            store: this.store,
            configuration: configuration,
            feature: feature
        });
    },

    getConfiguration: function () {

        var configuration = {

            enabledTools: {
                create: true,
                edit: true,
                destroy: true,
                duplicate: false,
                exportToFile: false,
                detailToggle: true,
                configDetail: true
            }

        };

        return configuration;

    },

    /**
     * Get one category
     * 
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @returns {undefined}
     */
    getCategory: function (id, controller, action) {

        try {
            Dashboard.model.Category.load(id, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[CategoriesManager.getCategory] error: loading failure');
                },
                success: function (record, operation) {

                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.Category', response.data);

                    Dashboard.tool.Utilities.info('[CategoriesManager.getCategory] loading success. Category: ' + model.data.name);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    } else if (action === 'buildFields') {
                        controller.buildFields(model);
                    }
                },
                callback: function (record, operation, success) {
                    // nothing
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[CategoriesManager.getCategory] error: ' + err);
        }

    },

    save: function (model, controller, action) {
        if (!model) {
            throw new Error('[CategoriesManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function (record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[CategoryManager.save] save and read success : category.name: ' + model.data.name);

                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'product_category', 'doAfterThumbnailSaved', this);

                // Display user message
                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model);
                }
            }
        });
    },

    doAfterThumbnailSaved: function () {
        
       // this.store.load();
        try{
            Ext.ComponentQuery.query('categoryMain')[0].getController().refresh();
            //this.store.load();
        }catch(ex){}
    },

    update: function (model, controller, action) {
        if (!model) {
            throw new Error('[CategoriesManager.update] model is null or empty!');
        }

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function (record, response) {

                Dashboard.manager.administration.FilesManager.saveThumbnail(model.data.id, 'product_category', 'doAfterThumbnailSaved', this);

                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                if (action === 'doPostEditAction') {
                    controller.doPostEditAction(model);
                }
            }
        });
    },

    /**
     * Delete category by id
     * 
     * @param {int} id
     * @param {object} sender (grid, treePanel)
     * @returns {undefined}
     */
    deleteCategory: function (id, controller, action) {
        if (!id) {
            throw new Error('[CategoriesManager.deleteCategory] category is null or empty!');
        }

        var model = Ext.create('Dashboard.model.Category', {
            id: id
        });

        model.erase({
            success: function () {

                Dashboard.tool.Utilities.info('[CategoriesManager.deleteCategory] success: category deleted');

                // todo msg
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },

    getProperties: function () {

        return [
            {
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            }, {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }, 
//            {
//                name: 'fullPath',
//                label: getText('Path'),
//                type: 'STRING'
//            }
            {
                name: 'path',
                label: getText('Path'),
                type: 'STRING'
            }
        ];
    },
    
    getNotifEmailProperties: function () {

        return [
            {
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            }, {
                name: 'description',
                label: getText('Description'),
                type: 'STRING'
            }, 
//            {
//                name: 'fullPath',
//                label: getText('Path'),
//                type: 'STRING'
//            }, 
            {
                name: 'path',
                label: getText('Path'),
                type: 'STRING'
            }
        ];
    }

});