/* global Ext  */

Ext.define('Dashboard.view.cartography.MapStage', {
    extend: 'Ext.panel.Panel',
    xtype: 'cartographyMapStage',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.material.Detail',
        'Dashboard.view.cartography.Map',
        'Dashboard.view.cartography.MapStageController',
        'Dashboard.view.cartography.MapDetail'
    ],
    
    controller: 'cartographyMapStage',
    
    store: Ext.create('Dashboard.store.cartography.Maps', {
        autoLoad: false
    }),

    storeWithMaterialsFilter: Ext.create('Dashboard.store.cartography.MapsWithMaterialsFilter', {
        autoLoad: false
    }),
    
    configuration: null,
    feature: null,//Ext.create('Dashboard.store.Features').findRecord('name', 'MAPS_CONSULTATION', 0, false, true, true),
    modelProperties: Dashboard.manager.cartography.CartographyManager.getMaterialProperties(),
    
    iconCls : 'fa fa-map-o',
    border: false,
    heigth: '100%',
    layout: 'border',
    
    currentMap: null,
            
    listeners:{
        render: 'onRenderMain',
        boxready: 'onShow'
    },
    
    defaults:{
        heigth: '100%'
    },
    
    initComponent: function() {
        
        this.getController().feature = this.feature;
  
        this.title = getText('Map') + getText(':') + '&nbsp &nbsp' +  this.currentMap.data.title.toUpperCase();
                        
        var filtersPanel = {
                        
            xtype: Ext.create('Dashboard.view.shared.filtering.FiltersBar',{
                store : this.storeWithMaterialsFilter,
                parentView: this,
                modelProperties: this.modelProperties,
                filtersList: this.getController().getFilters(),
                region: 'north',
                
                //Filter map action
                updateDataStore: function(){
                                        
                    var editionMode = Dashboard.manager.cartography.CartographyManager.editionMode;
                    var stageController = this.up('cartographyMapStage').getController();
                    var filters = [];
                                        
                    if(editionMode === false){
                        filters = this.getFilters();
                    }

                    if(filters.length > 0){
                        this.setTitle(getText('filters') + ' (' + filters.length + ')');
                    }else{
                        this.setTitle(getText('filters'));
                    }
                    
                    //Dashboard.manager.cartography.CartographyManager.setUserMaterialsFilters(stageController.currentMap.data.id, filters);
                    Dashboard.manager.cartography.CartographyManager.setUserMaterialsFilters('current', filters);
                    stageController.getAndDisplayMap(stageController.currentMap.data.id, filters);
                }
            })
        };
        
        var msgTpl =  '<b>{size}%</b><br />';
        
        var slider = {
            xtype: 'slider',
            //fieldLabel: getText('Size'),
            value: 100,
            name: 'size',
            reference: 'slider',
            labelWidth: 125,
            width: 300,
            tipText: 'tipText',
            hidden: true,
            margin: '0 0 0 50',
            increment: 10,
            minValue: 30,
            maxValue: 300,
            animate: false,
            listeners:{
                scope: this,
                changecomplete: function( slider, newValue, thumb, eOpts ){
                    var element = this.getController().selectedElement;
                    this.getController().changeElementsSize(element, newValue);
                }
            }
        };
        
            
       this.items = [
            
            filtersPanel,
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',

                dockedItems: [    
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        ui: 'view-list',
                        defaults:{
                            xtype: 'button',
                            scale: 'small',
                            ui: 'view-list',
                            border: false
                        },
                        items: [
                            
                            {
                                iconCls: 'fa fa-bars',//'fa fa-backward', 
                                handler: 'onGoToAlbum'
                            },
                            '-',
                            {
                                iconCls: 'fa fa-backward',
                                tooltip: getText('Back'),
                                handler: 'onBackToMap',
                                reference: 'onBackToMap'
                            }, {
                                iconCls: 'fa fa-map',//'fa fa-eye',
                                tooltip: getText('Layers displaying'),
                                handler: 'onLayersDisplaying'
                            }, {
                                iconCls: 'fa fa-camera',
                                tooltip: getText('Snapshot'),
                                handler : 'onSnapshot',
                                reference: 'onSnapshot'
                            },
                            '->',
                            {
                                iconCls : 'fa fa-lock',//'fa fa-wrench',
                                enableToggle : true,
                                handler : 'onToggleEditionMode',
                                reference : 'onToggleEditionMode'
                            }//,
//                            {
//                                xtype: 'container',
//                                flex: 1,
//                                layout: {
//                                    type: 'vbox',
//                                    align: 'center',
//                                    pack: 'center'
//                                },
//                                items:[
//                                    {
//                                        xtype: 'label',
//                                        text: this.currentMap.data.title.toUpperCase(),
//                                        //labelStyle: 'font-weight: bold; color: #003168;',
//                                        style: {
//                                            color: '#FFFFFF',
//                                            'font-weight': 'normal',
//                                            'font-size': '20px'
//                                        }
//                                    }
//                                ]
//                            }
                            
                        ]
                    },
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'view-list',
                        height: 40,
                        defaults:{
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
                            iconCls: 'fa fa-picture-o',
                            tooltip: getText('Edit map'),
                            handler: 'onEditMap'
                        }, {
                            iconCls: 'fa fa-tag',
                            tooltip: getText('Add item'),
                            handler: 'onAddMaterial'
                        }, {
                            iconCls: 'fa fa-map-marker',
                            tooltip: getText('Add location'),
                            handler: 'onAddLocation'
                        }, {
                            iconCls: 'fa fa-laptop',//'fa fa-columns',
                            tooltip: getText('Add device'),
                            handler: 'onAddDevice'
                        }, {
                            iconCls: 'fa fa-link', //fa fa-external-link
                            tooltip: getText('Add link to map'),
                            handler: 'onAddLinkToMap'
                        }, {
                            iconCls: 'fa fa-font',
                            tooltip: getText('Add label'),
                            handler: 'onAddLabel'
                        }, {
                            iconCls: 'fa fa-cogs',
                            tooltip: getText('Configure Map'),
                            handler: 'onConfigMap'
                        },
                        '-',
                        {
                            iconCls: 'fa fa-pencil',
                            tooltip: getText('Edit selected element'),
                            handler : 'onEditElement'
                        }, {
                            iconCls: 'fa fa-minus-circle',
                            tooltip: getText('Delete selected element'),
                            handler : 'onDeleteElement'
                        },
                        '-',
                        slider
//                        {
//                            //iconCls: 'fa fa-floppy-o',
//                            text: getText('Save'),
//                            tooltip: getText('Save'),
//                            handler: 'onSaveMap'
//                        }
                    ]
                }

                ],
                items:[
                    {
                        xtype: 'cartographyMap',
                        region: 'center',
                        record: this.currentMap,
                        mainController: this.getController(),
                        flex:3
                    },
                    {
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        hidden: false,
                        flex:1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        header : false,
                        items: {
                            //xtype: 'mapCartoDetail',
                           // toolBarVisible: false
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
        
        this.configView();
        
        var editionMode = Dashboard.manager.cartography.CartographyManager.editionMode;
        this.getController().toggleEditionMode(editionMode);
        
//        this.showDetail('mapCartoDetail');
//        this.getController().displayDetail(this.currentMap);
//        this.updateLayout();
        
        this.getController().displayTitle(this.currentMap.data.id);
        
        //fill filters fields
        this.getController().displayFiltersValues(this.currentMap.data.id);
        
    },
    
    
    configView: function(){
        
        if (Dashboard.manager.FeaturesManager.isEnabled('MAPS_ADMIN') === false) {
            this.down('button[reference=onToggleEditionMode]').hidden = true;
            this.getController().editionMode = false;
        } else {
            this.down('button[reference=onToggleEditionMode]').hidden = false;
        }
        
    },
    
    
    showDetail: function(xtype){

        if(!xtype){
            Dashboard.tool.Utilities.error('[cartography.Main.showDetail] error: detail type is null !');
        }

        var container = this.lookupReference('detailContainer');
        container.removeAll();

        container.add({
            xtype: xtype,
            toolBarVisible: false
        });
    }


});