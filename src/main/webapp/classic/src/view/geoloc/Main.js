/* global Ext, ol, GeoExt */

Ext.define('Dashboard.view.geoloc.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'geolocMain',
    tag: 'main',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.geoloc.MainController',
        'GeoExt.component.Map',
        'GeoExt.data.store.Features',
        'GeoExt.component.FeatureRenderer',
        'Dashboard.model.cartography.OutdoorZone'
    ],

    controller: 'geoloc',

    store: null,

    configuration: null,
    feature: null,

    iconCls: 'fa fa-map-o',
    border: false,
    heigth: '100%',
    layout: 'border',
    bodyStyle: 'background-color:#f2f5f9;',

    currentUser: null,
    userSettings: null,
    readOnly: false,

    //Open Layer Map
    map: null,
    features: null,
    linkingZonesLayer: null,
    materialsLayer: null,
    
    selectedFeature: null,

    //configuration
    defaultTarget: [2.349883, 48.853182],
    defaultZoom: 17,
    currentLocation: null,

    listeners: {
        render: 'onRenderMain'
    },

    defaults: {
        heigth: '100%'
    },

    initComponent: function (){

        this.currentLocation = Dashboard.manager.cartography.GeolocManager.currentLocation;
        
        if(Dashboard.manager.cartography.GeolocManager.zoom){
            this.defaultZoom = Dashboard.manager.cartography.GeolocManager.zoom;
        }
        
        if(Dashboard.manager.cartography.GeolocManager.mapCenter){ // Return to map
            this.defaultTarget = Dashboard.manager.cartography.GeolocManager.mapCenter;
            
        }else if (this.currentLocation) { // User PC location
            this.defaultTarget = [this.currentLocation.longitude, this.currentLocation.latitude];
            this.defaultZoom = 12;

        } else if (Dashboard.config.Config.GEOLOC_DEFAULT_TARGET) { // Configuration file
            this.defaultTarget = [Dashboard.config.Config.GEOLOC_DEFAULT_TARGET[1], Dashboard.config.Config.GEOLOC_DEFAULT_TARGET[0]];

            if (Dashboard.config.Config.GEOLOC_DEFAULT_ZOOM) {
                this.defaultZoom = Dashboard.config.Config.GEOLOC_DEFAULT_ZOOM;
            }
        }

        //Map elements loading
        this.store = Ext.create('Dashboard.store.cartography.OutdoorMapsWithMaterialsFilter', {
            autoLoad: false,
            listeners: {
                scope: this,
                beforeLoad: function (store, operation, eOpts){

                    if (!store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }

                    store.getProxy().extraParams.filters = {
                        "materials": []
                    };
                    
                    var gpsPoints = [
                        {
                            "latitude": "-90",
                            "longitude": "0"
                        }, {
                            "latitude": "90",
                            "longitude": "360"
                        }
                    ];
                                        
                    if(Dashboard.manager.cartography.GeolocManager.mapBounds){
                        
                        gpsPoints = [
                            {
                                "latitude": Dashboard.manager.cartography.GeolocManager.mapBounds[1],
                                "longitude": Dashboard.manager.cartography.GeolocManager.mapBounds[0]
                            }, {
                                "latitude": Dashboard.manager.cartography.GeolocManager.mapBounds[3],
                                "longitude": Dashboard.manager.cartography.GeolocManager.mapBounds[2]
                            }
                        ];
                    }

                    store.getProxy().extraParams.zone = {
                        "format": "DD",
                        "gpsPoints": gpsPoints
                    };

                },
                load: function (me, records, successful, operation, eOpts){
                    Dashboard.tool.Utilities.info('[Dashboard.view.geoloc.Main] OutdoorMapsWithMaterialsFilter store loaded');

                    //cleanUp
                    this.cleanView();
                    
                    if(records){
                        this.getController().currentMap = records[0];
                        var convertedRecords = this.convertData(records);
                        this.displayMapElements(convertedRecords);
                    }
                }
            }
        });

        /**
         * Please, do not delete this code
         */
//        this.store = Ext.create('Dashboard.store.Materials', {
//            autoLoad: false,
//            listeners: {
//                scope: this,
//                beforeload: function( store , operation , eOpts){
//                    
//                    var myFilter1 = {
//                        "property": "materialPropertyValues.geoCoordinatesLatitude",
//                        "value": true,
//                        "type": "FLOAT",
//                        "comparison": "IS_NOT_NULL"
//                    };
//                    
//                    var myFilter2 = {
//                        "property": "materialPropertyValues.geoCoordinatesLongitude",
//                        "value": true,
//                        "type": "FLOAT",
//                        "comparison": "IS_NOT_NULL"
//                        
//                    };
//                    
//                    if(!store.getProxy().extraParams.filter){
//                        store.getProxy().extraParams.filter = [];
//                    }
//                    
//                    store.getProxy().extraParams.filter.push(myFilter1);
//                    //store.getProxy().extraParams.filter.push(myFilter2);
//                },
//                load: function (store, records, successful, operation, eOpts){
//                    
//                    Dashboard.tool.Utilities.info('[Dashboard.view.geoloc.Main] materials store loaded');
//                    
//                    if(store.getProxy().extraParams.filter){
//                        store.getProxy().extraParams.filter = [];
//                    }
//                    
//                    this.displayMapElements(records);
//                }
//            }
//        });

        this.getController().feature = this.feature;
        this.title = getText('Geolocalization');

//        this.currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
//        this.userSettings = this.currentUser.getUserSettings();
//        
//        if(this.currentUser.data.profiles[0].name === 'All rights'){
//            this.readOnly = true;
//        }

        var filtersPanel = {

            xtype: Ext.create('Dashboard.view.shared.filtering.FiltersBar', {
                store: this.storeWithMaterialsFilter,
                parentView: this,
                modelProperties: this.modelProperties,
                filtersList: this.getController().getFilters(),
                region: 'north',
                
                hidden: true, //P2

                //Filter map action
                updateDataStore: function (){

//                    var editionMode = Dashboard.manager.cartography.CartographyManager.editionMode;
//                    var stageController = this.up('cartographyMapStage').getController();
//                    var filters = [];
//                                        
//                    if(editionMode === false){
//                        filters = this.getFilters();
//                    }
//
//                    if(filters.length > 0){
//                        this.setTitle(getText('filters') + ' (' + filters.length + ')');
//                    }else{
//                        this.setTitle(getText('filters'));
//                    }
//                    
//                    //Dashboard.manager.cartography.CartographyManager.setUserMaterialsFilters(stageController.currentMap.data.id, filters);
//                    Dashboard.manager.cartography.CartographyManager.setUserMaterialsFilters('current', filters);
//                    stageController.getAndDisplayMap(stageController.currentMap.data.id, filters);
                }
            })
        };

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                ui: 'view-list',
                defaults: {
                    xtype: 'button',
                    scale: 'small',
                    ui: 'view-list',
                    border: false
                },
                items: [
//                    {
//                        iconCls: 'fa fa-map',
//                        tooltip: getText('Layers displaying'),
//                        handler: 'onLayersDisplaying'
//                    },
                    '->',
                    {
                        iconCls: 'fa fa-lock',//'fa fa-wrench',
                        enableToggle: true,
                        handler: 'onToggleEditionMode',
                        reference: 'onToggleEditionMode'
                    }//,
//                    {
//                        iconCls: 'fa fa-wrench',
//                        enableToggle: false,
//                        handler: 'onConfigViewList',
//                        reference: 'configViewList',
//                        scope: this
//                    }, {
//                        iconCls: 'fa fa-compress',
//                        enableToggle: true,
//                        toggleHandler: 'toggleDisplayDetail',
//                        reference: 'displayDetail',
//                        scope: this
//                    }
                ]
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'view-list',
                height: 40,
                defaults: {
                    xtype: 'button',
                    scale: 'small',
                    ui: 'view-list',
                    border: false
                },
                items: [
                    {
                        iconCls: 'fa fa-refresh',
                        tooltip: getText('Refresh'),
                        handler: 'onRefresh',
                        reference: 'refreshButton'
                    }, 
                    '-',
                    {
//                        iconCls: 'fa fa-map-marker',
//                        tooltip: getText('Add location'),
//                        handler: 'onAddLocation'
//                    }, {
//                        iconCls: 'fa fa-laptop',//'fa fa-columns',
//                        tooltip: getText('Add device'),
//                        handler: 'onAddDevice'
//                    }, {
                        iconCls: 'fa fa-link', //fa fa-external-link
                        tooltip: getText('Add link to map'),
                        handler: 'onAddLinkToMap'
                    },
                    '-',
//                    {
//                        iconCls: 'fa fa-pencil',
//                        tooltip: getText('Edit selected element'),
//                        handler: 'onEditElement'
//                    }, 
                    {
                        iconCls: 'fa fa-minus-circle',
                        tooltip: getText('Delete selected element'),
                        hidden: true,
                        handler: 'onDeleteElement',
                        reference : 'deleteButton'
                    }
                ]
            }

        ];


        //var mapComponent = this.getMap();

        var poly = Ext.create('GeoExt.component.FeatureRenderer', {
            symbolizers: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [128, 128, 0, 0.25]
                }),
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 2,
                    lineDash: [1.5, 7.5]
                })
            })
        });


        this.items = [
            filtersPanel,
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',

                dockedItems: dockedItems,

                items: [
                    {
                        xtype: 'panel',
                        region: 'west',
                        title: getText('Items'),
                        reference: 'featuresPanel',
                        //width: 250,
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: true,
                        items: []
                    }, {
                        xtype: 'panel',
                        region: 'center',
                        reference: 'mapPanel',
                        flex: 3,
                        layout: 'fit',
                        items: []
                    }, {
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        hidden: false,
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: true,
                        header: true,
                        items: {
                            xtype: 'geolocDetail',
                            toolBarVisible: false,
                            configEnabled: false
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);

        this.configView();
        var editionMode = Dashboard.manager.cartography.GeolocManager.editionMode;
        this.getController().toggleEditionMode(editionMode);

        this.store.load();

    },
    
    cleanView: function(){
                
        this.down('panel[reference=featuresPanel]').removeAll();
        this.down('panel[reference=mapPanel]').removeAll();
        this.down('panel[reference=detailContainer]').removeAll();
        this.down('panel[reference=detailContainer]').add({
            xtype: 'geolocDetail',
            toolBarVisible: false,
            configEnabled: false
        });
        
    },

    /**
     * convert mapMaterials to object
     * @param {type} records
     * @returns {recors} list of mapMaterials
     */
    convertData: function (records){

        var mapMaterials = records[0].data.mapMaterials;
        var mapLinkingZones = records[0].data.mapLinkingZones;

        Ext.each(mapMaterials, function (mapMaterial){
            mapMaterial = Ext.create(Dashboard.model.cartography.MapMaterial, mapMaterial);
        });

        Ext.each(mapLinkingZones, function (zone){
            zone = Ext.create(Dashboard.model.cartography.OutdoorZone, zone);
        });

        return records;

    },

    configView: function (){

        if (Dashboard.manager.FeaturesManager.isEnabled('MAPS_ADMIN') === false) {
            this.down('button[reference=onToggleEditionMode]').hidden = true;
            this.getController().editionMode = false;
        } else {
            this.down('button[reference=onToggleEditionMode]').hidden = false;
        }

    },

    displayMapElements: function (records){

        // add map
        var mapComponent = this.createMapComponent(records);
        this.down('panel[reference=mapPanel]').add(mapComponent);


        // add west features grid
        var featuresGrid = this.getFeaturesGrid(records);
        this.down('panel[reference=featuresPanel]').add(featuresGrid);

    },

    createMapComponent: function (records){

        this.materialsLayer = this.createMaterialsLayer(records);
        this.linkingZonesLayer = this.createLinkingZonesLayer(records);

        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM({
                        //layer: 'watercolor'
                    })
                }),

//                new ol.layer.Tile({
//                    source: new ol.source.Stamen({
//                        layer: 'watercolor'
//                    })
//                }),
//                new ol.layer.Tile({
//                    source: new ol.source.OSM()
////                    source: new ol.source.Stamen({
////                        layer: 'terrain-labels'
////                    })
//                }),
                this.linkingZonesLayer,
                this.materialsLayer

            ],
            view: new ol.View(
                    {
                        center: ol.proj.fromLonLat(this.defaultTarget),
                        zoom: this.defaultZoom
                    }
            )
        });

        var mapComponent = Ext.create('GeoExt.component.Map', {
            map: this.map,
            pointerRest: true,
            pointerRestInterval: 750,
            pointerRestPixelTolerance: 5
        });

        //this.addPopup(mapComponent);
        
        var popup = Ext.create('GeoExt.component.Popup', {
            map: this.map,
            width: 200
        });

        this.map.on("pointermove", function (e) {
                        
            var coordinate = e.coordinate;
            
            if (Dashboard.manager.cartography.GeolocManager.editionMode === true) {
                return;
            }

            var feature = this.map.forEachFeatureAtPixel(e.pixel, function (feature, layer){
                return feature;
            });
          
            if(feature && feature.getProperties().mapLinkingZone){
                          
                popup.setHtml('<p><strong>' + feature.getProperties().name + '</strong></p>');
                popup.position(coordinate);
                popup.show();
                
            }else{
                
                popup.position(null);
                popup.hide();
                
            }

        }, this);


        this.map.on("singleclick", function (e){

            var materials = [];
            var zones = [];

            this.map.forEachFeatureAtPixel(e.pixel, function (feature, layer){

                if (!layer) {
                    return;
                }

                if (layer.getProperties().name === 'materialsLayer') {
                    materials.push(feature);

                } else if (layer.getProperties().name === 'linkingZonesLayer') {
                    zones.push(feature);
                }

            }, this);

            if (materials.length > 0) {
                this.onMaterialClick(materials[0]);

            } else if (zones.length > 0) {
                this.onLinkClick(zones[0]);
            }

        }, this);
        
        
        this.map.on("moveend", function (e){
                                    
            var zoom = this.getView().getZoom();
        
            var mapBounds = this.getView().calculateExtent(this.getSize());
            mapBounds = ol.proj.transformExtent(mapBounds, 'EPSG:3857', 'EPSG:4326');
        
            var mapCenter = this.getView().getCenter();
            mapCenter = ol.proj.transform(mapCenter, 'EPSG:3857', 'EPSG:4326');
            
            Dashboard.manager.cartography.GeolocManager.zoom = zoom;
            Dashboard.manager.cartography.GeolocManager.mapBounds = mapBounds;
            Dashboard.manager.cartography.GeolocManager.mapCenter = mapCenter;
            
        });

//        // register an event handler for the click event
//        this.map.on('click', function (event){
//            // extract the spatial coordinate of the click event in map projection units
//            var coord = event.coordinate;
//            // transform it to decimal degrees
//            var degrees = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
//            // format a human readable version
//            var hdms = ol.coordinate.toStringHDMS(degrees);
//
//            alert(hdms);
//            // update the overlay element's content
//            //var element = overlay.getElement();
//            //element.innerHTML = hdms;
//            // position the element (using the coordinate in the map's projection)
//            //overlay.setPosition(coord);
//            // and add it to the map
//            //map.addOverlay(overlay);
//        });

        return mapComponent;
    },

    onMaterialClick: function (feature){

        if (feature.getProperties().mapMaterial === undefined) { // Not a material
            return;
        }
        
        this.selectedFeature = feature;
        console.log('Selected feature (material) :'+feature.getProperties().mapMaterial.id);
        
        var deleteButton = this.down('button[handler=onDeleteElement]');
        deleteButton.setVisible(false);

        var id = feature.getProperties().mapMaterial.material.id;
        var name = feature.getProperties().name;

        if (this.selectedId === id) { // Workaround double event
            this.selectedId = null;
            return;
        }

        this.selectedId = id;

        // reset grid selections
        var grid = this.down('grid[reference=featuresGrid]');

        for (var i = 0; i < grid.getStore().data.items.length; i++) {
            var rec = grid.getStore().data.items[i];

            if (rec.data.mapMaterial.material.id === feature.getProperties().mapMaterial.material.id) {
                rec.getFeature().setStyle(this.getSelectStyle());
            } else {
                rec.getFeature().setStyle(this.getMaterialStyle());
            }
        }

        grid.setSelection(null);
                
        // reset layer selections
        var features = this.materialsLayer.getSource().getFeatures();
        Ext.each(features, function (feat){
            feat.setStyle(this.getMaterialStyle(feat.getProperties().name));
        }, this);

        // highlight grid selection in map
        feature.setStyle(this.getSelectStyle(feature.getProperties().name));
        this.map.renderSync();
        //this.map.render();

        var mainController = this.getController();
        mainController.displayMaterialDetail(id);

    },

    onLinkClick: function (feature){
        
        if (!feature.getProperties().mapLinkingZone) {
            return;
        }
        
        this.selectedFeature = feature;
        
       // debugger;
        var deleteButton = this.down('button[handler=onDeleteElement]');
        if(Dashboard.manager.cartography.GeolocManager.editionMode === true){
            deleteButton.setVisible(true);
            
            //debugger;
            // reset layer selections
            var features = this.linkingZonesLayer.getSource().getFeatures();
            Ext.each(features, function (feat){
                feat.setStyle(this.getZoneStyle(feat.getProperties().color));
            }, this);
            
            // highlight grid selection in map
            this.selectedFeature.setStyle(this.getSelectedZoneStyle(feature.getProperties().color));
            this.map.renderSync();
        }
        
        console.log('Selected feature (link) :'+feature.getProperties().mapLinkingZone.id);
                
        var id = feature.getProperties().mapLinkingZone.id;
        var indoorMapId = feature.getProperties().mapLinkingZone.indoorMapId;
        
        if (Dashboard.manager.cartography.GeolocManager.editionMode !== true) {
            this.getController().getAndDisplayMap(indoorMapId);
        }

    },
   
    
    createMaterialsLayer: function (records){

        this.geoData = this.getGeoData(records);

        var style = this.getMaterialStyle(); //this.getStar(); this.getPolygone();
        //var shadow = this.getShadowStyle();

        // loading data via into ol source and create a vector layer to bind a
        // vector layer to a feature store
        var materialsLayer = new ol.layer.Vector({
            name: 'materialsLayer',
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(this.geoData, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                })
            }),
            style: function (feature){
                style.getText().setText(feature.get('label'));
                return [style];
                //return this.getMaterialStyle(feature.get('name'));
            }
            //style: [style, shadow]
        });

        materialsLayer.setZIndex(2);

        return materialsLayer;
    },

    /**
     * get geoData 
     * @param {type} records
     * @returns {MainAnonym$0.getFeatures.geoData}
     */
    getGeoData: function (records){

        var geoData = {
            type: 'FeatureCollection',
            features: []
        };

        Ext.each(records[0].data.mapMaterials, function (mapMaterial){

            var name = mapMaterial.material.name;
            var referenceDesignation = mapMaterial.material.productReference.designation;
            var coordinates = mapMaterial.geolocalization.coordinates;

            var feature = {
                type: 'Feature',
                properties: {
                    name: name,
                    label: name,
                    reference: referenceDesignation,
                    mapMaterial: mapMaterial//,
                            //color: this.getRandomColor()
                },
                geometry: {
                    type: 'Point',
                    coordinates: [
                        coordinates.longitude,
                        coordinates.latitude
                    ]
                }
            };

            geoData.features.push(feature);

        }, this);

        return geoData;
    },

    getRandomColor: function (){

        var colors = [
            {
                aqua: "#00ffff"
            }, {
                azure: "#f0ffff"
            }, {
                beige: "#f5f5dc"
            }, {
                black: "#000000"
            }, {
                blue: "#0000ff"
            }, {
                brown: "#a52a2a"
            }, {
                cyan: "#00ffff"
            }, {
                darkblue: "#00008b"
            }, {
                darkcyan: "#008b8b"
            }, {
                darkgrey: "#a9a9a9"
            }, {
                darkgreen: "#006400"
            }, {
                darkkhaki: "#bdb76b"
            }, {
                darkmagenta: "#8b008b"
            }, {
                darkolivegreen: "#556b2f"
            }, {
                darkorange: "#ff8c00"
            }, {
                darkorchid: "#9932cc"
            }, {
                darkred: "#8b0000"
            }, {
                darksalmon: "#e9967a"
            }, {
                darkviolet: "#9400d3"
            }, {
                fuchsia: "#ff00ff"
            }, {
                gold: "#ffd700"
            }, {
                green: "#008000"
            }, {
                indigo: "#4b0082"
            }, {
                khaki: "#f0e68c"
            }, {
                lightblue: "#add8e6"
            }, {
                lightcyan: "#e0ffff"
            }, {
                lightgreen: "#90ee90"
            }, {
                lightgrey: "#d3d3d3"
            }, {
                lightpink: "#ffb6c1"
            }, {
                lightyellow: "#ffffe0"
            }, {
                lime: "#00ff00"
            }, {
                magenta: "#ff00ff"
            }, {
                maroon: "#800000"
            }, {
                navy: "#000080"
            }, {
                olive: "#808000"
            }, {
                orange: "#ffa500"
            }, {
                pink: "#ffc0cb"
            }, {
                purple: "#800080"
            }, {
                violet: "#800080"
            }, {
                red: "#ff0000"
            }, {
                silver: "#c0c0c0"
            }, {
                white: "#ffffff"
            }, {
                yellow: "#ffff00"
            }
        ];

        var index = Math.floor(Math.random() * Math.floor(colors.length));
        var color = colors[index];
        var key = Object.keys(color)[0];
        var value = color[key];

        return value;

    },

    getRedStyle: function (){

        var redStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#8B0000'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 5
                })
            })
        });

        return redStyle;
    },

    getZoneStyle: function (color){
        
        if(!color){
            color = '#00ff00';
        }

        var poly = new ol.style.Style(
            {
                fill: new ol.style.Fill({
                    color: color + '20'//[128, 128, 0, 0.25]
                }),
                stroke: new ol.style.Stroke({
                    color: color, //'#666666',
                    width: 2,
                    lineDash: [7.5, 7.5] //[1.5, 7.5]
                })
            }
        );
        return poly;
    },
    
    getSelectedZoneStyle: function (color){
        
        if(!color){
            color = '#00ff00';
        }

        var poly = new ol.style.Style(
            {
                fill: new ol.style.Fill({
                    color: color + '50'//[128, 128, 0, 0.25]
                }),
                stroke: new ol.style.Stroke({
                    color: color, //'#666666',
                    width: 3//,
                    //lineDash: [7.5, 7.5] //[1.5, 7.5]
                })
            }
        );
        return poly;
    },

    getStar: function (){

        return new ol.style.Style({
            image: new ol.style.RegularShape({
                fill: new ol.style.Fill({
                    color: 'yellow'
                }),
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 1
                }),
                points: 5,
                radius: 8,
                radius2: 4,
                angle: 0
            })
        });
    },

    getMaterialStyle: function (label){

        var style = new ol.style.Style({
            image: new ol.style.Circle({
                alt: 'icon',
                radius: 8,
                fill: new ol.style.Fill({
                    color: '#115fa6' //dashboard blue
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            }),
            text: new ol.style.Text({
                text: label,
                font: '12px verdana, arial, Tahoma', //'bold 48px serif';
                fill: new ol.style.Fill({
                    color: 'black'
                }),
                //stroke: new ol.style.Stroke({color: 'white', width: 1}),
                offsetX: 0,
                offsetY: 20
            })
        });

        return style;
    },

    getColorStyle: function (color){

        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({
                    color: color
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        });

        return style;
    },

    getSelectStyle: function (label){

        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({
                    color: '#FF0000' //#FAC411  //dashboard orange
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            }),
            text: new ol.style.Text({
                text: label,
                font: '12px verdana, arial, Tahoma', //'bold 48px serif';
                fill: new ol.style.Fill({
                    color: 'black'
                }),
                //stroke: new ol.style.Stroke({color: 'white', width: 1}),
                offsetX: 0,
                offsetY: 20
            })
        });

        return style;
    },

    getShadowStyle: function (){

        var shadowStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(0,0,0,0.5)',
                width: 6
            }),
            zIndex: 0
        });

        return shadowStyle;

    },

    /**
     * get grid
     * @param {type} records
     * @returns {Object}
     */
    getFeaturesGrid: function (records){

        // create a feature collection in order to put into a feature store
        this.vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(this.geoData, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            })
        });

        this.featColl = new ol.Collection(this.vectorSource.getFeatures());

        // create feature store by passing a feature collection
        var featuresStore = Ext.create('GeoExt.data.store.Features', {
            fields: ['name', 'reference', 'mapMaterial', 'color'],
            model: 'GeoExt.data.model.Feature',
            features: this.featColl,
            map: this.map,
            createLayer: true,
            style: this.getMaterialStyle(),
            listeners:{
                scope: this,
                sort: function( store, eOpts ){

                    //path to work around an Open Layers displaying bug
                    Ext.defer(function() {
                        var grid  = this.down('grid');
                        grid.getColumns()[0].setWidth(41);
                        grid.getColumns()[0].setWidth(40);
                    }, 100, this);
                }
            }
        });

        var featRenderer = GeoExt.component.FeatureRenderer;

        var grid = Ext.create('Ext.grid.Panel', {
            reference: 'featuresGrid',
            border: true,
            store: featuresStore,
            flex: 1,
            columns: [
                {
                    xtype: 'widgetcolumn',
                    width: 40,
                    autoRender: true,
                    widget: {
                        xtype: 'gx_renderer'
                    },
                    scope: this,
                    onWidgetAttach: function (column, gxRenderer, record){

                        // update the symbolizer with the related feature
                        var feature = record.getFeature();
                        feature.setStyle(featRenderer.determineStyle(record));
                        gxRenderer.setFeature(feature);
                        //gxRenderer.setSymbolizers(featRenderer.determineStyle(record));
                    }
                }, {
                    text: getText('Name'),
                    dataIndex: 'name',
                    flex: 1
                }, {
                    text: getText('Reference'),
                    dataIndex: 'reference',
                    //xtype: 'numbercolumn',
                    //format: '0,000',
                    flex: 1
                }
            ],
            listeners: {
                scope: this,
                select: function (grid, record, index, eOpts){

                    // reset all selections
                    grid.getStore().each(function (rec){
                        rec.getFeature().setStyle(this.getMaterialStyle());
                    }, this);

                    // highlight grid selection in map
                    record.getFeature().setStyle(this.getSelectStyle());
                    
                    var features = this.materialsLayer.getSource().getFeatures();
                    Ext.each(features, function (feat){
                                                
                        if(feat.getProperties().mapMaterial.material.id === record.data.mapMaterial.material.id){
                            feat.setStyle(this.getSelectStyle(feat.getProperties().name));
                        }else{
                            feat.setStyle(this.getMaterialStyle(feat.getProperties().name));
                        }
                        
                    }, this);


                    this.map.renderSync();
                    this.getController().displayMaterialDetail(record.data.mapMaterial.material.id);
                    this.doPan(record);
                    
                }
            }
        });

        return grid;
    },

    doPan: function (record){

        var coordinates = record.data.mapMaterial.geolocalization.coordinates;
        var target = ol.proj.fromLonLat([coordinates.longitude, coordinates.latitude]);

        this.map.getView().animate({
            center: target,
            duration: 2000
        });
    },

    addPopup: function (mapComponent){

        var popup = Ext.create('GeoExt.component.Popup', {
            map: this.map,
            width: 140
        });

        // Add a pointerrest handler to the map component to render the popup.
        mapComponent.on('pointerrest', function (evt){
            
            var coordinate = evt.coordinate;
//            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
//                coordinate, 'EPSG:3857', 'EPSG:4326')
//            );
            var transformed = ol.proj.toLonLat(coordinate);
            var hdms = ol.coordinate.toStringHDMS(transformed);

            // Insert a linebreak after either N or S in hdms
            hdms = hdms.replace(/([NS])/, '$1<br>');

            // set content and position popup
            popup.setHtml('<p><strong>Pointer rested on</strong>' +
                    '<br /><code>' + hdms + '</code></p>');

            popup.position(coordinate);
            popup.show();
        });

        // hide the popup once it isn't on the map any longer
        mapComponent.on('pointerrestout', popup.hide, popup);

    },

    getInvalidFields: function (){

        var invalidFields = [];
        Ext.suspendLayouts();

        this.down('form').getForm().getFields().filterBy(function (field){
            if (field.validate())
                return;
            invalidFields.push(field);
        });

        Ext.resumeLayouts(true);
        var messages = [];

        for (var i = 0; i < invalidFields.length; i++) {
            var text = '';
            if (invalidFields[i].fieldLabel !== undefined) {
                text += invalidFields[i].fieldLabel + " > ";
            }
            messages.push(text + invalidFields[i].activeErrors[0]);
        }

        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
        return invalidFields;
    },

    getData: function (){

        var userSettings = {};
        userSettings.personalFilters = this.down('field[reference=personalFilters]').checked;
        userSettings.personalColumns = this.down('field[reference=personalColumns]').checked;
        userSettings.personalDetail = this.down('field[reference=personalDetail]').checked;

        return userSettings;
    },

    /**************************************************************************
     *           FEATURES EDITING
     **************************************************************************/

    drawLinkingZone: function (){

        if (this.draw) {
            this.stopDraw();
        }

        this.draw;

        var geometryFunction = ol.interaction.Draw.createBox();

        this.draw = new ol.interaction.Draw({
            source: this.linkingZonesLayer.getSource(),
            type: 'Circle',
            geometryFunction: geometryFunction
        });

//        this.draw = new ol.interaction.Draw({
//            source: this.linkingZonesLayer.getSource(), //linkslayer
//            type: "Polygon"//,
//            //stopClick: true
//            
//        });

        this.draw.on("drawend", function (e){
            var newFeature = e.feature;
            var main = Ext.ComponentQuery.query('geolocMain')[0];
            main.stopDraw();
            main.editFeature(newFeature);
        });

        this.map.addInteraction(this.draw);

        this.getController().enabledTool = "drawLinkingZone";
    },

    stopDraw: function (){

        if (this.draw) {
            this.map.removeInteraction(this.draw);
            this.getController().enabledTool = null;
            this.draw = null;
        }
        
    },

    editFeature: function (feature){
        
//        var zoom = this.map.getView().getZoom();
//        
//        var mapBounds = this.map.getView().calculateExtent(this.map.getSize());
//        mapBounds = ol.proj.transformExtent(mapBounds, 'EPSG:3857', 'EPSG:4326');
//
//        var mapCenter = this.map.getView().getCenter();
//        mapCenter = ol.proj.transform(mapCenter, 'EPSG:3857', 'EPSG:4326');
//
//        Dashboard.manager.cartography.GeolocManager.zoom = zoom;
//        Dashboard.manager.cartography.GeolocManager.mapBounds = mapBounds;
//        Dashboard.manager.cartography.GeolocManager.mapCenter = mapCenter;

        var gpsPoints = [];

        var coordinates = feature.getGeometry().getCoordinates();
        var longLatCoordonates = [];

        Ext.each(coordinates[0], function (coord){

            var coordinate = ol.proj.toLonLat(coord);

            longLatCoordonates.push(coordinate);

            var gpsPoint = {
                'format': 'DD',
                'coordinates': {
                    'latitude': coordinate[1] + "",
                    'longitude': coordinate[0] + ""
                }
            };
            if (gpsPoints.length < 4) {
                gpsPoints.push(gpsPoint);
            }
        });

        var linkingZone = Ext.create('Dashboard.model.cartography.OutdoorZone', {
            gpsPoints: gpsPoints
        });

        this.editZoneWindow = Ext.create(Dashboard.view.geoloc.EditZone, {
            linkingZone: linkingZone,
            saved: false,
            mainController: this.getController(),
            feature: feature
        });

        this.editZoneWindow.show();

    },

    getLinksZones: function (){

        var features = null;

        if (this.linkslayer) {
            features = this.linkslayer.getSource().getFeatures();
        }


        //this.linkslayer.getSource().getFeatures()[0].getGeometry().getCoordinates()
        return features;

    },

    addLinkingZone: function (){

    },

    createLinkingZonesLayer: function (records){

//        var image = new ol.style.Circle({
//            radius: 5,
//            fill: null,
//            stroke: new ol.style.Stroke({
//                color: 'red',
//                width: 1
//            })
//        });

//        var styles = {
//            'Point': new ol.style.Style({
//                image: image
//            }),
//            'LineString': new ol.style.Style({
//                stroke: new ol.style.Stroke({
//                    color: 'green',
//                    width: 1
//                })
//            }),
//            'MultiLineString': new ol.style.Style({
//                stroke: new ol.style.Stroke({
//                    color: 'green',
//                    width: 1
//                })
//            }),
//            'MultiPoint': new ol.style.Style({
//                image: image
//            }),
//            'MultiPolygon': new ol.style.Style({
//                stroke: new ol.style.Stroke({
//                    color: 'yellow',
//                    width: 1
//                }),
//                fill: new ol.style.Fill({
//                    color: 'rgba(255, 255, 0, 0.1)'
//                })
//            }),
//            'Polygon': new ol.style.Style({
//                stroke: new ol.style.Stroke({
//                    color: 'green',
//                    //lineDash: [4],
//                    width: 2
//                }),
//                fill: new ol.style.Fill({
//                    color: 'rgba(0, 255, 0, 0.1)'
//                })
//            }),
//            'GeometryCollection': new ol.style.Style({
//                stroke: new ol.style.Stroke({
//                    color: 'magenta',
//                    width: 2
//                }),
//                fill: new ol.style.Fill({
//                    color: 'magenta'
//                }),
//                image: new ol.style.Circle({
//                    radius: 10,
//                    fill: null,
//                    stroke: new ol.style.Stroke({
//                        color: 'magenta'
//                    })
//                })
//            }),
//            'Circle': new ol.style.Style({
//                stroke: new ol.style.Stroke({
//                    color: 'red',
//                    width: 2
//                }),
//                fill: new ol.style.Fill({
//                    color: 'rgba(255,0,0,0.2)'
//                })
//            })
//        };

//        var styleFunction = function (feature){
//            return styles[feature.getGeometry().getType()];
//        };

        //;

        var featureZones = [];

        Ext.each(records[0].data.mapLinkingZones, function (linkingZone){

            var label = linkingZone.tooltip;
            var coordinates = linkingZone.coordinates;

            var feature = {
                type: 'Feature',
                properties: {
                    name: label,
                    label: label,
                    mapLinkingZone: linkingZone,
                    color: linkingZone.color
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        coordinates
                    ]
                }
            };

            featureZones.push(feature);

        }, this);

        var geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
                'type': 'name',
                'properties': {
                    'name': 'EPSG:3857'
                }
            },
            'features': featureZones
//                    [
//                {
//                    'type': 'Feature',
//                    'geometry': {
//                        'type': 'Polygon', //ol.proj.fromLonLat([coordinates.longitude, coordinates.latitude]);
//                        'coordinates': [
//                            [
//                                [7.015575720237731, 43.61036866648058],
//                                [7.015795661376953, 43.610258940808194],
//                                [7.015886856483459, 43.61035313011433],
//                                [7.015992803739547, 43.61030554996779],
//                                [7.016077293323518, 43.61039294204477],
//                                [7.015945865081787, 43.610459942551074],
//                                [7.016069246696472, 43.610593943339836],
//                                [7.015941841768264, 43.61065317547738],
//                                [7.015814436840057, 43.610521116861236],
//                                [7.015874786542892, 43.61048713114107],
//                                [7.0157943202724455, 43.61040459431209],
//                                [7.015666915344238, 43.61046576867852],
//                                [7.015575720237731, 43.61036866648058]
//                            ]
//                        ]
//                    }
//                }
//            ]
        };


        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojsonObject, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            })
        });
        
        Ext.each(vectorSource.getFeatures(), function(feature){
            feature.setStyle(this.getZoneStyle(feature.getProperties().color));
        }, this);

        var vectorLayer = new ol.layer.Vector({
            name: 'linkingZonesLayer', //linksLayer
            source: vectorSource,
            style: this.getZoneStyle('#00ff00')//styleFunction
        });

        vectorLayer.setZIndex(1);

        return vectorLayer;
    }

});