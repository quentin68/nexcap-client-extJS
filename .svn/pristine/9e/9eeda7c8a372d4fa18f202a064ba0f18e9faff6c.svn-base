/* global Ext */

Ext.define('Dashboard.view.administration.material.SelectorToDelete', {
    extend: 'Ext.window.Window',
    xtype: 'materialSelectorToDelete',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.material.GridPanelContext'
    ],

    iconCls: 'fa fa-tag',
    closable: false,
    closeAction: 'destroy',
    resizable: true,
    modal: true,
    record: [],
    constrain: true,
    type: null,

    parentController: null,

    width: 800,
    height: 600,
    minWidth: 640,
    minHeight: 480,
    layout: 'border',

    typeOfValidation: null,
    materialStore: null,
    categoriesStore: null,

    initComponent: function () {

        this.title = getText('Select an item to delete');

        this.fieldDefaults ={
            labelWidth: 112,
            anchor: '100%',
            labelSeparator: getText(':')
        };

        var gridPanel = Ext.create('Dashboard.view.administration.material.GridPanelContext',{
            conID: this.conID
        });

        this.materialStore = Ext.create('Dashboard.store.Materials', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().extraParams.filter = [];
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        this.categoriesStore = Ext.create('Dashboard.store.Categories', {
            autoLoad: true
        });

        this.refrencesForMaterialsStore = Ext.create('Dashboard.store.References', {
            autoLoad: false,
            listeners : {
                beforeload: function (store, filters, eOpts){
                    var myFilter = {
                        property: 'identified',
                        value: true,
                        type: 'BOOLEAN',
                        comparison: 'EQ'
                    };
                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load : function (store) {
                    if (store.getProxy().extraParams.filter !== undefined) {
                        delete store.getProxy().extraParams['filter'];
                    }
                }
            }
        });

        var filterButtonsPanel = {
            xtype: 'panel',
            width: '100%',
            bodyPadding: '12 6 12 12',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            defaults: {
                xtype: 'button',
                width: 80
            },
            items: [
                {
                    text: getText('Reset'),
                    margin: '0 8 0 0',
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
            width: '100%',
            layout: 'vbox',
            region: 'north',
            bodyPadding: 16,
            items: [
                {
                    xtype: 'panel',
                    width :'100%',
                    layout: {
                        type: 'hbox',
                        padding: '0 0 10 0'
                    },
                    items: [
//                        {
//                            xtype: 'textfield',
//                            fieldLabel: getText('Name'),
//                            id: 'materialNameGridFilter',
//                            flex: 1
//                        },
                        {
                            xtype: 'autocompleteComboBox',
                            fieldLabel: getText('Name'),
                            id: 'materialNameGridFilter',
                            flex: 1,
                            queryParam: false,
                            matchFieldWidth: false,
                            store: this.materialStore,
                            displayField: 'name',
                            valueField: 'name',
                            allowBlank: true
                        },
                        {
                            xtype: 'autocompleteComboBox',
                            id: 'materialRefeCodeGridFilter',
                            fieldLabel: getText('Reference code'),
                            displayField: 'referenceCode',
                            valueField: 'referenceCode',
                            allowBlank: true,
                            queryParam: false,
                            matchFieldWidth: false,
                            store: this.refrencesForMaterialsStore,
                            flex: 1,
                            margin: '0 0 0 10'
                        }
//                        {
//                            xtype: 'textfield',
//                            fieldLabel: getText('Ref. code'),
//                            id: 'materialRefeCodeGridFilter',
//                            flex: 1,
//                            margin: '0 0 0 10'
//                        }
                    ]
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'stretch'
                    },
                    items: [
//                        {
//                            xtype: 'textfield',
//                            fieldLabel: getText('Ref. designation'),
//                            id: 'materialRefeDesignationGridFilter',
//                            flex: 1
//                        },
                        {
                            xtype: 'autocompleteComboBox',
                            id: 'materialRefeDesignationGridFilter',
                            fieldLabel: getText('Designation'),
                            displayField: 'designation',
                            valueField: 'designation',
                            allowBlank: true,
                            queryParam: false,
                            matchFieldWidth: false,
                            store: this.refrencesForMaterialsStore,
                            flex: 1
                        }, {
                            xtype: 'autocompleteComboBox',
                            id: 'materialCategoryGridFilter',
                            name: 'productCategoryId',
                            reference: 'productCategoryId',
                            fieldLabel: getText('Category'),
                            displayField: 'name',
                            valueField: 'id',
                            allowBlank: true,
                            queryParam: false,
                            matchFieldWidth: false,
                            store: this.categoriesStore,
                            flex: 1,
                            margin: '0 0 0 10',
                            listeners: {
                                beforequery: function (qe) {
                                    qe.combo.tpl = '<tpl for="."><div class="x-boundlist-item">{path}/<b>{name}</b></div></tpl>';
                                }
                            }
                        }
                    ]
                },
                filterButtonsPanel
            ]
        };

        this.items = [
            filterFieldsPanel,
            {
                xtype: 'panel',
                bodyPadding: 16,
                region: 'center',
                layout: 'fit',
                items: [
                    gridPanel
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Select'),
                action: 'selectMaterial',
                listeners: {
                    scope: this,
                    click: function (me, e, eOpts) {
                        this.parentController.onSelectMaterialToDelete(me);
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
        var materialNameGridFilter = Ext.getCmp('materialNameGridFilter');
        var materialRefeCodeGridFilter = Ext.getCmp('materialRefeCodeGridFilter');
        var materialRefeDesignationGridFilter = Ext.getCmp('materialRefeDesignationGridFilter');
        var materialCategoryGridFilter = Ext.getCmp('materialCategoryGridFilter');

        if (materialNameGridFilter) {
            materialNameGridFilter.setValue(null);
        }
        if (materialRefeCodeGridFilter) {
            materialRefeCodeGridFilter.setValue(null);
        }
        if (materialRefeDesignationGridFilter) {
            materialRefeDesignationGridFilter.setValue(null);
        }
        if (materialCategoryGridFilter) {
            materialCategoryGridFilter.setValue(null);
        }
    },

    updateDataStore: function (sender) {
        var filterList = [];

        var materialNameGridFilter = Ext.getCmp('materialNameGridFilter');
        if (materialNameGridFilter && materialNameGridFilter.value) {
            var valueString = materialNameGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'name',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

        var materialRefeCodeGridFilter = Ext.getCmp('materialRefeCodeGridFilter');
        if (materialRefeCodeGridFilter && materialRefeCodeGridFilter.value) {
            var valueString = materialRefeCodeGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'productReference.referenceCode',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

        var materialRefeDesignationGridFilter = Ext.getCmp('materialRefeDesignationGridFilter');
        if (materialRefeDesignationGridFilter && materialRefeDesignationGridFilter.value) {
            var valueString = materialRefeDesignationGridFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'productReference.designation',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

        var materialCategoryGridFilter = Ext.getCmp('materialCategoryGridFilter');
        if (materialCategoryGridFilter && materialCategoryGridFilter.value) {
            var valueString = materialCategoryGridFilter.value;
            if (valueString) {
                filterList.push({
                    property: 'productReference.productCategory.id',
                    value: valueString,
                    type: 'LONG',
                    comparison: 'EQ'
                });
            }
        }

        var win = sender.up('window');
        var grid = win.down('materialGridPanel');

        grid.setFilters(filterList);
    }
});