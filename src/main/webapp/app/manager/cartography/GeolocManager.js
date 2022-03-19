/* global Ext, moment   */

Ext.define('Dashboard.manager.cartography.GeolocManager', {
    extend: 'Ext.app.Controller',
    alias: 'geolocManager',
    singleton: true,

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.tool.Formatter'
    ],
    
    navigationHistory: [],
    editionMode: false,
    currentLocation: null,
    
    zoom: null,
    mapBounds: null,
    mapCenter: null,
    
    userMaterialsFilters: {},

    loadConfiguration: function (feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try {
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[GeolocManager.loadConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[GeolocManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        
                        this.loadUserConfiguration(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'GeolocManager');
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[GeolocManager.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[GeolocManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[GeolocManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[GeolocManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[GeolocManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[GeolocManager.displayInMain] show cartography Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            if(feature.data.configuration && feature.data.configuration.data.viewListConfiguration){
                configuration = feature.data.configuration.data.viewListConfiguration;
            }
        } catch (ex) {
            Dashboard.tool.Utilities.error('[GeolocManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }
        
        mainController.displayInMain({
            xtype: 'geolocMain',
            configuration: configuration,
            feature: feature
        });
    },
    
    
    
    
    locate: function() {
                        
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        
        function success(pos) {
            var crd = pos.coords;
            console.log('Votre position actuelle est :');
            console.log('Latitude :' + crd.latitude);
            console.log('Longitude :' + crd.longitude);
            console.log('La précision est de ' + crd.accuracy + 'mètres.');
            Dashboard.manager.cartography.GeolocManager.currentLocation = {
                latitude: crd.latitude,
                longitude: crd.longitude
            };
        }

        function error(err) {
            console.warn('ERREUR (${err.code}): ${err.message}');
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options);
        
    },
    
    
   // doPostSaveZoneAction
   
   saveZone: function(model, controller, action){
       
        if (!model) {
            throw new Error('[GeolocManager.saveZone] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        
        model.save({
            scope: this,
            success: function (record, response) {
                                
                switch(action){
                    case 'doPostSaveLinkingZone':
                        controller.doPostSaveLinkingZone(model);
                        break;
                    case 'doPostDeleteElement':
                        controller.doPostDeleteElement(model);
                        break;
                    case 'doPostUpdateConfig':
                        controller.doPostUpdateConfig(model);
                        break;
                }
            },
            failure: function(record, operation) {
                //debugger;
                Dashboard.tool.Utilities.info('[GeolocManager.saveZone] error: recording failure');
            }
        });
       
   },
   
   
   deleteZone: function(id, controller, action) {
        if (!id) {
            throw new Error('[GeolocManager.deleteZone] id is null or empty!');
        }

        var model = Ext.create('Dashboard.model.cartography.OutdoorZone', {
            id: id
        });

        model.erase({
            success: function() {
                
                Dashboard.tool.Utilities.info('[GeolocManager.deleteZone] success: elemnt deleted');

                if (action === 'doPostDeleteElement') {
                    controller.doPostDeleteElement(model);
                }
            }
        });
    },
    
    
    update: function (model, controller, action) {
        if (!model) {
            throw new Error('[GeolocManager.update] model is null or empty!');
        }

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        model = this.encodeOptions(model);
        
        model.save({
            scope: this,
            success: function (record, response) {
                
                model = this.decodeOptions(model);    
                
                switch(action){
                    
                    case 'doPostSaveLinkingZone':
                        controller.doPostSaveLinkingZone(model);
                        break;
                    case 'doPostSaveMapDevice':
                        controller.doPostSaveMapDevice(model);
                        break;
                    case 'doPostSaveMapLocation':
                        controller.doPostSaveMapLocation(model);
                        break;
                    case 'doPostUpdateMap':
                        controller.doPostUpdateMap(model);
                        break;
                    case 'doPostDeleteElement':
                        controller.doPostDeleteElement(model);
                        break;
                    case 'doPostUpdateConfig':
                        controller.doPostUpdateConfig(model);
                        break;
                }
            }
        });
    },
    
    encodeOptions: function(model){
        
//        if(model.data.materialsLayer.options){
//            model.data.materialsLayer.options = Ext.encode(model.data.materialsLayer.options);
//        }
//        if(model.data.locationsLayer.options){
//            model.data.locationsLayer.options = Ext.encode(model.data.locationsLayer.options);
//        }
        if(model.data.linkingZonesLayer.options){
            model.data.linkingZonesLayer.options = Ext.encode(model.data.linkingZonesLayer.options);
        }
//        if(model.data.devicesLayer.options){
//            model.data.devicesLayer.options = Ext.encode(model.data.devicesLayer.options);
//        }
//        if(model.data.labelsLayer && model.data.labelsLayer.options){
//            model.data.labelsLayer.options = Ext.encode(model.data.labelsLayer.options);
//        }
        
        return model;
    },
    

    getConfiguration: function () {

        var configuration = {
            enabledTools: {
                create: false,
                edit: false,
                read: false,
                destroy: false,
                duplicate: false,
                exportToFile: false,
                configViewList: false,
                configDetail: false
            },
                    
            album: {
                thumb: 'imageSrc',
                caption: 'title',
                size: 'm',
                properties: []
            },
            
            table: {

                displayRowNumbers: false,

                columns:[
                    {
                        text     : getText('Name'),
                        locked   : false,
                        flex:1,
                        sortable : true,
                        dataIndex: 'name',
                        cellWrap: false
                    }
                ],
                        
                extendedProperties:{
                    properties:[]
                }
            }
        };

        return configuration;
    },
    
    getProperties: function (action) {

        return [
            {
                name: 'name',
                label: getText('Name'),
                type: 'STRING'
            }, {
                name: 'title',
                label: getText('Title'),
                type: 'STRING'
            }

        ];
    }
                

});