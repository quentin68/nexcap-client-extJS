/*  global Ext */

Ext.define('Dashboard.store.properties.FieldTypes', {
    extend: 'Ext.data.Store',
    
    fields: [
        'propertyValueType', 
        'name', 
        {
            name: 'label',
            type: 'string',
            convert: function(val) {
                 return getText(val);
            }
        }, 
        'className'
    ],
    
    data: [
        {
            propertyValueType: 'STRING', 
            name:'textfield', 
            label: getText('Simple Text field'), 
            className: 'TextFieldForm',
            specificCheckControlTypes : 'text'
        }, {
            propertyValueType: 'STRING', 
            name:'textareafield', 
            label: getText('Multi lines Text box'), 
            className: 'TextAreaForm',
            specificCheckControlTypes : 'textArea'
        }, {
            propertyValueType: 'FLOAT', 
            name:'numberfield', 
            label: getText('Number'), 
            className: 'NumberFieldForm', 
            specificCheckControlTypes : 'slider'
        }, {
            propertyValueType: 'INT', 
            name:'integerfield', 
            label: getText('Integer'), 
            className: 'IntegerFieldForm',
            specificCheckControlTypes : 'slider'
        }, {
            propertyValueType: 'DATE', 
            name:'datefield', 
            label: getText('Date'), 
            className: 'DateFieldForm',
            specificCheckControlTypes : 'date'
        },
        //{propertyValueType: 'TIME', name:'timefield', label: getText('Time'), className: 'TimeFieldForm'}, 
        {
            propertyValueType: 'DATETIME', 
            name:'datetimefield', 
            label: getText('Date & Time'), 
            className: 'DateTimeFieldForm',
            specificCheckControlTypes : 'dateTime'
        }, {
            propertyValueType: 'STRING', 
            name:'combobox', 
            label: getText('Combo box'), 
            className: 'ComboBoxForm',
            specificCheckControlTypes : 'list'
        }, {
            propertyValueType: 'BOOLEAN', 
            name:'checkbox', 
            label: getText('Check box'), 
            className: 'CheckBoxForm',
            specificCheckControlTypes : 'radioButton'
        }, {
            propertyValueType: 'STRING', 
            name:'radio', 
            label: getText('Radio buttons'), 
            className: 'RadioGroupForm',
            specificCheckControlTypes : 'radioButton'
        }//,
        //{propertyValueType: 'LIST', name:'tagfield', label: getText('Tags list'), className: 'TagFieldForm'}
    ],
    
    statics: {
        
        textfield: {
            propertyValueType: 'STRING', 
            name:'textfield', 
            label: getText('Simple Text field'), 
            className: 'TextFieldForm',
            specificCheckControlTypes : 'text'
        },
        textareafield: {
            propertyValueType: 'STRING', 
            name:'textareafield', 
            label: getText('Multi lines Text box'), 
            className: 'TextAreaForm',
            specificCheckControlTypes : 'textArea'
        },
        numberfield: {
            propertyValueType: 'FLOAT', 
            name:'numberfield', 
            label: getText('Number'), 
            className: 'NumberFieldForm',
            specificCheckControlTypes : 'slider'
        },
        integerfield: {
            propertyValueType: 'INT', 
            name:'integerfield', 
            label: getText('Integer'), 
            className: 'IntegerFieldForm',
            specificCheckControlTypes : 'slider'
        },
        datefield: {
            propertyValueType: 'DATE', 
            name:'datefield', 
            label: getText('Date'), 
            className: 'DateFieldForm',
            specificCheckControlTypes : 'date'
        },
        //timefield: {
        //propertyValueType: 'TIME', 
        //name:'timefield', 
        //label: getText('Time'), 
        //className: 'TimeFieldForm'
        //},
        datetimefield: {
            propertyValueType: 'DATETIME', 
            name:'datetimefield', 
            label: getText('Date & Time'), 
            className: 'DateTimeFieldForm',
            specificCheckControlTypes : 'dateTime'
        },
        combobox: {
            propertyValueType: 'STRING', 
            name:'combobox', 
            label: getText('Combo box'), 
            className: 'ComboBoxForm',
            specificCheckControlTypes : 'text'
        },
        checkbox: {
            propertyValueType: 'BOOLEAN', 
            name:'checkbox', 
            label: getText('Check box'), 
            className: 'CheckBoxForm',
            specificCheckControlTypes : 'radioButton'
        },
        radio: {
            propertyValueType: 'STRING', 
            name:'radio', 
            label: getText('Radio buttons'), 
            className: 'RadioGroupForm',
            specificCheckControlTypes : 'radioButton'
        },
        tagfield: {
            propertyValueType: 'LIST', 
            name:'tagfield', 
            label: getText('Tags list'), 
            className: 'TagFieldForm',
            specificCheckControlTypes : 'list'
        }
        
        
//        getFieldTypeByName: function(name){
//            return this.findRecord('propertyValueType', name, 0, false, true, true);
//        }
    
//        getControllerByName: function(nameValue){
//            
//            var store = Ext.create('Dashboard.store.properties.FieldTypes');
//            return store.findRecord('name', nameValue, 0, false, true, true)['className'];
//
//        }
    }
    
});