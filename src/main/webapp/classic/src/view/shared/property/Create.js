/*  global Ext  */

Ext.define('Dashboard.view.shared.property.Create', {
    extend: 'Ext.window.Window',
    xtype: 'propertyCreate',
    tag: 'createProperty',

    requires: ['Dashboard.tool.Utilities', 'Dashboard.view.shared.property.TextFieldForm', 'Dashboard.view.shared.property.TextAreaForm', 'Dashboard.view.shared.property.NumberFieldForm',
        'Dashboard.view.shared.property.DateFieldForm', 'Dashboard.view.shared.property.TimeFieldForm', 'Dashboard.view.shared.property.DateTimeFieldForm',
        'Dashboard.view.shared.property.ComboBoxForm', 'Dashboard.view.shared.property.CheckBoxForm', 'Dashboard.view.shared.property.RadioGroupForm',
        'Dashboard.view.shared.property.TagFieldForm', 'Dashboard.view.shared.property.IntegerFieldForm', 'Dashboard.view.shared.property.TelemetryFieldForm'],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',
    iconCls: 'fa fa-cube',

    controller: 'propertyCreate',
    mainController: null,
    parentController: null,

    typeOfValidation: null, // valorization : [ITEM | PRODUCT_REFERENCE | ALL]
    owner: null, //  [PRODUCT_REFERENCE | PRODUCT_CATEGORY | NONE]
    

    initComponent: function (){
                
        this.title = getText('Create new property');
        this.subtitle = getText('property');
                
        this.fieldTypes = Ext.create('Dashboard.store.properties.FieldTypes');
        this.valorisationStore = Ext.create('Dashboard.store.enums.Valorisation');

        var charasteristics = {
            xtype: 'panel',
            title: getText('Dynamic property'),
            reference: 'characteristics',
            iconCls: 'fa fa-info',
            defaults: {
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: 'combo',
                    name: 'controlType',
                    width: '100%',
                    fieldLabel: getText('Field type'),
                    store: this.fieldTypes,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'name',
                    editable: false,
                    allowBlank: false,
                    hidden: false,
                    listeners: {
                        'select': 'onFieldTypeSelected'
                    }
                }, {
                    xtype: 'combo',
                    name: 'controlValorisation',
                    width: '100%',
                    reference: 'valorisation',
                    fieldLabel: getText('Valorisation'),
                    store: this.valorisationStore,
                    defaults: {
                        width: '100%',
                        name: 'valorisation'
                    },
                    queryMode: 'local',
                    displayField: 'localizedLabel',
                    valueField: 'name',
                    editable: true,
                    allowBlank: true,
                    forceSelection: false,
                    hidden: true,
                    listeners: {
                        scope: this,
                        render: function (me, eOpts){
                            if (this.typeOfValidation === 'ALL') {
                                me.hidden = false;
                            } else {
                                me.setValue(this.typeOfValidation);
                            }
                        },
                        select: function (combo, record, eOpts){

                            this.displaySelector(record.data.name);

                        }
                    }
                }, {
                    xtype: 'container',
                    reference: 'modelSelector',
                    items: []
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
                    reference: 'isEditable'
                }, {
                    boxLabel: getText('Displayed on devices'),
                    name: 'isDisplayed',
                    reference: 'isDisplayed'
                }, {
                    boxLabel: getText('Required'),
                    name: 'required',
                    reference: 'required',
                    checked: false
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
        
//        if(this.typeOfValidation !== 'ALL'){
//            this.displaySelector(this.typeOfValidation);
//        }
        
    },
        

    displaySelector: function (name){

        var modelName = name;
        var targetPanel = this.down('container[reference=modelSelector]');
        targetPanel.removeAll(true); //autodestroy

        switch (modelName) {
            case 'PRODUCTREFERENCE':
                this.displayOrganizationCombo();
                break;
            case 'MATERIAL':
                this.displayOrganizationCombo();
                break;
            case 'USER':
                this.addModelSelector('USER');
                break;
            case 'LOCATION':
                this.addModelSelector('LOCATION');
                break;
        }

    },

    displayOrganizationCombo: function (){

        var targetPanel = this.down('container[reference=modelSelector]');

        this.organizationsStore = Ext.create('Dashboard.store.enums.OrganizationType');

        var combo = Ext.create('Ext.form.field.ComboBox', {
            reference: 'owner',
            width: '100%',
            labelSeparator: getText(':'),
            fieldLabel: getText('Owner'),
            store: this.organizationsStore,
            queryMode: 'local',
            displayField: 'localizedLabel',
            valueField: 'name',
            editable: false,
            allowBlank: false,
            listeners: {
                scope: this,
                select: function (combo, record, eOpts){
                    this.addModelSelector(record.data.name);
                }
            }
        });

        targetPanel.removeAll(true); //autodestroy
        targetPanel.add(combo);

    },

    addModelSelector: function (selectorName){

        var targetPanel = this.down('container[reference=modelSelector]');

        var store = null;
        var fieldName = null;
        var displayField = null;
        var listConfig = null;

        switch (selectorName) {
            case 'NONE':
            
                var oldCombo = this.down('combo[reference=model]');
                if (oldCombo) {
                    oldCombo.destroy();
                }
                return;
                
            case 'PRODUCT_REFERENCE':
                store = Dashboard.manager.administration.ReferencesManager.store;
                fieldName = getText('Reference');
                displayField = 'designation';  //designation
                listConfig = {
                    getInnerTpl: function (){
                        return '<b>{designation}</b>' + '</br>{referenceCode}';
                    }
                };
                break;
            case 'PRODUCT_CATEGORY':
                store = Dashboard.manager.administration.CategoriesManager.store;
                fieldName = getText('Category');
                displayField = 'fullPath';
                break;
            case 'USER':
                return;
                break;
            case 'LOCATION':
                return;
                break;

        }

        var combo = Ext.create('Dashboard.view.shared.component.AutocompleteComboBox', {
            reference: 'model',
            width: '100%',
            labelSeparator: getText(':'),
            fieldLabel: fieldName,
            store: store,
            queryMode: 'local',
            displayField: displayField,
            valueField: 'id',
            editable: true,
            allowBlank: false,
            listConfig: listConfig
        });

        store.load();
        
        var oldCombo = this.down('combo[reference=model]');
        if (oldCombo) {
            oldCombo.destroy();
        }

        targetPanel.add(combo);

    },

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data
     */
    getData: function (){
        var values = this.down('form').getValues();
        var field = this.down('panel[tag=field]').getData();

        values.isEditable = this.down('checkbox[name=isEditable]').checked;
        // values.isDisplayed = this.down('checkbox[name=isDisplayed]').checked;
        values.required = this.down('checkbox[name=required]').checked;
        values.enabledInTables = this.down('checkbox[name=enabledInTables]').checked;
        values.enabledInDetails = this.down('checkbox[name=enabledInDetails]').checked;
        values.enabledInFilters = this.down('checkbox[name=enabledInFilters]').checked;
        values.enabledInControls = this.down('checkbox[name=enabledInControls]').checked;

        var propertyConfigurationType = this.down('combo[name=controlValorisation]').getValue();
        
        if(propertyConfigurationType === 'NONE'){
            propertyConfigurationType = null;
        }
        
        var valueList = [];
        var type = field.dataType;
        if (field.fieldType === "combobox" || field.fieldType === "radio") {
            // Remove trailing spaces
            valueList = [];
            field.itemValues.forEach(function (value){
                valueList.push(value.trim());
            });
            type = 'LIST';
        }

        var propertyConf = {
            name: field.name,
            label: field.fieldLabel,
            type: type,
            isEditable: values.isEditable,
            isDisplayed: values.isDisplayed,
            isSystem: false,
            propertyConfigurationType: propertyConfigurationType,
            valueList: valueList,
            origin: null,
            control: {
                field: field,
                configuration: values
            }
        };

        propertyConf = this.getOwnerProperty(propertyConf);

        return propertyConf;
    },


    //Path
    getOwnerProperty: function (propertyConf){
        
        var valorisationCombo = this.down('combo[name=controlValorisation]');
        
        var comboOrganisation = this.down('combo[reference=owner]');
        var modelSelector = this.down('combo[reference=model]');

        if (!valorisationCombo.getSelection()) {
            return propertyConf;
        }

        var valorisationType = valorisationCombo.getSelection().data.name;

        if (valorisationType === 'USER' || valorisationType === 'LOCATION') {
            propertyConf.propertyConfigurationType = valorisationType;
            return propertyConf;
        }

        if (valorisationType === 'MATERIAL' || valorisationType === 'PRODUCTREFERENCE') {
            propertyConf.propertyConfigurationType = valorisationType;
        } else {
            return propertyConf;
        }

        var organisationName = null;
                
        if(this.typeOfValidation === 'ALL'){
            
            if (!comboOrganisation || !comboOrganisation.getSelection()) {
                return propertyConf;
            }
            organisationName = comboOrganisation.getSelection().data.name;
            
        }else{
            organisationName = this.owner;
        }

        if (organisationName === 'PRODUCT_CATEGORY') {

            if (modelSelector && modelSelector.getSelection()) {
                propertyConf.owner = {
                    ownerType: 'PRODUCT_CATEGORY',
                    id: modelSelector.getSelection().data.id
                };
                return propertyConf;
            }

        } else if (organisationName === 'PRODUCT_REFERENCE') {

            if (modelSelector && modelSelector.getSelection()) {
                propertyConf.owner = {
                    ownerType: 'PRODUCT_REFERENCE',
                    id: modelSelector.getSelection().data.id
                };
                return propertyConf;
            }
            
        }else if (organisationName === 'NONE' || !organisationName) {
                propertyConf.owner = null;
                return propertyConf;
        }

        return propertyConf;
    }

});
