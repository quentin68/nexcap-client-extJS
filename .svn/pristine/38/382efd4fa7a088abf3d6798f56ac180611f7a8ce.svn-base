/* global Ext, ol */

Ext.define('Dashboard.view.settings.userSettings.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'userSettings',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',  
        'Dashboard.view.settings.userSettings.MainController',
        'GeoExt.component.Map',
        'GeoExt.data.store.Features',
        'GeoExt.component.FeatureRenderer'//,
        //'Dashboard.view.settings.userSettings.Map'
    ],
  
    controller: 'userSettings',
    feature: null,
        
    iconCls : 'fa fa-sliders',//'pictos pictos-settings2',
    border: false,
    heigth: '100%',
    layout: 'border',
    bodyStyle:'background-color:#f2f5f9;', 
    
    currentUser: null,
    userSettings: null,
    readOnly: false,

    listeners:{
        render: 'onRenderMain'
    },   
    
    defaults:{
        heigth: '100%'
    },
    
    initComponent: function() {  
        
        this.feature = Dashboard.manager.FeaturesManager.getFeatureByName('USER_SETTINGS');
        this.title = getText('User settings');
        this.currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        this.userSettings = this.currentUser.getUserSettings();
        
        if(this.currentUser.data.profiles[0].name === 'All rights'){
            this.readOnly = true;
        }
                   
        var gridConfiguration = {
            title: getText('Grids configuration'),
            iconCls: 'fa fa-table',
            items: [
                {
                    xtype: 'checkbox',
                    reference : 'personalFilters',
                    boxLabel: getText('Replace predefined filters with personalized filters'),
                    checked: this.userSettings.personalFilters,
                    handler: 'onCheckPersonalFilters'
                }, {
                    xtype: 'checkbox',
                    reference : 'personalColumns',
                    boxLabel: getText('Replace predefined columns with personalized columns'),
                    checked: this.userSettings.personalColumns,
                    handler: 'onCheckPersonalColumns'
                }, {
                    xtype: 'checkbox',
                    reference : 'personalDetail',
                    boxLabel: getText('Replace predefined details configuration with personalized configuration'),
                    checked: this.userSettings.personalDetail,
                    handler: 'onCheckPersonalDetail'
                }
            ]
        };
        
//        var mapwin = Ext.create('Ext.Window', {
//            layout: 'fit',
//            title: 'GMap Window',
//            modal: true,
//            width: 800,
//            height: 600,
//            items: {
//                xtype: 'container',
//                layout: 'anchor',
//                items:[
//                    {
//                        xtype: 'gmappanel',
//                        gmapType: 'map',
//                        navigationControl: true,
//                        anchor: '100% 100%',
//                        center: {
//                            geoCodeAddr: '6 avenue general maiziere 06600 Antibes',//"221B Baker Street",
//                            marker: {
//                                title: 'Tanière de PYL'//'Holmes Home'
//                            }
//                        },
//                        mapOptions : {
//                            mapTypeId: google.maps.MapTypeId.ROADMAP
//                        }
//                    }, 
//                    {
//                        xtype: 'label',
//                        text: 'Salut mon Jojo !',
//                        shadow: 'sides',
//                        toFrontOnShow: true,
//                        //floating: true,
//                        //anchor: '25% 25%'
//                        listeners:{
//                            render: function(me){
//                                me.setLocalX(100);
//                                me.setLocalY(100);
//                                me.setZIndex(10000);
//                            }
//                        }
//                        
//                    }
//                ]
//            }
//        }).show();


        // Create a local alias
        var featRenderer = GeoExt.component.FeatureRenderer;
        
        var geojson1 = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'city': 'Machin bidule',
                        'pop': 12
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            7.2267, //7.2167,
                            43.8627 //43.8667
                        ]
                    }
                }
            ]
        };
        
        var geojson2 = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'city': 'Dortmund',
                        'pop': 42
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            7.481689453125,
                            51.49506473014368
                        ]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'city': 'Köln'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            6.976318359375,
                            50.93073802371819
                        ]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'city': 'Kaiserslautern'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            7.7838134765625,
                            49.44670029695474
                        ]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'city': 'Bonn'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            7.102661132812499,
                            50.74688365485319
                        ]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'city': 'Stuttgart'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            9.1461181640625,
                            48.77429274267509
                        ]
                    }
                }
            ]
        };
        
        // style objects
        var blueStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#0099CC'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        });
        
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
        
        var text =  new ol.style.Style({
            text: new ol.style.Text({
                fill: new ol.style.Fill({
                    color: '#FF0000'
                }),
                font: '18px Helvetica',
                text: 'Caverne'
            })
        });
        
        
        // create a feature collection in order to put into a feature store
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojson1, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            })
        });
        
        var featColl = new ol.Collection(vectorSource.getFeatures());
        
        // loading data via into ol source and create a vector layer to bind a
        // vector layer to a feature store
        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojson1, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                })
            }),
            style: redStyle
        });
        
        // create feature store by passing a feature collection
        var featStore1 = Ext.create('GeoExt.data.store.Features', {
            fields: ['city', 'pop'],
            model: 'GeoExt.data.model.Feature',
            features: featColl,
            map: olMap,
            createLayer: true,
            style: blueStyle
        });
        
        // default feature grid
        var gridWest = Ext.create('Ext.grid.Panel', {
            title: 'Feature Grid',
            border: true,
            region: 'west',
            store: featStore1,
            columns: [
                {
                    xtype: 'widgetcolumn',
                    width: 40,
                    widget: {
                        xtype: 'gx_renderer'
                    },
                    onWidgetAttach: function(column, gxRenderer, record) {
                        // update the symbolizer with the related feature
                        var feature = record.getFeature();
                        gxRenderer.update({
                            feature: feature,
                            symbolizers: featRenderer.determineStyle(record)
                        });
                    }
                },
                {text: 'Name', dataIndex: 'city', flex: 1},
                {
                    text: 'Population',
                    dataIndex: 'pop',
                    xtype: 'numbercolumn',
                    format: '0,000',
                    flex: 1
                }
            ],
            width: 250
        });

        var olMap = new ol.Map({
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
                new ol.layer.Tile({
                    source: new ol.source.Stamen({
                        layer: 'terrain-labels'
                    })
                }),
                
                vectorLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([7.2167, 43.8667]), //levens
                zoom: 12
            })
        });
        
        var popup = Ext.create('GeoExt.component.Popup', {
            map: olMap,
            width: 140
        });
        
        var mapComponent = Ext.create('GeoExt.component.Map', {
            map: olMap,
            pointerRest: true,
            pointerRestInterval: 750,
            pointerRestPixelTolerance: 5
        });
        
        // Add a pointerrest handler to the map component to render the popup.
        mapComponent.on('pointerrest', function(evt) {
            var coordinate = evt.coordinate;
            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
                coordinate, 'EPSG:3857', 'EPSG:4326')
            );
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
        
        var mapPanel = Ext.create('Ext.panel.Panel', {
            title: 'GeoExt.component.Map Example',
            region: 'center',
            layout: 'fit',
            items: [
                mapComponent
            ]
        });
        
        var description = Ext.create('Ext.panel.Panel', {
            reference: 'description',
            title: 'Description',
            region: 'east',
            width: 200,
            border: false,
            bodyPadding: 5,
            items:[
                {
                    xtype: 'label',
                    text: 'Tests Jojo : GeoExt 3'
                }
            ]
        });

        var mapwin = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'GMap Window',
            modal: true,
            width: 800,
            height: 600,
            items: {
                xtype: 'container',
                layout: 'border',
                items:[
                    //mapPanel//,
                    //gridWest,
                    //description//,
                    //mapwin,
//                    {
//                        xtype: 'gmappanel',
//                        gmapType: 'map',
//                        navigationControl: true,
//                        anchor: '100% 100%',
//                        center: {
//                            geoCodeAddr: '6 avenue general maiziere 06600 Antibes',//"221B Baker Street",
//                            marker: {
//                                title: 'Tanière de PYL'//'Holmes Home'
//                            }
//                        },
//                        mapOptions : {
//                            mapTypeId: google.maps.MapTypeId.ROADMAP
//                        }
//                    }, 
//                    {
//                        xtype: 'label',
//                        text: 'Salut mon Jojo !',
//                        shadow: 'sides',
//                        toFrontOnShow: true,
//                        //floating: true,
//                        //anchor: '25% 25%'
//                        listeners:{
//                            render: function(me){
//                                me.setLocalX(100);
//                                me.setLocalY(100);
//                                me.setZIndex(10000);
//                            }
//                        }
//                        
//                    }
                ]
            }
        });

    
        this.items = [

            {
                xtype: 'panel',
                region: 'center',
                layout: 'fit',
                items:[
                    {
                        xtype: 'form',
                        autoScroll: true,
                        scrollable:'y',
                        bodyStyle:'background-color:#f2f5f9; padding: 32px',
                        fieldDefaults: {
                            labelWidth: 112,
                            width: '100%',
                            labelSeparator: getText(':'),
                            margin: '0 0 12 0',
                            disabled: this.readOnly
                        },
                        defaults:{
                            xtype: 'panel', 
                            ui: 'manage',
                            minHeight: 80,
                            bodyPadding : '32 16',
                            margin: '0 0 32 0'
                        },
                        
                        items:[
                            gridConfiguration//,
//                            {
//                                xtype: 'mappanel'
//                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
        
        //mapwin.show();

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
            if(invalidFields[i].fieldLabel !== undefined){
                text += invalidFields[i].fieldLabel + " > ";
            }
            messages.push( text + invalidFields[i].activeErrors[0]);
        }
        
        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
        return invalidFields;
    },
    
    
    getData: function(){

        var userSettings = {};
        userSettings.personalFilters = this.down('field[reference=personalFilters]').checked;
        userSettings.personalColumns = this.down('field[reference=personalColumns]').checked;
        userSettings.personalDetail = this.down('field[reference=personalDetail]').checked;
        
        return userSettings;
    }
    
});