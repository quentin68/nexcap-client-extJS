
/* global Ext  */

Ext.define('Dashboard.view.shared.filtering.Create', {
    extend: 'Ext.window.Window',
    xtype: 'filteringCreate',
    requires: ['Dashboard.tool.Utilities'],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',

    controller: 'filteringCreate',
    mainController: null,
    modelProperties: null, // ex: material.name material.location.address

    config: {
        // TODO filter remote properties by feature
        propertiesStore: Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: false
        }),
        localPropertiesStore: Ext.create('Dashboard.store.properties.LocalProperties')
    },

    initComponent: function (){

        this.title = getText('Create new filter');

        // var currentFeature = Dashboard.manager.FeaturesManager.currentFeature;

        this.getPropertiesStore().on('load', this.onPropertiesLoaded, this);
        this.getPropertiesStore().load();

        var newFilter = {
            xtype: 'panel',
            title: getText('New filter'),
            reference: 'newFilter',
            iconCls: 'fa fa-info',
            items: [
                {
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
                        'select': 'onPropertySelected'
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
            xtype: 'form',
            reference: 'form',
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
            items: [
                newFilter, 
                configuration
            ]
        };

        var me = this;
        Ext.apply(me, {

            items: [{
                    xtype: 'panel',
                    border: false,
                    width: 500,// 950,
                    height: 350,// 600,
                    layout: 'hbox',

                    items: [form],

                    buttons: [
                        {
                            text: getText('Add'),
                            disabled: false,
                            handler: 'onAddNewFilter'
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

    onPropertiesLoaded: function (){

        this.getLocalPropertiesStore().clearData();

        // Add properties from Managers (Dashboard.model.LocalProperty)
        // e.g. from MaterialManager.getProperties:
        // record.data = {
        // 	name : 'assignedLocation.address',
        // 	label : getText('Assigned location'),
        // 	type : 'STRING',
        // 	control : Ext.encode({
        // 		field : {
        // 			fieldType : 'address',
        // 			width : 400
        // 		}
        // 	})
        // }
        for (var i = 0; i < this.modelProperties.length; i++) {
            var property = this.modelProperties[i];
            if (property.control !== undefined && typeof property.control === 'string') {
                property.control = Ext.decode(property.control);
            }
            if (property.enabledInFilters === undefined || property.enabledInFilters !== false) {
                this.getLocalPropertiesStore().add(property);
            }
        }

        // Add properties from server dynamic properties (Dashboard.model.PropertyConfiguration)
        // e.g. from maxUseCount:
        // getControl() = {
        // 	"field": {
        // 		"fieldType": "integerfield",
        // 		"name": "maxUseCount",
        // 		"fieldLabel": "Nombre maximum d utilisation",
        // 		"dataType": "INT"
        // 		[...]
        // 	},
        // 	"configuration": { [...] }
        // }

        var currentFeatureName = Dashboard.manager.FeaturesManager.currentFeature.data.name;
        var FEATURES_WITH_PROPS = ['MAT_ADMIN', 'MAT_INVENTORY', 'REF_MAT_ADMIN', 'MATERIALS_SETS_INVENTORY', 'USER_ADMIN','USER_PROFILE_ADMIN', 'USER_DEVICE_ADMIN'];

        if (FEATURES_WITH_PROPS.indexOf(currentFeatureName) > -1) {

            var records = this.getPropertiesStore().getRange();
            if (records.length > 0) {
                for (var j = 0; j < records.length; j++) {
                    var property = records[j];

                    if ((currentFeatureName === 'REF_MAT_ADMIN' || currentFeatureName === 'MATERIALS_SETS_INVENTORY')
                            && property.data.propertyConfigurationType !== 'PRODUCTREFERENCE') {
                        continue;
                    }

                    if ((currentFeatureName === "MAT_ADMIN" || currentFeatureName === "MAT_INVENTORY")
                            && property.data.propertyConfigurationType !== 'MATERIAL') {
                        continue;
                    }

                    if (currentFeatureName === "USER_ADMIN" && property.data.propertyConfigurationType !== 'USER') {
                        continue;
                    }

                    // Add if valid
                    if (this.propertyIsValid(property)) {
                        
                        var enabledInFilters = true;
                        property.data.control = Dashboard.model.PropertyConfiguration.getControl(property.data);
                        if (property.data.control === undefined) {
                            // if undefined, propably property created on the server side not yet configured on the web client through Management/Cat/Ref(optionweb not defined)
                            // set to null to show alert popup when selecting this property
                            property.data.type = null;

                        } else {
                            if (property.data.control.field !== undefined && property.data.control.field.dataType !== undefined) {
                                // override property type (LIST/STRING/INT...) with property result type (no LIST -> STRING)
                                property.data.type = property.data.control.field.dataType;
                            }
                            if (property.data.control.configuration !== undefined && property.data.control.configuration.enabledInFilters !== undefined) {
                                enabledInFilters = property.data.control.configuration.enabledInFilters;
                            }
                        }
                        if (enabledInFilters !== false) {
                            this.getLocalPropertiesStore().add(property);
                        }
                    }
                }
            }
        }
    },

    propertyIsValid: function (property){
                
        // Enabled in configuration
        if (property.data.enabledInFilters === false) {
            return false;
        }
        return true;
    },

    
    getInvalidFields: function (){

        var invalidFields = [];

        Ext.suspendLayouts();

        this.down('form').getForm().getFields().filterBy(function (field){
            if (field.validate())
                return;
            invalidFields.push(field);
        });

        Ext.resumeLayouts(true);
        
        var messages = [];

        for (var i = 0; i < invalidFields.length; i++) {
            messages.push(invalidFields[i].fieldLabel + " > " + invalidFields[i].activeErrors[0]);
        }

        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });

        return invalidFields;
    },
    

    /**
     * Method used by the controller to get values
     * 
     * @return (object) filter
     */
    getData: function (){

        var values = this.down('form').getValues();
        var label = this.down('combo[name=property]').getRawValue();
        var property = this.down('combo[name=property]').getSelection();

        //newFilter

        if (values.label) {
            label = values.label;
        }

        var field = null;
        if (property.data.control !== undefined) {
            field = property.data.control.field;
        }

        if (property.data !== undefined) {
            if (field === null) {
                field = {};
            }
            field.label = property.data.label;
            field.dataType = property.data.type;
        }

        var data = {
            name: values.property,
            label: label,
            type: values.filterType,
            comparison: values.comparison,
            configuration: {
                width: values.width,
                field: field
            }
        };

        if (property.data.propertyConfigurationType !== undefined) {
            data.isDynamicProperty = true;
        }

        if (property.data.propertyConfigurationType) {
            data.configuration.propertyConfigurationType = property.data.propertyConfigurationType;
        }
        
        // filter Code
        if(this.down('combo[name=codeType]')){
            var codeType = this.down('combo[name=codeType]').getSelection();
            if(codeType){
                data.configuration.field.codeType = codeType.data.value;
            }
        }

        return data;
    }

});