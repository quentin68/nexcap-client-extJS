/*  global Ext */

Ext.define('Dashboard.view.shared.property.TextAreaForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'textAreaForm',

    require: 'Ux.TextAreaField',

    tag: 'field',
    referenceHolder: true,
    width: '100%',
    layout: 'anchor',

    listeners: {
        render: 'onFormRender'
    },

    initComponent: function (){

        this.defaults = {
            anchor: '100%',
            submitValue: false,
            allowBlank: true,
            labelSeparator: getText(':'),
            listeners: {
                change: 'onFormChange'
            }
        },
                this.items = [
                    {
                        xtype: 'textfield',
                        fieldLabel: getText('Label'),
                        reference: 'fieldLabel',
                        name: 'fieldLabel',
                        allowBlank: false,
                        maxLength: 255
                    }, {
                        xtype: 'textarea',
                        fieldLabel: getText('Description'),
                        reference: 'description',
                        name: 'description',
                        anchor: '100%',
                        maxLength: 1024
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: getText('Width'),
                        reference: 'width',
                        name: 'width',
                        value: 400,
                        maxValue: 800,
                        minValue: 90
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: getText('Height'),
                        reference: 'height',
                        name: 'height',
                        value: 250,
                        maxValue: 600,
                        minValue: 90
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: getText('Min chars'),
                        reference: 'minLength',
                        name: 'minLength',
                        value: 0,
                        maxValue: 10000,
                        minValue: 0
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: getText('Max chars'),
                        reference: 'maxLength',
                        name: 'maxLength',
                        value: 2048,
                        maxValue: 10000,
                        minValue: 50
                    }
                ];

        this.callParent(arguments);

    },

    buildField: function (data, control){

        var field = this.buildFormField(data, control);

        field.items[0].xtype = 'ux-textareafield';
        field.items[0].fieldLabel = data.label ? data.label : 'Label';

        return field;
    },

    buildFormField: function (data, control, value){

        var configuration = control.field;
        
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

        if (configuration.width === 0) {
            configuration.width = '100%';
        }

        var field = {
            xtype: 'container',
            defaults: {
                submitValue: false,
                margin: 0,
                labelSeparator: getText(':'),
                labelWidth: 112
            },
            items: [
                {
                    xtype: 'textareafield',
                    tag: 'property',
                    name: data.name,
                    fieldLabel: data.label ? data.label : data.name,
                    width: configuration.width,
                    height: configuration.height,
                    minLength: configuration.minLength,
                    maxLength: configuration.maxLength,
                    labelAlign: 'top',
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

    getData: function (){

        var vtype = null;

        var field = {
            fieldType: 'textareafield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            minLength: this.lookupReference('minLength').value,
            maxLength: this.lookupReference('maxLength').value,
            width: this.lookupReference('width').value,
            height: this.lookupReference('height').value,
            dataType: 'STRING',
            vtype: vtype
        };

        return field;
    },

    setData: function (field){

        this.up('form').getForm().setValues(field);

    }

});