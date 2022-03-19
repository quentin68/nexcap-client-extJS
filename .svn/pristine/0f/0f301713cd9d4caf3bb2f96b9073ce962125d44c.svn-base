/* global Ext */

Ext.define('Dashboard.view.settings.notifMailConfig.CreateColumn', {
    extend: 'Ext.window.Window',
    xtype: 'columnCreate',
    requires: ['Dashboard.tool.Utilities'],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',

    controller: 'notifMailConfigMain',
    modelProperties: null,
    mainController: null,

    selectedModel: null,
    selectedModelLabel: null,

    config: {
        
        // TODO filter remote properties by feature
        propertiesStore: Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: false
        }),

        localPropertiesStore: Ext.create('Dashboard.store.properties.LocalProperties', {
            autoload : false
        }),

        modelsStore: null
    },

    initComponent: function () {
        this.title = getText('Column configuration');

        this.getPropertiesStore().on('load', this.onPropertiesLoaded, this);

        this.setModelsStore(
            Ext.create('Ext.data.Store', {
                fields: ['name', 'label', 'technicalName'],
                data: [
                    {
                        name: 'material',
                        label: getText('Items')
                    }, {
                        name: 'productreference',
                        label: getText('References')
                    }, {
                        name: 'productcategory',
                        label: getText('Categories')
                    }, {
                        name: 'alert',
                        label: getText('Alerts')
                    }, {
                        name: 'opborrowing',
                        label: getText('Borrowings')
                    }
                ]
            })
        );
        
        var newColumn = {
            xtype: 'panel',
            title: getText('Columns'),
            reference: 'newColumn',
            iconCls: 'fa fa-info',
            defaults: {
                labelWidth: 150,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'ux-combo',
                    name: 'model',
                    fieldLabel: getText('Object'),
                    store: this.getModelsStore(),
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'name',
                    editable: true,
                    allowBlank: false,
                    forceSelection: true,
                    listeners: {
                        'select': this.onColumnModelSelected
                    }
                }, {
                    xtype: 'ux-combo',
                    name: 'property',
                    fieldLabel: getText('Property'),
                    store: this.getLocalPropertiesStore(),
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'name',
                    editable: true,
                    allowBlank: false,
                    forceSelection: true,
                    listeners: {
                        render: function(me){
                            var modelCombo = me.up('form').down('ux-combo[name=model]');
                            if(!modelCombo.getSelectedRecord()){
                                me.getStore().removeAll();
                            }
                        },
                        'select': this.onColumnPropertySelected
                    }
                }
            ]
        };

        var configuration = {
            xtype: 'panel',
            title: getText('Configuration'),
            iconCls: 'fa fa-cog',
            reference: 'fieldFormContainer',
            items: []
        };

        var form = {
            xtype: 'panel',
            border: false,
            flex: 1,
            height: '100%',
            bodyPadding: '0 0 24 0',
            scrollable: 'y',

            defaults: {
                width: '100%',
                ui: 'property-create',
                minHeight: 80,
                bodyPadding: '24',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            items: [newColumn, configuration]
        };

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'form',
                    border: false,
                    width: 500, // 950,
                    height: 350, // 600,
                    layout: 'hbox',

                    items: [form],

                    buttons: [{
                            text: getText('Add'),
                            disabled: false,
                            handler: 'onAddNewColumnEntry'
                        }, {
                            text: getText('Cancel'),
                            scope: this,
                            handler: this.close
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    },

    onColumnModelSelected: function (combo) {       
        
        var window = this.up('window');
        var record = combo.getSelection();
        var modelName = record.data.name;
        if (!modelName) {
            return;
        }

        // Fill props
        window.selectedModel = modelName;
        window.selectedModelLabel = record.data.label;
        
        window.modelProperties = window.mainController.getModelPropertiesByName(modelName);
        window.addStaticProperties(window.modelProperties);

        //add filters
        if (modelName === 'material' || modelName === 'productreference') {
            window.getPropertiesStore().load();
        }
    },

    onColumnPropertySelected: function (combo) {
        var record = combo.getSelection();
        var window = this.up('window');
        window.displayFieldForm(record);
    },

    addStaticProperties: function (properties) {
        
        this.getLocalPropertiesStore().removeAll();
        this.down('ux-combo[name=property]').setValue(null);

        // STATIC
        for (var i = 0; i < properties.length; i++) {
            var property = properties[i];
            if (!property || !property.filterOnly) {
                try {
                    this.getLocalPropertiesStore().add(property);
                } catch (ex) {
                    console.warn(ex);
                }
            }
        }
    },

    onPropertiesLoaded: function () {
        // DYNAMIC 
        var currentFeatureName = this.selectedModel;
        
        if (currentFeatureName === 'material' || currentFeatureName === 'productreference') {
            var records = this.getPropertiesStore().getRange();
            if (records.length > 0) {
                for (var j = 0; j < records.length; j++) {
                    var property = records[j];
                    if ((currentFeatureName === 'productreference')
                            && property.data.propertyConfigurationType !== 'PRODUCTREFERENCE') {
                        continue;
                    }

                    if ((currentFeatureName === 'material')
                            && property.data.propertyConfigurationType !== 'MATERIAL') {
                        continue;
                    }

                    this.getLocalPropertiesStore().add(property);
                }
            }
        }
    },

    displayFieldForm: function (record) {
        // cleaning
        var container = this.lookupReference('fieldFormContainer');
        container.removeAll();

        var propertyValueType = record.data.type;
        if (propertyValueType === undefined) {
            Dashboard.tool.Utilities.error('[Dashboard.view.shared.filtering.CreateController.displayFieldForm] problem with property named=' + record.name
                    + ' (check property configuration, probably dynamic property not yet configured in web client)');
            Ext.Msg.alert(getText('Error'), getText('Error occured with filter, check property configuration!'));
            return;
        }

        var formComponent = {

            xtype: 'panel',
            tag: 'field',
            referenceHolder: true,
            // width: '100%',
            layout: 'anchor',
            items: [{
                    xtype: 'textfield',
                    name: 'label',
                    reference: 'label',
                    fieldLabel: getText('Label'),
                    anchor: '100%',
                    value: record.data.label,
                    allowBlank: true
                }, {
                    xtype: 'numberfield',
                    fieldLabel: getText('Width'),
                    reference: 'width',
                    name: 'width',
                    value: 200,
                    maxValue: 1000,
                    minValue: 30,
                    hidden: true // For now
                }]
        };

        if (formComponent) {
            container.add(formComponent);
        }
    },

    /**
     * Method used by the controller to get values
     * 
     * @return (object) filter
     */
    getData: function () {
        
        var values = this.down('form').getValues();
        var label = this.down('combo[name=property]').getRawValue();
        var property = this.down('combo[name=property]').getSelection();

        if (values.label) {
            label = values.label;
        }

        var field = {};
        if (property.data !== undefined) {
            field.label = property.data.label;
            field.fieldLabel = this.selectedModelLabel;
            field.model = this.selectedModel;
        }

        var data = {
            name: values.property,
            label: label,
            configuration: {
                width: values.width,
                field: field
            }
        };

        if (property.data.propertyConfigurationType !== undefined) {
            data.isDynamicProperty = true;
        }
        
        return data;
    }

});