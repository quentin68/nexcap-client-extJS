/* global Ext, moment */

Ext.define('Dashboard.view.administration.location.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'locationDetail',

    usersStore: null,
    materialsStore: null,

    initComponent: function () {
        
        this.configDetail();

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}'
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'

                }, {
                    xtype: 'image',
                    reference: 'thumbnail',
                    width: this.getImageSize() ? this.getImageSize() : '90%',
                    margin: '0 24 12 24'
                }, {
                    xtype: 'panel',
                    title: getText('Location'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Traceability'),
                    reference: 'traceability',
                    iconCls: 'fa fa-map-marker'
                }, {
                    title: getText('Alerts'),
                    reference: 'alerts',
                    iconCls: 'x-fa fa-exclamation-triangle'
                }, {
                    xtype: 'panel',
                    title: getText('Allowed users'),
                    reference: 'allowedUsers',
                    iconCls: 'fa fa-shield', //'fa fa-street-view',
                    items: []
                }, {
                    xtype: 'panel',
                    title: getText('Items'),
                    reference: 'items',
                    iconCls: 'fa fa-tag',
                    items: []
                }
            ]
        });

        this.callParent(arguments);

    },

    setData: function (data) {

        if (!data) {
            return;
        }

        this.viewModel.setData(data);
        
        var imgSrc = data.imageSrc;
        
        Ext.Ajax.request({
            scope:this,
            binary: true,  //set binary to true
            url: imgSrc,
            method: "GET",
            success: function(response) {

                var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                url = window.URL.createObjectURL(blob);

                var thumbnail = this.down('image[reference=thumbnail]');
                thumbnail.setSrc(url);
                thumbnail.setAlt('thumbnail');
            }
        });
                
        this.materialsPanel = this.down('panel[reference=items]');
        this.usersPanel = this.down('panel[reference=allowedUsers]');
        
        this.materialsPanel.removeAll();
        this.usersPanel.removeAll();

        this.characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        this.characteristicsPanel.removeAll();

        var addressValue = data.path + '/' + data.name;

        this.characteristicsPanel.add(this.buildField({name: getText('Address'), value: addressValue}));
        this.characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.description}));
        this.characteristicsPanel.add(this.buildField({name: getText('Last update'), value: Ext.Date.format(data.lastUpdateDate, getText('m/d/Y'))}));
        
        
        this.traceabilityPanel = this.query('panel[reference=traceability]')[0];
        this.traceabilityPanel.removeAll();

        if (data.code && data.code.code) {
            var label = Dashboard.store.enums.CodeType[data.code.codeType +''].label;
            this.traceabilityPanel.add(this.buildField({
                name: getText(label),
                value: data.code.code
            }));
        }

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();

        for (var i = 0; i < data.alerts.length; i++) {
            alertsPanel.add(this.buildField({
                name: getText('Warning'),
                value: data.alerts[i].alertConfiguration.name
            }));
        }
        // Dynamic properties
        var properties = data.properties;
        
        if (!properties) {
            Dashboard.tool.Utilities.error('[location.Detail.setData] properties null or empty !');
            return;
        }
        
        for (var i = 0; i < properties.length; i++) {
                                    
            try {
                
                var property = Ext.create('Dashboard.model.PropertyConfiguration', properties[i].configuration);
                property.value = properties[i].value;
                
                var characteristicFields = null;
                var control = Dashboard.model.PropertyConfiguration.getControl(property);

                if (control !== undefined) {
                    var configuration = control.configuration;
                    if (configuration && configuration.enabledInDetails !== undefined) {
                        if (configuration.enabledInDetails === true) {
                            characteristicFields = this.buildField(property);
                            this.characteristicsPanel.add(characteristicFields);
                        }
                    } else {
                        characteristicFields = this.buildField(property);
                        this.characteristicsPanel.add(characteristicFields);
                    }
                }

            } catch (ex) {
                Dashboard.tool.Utilities.error('[location.Detail.setData] error :' + ex);
            }
        }
        
        
        var materialsGrid = this.buildGrid(materialsStore, materialsColumns);
            
        materialsGrid.viewConfig = {
            stripeRows: false,
            getRowClass: function (record){
                try {
                    var status = record.data.status;
                    var color = 'redRow';
                    if (status === 'Present') {
                        color = 'greenRow';
                    }else if(status === 'Absents'){
                        color = 'yellowRow';
                    }else if(status === 'Muddled'){
                        //color = 'yellowRow';
                        color = 'redRow';
                    }else{ //Intruder
                        color = 'redRow';
                    }
                    return color;
                } catch (ex) {
                    return '';
                }
            }
        };

        var materialsStore = Ext.create('Dashboard.store.Materials', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().extraParams.filter = [{
                        property: "location.id",
                        value: data.id,
                        type: "LONG",
                        comparison: "EQ"
                    }];
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().extraParams.filter = [];
                }
            }
        });
        
        var materialsColumns = [
                {
                    xtype: 'actioncolumn',
                    width: 25,
                    menuDisabled: true,
                    sortable: false,
                    hideable: false,
                    'cfg-draggable': false,
                    groupable: false,
                    focusable: false,
                    align: 'middle', 
                    pack: 'center',

                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view){
                        
                        if(record.data.alerts && record.data.alerts.length > 0){
                            return '<img src="resources/images/icons/warning_icon_16.png" />';
                        }
                        return '';
                    }
                },

                {text: getText('Name'), dataIndex: 'name', flex: 1, sortable: true},
                {text: getText('Ref. Code'), dataIndex: 'productReference', flex: 1, sortable: true, 
                    renderer: function (productReference) {
                        if (productReference) {
                            return productReference.referenceCode;
                        }
                        return '';
                    }
                },
                {text: getText('Assigned location'), dataIndex: 'assignedLocation', flex: 1, sortable: true,
                    renderer: function (assignedLocation) {
                        if (assignedLocation) {
                            return assignedLocation.address;
                        }
                        return '';
                    }
                },
                {text: getText('Status'), dataIndex: 'status', flex: 1, sortable: true,
                    renderer: function (status) {
                        return getText(status);
                    }
                }
            ]; 
            
            var materialsGrid = this.buildGrid(materialsStore, materialsColumns);
            
            materialsGrid.viewConfig = {
                stripeRows: false,
                getRowClass: function (record){
                    try {
                        var status = record.data.status;
                        var color = 'redRow';
                        if (status === 'Present') {
                            color = 'greenRow';
                        }else if(status === 'Absents'){
                            color = 'yellowRow';
                        }else if(status === 'Muddled'){
                            //color = 'yellowRow';
                            color = 'redRow';
                        }else{ //Intruder
                            color = 'redRow';
                        }
                        return color;
                    } catch (ex) {
                        return '';
                    }
                }
            };
            
            this.materialsPanel.add(materialsGrid); 
            
//        var materialsColumns = [
//            {text: getText('Name'), dataIndex: 'name', flex: 1, sortable: true},
//            {text: getText('Ref. Code'), dataIndex: 'productReference', flex: 1, sortable: true, 
//                renderer: function (productReference) {
//                    if (productReference) {
//                        return productReference.referenceCode;
//                    }
//                    return '';
//                }
//            }
//        ];
        
//        var materialsGrid = this.buildGrid(materialsStore, materialsColumns);
//        this.materialsPanel.add(materialsGrid);  
        
        //------------------------------------------
        
        var usersStore = Ext.create('Dashboard.store.Users', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().extraParams.filter = [{
                        property: "authorizedLocations.id",
                        value: data.id,
                        type: "LONG",
                        comparison: "EQ"
                    }];
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().extraParams.filter = [];
                }
            }
        });
        
        var usersColumns = [
            {text: getText('Identifier'), dataIndex: 'sticker', flex: 1, sortable: false},
            {text: getText('First name'), dataIndex: 'firstName', flex: 1, sortable: false},
            {text: getText('Last name'), dataIndex: 'lastName', flex: 1, sortable: false}
        ];
        var usersGrid = this.buildGrid(usersStore, usersColumns);
        this.usersPanel.add(usersGrid);

    },
    
    buildGrid: function(store, columns){
        
        var grid = {
            xtype: 'grid',
            store: store,
            loadMask: true,
            width: '100%',
            maxHeight: 300,
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            viewConfig: {
                stripeRows: true
            },
            columns: columns,
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                displayInfo: false
            },
            listeners:{
                scope: this,
                rowdblclick: function( grid, record, element, rowIndex, e, eOpts ){
                     var id = record.data.id;
                     Dashboard.manager.administration.MaterialManager.getOne(id, this, 'displayDetail');
                }
            }
        };
        
        return grid;
    },
    
    clean: function (){

        this.materialsPanel = this.down('panel[reference=items]');
        this.materialsPanel.removeAll();
        
        this.usersPanel = this.down('panel[reference=allowedUsers]');
        this.usersPanel.removeAll();

        this.characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        this.characteristicsPanel.removeAll();
        
        this.traceabilityPanel = this.query('panel[reference=traceability]')[0];
        this.traceabilityPanel.removeAll();

        this.alertsPanel = this.query('panel[reference=alerts]')[0];
        this.alertsPanel.removeAll();
    },
    
    displayDetail: function(record){
        this.showDetail(record);
    },
    
    showDetail: function(record){
        
        var win = Ext.create('Dashboard.view.shared.detail.detailWindow');
        var container = win.down('panel');
        
        container.add(
            {
                xtype: 'materialDetail',
                feature: Ext.create('Dashboard.store.Features').findRecord('name', 'MAT_ADMIN', 0, false, true, true),
                viewModel:{
                    data: record.data
                }
            }
        );

        win.down('materialDetail').setData(record.data);
        win.show();
        
    }
    
});