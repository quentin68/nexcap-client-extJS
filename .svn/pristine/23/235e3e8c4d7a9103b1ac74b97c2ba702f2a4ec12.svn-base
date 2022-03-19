Ext.define('Dashboard.view.shared.property.DateFieldForm',{
    extend: 'Ext.panel.Panel',
    xtype : 'dateFieldForm',
    
    require: 'Ux.DateField',
    
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
            xtype: 'textfield',
            fieldLabel: getText('Description'),
            reference: 'description',
            name: 'description'
        },
        {
            xtype: 'numberfield',
            fieldLabel: getText('Width'),
            reference: 'width',
            name: 'width',
            value: 250,
            maxValue: 600,
            minValue: 120
        },
        {
            xtype: 'checkbox',
            fieldLabel: getText('Limit to current date'),
            reference: 'limitToCurrentDate',
            name: 'limitToCurrentDate',
            checked: false
        }
    ];
    
        this.callParent(arguments);

    },
    
    
    buildField: function(data, control){
        
        var field = this.buildFormField(data, control);
        
        field.items[0].xtype = 'ux-datefield';
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
        
        var maxValue = null;
        
        if(configuration.limitToCurrentDate){
            maxValue = new Date();
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
                    xtype: 'datefield',
                    tag: 'property',
                    name: data.name,
                    fieldLabel: data.label? data.label : data.name,
                    width: configuration.width,
                    format: getText('Y-m-d'),
                    maxValue: maxValue,
                    allowBlank: !required,
                    // editable: isEditable,
                    disabled: !isEditable,
                    labelStyle: 'word-wrap: break-word;',
                    formatText: getText('Expected time format: MM:DD:YYYY'),
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
            fieldType: 'datefield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            width: this.lookupReference('width').value,
            limitToCurrentDate: this.lookupReference('limitToCurrentDate').checked,
            dataType: 'DATE',
            vtype: vtype
        };
        
        return field;
    },
    
    
    setData: function(field){
        
        this.up('form').getForm().setValues(field);
        
    }
    
});