Ext.define('Dashboard.view.shared.property.TimeFieldForm',{
    extend: 'Ext.panel.Panel',
    xtype : 'timeFieldForm',
    
    require: 'Ux.TimeField',
    
    tag: 'field',
    referenceHolder: true,
    width: '100%',
    layout: 'anchor',
    
    listeners: {
        render: 'onFormRender'
    },

    initComponent: function() {
        
        this.defaults = {
            anchor: '100%',
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
            allowBlank: false
        },
        {
            xtype: 'textareafield',
            fieldLabel: getText('Description'),
            reference: 'description',
            name: 'description'
        },
        {
            xtype: 'numberfield',
            fieldLabel: getText('Width'),
            reference: 'width',
            name: 'width',
            allowDecimals: false,
            value: 150,
            maxValue: 600,
            minValue: 0
        },
        {
            xtype: 'numberfield',
            fieldLabel: getText('Increment'),
            reference: 'increment',
            name: 'increment',
            value: 30,
            minValue: 1,
            maxValue: 120
        }
    ];
    
        this.callParent(arguments);

    },
    
    
    buildField: function(data, control){
        
        var field = this.buildFormField(data, control);
        
        field.items[0].xtype = 'ux-timefield';
        field.items[0].fieldLabel = data.label? data.label : 'Label';
        
        return field;
    },
    
    
    buildFormField: function(data, control){
        
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
        
        if(configuration.width === 0){
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
            items:[
                {
                    xtype: 'timefield',
                    tag: 'property',
                    name: data.name,
                    fieldLabel: data.label? data.label : data.name,
                    increment: configuration.increment,
                    width: configuration.width,
                    snapToIncrement: true,
                    format: 'H:i',
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
            fieldType: 'timefield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            width: this.lookupReference('width').value,
            increment: this.lookupReference('increment').value,
            dataType: 'TIME',
            vtype: vtype
        };
        
        return field;
    },
    
    
    setData: function(field){
        
        this.up('form').getForm().setValues(field);
        
    }
    
});