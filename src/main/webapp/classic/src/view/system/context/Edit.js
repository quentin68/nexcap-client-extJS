/* global Ext */

Ext.define('Dashboard.view.system.context.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'contextEdit',

    requires: [
        'Dashboard.tool.Utilities'
    ],

    controller: 'contextMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: '80%',
    iconCls: 'fa fa-sitemap',
    plain: true,
    autoScroll: true,
    scrollable: 'y',

    record: null,
    usersStore: null,
    deviceStore: null,
    propertiesStore: null,
    materialStore: null,

    initComponent: function () {
        this.title = getText('Edit a context');

        // Panels
        var namePanel = {
            title: getText('Context'),
            items: [{
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    width: '100%',
                   // vtype:'alphanumeric',
                    listeners: {
                        afterrender: function (field) {
                            field.focus(false, 100);
                        }
                    }
                }]
        };
        
        var restrictionPanel = {
            title: getText('Restrictions'),
            items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    align: 'stretch',
                    items: [
                        {
                            xtype: 'checkbox',
                            name: 'isPropertiesRestricted',
                            value: 'isPropertiesRestricted',
                            boxLabel: getText('Dynamic properties'),
                            checked: false,
                            listeners: {
                                scope: this,
                                change: function (me, newValue, oldValue, eOpts) {
                                    try {
                                        var propertiesGrid = this.down('panel[reference=propertiesPanel]');
                                        if (newValue) {
                                            //this.addPropertiesGrid(this.record, this.record.id);
                                            propertiesGrid.show();
                                        } else {
                                            propertiesGrid.hide();
                                        }
                                        //this.getController().onSaveRestriction(me);
                                    } catch (ex) {
                                        console.log('EX');
                                        console.log(ex);
                                    }
                                },
                                check: function (me, newValue, oldValue, eOpts) {
                                        this.getController().onSaveRestriction(me);
                                },
                                uncheck: function (me, newValue, oldValue, eOpts) {
                                        this.getController().onSaveRestriction(me);
                                }
                            }
                        }, {
                            html: '&nbsp;',
                            flex: 2
                        }, {
                            xtype: 'checkbox',
                            name: 'isMaterialRestricted',
                            value: 'isMaterialRestricted',
                            boxLabel: getText('Items'),
                            checked: false,
                            listeners: {
                                scope: this,
                                change: function (me, newValue, oldValue, eOpts) {
                                    try {
                                        var materialsPanel = this.down('panel[reference=materialsPanel]');
                                        if (newValue) {
                                            //this.addMaterialsGrid(this.record, this.record.id);
                                            materialsPanel.show();
                                        } else {
                                            materialsPanel.hide();
                                        }
                                        //this.getController().onSaveRestriction(me);
                                    } catch (ex) {
                                        console.log('EX');
                                        console.log(ex);
                                    }
                                },
                                check: function (me, newValue, oldValue, eOpts) {
                                        this.getController().onSaveRestriction(me);
                                },
                                uncheck: function (me, newValue, oldValue, eOpts) {
                                        this.getController().onSaveRestriction(me);
                                }
                            }
                        }
                    ]
                }]
        };

        var positionPanel = {
            title: getText('Position'),
            items: [{
                    xtype: 'container',
                    name: 'assignedPositionContainer',
                    hidden: false,
                    anchor: '100%',
                    layout: 'anchor',
                    items: [{
                            xtype: 'autocompleteComboBox',
                            name: 'assignedPositionId',
                            anchor: '100%',
                            fieldLabel: getText('Position'),
                            displayField: 'name',
                            valueField: 'id',
                            queryParam: false,
                            allowBlank: false,
                            filter: [],
                            requires: ['Dashboard.store.administration.Positions'],
                            store: Ext.create('Dashboard.store.administration.Positions', {
                                autoLoad: true,
                                sorters: [{
                                        property: 'name',
                                        direction: 'ASC'
                                    }]
                            }),
                            listConfig: {
                                getInnerTpl: function () {
                                    return '{path}/<b>{name}</b>';
                                }
                            }
                        }]
                }]
        };

        var usersPanel = {
            xtype: 'panel',
            title: getText('Allowed users'),
            iconCls: 'fa fa-shield',
            reference: 'usersPanel',
            collapsible: false,
            ui: 'form-panel',

            items: [],

            tools: [
                {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAddUser'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onRemoveUser'
                }
            ]
        };

        var devicesPanel = {
            xtype: 'panel',
            title: getText('Allowed devices'),
            iconCls: 'fa fa-laptop',
            reference: 'devicesPanel',
            collapsible: false,
            ui: 'form-panel',
            items: [],

            tools: [
                {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAddDevice'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onRemoveDevice'
                }
            ]
        };

        // Hidden panels
        var propertiesPanel = {
            xtype: 'panel',
            title: getText('Dynamic properties'),
            iconCls: 'fa fa-asterisk',
            reference: 'propertiesPanel',
            //id: 'contextPropertiesPanel',
            hidden: true,
            collapsible: false,
            defaults: {
                margin: '0 0 12 0',
                submitValue: false
            },
            ui: 'form-panel',
            items: [],
            tools: [{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAddProperty'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onRemoveProperty'
                }]
        };
        
        var materialsPanel = {
            xtype: 'panel',
            title: getText('Items'),
            iconCls: 'fa fa-tag',
            reference: 'materialsPanel',
            //id: 'contextMaterialsPanel',
            hidden: true,
            collapsible: false,
            defaults: {
                margin: '0 0 12 0',
                submitValue: false
            },
            ui: 'form-panel',
            items: [],
            tools: [{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAddMaterial'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onRemoveMaterial'
                }]
        };

        // Items
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: 650,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable: 'y',

                defaults: {
                    bodyPadding: 20,
                    ui: 'form-panel'
                },

                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },

                items: [
                    namePanel,
                    restrictionPanel,
                    positionPanel,
                    usersPanel,
                    devicesPanel,
                    propertiesPanel,
                    materialsPanel
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },
    //here add listener
    listeners: {
        scope: this,
        afterrender: function (me, layout, eOpts) {
            me.notAllright();
        }
    },
    notAllright: function() {
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var allRightProfile = false;
        var highProfilecurrentUser = currentUser.data.highProfileLevel;
        for (i=0;i<currentUser.data.profiles.length;i++) {
            if (currentUser.data.profiles[i].name === "All rights") {
                allRightProfile = true;
            }
        }
        if (highProfilecurrentUser === "MAX" && allRightProfile === false) {
            this.down('textfield[name=name]').setReadOnly(true);
            this.down('checkbox[name=isPropertiesRestricted]').setReadOnly(true);
            this.down('checkbox[name=isMaterialRestricted]').setReadOnly(true);
            this.down('autocompleteComboBox[name=assignedPositionId]').setReadOnly(true);
            this.down('button[handler=onAddProperty]').setHidden(true);
            this.down('button[handler=onRemoveProperty]').setHidden(true);
            this.down('button[handler=onAddMaterial]').setHidden(true);
            this.down('button[handler=onRemoveMaterial]').setHidden(true);
        }
    },
    getUsers: function () {
        var usersList = [];
        var users = this.down('grid[name=usersGrid]').store.data.items;

        if (users) {
            Ext.each(users, function (row) {
                usersList.push(row.data.id);
            });
        }

        return usersList;
    },

    getDevices: function () {
        var devicesList = [];
        var devices = this.down('grid[name=devicesGrid]').store.data.items;

        if (devices) {
            Ext.each(devices, function (row) {
                devicesList.push(row.data.id);
            });
        }

        return devicesList;
    },
    /**
     * 
     * @returns {Boolean}
     */
    isPropertiesRestricted: function () {
        try {
            var isPropertiesRestricted = this.down('checkboxfield[name=isPropertiesRestricted]');
            return isPropertiesRestricted.getValue();
        } catch (ex) {
            console.log('isPropertiesRestricted');
            console.log(ex);
            return false;
        }
    },
    /**
     * 
     * @returns {Boolean}
     */
    isMaterialRestricted: function () {
        try {
            var isMaterialRestricted = this.down('checkboxfield[name=isMaterialRestricted]');
            return isMaterialRestricted.getValue();
        } catch (ex) {
            console.log('isMaterialRestricted');
            console.log(ex);
            return false;
        }
    },
    getMaterial: function () {
        var materialList = [];
        var material = this.down('grid[name=materialsGrid]').store.data.items;
        if (material) {
            Ext.each(material, function (row) {
                materialList.push(row.data.id);
            });
        }
        return materialList;
    },
    getProperties: function () {
        var propertiesList = [];
        var properties = this.down('grid[name=propertiesGrid]').store.data.items;
        if (properties) {
            Ext.each(properties, function (row) {
                propertiesList.push(row.data.id);
            });
        }
        return propertiesList;
    },

    getData: function () {
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.id = this.record.id;

        values.rootPositionIdList = [];
        if (values.assignedPositionId) {
            values.rootPositionIdList = [values.assignedPositionId];
            delete values.assignedPositionId;
        }

        values.userIdList = null ;//this.getUsers();
        values.deviceIdList = null ;//this.getDevices();

        values.isPropConfRestrictionEnabled = this.isPropertiesRestricted();
        if (values.isPropConfRestrictionEnabled) {
            values.propertyConfigurationIdList = null;//this.getProperties();
        }else {
            values.propertyConfigurationIdList = [];
        }
        
        values.isMaterialRestrictionEnabled = this.isMaterialRestricted();
        if (values.isMaterialRestrictionEnabled) {
            values.materialIdList = null;//this.getMaterial();
        }else{
            values.materialIdList = [];
        }
        
        delete values.isMaterialRestricted;
        delete values.isPropertiesRestricted;

        return values;
    },

    setData: function (data) {
        this.record = data;

        this.down('form').getForm().setValues(data);
        
        var contextId = data.id;
        
        this.materialsPanel = this.down('panel[reference=materialsPanel]');
        this.usersPanel = this.down('panel[reference=usersPanel]');
        this.devicesPanel = this.down('panel[reference=devicesPanel]');
        this.propertiesPanel = this.down('panel[reference=propertiesPanel]');        
                
        // Restrictions
        this.down('checkbox[name=isPropertiesRestricted]').setValue(data.isPropConfRestrictionEnabled);
        this.down('checkbox[name=isMaterialRestricted]').setValue(data.isMaterialRestrictionEnabled);
        
        // Location
        var assignedPositionId = null;
        var assignedPositionName = null;
        
        if (data.rootPositionList && data.rootPositionList.length > 0) {
            assignedPositionId = data.rootPositionList[0].id;
            assignedPositionName = data.rootPositionList[0].name;
        }
        
        this.down('combo[name=assignedPositionId]').setValue(assignedPositionId);
        this.down('combo[name=assignedPositionId]').setRawValue(assignedPositionName);
        
        this.addGrids(data, contextId);

    },
    
    
    addGrids: function(data, contextId){
        
        this.addMaterialsGrid(data, contextId);
        this.addUsersGrid(data, contextId);
        this.addDevicesGrid(data, contextId);
        this.addPropertiesGrid(data, contextId);
    },
    
    
    addMaterialsGrid: function(data, contextId){
        
        this.materialsPanel.removeAll();
                
        if (this.isMaterialRestricted() === true) {
            this.materialsPanel.show();
        } else {
            this.materialsPanel.hide();
            return;
        }

        var materialsStore = Ext.create('Dashboard.store.Materials', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME +
                            '/contexts/'  + contextId + '/materials';
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/materials/search';
                }
            }
        });

        var materialsColumns = [
            {text: getText('Name'), dataIndex: 'name', flex: 1, sortable: true},
            {text: getText('Description'), dataIndex: 'description', flex: 2, sortable: true}
        ];
        var materialsGrid = this.buildGrid(materialsStore, materialsColumns, 'materialsGrid');
        this.materialsPanel.add(materialsGrid);
    },
    
    
    addUsersGrid: function(data, contextId){
        
        this.usersPanel.removeAll();
    
        var usersStore = Ext.create('Dashboard.store.Users', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME +
                            '/contexts/'  + contextId + '/users';
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/users/search';
                }
            }
        });
        
        var usersColumns = [
            {text: getText('Identifier'), dataIndex: 'sticker', flex: 1, sortable: true},
            {text: getText('First name'), dataIndex: 'firstName', flex: 1, sortable: true},
            {text: getText('Last name'), dataIndex: 'lastName', flex: 1, sortable: true}
        ];
        var usersGrid = this.buildGrid(usersStore, usersColumns, 'usersGrid');
        this.usersPanel.add(usersGrid);
    },
    
    
    addDevicesGrid: function(data, contextId){
        
        this.devicesPanel.removeAll();
        
        var devicesStore = Ext.create('Dashboard.store.system.Devices', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME +
                            '/contexts/'  + contextId + '/devices';
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/devices/search';
                }
            }
        });
        
        var devicesColumns = [
            {text: getText('Name'), dataIndex: 'name', flex: 2, sortable: true},
            {text: getText('Type'), dataIndex: 'deviceType', flex: 2, sortable: true},
            {text: getText('Version'), dataIndex: 'softwareVersion', flex: 2, sortable: true},
            {text: getText('Authorized'), dataIndex: 'authorized', flex: 1, sortable: true,
                renderer: function (val) {
                    return val ? getText('Yes') : getText('No');
                }
            }
        ];
        var devicesGrid = this.buildGrid(devicesStore, devicesColumns, 'devicesGrid');
        this.devicesPanel.add(devicesGrid);
        
    },
    
    
    addPropertiesGrid: function(data, contextId){
        
        this.propertiesPanel.removeAll();
                
        if (this.isPropertiesRestricted() === true) {
            this.propertiesPanel.show();
        } else {
            this.propertiesPanel.hide();
            return;
        }
        
        var propertiesStore = Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME +
                            '/contexts/'  + contextId + '/dynamicproperties';
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties/search';
                }
            }
        });

        var propertiesColumns = [
            {text: getText('Name'), dataIndex: 'name', flex: 2, sortable: true},
            {text: getText('Type'), dataIndex: 'type', flex: 1, sortable: true},
            {text: getText('Configuration'), dataIndex: 'propertyConfigurationType', flex: 1, sortable: true}
        ];
        var propertiesGrid = this.buildGrid(propertiesStore, propertiesColumns, 'propertiesGrid');
        this.propertiesPanel.add(propertiesGrid);
    },
    
    
     buildGrid: function(store, columns, name){
        
        var grid = {
            xtype: 'grid',
            name: name,
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