/* global Ext  */

Ext.define('Dashboard.view.shared.property.CheckBoxForm',{
    extend: 'Ext.panel.Panel',
    xtype : 'checkBoxForm',
    
    require: 'Ux.CheckBox',
    
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
            anchor: '100%'
        },
        {
            xtype: 'textfield',
            fieldLabel: getText('Description'),
            reference: 'description',
            name: 'description'
        },
        {
            xtype: 'checkbox',
            fieldLabel: getText('Checked'),
            reference: 'checked',
            name: 'checked',
            checked: false
        }
    ];
    
        this.callParent(arguments);

    },
    
    
    buildField: function(data, control){
        
        var field = this.buildFormField(data, control);
        
        field.items[0].xtype = 'ux-checkBox';
        field.items[0].fieldLabel = data.label? data.label : 'Label';
        
        return field;
    },
    
    
    buildFormField: function(data, control, value){
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
        
        var configuration = control.field;
        
        if(configuration.width === 0){
            configuration.width = '100%';
        }
                
        var isChecked = configuration.checked;
        
        if(Ext.typeOf(value) === 'boolean'){
            isChecked = value;
        }
        
        var field = {
            xtype: 'container',
            defaults: {
                submitValue: false,
                margin: 0,
                labelWidth: 112,
                labelSeparator : getText(':')
            },
            items:[
                {
                    xtype: 'checkbox',
                    tag: 'property',
                    name: data.name,
                    fieldLabel: data.label? data.label : data.name,
                    width: configuration.width,
                    checked: isChecked,
                    allowBlank: !required,
                    editable: isEditable,
                    disabled: !isEditable,
                    labelStyle: 'word-wrap: break-word;'
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
            fieldType: 'checkbox',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            checked: this.lookupReference('checked').checked,
            dataType: 'BOOLEAN',
            vtype: vtype
        };
        
        return field;
    },
    
    
    setData: function(field){
        
        this.up('form').getForm().setValues(field);

    }
    
    
});