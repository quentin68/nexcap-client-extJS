/*  global Ext  */

Ext.define('Dashboard.view.system.dynamicProperties.ComputedCreate', {
    extend: 'Ext.window.Window',
    xtype: 'dynamicPropertiesComputedCreate',
    tag: 'createProperty',

    requires: [
        'Dashboard.tool.Utilities', 'Dashboard.view.shared.property.TextFieldForm', 'Dashboard.view.shared.property.TextAreaForm', 'Dashboard.view.shared.property.NumberFieldForm',
        'Dashboard.view.shared.property.DateFieldForm', 'Dashboard.view.shared.property.TimeFieldForm', 'Dashboard.view.shared.property.DateTimeFieldForm',
        'Dashboard.view.shared.property.ComboBoxForm', 'Dashboard.view.shared.property.CheckBoxForm', 'Dashboard.view.shared.property.RadioGroupForm',
        'Dashboard.view.shared.property.TagFieldForm', 'Dashboard.view.shared.property.IntegerFieldForm','Dashboard.view.shared.property.TelemetryFieldForm',
        'Dashboard.store.properties.PropertiesByProcessor'
    ],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',
    iconCls: 'fa fa-cube',

    controller: 'dynamicPropertiesComputedCreate',
    mainController: null,
    parentController: null,
    isSensorAdmin: null,

    typeOfValidation: null, // valorization : [ITEM | PRODUCT_REFERENCE | ALL]
    owner: null, //  [PRODUCT_REFERENCE | PRODUCT_CATEGORY | NONE]
    
    initComponent: function (){
        this.title = getText('Create new property');
        this.subtitle = getText('property');
        
        this.isSensorAdmin = Dashboard.manager.FeaturesManager.isEnabled('SENSOR_ADMIN');
                        
        this.valorisationStore = Ext.create('Dashboard.store.enums.Valorisation');
        
        this.propertiesStore = Ext.create('Dashboard.store.properties.PropertiesByProcessor');
        
        this.processorsStore = Ext.create('Dashboard.store.system.Processors');

        var charasteristics = {
            xtype: 'panel',
            title: getText('Computed property'),
            reference: 'characteristics',
            iconCls: 'fa fa-info',
            defaults: {
                labelSeparator: getText(':')
            },
            items: [
                {
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
                    //queryMode: 'local',
                    displayField: 'localizedLabel',
                    valueField: 'name',
                    editable: true,
                    allowBlank: false,
                    forceSelection: true,
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

                            this.displaySelector(record);

                        }
                    }
                }, {
                    xtype: 'container',
                    reference: 'modelSelector',
                    items: []
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'processor',
                    width: '100%',
                    fieldLabel: getText('Processor'),
                    store: this.processorsStore,
                    queryMode: false,
                    displayField: 'name',
                    valueField: 'id',
                    editable: true,
                    allowBlank: true,
                    forceSelection: true,
                    hidden: false,
                    listeners: {
                        scope: this,
                        'select': 'onProcessorSelected'
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'propertySource',
                    width: '100%',
                    fieldLabel: getText('Property source'),
                    store: this.propertiesStore,
                    queryParam: false,
                    displayField: 'label', //name
                    valueField: 'id',
                    editable: true,
                    allowBlank: false,
                    forceSelection: true,
                    hidden: true
                }, {
                    xtype: 'checkbox',
                    name: 'postComputing',
                    fieldLabel: getText('Calculated during the display'),
                    checked: false,
                    allowBlank: false,
                    labelStyle: 'word-wrap: break-word;',
                    hidden: true
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
            hidden: false,//this.isSensorAdmin,
            defaults: {
                xtype: 'checkbox',
                checked: true,
                inputValue: true
            },
            items: [
//                {
//                    boxLabel: getText('Editable'),
//                    name: 'isEditable',
//                    reference: 'isEditable'
//                }, 
                {
                    boxLabel: getText('Displayed on devices'),
                    name: 'isDisplayed',
                    reference: 'isDisplayed'
                }, 
//                {
//                    boxLabel: getText('Required'),
//                    name: 'required',
//                    reference: 'required',
//                    checked: false
//                }, 
                {
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
            // bodyPadding : 24,
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
            ],
            listeners :{
                render: 'selectFieldType'
            }
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
    
    
    onProcessorSelected: function(sender){
                
        var postData = {
            "propertyConfigurationType": null,// "MATERIAL",
            "owner": {
                "id": null, //1,
                "ownerType": null // "PRODUCT_CATEGORY"
            }
        };

        // refresh form
        
        var dataType = sender.getSelectedRecord().data.resultType;
        this.getController().selectFieldType(dataType);
        
        var formLabel = this.down('textfield[reference=fieldLabel]');
        var formDescription = this.down('textarea[reference=description]');
        
        formLabel.setValue(sender.getSelectedRecord().data.name);
        formDescription.setValue(sender.getSelectedRecord().data.description);
        
        // Fill post Data
        var propertyConfigurationTypeCombo = this.down('combo[reference=valorisation]');
        postData.propertyConfigurationType = propertyConfigurationTypeCombo.getValue();
        
        if(postData.propertyConfigurationType === 'MATERIAL' || postData.propertyConfigurationType === 'PRODUCTREFERENCE' ){
            
            var ownerTypeCombo = this.down('combo[reference=owner]');
            postData.owner.ownerType = ownerTypeCombo.getValue();
            
            if(postData.owner.ownerType !== 'NONE'){
                var owner = this.down('combo[reference=model]').getSelection();
                postData.owner.id = owner.data.id;
            }
        }
                
        // update combo store
        
        var propertiesCombo = this.down('combo[name=propertySource]');
        var processorId = sender.getValue();
                
        this.propertiesStore = Ext.create('Dashboard.store.properties.PropertiesByProcessor',{
            listeners: {
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties/processor/' + processorId; 
                    store.getProxy().extraParams.owner = postData.owner;
                    store.getProxy().extraParams.propertyConfigurationType = postData.propertyConfigurationType;
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties/processor/';
                    store.getProxy().extraParams.owner = null;
                    store.getProxy().extraParams.propertyConfigurationType = null;
                }
            }
        });
        
        propertiesCombo.setStore(this.propertiesStore);
        
        if(owner !== 'NONE'){
            propertiesCombo.setVisible(true);
            propertiesCombo.setDisabled(false);
        }else{
            propertiesCombo.setVisible(false);
            propertiesCombo.setDisabled(true);
        }

    },
    

    displaySelector: function (record){
        
        var modelName = record.data.name;
        var targetPanel = this.down('container[reference=modelSelector]');
        targetPanel.removeAll(true); //autodestroy

        var processorCombo = this.down('combo[name=processor]');
        processorCombo.setValue(null);

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

        var organizationsStore = Ext.create('Dashboard.store.enums.OrganizationType');

        var combo = Ext.create('Ext.form.field.ComboBox', {
            reference: 'owner',
            width: '100%',
            labelSeparator: getText(':'),
            fieldLabel: getText('Owner'),
            store: organizationsStore,
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

        var processorCombo = this.down('combo[name=processor]');
        processorCombo.setValue(null);

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
                displayField = 'referenceCode';  //designation
                listConfig = {
                    getInnerTpl: function (){
                        return '<b>{referenceCode}</b>' + '</br>{designation}';
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

        values.isEditable = false;
        values.isDisplayed = this.down('checkbox[name=isDisplayed]').checked;;
        values.required = false;
        values.enabledInTables = this.down('checkbox[name=enabledInTables]').checked;
        values.enabledInDetails = this.down('checkbox[name=enabledInDetails]').checked;
        values.enabledInFilters = this.down('checkbox[name=enabledInFilters]').checked;
        values.enabledInControls = this.down('checkbox[name=enabledInControls]').checked;

        var propertyConfigurationType = this.down('combo[name=controlValorisation]').getValue();
                
        var processor = this.down('combo[name=processor]').getSelection();
        var processorName = processor.data.name;
        var processorId = processor.data.id;
        
        var resultType = processor.data.resultType;
                
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
        
        var postcomputing = this.down('checkbox[name=postComputing]').checked;
        
        var propertySource = this.down('autocompleteComboBox[name=propertySource]').getSelectedRecord();
        var propertysourcename = null;
        
        if(propertySource){
            propertysourcename = propertySource.data.name;
        }

        var propertyConf = {
            origin: 'COMPUTED',
            name: field.name,
            label: field.fieldLabel,
            type: resultType, //type,
            isEditable: values.isEditable,
            isDisplayed: values.isDisplayed,
            isSystem: false,
            propertyConfigurationType: propertyConfigurationType,
            valueList: valueList,
            options: {
                processor: processorId,//processor.toString(),
                postcomputing: postcomputing,
                propertysourcename: propertysourcename
            },
            control: {
                field: field,
                configuration: values
            }
        };

        propertyConf = this.addOwnerProperty(propertyConf);

        return propertyConf;
    },
    

    // valorisation
    addOwnerProperty: function (propertyConf){

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
            
            if (!comboOrganisation.getSelection()) {
                return propertyConf;
            }
            organisationName = comboOrganisation.getSelection().data.name;

        }else{
            organisationName = this.owner;
        }

        if (organisationName === 'PRODUCT_CATEGORY') {

            if (modelSelector.getSelection()) {
                propertyConf.owner = {
                    ownerType: 'PRODUCT_CATEGORY',
                    id: modelSelector.getSelection().data.id
                };
                return propertyConf;
            }

        } else if (organisationName === 'PRODUCT_REFERENCE') {

            if (modelSelector.getSelection()) {
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
