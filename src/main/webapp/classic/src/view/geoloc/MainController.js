/* global Ext, ol  */

Ext.define('Dashboard.view.geoloc.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.geoloc',
    
    require:[
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.material.Detail'
    ],
    
    feature: null,
    
    view: 'geolocMain',
    
    enabledTool: null,
    
    currentMap: null,
    editLinkToMapWindow: null,
        
    init: function() {
        
         this.control({

        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================

    
    onCheckPersonalFilters: function(sender){
        this.updateUserSettings(sender);
    },
            
    onCheckPersonalColumns: function(sender){
        this.updateUserSettings(sender);
    },
    
    onCheckPersonalDetail: function(sender){
        this.updateUserSettings(sender);
    },
    
    
    onRenderMain: function(sender){
        
    },
    
    onToggleEditionMode: function(sender){
        this.toggleEditionMode();
    },
    
    onAddLinkToMap: function(){
        this.drawLinkingZone();
    },
    
    onSaveZone: function(sender){
        this.saveZone(sender);
    },
    
    onDeleteElement: function(){
        if(!this.getView().selectedFeature){
            return;
        }
        this.confirmDelete(this.getView().selectedFeature);
    },
    
    onRefresh: function(sender){
                
        var zoom = this.getView().map.getView().getZoom();
        
        var mapBounds = this.getView().map.getView().calculateExtent(this.getView().map.getSize());
        mapBounds = ol.proj.transformExtent(mapBounds, 'EPSG:3857', 'EPSG:4326');

        var mapCenter = this.getView().map.getView().getCenter();
        mapCenter = ol.proj.transform(mapCenter, 'EPSG:3857', 'EPSG:4326');

        Dashboard.manager.cartography.GeolocManager.zoom = zoom;
        Dashboard.manager.cartography.GeolocManager.mapBounds = mapBounds;
        Dashboard.manager.cartography.GeolocManager.mapCenter = mapCenter;
        
        this.getView().defaultZoom = Dashboard.manager.cartography.GeolocManager.zoom;
        this.getView().defaultTarget = Dashboard.manager.cartography.GeolocManager.mapCenter;
        
        this.getView().store.load();
    },
    

    //==========================================================================
    //   Methods
    //==========================================================================
    
    getFilters: function(){
                        
        var filtersList = Dashboard.manager.FiltersManager.getFiltersListByFeature(this.feature);
        return filtersList;
    },
    
    displayMaterialDetail: function(materialId){
        
        Dashboard.manager.administration.MaterialManager.getOne(materialId, this, 'displayDetail');
        
    },
    
    displayDetail: function (record){
                
        try {
            var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
            detailContainer.removeAll();
            detailContainer.add(
                {
                    xtype: 'materialDetail',
                    toolBarVisible: false,
                    configEnabled: false
                }
            );
        
            detailContainer.down('materialDetail').setData(record.data);
            
        } catch (ex) {
            Dashboard.tool.Utilities.error('[geoloc.MainController.displayDetail] error : ' + ex);
        }
    },
    
    toggleEditionMode: function(mode){
        
        var editionMode = Dashboard.manager.cartography.GeolocManager.editionMode;
                        
        if(mode !== undefined ){
            editionMode = mode;
        }else{
            editionMode = !editionMode;
            Dashboard.manager.cartography.GeolocManager.editionMode = editionMode;
        }
        
        var buttons = this.getView().query('toolbar[dock=bottom] > *');
        Ext.each(buttons, function(button){
            if(button.reference !== 'refreshButton' /*&& button.reference !== 'deleteButton'*/){
                button.setVisible(editionMode);
            }
        }, this);
        
                       
        var button = this.getView().down('button[reference=onToggleEditionMode]');
        var filtersBar = this.getView().down('filtersBar');
                
        if(editionMode){
            button.setIconCls('fa fa-unlock-alt');
            filtersBar.setVisible(false);
            
        }else{
            button.setIconCls('fa fa-lock');
            filtersBar.setVisible(false);  //true P2
            
            //Stop drawing features
            this.getView().stopDraw();
        }
        
        Dashboard.tool.Utilities.info('[view.geoloc.MainController] editionMode : ' + editionMode);
    },
    
    
    drawLinkingZone: function(sender){
        
        if(this.enabledTool === "drawLinkingZone"){
            this.getView().stopDraw();
        }else{
            this.getView().drawLinkingZone();
        }
        
    },
    
    saveZone: function(sender){
                        
        var win = sender.up('window');
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var zone = win.getData();
        
        var feature = win.feature;
        feature.setStyle(this.getView().getZoneStyle(zone.data.color)); 
        
        win.close();

        Dashboard.manager.cartography.GeolocManager.saveZone(zone, this, 'doPostSaveLinkingZone');
        
    },
    
    doPostSaveLinkingZone: function(map){
        
        var zoom = this.getView().map.getView().getZoom();
        
        var mapBounds = this.getView().map.getView().calculateExtent(this.getView().map.getSize());
        mapBounds = ol.proj.transformExtent(mapBounds, 'EPSG:3857', 'EPSG:4326');

        var mapCenter = this.getView().map.getView().getCenter();
        mapCenter = ol.proj.transform(mapCenter, 'EPSG:3857', 'EPSG:4326');

        Dashboard.manager.cartography.GeolocManager.zoom = zoom;
        Dashboard.manager.cartography.GeolocManager.mapBounds = mapBounds;
        Dashboard.manager.cartography.GeolocManager.mapCenter = mapCenter;
        
        this.getView().defaultZoom = Dashboard.manager.cartography.GeolocManager.zoom;
        this.getView().defaultTarget = Dashboard.manager.cartography.GeolocManager.mapCenter;
        
        this.getView().store.load();
                
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
                
         
         if(selection.getProperties().mapLinkingZone){
             
            var id = selection.getProperties().mapLinkingZone.id;
             
            if(id){
                Dashboard.manager.cartography.GeolocManager.deleteZone(id, this, 'doPostDeleteElement');
            }
            
            // remove zone 
            var zones = this.getView().linkingZonesLayer.getSource().getFeatures();
            Ext.each(zones, function(zone){

                if(zone === selection){
                    this.getView().linkingZonesLayer.getSource().removeFeature(selection);
                }

            }, this);
             
         }
        
        //this.deleteMapElement(id, type);
        
        //this.deleteMapElementByName(selection.data.name, type);
                
//        var obj = list.indexOf(selection.data);
//        list.splice(obj, 1);
//        
//        this.updateChosenMap(this.currentMap);
//        
        this.getView().selectedFeature = null;
//
        //Dashboard.tool.Utilities.info('[geoloc.MainController.doDeleteElement] delete:' + Ext.decode(selection));
//                
//        Dashboard.manager.cartography.CartographyManager.update(this.currentMap, this, null); //'doPostDeleteElement'
//        
    },
    
    doPostDeleteElement: function(){
        
        //this.getView().store.load();
        
                                
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
    
    
    getAndDisplayMap: function(indoorMapId){
        
        var filters = []; //Dashboard.manager.cartography.CartographyManager.getUserMaterialsFilters('current');
        Dashboard.manager.cartography.CartographyManager.getOne(indoorMapId, this, 'displayIndoorMap', filters);
    },
    
    
    displayIndoorMap: function(map, isBack){
                 
        var mainController = Ext.ComponentQuery.query('app_main')[0].getController();
        
        this.storeNavigation(map);
        
        var currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MAPS_CONSULTATION');
          
        mainController.displayInMain({
            xtype: 'cartographyMapStage',
            store: Dashboard.manager.cartography.CartographyManager.store,
            currentMap: map,
            
            configuration: {
                enabledTools: {}
            },
            feature: currentFeature
        });
        
    },
    
    storeNavigation: function(map){
                        
        var navigation = {
            origin : 'geoloc', //provenance // from
            destination: map.data.id //to
        };
        
        Dashboard.manager.cartography.CartographyManager.navigationHistory.push(navigation);
        
    }
    
    
});