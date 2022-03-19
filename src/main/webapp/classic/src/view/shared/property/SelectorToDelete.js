/* global Ext */

Ext.define('Dashboard.view.shared.property.SelectorToDelete', {
    extend: 'Ext.window.Window',
    xtype: 'propertySelectorToDelete',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.reference.GridPanel',
        'Dashboard.view.shared.component.AutocompleteComboBox'
    ],

    iconCls: 'fa fa-cube',
    layout: 'fit',
    closable: false,
    closeAction: 'destroy',
    resizable: true,
    modal: true,
    record: [], // selectedRow.data
    constrain: true,
    bodyPadding: 16,
    type: null,  // trop de types tuent les types !!

    parentController: null,
    typeOfValidation: null,
    subTitle: '',

    propertiesStore: null,

    initComponent: function () {

        if (this.typeOfValidation === 'PRODUCTREFERENCE') {
            this.subtitle = getText('Select a reference property to delete');
            this.type = 'PRODUCTREFERENCE';

        } else if (this.typeOfValidation === 'MATERIAL') {
            this.subtitle = getText('Select an item property to delete');
            this.type = 'MATERIAL';

        } else {
            this.subtitle = getText('Select a property to delete');
            this.type = null;
        }

        this.title = this.subtitle;
        var type = this.type;

        this.propertiesStore = Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: true,
            listeners: {

                beforeload: function (store, operation, eOpts) {

                    store.getProxy().extraParams.filter = [];

                    if (type !== null) {
                        var filterType = {
                            property: 'propertyConfigurationType',
                            value: type,
                            type: 'ENUM',
                            comparison: 'EQ'
                        };
                        store.getProxy().extraParams.filter.push(filterType);

                        var filterNotUsedInCategory = {
                            property: 'productCategory',
                            value: '',
                            type: 'OBJECT',
                            comparison: 'IS_NULL'
                        };
                        var filterNotUsedInReference = {
                            property: 'productReference',
                            value: '',
                            type: 'OBJECT',
                            comparison: 'IS_NULL'
                        };
                        store.getProxy().extraParams.filter.push(filterNotUsedInCategory);
                        store.getProxy().extraParams.filter.push(filterNotUsedInReference);
                    }
                },
                load: function (store, operation, eOpts) {

                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        var propertyGridPanel = Ext.create('Dashboard.view.shared.property.GridPanelContext',{
            region: 'center',
            margin : '16 0 0 0',
            type: type,
            conID: this.conID
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
                pack: 'center',
                padding: '0 0 10 0',
                width: '100%'
            }, items: [
                {
                    xtype: 'autocompleteComboBox',
                    name:'label',
                    fieldLabel: getText('Name'),
                    id: 'propertyNameGridFilter',
                    width: '100%',
                    flex: 1,
                    store: this.propertiesStore,
                    displayField: 'label',
                    valueField: 'label',
                    queryParam: false
                }, {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        padding: '0 0 10 0',
                        width: '100%'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: getText('Type'),
                            id: 'propertyTypeGridFilter',
                            flex: 1,
                            store: ['STRING', 'LIST', 'BOOLEAN', 'DATE', 'DATETIME', 'TIME', 'FLOAT', 'INT']
                        }, {
                            xtype: 'combo',
                            fieldLabel: getText('Configuration'),
                            id: 'propertyConfigGridFilter',
                            flex: 1,
                            store: ['MATERIAL', 'PRODUCTREFERENCE', 'USER', 'LOCATION'],
                            hidden: this.type ? true : false
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
                    anchor: '100%',
                    labelSeparator: getText(':')
                },
                items: [
                    filterFieldsPanel,
                    filterButtonsPanel,
                    propertyGridPanel
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Select'),
                action: 'selectProperties',
                listeners: {
                    scope: this,
                    click: function (me, e, eOpts) {
                        this.parentController.onSelectPropertiesToDelete(me);
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
        var propertyNameGridFilter = Ext.getCmp('propertyNameGridFilter');
        var propertyTypeGridFilter = Ext.getCmp('propertyTypeGridFilter');
        var propertyConfigGridFilter = Ext.getCmp('propertyConfigGridFilter');

        if (propertyNameGridFilter) {
            propertyNameGridFilter.setValue(null);
        }
        if (propertyTypeGridFilter) {
            propertyTypeGridFilter.setValue(null);
        }
        if (propertyConfigGridFilter) {
            propertyConfigGridFilter.setValue(null);
        }
    },

    updateDataStore: function (sender) {
        var filterList = [];

        var propertyNameGridFilter = Ext.getCmp('propertyNameGridFilter');
        if (propertyNameGridFilter && propertyNameGridFilter.value) {
            var valueString = propertyNameGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'label',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

        var propertyTypeGridFilter = Ext.getCmp('propertyTypeGridFilter');
        if (propertyTypeGridFilter && propertyTypeGridFilter.value) {
            var valueString = propertyTypeGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'type',
                    value: valueString,
                    type: 'ENUM',
                    comparison: 'EQ'
                });
            }
        }

        var propertyConfigGridFilter = Ext.getCmp('propertyConfigGridFilter');
        if (propertyConfigGridFilter && propertyConfigGridFilter.value) {
            var valueString = propertyConfigGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'propertyConfigurationType',
                    value: valueString,
                    type: 'ENUM',
                    comparison: 'EQ'
                });
            }
        }

        var win = sender.up('window');
        var grid = win.down('propertyGridPanel');

        grid.setFilters(filterList);
    }
});