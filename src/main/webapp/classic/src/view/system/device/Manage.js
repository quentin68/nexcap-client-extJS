/* global Ext  */

Ext.define('Dashboard.view.system.device.Manage',{
    extend: 'Ext.panel.Panel',
    xtype: 'deviceManage',
    tag: 'main',
    
    requires: [
        'Dashboard.view.system.device.ManageController',
        'Dashboard.model.system.DeviceConfigurationProperty',
        'Dashboard.view.system.device.EditConfigurationProperty',
        'Dashboard.view.system.device.SelectDevices'
    ],
    
    controller: 'deviceManage',
    
    configuration: null,
    feature: null,//Ext.create('Dashboard.store.Features').findRecord('name', 'MAPS_CONSULTATION', 0, false, true, true),
    iconCls : 'fa fa-sliders',
    border: false,
    heigth: '100%',
    layout: 'border',
    bodyStyle:'background-color:#f2f5f9;', 
    
    currentDevice: null,
    
    defaults:{
        heigth: '100%'
    },

    listeners:{
        //render: 'onRenderMain',
        //boxready: 'onShow'
    },
    
    initComponent: function() {
        
        this.getController().feature = this.feature;
        
        if(this.currentDevice){
            this.title = getText('Device') + getText(':') + '&nbsp &nbsp' +  this.currentDevice.data.name.toUpperCase();
        }        
            
       this.items = [

            {
                xtype: 'panel',
                region: 'center',
                layout: 'fit',
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
                                iconCls: 'fa fa-backward',//'fa fa-bars',// 
                                handler: 'onGoToList',
                                tooltip: getText('Back')
                            },
                            '-',
                            {
                                iconCls: 'fa fa-paw', // 'fa fa-history'
                                text: getText('Require logs'),
                                tooltip: getText('Require logs'),
                                handler : 'onRequireLogs',
                                reference: 'onRequireLogs'
                            }
                        ]
                    }
                ],
                items:[
                    {
                        xtype: 'panel',
                        autoScroll: true,
                        scrollable:'y',
                        bodyStyle:'background-color:#f2f5f9; padding: 32px',
                        defaults:{
                            xtype: 'panel', 
                            ui: 'manage',
                            minHeight: 80,
                            bodyPadding : '32 16',
                            margin: '0 0 32 0'
                        },
                        
                        items:[
                            {
                                layout: 'column',
                                reference: 'header'
                            }, {
                                title: getText('Characteristics'),
                                reference: 'characteristics',
                                iconCls: 'fa fa-info'                        
                            }, {
                                title: getText('Technical properties'),
                                reference: 'properties',
                                iconCls: 'fa fa-hdd-o' //'fa fa-microchip'
                            }, {
                                title: getText('Configuration'),
                                reference: 'configuration',
                                iconCls: 'fa fa-cogs'
                            }, {
                                title: getText('Logs'),
                                reference: 'logs',
                                iconCls: 'fa fa-paw',
                                layout: 'vbox'
                            }, {
                                title: getText('Attachments'),
                                reference: 'files',
                                iconCls: 'fa fa-paperclip',
                                hidden: true
                            } 
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
        this.configView(this.currentDevice.data);
    },
    
    configView: function(data){
        
        this.buildHeader(data);
        this.buildCharasteristics(data);
        this.buildProperties(data);
        this.buildConfiguration(data);
        this.buildLogs(data);
        //this.buildFiles(data);
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
                xtype: 'image',
                height : 128,
                src: deviceType.data.iconSrc,
                alt: 'device icon'
            },{
                xtype: 'container',
                reference: 'infos',
                layout: 'vbox',
                cls: 'detailTitle',
                items:[
                    {
                        xtype: 'container',
                        flex:1,
                        cls: 'detailTitle'
                    },{
                        reference: 'title',
                        html: '<h2>' + data.name.toUpperCase() + '</h2>',
                        margin: '0 0 0 12'
                    },{
                        xtype: 'container',
                        reference: 'buttonFOD',
                        layout: 'column',
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
                            }
//                            ,{
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
                            }
//                            ,{
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
        ];
        
        header.add(infos);
    },
    
    
    buildCharasteristics: function(data){
                
        if(!data.logFileRequired){
            data.logFileRequired = false;
        }
        
        var characteristicsPanel = Ext.ComponentQuery.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
                
        var deviceTypeLabel = Dashboard.manager.system.DevicesManager.getLabelByDeviceType(data.deviceType);
        
        characteristicsPanel.add(this.buildField({name: getText('Type'),value: deviceTypeLabel}));
        characteristicsPanel.add(this.buildField({name: getText('Signature'),value: data.signature}));
        characteristicsPanel.add(this.buildField({name: getText('IP Address'),value: data.ipAddress}));
        characteristicsPanel.add(this.buildField({name: getText('Description'),value: data.description}));
        characteristicsPanel.add(this.buildField({name: getText('Software version'),value: data.softwareVersion}));
        characteristicsPanel.add(this.buildField({name: getText('Planned software version'),value: data.plannedSoftwareVersion}));
        characteristicsPanel.add(this.buildField({ name: getText('Logs files required'), value: data.logFileRequired}));
        
        if(data.location && data.location.address){
            characteristicsPanel.add(this.buildField({name: getText('Address'),value: data.location.address}));
        }else if(data.position && data.position.address){
            characteristicsPanel.add(this.buildField({name: getText('Address'),value: data.position.address}));
        }
        
        characteristicsPanel.add(this.buildField({name: getText('Last update date'),value: this.dateToString(data.lastUpdateDate, 'DATETIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Last connection date'),value: this.dateToString(data.lastConnectionDate, 'DATETIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Enabled'),value: data.authorized}));
        
    },
    
    
    buildConfiguration: function(data){
        
        //data.configuration = this.getController().getCabinetXLConfiguration(); // debug 
        var panel = this.down('panel[reference=configuration]');
        panel.removeAll();
        
        Ext.each(data.configuration, function(property){
            panel.add(this.buildConfigurableField(property));
        }, this);
    },
    
    
    buildProperties: function(data){
        
        var panel = this.down('panel[reference=properties]');
        panel.removeAll();
                
        Ext.iterate(data.properties, function(key, value) {
            
            var item = this.buildField({name: key, value: value});
            //var item = this.buildPropertyField(key, value);
            if(item){
                panel.add(item);
            }
         }, this);

    },
    
    
    buildLogs: function(data){
        
        var panel = this.down('panel[reference=logs]');
        panel.removeAll();
                
        if(data.logFiles && data.logFiles.length > 0){
            
            panel.add(this.buildLogsZipField(data));
            panel.add(this.buildLastLogField(data));
            
            Ext.each(data.logFiles, function(fileName){
                panel.add(this.buildLogsFileField(fileName));
            }, this);
        }
    },
    
    
    buildFiles: function(data){
        
        var panel = this.down('panel[reference=files]');
        panel.removeAll();
                
        if(data.files){
            Ext.each(data.files, function(fileName){
                panel.add(this.buildFileField(fileName));
            }, this);
        }
    },
    
    
    buildField: function(property){

        var separator = getText(':')+' ';
        var value = property.value + '';
        var label = '';
        
        if(property.value === true || property.value === 'true'){
            value = getText('Yes');
        }else if(property.value === false || property.value === 'false'){
            value = getText('No');
        }
        
        if(!value){
            value = '';
        }

        try {
            label = property.configuration.label + separator;
        }catch(ex) {
            label = property.name + separator;
        }

        var html = [
            '<table><tr>',
                '<td class="material-detail-label">',
                    label,
                '</td>',
                '<td class="material-detail-text">',
                    '<b>'+value+'</b>',
                '</td>',
            '</tr></table>'
        ];

        var field = {
            'html': html
        };

        return field;
    },
    
    
    buildPropertyField: function(key, value){
        
        var valueStyle = 'font-weight: bold; color: black';
                
        if(!value || !key){
            return null;
        }
                
        var field = {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            defaults:{
                margin: '0 0 0 24',
                labelSeparator: getText(':'),
                flex:1,
                style: {
                    marginBottom: '6px',
                    marginTop: 0
                }
            },
            items:[
                {
                    xtype: 'ux-displayfield',
                    fieldLabel: key,
                    fieldStyle: valueStyle,
                    value: value
                }
            ]
        };

        return field;
    },
    
    
    buildConfigurableField: function(property){
        
        var valueStyle = 'font-weight: bold; color: black';
        
        if(property.deviceValue && property.serverValue){
            if(property.deviceValue !== property.serverValue){
                valueStyle = 'font-weight: bold; color: orange';
            }
        }
                
        var value = property.deviceValue + '';
        if(property.serverValue !== undefined && property.serverValue !== null){
            value = property.serverValue + '';
        }
        
        var label = property.description;
        var warningHidden = true;
        
        if(property.value === true || property.value === 'true'){
            value = getText('Yes');
        }else if(property.value === false || property.value === 'false'){
            value = getText('No');
        }
        
        if(!value){
            value = '';
        }
        
        if(!label){
            label = property.name;
        }
        
        if(property.error === true || property.error === 'true'){
            warningHidden = false;
            if(!property.message){
                property.message = getText('Configuration failed!');
            }
        }
        
        if(!property.message){
            property.message = '';
        }
                
        var field = {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            record: property,
            defaults:{
                margin: '0 0 0 24',
                //submitValue: false,
                flex:1
            },
            items:[
                {
                    xtype: 'button',
                    ui: 'indicator',
                    iconCls: 'fa fa-pencil greenIcon',
                    width:24,
                    height:24,
                    scale: 'small',
                    enableToggle: false,
                    flex:0,
                    margin: '0 4 0 4',
                    border: false,
                    tooltip: getText('Edit'),
                    listeners:{
                        scope: this,
                        click: function(button, event, eOpts ){
                            var record = button.up('container').record;
                            this.getController().onEditConfigurationProperty(button, record);
                        }
                    }
                },{
                    xtype: 'button',
                    ui: 'indicator',
                    iconCls: 'fa fa-share blueIcon', //fa fa-sign-in //fa fa-share //fa fa-share-alt //fa fa-share-alt-square
                    width:24,
                    height:24,
                    scale: 'small',
                    enableToggle: false,
                    flex:0,
                    margin: '0 4 0 4',
                    border: false,
                    tooltip: getText('Share'),
                    listeners:{
                        scope: this,
                        click: function(button, event, eOpts ){
                            var record = button.up('container').record;
                            this.getController().onShareConfigurationProperty(button, record);
                        }
                    }
                },{
                    xtype: 'button',
                    hidden: warningHidden,
                    ui: 'indicator',
                    iconCls: 'fa fa-exclamation-triangle redIcon',
                    width:24,
                    height:24,
                    scale: 'small',
                    enableToggle: false,
                    flex:0,
                    margin: '0 4 0 4',
                    border: false,
                    tooltip: property.message,
                    listeners:{
                        scope: this,
                        click: function(me){
                            this.displayMessage(me.tooltip);
                        }
                    }
                },{
                    xtype: 'ux-displayfield',
                    fieldLabel: label,
                    name: property.name,
                    fieldStyle: valueStyle,
                    value: value
                }
            ]
        };

        return field;
    },
    
    
    buildLogsFileField: function(fileName){
                
        var id = this.currentDevice.data.id;
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/devices/logs/' + id + '/' + encodeURI(fileName);
        
        var field = {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype: 'button',
                    ui: 'indicator',
                    iconCls: 'fa fa-file-text-o blueIcon 20',
                    scale: 'small',
                    enableToggle: false,
                    margin: '0 4 0 4',
                    border: false,
                    tooltip: getText('Download'),
                    handler: function(grid, rowIndex, colIndex) {
                        Dashboard.manager.administration.FilesManager.loadFile(url, fileName);
                    }
                },{
                    xtype: 'ux-displayfield',
                    fieldLabel: fileName,
                    labelSeparator: '',
                    listeners: {
                        render: function(c){
                            c.getEl().on({
                                click: function(el){
                                    Dashboard.manager.administration.FilesManager.loadFile(url, fileName);
                                }
                            });
                        }
                    }
                }
            ]
        };

        return field;
        
    },
    
    
    buildLogsZipField: function(){
        
        var id = this.currentDevice.data.id;
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/devices/logs/archive/' + id ;
        var text = getText('All log files in zip archive');
        
        var field = {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype: 'button',
                    ui: 'indicator',
                    iconCls: 'fa fa-folder-o redIcon 20',
                    scale: 'small',
                    enableToggle: false,
                    margin: '0 4 0 4',
                    border: false,
                    tooltip: getText('Download'),
                    handler: function(grid, rowIndex, colIndex) {
                        Dashboard.manager.administration.FilesManager.loadFile(url, 'logs.zip');
                    }
                },{
                    xtype: 'ux-displayfield',
                    fieldLabel: text,
                    labelSeparator: '',
                    listeners: {
                        render: function(c){
                            c.getEl().on({
                                click: function(el){
                                    Dashboard.manager.administration.FilesManager.loadFile(url, 'logs.zip');
                                }
                            });
                        }
                    }
                }
            ]
        };
                
//        var field = {
//            html: '<a style="text-decoration: inherit; color: inherit;" href="' + path + '" target="_blank">'+
//                    '<i class="fa fa-folder-o redIcon 20" aria-hidden="true" style="font-size: 20px;  margin: 12px"></i>'+
//                    '<b style="text-decoration: inherit; color: black; font-size: 14px;">' + text + '</b>'+
//                '</a>'
//        };

        return field;
    },
    
    
    buildLastLogField: function(){
        
        var id = this.currentDevice.data.id;
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/devices/logs/last/' + id ;
        var text = getText('Last log file');
        
        var field = {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype: 'button',
                    ui: 'indicator',
                    iconCls: 'fa fa-clipboard greenIcon 20',
                    scale: 'small',
                    enableToggle: false,
                    margin: '0 4 0 4',
                    border: false,
                    tooltip: getText('Download'),
                    handler: function(grid, rowIndex, colIndex) {
                        Dashboard.manager.administration.FilesManager.loadFile(url, 'lastLog');
                    }
                },{
                    xtype: 'ux-displayfield',
                    fieldLabel: text,
                    labelSeparator: '',
                    listeners: {
                        render: function(c){
                            c.getEl().on({
                                click: function(el){
                                    Dashboard.manager.administration.FilesManager.loadFile(url, 'lastLog');
                                }
                            });
                        }
                    }
                }
            ]
        };
                
//        var field = {
//            html: '<a style="text-decoration: inherit; color: inherit;" href="' + path + '" target="_blank">'+
//                    '<i class="fa fa-clipboard redIcon 20" aria-hidden="true" style="font-size: 20px;  margin: 12px"></i>'+
//                    '<b style="text-decoration: inherit; color: black; font-size: 14px;">' + text + '</b>'+
//                '</a>'
//        };

        return field;
    },
    
    
    buildFileField: function(fileName){
                
        var id = this.currentDevice.data.id;
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/DEVICE/' + id + '/' + encodeURI(fileName);
                
//        var field = {
//            html: '<a style="text-decoration: inherit; color: inherit;" href="' + path + '" target="_blank" >'+
//                    '<i class="fa fa-paperclip blueIcon 20" aria-hidden="true" style="font-size: 20px;  margin: 12px"></i>'+
//                    '<b style="text-decoration: inherit; color: black; font-size: 14px;">' + fileName + '</b>'+
//                '</a>'
//        };

        var field = {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype: 'button',
                    ui: 'indicator',
                    iconCls: 'fa fa-paperclip blueIcon 20',
                    scale: 'small',
                    enableToggle: false,
                    margin: '0 4 0 4',
                    border: false,
                    tooltip: getText('Download'),
                    handler: function(grid, rowIndex, colIndex) {
                        Dashboard.manager.administration.FilesManager.loadFile(url, fileName);
                    }
                },{
                    xtype: 'ux-displayfield',
                    fieldLabel: fileName,
                    labelSeparator: '',
                    listeners: {
                        render: function(c){
                            c.getEl().on({
                                click: function(el){
                                    Dashboard.manager.administration.FilesManager.loadFile(url, fileName);
                                }
                            });
                        }
                    }
                }
            ]
        };

        return field;
    },
    
    
    displayMessage: function(message){
        
        Ext.Msg.show({
            title : getText('Warning'),
            msg : message,
            buttons : Ext.Msg.OK,
            icon : Ext.Msg.WARNING
        });
        
    },


    dateToString: function (_date, type) {
        
        var format = getText('m/d/Y');
        if(type === 'DATETIME'){
            format = getText('m/d/Y H:i:s');
        }
        
        if (_date !== undefined && _date !== '') {
            var date = new Date(_date);
            return Ext.Date.format(date, format);
        }

        return '';
    },
    
    
//    dateToString: function (_date) {
//        if (_date !== undefined && _date !== '') {
//            var date = new Date(_date);
//            return date.toLocaleString();
//        }
//
//        return '';
//    },
    
    
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
            }
        };
        
        return grid;
    }
    
});