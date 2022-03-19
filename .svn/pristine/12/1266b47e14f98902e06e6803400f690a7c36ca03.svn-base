/* global Ext  */

Ext.define('Dashboard.view.system.context.Create', {
    extend: 'Ext.window.Window',
    xtype: 'contextCreate',
    
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
        this.title = getText('Create a context');
        // Stores
        this.usersStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'sticker', 'badgeNumber', 'firstName', 'lastName']
        });
        this.deviceStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'name', 'deviceType', 'softwareVersion']
        });
        this.propertiesStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'name', 'type', 'propertyConfigurationType']
        });
        this.materialStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'name', 'description']
        });
        // Panels
        var namePanel = {
            title: getText('Context'),
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    width: '100%',
                  //  vtype:'alphanumeric',
                    listeners: {
                        afterrender: function (field) {
                            field.focus(false, 100);
                        }
                    }
                }
            ]
        };
        
        var restrictionPanel = {
            title: getText('Restrictions'),
            items: [
                {
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
                                        var propertiesGrid = Ext.getCmp('contextPropertiesPanel');
                                        if (newValue) {
                                            propertiesGrid.show();
                                        } else {
                                            propertiesGrid.hide();
                                        }
                                    } catch (ex) {
                                        console.log(ex);
                                    }
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
                                        var materialPanel = Ext.getCmp('contextMaterialPanel');
                                        if (newValue) {
                                            materialPanel.show();
                                        } else {
                                            materialPanel.hide();
                                        }
                                    } catch (ex) {
                                        console.log(ex);
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
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
            items: [
                {
                    xtype: 'container',
                    reference: 'allowedUsers',
                    items: {
                        xtype: 'grid',
                        name: 'usersGrid',
                        store: this.usersStore,
                        // multiSelect: true,
                        layout: {
                            type: 'fit',
                            align: 'stretch'
                        },
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {text: getText('Identifier'), dataIndex: 'sticker', flex: 1},
                            {text: getText('First name'), dataIndex: 'firstName', flex: 1},
                            {text: getText('Last name'), dataIndex: 'lastName', flex: 1}
                        ],
                        width: '100%'
                    }
                }
            ],
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
            items: [
                {
                    xtype: 'container',
                    reference: 'allowedDevices',
                    items: {
                        xtype: 'grid',
                        name: 'devicesGrid',
                        store: this.deviceStore,
                        // multiSelect: true,
                        layout: {
                            type: 'fit',
                            align: 'stretch'
                        },
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {text: getText('Name'), dataIndex: 'name', flex: 2},
                            {text: getText('Type'), dataIndex: 'deviceType', flex: 2},
                            {text: getText('Version'), dataIndex: 'softwareVersion', flex: 2},
                            {text: getText('Authorized'), dataIndex: 'authorized', flex: 1,
                                renderer: function (val) {
                                    return val ? getText('Yes') : getText('No');
                                }
                            }
                        ],
                        // height: 400,
                        width: '100%'
                    }
                }
            ],
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
            id: 'contextPropertiesPanel',
            hidden: true,
            collapsible: false,
            defaults: {
                margin: '0 0 12 0',
                submitValue: false
            },
            ui: 'form-panel',
            items: [
                {
                    xtype: 'container',
                    reference: 'allowedProperties',
                    items: {
                        xtype: 'grid',
                        name: 'propertiesGrid',
                        store: this.propertiesStore,
                        layout: {
                            type: 'fit',
                            align: 'stretch'
                        },
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {text: getText('Name'), dataIndex: 'name', flex: 2},
                            {text: getText('Type'), dataIndex: 'type', flex: 1},
                            {text: getText('Configuration'), dataIndex: 'propertyConfigurationType', flex: 1}
                        ],
                        width: '100%'
                    }
                }
            ],
            tools: [
                {
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
                }
            ]
        };
        var materialPanel = {
            xtype: 'panel',
            title: getText('Items'),
            iconCls: 'fa fa-tag',
            reference: 'materialPanel',
            id: 'contextMaterialPanel',
            hidden: true,
            collapsible: false,
            defaults: {
                margin: '0 0 12 0',
                submitValue: false
            },
            ui: 'form-panel',
            items: [
                {
                    xtype: 'container',
                    reference: 'allowedMaterials',
                    items: {
                        xtype: 'grid',
                        name: 'materialsGrid',
                        store: this.materialStore,
                        layout: {
                            type: 'fit',
                            align: 'stretch'
                        },
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {text: getText('Name'), dataIndex: 'name', flex: 1},
                            {text: getText('Description'), dataIndex: 'description', flex: 2}
                        ],
                        width: '100%'
                    }
                }
            ],
            tools: [
                {
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
                }
            ]
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
                    materialPanel
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
        values.rootPositionIdList = [];
        
        if (values.assignedPositionId) {
            values.rootPositionIdList = [values.assignedPositionId];
            delete values.assignedPositionId;
        }

        values.userIdList = this.getUsers();
        values.deviceIdList = this.getDevices();
        
        values.isPropConfRestrictionEnabled = this.isPropertiesRestricted();
        if (values.isPropConfRestrictionEnabled) {
            values.propertyConfigurationIdList = this.getProperties();
        } else {
            values.propertyConfigurationIdList = [];
        }
        
        values.isMaterialRestrictionEnabled = this.isMaterialRestricted();
        if (values.isMaterialRestrictionEnabled) {
            values.materialIdList = this.getMaterial();
        } else {
            values.materialIdList = [];
        }
        
        delete values.isMaterialRestricted;
        delete values.isPropertiesRestricted;

        return values;
    }
});