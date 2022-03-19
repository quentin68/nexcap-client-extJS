/* global Ext, moment */

Ext.define('Dashboard.view.cartography.MapStageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cartographyMapStage',

    require: ['Dashboard.view.geoloc.Main'],
    
    feature: null,

    layersDisplayingWindow: null,
    layersVisibility: null,
    
    editMapWindow: null,
    addMaterialWindow: null,
    addLocationWindow: null,
    addDeviceWindow: null,
    addLinkToMapWindow: null,
    addLabelWindow: null,
    configMapWindow: null,
    
    editMaterialWindow: null,
    editLocationWindow: null,
    editDeviceWindow: null,
    editLinkToMapWindow: null,
    editLabelWindow: null,
    
    currentMap: null,
    mapController: null,
    
    newMapMaterial: null,
    newLinkingZone: null,
    newMapDevice: null,
    newMapLabel: null,
    newMapLocation: null,
    
    selectedElement: null,
    

    init: function () {
                
        this.currentMap = this.getView().currentMap;
        this.mapController = Ext.ComponentQuery.query('cartographyMap')[0].getController();
        
        if(Dashboard.manager.cartography.CartographyManager.navigationHistory.length < 1){
            Ext.ComponentQuery.query('button[reference=onBackToMap]')[0].setDisabled(true);
        }
        
        this.control({

            'cartographyEditMap button[action=selectThumbnail]': {
                click: this.openThumbnailEditor
            },
            'cartographyEditMap button[action=deleteThumbnail]': {
                click: this.deleteThumbnail
            },
            'cartographyEditMap button[action=close]': {
                click: this.closeThumbnailEditor
            }

        });


    },
    
    // ==========================================================================
    // Event handlers
    // ==========================================================================
    
    onRenderMain: function (sender) {

        var buttons = this.getView().query('toolbar[dock=bottom] > *');
                
        if (Dashboard.manager.FeaturesManager.isEnabled('MAPS_ADMIN') === false) {
            Ext.each(buttons, function(button){
                button.setVisible(false);
            }, this);
        }

        //Snapshot
        if (Ext.isIE11 || Ext.isIE11m || Ext.isIE11p || Ext.isGecko) {
            console.log('IE11 detected');
            this.getView().down('button[reference=onSnapshot]').setVisible(false);
        }else{
            this.getView().down('button[reference=onSnapshot]').setVisible(true);
        }
                
    },
    
    onShow: function(){
        this.displayDetail(this.currentMap);
    },

    onToggleEditionMode: function(sender){
        this.toggleEditionMode();
    },
    
    onGoToAlbum: function(sender){
        this.goToAlbum();
    },
    
    onBackToMap: function(sender){ //storeNavigation
        var origin = Dashboard.manager.cartography.CartographyManager.navigationHistory.pop();
        
        if(origin === undefined){
            return;
        }
        
        if(Dashboard.manager.cartography.CartographyManager.navigationHistory.length < 1){
            this.getView().down('button[reference=onBackToMap]').setDisabled(true);
        }
        
        if(origin.origin === 'geoloc'){
            
            this.backToGeoloc();
            
        }else{
        
            var id = origin.origin;
            this.backToMap(id);
        }
    },
    
    backToGeoloc: function(){
        
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
          
        var currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('GEOLOC_CONSULTATION');  
          
        mainController.displayInMain({
            xtype: 'geolocMain',
            
            configuration: {
                enabledTools: {}
            },
            feature: currentFeature
            //feature: this.feature
        });
    },
            
    onLayersDisplaying: function(sender){
        this.layersDisplaying();
    },
            
    onCloseLayersDisplaying: function(sender){
        this.saveLayersDisplaying(sender);
    },
            
    onChangeLayerVisibility: function(sender){
        if(sender.checked){
            this.displayLayer(sender.name, true);
        }else{
            this.displayLayer(sender.name, false);
        }
    },
    
    onEditElement: function(){
        
        if(!this.selectedElement){
            return;
        }
        this.editElement(this.selectedElement);
    },
            
    onEditMap: function(){
        this.editMap();
    },
    
    onConfigMap: function(){
        this.configMap();
    },
    
    onUpdateMapConfiguration: function(sender){
        var win = sender.up('window');
        this.updateMapConfiguration(win);
    },
    
    onUpdateMap: function(sender){
        var win = sender.up('window');
        this.updateMap(win);
    },
            
    onSaveMapImage: function(){
        this.saveMapImage();
    },
                
    onAddMaterial: function(){
        this.addMaterial();
    },
    
    onSaveMapMaterial: function(sender){
        var win = sender.up('window');
        this.saveMapMaterial(win);
    },
    
    onEditMapMaterial: function(sender){
        var win = sender.up('window');
        this.editMapMaterial(win);
    },
            
    onSaveMapLocation: function (sender) {
        var win = sender.up('window');
        this.saveMapLocation(win);
    },
            
    onAddLocation: function(){
        this.addLocation();
    },
    
    onEditMapLocation: function(sender){
        var win = sender.up('window');
        this.editMapLocation(win);
    },
            
    onAddDevice: function(){
        this.addDevice();
    },
    
    onSaveMapDevice: function(sender){
        var win = sender.up('window');
        this.saveMapDevice(win);
    },
            
    onAddLinkToMap: function(sender){
        this.addLinkToMap(sender);
    },
    
    onSaveLinkToMap: function(sender){
        var win = sender.up('window');
        this.saveLinkToMap(win);
    },
    
    onEditMapLinkingZone: function(sender){
        var win = sender.up('window');
        this.editMapLinkingZone(win);
    },
            
    onAddLabel: function(){
        this.addLabel();
    },
    
    onEditMapLabel: function(sender){
        var win = sender.up('window');
        this.editMapLabel(win);
    },
            
    onSaveLabel : function(sender){
        var win = sender.up('window');
        this.saveLabel(win);
    },

    onSaveMap: function(sender){
        this.saveUpdatedMap();
    },
    
    onSnapshot: function(sender){
        this.snapshot();
    },
    
    onRefresh: function(sender){
        this.getAndDisplayMap(this.currentMap.data.id);
    },
    
    // Show or hide detail view 
    hideDetail: function () {
        try {
            var detailPanel = this.getView().query('detail')[0];//Ext.ComponentQuery.query('detail')[0];
            detailPanel.hide();
        } catch (ex) {
            
            console.log('hideDetail');
            console.log(ex);
        }
    },
    
    // Show or hide detail view 
    showDetail: function () {
        try {
            
            var detailPanel = this.getView().query('detail')[0];//Ext.ComponentQuery.query('detail')[0];
            detailPanel.show();
            
        } catch (ex) {
            console.log('showDetail');
            console.log(ex);
        }
    },
    
    onAddNewRule: function(sender){
         this.showCreateRulesWindow();
    },
    
    onSaveNewRule: function(sender){
        var win = sender.up('window');
        this.saveNewRule(win);
    },
    
    // ==========================================================================
    // Methods
    // ==========================================================================
    

    getFilters: function(){
                        
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },
    
    
    // ==========================================================================
    // MAP
    // ==========================================================================
    
    

    loadDetail: function(id, typeElement){
        
        switch(typeElement){
            case 'MATERIAL':
                Dashboard.manager.administration.MaterialManager.getOne(id, this, 'displayDetail');
                break;
            case 'DEVICE':
                Dashboard.manager.system.DevicesManager.getOne(id, this, 'displayDetail');
                break;
            case 'LOCATION':
                Dashboard.manager.administration.LocationsManager.getOne(id, this, 'displayDetail');
                break;
            case 'MAP':
                //Dashboard.manager.administration.CartographyManager.getOne(id, this, 'displayDetail');
                this.displayDetail(this.currentMap);
                break;
        }
        
    },
    
    
    /**
     * Show data sheet
     * @param {type} record
     * @return {undefined}
     */
    displayDetail: function (record){
        var view = this.getView();
        if (view) {
            switch (record.$className) {
                case 'Dashboard.model.Material':
                    view.showDetail('materialDetail');
                    this.showDetail();
                    break;
                case 'Dashboard.model.system.Device':
                    view.showDetail('deviceDetail');
                    this.showDetail();
                    break;
                case 'Dashboard.model.administration.Location':
                    view.showDetail('locationDetail');
                    this.showDetail();
                    break;
                case 'Dashboard.model.cartography.Map':
                    view.showDetail('mapCartoDetail');
                    this.showDetail();
                    break;
                    //  TODO
            }
        }

        try {
            Ext.ComponentQuery.query('panel[reference=detailContainer]')[0].down('detail').setData(record.data);
        } catch (ex) {
            //
        }
    },
    
    
    /**
     * Clean screen
     * @return {undefined}
     */
    resetStage: function(){
        this.layersVisibility = true;
    },
          
    
    /**
     * Back to maps list
     * @return {undefined}
     */
    goToAlbum: function(){
        Dashboard.manager.cartography.CartographyManager.displayInMain(this.feature);
    },
    
    
    /**
     * Load and show map
     * @param {int} mapId
     * @return {undefined}
     */
    backToMap: function(mapId){
        
        //var filters = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters(mapId);
        var filters = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters('current');
        Dashboard.manager.cartography.CartographyManager.getOne(mapId, this, 'returnToMap', filters);
    },
            
            
    /**
     * Layers displaying form
     * @return {undefined}
     */
    layersDisplaying: function(){

        this.layersDisplayingWindow = Ext.create('Dashboard.view.cartography.LayersDisplaying',{
            mainController: this
        });
        
        if(this.layersVisibility){
            this.layersDisplayingWindow.setData(this.layersVisibility);
        }
        
        this.layersDisplayingWindow.show();
    },
    
    
    // ==========================================================================
    // MAP, LAYERS CONFIGURATION
    // ==========================================================================
    
    
    showCreateRulesWindow : function(type){
        var win = Ext.create('Dashboard.view.cartography.CreateRule',{
            mainController: this,
            modelProperties: this.getView().modelProperties
        });
        
        win.show();
    },
    
    
    closeCreateRulesWindow: function(){
        var win = Ext.ComponentQuery.query('createRule')[0];
        if(win !== undefined){
            win.close();
        }
    },
    
    
    saveNewRule: function(win){
        //this.getView().addRule(rule);
                
        var rule = win.getData();
        
        var win = Ext.ComponentQuery.query('cartographyConfigMap')[0];
        win.addRule(rule);
        
        this.closeCreateRulesWindow();
    },
    
    removeRule: function(rule){
        this.getView().removeRule(rule);
    },
    
    
    saveUpdatedMap: function(elementType, element, updatedValue){
        
        if(!element){
            console.log('saveUpdatedMap : null param');
            return;
        }
                        
        var mapElement = null;
        
        switch(elementType){
            case 'MATERIAL':
                element.x = updatedValue.x;
                element.y = updatedValue.y;
                mapElement = this.findMapMaterialByMaterialId(this.currentMap, element.material.id);
                break;
                
            case 'LINKINGZONE':
                mapElement = this.findLinkingZonesByName(this.currentMap, element.elementName);
                break;
                
            case 'LOCATION':
                mapElement = this.findMapLocationByName(this.currentMap, element.elementName);
                break;
                
            case 'DEVICE':
                mapElement = this.findMapDeviceByName(this.currentMap, element.elementName);
                break;
                
            case 'LABEL':
                mapElement = this.findMapLabelByName(this.currentMap, element.elementName);
                break;
                
            default:
                throw 'Unsuported element type : ' + elementType;
                break;
        }
        
        var pos = this.convertPixelsToPercent(element.x, element.y);
        var size = this.convertPixelsToPercent(element.width, element.height);
        mapElement.posX = pos.x;
        mapElement.posY = pos.y;
        mapElement.width = size.x;
        mapElement.height = size.y;
                   
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'updateElements');
    },

    
    /**
     * Save configuration
     * @param {type} sender
     * @return {undefined}
     */
    saveLayersDisplaying: function(sender){
        
        var win = sender;
        this.layersVisibility = win.getData();
                
        // TODO
        // save
    },
    
    
    /**
     * Open edit form
     * @return {undefined}
     */  
    editMap: function(){
        
        //var currentMap = Ext.ComponentQuery.query('cartographyMapStage')[0].currentMap;

        this.editMapWindow = Ext.create('Dashboard.view.cartography.EditMap',{
            record: this.currentMap,
            mainController: this
        });
        
        this.editMapWindow.show();
                
        if(this.currentMap.data.thumbnailSrc){
            this.editMapWindow.setThumbnail(this.currentMap.data.thumbnailSrc);
        }
    },
    
    
    configMap: function(){
        
        this.configMapWindow = Ext.create('Dashboard.view.cartography.ConfigMap',{
            record: this.currentMap,
            mainController: this,
            modelProperties: Dashboard.manager.cartography.CartographyManager.getMaterialProperties()
        });
        
        this.configMapWindow.setData(this.currentMap.data);
        this.configMapWindow.show();
    },
    
    
    /**
     * Update map to server
     * @param {window} win
     * @return {undefined}
     */        
    updateMap: function(win){
                        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var currentMap = Ext.ComponentQuery.query('cartographyMapStage')[0].getController().currentMap;
        var data = win.getData();
        
        currentMap.data.title = data.title;
        currentMap.data.color = data.color;
        currentMap.data.description = data.description;
                
        Dashboard.manager.cartography.CartographyManager.update(currentMap, this, 'doPostUpdateMap');
        
    },
    
     
    /**
     * Done after map updated
     * @param {Map} map
     * @return {undefined}
     */
    doPostUpdateMap: function(map){
        
        this.closeWindows();
    },
    
    
    /**
     * Update map to server
     * @param {window} win
     * @return {undefined}
     */        
    updateMapConfiguration: function(win){
                        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var currentMap = Ext.ComponentQuery.query('cartographyMapStage')[0].getController().currentMap;
        var data = win.getData();
        
        currentMap.data.materialsLayer.options = data.materialsLayer.options;
        currentMap.data.locationsLayer.options = data.locationsLayer.options;
        currentMap.data.linkingZonesLayer.options = data.linkingZonesLayer.options;
        currentMap.data.devicesLayer.options = data.devicesLayer.options;
        
        if(currentMap.data.labelsLayer === undefined){
            currentMap.data.labelsLayer = {};
        }
        
        currentMap.data.labelsLayer.options = data.labelsLayer.options;
        currentMap.data.materialsLayer.displayedFields = data.materialsLayer.displayedFields;
                
        Dashboard.manager.cartography.CartographyManager.update(currentMap, this, 'doPostUpdateConfig');
        
    },
    
    
    doPostUpdateConfig: function(){
        this.closeWindows();
        this.getAndDisplayMap(this.currentMap.data.id);
    },
    
    
    /**
     * Done after image updated
     * @return {undefined}
     */
    doAfterThumbnailSaved: function(){
        
        this.getAndDisplayMap(this.currentMap.data.id);
       
    },

    
    doSavingAlert: function(){
        Ext.Msg.show({
            title: getText('Saving'),
            msg: getText('do you want save changes') + getText('?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    this.saveUpdatedMap();
                }
            }
        });
    },
    
    selectMapElement: function(element, discriminator){
                        
        this.selectedElement = null;
        this.showSizeSlider(null);
                                                
        switch(discriminator){
            case 'MATERIAL':
                var materialId = null;
                if(element.id.split !== undefined){
                    materialId = element.id.split('_');
                    materialId = materialId[materialId.length-1];
                }else if(element.material !== undefined){
                    materialId = element.material.id;
                }
                
                var data = this.findMapMaterialByMaterialId(this.currentMap, parseInt(materialId));
                this.selectedElement = Ext.create('Dashboard.model.cartography.MapMaterial', data);
                this.displayMaterialDetail(parseInt(materialId));
                this.showSizeSlider(discriminator);
                break;
                
            case 'LINK':
            case 'LINKINGZONE':
                var data = this.findLinkingZonesByName(this.currentMap, element.elementName);
                this.selectedElement = Ext.create('Dashboard.model.cartography.LinkingZone', data);
                break;
                
            case 'DEVICE':
                var data = this.findMapDeviceByName(this.currentMap, element.elementName);
                this.selectedElement = Ext.create('Dashboard.model.cartography.MapDevice', data);
                this.loadDetail(data.device.id, 'DEVICE');
                this.showSizeSlider(discriminator);
                break;
                
            case 'LOCATION':
                var data = this.findMapLocationByName(this.currentMap, element.elementName); // @TODO change here
                this.selectedElement = Ext.create('Dashboard.model.cartography.MapLocation', data);
                this.loadDetail(data.location.id, 'LOCATION');
                //if pin 
                if(data.width === 0 && data.height === 0){
                    this.showSizeSlider(discriminator);
                }
                break;
                
            case 'LABEL':
                var data = this.findMapLabelByName(this.currentMap, element.elementName);
                this.selectedElement = Ext.create('Dashboard.model.cartography.MapLabel', data);
                break;
                
            case 'MAP':
                this.displayDetail(this.currentMap);
                break;
        }
        
        //Dashboard.tool.Utilities.info('[MapStageController] selected location : ' + element.elementName);
        
    },
    
    
    showSizeSlider: function(discriminator){
        
        var editionMode = Dashboard.manager.cartography.CartographyManager.editionMode;
        var slider = this.getView().down('slider[reference=slider]');
        
        var homothetie;
        
        switch(discriminator){
            case "MATERIAL":
                homothetie = this.currentMap.data.materialsLayer.options.homothetie;
                break;
            case "DEVICE":
                homothetie = this.currentMap.data.devicesLayer.options.homothetie;
                break;
            case "LOCATION":
                homothetie = this.currentMap.data.locationsLayer.options.homothetie;
                break;
        }
                        
        if(!homothetie){
            homothetie = 1;
        }
        
        if(editionMode === true && discriminator !== null){
            slider.setValue(100 * homothetie);
            slider.setVisible(true);
        }else{
            slider.setVisible(false);
        }
        
    },
        
    
    onDeleteElement: function(sender){
        if(!this.selectedElement){
            return;
        }
        this.confirmDelete(this.selectedElement);
    },
    
    
    confirmDelete: function (selection){
        
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete this element ?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn){
                if (btn === 'yes') {
                    this.doDeleteElement(selection);
                }
            }
        });
    },
    
    doDeleteElement: function(selection){
                
        var type = null;
        var id = selection.data.id;
        
        var list = [];
         switch(selection.entityName){
            case 'cartography.MapMaterial':
                list = this.currentMap.data.materialsLayer.mapMaterials;
                type = 'MATERIAL';
                id = this.selectedElement.data.material.id;
                break;
            case 'cartography.LinkingZone':
                list = this.currentMap.data.linkingZonesLayer.mapLinkingZones;
                type = 'LINKINGZONE';
                break;
            case 'cartography.MapLocation':
                list = this.currentMap.data.locationsLayer.mapLocations;
                type = 'LOCATION';
                break;
            case 'cartography.MapDevice':
                list = this.currentMap.data.devicesLayer.mapDevices;
                type = 'DEVICE';
                break;
            case 'cartography.MapLabel':
                list = this.currentMap.data.labelsLayer.mapLabels;
                type = 'LABEL';
                break;
        }
        
        this.deleteMapElement(id, type);
        
        //this.deleteMapElementByName(selection.data.name, type);
                
        var obj = list.indexOf(selection.data);
        list.splice(obj, 1);
        
        this.updateChosenMap(this.currentMap);
        
        this.selectedElement = null;

        Dashboard.tool.Utilities.info('[CartographyStageControllerr.doDeleteElement] delete:' + selection.data.name);
                
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, null); //'doPostDeleteElement'
        
    },
    
    
    /**
     * Get and display new mapMaterial
     */
    doPostDeleteElement: function(){
        
                                
//        this.updateChosenMap(this.currentMap);
        
//        var type = null;
//        var id = this.selectedElement.data.id;
//                
//        if(this.selectedElement){
//
//            switch(this.selectedElement.entityName.split('.')[1]){
//                case 'MapMaterial':
//                    type = 'MATERIAL';
//                    id = this.selectedElement.data.material.id;
//                    break;
//                case 'LinkingZone':
//                    type = 'LINKINGZONE';
//                    break;
//                case 'MapLocation':
//                    type = 'LOCATION';
//                    break;
//                case 'MapDevice':
//                    type = 'DEVICE';
//                    break;
//                case 'MapLabel':
//                    type = 'LABEL';
//                    break;
//                default:
//                    throw 'Unsuported element type : ' + this.selectedElement.entityName.split('.')[1];
//                    break;
//            }
//
//            this.deleteMapElement(id, type);
//        }
    },
    
    
    editElement: function(selection){
        
        var list = [];
        switch(selection.entityName){
            case 'cartography.MapMaterial':
                this.editMaterial(selection);
                break;
            case 'cartography.LinkingZone':
                this.openEditLinkingZone(selection);
                break;
            case 'cartography.MapLocation':
                this.openEditLocation(selection);
                break;
            case 'cartography.MapDevice':
                Ext.Msg.show({
                    title: getText('Info'),
                    message: getText('Devices can\'t be modified'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
                break;
            case 'cartography.MapLabel':
                this.editLabel(selection);
                break;
        }
        
    },
    
    
    toggleEditionMode: function(mode){
        
        var editionMode = Dashboard.manager.cartography.CartographyManager.editionMode;
                        
        if(mode !== undefined ){
            editionMode = mode;
        }else{
            editionMode = !editionMode;
            Dashboard.manager.cartography.CartographyManager.editionMode = editionMode;
        }
        
        var buttons = this.getView().query('toolbar[dock=bottom] > *');
        Ext.each(buttons, function(button){
            if(button.reference !== 'refreshButton' && button.reference !== 'slider'){
                button.setVisible(editionMode);
            }
        }, this);
        
        if(this.mapController){
            this.mapController.toggleEditionMode(this.currentMap.id, editionMode);
        }
                       
        var button = Ext.ComponentQuery.query('button[reference=onToggleEditionMode]')[0];
        var filtersBar = this.getView().down('filtersBar');
                
        if(editionMode){
            button.setIconCls('fa fa-unlock-alt');
            filtersBar.setVisible(false);
            
        }else{
            button.setIconCls('fa fa-lock');
            filtersBar.setVisible(true);
        }
        
        Dashboard.tool.Utilities.info('[cartography.MapStageController.onChangeEditMode] editionMode : ' + editionMode);
    },
    
    tipText: function (thumb) {
        return String(thumb.value) + '%';
    },
    
    
    // ==========================================================================
    // MATERIALS
    // ==========================================================================
          
    /**
     * Open mapMaterial creation form
     * @return {undefined}
     */
    addMaterial: function(){
        this.addMaterialWindow = Ext.create('Dashboard.view.cartography.AddMaterial',{
            record: {},
            mainController: this
        });
        
        this.addMaterialWindow.setOptions(this.currentMap.data.materialsLayer.options);
        this.addMaterialWindow.show();
    },
    
    
    /**
     * Save new mapMaterial
     * @param {type} win
     * @return {undefined}
     */
    saveMapMaterial: function(win){
       
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
                
        //var currentMap = Ext.ComponentQuery.query('cartographyMapStage')[0].currentMap;
        if(!this.currentMap.data.materialsLayer){
            
            this.currentMap.data.materialsLayer = {
                name: 'materialsLayer',
                hidden: false,
                bulletsOption: [],
                mapMaterials: []
            };
        }
        
        var data = win.getData();
                
        var posX = this.convertMeterToPercent(data.posX, data.posY).x;
        var posY = this.convertMeterToPercent(data.posX, data.posY).y;
        
        this.newMapMaterial = {
            material: {id:data.material},
            posX: posX,
            posY: posY,
            width: 20,
            height: 20,
            color: data.color,
            icon: data.icon,
            name: data.name //defaultColor
        };
        
        this.currentMap.data.materialsLayer.mapMaterials.push(this.newMapMaterial);
                
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostSaveMapMaterial');
    },
    
    
    
    /**
     * Get and display new mapMaterial
     * Refresh maps store
     * @param {type} map
     * @return {undefined}
     */
    doPostSaveMapMaterial: function(map){
                
        var mapsStore = Dashboard.manager.cartography.CartographyManager.store;
        
        //Refresh maps list
        mapsStore.load({
            scope: this,
            callback : function(records, options, success) {
                if (success) {
                    var savedMap = mapsStore.getById(map.data.id);
                    savedMap = Dashboard.manager.cartography.CartographyManager.decodeOptions(savedMap);
                    this.newMapMaterial = this.findMapMaterialByMaterialId(savedMap, this.newMapMaterial.material.id);
                                        
                    this.updateChosenMap(savedMap);
                    this.displayNewMapMaterial(this.newMapMaterial);
                }
            }
        });

        this.closeWindows();
    },
    
    
    /**
     * Find mapMaterial into map.data
     * @param {type} map
     * @param {type} materialId
     * @returns {undefined}
     */
    findMapMaterialByMaterialId: function(map, materialId) {
        
        if(map.data.materialsLayer.mapMaterials === undefined){
            Dashboard.tool.Utilities.error('[MapSrtageController.findMapMaterialByMaterialId] param is null');
            return;
        }
         
         for(var i=0; i< map.data.materialsLayer.mapMaterials.length; i++){
             var mapMaterial = map.data.materialsLayer.mapMaterials[i];
             if(mapMaterial.material.id === materialId){
                 return mapMaterial;
             }
         }
        return null;
    },
    
    
    findMapMaterialByName: function(map, name) {
        
        for(var i=0; i< map.data.materialsLayer.mapMaterials.length; i++){
            var object = map.data.materialsLayer.mapMaterials[i];
            if(object.name === name){
                return object;
            }
        }
        return null;
    },
    
    
    editMaterial: function(selection){
        this.editMaterialWindow = Ext.create('Dashboard.view.cartography.EditMaterial',{
            record: selection,
            mainController: this
        });
        
        this.editMaterialWindow.setOptions(this.currentMap.data.materialsLayer.options);
        this.editMaterialWindow.setData(selection.data);
        
        this.editMaterialWindow.show();
    },

    
    editMapMaterial: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        
        var mapMaterial = this.findMapMaterialByMaterialId(this.currentMap, data.material.id);
        mapMaterial = data;
        
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostUpdateConfig');
        
    },

    
    // ==========================================================================
    // LOCATIONS
    // ==========================================================================
        
            
    addLocation: function(){
        this.addLocationWindow = Ext.create('Dashboard.view.cartography.AddLocation',{
            record: {},
            mainController: this
        });
        
        this.addLocationWindow.setOptions(this.currentMap.data.locationsLayer.options);
        this.addLocationWindow.show();
    },
    
    /**
     * 
     * @param {type} win
     * @returns {undefined}
     */
    saveMapLocation: function (win) {
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
    
        if(!this.currentMap.data.locationsLayer){
            this.currentMap.data.locationsLayer = {
                name: 'Locations Layer',
                hidden: false,
                bulletsOption: [],
                mapLocations: []
            };
        }
        
        var data = win.getData();
        
        if(data.posX === 0 && data.posY === 0){
            var referenceSystemWidthInMeter = this.currentMap.data.geoLocArea.sizeInRealLife.width;
            var referenceSystemHeightInMeter = this.currentMap.data.geoLocArea.sizeInRealLife.height;
            data.posX = (referenceSystemWidthInMeter / 2) - 0.5;
            data.posY = (referenceSystemHeightInMeter / 2) - 0.5;
            
            if(!data.width && !data.height){
                data.posX += 0.5;
                data.posY += 0.5;
            }
        }
        
        var pos = this.convertMeterToPercent(data.posX, data.posY);
        var size = this.convertMeterToPercent(data.width, data.height);
                
        this.newMapLocation = {
            location: {id: data.location},
            posX: pos.x,
            posY: pos.y,
            width: size.x,
            height: size.y,
            color: data.color,
            name: data.name
        };
        
        this.currentMap.data.locationsLayer.mapLocations.push(this.newMapLocation);
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostSaveMapLocation');
    },
    
    
    doPostSaveMapLocation: function(map){
                
        var mapsStore = Dashboard.manager.cartography.CartographyManager.store;
        
        //Refresh maps list
        mapsStore.load({
            scope: this,
            callback : function(records, options, success) {
                if (success) {
                    var savedMap = mapsStore.getById(map.data.id);
                    savedMap = Dashboard.manager.cartography.CartographyManager.decodeOptions(savedMap);
                    this.newMapLocation = this.findMapLocationByName(savedMap, this.newMapLocation.name);
                                        
                    this.updateChosenMap(savedMap);
                    this.displayNewMapLocation(this.newMapLocation);
                }
            }
        });

        this.closeWindows();
    },
    
    findMapLocationByName: function(map, name) {
        
        for(var i=0; i< map.data.locationsLayer.mapLocations.length; i++){
            var object = map.data.locationsLayer.mapLocations[i];
            if(object.name === name){
                return object;
            }
        }
        
        return null;
    },
    
    
    openEditLocation: function(selection){
        this.win = Ext.create('Dashboard.view.cartography.EditLocation',{
            record: selection,
            currentMap: this.currentMap,
            mainController: this
        });
        
        this.win.setOptions(this.currentMap.data.locationsLayer.options);
        this.win.setData(selection.data);
        
        this.win.show();
    },
    
    
    editMapLocation: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        
        var size = this.convertMeterToPercent(data.width, data.height);
        data.width = size.x;
        data.height = size.y;
        
        var mapElement = this.findMapLocationByName(this.currentMap, data.name);
        mapElement = data;
        
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostUpdateConfig');
        
    },
    
    // ==========================================================================
    // DEVICES
    // ==========================================================================
            
    addDevice: function(){
        this.addDeviceWindow = Ext.create('Dashboard.view.cartography.AddDevice',{
            record: {},
            mainController: this
        });
        
        this.addDeviceWindow.setOptions(this.currentMap.data.devicesLayer.options);
        this.addDeviceWindow.show();
    },
    
    
    saveMapDevice: function(win){
       
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        if(!this.currentMap.data.devicesLayer){
            
            this.currentMap.data.devicesLayer = {
                name: 'Devices Layer',
                hidden: false,
                bulletsOption: [],
                mapDevices: []
            };
        }
        
        var data = win.getData();
        var pos = this.convertMeterToPercent(data.posX, data.posY);
        
        this.newMapDevice = {
            device: {id:data.device},
            posX: pos.x,
            posY: pos.y,
            width: null,
            height: null,
            icon: data.iconSrc,
            color: data.color,
            name: data.name
        };
        
        this.currentMap.data.devicesLayer.mapDevices.push(this.newMapDevice);
                
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostSaveMapDevice');
    },
    
    
    doPostSaveMapDevice: function(map){
                
        var mapsStore = Dashboard.manager.cartography.CartographyManager.store;
        
        //Refresh maps list
        mapsStore.load({
            scope: this,
            callback : function(records, options, success) {
                if (success) {
                    var savedMap = mapsStore.getById(map.data.id);
                    savedMap = Dashboard.manager.cartography.CartographyManager.decodeOptions(savedMap);
                    this.newMapDevice = this.findMapDeviceByName(savedMap, this.newMapDevice.name);
                                        
                    this.updateChosenMap(savedMap);
                    this.displayNewMapDevice(this.newMapDevice);
                }
            }
        });

        this.closeWindows();
    },
    
    
    findMapDeviceByName: function(map, name) {
                 
        for(var i=0; i< map.data.devicesLayer.mapDevices.length; i++){
            var object = map.data.devicesLayer.mapDevices[i];
            if(object.name === name){
                return object;
            }
        }
        return null;
    },
    
    
    // ==========================================================================
    // LINKS
    // ==========================================================================
    
    
            
    addLinkToMap: function(){

        this.addLinkToMapWindow = Ext.create('Dashboard.view.cartography.AddLinkToMap',{
            record: {},
            mainController: this
        });
        
        this.addLinkToMapWindow.setOptions(this.currentMap.data.linkingZonesLayer.options);
        this.addLinkToMapWindow.show();
    },
    
    
    saveLinkToMap: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        if(!this.currentMap.data.linkingZonesLayer){
            this.currentMap.data.linkingZonesLayer = {
                mapLinkingZones: []
            };
        }
        
        this.currentMap.data.linkingZonesLayer.name = 'linkingZonesLayer';
                
        var data = win.getData();
        
//        var referenceSystemWidthInMeter = this.currentMap.data.geoLocSystem.width;
//        var referenceSystemHeightInMeter = this.currentMap.data.geoLocSystem.height;

        var referenceSystemWidthInMeter = this.currentMap.data.geoLocArea.sizeInRealLife.width;
        var referenceSystemHeightInMeter = this.currentMap.data.geoLocArea.sizeInRealLife.height;
        
        var posX = (referenceSystemWidthInMeter / 2) - 0.5;
        var posY = (referenceSystemHeightInMeter / 2) - 0.5;
        
        var pos = this.convertMeterToPercent(posX, posY);
        var size = this.convertMeterToPercent(data.width, data.height);

        this.newLinkingZone = {
            map: {id: data.linkedMapId},
            label: data.label,
            name: data.name,
            icon: data.icon,
            posX: pos.x,
            posY: pos.y,
            width: size.x,
            height: size.y,
            color: data.color
        };
    
        this.currentMap.data.linkingZonesLayer.mapLinkingZones.push(this.newLinkingZone);
        
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostSaveLinkingZone');

    },
    
    doPostSaveLinkingZone: function(map){
                
        var mapsStore = Dashboard.manager.cartography.CartographyManager.store;
        
        //Refresh maps list
        mapsStore.load({
            scope: this,
            callback : function(records, options, success) {
                if (success) {
                    var savedMap = mapsStore.getById(map.data.id);
                    savedMap = Dashboard.manager.cartography.CartographyManager.decodeOptions(savedMap);
                    this.newLinkingZone = this.findLinkingZonesByName(savedMap, this.newLinkingZone.name);
                    
                    this.updateChosenMap(savedMap);
                    this.displayNewLinkingZone(this.newLinkingZone, savedMap);
                }
            }
        });

        this.closeWindows();
    },
    
    
     findLinkingZonesByLinkingZoneId: function(map, id) {
         
         for(var i=0; i< map.data.linkingZonesLayer.mapLinkingZones.length; i++){
             var object = map.data.linkingZonesLayer.mapLinkingZones[i];
             if(object.id === id){
                 return object;
             }
         }
        return null;
    },
    
    findLinkingZonesByName: function(map, name) {
         
        for(var i=0; i< map.data.linkingZonesLayer.mapLinkingZones.length; i++){
            var object = map.data.linkingZonesLayer.mapLinkingZones[i];
            if(object.name === name){
                return object;
            }
        }
        return null;
    },
    
    openEditLinkingZone: function(selection){
        this.win = Ext.create('Dashboard.view.cartography.EditLinkingZone',{
            record: selection,
            currentMap: this.currentMap,
            mainController: this
        });
        
        this.win.setOptions(this.currentMap.data.linkingZonesLayer.options);
        this.win.setData(selection.data);
        
        this.win.show();
    },
    
    
    editMapLinkingZone: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
        
        var mapElement = this.findLinkingZonesByName(this.currentMap, data.name);
        mapElement = data;
        
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostUpdateConfig');
        
    },
    
    
    // ==========================================================================
    // LABELS
    // ==========================================================================
            
    addLabel: function(){

        this.addLabelWindow = Ext.create('Dashboard.view.cartography.AddLabel',{
            record: {},
            mainController: this
        });
        
        try{
            this.addLabelWindow.setOptions(this.currentMap.data.labelsLayer.options);
        }catch(ex){};
        
        this.addLabelWindow.show();
    },
    
            
    saveLabel: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        if(!this.currentMap.data.labelsLayer){
            this.currentMap.data.labelsLayer = {
                name: 'labelsLayer',
                hidden: false,
                bulletsOption: [],
                mapLabels: []
            };
        }

        var data = win.getData();
        var pos = this.convertMeterToPercent(data.posX, data.posY);
        
        this.newMapLabel = Ext.create('Dashboard.model.cartography.MapLabel',{
            label: data.label,
            posX: pos.x,
            posY: pos.y,
            color: data.color,
            name: data.name,
            fontSize: data.size,
            font: data.font
        });
        
        delete this.newMapLabel.data.id;
        this.currentMap.data.labelsLayer.mapLabels.push(this.newMapLabel.data);
        
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostSaveMapLabel');

    },
    
            
    doPostSaveMapLabel: function (map) {
        var mapsStore = Dashboard.manager.cartography.CartographyManager.store;
        
        //Refresh maps list
        mapsStore.load({
            scope: this,
            callback : function(records, options, success) {
                if (success) {
                    var savedMap = mapsStore.getById(map.data.id);
                    savedMap = Dashboard.manager.cartography.CartographyManager.decodeOptions(savedMap);
                    this.newMapLabel = this.findMapLabelByName(savedMap, this.newMapLabel.data.name);
                                        
                    this.updateChosenMap(savedMap);
                    this.displayNewMapLabel(this.newMapLabel);
                }
            }
        });

        this.closeWindows();
    },
    
    
    findMapLabelByName: function(map, name) {
        
        for(var i=0; i< map.data.labelsLayer.mapLabels.length; i++){
            var object = map.data.labelsLayer.mapLabels[i];
            if(object.name === name){
                return object;
            }
        }
        
        return null;
    },
    
    
    editLabel: function(selection){
        this.editLabelWindow = Ext.create('Dashboard.view.cartography.EditLabel',{
            record: selection,
            mainController: this
        });
                
        this.editLabelWindow.setOptions(this.currentMap.data.labelsLayer.options);
        this.editLabelWindow.setData(selection.data);
        
        this.editLabelWindow.show();
    },
    
    editMapLabel: function(win){
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }

        var data = win.getData();
                
        var mapElement = this.findMapLabelByName(this.currentMap, data.name);
        mapElement = data;
        
        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostUpdateConfig');
        
    },
    
            
    
    // ==================================================
    // Utils
    // ==================================================
    
    
    convertMeterToPercent: function(xValueInMeter, yValueInMeter){

        var referenceSystemWidthInMeter = this.currentMap.data.geoLocArea.sizeInRealLife.width;
        var referenceSystemHeightInMeter = this.currentMap.data.geoLocArea.sizeInRealLife.height;
                
        var ratioWidthHeight = 8/6; ////default ratio
        var ratioX = xValueInMeter / referenceSystemWidthInMeter;
        var ratioY = yValueInMeter / (referenceSystemWidthInMeter / ratioWidthHeight);
        
        if(this.currentMap.data.picture){
            var pictureWidthInPixels = this.currentMap.data.picture.widthInPixels;
            var pictureHeightInPixels = this.currentMap.data.picture.heightInPixels;
            ratioWidthHeight = pictureWidthInPixels / pictureHeightInPixels;
            ratioY = yValueInMeter / (referenceSystemWidthInMeter / ratioWidthHeight);
        }

        return {x: ratioX, y:ratioY};
    },
    
    
    convertPixelsToPercent: function(xValueInPixels, yValueInPixels){
        
        var pictureWidthInPixels = 800;
        var pictureHeightInPixels = 600;
        
        if(this.currentMap.data.picture){
            pictureWidthInPixels = this.currentMap.data.picture.widthInPixels;
            pictureHeightInPixels = this.currentMap.data.picture.heightInPixels;
        }
        
        var panelSizeInPixel = this.mapController.getResponsiveStageSize(pictureWidthInPixels, pictureHeightInPixels);

        var ratioX = xValueInPixels / panelSizeInPixel.width;
        var ratioY = yValueInPixels / panelSizeInPixel.height;

        return {x: ratioX, y:ratioY};
    },
    
    
//    convertPercentToMeter: function(xValueInPercent, yValueInPercent){
//        
//        var pictureWidthInPixels = 800;
//        var pictureHeightInPixels = 600;
//        
//        if(this.currentMap.data.picture){
//            pictureWidthInPixels = this.currentMap.data.picture.widthInPixels;
//            pictureHeightInPixels = this.currentMap.data.picture.heightInPixels;
//        }
//        
//        var panelSizeInPixel = this.mapController.getResponsiveStageSize(pictureWidthInPixels, pictureHeightInPixels);
//
//        var ratioX = xValueInPixels / panelSizeInPixel.width;
//        var ratioY = yValueInPixels / panelSizeInPixel.height;
//
//        return {x: ratioX, y:ratioY};
//    },
    
    
    closeWindows: function(){
        
        var wins = Ext.ComponentQuery.query('window[tag=winMap]');
        
        for(var i=0; i<wins.length; i++){
            wins[i].close();
        }
    },
    
    
    onColorPicker: function(target){

        var colorPicker = Ext.create('Dashboard.view.shared.ColorPicker',{
            target: target
        });
        
        colorPicker.down('form').lookupReference( 'selectedColor' ).on({
            change: function(sender) {
                var target = sender.up('window').target;
                target.body.setStyle('background', sender.value);
                target.up('panel').down('hiddenfield[name=color]').setValue(sender.value);
                
                Ext.Function.defer(function(){
                    sender.up('window').close();
                }, 100);

            }
        });
        
        colorPicker.show();
    },
    
    onIconPicker: function(sender){

        var iconPicker = Ext.create('Dashboard.view.shared.IconPicker',{});
        
        iconPicker.down('form').lookupReference('selectedIconSrc').on({
            scope: this,
            change: function(icon) {
                
                var view = sender.up('window');
                
                //update icon
               view.down('ux-img').setSrc(icon.value); 
               view.down('hiddenfield[name=icon]').setValue(icon.value);
               icon.up('window').close();
            }
        });
        
        iconPicker.show(); 
    },
            
            
    // ==================================================
    // THUMBNAILS
    // ==================================================

    openThumbnailEditor: function(event){
        Dashboard.manager.administration.FilesManager.openThumbnailEditor(this);
    },
    
            
    closeThumbnailEditor: function(){
        Dashboard.manager.administration.FilesManager.closeThumbnailEditor();
    },
    
            
    deleteThumbnail: function(event){

        var win = event.up('window');
        win.setThumbnail(null);

        win.record.picture = {
            thumbnailName: '',
            pictureName: ''
        };
    },
    
    
    // ==========================================================================
    // IHM > Map
    // ==========================================================================
    
    /**
     * get all data
     * @return {MapStageControllerAnonym$0.mapController.getData}
     */
    getMapData: function(){
        
        return this.mapController.getData();
    },
    
    
    /**
     * Update current Map
     * @param {Map} map
     * @return {undefined}
     */
    updateChosenMap: function(map){
        Ext.ComponentQuery.query('cartographyMapStage')[0].getController().currentMap = map;

        if (map.data.rootPositionDto!==null) {
            map.data.rootPosition=map.data.rootPositionDto.id;
        }
        else {
            map.data.rootPosition=0;
        }
        this.mapController.chosenMap = map.data;
    },
    
    
    /**
     * Add element into map
     * @param {type} mapMaterial
     * @return {undefined}
     */
    displayNewMapMaterial: function(mapMaterial){
        
        if(!mapMaterial){
            Dashboard.tool.Utilities.error('[MapSrtageController.displayNewMapMaterial] param is null');
            return;
        }
        
        this.mapController.addMaterialToMap(mapMaterial);
        this.mapController.stage.batchDraw();
    },
    
    
    /**
     * Add element into map
     * @param {type} linkedZone
     * @param {type} record
     * @returns {undefined}
     */
    displayNewLinkingZone: function(linkedZone, record){
        
        if(!linkedZone){
            Dashboard.tool.Utilities.error('[MapSrtageController.displayNewLinkingZone] param is null');
            return;
        }
        this.mapController.addLinkToMap(linkedZone);
        this.mapController.stage.batchDraw();
    },
    
    
    displayNewMapDevice: function(mapDevice, record){
        if(!mapDevice){
            Dashboard.tool.Utilities.error('[MapSrtageController.displayNewMapDevice] param is null');
            return;
        }
        this.mapController.addDeviceToMap(mapDevice);
        this.mapController.stage.batchDraw();
    },
    
    
    displayNewMapLocation: function(mapLocation, record){
        if(!mapLocation){
            Dashboard.tool.Utilities.error('[MapSrtageController.displayNewMapLocation] param is null');
            return;
        }
        this.mapController.addLocationToMap(mapLocation);
        this.mapController.stage.batchDraw();
    },
    
    
    displayNewMapLabel: function(mapLabel, record){
        if(!mapLabel){
            Dashboard.tool.Utilities.error('[MapSrtageController.displayNewMapLabel] param is null');
            return;
        }
        this.mapController.addLabelToMap(mapLabel);
        this.mapController.stage.batchDraw();
    },
    
    
    
    displayLayer: function(layerName, visible){
        switch(layerName){
            case 'map':
                this.mapController.backgroundLayerMap.setVisible(visible);
                this.mapController.backgroundLayerMap.drawScene();
                break;
                
            case 'referenceArea':
                this.mapController.referenceAreaLayerMap.setVisible(visible);
                break;
                
            case 'materials':
                this.mapController.materialsLayerMap.setVisible(visible);
                break;
                
            case 'locations':
                this.mapController.locationsLayerMap.setVisible(visible);
                break;
                
            case 'devices':
                this.mapController.devicesLayerMap.setVisible(visible);
                break;
                
            case 'links':
                this.mapController.linksLayerMap.setVisible(visible);
                break;
                
            case 'labels':
                this.mapController.labelsLayerMap.setVisible(visible);
                break;
        }
    },
       
            
    
    /**
     * Update picture 
     * @param {type} src
     * @param {type} translation
     * @param {type} rotation
     * @param {type} scale
     * @return {undefined}
     */
    updateMapImage: function(src, translation, rotation, scale){
   
        this.mapController.setBackgroundImage(src + '?temp=' + Date.now());
        this.mapController.stage.batchDraw();
        
        //this.displayMap(this.currentMap);

    },
    
    
    deleteMapElement: function(id, type){
        this.mapController.deleteMapElement(id, type);
    },
    
    deleteMapElementByName: function(name, type){
        this.mapController.deleteMapElement(name, type);
    },
          
    
    /**
     * Update reference area
     * @param {type} width
     * @param {type} height
     * @param {type} posX
     * @param {type} posY
     * @return {undefined}
     */
    updateReferenceArea: function(width, height, posX, posY){
        
        alert('set reference area ' + width +','+height+','+posX+','+posY);
        //carto.setReferenceArea(width, height, posX, posY)
    },
    
    
    snapshot: function(){
        this.mapController.snapshot();
    },
    
    
     
    changeElementsSize: function(element, homothetie){
                
        if(!element || !homothetie){
            return;
        }
        
        var elementType = element.entityName;
        var options = null;
        
       // debugger;
        
        switch(elementType){
            case "cartography.MapMaterial":
                options = this.currentMap.data.materialsLayer.options;
                break;
            case "cartography.MapDevice":
                options = this.currentMap.data.devicesLayer.options;
                break;
            case "cartography.MapLocation":
                options = this.currentMap.data.locationsLayer.options;
                break;
        }
        
        if(options){
            
            var percent = 1 / 100 * homothetie;
            options.homothetie = percent;

            Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, 'doPostUpdateConfig');
        }
        
                        
    },
    
    
    // ==========================================================================
    // Map > IHM
    // ==========================================================================
    
    onBackgroundImageClick: function(sender){
        this.selectMapElement(this.currentMap, 'MAP');
    },
    
    onMaterialDragEnd: function(updatedValue, element){
        this.saveUpdatedMap('MATERIAL', element, updatedValue);
    },
    
    onLinkDragEnd: function(element){
        this.saveUpdatedMap('LINKINGZONE', element);
    },
    
    onDeviceDragEnd: function(element){
        this.saveUpdatedMap('DEVICE', element);
    },
    
    onLabelDragEnd: function(element){
        this.saveUpdatedMap('LABEL', element);
    },
    
    onLocationDragEnd: function(element){
        this.saveUpdatedMap('LOCATION', element);
    },
    
    onLinkClicked: function(sender, link){
        this.getAndDisplayMap(link.map.id);
    },
    
    onLinkAnchorClick: function(sender){
        
    },
        
    onLocationClick: function(sender){
        
    },
        
    onDeviceClick: function(sender){
        
    },
    
    displayMaterialDetail : function(id){
        this.loadDetail(id, 'MATERIAL');
    },
    
    onEditReferenceArea: function(referenceArea){
        
    },
    
    /**
     * move or resize image
     * @param {type} mapImage
     * @return {undefined}
     */
    onEditMapImage: function(mapImage){
        
    },
    
    
    onSelectMapElement: function(sender, discriminator){
                        
        var element = sender;
        
        if(sender.target){
            element = sender.target.attrs;
        }
        
        console.log('[MapStageController.onSelectMapElement] element: ');
        console.log(element);
        this.selectMapElement(element, discriminator);
    },

    
    getAndDisplayMap: function(id){
        
        //var filters = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters(id);
        var filters = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters('current');
        Dashboard.manager.cartography.CartographyManager.getOne(id, this, 'displayMap', filters);
    },

            
            
    displayMap: function(map, isBack){
        
    
        if(!isBack){
            this.storeNavigation(map);
        }
                
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        this.currentMap = map;
          
        mainController.displayInMain({
            xtype: 'cartographyMapStage',
            store: Dashboard.manager.cartography.CartographyManager.store,
            currentMap: map,
            
            configuration: {
                enabledTools: {}
            },
            //feature: Dashboard.manager.cartography.CartographyManager.feature
            feature: this.feature
        });
        
        
    },
    
    
    displayTitle: function(mapId){
        
        //var filters = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters(mapId);
        var filters = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters('current');
        var filtersBarPanel = Ext.ComponentQuery.query('filtersBar')[0];
        
        if(filtersBarPanel){
            if(filters && filters.length > 0){
                filtersBarPanel.setTitle(getText('filters') + ' (' + filters.length + ')');
            }else{
                filtersBarPanel.setTitle(getText('filters'));
            }
        }
    },
    
    
    displayFiltersValues: function(mapId){
                
        //please do not delete this commented code
        //var filtersValues = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters(mapId);
        var filtersValues = Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters('current');
        var filtersBarPanel = Ext.ComponentQuery.query('filtersBar')[0];
        
        //please do not delete this commented code
        //var mapFilters = this.getView().currentMap.data.materialsLayer.options.filters;
        var mapFilters = this.getFilters();
                
        if(filtersBarPanel && mapFilters){
            if(filtersValues && filtersValues.length > 0){
                                
                Ext.each(mapFilters, function(mapFilter){
                                        
                    switch(mapFilter.data.type){
                            
                        case 'COMBO_ITEM_REF_CAT':
                            //Material
                            var nameValue = filtersValues.find(function (obj) { 
                                return obj.property === 'name'; 
                            });
                            if(nameValue){
                                var field = filtersBarPanel.down('field[name=material]');
                                if(field){
                                    field.setRawValue(nameValue.value);
                                }
                            }
                            //Reference code
                            var productReferenceCode = filtersValues.find(function (obj) { 
                                return obj.property === 'productReference.referenceCode'; 
                            });
                            
                            if(productReferenceCode){
                                var field = filtersBarPanel.down('field[name=productReferenceCode]');
                                if(field){
                                    field.setRawValue(productReferenceCode.value);
                                }
                            }
                            
                            //Reference designation
                            var productReferenceDesignation = filtersValues.find(function (obj) { 
                                return obj.property === 'productReference.designation'; 
                            });
                            
                            if(productReferenceDesignation){
                                var field = filtersBarPanel.down('field[name=productReferenceDesignation]');
                                if(field){
                                    field.setRawValue(productReferenceDesignation.value);
                                }
                            }
                            
                            //productReference.productCategory.name
                            var productCategory = filtersValues.find(function (obj) { 
                                return obj.property === 'productReference.productCategory.fullPath'; 
                            });
                            
                            if(productCategory){
                                var field = filtersBarPanel.down('field[name=productCategoryName]');
                                if(field){
                                    field.setRawValue(productCategory.value);
                                }
                            }
                            break;
                        case 'DATE':
                        case 'DATETIME':
                            var filterValue = filtersValues.find(function (obj) { 
                                return obj.property === mapFilter.data.name; 
                            });
                            
                            if(filterValue){
                                var field = filtersBarPanel.down('field[name='+ mapFilter.data.name +']');
                                if(field){
                                    var date = moment(filterValue.value).toDate();
                                    field.setValue(date);
                                }
                            }
                            break;
                        case 'TIME':
                            break;
                        case 'DATES_RANGE':
                            
                            var filterValueGT = filtersValues.find(function (obj) { 
                                return obj.property === mapFilter.data.name && obj.comparison === 'GT' ; 
                            });
                            
                            if(filterValueGT){
                                var field = filtersBarPanel.down('field[name=dateStart]');
                                if(field){
                                    var dateStart = moment(filterValueGT.value).toDate();
                                    dateStart.setDate(dateStart.getDate() - 1);
                                    field.setValue(dateStart);
                                }
                            }
                            
                            var filterValueLT = filtersValues.find(function (obj) { 
                                return obj.property === mapFilter.data.name && obj.comparison === 'LT' ; 
                            });
                            
                            if(filterValueLT){
                                var field = filtersBarPanel.down('field[name=dateEnd]');
                                if(field){
                                    var dateEnd = moment(filterValueLT.value).toDate();
                                    field.setValue(dateEnd);
                                }
                            }
                            
                            
                            break;
                            
                        default: //TEXT, TEXT_AREA, LONG, INT, NUMBER, COMBOBOX, ADDRESS, PROPERTY_CONFIGURATION_TYPE, 
                            //PROPERTY_TYPE, INTERVENTION_ORDERS, USERS, BADGE_NUMBER, REFRENCES_CODE, 
                            //REFRENCES_DESIGNATION, REFRENCES_DESCRIPTION, CATEGORIES, PROFILES, ALERT_LEVEL, ALERT_NAME
                            var filterValue = filtersValues.find(function (obj) { 
                                return obj.property === mapFilter.data.name; 
                            });
                            
                            if(filterValue){
                                var field = filtersBarPanel.down('field[name='+ mapFilter.data.name +']');
                                if(field){
                                    field.setValue(filterValue.value);
                                }
                            }
                            break;
                    }
                });
            }
        }
    },
    
    
    storeNavigation: function(map){
                
        var navigation = {
            origin : this.currentMap.data.id,  //provenance // from
            destination: map.data.id //to
        };
        
        Dashboard.manager.cartography.CartographyManager.navigationHistory.push(navigation);
        this.getView().down('button[reference=onBackToMap]').setDisabled(false);
        
    },
    
    
    returnToMap: function(map){
        Dashboard.manager.cartography.CartographyManager.displayInMain(this.feature);
      /*  var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
          
        mainController.displayInMain({
            xtype: 'cartographyMapStage',
            store: null,
            currentMap: map,
            
            configuration: {
                enabledTools: {}
            },
            feature: this.feature
        }); */
    }
    
    

});