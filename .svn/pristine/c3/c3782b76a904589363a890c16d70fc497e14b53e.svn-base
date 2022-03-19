/* global Ext */

Ext.define('Dashboard.view.shared.viewList.ViewList', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewList',

    layout: 'fit',

    config: {
        store: null
    },

    currentView: null,
    configWindow: null,
    mainView: null,
    modelProperties: null,
    defaultView: 'table',
    configuration: {},

    cls: 'view-list',

    collapsible: false,

    initComponent: function (){
                        
        var me = this;
        Ext.apply(me, {

            dockedItems: [
                {
                    xtype: 'toolbar',
                    defaults: {
                        xtype: 'button',
                        scale: 'small',
                        ui: 'view-list',
                        border: false,
                        hidden: true
                    },
                    items: [
                        {
                            reference: 'acknowledgment',
                            iconCls: 'fa fa-check-circle-o',
                            tooltip: getText('Acknowledge'),
                            handler: 'onAcknowledged'
                        }, {
                            reference: 'add',
                            iconCls: 'fa fa-plus-circle',
                            tooltip: getText('Add'),
                            handler: 'onAdd'
                        }, {
                            reference: 'affect',
                            iconCls: 'fa fa-upload',
                            tooltip: getText('Upload'),
                            handler: 'onAffect'
                        }, {
                            reference: 'create',
                            iconCls: 'fa fa-plus-circle',
                            tooltip: getText('Add'),
                            handler: 'onCreate'
                        }, {
                            reference: 'duplicate',
                            iconCls: 'fa fa-files-o',
                            tooltip: getText('Duplicate'),
                            handler: 'onDuplicate'
                        }, {
                            reference: 'read',
                            iconCls: 'fa fa-arrows-alt',
                            tooltip: getText('Show map'),
                            handler: 'onRead'
                        }, {
                            reference: 'edit',
                            iconCls: 'fa fa-pencil',
                            tooltip: getText('Edit'),
                            handler: 'onEdit'
                        }, {
                            reference: 'destroy',
                            iconCls: 'fa fa-minus-circle',
                            tooltip: getText('Delete'),
                            handler: 'onDestroy'
                        }, {
                            reference: 'toggle',
                            iconCls: 'fa fa-toggle-off',
                            tooltip: getText('Enable/disable'),
                            handler: 'onToggle'
                        }, {
                            reference: 'authorized',
                            iconCls: 'fa fa-check-circle',//'fa fa-check-circle-o',//fa fa-check
                            tooltip: getText('Authorize'),
                            handler: 'onAuthorize'
                        }, {
                            reference: 'ban',
                            iconCls: 'fa fa-ban',
                            tooltip: getText('Ban'),
                            handler: 'onBan'
                        }, {
                            reference: 'export',
                            iconCls: 'fa fa-file-excel-o',
                            tooltip: getText('Export to file'),
                            handler: 'onExportToExel'
                        }, {
                            reference: 'manage',
                            iconCls: 'fa fa-sliders',
                            tooltip: getText('Manage'),
                            handler: 'onManage'
                        },
                        // {
                        // iconCls: 'fa fa-filter',
                        // tooltip: getText('Filter results'),
                        // handler: 'onFilter'
                        // },
                        '->', {
                            iconCls: 'fa fa-table',
                            enableToggle: false,
                            handler: 'onDisplayByTable',
                            reference: 'displayByTable',
                            scope: this
                        }, {
                            iconCls: 'fa fa-bars',
                            enableToggle: false,
                            handler: 'onDisplayByList',
                            reference: 'displayByList',
                            scope: this
                        }, {
                            iconCls: 'fa fa-picture-o',
                            enableToggle: false,
                            handler: 'onDisplayByAlbum',
                            reference: 'displayByAlbum',
                            scope: this
                        }, {
                            iconCls: 'fa fa-wrench',
                            enableToggle: false,
                            handler: 'onConfigViewList',
                            reference: 'configViewList',
                            scope: this
                        }, {
                            iconCls: 'fa fa-compress',
                            enableToggle: true,
                            toggleHandler: 'toggleDisplayDetail',
                            reference: 'displayDetail',
                            scope: this
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
        
        this.configViews();
        
        //Dashboard.manager.system.DynamicPropertiesManager.store.on('load', this.onDisplay, this);
        Dashboard.manager.system.DynamicPropertiesManager.store.load();

//        // default
        if (this.defaultView === 'album') {
            this.onDisplayByAlbum();
        } else if (this.defaultView === 'list') {
            this.onDisplayByList();
        } else {
            this.onDisplayByTable();
        }

    },
    

    configViews: function (){
                
        var viewListConfiguration = Dashboard.manager.FeaturesManager.getViewListConfiguration(this.mainView.getController().feature);
        if(viewListConfiguration){
            this.configuration = viewListConfiguration;
        }

        var viewsCount = 0;
        var conf = this.configuration;
        
        var enabledTools = this.mainView.getController().feature.data.enabledTools;

        this.down('button[handler=onCreate]').hidden = true;
        this.down('button[handler=onDuplicate]').hidden = true;
        this.down('button[handler=onRead]').hidden = true;
        this.down('button[handler=onEdit]').hidden = true;
        this.down('button[handler=onDestroy]').hidden = true;
        this.down('button[handler=onManage]').hidden = true;
        this.down('button[handler=onExportToExel]').hidden = true;
        this.down('button[handler=onAcknowledged]').hidden = true;
        this.down('button[handler=onAuthorize]').hidden = true;
        this.down('button[handler=onBan]').hidden = true;
        this.down('button[handler=onAdd]').hidden = true;
        this.down('button[handler=onAffect]').hidden = true;
        this.down('button[handler=onToggle]').hidden = true;
        this.down('button[toggleHandler=toggleDisplayDetail]').hidden = true;

        if (enabledTools) {

            if (enabledTools['create']) {
                this.down('button[handler=onCreate]').hidden = false;
            }
            if (enabledTools.edit) {
                this.down('button[handler=onEdit]').hidden = false;
            }
            if (enabledTools.destroy) {
                this.down('button[handler=onDestroy]').hidden = false;
            }
            if (enabledTools.manage) {
                this.down('button[handler=onManage]').hidden = false;
            }
            if (enabledTools.duplicate) {
                this.down('button[handler=onDuplicate]').hidden = false;
            }
            if (enabledTools.read) {
                this.down('button[handler=onRead]').hidden = false;
            }
            if (enabledTools.exportToFile) {
                this.down('button[handler=onExportToExel]').hidden = false;
            }
            if (enabledTools.acknowledged) {
                this.down('button[handler=onAcknowledged]').hidden = false;
            }
            if (enabledTools.authorize) {
                this.down('button[handler=onAuthorize]').hidden = false;
            }
            if (enabledTools.ban) {
                this.down('button[handler=onBan]').hidden = false;
            }
            if (enabledTools.add) {
                this.down('button[handler=onAdd]').hidden = false;
            }
            if (enabledTools.affect) {
                this.down('button[handler=onAffect]').hidden = false;
            }
            if (enabledTools.toggle) {
                this.down('button[handler=onToggle]').hidden = false;
            }
            if (enabledTools.detailToggle) {
                this.down('button[toggleHandler=toggleDisplayDetail]').hidden = false;
                // Persist toggle state locally
                if (localStorage) {
                    var panelMainName = '';
                    try {
                        panelMainName = this.up('panel').up('panel').xtype;
                        var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
                        panelMainName += '.' + user.id;
                    } catch (ex) {
                        //
                    }

                    var detailToggleState = localStorage.getItem('detailToggleState.' + panelMainName);
                    if (detailToggleState === null) { // not set
                        localStorage.setItem('detailToggleState.' + panelMainName, 'shown'); // default
                    }
                }
            }
        }

        if (conf.album !== undefined) {
            this.down('button[handler=onDisplayByAlbum]').hidden = false;
            viewsCount++;
        }

        if (conf.list) {
            this.down('button[handler=onDisplayByList]').hidden = false;
            viewsCount++;
        }

        if (conf.table) {
            this.down('button[handler=onDisplayByTable]').hidden = false;
            viewsCount++;
        }

        if (viewsCount <= 1) {
            this.down('button[handler=onDisplayByAlbum]').hidden = true;
            this.down('button[handler=onDisplayByList]').hidden = true;
            this.down('button[handler=onDisplayByTable]').hidden = true;
        }
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userSettings = currentUser.getUserSettings();

        if (Dashboard.manager.FeaturesManager.isEnabled('EXTERNAL_CONFIGURATION_ADMIN') === false) {
            this.down('button[reference=configViewList]').hidden = true;
        } else {
            if (enabledTools && enabledTools.configViewList !== undefined && enabledTools.configViewList === false) {
                this.down('button[reference=configViewList]').hidden = true;
            } else {
                this.down('button[reference=configViewList]').hidden = false;
            }
        }
        if (userSettings.personalColumns === true) {
            this.down('button[reference=configViewList]').hidden = false;
        }
    },

    onDisplayByAlbum: function (sender){

        Dashboard.tool.Utilities.info('[ViewList.onDisplayByAlbum] fire event');
        var conf = this.configuration.album;
        
        this.getStore().clearData();

        this.currentView = {
            xtype: 'viewListAlbum',
            store: this.getStore(),
            configuration: conf
        };

        this.display(this.currentView);
        this.getStore().load();
    },

    onDisplayByList: function (sender){

        Dashboard.tool.Utilities.info('[ViewList.onDisplayByList] fire event');
        var conf = this.configuration.list;
        
        this.getStore().clearData();

        this.currentView = {
            xtype: 'viewListList',
            store: this.getStore(),
            configuration: conf
        };

        this.display(this.currentView);
        this.getStore().load();
    },

    onDisplayByTable: function (sender){
        
        Dashboard.tool.Utilities.info('[ViewList.onDisplayByTable] fire event');
        var conf = this.configuration.table;
                
        conf.columns = this.cleanColumns(conf.columns);
        conf.columns = this.addRenderer(conf.columns);
        conf.columns = this.addFormatter(conf.columns);
        
        try{
            conf.extendedProperties.properties = this.cleanRows(conf.extendedProperties.properties);
         }catch(ex){}
         
        this.getStore().clearData();

        this.currentView = {
            xtype: 'viewListGrid',
            store: this.getStore(),
            configuration: conf
        };
        
        this.display(this.currentView);
        this.getStore().load();
    },
    
    findDeletedProperties: function(columns){
        
        var deletedProperties = [];

        var dynamicProperties = Dashboard.manager.system.DynamicPropertiesManager.store;
        
        Ext.each(columns, function(column){
            
            // Test if dynamic
            var found = Ext.Array.findBy(this.modelProperties, function (item){
                if(item.name === column.dataIndex){
                    return true;
                }else{
                    return false;
                }
            });
            
            //If property not dynamic, return
            if(found){
                return true; //continue
            }
                        
            if(dynamicProperties.findRecord('name', column.propertyName, 0, false, true) === null){
                Dashboard.tool.Utilities.info('[ViewList.findDeletedProperties] deleted property : ' + column.propertyName);
                deletedProperties.push(column);
            }
            
        }, this);
        
        return deletedProperties;
        
    },
    
     cleanColumns: function(columns){
                  
        var deletedProperties = this.findDeletedProperties(columns);

        Ext.each(deletedProperties, function(deletedProperty){
            for(var i=0; i<columns.length; i++){
                if(columns[i].propertyName === deletedProperty.propertyName){
                    columns.splice(i, 1);
                }
            }
        });
        
        Ext.each(columns, function(column){
            if(column.flex === true  || column.fit === true || column.width === 'auto'){
                column.flex = 1;
            }
        }, this);

        return columns;
    },
    
    
    cleanRows: function(properties){
                
        var deletedProperties = this.findDeletedRowProperties(properties);

        Ext.each(deletedProperties, function(deletedProperty){
            for(var i=0; i<properties.length; i++){
                if(properties[i].property === deletedProperty.property){
                    properties.splice(i, 1);
                }
            }
        });
        
        return properties;
        
    },
    
    
    findDeletedRowProperties: function(rows){
        
        var deletedProperties = [];

        var dynamicProperties = Dashboard.manager.system.DynamicPropertiesManager.store;
        
        Ext.each(rows, function(row){
                        
            // Test if dynamic
            var found = Ext.Array.findBy(this.modelProperties, function (item){
                if(item.name === row.property){
                    return true;
                }else{
                    return false;
                }
            });
            
            //If property not dynamic, return
            if(found){
                return true; //continue
            }
                        
            if(dynamicProperties.findRecord('name', row.property, 0, false, true) === null){
                Dashboard.tool.Utilities.info('[ViewList.findDeletedProperties] deleted property : ' + row.property);
                deletedProperties.push(row);
            }
            
        }, this);
        
        return deletedProperties;
        
    },
    

    addRenderer: function (columns){
        var parentScope = this;
        
        Ext.each(columns, function (column){
                        
            if (column.type && !column.isDynamic) {

                column.renderer = function (value, metaData, record){

                    var propValue = value;

                    try {
                        if (record.getData().propertiesObject[(column.dataIndex + '')]) {
                            propValue = record.getData().propertiesObject[(column.dataIndex + '')].value;
                        } else {
                            propValue = record.getData().column.dataIndex;
                        }
                    } catch (ex) {
                        // do nothing
                    }
                    
                    if(record.data.codes && record.data.codes.length > 0){
                        Ext.each(record.data.codes, function(code){
                            if (column.text === "Tag RFID"){
                                column.codeType = "RFID_TAG";
                            }
                            else if (column.text === "Code libre") {
                                column.codeType = "FREE_INPUT";
                            }
                            else if (column.text === "Code alphanumérique") {
                                column.codeType = "ALPHANUM_INPUT";
                            }
                            else if (column.text === "QR code") {
                                column.codeType = "QR_CODE";
                            }
                            else if (column.text === "Code-barres") {
                                column.codeType = "BAR_CODE";
                            }
                            if(code.codeType === column.codeType ){
                                propValue = code.code;
                            }
                        });
                    }

                    try {
                        // if propertiesObject does not work
                        if (propValue === undefined) {
                            var indexes = column.dataIndex.split('.');
                            var data = record.getData();

                            indexes.forEach(function (index){
                                data = data[index];
                            });
                            propValue = data;
                        }
                    } catch (ex) {
                        // console.log(ex);
                    }

                    // Format Boolean // Date // DateTime
                    return parentScope.valueFormatter(column, propValue);
                };

            } else if (column.isDynamic) {
                
                column.renderer = function (value, metaData, record){
                                        
                    var propPrefix = '';
                    switch (record.store.model.entityName) {
                        case 'User':
                            propPrefix = 'userPropertyValues.';
                            break;
                        case 'Location':
                            propPrefix = 'locationPropertyValues.';
                            break;
                        case 'Material':
                            propPrefix = 'materialPropertyValues.';
                            break;
                        case 'Reference':
                            propPrefix = 'productReferencePropertyValues.';
                            break;
                        case 'consultation.MaterialsSet':
                            propPrefix = 'productReference.productReferencePropertyValues.';
                            break;
                        default:
                            propPrefix = 'properties.';
                            // Dashboard.tool.Utilities.error('[ViewList.addRenderer] unsuported propertyConfigurationType : ' + record.store.model.entityName);
                            break;
                    }
                    
                    metaData.column.dataIndex = propPrefix + column.propertyName;
                    var propValue = '';
                    var propertyName = column.propertyName;

                    try {
                        var propObject = record.getData().propertiesObject[(propertyName)];
                        if (propObject) {
                            propValue = record.getData().propertiesObject[(propertyName)].value;
                        }
                    } catch (ex) {
                        // do nothing
                    }

                    // Format Boolean // Date // DateTime
                    return parentScope.valueFormatter(column, propValue);
                };

            } else if (!column.renderer) {
                column.renderer = function (value, metaData, record){
                    var propValue = eval("record.getData()." + column.dataIndex);
                    propValue = parentScope.valueFormatter(column, propValue);
                    return propValue;
                };
            }

            // delete column.property;

        }, this);

        return columns;
    },
    

    addFormatter: function (columns){


        Ext.each(columns, function (column){
                        
            if (column.type === 'DATE' && !column.isDynamic) {
                column.formatter = 'date("' + getText('m/d/Y') + '")';
            } else if (column.type === 'DATETIME' && !column.isDynamic) {
                column.formatter = 'date("' + getText('m/d/Y H:i:s') + '")';
            }

        }, this);

        return columns;
    },

    display: function (currentView){
        this.cleanContainer();
        this.add(currentView);
    },

    cleanContainer: function (){
        this.removeAll();
    },

    toggleDisplayDetail: function (sender, state){

        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];
        if (detailContainer === undefined) {
            return;
        }
        var stateString;
        if (state) {
            detailContainer.hide();
            sender.setIconCls('fa fa-expand');
            stateString = 'hidden';
        } else {
            detailContainer.show();
            sender.setIconCls('fa fa-compress');
            stateString = 'shown';
        }

        // Persist toggle state locally
        if (localStorage) {
            var panelMainName = '';
            try {
                panelMainName = this.up('panel').up('panel').xtype;
                var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
                panelMainName += '.' + user.id;
            } catch (ex) {
                // 
            }

            localStorage.setItem('detailToggleState.' + panelMainName, stateString);
        }
    },

    listeners: {
        afterrender: function (me, eOpts){
            if (localStorage) {
                var panelMainName = '';
                try {
                    panelMainName = this.up('panel').up('panel').xtype;
                    var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
                    panelMainName += '.' + user.id;
                } catch (ex) {
                    // 
                }

                var buttonDetail = me.down('button[toggleHandler=toggleDisplayDetail]');
                var detailToggleState = localStorage.getItem('detailToggleState.' + panelMainName);
                if (detailToggleState === null) { // not set
                    localStorage.setItem('detailToggleState.' + panelMainName, 'shown'); // default
                } else if (detailToggleState === 'hidden') {
                    this.toggleDisplayDetail(buttonDetail, true);
                } else if (detailToggleState === 'shown') {
                    this.toggleDisplayDetail(buttonDetail, false);
                }
            }
        }
    },


    /**
     * Columns / lignes configuration
     * @param {type} sender
     * @returns {undefined}
     */
    onConfigViewList: function (sender){
        
        var viewType = this.currentView.xtype;

        switch (viewType) {

            case 'viewListGrid':

                this.configWindow = Ext.create('Dashboard.view.shared.viewList.GridConfiguration', {
                    modelProperties: this.modelProperties,
                    mainView: this.mainView
                });

                try {
                    var columns = this.configuration.table.columns;
                    if (columns && columns.length > 0) {
                        this.configWindow.setColumns(columns);
                    }
                } catch (ex) {
                }

                try {
                    var rows = this.configuration.table.extendedProperties.properties;
                    if (rows && rows.length > 0) {
                        this.configWindow.setRows(rows);
                    }
                } catch (ex) {
                }
                break;

            case 'viewListList':

                this.configWindow = Ext.create('Dashboard.view.shared.viewList.ListConfiguration', {
                    modelProperties: this.modelProperties,
                    mainView: this.mainView
                });

                this.configWindow.setData(this.configuration.list);
                break;

            case 'viewListAlbum':

                this.configWindow = Ext.create('Dashboard.view.shared.viewList.AlbumConfiguration', {
                    modelProperties: this.modelProperties,
                    mainView: this.mainView
                });

                this.configWindow.setData(this.configuration.album);
                break;
        }

        this.configWindow.show();
    },

    getDefaultConf: function (){

        var configuration = {

            list: {

                viewModelType: 'materialViewModel',
                viewModelBinding: 'viewListBinding',

                mainProperties: {

                    thumb: 'thumbnailName',
                    title: 'name',
                    subTitle: {
                        property: 'name',
                        label: 'Name',
                        type: 'string'
                    },

                    properties: [{
                            property: 'name',
                            label: 'Name',
                            style: 'color:green;'
                        }]
                },

                extendedProperties: {

                    properties: [{
                            property: 'name',
                            label: 'Name',
                            style: 'color:red;'
                        }]
                }
            },

            album: {

                thumb: 'thumbnailName',
                caption: 'name',
                size: 's',
                properties: [{
                        property: 'name',
                        label: 'Name',
                        style: 'color:red;'
                    }]
            },

            table: {

                displayRowNumbers: true,

                columns: [{
                        text: 'Name',
                        locked: true,
                        width: 200,
                        sortable: false,
                        dataIndex: 'name',
                        cellWrap: false
                    }],

                extendedProperties: {
                    properties: [{
                            property: 'name',
                            label: 'Name',
                            style: 'color:green;'
                        }]
                }
            }
        };

        return configuration;
    },

    refresh: function (){
        
        var viewType = this.currentView.xtype;

        switch (viewType) {
            case 'viewListGrid':
                this.onDisplayByTable();
                break;

            case 'viewListList':
                this.onDisplayByList();
                break;

            case 'viewListAlbum':
                this.onDisplayByAlbum();
                break;
        }

    },

    getSelection: function (){

        var viewType = this.currentView.xtype;

        switch (viewType) {
            case 'viewListGrid':
                return this.down('viewListGrid').selection;

            case 'viewListList':
                return this.down('viewListList').selection;

            case 'viewListAlbum':
                return this.down('dataview').selection;
        }
    },

    // ==================================================
    // FORMATTER FUNCTIONS
    // ==================================================

    /**
     * Formats raw values to proper human display
     * Can be extended to cover diffrent formattings
     * @param {type} column
     * @param {type} value
     * @returns {String}
     */
    valueFormatter: function (column, value){
        var propValue = value;

        // Order is important 
        if (column.dataIndex === 'isAcknowledged') {
            return this.acknowledgedFormatter(value);
        }
        
        if (column.dataIndex === 'alertLevel') {
            return this.alertLevelFormatter(value);
        }
        
        if (column.dataIndex === 'code') {
            return this.codeTypeFormatter(column, value);
        }

        if (column.dataIndex === 'identified') {
            return this.refrenceIdentifiedFormatter(value);
        }

        if (column.type === 'BOOLEAN' || typeof value === 'boolean') {
            return this.booleanFormatter(value);
        }

        if (typeof value === 'string') {
            if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                return this.booleanFormatter(value.toLowerCase());
            }
        }

        if (column.type === 'DATE' || column.type === 'DATETIME') {
            propValue = this.dateToString(value, column.type);
        }

        if (value === undefined || value === null) {
            propValue = '';
        }

        return propValue;
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
    

    booleanFormatter: function (value){
        var propValue = '';
        if (value === true || value === 'true') {
            propValue = getText('Yes');
        } else if (value === false || value === 'false') {
            propValue = getText('No');
        }
        return propValue;
    },

    alertLevelFormatter: function (value){
        switch (value) {
            case '0':
            case 0:
                return getText('Low');
                break;
            case '1':
            case 1:
                return getText('Medium');
                break;
            case '2':
            case 2:
                return getText('High');
                break;
            case "LOW":
                return getText('Low');
                break;
            case "MEDIUM":
                return getText('Medium');
                break;
            case "HIGH":
                return getText('High');
                break;
            default:
                return '';
                break;
        }
    },
    
    
    codeTypeFormatter: function (codes, codeType){
        
        //
        
    },
    

    acknowledgedFormatter: function (value){
        var html = '<div style="display: block; margin-left: 45%;  margin-right: auto;">'; // center
        // Show value in text if you need to?
        // var propValue = this.booleanFormatter(value);
        // html += propValue;

        if (value === true || value === 'true') {
            html += '<i class="fa fa-check" aria-hidden="true"></i>';
        }

        html += '</div>';
        return html;
    },

    refrenceIdentifiedFormatter: function (value){
        return value ? getText('Items') : getText('Materials set');
    }
});