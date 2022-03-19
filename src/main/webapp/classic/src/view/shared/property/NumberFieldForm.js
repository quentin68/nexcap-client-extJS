/*  global Ext */

Ext.define('Dashboard.view.shared.property.NumberFieldForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'numberFieldForm',

    require: 'Ux.NumberField',

    tag: 'field',
    referenceHolder: true,
    width: '100%',
    layout: 'anchor',
    isFloatingPointEditable: true,

    listeners: {
        render: 'onFormRender'
    },

    initComponent: function() {
        this.defaults = {
            submitValue: false,
            allowBlank: true,
            labelSeparator : getText(':'),
            listeners: {
                change:'onFormChange'
            }
        },
        
        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: getText('Label'),
                reference: 'fieldLabel',
                name: 'fieldLabel',
                allowBlank: false,
                anchor: '100%',
                maxLength: 255
            },
            {
                xtype: 'textarea',
                fieldLabel: getText('Description'),
                reference: 'description',
                name: 'description',
                anchor: '100%',
                maxLength: 1024
            },
            {
                xtype: 'numberfield',
                fieldLabel: getText('Width'),
                reference: 'width',
                name: 'width',
                maxValue: 600,
                minValue: 30
            },
            {
                xtype: 'numberfield',
                fieldLabel: getText('Min value'),
                reference: 'minValue',
                name: 'minValue',
                scope: this,
                validator: function (value) {

                    var minValue = parseFloat(value.replace(',', '.'));
                    var maxValItem = Ext.ComponentQuery.query('[name=maxValue]')[0]; 

                    var maxValue = parseFloat(maxValItem.getRawValue().replace(',', '.'));
                    // No problem with bounderies 
                    if (isNaN(maxValue) || isNaN(minValue)) {
                        return true;
                    } 

                    return (maxValue >= minValue) ? true : getText('Min value can\'t be greater than Max value');
                }
            },
            {
                xtype: 'numberfield',
                fieldLabel: getText('Max value'),
                reference: 'maxValue',
                name: 'maxValue',

                validator: function (value) {
                    var maxValue = parseFloat(value.replace(',', '.'));
                    var minValItem = Ext.ComponentQuery.query('[name=minValue]')[0];

                    var minValue = parseFloat(minValItem.getRawValue().replace(',', '.'));
                    // No problem with bounderies
                    if (isNaN(maxValue) || isNaN(minValue)) {
                        return true;
                    }

                    return (maxValue >= minValue) ? true : getText('Min value can\'t be greater than Max value');
                }
            },
            {
                xtype: 'numberfield',
                fieldLabel: getText('Step'),
                reference: 'step',
                name: 'step',
                minValue: 0,
                value: '0,01',
                allowDecimals: true,
                decimalSeparator: ',',
                decimalPrecision: 5
            },
            {
                xtype: 'checkbox',
                fieldLabel: getText('Allow decimals'),
                reference: 'allowDecimals',
                name: 'allowDecimals',
                checked: true
            },
            {
                xtype: 'numberfield',
                fieldLabel: getText('Decimal precision'),
                reference: 'decimalPrecision',
                name: 'decimalPrecision',
                value: 2,
                minValue: 1,
                allowDecimals: false,
                editable: !this.isFloatingPointEditable
            }
        ];
    
        this.callParent(arguments);

    },

    buildField: function (data, control) {

        var field = this.buildFormField(data, control);

        field.items[0].xtype = 'ux-numberfield';
        field.items[0].fieldLabel = data.label ? data.label : 'Label';

        return field;
    },

    buildFormField: function (data, control, value) {
        var required = false;
        var isEditable = true;
        
        try{
            required = control.configuration.required;
            isEditable = control.configuration.isEditable; 
        }catch(ex){
            // 
        }

        // 01/09/2017 : Business rule (Sylvin) 
        if (!isEditable) {
            required = false;
        }

        var configuration = control.field;

        if (configuration.width === 0) {
            configuration.width = '100%';
        }

        var field = {
            xtype: 'container',
            defaults: {
                submitValue: false,
                margin: 0,
                labelSeparator : getText(':'),
                labelWidth: 112
            },
            items: [
                {
                    xtype: 'numberfield',
                    tag: 'property',
                    name: data.name,
                    fieldLabel: data.label ? data.label : data.name,
                    width: configuration.width,
                    minValue: configuration.minValue,
                    maxValue: configuration.maxValue,
                    step: configuration.step ? configuration.step : 'null',
                    decimalSeparator: ',',
                    allowDecimals: configuration.allowDecimals,
                    decimalPrecision: configuration.decimalPrecision,
                    allowBlank: !required,
                    editable: isEditable,
                    disabled: !isEditable,
                    labelStyle: 'word-wrap: break-word;',
                    value: value
                }
            ]
        };

        if (configuration.description) {
            var desc = {
                xtype: 'label',
                text: configuration.description,
                maxWidth: '100%',
                margin: '4 0 0 0',
                style: {
                    color: '#6A6D7E',
                    'font-weight': 'normal',
                    'font-size': '12px',
                    'font-style': 'italic'
                }
            };

            field.items.push(desc);
        }

        return field;
    },

    getData: function () {

        var vtype = null;

        var field = {
            fieldType: 'numberfield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            width: this.lookupReference('width').value,
            minValue: this.lookupReference('minValue').value,
            maxValue: this.lookupReference('maxValue').value,
            step: this.lookupReference('step').value,
            allowDecimals: this.lookupReference('allowDecimals').checked,
            decimalPrecision: this.lookupReference('decimalPrecision').value,
            dataType: 'FLOAT',
            vtype: vtype
        };

        return field;
    },

    setData: function (field) {
        this.up('form').getForm().setValues(field);
    }

});