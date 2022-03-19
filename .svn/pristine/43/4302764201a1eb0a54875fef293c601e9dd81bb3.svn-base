/* global Ext  */

Ext.define('Dashboard.view.system.device.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'deviceDetail',
    
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
            defaults:{
                xtype: 'panel'
            },
            
            items: [
                {
                    //layout: 'column',
                    reference: 'header'
                },
//                 {
//                    xtype: 'displayfield',
//                    bind: {
//                        value: '{name}' 
//                    },
//                    cls: 'user-detail-title',
//                    margin: '12 12 12 24'
//                    //cls: 'view-list-title'
//
//                },
                {
                    title: getText('Device'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Items'),
                    reference: 'materials',
                    hidden: true,
                    iconCls: 'fa fa-tag'
                }, {
                    title: getText('Materials sets'),
                    reference: 'materialsSets',
                    hidden: true,
                    iconCls: 'fa fa-tags'
                }, {
                    title: getText('Attachments'),
                    reference: 'files',
                    iconCls: 'fa fa-paperclip',
                    hidden: true
                },{
                    title: getText('Contexts'),
                    reference: 'contexts',
                    iconCls: 'fa fa-sitemap'
                }, {
                    title: getText('Alerts'),
                    reference: 'alerts',
                    iconCls: 'x-fa fa-exclamation-triangle'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.down('panel[reference=header]').removeAll();
        
        this.buildHeader(data);
        
        // Classic properties
        var characteristicsPanel = Ext.ComponentQuery.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        
        characteristicsPanel.add(this.buildField({name: getText('Type'), value: data.deviceTypeLabel}));
        characteristicsPanel.add(this.buildField({name: getText('Signature'), value: data.signature}));
        characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.description }));
        characteristicsPanel.add(this.buildField({name: getText('Software version'), value: data.softwareVersion}));
        characteristicsPanel.add(this.buildField({name: getText('Last update date'),value: this.dateToString(data.lastUpdateDate, 'DATE_TIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Last connection date'),value: this.dateToString(data.lastConnectionDate, 'DATE_TIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Authorized'),value: data.authorized}));
                
        if(data.location && data.location.address){
            characteristicsPanel.add(this.buildField({name: getText('Address'),value: data.location.address}));
        }else if(data.position && data.position.address){
            characteristicsPanel.add(this.buildField({name: getText('Address'),value: data.position.address}));
        }
        
        var deviceType = Dashboard.manager.system.DevicesManager.getDeviceTypeByType(data.deviceType);
        this.materialsPanel = this.down('panel[reference=materials]');
        this.materialsPanel.removeAll();

        var contextPanelDevice = this.query('panel[reference=contexts]')[0];
        contextPanelDevice.removeAll();
        for (var i = 0; i < data.contexts.length; i++) {
            contextPanelDevice.add(this.buildField({name: getText('Context ') + (i + 1), value: data.contexts[i].name}));
        }

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();

        for (var i = 0; i < data.alerts.length; i++) {
            alertsPanel.add(this.buildField({
                name: getText('Warning'),
                value: data.alerts[i].alertConfiguration.name
            }));
        }

        this.materialsSetsPanel = this.down('panel[reference=materialsSets]');
        this.materialsSetsPanel.removeAll();

        if(deviceType && deviceType.data.containsItems === true && data.location){
                        
            this.materialsPanel.setVisible(true);
            this.materialsSetsPanel.setVisible(true);
        
            var materialsStore = Ext.create('Dashboard.store.Materials', {
                autoLoad: true,
                listeners: {
                    scope: this,
                    beforeload: function (store, operation, eOpts) {
                        store.getProxy().extraParams.filter = [{
                            property: "location.id",
                            value: data.location.id,
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
            
            var materialsSetsStore = Ext.create('Dashboard.store.consultation.MaterialsSets', {
                autoLoad: true,
                listeners: {
                    scope: this,
                    beforeload: function (store, operation, eOpts) {
                        store.getProxy().extraParams.filter = [{
                            property: "location.id",
                            value: data.location.id,
                            type: "LONG",
                            comparison: "EQ"
                        }];
                    },
                    load: function (store, operation, eOpts) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            });
            
            var materialsSetsColumns = [
                {text: getText('Count'), dataIndex: 'count', flex: 1, sortable: true},
                {text: getText('Ref. Code'), dataIndex: 'productReference', flex: 1, sortable: true, 
                    renderer: function (productReference) {
                        if (productReference) {
                            return productReference.referenceCode;
                        }
                        return '';
                    }
                }
            ];
            
            var materialsSetsGrid = this.buildGrid(materialsSetsStore, materialsSetsColumns);            
            this.materialsSetsPanel.add(materialsSetsGrid); 
            
        }else{
            this.materialsPanel.setVisible(false);
            this.materialsSetsPanel.setVisible(false);
        }
        
    },
    
    
    buildHeader: function(data){
        
        var header = this.down('panel[reference=header]');
        var deviceType = Dashboard.manager.system.DevicesManager.getDeviceTypeByType(data.deviceType);
        
        if(!deviceType){
            deviceType = {
                data:{
                    iconSrc: 'resources/images/devices/128/device.png',
                    name: data.name
                }
            };
        }
                
        var fodValue = getText('No');
        var alertsValue = getText('No');
        
        var fodIcon = 'fa fa-circle greenIcon';
        var borrowingsIcon = 'fa fa-circle-o orangeIcon';
        var alertsIcon = 'fa fa-circle-o redIcon';
                
        if(data.properties.fodWarning === 'true'){
            fodValue = getText('FOD');
            fodIcon = 'fa fa-circle-o greenIcon';
            borrowingsIcon = 'fa fa-circle orangeIcon';
        }
        
        if(data.properties.alertWarning === 'true'){
            alertsValue = getText('Alerts');
            alertsIcon = 'fa fa-circle redIcon';
        }
        
        var infos = [
            {
                reference: 'title',
                html: '<h2>' + data.name.toUpperCase() + '</h2>',
                margin: '0 0 0 12'
            }, {
                xtype: 'container',
                layout: 'column',
                //cls: 'detailTitle',
                items:[
                    {
                        xtype: 'image',
                        height : 128,
                        src: deviceType.data.iconSrc,
                        alt: 'device icon'
                    }, {
                        xtype: 'container',
                        reference: 'infos',
                        layout: 'vbox',
                        cls: 'detailTitle',
                        items:[

                            {
                                xtype: 'container',
                                flex:1,
                                cls: 'detailTitle'
                            }, 
        //                    {
        //                        reference: 'title',
        //                        html: '<h2>' + data.name.toUpperCase() + '</h2>',
        //                        margin: '0 0 0 12'
        //                    }, 
                            {
                                xtype: 'container',
                                reference: 'buttonFOD', //Green
                                layout: 'column',
                                flex:1,
                                cls: 'detailTitle',
                                items:[
                                    {
                                        xtype: 'button',
                                        ui: 'indicator',
                                        scale: 'small',
                                        enableToggle: false,
                                        border: false,
                                        iconCls: fodIcon,
                                        reference: 'FOD',
                                        tooltip: getText('FOD'),
                                        margin: '0 0 0 8'
                                    }//,
        //                            {
        //                                xtype: 'label',
        //                                text: fodValue,
        //                                margin: '6 0 0 12'
        //                            }
                                ],
                                listeners:{
                                    render: function (me, operation, eOpts) {
                                        if(data.properties.fodWarning === undefined){
                                            me.setVisible(false);
                                        }
                                    }
                                }
                            }, {
                                xtype: 'container',
                                reference: 'buttonBorrowings', // Orange
                                layout: 'column',
                                cls: 'detailTitle',
                                items:[
                                    {
                                        xtype: 'button',
                                        ui: 'indicator',
                                        scale: 'small',
                                        enableToggle: false,
                                        border: false,
                                        iconCls: borrowingsIcon,
                                        reference: 'Borrowings',
                                        tooltip: getText('Borrowings'),
                                        margin: '0 0 0 8'
                                    }//,
        //                            {
        //                                xtype: 'label',
        //                                text: borrowingsValue,
        //                                margin: '6 0 0 12'
        //                            }
                                ],
                                listeners:{
                                    render: function (me, operation, eOpts) {
                                        if(data.properties.fodWarning === undefined){
                                            me.setVisible(false);
                                        }
                                    }
                                }
                            },{
                                xtype: 'container',
                                reference: 'buttonAlerts',
                                layout: 'column',
                                cls: 'detailTitle',
                                items:[
                                    {
                                        xtype: 'button',
                                        ui: 'indicator',
                                        scale: 'small',
                                        enableToggle: false,
                                        border: false,
                                        iconCls: alertsIcon,
                                        reference: 'alerts',
                                        tooltip: getText('Alerts'),
                                        margin: '0 0 0 8'
                                    }//,
        //                            {
        //                                xtype: 'label',
        //                                text: alertsValue,
        //                                margin: '6 0 0 12'
        //                            }
                                ],
                                listeners:{
                                    render: function (me, operation, eOpts) {
                                        if(data.properties.alertWarning === undefined){
                                            me.setVisible(false);
                                        }
                                    }
                                }
                            },{
                                xtype: 'container',
                                flex:1
                            }
                        ]
                    }
                ]
            }

        ];
        
        header.add(infos);
    },
    
    
    buildFiles: function(data){
        
        var panel = this.down('panel[reference=files]');
        panel.removeAll();
                
        if(data.files){
            Ext.each(data.files, function(fileName){
                panel.add(this.buildFileField(fileName, data.id));
            }, this);
        }
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
    
    
    buildFileField: function(fileName, id, type){
        
        var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/DEVICE/' + id + '/' + fileName;
                
        var field = {
            html: '<a style="text-decoration: inherit; color: inherit;" href="' + path + '" target="_blank" >'+
                    '<i class="fa fa-paperclip blueIcon 16" aria-hidden="true" style="font-size: 16px;  margin-right:12px; margin-bottom:6px;"></i>'+
                    '<span style="text-decoration: inherit; color: black; font-size: 12px;">' + fileName + '</span>'+
                '</a>'
        };

        return field;
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