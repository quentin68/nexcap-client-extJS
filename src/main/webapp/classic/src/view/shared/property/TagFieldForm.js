Ext.define('Dashboard.view.shared.property.TagFieldForm',{
    extend: 'Ext.panel.Panel',
    xtype : 'tagFieldForm',
    
    require: 'Ux.TagField',
    
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
            value: 200,
            maxValue: 600,
            minValue: 120
        },
//        {
//            xtype: 'displayfield',
//            fieldLabel: getText('Tags'),
//        },
        {
            xtype: 'container',
            reference: 'valuesContainer',
            name: 'valuesContainer',
            layout: 'anchor',
            defaults: {
                xtype: 'textfield',
                margin: '0 0 12 105',
                labelSeparator : getText(':'),
                anchor: '100%',
                name: 'tagValue',
                submitValue: false,
                allowBlank: true,
                listeners: {
                    change: function( me , newValue , oldValue , eOpts ){  
                        
                        this.up('window').getController().onFormChange(me , newValue , oldValue , eOpts);

                        var fields =  this.up('container').query('textfield[name=tagValue]');

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
                    fieldLabel: getText('Tags'),
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
        
        field.items[0].xtype = 'ux-tagfield';
        field.items[0].fieldLabel = data.label? data.label : 'Label';
        
        return field;
        
    },
    
    
    buildFormField: function(data, control){
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
        
        if(configuration.width === 0){
            configuration.width = '100%';
        }
        
        var tagsData = [];
        var tagValues = configuration.tagValues;
        
        for(var i = 0; i < tagValues.length; i++){
            if(tagValues[i]){
                var tag = {id: i, show: tagValues[i]};
                tagsData.push(tag);
            }
        }
        
        var shows = Ext.create('Ext.data.Store', {
            fields: ['id','show'],
            data: tagsData
//            data: [
//                {id: 0, show: 'Battlestar Galactica'},
//                {id: 1, show: 'Doctor Who'},
//                {id: 2, show: 'Farscape'},
//                {id: 3, show: 'Firefly'},
//                {id: 4, show: 'Star Trek'},
//                {id: 5, show: 'Star Wars: Christmas Special'}
//            ]
         });
        
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
                    xtype: 'tagfield',
                    tag: 'property',
                    name: data.name,
                    fieldLabel: data.label? data.label : data.name,
                    width: configuration.width,
                    store: shows,
                    displayField: 'show',
                    valueField: 'show',
                    queryMode: 'local',
                    filterPickList: true,
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
        
        var fields =  this.query('textfield[name=tagValue]');
        var tagValues = [];
        
        for(var i = 0; i < fields.length; i++){
            if(fields[i].value.length !== 0){
                tagValues.push(fields[i].value);
            }
        }
        
        var field = {
            fieldType: 'tagfield',
            name: this.lookupReference('fieldLabel').value,
            fieldLabel: this.lookupReference('fieldLabel').value,
            description: this.lookupReference('description').value,
            width: this.lookupReference('width').value,
            tagValues: tagValues,
            dataType: 'STRING',
            vtype: vtype
        }
        
        return field;
    },
    
    
    setData: function(field){
        
        if(field.itemValues[0] === undefined){
            return;
        }
        
        this.up('form').getForm().setValues(field);
        
        var valuesContainer = this.down('container[reference=valuesContainer]');
        
        for(var i=1; i<field.itemValues.length; i++){
            this.down('container[reference=valuesContainer]').add({
                value: field.itemValues[i]
            });
        }
          
        valuesContainer.down('textfield[name=tagValue]').setValue( field.itemValues[0] );
        
    }
    
});