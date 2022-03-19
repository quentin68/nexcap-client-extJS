/* global Ext  */
Ext.define('Dashboard.manager.system.ImportManager', {
    extend: 'Ext.app.Controller',
    alias: 'importManager',
    singleton: true,

    requires: ['Dashboard.tool.Utilities'],

    store: Ext.create('Dashboard.store.system.Import', {
        autoLoad: false,
        sorters: [{
                property: 'filename',
                direction: 'ASC'
            }]
    }),

    loadConfiguration: function (feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;

        try {
            
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[ImportManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                },
                success: function (record, operation) {
                    try {
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        // mantis : 6843
                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response'; // If error is not thrown, for some reason
                        }

                        var model = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        feature.data.configuration = model;
                        
                        Dashboard.tool.Utilities.info('[ImportManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        this.loadUserConfiguration(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'ImportManager'); // 6843
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ImportManager.loadConfiguration] error: ' + err);
        }

    },
    
    
    loadUserConfiguration: function(feature){
                        
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key = feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ImportManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[ImportManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[ImportManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ImportManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[ImportManager.displayInMain] show import Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            configuration = feature.data.configuration.data.viewListConfiguration;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[ImportManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }

        mainController.displayInMain({
            xtype: 'importMain',
            store: this.store,
            configuration: configuration, // default conf
            feature: feature
        });
    },

    getConfiguration: function () {

        var configuration = {
            enabledTools: {
                create: true,
                read: false,
                destroy: false,
                configViewList: true,
                detailToggle: true
            },
            list: {
                viewModelType: 'importViewModel',
                viewModelBinding: 'viewListBinding',
                mainProperties: {
                    title: 'filename',
                    properties: [{
                            property: 'username',
                            label: getText('Author'),
                            type: 'string',
                            style: 'font-size: 14px;'
                        }, {
                            property: 'importationDate',
                            label: getText('Date')
                        }, {
                            property: 'nbErrors',
                            label: getText('Errors')
                        }]
                },
                extendedProperties: {
                    properties: []
                }
            },
            
            // Grid
            table: {
                multiSelection: true,
                displayRowNumbers: true,
                columns: [{
                        text: getText('File name'),
                        width: 200,
                        sortable: true,
                        dataIndex: 'filename',
                        cellWrap: false
                    }, {
                        text: getText('Author'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'username'
                    }, {
                        text: getText('Date'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'importationDate'
                    }, {
                        text: getText('Errors'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'nbErrors'
                    }, {
                        text: getText('Processed lines'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'nbProcessedLines'
                    }, {
                        text: getText('Mistaken lines'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'nbMistakenLines'
                    }, {
                        text: getText('Ignored lines'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'nbIgnoredLines'
                    }, {
                        text: getText('Import status'),
                        lockable: false,
                        width: 200,
                        sortable: true,
                        dataIndex: 'importStatus',
                        renderer: function(val){
                            return getText(val);                           
                        }
                    }
                ]
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
    getOne: function(id, controller, action){
        
        try{
            Dashboard.model.system.Import.load(id, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[ImportManager.getOne] error: loading failure');
                },
                success: function(record, operation) {
                    
                    var response = Ext.decode(operation._response.responseText);
                    var model = Ext.create('Dashboard.model.system.Import', response.data);
                    
                    Dashboard.tool.Utilities.info(
                            '[ImportManager.getOne] loading success. Import.id='+ model.data.id);
                                        
                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    } 
                },
                callback: function(record, operation, success) {
                    //nothing
                }
            });
            
        } catch(err){
            Dashboard.tool.Utilities.error('[ImportManager.getOne] error: ' + err);
        }

    },

    importFile: function (imports, context, callBack, form) {
        
        var link = '/import/file/';
        
        var win = form.up('window');
        var file = win.down('fileuploadfield').fileInputEl.dom.files[0];
        var data = new FormData();
        data.append('file', file);

        var token;
        if (Dashboard.manager.administration.UsersManager.getToken()) {
            token = Dashboard.manager.administration.UsersManager.getToken();
        }
        else {
            token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
        }
        
        var myMask = new Ext.LoadMask({
            msg    : getText('Uploading') + '...',
            target : win
        });

        myMask.show();
        
        Ext.Ajax.request({
            url : Dashboard.config.Config.SERVER_HOST_NAME_ASYNC + link,
            rawData: data,
            headers: {
                'Content-Type':'multipart/form-data',
                Authorization: 'Bearer ' + token
            },
            method: 'POST',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            success: function (response, result) {
                
                myMask.hide();
                Dashboard.engine.ResponseManager.showSuccess(response);
                win.close();
                Dashboard.tool.Utilities.info('saveFile : ok');
                
            },
            failure: function (form, result) {
                                
                myMask.hide();
                                
                //CORS patch
                var response = result.response.statusText;
                if(response.indexOf('Blocked a frame with origin') !== -1){
                    
                    win.close();
                                        
                    var main = Ext.ComponentQuery.query('importMain')[0];
                    Ext.Msg.alert(getText('Info'), getText('The file has been sent ...'), Ext.emptyFn);
                    
                    try{
                        setTimeout(function() { main.getController().refresh(); }, 2000);
                    }catch(ex){
                        // 
                    }
                    
//                    if (result.callBack === 'doPostSaveAction') {
//                        form.doPostSaveAction();
//                    }
                }else{
                    Dashboard.tool.Utilities.error('saveFile : error');
                }
            }
        });
        
    },
    
    deleteImport: function (id, controller, action) {
        if (!id) {
            throw new Error('[ImportManager.deleteImport] import is null or empty!');
        }

        var imports = Ext.create('Dashboard.model.system.Import', {
            id: id
        });

        imports.erase({
            success: function () {

                Dashboard.tool.Utilities.info('[ImportManager.deleteImport] success: import deleted');

                // todo msg
                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },
    
    deleteMultiple: function (ids, controller, action) {
        if (!ids || ids.length === 0) {
            throw new Error('[ImportManager.deleteMultiple] import is null or empty!');
        }

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/import/',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'DELETE',
            jsonData: JSON.stringify(ids),
            success: function (response, opts) {
                Dashboard.tool.Utilities.info('[ImportManager.deleteMultiple] success: imports deleted');
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
                name: 'filename',
                label: getText('File name'),
                type: 'STRING'
            }, {
                name: 'username',
                label: getText('Author'),
                type: 'STRING'
            }, {
                name: 'importationDate',
                label: getText('Date'),
                type: 'DATETIME',
                control: Ext.encode({
                    field: {
                        fieldType: 'datesrange'
                    }
                })
            }, {
                name: 'nbErrors',
                label: getText('Errors'),
                type: 'INT'
            }, {
                name: 'nbProcessedLines',
                label: getText('Processed lines'),
                type: 'INT'
            }, {
                name: 'nbMistakenLines',
                label: getText('Mistaken lines'),
                type: 'INT'
            }, {
                name: 'nbIgnoredLines',
                label: getText('Ignored lines'),
                type: 'INT'
            }, {
                name: 'importStatus',
                label: getText('Import status'),
                type: 'STRING',
                renderer: function(val){
                    return getText(val);                           
                }
            }

        ];
    }

});