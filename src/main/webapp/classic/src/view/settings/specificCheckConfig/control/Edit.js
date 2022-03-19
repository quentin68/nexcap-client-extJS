/*  global Ext */

Ext.define('Dashboard.view.settings.specificCheckConfig.control.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'controlEdit',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.component.AutocompleteComboBox'
    ],

    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    layout: 'fit',
    controller: 'controlEdit',
    currentPanel: null,
    mainController: null,
    record: null,
    controlTypeStore: null,
    modelProperties: Dashboard.manager.administration.MaterialManager.getProperties(),
    propertyConfigurationType: 'MATERIAL',

    config: {
        propertiesStore: Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: false,
            listeners:{
                beforeload: function(store){
                    
                    var myFilter = {
                        property: 'propertyConfigurationType',
                        value: 'MATERIAL',
                        type: 'ENUM',
                        comparison: 'EQ'
                    };
                    
                    if(!store.getProxy().extraParams.filter){
                        store.getProxy().extraParams.filter = [];
                    }
                    
                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load: function(store){
                    if(store.getProxy().extraParams.filter){
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        }),
        localPropertiesStore: Ext.create('Dashboard.store.properties.LocalProperties')
    },
    

    initComponent: function() {
        
        this.title = getText('Edit a  control');
        
        this.controlTypeStore =  Ext.create('Dashboard.store.settings.SpecificCheckControlType'); 
        this.fieldTypesStore =  Ext.create('Dashboard.store.properties.FieldTypes');
        
        this.getPropertiesStore().on('load', this.onPropertiesLoaded, this);
        this.getPropertiesStore().load();
        
        var charasteristics = {
            xtype: 'panel',
            title: getText('Characteristics'),
            reference: 'characteristics',
            iconCls: 'fa fa-info',
            items:[
                {
                    xtype: 'displayfield',
                    name : 'propertyName',
                    //maxLength: 255,
                    fieldLabel: getText('Property'),
                    allowBlank: false                 
                },{
                    xtype: 'displayfield',
                    name : 'controlType',
                    //maxLength: 255,
                    fieldLabel: getText('Type'),
                    allowBlank: false,
                    listeners:{
                        afterrender: function(field) {
                            
                                                     
                        }
                    }
                },
//                {
//                    xtype: 'combo',
//                    name : 'controlType',
//                    store: this.controlTypeStore, 
//                    displayField: 'label',
//                    valueField: 'type',
//                    editable:false,
//                    allowBlank: false,
//                    fieldLabel: getText('Type'),
//                    listeners: {
//                        select: {
//                            fn: function (combo, record) {
//                                var properties = Ext.ComponentQuery.query('textareafield[name=properties]')[0];
//                                var options = Ext.ComponentQuery.query('textareafield[name=options]')[0];
//                                if (record.data.type === 'scan' || record.data.type === 'photo') {
//                                    options.hide();
//                                    options.setValue(null);
//                                    options.allowBlank =  true;
//                                    properties.show();
//                                    properties.allowBlank =  false; 
//                                    if(properties.getValue() === '' ){
//                                        properties.setValue(record.data.jsonExample); 
//                                    }
//                                } else if (record.data.type === 'text' || record.data.type === 'date' || record.data.type === 'textArea'){
//                                    options.hide();
//                                    options.setValue(null);
//                                    options.allowBlank =  true;
//                                    properties.hide();
//                                    properties.setValue(null);
//                                    properties.allowBlank =  true;
//                                }else {
//                                    options.show();
//                                    options.allowBlank =  false;
//                                    if(options.getValue() === ''){
//                                        options.setValue(record.data.jsonExample); 
//                                    }
//                                    properties.hide();
//                                    properties.setValue(null);
//                                    properties.allowBlank =  true;
//                                }
//                            }
//                        },
//                        change: 'onFormChange',
//                        afterrender: function(combo) {
//                            var properties = Ext.ComponentQuery.query('textareafield[name=properties]')[0];
//                            var options = Ext.ComponentQuery.query('textareafield[name=options]')[0];
//                            if (combo.value === 'scan' || combo.value === 'photo') {
//                                    options.hide();
//                                    options.setValue(null);
//                                    options.allowBlank =  true;
//                                    properties.show();
//                                    properties.allowBlank =  false;   
//                                } else if (combo.value === 'text' || combo.value === 'date' || combo.value === 'textArea'){
//                                    options.hide();
//                                    options.setValue(null);
//                                    options.allowBlank =  true;
//                                    properties.hide();
//                                    properties.setValue(null);
//                                    properties.allowBlank =  true;
//                                }else {                                    
//                                    options.show();
//                                    options.allowBlank =  false;
//                                    properties.hide();
//                                    properties.setValue(null);
//                                    properties.allowBlank =  true;
//                                }                           
//                        }
//                    }
//                },
                {
                    xtype: 'textfield',
                    name : 'label',
                    maxLength: 255,
                    fieldLabel: getText('Label'),
                    listeners: {
                       change: 'onFormChange' 
                    }   
                },{
                    xtype: 'textareafield',
                    name : 'options',
                    height: 200,
                    hidden: true,
                    fieldLabel: getText('Options'),
                    validator: function (val) {
                        if (val !== null && val !== "") {
                            try {
                                JSON.parse(val);
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }
                        return true;

                    },
                    listeners: {
                        change: 'onFormChange'                        
                    }   
                },{
                    xtype: 'textareafield',
                    name : 'properties',
                    height: 200,
                    hidden: true,
                    fieldLabel: getText('Properties'),
                    validator: function (val) {
                        if (val !== null && val !== "") {
                            try {
                                JSON.parse(val);
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }
                        return true;

                    },
                    listeners: {
                       change: 'onFormChange'
                    }   
                },{
                    xtype: 'textfield',
                    name : 'comment',
                    maxLength: 255,
                    fieldLabel: getText('Comment'),
                    listeners: {
                       change: 'onFormChange' 
                    }   
                }
            ]
        };
    
        
        var preview = {
            xtype: 'panel',
            ui: 'property-create',
            title: getText('Preview'),
            iconCls: 'fa fa-check',
            reference: 'previewContainer',
            layout: 'center',
            flex:2,
            height: '100%',
            bodyStyle: {
                background: '#F2F2F2', 
                padding: '24px'
            },
            items:[
                {
                    html: '<span><b>' + getText('Select a field type') +'</b></span>'
                }
            ]
        };
        
        var form = {
            xtype: 'panel',
            border:false,
            flex: 3,
            height: '100%',
            bodyPadding : '0 0 24 0',
            scrollable:'y',

            defaults: {
                width: '100%',
                ui: 'property-create',
                minHeight: 80,
                bodyPadding : '24',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            items: [
                charasteristics
            ]                       
        };
        
        
        var me = this;
        Ext.apply( me, {
        

            items: [
                {
                    xtype: 'form',
                    border:false,
                    width: 1000,
                    height: 600,
                    layout: 'hbox',

                    items: [
                        form,
                        preview
                    ],

                    buttons: [
                        {
                            text: getText('Save'),
                            disabled: false,
                            handler: 'onSaveControl'
                        }, {
                            text: getText('Cancel'),
                            scope: this,
                            handler: this.close
                        }
                    ]                       
                }
            ]
        });

        this.callParent(arguments);
        this.setData(this.record);

    },   
    
    setData: function(record){   
                        
        var win = this;
        var properties = win.down('textareafield[name=properties]');
        var options = win.down('textareafield[name=options]');
        
        var controlType = record.data.controlType;
        var fieldType = this.controlTypeStore.findRecord('type', controlType, 0, false, true, true);
        this.down('displayfield[name=controlType]').data = fieldType.data;
        this.down('displayfield[name=controlType]').setValue(fieldType.data.label);

        if (controlType === 'scan' || controlType === 'photo') {
            options.hide();
            options.setValue(null);
            options.allowBlank =  true;
            properties.show();
            properties.allowBlank =  false;   
        } else if (controlType === 'text' || controlType === 'date'|| controlType === 'dateTime' || controlType === 'textArea'){
            options.hide();
            options.setValue(null);
            options.allowBlank =  true;
            properties.hide();
            properties.setValue(null);
            properties.allowBlank =  true;
        }else {                                    
            options.show();
            options.allowBlank =  false;
            properties.hide();
            properties.setValue(null);
            properties.allowBlank =  true;
        }  
       
        this.down('form').getForm().setValues(record.data);
                
        if(record.data.options !== null && record.data.options !== ""){
            this.down('textfield[name=options]').setValue(this.valueEncoded(record.data.options));
        }
        if(record.data.properties !== null && record.data.properties !== ""){
          this.down('textfield[name=properties]').setValue(this.valueEncoded(record.data.properties));  
        }
        
    },
    
    valueEncoded: function (value) {
        
        if (Ext.decode(value, true) !== null) {
            return value;
        } else {
            return Ext.encode(value);
        }
    },
    
    onPropertiesLoaded: function (store){
                
        this.getLocalPropertiesStore().clearData();

        // dynamic properties
        var records = this.getPropertiesStore().getRange();
        
        if (records.length > 0) {
            for (var j = 0; j < records.length; j++) {
                
                var property = records[j];
                
                property.data.isDynamicProperty = true;
                
                // Add if valid
                if (this.propertyIsValid(property)) {

                    var enabledInControls = true;
                    property.data.control = Dashboard.model.PropertyConfiguration.getControl(property.data);
                    
                    if (property.data.control === undefined) {
                        property.data.type = null;

                    } else {
                        if (property.data.control.field !== undefined && property.data.control.field.dataType !== undefined) {
                            // override property type (LIST/STRING/INT...) with property result type (no LIST -> STRING)
                            property.data.type = property.data.control.field.dataType;
                        }
                        if (property.data.control.configuration !== undefined && property.data.control.configuration.enabledInControls !== undefined) {
                            enabledInControls = property.data.control.configuration.enabledInControls;
                        }
                    }
                    
                    if (enabledInControls !== false) {
                        this.getLocalPropertiesStore().add(property);
                    }
                }
            }
        }
        
        //this.setData(this.target.filter);
        
    },
    
    propertyIsValid: function (property){
                
        // Enabled in configuration
        if (property.data.enabledInControls === false) {
            return false;
        }
        return true;
    },
        
    /**
     * Method used by the controller to get values
     * @return (object) data
     */
    getData: function(){
                
        var values = this.down('form').getValues();
        
        values.propertyName = this.record.data.propertyName;
        values.controlType = this.record.data.controlType;
        
        return values;
    }
    
});  