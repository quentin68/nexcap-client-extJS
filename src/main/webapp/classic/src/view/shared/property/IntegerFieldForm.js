Ext.define('Dashboard.view.shared.property.IntegerFieldForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'integerFieldForm',

    require: 'Ux.NumberField',

    tag: 'field',
    referenceHolder: true,
    width: '100%',
    layout: 'anchor',

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
            validator: function (value) {
                var minValue = parseInt(value, 10);
                
                var maxValItem = Ext.ComponentQuery.query('[name=maxValue]'); // Ext.getCmp('maxValueNumber');
                maxValItem = maxValItem[maxValItem.length - 1];
                
                var maxValue = parseInt(maxValItem.getRawValue(), 10);
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
                var maxValue = parseInt(value, 10);
                
                var minValItem = Ext.ComponentQuery.query('[name=minValue]');
                minValItem = minValItem[minValItem.length - 1];
                var minValue = parseInt(minValItem.getRawValue(), 10);
                
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
            value: '1',
            allowDecimals: false
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
                    allowDecimals: false,
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
            fieldType: 'integerfield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            width: this.lookupReference('width').value,
            minValue: this.lookupReference('minValue').value,
            maxValue: this.lookupReference('maxValue').value,
            step: this.lookupReference('step').value,
            dataType: 'INT',
            vtype: vtype
        };

        return field;
    },

    setData: function (field) {

        this.up('form').getForm().setValues(field);

    }

});