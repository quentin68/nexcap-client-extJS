/*  global Ext */

Ext.define('Dashboard.view.shared.property.TextFieldForm',{
    extend: 'Ext.panel.Panel',
    xtype : 'textFieldForm',
    
    require: 'Ux.TextField',
    
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
                anchor: '100%',
                allowBlank: false,
                maxLength: 255
            },{
                xtype: 'textarea',
                fieldLabel: getText('Description'),
                reference: 'description',
                name: 'description',
                anchor: '100%',
                maxLength: 1024
            },{
                xtype: 'numberfield',
                fieldLabel: getText('Width'),
                reference: 'width',
                name: 'width',
                allowDecimals: false,
                value: 300,
                maxValue: 600,
                minValue: 90
            },{
                xtype: 'numberfield',
                fieldLabel: getText('Min chars'),
                reference: 'minLength',
                name: 'minLength',
                value: 1,
                maxValue: 1024,
                minValue: 1,
                validator: function (value) {
                    var minValue = parseInt(value, 10);

                    var maxValItem = Ext.ComponentQuery.query('[name=maxLength]'); // Ext.getCmp('maxValueNumber');
                    maxValItem = maxValItem[maxValItem.length - 1];

                    var maxValue = parseInt(maxValItem.getRawValue(), 10);
                    // No problem with bounderies 
                    if (isNaN(maxValue) || isNaN(minValue)) {
                        return true;
                    }
                    return (maxValue >= minValue) ? true : getText('Min value can\'t be greater than Max value');
                }
            },{
                xtype: 'numberfield',
                fieldLabel: getText('Max chars'),
                reference: 'maxLength',
                name: 'maxLength',
                value: 50,
                maxValue: 1024,
                minValue: 1,
                validator: function (value) {
                    var maxValue = parseInt(value, 10);

                    var minValItem = Ext.ComponentQuery.query('[name=minLength]');
                    minValItem = minValItem[minValItem.length - 1];
                    var minValue = parseInt(minValItem.getRawValue(), 10);

                    // No problem with bounderies
                    if (isNaN(maxValue) || isNaN(minValue)) {
                        return true;
                    }
                    return (maxValue >= minValue) ? true : getText('Min value can\'t be greater than Max value');
                }
            },{
                xtype: 'checkbox',
                fieldLabel: getText('Alphanumeric'),
                reference: 'alphanumeric',
                name: 'alphanumeric'
            }
        ];
    
        this.callParent(arguments);

    },
    
    
    buildField: function(data, control){
        
        var field = this.buildFormField(data, control);
        
        field.items[0].xtype = 'ux-textfield';
        field.items[0].fieldLabel = data.label? data.label : 'Label';
        
        return field;
    },
    
    
    buildFormField: function(data, control, value){
        var configuration = control.field;
        
        var required = false;
        var isEditable = true;
                        
        try{
            required = control.configuration.required;
            isEditable = control.configuration.isEditable; 
        }catch(ex){
            // 
        }

        if (!isEditable) {
            required = false;
        }
        
        if(configuration.width === 0){
            configuration.width = '100%';
        }
        
        var regEx = null;
        if(configuration.alphanumeric){
            regEx = new RegExp(/[A-Za-z0-9]/);
        }
                
        var field = {
            xtype: 'container',
            defaults: {
                submitValue: false,
                labelSeparator: getText(':'),
                margin: 0,
                labelWidth: 112
            },
            items:[
                {
                    xtype: 'textfield',
                    tag: 'property',
                    name: data.name,
                    fieldLabel: data.label? data.label : data.name,
                    width: configuration.width,
                    minLength: configuration.minLength,
                    maxLength: configuration.maxLength,
                    maskRe: regEx,
                    allowBlank: !required,
                    editable: isEditable,
                    disabled: !isEditable,
                    labelStyle: 'word-wrap: break-word;',
                    value: value
                }
            ]
        };
        
        if(configuration.description){
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
    
    
    getData: function(){
        
        var vtype = null;
        
        var field = {
            fieldType: 'textfield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            minLength: this.lookupReference('minLength').value,
            maxLength: this.lookupReference('maxLength').value,
            width: this.lookupReference('width').value,
            alphanumeric: this.lookupReference('alphanumeric').checked,
            dataType: 'STRING',
            vtype: vtype
        };
        
        return field;
    },
    
    
    setData: function(field){
        
        this.up('form').getForm().setValues(field);

    }
    
});