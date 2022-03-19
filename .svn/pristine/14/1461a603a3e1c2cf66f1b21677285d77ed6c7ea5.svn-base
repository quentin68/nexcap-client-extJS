/* global Ext, moment   */

Ext.define('Dashboard.manager.cartography.CartographyManager', {
    extend: 'Ext.app.Controller',
    alias: 'cartographyManager',
    singleton: true,

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.tool.Formatter'
    ],

    store: Ext.create('Dashboard.store.cartography.Maps', {
        autoLoad: false
    }),
    
    storeWithMaterialsFilter: Ext.create('Dashboard.store.cartography.MapsWithMaterialsFilter', {
        autoLoad: false
    }),
    
    navigationHistory: [],
    editionMode: false,
    
    userMaterialsFilters: {},

    loadConfiguration: function (feature) {
        
        feature.data.enabledTools = this.getConfiguration().enabledTools;
        
        try {
            Dashboard.model.FeatureConfiguration.load(feature.data.name, {
                scope: this,
                failure: function (record, operation) {
                    Dashboard.tool.Utilities.info('[CartographyManager.loadConfiguration] error: loading failure');
                    delete feature.data.configuration;
                    this.loadUserConfiguration(feature);
                    //this.displayInMain(feature);
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
                        
                        Dashboard.tool.Utilities.info('[CartographyManager.loadConfiguration] loading success. Feature: ' + model.data.featureName);
                        
                        this.loadUserConfiguration(feature);
                        //this.displayInMain(feature);

                    } catch (ex) {
                        Dashboard.manager.FeaturesManager.deleteFeature(feature.data.name, 'CartographyManager');
                    }
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[CartographyManager.loadConfiguration] error: ' + err);
        }

    },
    
    loadUserConfiguration: function(feature){
                
        try {
            
            var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var key =  feature.data.name;
            
            Dashboard.model.UserConfiguration.load(key, {
                scope: this,
                failure: function(record, operation) {
                    Dashboard.tool.Utilities.info('[CartographyManager.loadUserConfiguration] error: loading failure');
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
                        
                        Dashboard.tool.Utilities.info('[CartographyManager.loadUserConfiguration] loading success. Feature: ' + configuration.data.featureName);
                                                                        
                    } catch (ex) {
                        Dashboard.tool.Utilities.error('[CartographyManager.loadUserConfiguration] loading error: ' + ex);
                    }
                    
                    this.displayInMain(feature);
                }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[CartographyManager.loadConfiguration] error: ' + err);
        }
    },
    
    
    displayInMain: function (feature) {

        Dashboard.tool.Utilities.info('[CartographyManager.displayInMain] show cartography Management feature');
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();

        var configuration = null;
        try {
            if(feature.data.configuration && feature.data.configuration.data.viewListConfiguration){
                configuration = feature.data.configuration.data.viewListConfiguration;
            }
        } catch (ex) {
            Dashboard.tool.Utilities.error('[CartographyManager.displayInMain] configuration error: ' + ex);
        }
        if (!configuration) {
            configuration = this.getConfiguration();
        }
        
        mainController.displayInMain({
            xtype: 'cartographyMain',
            store: this.store,
            configuration: configuration,
            feature: feature
        });
    },

    getConfiguration: function () {

        var configuration = {
            enabledTools: {
                create: true,
                edit: false,
                read: true,
                destroy: true,
                duplicate: false,
                exportToFile: false,
                configViewList: false,
                configDetail: true
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
            

    /**
     * 
     * @param {type} id
     * @param {type} controller
     * @param {type} action
     * @param {type} filters
     * @returns {undefined}
     */
    getOne: function (id, controller, action, filters) {
        
        this.getOneWidthFilters(id, controller, action, filters);

    },
    
    
    getOneWidthFilters: function (id, controller, action, filters) {
                
        if (!id) {
            Dashboard.tool.Utilities.error('[getOneWidthFilters.getOne] id null or empty !');
        }
        
        var currentMapFilter = {
            property: 'id',
            comparison: 'EQ',
            value: id,
            type: 'LONG'
        };

        try {

            var store = this.storeWithMaterialsFilter;
            store.getProxy().extraParams.materialsFilters = [];
            
            var materialsFilters = [];
            
            if(filters && filters.length > 0){
                materialsFilters = filters;
                if(this.editionMode !== true){
                    store.getProxy().extraParams.materialsFilters = materialsFilters;
                }
            }
            
            store.getProxy().extraParams.filter = [];
            store.getProxy().extraParams.filter.push(currentMapFilter);
            
             store.loadPage(1, {
                scope: this,
                callback: function(records, operation, success) {
                    
                    if(!success){
                        Dashboard.tool.Utilities.info('[CartographyManager.getOneWithMaterialsFilters] error: loading failure');
                        return;
                    }
                    
                    var model = records[0];
//                                        
                    model = this.decodeOptions(model);
                    model = this.fillDisplayedFields(model);
                    model = this.applyDisplayingRules(model);
                    
                    Dashboard.tool.Utilities.info('[CartographyManager.getOne] loading success. Map: ' + model.data.name);

                    if (action === 'edit') {
                        controller.edit(model);
                    } else if (action === 'displayDetail') {
                        controller.displayDetail(model);
                    } else if (action === 'displayMap') {
                        controller.displayMap(model);
                    } else if (action === 'returnToMap') {
                        controller.returnToMap(model);
                    } else if (action === 'doPostEditAction'){
                        controller.doPostEditAction(model);
                    } else if (action === 'displayIndoorMap'){
                        controller.displayIndoorMap(model);
                    }
                }
            }); 
            
        } catch (err) {
            Dashboard.tool.Utilities.error('[CartographyManager.getOneWidthFilters] error: ' + err);
        }
    },
    
    
    decodeOptions: function(model){
        
        if(model.data.materialsLayer.options){
            model.data.materialsLayer.options = Ext.decode(model.data.materialsLayer.options);
        }
        if(model.data.locationsLayer.options){
            model.data.locationsLayer.options = Ext.decode(model.data.locationsLayer.options);
        }
        if(model.data.linkingZonesLayer.options){
            model.data.linkingZonesLayer.options = Ext.decode(model.data.linkingZonesLayer.options);
        }
        if(model.data.devicesLayer.options){
            model.data.devicesLayer.options = Ext.decode(model.data.devicesLayer.options);
        }
        if(model.data.labelsLayer && model.data.labelsLayer.options){
            model.data.labelsLayer.options = Ext.decode(model.data.labelsLayer.options);
        }
        
        return model;
    },
    
    
    encodeOptions: function(model){
        
        if(model.data.materialsLayer.options){
            model.data.materialsLayer.options = Ext.encode(model.data.materialsLayer.options);
        }
        if(model.data.locationsLayer.options){
            model.data.locationsLayer.options = Ext.encode(model.data.locationsLayer.options);
        }
        if(model.data.linkingZonesLayer.options){
            model.data.linkingZonesLayer.options = Ext.encode(model.data.linkingZonesLayer.options);
        }
        if(model.data.devicesLayer.options){
            model.data.devicesLayer.options = Ext.encode(model.data.devicesLayer.options);
        }
        if(model.data.labelsLayer && model.data.labelsLayer.options){
            model.data.labelsLayer.options = Ext.encode(model.data.labelsLayer.options);
        }
        
        return model;
    },
    
    
    fillDisplayedFields: function(model){
        
        if(!model.data.materialsLayer.options){
            console.log('[CartographyManager.fillDisplayedFields] materialsLayer.options null or empty');
            return;
        }
        
        if(!model.data.materialsLayer.options.displayedFields){
            model.data.materialsLayer.options.displayedFields = [];
            return model;
        }
        
        var mapMaterials = model.data.materialsLayer.mapMaterials;
        var displayedFields = model.data.materialsLayer.options.displayedFields;
        
        if(displayedFields.length < 1){
            return model;
        }
                
        for(var i=0; i<mapMaterials.length; i++ ){
                        
            var mapMaterial = mapMaterials[i];
            mapMaterial.informationBubble = [];
            
            for(var j=0; j< displayedFields.length; j++){
                
                var field = displayedFields[j];
                var value = null;
                
                //propertyConfigurationType //dynamicPropertiesContext
                if(field.dynamicPropertiesContext !== undefined && field.dynamicPropertiesContext === ''){
                    try{
                        value = eval('mapMaterial.material.' + field.name);
                    }catch(ex){};
                }else{
                    try{
                        for(var k=0; k < mapMaterial.material.properties.length; k++ ){
                            if(mapMaterial.material.properties[k].name === displayedFields[j].name){
                                value = mapMaterial.material.properties[k].value;
                            }
                        }
                    }catch(ex){};
                }
                
                value = Dashboard.tool.Formatter.valueFormatter(field.name, field.type, value);
                
                mapMaterial.informationBubble.push({
                    propertyLabel: field.label,
                    value: value,
                    propertyType: field.type
                });
            }
        };
        
        return model;
    },
    
    
    applyDisplayingRules: function(model){
        
        if(!model.data.materialsLayer.options){
            console.log('[CartographyManager.applyDisplayingRules] materialsLayer.options null or empty');
            return;
        }
        
        if(!model.data.materialsLayer.options.displayingRules){
            model.data.materialsLayer.options.displayingRules = [];
            return model;
        }
        
        var mapMaterials = model.data.materialsLayer.mapMaterials;
        var displayingRules = model.data.materialsLayer.options.displayingRules;
        
        if(/*displayingRules.length < 1 || */mapMaterials.length < 1){
            return model;
        }
                
        
        Ext.each(mapMaterials, function(mapMaterial){
            var hasRule = false;
            
            Ext.each(displayingRules, function(rule){
                                
                var value;
                if(rule.isDynamicProperty === true){
                    try{
                        Ext.each(mapMaterial.material.properties, function(property){
                            if(property.name === rule.name){
                                value = property.value;
                            }
                        });
                    }catch(ex){};
                   
                }else{
                    try{
                        value = eval('mapMaterial.material.' + rule.name);
                    }catch(ex){};
                }
                        
                try{
                    if(this.checkRule(rule, value)){
                        mapMaterial.color = rule.color;
                        mapMaterial.icon = rule.iconSrc;
                        hasRule = true;
                    }
                }catch(ex){
                    Dashboard.tool.Utilities.error('[CartographyManager.checkRule] error: ' + ex);
                }
                
            }, this);
            
            if(hasRule === false){
                mapMaterial.color = mapMaterial.name;
                mapMaterial.icon = null;
            }
            
        }, this);

        return model;
       
    },
    
    
    checkRule: function(rule, value){
        
        if(!value){
            return false;
        }
        
        if(rule.comparison === 'IS_NULL' && !value){
            return true;
        }
        
        if(rule.comparison === 'IS_NOT_NULL' && value){
            return true;
        }
                
        switch(rule.type){
            case 'STRING':
                break;
            case 'INT':
            case 'LONG':
            case 'FLOAT':
                value = parseFloat(value);
                break;
            case 'DATE':
            case 'DATETIME':
                value = moment(rule.type).toDate();
                break;
            case 'BOOLEAN':
                value = JSON.parse(rule.type);
                if(value){
                    value = 'Yes';
                }else{
                    value = 'No';
                }
                break;
            default:
                //nothing
        }
        
//        if(rule.type === 'LONG' || rule.type === 'INT' || rule.type === 'NUMERIC' || rule.type === 'NUMBER'){
//            value = parseFloat(value);
//            
//        }else if(rule.type === 'BOOLEAN'){
//            JSON.parse(rule.type);
//            
//        }else if(rule.type === 'DATE' || rule.type === 'DATETIME' || rule.type === 'DATES_RANGE'){
//            moment(rule.type).toDate();
//        }
        
        switch(rule.comparison){
            case 'GT':
                return this.isGreater(value, rule.value);
                break;
            case 'LT':
                return this.isLower(value, rule.value);
                break;
            case 'EQ':
                return this.isEquals(value, rule.value);
                break;
            case 'NE':
                return !this.isEquals(value, rule.value);
                break;
            case 'IN':
                return this.isIn(value, rule.value);
                break;
            case 'CONTAINS':
                return this.isContains(value, rule.value);
                break;
            case 'STARTSWITH':
                return this.isStartWith(value, rule.value);
                break;
            case 'ENDSWITH':
                return this.isEndWidth(value, rule.value);
                break;
            default:
                //nothing
        }
        
        return false;
    },
    
    
    isGreater: function (val1, val2) {
        if (!val1 || !val2) {
            return false;
        }
        return val1 > val2;
    },
    
    isLower: function(val1, val2){
        if (!val1 || !val2) {
            return false;
        }
        return val1 < val2;
    },
    
    isEquals: function (val1, val2) {
        if (!val1 || !val2) {
            return false;
        }
        
        if(typeof(val1) === 'string' || typeof(val2) === 'string'){
            val1 = val1.toString().toLowerCase();
        }   val2 = val2.toString().toLowerCase();
        
        if (val1 === val2) {
            return true;
        }
        
        return false;
    },
    
    isIn: function(val1, val2){
        if (!val1 || !val2) {
            return false;
        }
        if(val2.toLowerCase().indexOf(val1.toLowerCase()) !== -1){
            return true;
        }
        return false;
    },
    
    isContains: function(val1, val2){
        if(val1.toLowerCase().indexOf(val2.toLowerCase()) !== -1){
            return true;
        }
        return false;
    },
    
    isStartWith: function(val1, val2){
        if(val1.toLowerCase().indexOf(val2.toLowerCase()) === 0){
            return true;
        }
        return false;
    },
    
    isEndWith: function(val1, val2){
        return val1.toLowerCase().endsWith(val2.toLowerCase());
    },
    

    save: function (model, controller, action) {
        if (!model) {
            throw new Error('[CartographyManager.save] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        
        model = this.encodeOptions(model);
        
        model.save({
            scope: this,
            success: function (record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[CartographyManager.save] save and read success : map.name: ' + model.data.name);

                Dashboard.manager.administration.FilesManager.saveThumbnail(
                        model.data.id, 'cartomap', 'doAfterThumbnailSaved', this, null, '/carto');  //modelId, modelName, callBack, scope, unsecured, url

                Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));

                model = this.decodeOptions(model);
                
                if (action === 'doPostSaveAction') {
                    controller.doPostSaveAction(model);
                }
            }
        });
    },
    
       

    update: function (model, controller, action) {
        if (!model) {
            throw new Error('[CartographyManager.update] model is null or empty!');
        }

        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');
        model = this.encodeOptions(model);
        
        model.save({
            scope: this,
            success: function (record, response) {
                
                model = this.decodeOptions(model);
     
                if(action === 'doPostUpdateMap'){
                    Dashboard.manager.administration.FilesManager.saveThumbnail(
                           model.data.id, 'cartomap', 'doAfterThumbnailSaved', controller, null, '/carto'); //modelId, modelName, callBack, scope, unsecured, url
                   Dashboard.engine.ResponseManager.showSuccess(Ext.decode(response._response.responseText));
                }      
                
                switch(action){
                    
                    case 'doPostSaveMapMaterial':
                        controller.doPostSaveMapMaterial(model);
                        break;
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
                    case 'doPostSaveMapLabel':
                        controller.doPostSaveMapLabel(model);
                        break;
                    case 'doPostUpdateConfig':
                        controller.doPostUpdateConfig(model);
                        break;
                }
            }
        });
    },
    

    doAfterThumbnailSaved: function () {
        //this.store.load();
        try{
            Ext.ComponentQuery.query('cartographyMain')[0].getController().refresh();
            //this.store.load();
        }catch(ex){}
    },
    

    deleteOne: function (id, controller, action) {
        if (!id) {
            throw new Error('[CartographyManager.deleteOne] id is null or empty!');
        }

        var model = Ext.create('Dashboard.model.cartography.Map', {
            id: id
        });

        model.erase({
            success: function () {

                Dashboard.tool.Utilities.info('[CartographyManager.deleteOne] success: map deleted');

                if (action === 'refresh') {
                    controller.refresh();
                }
            }
        });
    },
    
    // update materials filters list
    setMapFilters: function(filters){
                
        var mapStage = Ext.ComponentQuery.query('cartographyMapStage')[0];
        
        if(!mapStage){
            throw new Error('[CartographyManager.setMapFilters] mapStage not found!');
            return;
        }
        
        var currentMap = mapStage.currentMap;
        currentMap.data.materialsLayer.options.filters = filters;
        this.update(currentMap, null, null);
    },
    
    
    setUserMaterialsFilters: function(mapId, filters){
                
        if(!mapId){
            Dashboard.tool.Utilities.error('[CartographyManager.setUserMaterialsFilters] param null or empty');
            return;
        }

        this.userMaterialsFilters[mapId + ''] = filters;
    },
    
    
    getUserMaterialsFilters: function(mapId){
        
        if(!mapId){
            Dashboard.tool.Utilities.error('[CartographyManager.getUserMaterialsFilters] param null or empty');
            return [];
        }
        
        if(this.userMaterialsFilters[mapId + ''] === undefined){
            return [];
        }
        
        return this.userMaterialsFilters[mapId + ''];
        
    },
   
    
    saveGeoLocSystem: function (model, controller, action) {
        if (!model) {
            throw new Error('[CartographyManager.saveGeoLocSystem] model is null or empty!');
        }

        delete model.data.id;
        model.data.lastUpdateDate = Ext.Date.format(new Date(), 'c');

        model.save({
            scope: this,
            success: function (record, response) {

                model.data.id = Ext.decode(response._response.responseText).id;
                Dashboard.tool.Utilities.info('[CartographyManager.saveGeoLocSystem] save and read success' );
                
                if (action === 'doPostSaveGeoLocSystem') {
                    controller.doPostSaveGeoLocSystem(model);
                }
            }
        });
    },
    
    
    getMaterialProperties: function () {

        return Dashboard.manager.administration.MaterialManager.getProperties();
    },
    

    getProperties: function (action) {

        return [{
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