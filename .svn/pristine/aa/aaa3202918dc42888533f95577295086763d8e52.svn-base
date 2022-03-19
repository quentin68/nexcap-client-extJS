Ext.define('Dashboard.view.system.device.SelectorToDelete', {
    extend: 'Ext.window.Window',
    xtype: 'deviceSelectorToDelete',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.user.GridPanel'
    ],

    iconCls: 'fa fa-laptop',
    layout: 'fit',
    closable: false,
    closeAction: 'destroy',
    resizable: true,
    modal: true,
    record: [],
    constrain: true,
    bodyPadding: 16,
    withDevices: true,
    filtersLocationStore: null,
    parentController: null,

    initComponent: function () {

        this.title = getText('Select devices to delete');
        this.filtersLocationStore = Ext.create('Dashboard.store.administration.Locations', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    if (this.withDevices) {
                        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/withdevices';
                    } else {
                        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/search';
                    }
                    store.getProxy().setUrl(url);
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/search';
                    store.getProxy().setUrl(url);
                }
            }
        });

        this.filtersLocationStore.getProxy().extraParams.filter = [];

        var deviceGridPanel = Ext.create('Dashboard.view.system.device.GridPanelContext',{
            region: 'center',
            margin : '16 0 0 0',
            conID: this.conID
        });

        var authorizedStore = Ext.create('Ext.data.Store', {
            fields: ['val', 'label'],
            data: [
                {'val': 'true', 'label': getText('Yes')},
                {'val': 'false', 'label': getText('No')}
            ]
        });

        var deviceTypesStore = Ext.create('Ext.data.Store', {
            fields: ['label'],
            data: [
                {'label': 'CABINET_XL'},
                {'label': 'CABINET_XS'},
                {'label': 'X_DRAWERS'},
                {'label': 'CABINET_XD'},
                {'label': 'CABINET_XDS'},
                {'label': 'COUNTER'},
                {'label': 'CABINET_XLW'},
                {'label': 'TABLET'},
                {'label': 'MOBILE_APP'},
                {'label': 'EXTERNAL_SYSTEM'},
                {'label': 'NEXPORT'},
                {'label': 'READING_STATION'},
                {'label': 'IOT_GATEWAY'}
            ]
        });

        var filterButtonsPanel = {
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            defaults: {
                xtype: 'button',
                width: 80,
                margin: '10 8 10 0'
            },
            items: [
                {
                    text: getText('Reset'),
                    listeners: {
                        scope: this,
                        "click": function (ctrl, evt) {
                            this.resetForm();
                            this.updateDataStore(ctrl);
                        }
                    }
                }, {
                    text: getText('Filter'),
                    listeners: {
                        scope: this,
                        "click": function (ctrl, evt) {
                            this.updateDataStore(ctrl);
                        }
                    }
                }
            ]
        };

        var filterFieldsPanel = {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                pack: 'center'
            }, items: [
                {
                    xtype: 'combo',
                    id: 'locationGridAddressFilter',
                    fieldLabel: getText('Address'),
                    width: '100%',
                    store: this.filtersLocationStore,
                    displayField: 'address',
                    valueField: 'address',
                    flex: 1,

                },{
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        padding: '0 0 10 0'
                    }, items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: getText('Name'),
                            id: 'nameDeviceGridFilter',
                            flex: 1
                        }, {
                            xtype: 'combo',
                            id: 'typeDeviceGridFilter',
                            fieldLabel: getText('Type'),
                            flex: 1,
                            store: deviceTypesStore,
                            displayField: 'label',
                            valueField: 'label',
                            layout: 'fit',
                            margin: '0 0 0 10'
                        }
                    ]
                }, {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'stretch'
                    }, items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: getText('Version'),
                            id: 'versionDeviceGridFilter',
                            flex: 1
                        }, {
                            xtype: 'combo',
                            id: 'authorizedDeviceGridFilter',
                            fieldLabel: getText('Authorized'),
                            flex: 1,
                            store: authorizedStore,
                            displayField: 'label',
                            valueField: 'val',
                            layout: 'fit',
                            margin: '0 0 0 10'
                        }
                    ]
                }
            ]
        };

        this.items = [
            {
                xtype: 'form',
                width: 640,
                height: 480,
                border: false,
                fieldDefaults: {
                    labelWidth: 112,
                    // anchor: '100%',
                    labelSeparator: getText(':')
                }, items: [
                    filterFieldsPanel,
                    filterButtonsPanel,
                    deviceGridPanel
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Select'),
                action: 'selectDevices',
                listeners: {
                    scope: this,
                    click: function (me, e, eOpts) {
                        this.parentController.onSelectDevicesToDelete(me);
                    }
                }

            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },

    /**
     * Method used by the controller to get values
     * @return (object) data NOT encoded to jSon
     */
    getData: function () {

        // Get form values
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        return values;
    },

    resetForm: function () {
        var nameDeviceGridFilter = Ext.getCmp('nameDeviceGridFilter');
        var typeDeviceGridFilter = Ext.getCmp('typeDeviceGridFilter');
        var versionDeviceGridFilter = Ext.getCmp('versionDeviceGridFilter');
        var authorizedDeviceGridFilter = Ext.getCmp('authorizedDeviceGridFilter');

        if (nameDeviceGridFilter) {
            nameDeviceGridFilter.setValue(null);
        }

        if (typeDeviceGridFilter) {
            typeDeviceGridFilter.setValue(null);
        }
        if (versionDeviceGridFilter) {
            versionDeviceGridFilter.setValue(null);
        }
        if (authorizedDeviceGridFilter) {
            authorizedDeviceGridFilter.setValue(null);
        }
    },

    updateDataStore: function (sender) {
        var filterList = [];

        var nameDeviceGridFilter = Ext.getCmp('nameDeviceGridFilter');
        var typeDeviceGridFilter = Ext.getCmp('typeDeviceGridFilter');
        var versionDeviceGridFilter = Ext.getCmp('versionDeviceGridFilter');
        var authorizedDeviceGridFilter = Ext.getCmp('authorizedDeviceGridFilter');

        if (nameDeviceGridFilter && nameDeviceGridFilter.value) {
            var valueString = nameDeviceGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'name',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

        if (typeDeviceGridFilter && typeDeviceGridFilter.value) {
            var valueString = typeDeviceGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'deviceType',
                    value: valueString,
                    type: 'ENUM',
                    comparison: 'EQ'
                });
            }
        }

        if (versionDeviceGridFilter && versionDeviceGridFilter.value) {
            var valueString = versionDeviceGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'softwareVersion',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

        if (authorizedDeviceGridFilter && authorizedDeviceGridFilter.value) {
            var valueString = authorizedDeviceGridFilter.value.trim();
            var valueBool = valueString === 'true' ? true : false;
            if (valueString.length > 0) {
                filterList.push({
                    property: 'authorized',
                    value: valueBool,
                    type: 'BOOLEAN',
                    comparison: 'EQ'
                });
            }
        }

        var win = sender.up('window');
        var grid = win.down('deviceGridPanel');

        grid.setFilters(filterList);
    }
});