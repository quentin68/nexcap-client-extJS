/*  global Ext  */

Ext.define('Dashboard.view.shared.property.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'propertyEdit',
    requires: ['Dashboard.tool.Utilities', 'Dashboard.view.shared.property.TextFieldForm', 'Dashboard.view.shared.property.TextAreaForm', 'Dashboard.view.shared.property.NumberFieldForm',
        'Dashboard.view.shared.property.DateFieldForm', 'Dashboard.view.shared.property.TimeFieldForm', 'Dashboard.view.shared.property.DateTimeFieldForm',
        'Dashboard.view.shared.property.ComboBoxForm', 'Dashboard.view.shared.property.CheckBoxForm', 'Dashboard.view.shared.property.RadioGroupForm',
        'Dashboard.view.shared.property.TagFieldForm', 'Dashboard.view.shared.property.IntegerFieldForm', 'Dashboard.view.shared.property.TelemetryFieldForm'],

    autoShow: false,
    iconCls: 'fa fa-cube',
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',
    controller: 'propertyEdit',

    mainController: null,
    record: null,

    initComponent: function (){

        this.title = getText('Edit property');

        var charasteristics = {
            xtype: 'panel',
            title: getText('Characteristics'),
            reference: 'characteristics',
            iconCls: 'fa fa-info',
            defaults: {
                labelSeparator: getText(':')
            },
            items: [
                
                {
                    xtype: 'displayfield',
                    name: 'origin',
                    fieldLabel: getText('Origin'),
                    reference: 'origin',
                    width: '100%'
                }, {
                    xtype: 'displayfield',
                    name: 'fieldTypeLabel',
                    fieldLabel: getText('Field type'),
                    reference: 'fieldTypeLabel',
                    //allowBlank: false,
                    //editable: false,
                    width: '100%'
                }, {
                    xtype: 'combo',
                    name: 'fieldType',
                    width: '100%',
                    reference: 'fieldType',
                    fieldLabel: getText('Field type'),
                    store: Ext.create('Dashboard.store.properties.FieldTypes'),
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'name',
                    hidden: true,
                    allowBlank: false,
                    listeners: {
                        'select': 'onFieldTypeSelected'
                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: getText('Owners'),
                    defaultType: 'radiofield',
                    hidden: true,
                    defaults: {
                        flex: 1,
                        disabled: true
                    },
                    layout: 'hbox',
                    items: [
                        {
                            id: 'valorisationItem',
                            boxLabel: getText('Items property'),
                            name: 'valorisation',
                            reference: 'valorisationItems',
                            inputValue: 'items',
                            checked: true
                        }, {
                            id: 'valorisationRef',
                            boxLabel: getText('References property'),
                            name: 'valorisation',
                            reference: 'valorisationReferences',
                            inputValue: 'references'
                        }
                    ]
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
                
        var ifMonitoring = false;
        if(this.record){
            if(this.record.origin === 'TELEMETRY' || this.record.origin === 'COMPUTED'){
                ifMonitoring = true;
            }
        }

        var options = {
            xtype: 'panel',
            title: getText('Default options'),
            iconCls: 'fa fa-cog',
            reference: 'optionContainer',
            defaults: {
                xtype: 'checkbox',
                checked: true,
                inputValue: true
            },
            items: [
                {
                    boxLabel: getText('Editable value'),
                    name: 'isEditable',
                    reference: 'isEditable',
                    hidden: ifMonitoring
                }, {
                    boxLabel: getText('Displayed on devices'),
                    name: 'isDisplayed',
                    reference: 'isDisplayed'
                }, {
                    boxLabel: getText('Required'), // saisie obligatoire
                    name: 'required',
                    reference: 'required',
                    checked: false,
                    hidden: ifMonitoring
                }, {
                    boxLabel: getText('Usable in tables'),
                    name: 'enabledInTables',
                    reference: 'enabledInTables'
                }, {
                    boxLabel: getText('Usable in details'),
                    name: 'enabledInDetails',
                    reference: 'enabledInDetails'
                }, {
                    boxLabel: getText('Usable in filters'),
                    name: 'enabledInFilters',
                    reference: 'enabledInFilters'
                }, {
                    boxLabel: getText('Usable in controls'),
                    name: 'enabledInControls',
                    reference: 'enabledInControls'
                }
            ]
        };

        var preview = {
            xtype: 'panel',
            ui: 'property-create',
            title: getText('Preview'),
            iconCls: 'fa fa-check',
            reference: 'previewContainer',
            layout: 'center',
            flex: 1,
            height: '100%',
            bodyStyle: {
                background: '#F2F2F2', // extraLight
                padding: '24px'
            },
            items: [
                {
                    html: '<span><b>' + getText('Not configured.') + '</b></span>'
                }
            ]
        };

        var form = {
            xtype: 'panel',
            border: false,
            flex: 1,
            height: '100%',
            bodyPadding: '0 0 24 0',
            scrollable: 'y',
            fieldDefaults: {
                labelSeparator: getText(':')
            },
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
            items: [
                charasteristics, 
                configuration, 
                options
            ]
        };

        var me = this;
        Ext.apply(me, {
            items: [{
                    xtype: 'form',
                    border: false,
                    width: 950,
                    height: 600,
                    layout: 'hbox',
                    items: [
                        form, 
                        preview
                    ],
                    buttons: [
                        {
                            text: getText('Save'),
                            disabled: false,
                            handler: 'onSaveProperty'
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

    setData: function (propertyConfModel){
        
        this.record = propertyConfModel;
        var control = Dashboard.model.PropertyConfiguration.getControl(propertyConfModel);
        if (control === undefined) {
            // property from migration or system not yet configured

            var fieldTypesForPropertyType;
            if (propertyConfModel.data.type === "INT")
                fieldTypesForPropertyType = "integerfield";
            else if (propertyConfModel.data.type === "FLOAT")
                fieldTypesForPropertyType = "numberfield";
            else if (propertyConfModel.data.type === "BOOLEAN")
                fieldTypesForPropertyType = "checkbox";
            else if (propertyConfModel.data.type === "STRING")
                fieldTypesForPropertyType = "textfield";
            else if (propertyConfModel.data.type === "DATE")
                fieldTypesForPropertyType = "datefield";
            else if (propertyConfModel.data.type === "DATETIME")
                fieldTypesForPropertyType = "datetimefield";
            else if (propertyConfModel.data.type === "LIST")
                fieldTypesForPropertyType = "combobox";
            // else if (propertyConfModel.data.type === "TIME")
            // fieldTypesForPropertyType = "";

            var valorisation = propertyConfModel.data.propertyConfigurationType === 'MATERIAL' ? "items" : "references";
            
            control = {
                field: {
                    fieldType: fieldTypesForPropertyType,
                    fieldLabel: propertyConfModel.data.label,
                    dataType: propertyConfModel.data.type,
                    itemValues: propertyConfModel.data.valueList
                },
                configuration: {
                    controlType: fieldTypesForPropertyType,
                    valorisation: valorisation,
                    isEditable: propertyConfModel.data.isEditable,
                    isDisplayed: propertyConfModel.data.isDisplayed
                }
            };

        }
        var field = control.field;
        var conf = control.configuration;

        this.down('form').getForm().setValues(conf);
        
        this.lookupReference('fieldType').setValue(field.fieldType); // hidden

        var origin = getText('Not any', 'feminine');
        
        if(this.record.data.origin === 'TELEMETRY'){
            origin = getText('Telemetry');
        }else if(this.record.data.origin === 'COMPUTED'){
            origin = getText('Computed');
            
        }
        
        var fieldsStore = Ext.create('Dashboard.store.properties.FieldTypes');
        var record = fieldsStore.findRecord('name', field.fieldType);
        this.lookupReference('fieldTypeLabel').setValue(record.data.label);
        this.lookupReference('origin').setValue(origin);

        if (propertyConfModel.data.propertyConfigurationType === 'MATERIAL') {
            this.lookupReference('valorisationItems').setValue(true);
            this.lookupReference('characteristics').setTitle(getText('Edit an item property'));

        } else if (propertyConfModel.data.propertyConfigurationType === 'PRODUCTREFERENCE') {
            this.lookupReference('valorisationReferences').setValue(true);
            this.lookupReference('characteristics').setTitle(getText('Edit a reference property'));
        }

        this.getController().onFieldTypeSelected(this.down('combo[name=fieldType]'), field);

        // block values and fieldType in case of system property
        this.down('combo[name=fieldType]').disabled = propertyConfModel.data.isSystem;
    },

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data
     */
    getData: function (){
        var values = this.down('form').getValues();
        var field = this.down('panel[tag=field]').getData();
        
        if(this.record.origin === 'TELEMETRY' || this.record.origin === 'COMPUTED'){
            values.isEditable = false;
            values.required = false;
        }else{
            values.isEditable = this.down('checkbox[name=isEditable]').checked;
            values.required = this.down('checkbox[name=required]').checked;
        }
        
        values.isDisplayed = this.down('checkbox[name=isDisplayed]').checked;
        values.enabledInTables = this.down('checkbox[name=enabledInTables]').checked;
        values.enabledInDetails = this.down('checkbox[name=enabledInDetails]').checked;
        values.enabledInFilters = this.down('checkbox[name=enabledInFilters]').checked;
        values.enabledInControls = this.down('checkbox[name=enabledInControls]').checked;

        var propertyConfigurationType = null;
        if (Ext.getCmp('valorisationItem').getValue()) {
            propertyConfigurationType = "MATERIAL";
        } else if (Ext.getCmp('valorisationRef').getValue()) {
            propertyConfigurationType = "PRODUCTREFERENCE";
        }

        var valueList = [];
        var type = field.dataType;
        if (field.fieldType === "combobox" || field.fieldType === "radio") {
            // Remove trailing spaces
            valueList = [];
            field.itemValues.forEach(function(value){
               valueList.push(value.trim()); 
            });
            var type = 'LIST';
        }
        
        var origin = null;
        var options = null;
        
        if(this.record.data.origin){
            origin = this.record.data.origin;
        }
        
        if(this.record.data.options){
            options = this.record.data.options;
        }

        var propertyConf = {
            id: this.record.data.id,
            name: this.record.data.name,
            label: field.fieldLabel,
            type: type,
            isEditable: values.isEditable,
            isDisplayed: values.isDisplayed,
            isSystem: this.record.data.isSystem,
            propertyConfigurationType: propertyConfigurationType,
            valueList: valueList,
            origin: origin,
            options: options,
            control: {
                field: field,
                configuration: values
            }
        };
        return propertyConf;
    }
});
