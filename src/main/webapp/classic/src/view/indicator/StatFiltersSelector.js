
/* global Ext, eval  */

Ext.define('Dashboard.view.indicator.StatFiltersSelector', {
    extend: 'Ext.window.Window',
    xtype: 'statFiltersSelector',
    requires: ['Dashboard.tool.Utilities'],

    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    layout: 'fit',
    iconCls: 'fa fa-cog',

    mainController: null,
    
    modelProperties: null, 
    propertyConfigurationType: null,  //MATERIAL | ALERT ...
    statisticReference: null,
    target: null,
    
    config: {
        propertiesStore: Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: false
        }),
        localPropertiesStore: Ext.create('Dashboard.store.properties.LocalProperties')
    },

    initComponent: function (){

        this.title = getText('Filter configuration');
        
        this.getPropertiesStore().on('load', this.onPropertiesLoaded, this);
        this.getPropertiesStore().load();

        var newFilter = {
            xtype: 'panel',
            reference: 'newFilter',
            defaults:{
                labelSeparator: getText(':'),
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'combo',
                    name: 'property',
                    fieldLabel: getText('Property'),
                    store: this.getLocalPropertiesStore(),
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'name',
                    editable: true,
                    allowBlank: false,
                    forceSelection: true,
                    listeners: {
                        scope: this,
                        select: 'onPropertySelected'
                    }
                }, {
                    xtype: 'radiogroup',
                    reference: 'valueFilled',
                    fieldLabel :  getText('Value'),
                    columns: 2,
                    vertical: false,
                    items:[
                        { boxLabel: getText('Filled'), name: 'valueFilled', inputValue: true, checked: true },
                        { boxLabel: getText('Not filled'), name: 'valueFilled', inputValue: false}
                    ],
                    listeners:{
                        scope: this,
                        change: function( me, newValue, oldValue, eOpts){
                            this.down('panel[reference=fieldFormContainer]').setDisabled(!newValue.valueFilled);
                            this.down('panel[reference=configuration]').setHidden(!newValue.valueFilled);
                        }
                    }
                }
            ]
        };

        var configuration = {
            xtype: 'panel',
            title: getText('Filter') + getText(':'),
            iconCls: 'fa fa-filter',
            reference: 'configuration',
            disabled: false,
            items: [
                {
                    xtype: 'panel',
                    reference: 'fieldFormContainer',
                    items: []
                }
            ]
        };

        var form = {
            xtype: 'panel',
            border: false,
            flex: 1,
            height: '100%',
            bodyPadding: '0 0 24 0',
            scrollable: 'y',

            defaults: {
                width: '100%',
                ui: 'property-create',
                minHeight: 80,
                bodyPadding: '24',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            
            items: [
                newFilter, 
                configuration
            ]
        };

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'form',
                    border: false,
                    width: 500,// 950,
                    height: 350,// 600,
                    layout: 'hbox',

                    items: [form],

                    buttons: [
                        {
                            text: getText('Validate'),
                            reference: 'onAddNewFilter',
                            disabled: false
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

    onPropertySelected : function(combo) {
        
	var record = combo.getSelection();
	this.displayFieldForm(record);

    },

    onPropertiesLoaded: function (){
        
        // All properties (classical and dynamic) empty
        this.getLocalPropertiesStore().clearData();
        
        
        //Classical properties
//        for (var i = 0; i < this.modelProperties.length; i++) {
//            var property = this.modelProperties[i];
//            if (property.control !== undefined && typeof property.control === 'string') {
//                property.control = Ext.decode(property.control);
//            }
//            
//            if(property.filterOnly !== undefined){
//                property.enabledInFilters = false;
//            }
//            
//            if (property.enabledInFilters === undefined || property.enabledInFilters !== false) {
//                this.getLocalPropertiesStore().add(property);
//            }
//        }

        // dynamic properties
        var records = this.getPropertiesStore().getRange();
        
        if (records.length > 0) {
            for (var j = 0; j < records.length; j++) {
                
                var property = records[j];
                
                property.data.isDynamicProperty = true;
                
                // Add if valid
                if (this.propertyIsValid(property)) {

                    var enabledInFilters = true;
                    property.data.control = Dashboard.model.PropertyConfiguration.getControl(property.data);
                    
                    if (property.data.control === undefined) {
                        property.data.type = null;

                    } else {
                        if (property.data.control.field !== undefined && property.data.control.field.dataType !== undefined) {
                            // override property type (LIST/STRING/INT...) with property result type (no LIST -> STRING)
                            property.data.type = property.data.control.field.dataType;
                        }
                        if (property.data.control.configuration !== undefined && property.data.control.configuration.enabledInFilters !== undefined) {
                            enabledInFilters = property.data.control.configuration.enabledInFilters;
                        }
                    }
                    if (property.data.propertyConfigurationType==="MATERIAL") {
                    if (enabledInFilters !== false) {
                        this.getLocalPropertiesStore().add(property);
                    }
                }
            }
        }
        }
        this.setData(this.target.filter);
        
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
                
                if(!control.configuration.isEditable){
                    control.configuration.isEditable = true;
                }
                
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
    
    
    buildFilter: function(filter){
        
        if(Ext.typeOf(filter)=== 'object'){
            return this.getDynamicFilter(filter);
        }
    },
            
            
    getDynamicFilter: function(filter){
        
        var filterType = filter.data.type;
                        
//        if(filter.data.comparison === 'IS_NULL' ||  filter.data.comparison === 'IS_NOT_NULL'){
//            filterType = 'VALUE_IS_FILLED';
//            filter.data.configuration.field.fieldType = 'valueisfilled';
//        }
        
        var className = eval('Dashboard.store.FilterTypes.' + filterType).className;
        
        var filterField = Ext.create('Dashboard.view.shared.filtering.'+ className,{
            filterModel: filter
        });
        
        // Add tooltip to filter label
        filterField.setListeners({
            render: function (cts) {
                try {
                    if (className === 'DatesRangeFilter' && cts.items.items['0'].name === 'labelDateRange') {
                        // Date range
                        var labelId = cts.items.items['0'].id;
                        var propertyName = getText('Range');
                        
                    } else if (className === 'DateTimeFilter') {
                        // Date time
                        var labelId = cts.items.items['0'].id;
                        var operator = cts.filterModel.data.comparison;
                        var propertyName = Dashboard.store.FilterTypes.FILTER_COMPARISON[operator];
                        
                    } else if(className === 'ComboItemRefCatFilter'){
                        var labels = [];
                        cts.items.items.forEach(function (field) {
                            labels.push(field.id);
                        });
                        var operator = 'EQ';
                        var propertyName = Dashboard.store.FilterTypes.FILTER_COMPARISON[operator];
                        
                    }else{
                        // Other
                        var labelId = cts.labelEl.id;
                        var operator = cts.filterModel.data.comparison;
                        var propertyName = Dashboard.store.FilterTypes.FILTER_COMPARISON[operator];
                    }
                    
                    try{
                        var operatorName = cts.filterModel.data.configuration.field.label;
                    }catch(ex){
                        throw 'Filter configuration is probably from a version < 2.2.0, please update external_configuration `| error: ' + ex;
                    }
                    
                    if (labels) {
                        labels.forEach(function (labelId) {
                            Ext.create('Ext.tip.ToolTip', {
                                target: labelId,
                                html: operatorName + ': ' + propertyName
                            });
                        });
                        
                    } else {
                        Ext.create('Ext.tip.ToolTip', {
                            target: labelId,
                            html: operatorName + ': ' + propertyName
                        });
                    }
                } catch (ex) {
                    Dashboard.tool.Utilities.error('[Dashboard.view.shared.filtering.getDynamicFilter] Tooltip error :' + ex);
                }
            }
        });
        
        return filterField;

    },
    

    propertyIsValid: function (property){
                
        // Enabled in configuration
        if (property.data.enabledInFilters === false) {
            return false;
        }
        return true;
    },
    
    
    
    getNewFilter: function(){
        
        var list = this.query('component[tag=property]');
        var filter = null;
        
        var value = null;
        var displayValue = null;

        for (var i = 0; i < list.length; i++) {

//            var value = list[i].value;
//            var displayValue = list[i].value;

            if (list[i].xtype === 'datefield') {
                
                if (list[i].rawValue.trim() !== '') {
                    value = Ext.Date.format(list[i].value, 'Y-m-d');
                    displayValue = Ext.Date.format(list[i].value, getText('m/d/Y'));
                } else {
                    value = null;
                }
                
            }else if (list[i].xtype === 'radio') {
                
                if (list[i].value === true) {
                    value = list[i].inputValue;
                    displayValue = list[i].inputValue;
                }
                
            }else if (list[i].xtype === 'checkbox') {
                
                value = list[i].value;
                if (list[i].value === true) {
                    displayValue = getText('yes');
                } else {
                    displayValue = getText('no');
                }
                
            }else if (list[i].fieldType === 'datetimefield') {
                
                var date = list[i].down('field[xtype=datefield]').value;
                var time = list[i].down('field[xtype=timefield]').value;
                value = Ext.Date.format(date, 'Y-m-d') + ' ' + Ext.Date.format(time, 'H:i:s');
                displayValue = Ext.Date.format(date, getText('m/d/Y'))  + ' ' + Ext.Date.format(time, 'H:i:s');
                
            }else{
                
                value = list[i].value;
                displayValue = list[i].value;
            }

            filter = {
                name: list[i].name,
                value: value,
                displayValue: displayValue
            };
        }

        return filter;
    },
    
    
    getInvalidFields: function (){

        var invalidFields = [];

        Ext.suspendLayouts();

        this.down('form').getForm().getFields().filterBy(function (field){
            if (field.validate())
                return;
            invalidFields.push(field);
        });

        Ext.resumeLayouts(true);
        
        var messages = [];

        for (var i = 0; i < invalidFields.length; i++) {
            var text = '';
            if(invalidFields[i].fieldLabel !== undefined){
                text += invalidFields[i].fieldLabel + " > ";
            }
            messages.push( text + invalidFields[i].activeErrors[0]);
        }
        
        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });

        return invalidFields;
    },
    

    getData: function (){
        
        var property = this.down('combo[name=property]').getSelection();
                
        var filterProperty = this.getNewFilter();
        
        if(!filterProperty){
            return null;
        }
        
        var isFilled = this.down('radiogroup[reference = valueFilled]').getValue().valueFilled;
        
        if(!isFilled || !filterProperty.value){
            filterProperty = {
                name: filterProperty.name,
                value: null,
                label: property.data.label + getText('colon') + ' ' + getText('Not filled'),
                displayValue: getText('Not filled')
            };
        }
        
        var data = {
          filter: "DYNAMIC_PROPERTY",
          property: filterProperty.name,
          value: filterProperty.value,
          label: property.data.label + getText('colon') + ' ' + filterProperty.displayValue
        };

        return data;
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
        
    }

});