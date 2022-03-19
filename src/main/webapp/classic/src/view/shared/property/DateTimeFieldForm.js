/* global Ext  */

Ext.define('Dashboard.view.shared.property.DateTimeFieldForm',{
    extend: 'Ext.panel.Panel',
    xtype : 'dateTimeFieldForm',
    
    require: ['Ux.DateField'],// 'Ux.TimeField'],
    
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
            allowDecimals: false,
            value: 280,
            maxValue: 600,
            minValue: 0
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
        
        field.items[0].items[0].xtype = 'ux-datefield';
        field.items[0].items[0].fieldLabel = data.label? data.label : 'Label';
                
        return field;
        
    },
    
    
    buildFormField: function(data, control, value){
        var required = false;
        var isEditable = true;
        
        try{
            required = control.configuration.required;
            isEditable = control.configuration.isEditable; 
        }catch(ex){
            // ignore
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
                
        var date = null;
        var time = null;
        
        if(value){
            date = new Date(value);
            time = Ext.Date.format(date, 'H:i:s');
        }
        
        var field = {
            xtype: 'container',
            defaults: {
                submitValue: false,
                labelSeparator : getText(':'),
                margin: 0
            },
            items:[
                {
                    xtype: 'container',
                    fieldType: 'datetimefield',
                    maxWidth: configuration.width,
                    layout: 'hbox',
                    tag: 'property',
                    name: data.name,
                    defaults: {
                        submitValue: false,
                        labelSeparator : getText(':'),
                        margin: 0,
                        labelWidth: 112,
                        allowBlank: !required,
                        editable: isEditable,
                        disabled: !isEditable,
                        labelStyle: 'word-wrap: break-word;'
                    },
                    items:[
                        {
                            xtype: 'datefield',
                            fieldLabel: data.label? data.label : data.name,
                            flex:1,
                            format: getText('Y-m-d'),
                            maxValue: maxValue,
                            formatText: getText('Expected time format: MM:DD:YYYY'),
                            value: date
                        }, {
                            xtype: 'timefield',
                            margin: '0 0 0 6',
                            flex:0,
                            width: 110,
                            increment: 60,
                            snapToIncrement: false,
                            format: 'H:i:s',
                            formatText: getText('Expected time format: HH:MM'),//false // 'Expected time format: HH:MM space am/pm'
                            value: time
                        }
                    ]
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
    
    
    concatDateAndTime: function(d, t){
        
       return new Date(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            t.getHours(),
            t.getMinutes(),
            t.getSeconds(),
            t.getMilliseconds()
        );
    },
    
    
    getData: function(){
        
        var vtype = null;
        
        //var datetime = this.concatDateAndTime();
        
        var field = {
            fieldType: 'datetimefield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            width: this.lookupReference('width').value,
            limitToCurrentDate: this.lookupReference('limitToCurrentDate').checked,
            dataType: 'DATETIME',
            vtype: vtype
        };
        
        return field;
    },
    
    
    setData: function(field){

        this.up('form').getForm().setValues(field);
        
    }
    
});