/* global Ext */

Ext.define('Dashboard.view.administration.reference.EditMultiple', {
    extend: 'Ext.window.Window',
    xtype: 'referenceEditMultiple',

    requires: ['Dashboard.tool.Utilities'],

    controller: 'referenceMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'fa fa-archive',

    propertyPanelInEdition: null,
    locationsStore: null,
    ids: null,

    initComponent: function () {

        this.title = getText('Edit multiple product references');

        this.categoriesStore = Ext.create('Dashboard.store.Categories', {
            autoLoad: true
        });

        this.locationsStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'address', 'parentPosition']
        });

        var characteristicsPanel = {
            xtype: 'panel',
            bodyPadding: 20,
            ui: 'form-panel',
            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':'),
                margin: '0 0 12 0'
            },
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    name: 'productCategoryId',
                    reference: 'category',
                    fieldLabel: getText('Category'),
                    displayField: 'fullPath',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false, // to remove param "query"
                    matchFieldWidth: false,
                    store: this.categoriesStore,
                    listeners: {
                        //'select': 'onCategorySelected'
                    }
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                }]
        };

        var locationsPanel = {
            xtype: 'panel',
            title: getText('Assigned locations'),
            reference: 'locationsPanel',
            collapsible: false,
            ui: 'form-panel',
            items: [{
                    xtype: 'container',
                    reference: 'locations',
                    items: {
                        xtype: 'grid',
                        name: 'locationsGrid',
                        store: this.locationsStore,
                        multiSelect: true,
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [{
                                text: getText('Address'),
                                dataIndex: 'address',
                                flex: 1
                            }],
                        width: '100%'
                    }
                }],
            tools: [{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAddLocation'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onDeleteLocation'
                }]
        };

        this.items = [{
                xtype: 'form',
                referenceHolder: true,
                border: false,
                width: 700,
                height: 650,
                scrollable: 'y',
                defaults: {
                    xtype: 'panel',
                    ui: 'form-panel',
                    bodyPadding: 20,
                    border: false,
                    width: '100%'
                },
                fieldDefaults: {
                    labelWidth: 112,
                    width: '100%',
                    labelSeparator: getText(':'),
                    margin: '0 0 12 0'
                },
                items: [characteristicsPanel, locationsPanel]
            }];

        this.buttons = [{
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
    },

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function () {
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.ids = this.ids;

        var locationsGrid = this.down('grid[name=locationsGrid]').store.data.items;
        if (locationsGrid) {
            values.assignedLocForPositions = [];
            Ext.each(locationsGrid, function (raw) {
                values.assignedLocForPositions.push({
                    'locationId': raw.data.id,
                    'positionId': raw.data.parentPosition.id
                });
            });
        }

        return values;
    }

});
