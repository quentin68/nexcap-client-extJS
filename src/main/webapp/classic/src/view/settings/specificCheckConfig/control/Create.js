/*  global Ext */

Ext.define('Dashboard.view.settings.specificCheckConfig.control.Create', {
    extend: 'Ext.window.Window',
    xtype: 'controlCreate',
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
    controller: 'controlCreate',
    
    mainController: null,
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
        
        this.title = getText('Create a  control');
        
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
                    xtype: 'autocompleteComboBox',
                    name: 'propertyName',
                    fieldLabel: getText('Property'),
                    store: this.getLocalPropertiesStore(),
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'name',
                    editable: true,
                    allowBlank: false,
                    forceSelection: false,
                    listeners: {
                        scope: this,
                        change: 'onPropertyChanged'
                    }
                },
//                {
//                    xtype: 'textfield',
//                    name : 'propertyName',
//                    maxLength: 255,
//                    fieldLabel: getText('Property name'),
//                    allowBlank: false,
//                    listeners: {
//                       change: 'onFormChange' 
//                    }                   
//                },
                {
                    xtype: 'combo',
                    name : 'controlType',
                    store: this.controlTypeStore, 
                    displayField: 'label',
                    valueField: 'type',
                    disabled: true,
                    editable:false,
                    allowBlank: false,
                    fieldLabel: getText('Type'),
                    listeners: {
                        select: {
                            fn: function (combo, record) {
                                                                                                
                                var win = combo.up('window');
                                var properties = win.down('textareafield[name=properties]');
                                var options = win.down('textareafield[name=options]');
                                
                                properties.setValue(null);
                                options.setValue(null);
                                
                                var labelField = win.down('textfield[name=label]');
                                labelField.setValue(null);
                                labelField.show();
                                
                                var commentField = win.down('textfield[name=comment]');
                                commentField.setValue(null);
                                commentField.show();
                                
                                var property = win.down('combo[name=propertyName]').getSelectedRecord();
                                var conf = null;
                                var propertyData = null;
                                var jSon = null;
                                
                                try{
                                    propertyData = property.data;
                                }catch(ex){}

                                //case dynamic property 
                                try{
                                    conf = property.data.options.nexcapweb.field;
                                }catch(ex){}  
                                
                                //case classical property
                                if(propertyData){
                                    labelField.setValue(propertyData.label);
                                    commentField.setValue(propertyData.description);
                                }
                                
                                    
                                if (record.data.type === 'scan' || record.data.type === 'photo') {
                                    options.hide();
                                    options.allowBlank =  true;                                    
                                    properties.show();
                                    properties.allowBlank =  false;
                                    properties.setValue(record.data.jsonExample);
                                    
                                } else if (record.data.type === 'text' || record.data.type === 'date' || record.data.type === 'dateTime' || record.data.type === 'textArea'){
                                    options.hide();
                                    options.setValue(null);
                                    options.allowBlank =  true;
                                    properties.hide();
                                    properties.setValue(null);
                                    properties.allowBlank =  true;
                                    
                                    if(conf){
                                        labelField.setValue(conf.fieldLabel);
                                        commentField.setValue(conf.description);
                                    }
                                    
                                } else {                                    
                                    options.show();
                                    options.allowBlank =  false;
                                    properties.hide();
                                    properties.setValue(null);
                                    properties.allowBlank =  true;

                                    if(conf){
                                        jSon = win.buildJson(record.data.type, conf);
                                        labelField.setValue(conf.fieldLabel);
                                        commentField.setValue(conf.description);
                                    }
                                    
                                    if(jSon){
                                        options.setValue(jSon);
                                    }else{
                                        options.setValue(record.data.jsonExample);
                                    }
                                    
                                }
                            }
                        },
                        change: 'onFormChange' 
                    }
                },{
                    xtype: 'textfield',
                    name : 'label',
                    maxLength: 255,
                    fieldLabel: getText('Label'),
                    hidden: true,
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
                    hidden: true,
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

    },   
    
    
     // ==========================================================================
    // Event handlers
    // ==========================================================================

    onPropertyChanged : function( combo, newValue, oldValue, eOpts ) {
        
        this.cleanForm();
                
	var record = combo.getSelection();
        var comboTypeField = this.down('combo[name=controlType]');
        
        if(record){
            
            comboTypeField.setDisabled(true);
            this.hideOptions();
                                    
            var fieldTypeName = 'textfield';
            
            try{
                if(record.data.isDynamicProperty === true){
                    fieldTypeName = record.data.options.nexcapweb.field.fieldType;
                }else{
                    fieldTypeName = record.data.field.fieldType;
                }
            }catch(ex){
                
            }

            this.updateTypesList(fieldTypeName);
                        
        }else{
            comboTypeField.setDisabled(false);
        }

    },
    
    
    updateTypesList: function(fieldTypeName){
                
        var comboTypeField = this.down('combo[name=controlType]');
        
        var fieldType = this.fieldTypesStore.findRecord('name', fieldTypeName, 0, false, true, true);
        
        if(!fieldType){
            fieldType = this.fieldTypesStore.findRecord('name', 'textfield', 0, false, true, true);
        }
                
        comboTypeField.select(fieldType.data.specificCheckControlTypes);
        var record = this.comboSetter(comboTypeField, fieldType.data.specificCheckControlTypes);
        comboTypeField.fireEvent('select', comboTypeField, record);
        
    },
    
    
    comboSetter: function(comboBox, value) {
        
        var store = comboBox.store;
        var valueField = comboBox.valueField;
        var displayField = comboBox.displayField;

        var recordNumber = store.findExact(valueField, value, 0);

        if (recordNumber === -1){
            return -1;
        }

        var displayValue = store.getAt(recordNumber).data[displayField];
        comboBox.setValue(value);
        comboBox.setRawValue(displayValue);
        comboBox.selectedIndex = recordNumber;
        return store.getAt(recordNumber);
    },
    
    
    buildJson: function(recordDataType, conf){
                
        var jSon = [];
        
        if(conf.fieldType === 'integerfield' || conf.fieldType === 'numberfield'){
            var object = Ext.decode('{ "minValue": 0.0, "maxValue": 100.0, "numberDecimals": 0, "unit": "%"}');
            if(conf.minValue){
                object.minValue = conf.minValue;
            }
            if(conf.maxValue){
                object.maxValue = conf.maxValue;
            }
            if(conf.decimalPrecision){
                object.numberDecimals = conf.decimalPrecision;
            }
            if(conf.unit){
                object.unit = conf.unit;
            }
            
            return Ext.encode(object);
        }
        
        if(conf.fieldType === 'combobox'){
            var list = conf.itemValues;
            Ext.each(list, function(item){
                jSon.push({ "name": item });
            });
            return Ext.encode(jSon);
        }
        
        if(conf.fieldType === 'radio'){
            var list = conf.itemValues;
            Ext.each(list, function(item){
                jSon.push({ "name": item, selected: false });
                if(jSon.length > 0){
                    jSon[0].selected = true;
                }
            });
            return Ext.encode(jSon);
        }
        
        if(conf.fieldType === 'checkbox'){
            jSon.push({ "name": conf.fieldLabel, selected: conf.checked });
            return Ext.encode(jSon);
        }
        
    },
    
    
    cleanForm: function(){
        var win = this;
        win.down('combo[name=controlType]').setValue(null);
        win.down('combo[name=controlType]').setDisabled('true');
        win.down('combo[name=controlType]').allowBlank = false;

        win.down('textareafield[name=properties]').setValue(null);
        win.down('textareafield[name=properties]').hide();
        win.down('textareafield[name=properties]').allowBlank = true;

        win.down('textareafield[name=options]').setValue(null);
        win.down('textareafield[name=options]').hide();
        win.down('textareafield[name=options]').allowBlank = true;

        win.down('textfield[name=label]').setValue(null);
        win.down('textfield[name=label]').hide();
        win.down('textfield[name=label]').allowBlank = true;
        
        win.down('textfield[name=comment]').setValue(null);
        win.down('textfield[name=comment]').hide();
        win.down('textfield[name=comment]').allowBlank = true;
    },
    
    
    hideOptions: function(){
        
        var properties = this.down('textareafield[name=properties]');
        var options = this.down('textareafield[name=options]');
        
        options.hide();
        options.allowBlank =  true;                                    
        properties.hide();
        properties.allowBlank =  true;
        
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
    
    // ==========================================================================
    // Methods
    // ==========================================================================

    /**
     * Build filter creation form
     * @param {object} record
     * @param {type} value
     * @returns {undefined}
     */
    displayFieldForm : function(record, value) {
                
        if(value === undefined){
            value = null;
        }
        
	// cleaning
	var container = this.down('panel[reference=fieldFormContainer]');
	container.removeAll();
        
        if(record.data.isDynamicProperty === true){
        
            try {
                var control = Dashboard.model.PropertyConfiguration.getControl(record);
                
                if (control !== undefined) {
                    var type = control.field.fieldType;
                    var fieldType = Dashboard.store.properties.FieldTypes[type];
                    var controller = Ext.create('Dashboard.view.shared.property.' + fieldType.className);

                    var dynamicField = controller.buildFormField(record.data, control, value);
                    
                    container.add(dynamicField);
                }

            } catch (ex) {
                Dashboard.tool.Utilities.error('[StatFiltersSelector.displayFieldForm] error : '+ ex);
            }
        }else{
            
            //var classicField = this.buildFilter(record);
            //container.add(classicField);
            
        }

    },
    
    propertyIsValid: function (property){
                
        // Enabled in configuration
        if (property.data.enabledInControls === false) {
            return false;
        }
        return true;
    },
    
    setData: function(filter){
                        
        if(!filter){
            return;
        }
        
        var propertyCombo = this.down('combo[name=property]');
        
        propertyCombo.setValue(filter.property);

        var value = filter.value;
        if(value === null){
            this.down('radiogroup[reference = valueFilled]').setValue({valueFilled:false});
        }
        
        var record = propertyCombo.getSelection();
        this.displayFieldForm(record, value);
        
    },
        
    /**
     * Method used by the controller to get values
     * @return (object) data
     */
    getData: function(){
        
        var values = this.down('form').getValues();
                
        var typeCombo = this.down('combo[name=controlType]');
        values.controlType = typeCombo.getValue();

        return values;
    }
    
});  