/*  global Ext */

Ext.define('Dashboard.view.shared.property.RadioGroupForm',{
    extend: 'Ext.panel.Panel',
    xtype : 'radioGroupForm',
    
    require: 'Ux.FieldContainer',
    
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
            allowBlank: false,
            anchor: '100%'
        },
        {
            xtype: 'textfield',
            fieldLabel: getText('Description'),
            reference: 'description',
            name: 'description'
        },
//        {
//            xtype      : 'fieldcontainer',
//            fieldLabel : 'Orientation',
//            reference: 'orientation',
//            defaultType: 'radio',
//            layout: 'hbox',
//            defaults: {
//                flex: 1,
//                name: 'orientation',
//                margin: '0 0 0 12',
//                submitValue: false,
//                handler: 'onFormChange'
//            },
//            items: [
//                {
//                    boxLabel: getText('Horizontal'),
//                    inputValue: 'horizontal',
//                    checked: true
//                },
//                {
//                    boxLabel: getText('Vertical'),
//                    inputValue: 'vertical'
//                }
//            ]
//        },
        {
            xtype: 'container',
            reference: 'valuesContainer',
            layout: 'anchor',
            defaults: {
                xtype: 'textfield',
                margin: '0 0 12 105',
                labelSeparator : getText(':'),
                anchor: '100%',
                name: 'itemValue',
                submitValue: false,
                allowBlank: true,
                listeners: {
                    change: function( me , newValue , oldValue , eOpts ){  
                        
                        this.up('window').getController().onFormChange(me , newValue , oldValue , eOpts);

                        var fields =  this.up('container').query('textfield[name=itemValue]');

                        for(var i = 0; i < fields.length; i++){
                            if(fields[i].value.length === 0){
                                return;
                            }
                        }

                        this.up().add({});

                    }
                }
            },
            items:[
                {
                    fieldLabel: getText('Buttons labels'),
                    labelWidth: 100,
                    margin: '0 0 12 0'
                }
            ]
        }
    ];
    
        this.callParent(arguments);

    },
    
    
    buildField: function(data, control){
        
        var field = this.buildFormField(data, control);
        
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
        
//        var layout = 'column';
//        if(configuration.orientation === 'vertical'){
//            layout = null;
//        }

        
        var items = [];
        var itemValues = configuration.itemValues;
        
        for(var i = 0; i < itemValues.length; i++){
            
            var checked = false;
            
            if(value && itemValues[i] === value){
                checked = true;
            }
            
            if(itemValues[i]){
                                
                var item = {
                    xtype: 'radio',
                    boxLabel: itemValues[i], 
                    inputValue: itemValues[i],
                    checked: checked
                };
                items.push(item);
            }
        }
        
        var field = {
            xtype: 'container',
            defaults: {
                submitValue: false,
                margin: 0,
                labelSeparator : getText(':'),
                labelWidth: 112,
                labelStyle: 'word-wrap: break-word;'
            },
            items:[
                {
                    xtype: 'radiogroup',
                    fieldLabel: data.label? data.label : data.name,
                    width: '100%',
                    columns: 1,
                    vertical: true,
                    items: items,
                    allowBlank: !required,
                    editable: isEditable,
                    disabled: !isEditable,
                    preventMark: false,
                    msgTarget: 'side',
                    value: value,

                    defaults: {
                        //flex: 1,
                        margin: '0 0 0 12',
                        submitValue: false,
                        tag: 'property',
                        name: data.name
                    }
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
        
        var fields =  this.query('textfield[name=itemValue]');
        var itemValues = [];
        
        for(var i = 0; i < fields.length; i++){
            if(fields[i].value.length !== 0){
                itemValues.push(fields[i].value);
            }
        }
        
        var field = {
            fieldType: 'radio',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            //orientation: this.lookupReference('orientation').down('radio[checked=true]').inputValue,
            itemValues: itemValues,
            dataType: 'STRING',
            vtype: vtype
        };
        
        return field;
    },
    
    
    setData: function(field){

        if(field.itemValues === undefined){
            return;
        }
        
        this.up('form').getForm().setValues(field);
        
        if(field.itemValues.length < 1){
            return;
        }
        
        var valuesContainer = this.down('container[reference=valuesContainer]');
        
        for(var i=1; i<field.itemValues.length; i++){
            this.down('container[reference=valuesContainer]').add({
                value: field.itemValues[i]
            });
        }
          
        valuesContainer.down('textfield[name=itemValue]').setValue( field.itemValues[0] );
        
    }
    
});