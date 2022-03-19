/*  global Ext  */

Ext.define('Dashboard.view.shared.filtering.CreateController', {
    extend : 'Ext.app.ViewController',
    alias : 'controller.filteringCreate',

    require : [ 'Dashboard.model.PropertyConfiguration' ],

    view : 'filteringCreate',
    filterTypesStore : Ext.create('Dashboard.store.FilterTypes'),

    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onPropertySelected : function(combo) {
        
	var record = combo.getSelection();
	this.displayFieldForm(record);

    },

    /**
     * Create view handler
     * 
     * @param {type}
     *                sender
     * @returns {undefined}
     */
    onAddNewFilter : function(sender) {

        var win = sender.up('window');
	var form = win.down('form[reference=form]').getForm();

	if (!form.isValid()) {
            win.getInvalidFields();
            return;
	}

	var data = this.getView().getData();
	this.addNewFilter(data);

    },

    // ==========================================================================
    // Methods
    // ==========================================================================

    /**
     * Build filter creation form
     * @param {type} record
     * @returns {undefined}
     */
    displayFieldForm : function(record) {
                
        var filterType = null;

	// cleaning
	var container = this.getView().lookupReference('fieldFormContainer');
	container.removeAll();
                
	var propertyValueType = record.data.type;
        
	if (propertyValueType === undefined || !propertyValueType) {
	    Dashboard.tool.Utilities.error('[Dashboard.view.shared.filtering.CreateController.displayFieldForm] problem with property named=' + record.data.name
		    + ' (check property configuration, probably dynamic property not yet configured in web client)');
	    Ext.Msg.alert(getText('Error'), getText('Error occured with filter, check property configuration!'));
	    return;
	}
                
	filterType = this.filterTypesStore.findRecord('propertyValueType', propertyValueType, 0, false, true, true);
        
	if (filterType === undefined || filterType === null) {
	    Dashboard.tool.Utilities.error('[Dashboard.view.shared.filtering.CreateController.displayFieldForm] property filterType \'' 
                    + propertyValueType + '\' unmanaged: id=' + record.id );
	    Ext.Msg.alert(getText('Error'), getText('Error occured with filter!'));
	    return;
	}
                
	var operators = filterType.data.operators;
        var propertyValueType = filterType.data.propertyValueType;
        
	filterType = filterType.data.type;

	var field;
        
	if (record.data.control !== undefined) {
	    field = record.data.control.field;
	}
        
	if (field && field.fieldType) {
                        
	    var fieldType = field.fieldType;

	    if (fieldType === 'radio') {
		fieldType = 'combobox';// 'textfield'
	    }

            var fieldData = this.filterTypesStore.findRecord('fieldType', fieldType, 0, false, true, true).data;
                        
            if (fieldData.operators) {
                // OVERRIDE TYPE OPERATORS WITH ONES FROM FIELD
                operators = fieldData.operators;
            }
            filterType = fieldData.type;
	}
        

	// If specific filter
	if (field) {
	    if (field.fieldType === 'datesrange' || field.fieldType === 'comboitemrefcat' || field.fieldType === 'datestimerange') {
		container.add({
		    xtype : 'hiddenfield',
		    name : 'filterType',
		    value : filterType
		});
		return;
	    } 
	}
        
        // Code filter
        var codeTypesStore = Ext.create('Dashboard.store.enums.CodeType');
        var showCodeType = false;
         if (field && field.fieldType === 'code') {
	    showCodeType = true;
	}

	var data = [];

	for (var i = 0; i < operators.length; i++) {
	    var item = {
		name : operators[i],
		label : eval('Dashboard.store.FilterTypes.FILTER_COMPARISON.' + operators[i])
	    };
	    data.push(item);
	}

	var operatorStore = Ext.create('Ext.data.Store', {
	    fields : [ 
                'name', 
                'label',
                {
                    name: 'localizedLabel',
                    type: 'string',
                    convert: function(val, record){
                        if (record.data.label) {
                            return getText(record.data.label);
                        }else{
                            return val;
                        }
                    }
                }
                
            ],
	    data : data
	});

	var defaultWidth = null; //full

	if (field && field.width) {
	    defaultWidth = field.width;
	}
        
        var defaultOperator = 'EQ';
        
        if(propertyValueType === 'STRING' && 
                filterType !== 'PROPERTY_CONFIGURATION_TYPE' && 
                filterType !== 'PROPERTY_TYPE' &&
                filterType!=='DEVICE_TYPE' &&
                filterType !== 'VALUE_IS_FILLED'){
            
            defaultOperator = 'CONTAINS';
        }
        

	// TODO if differents forms.
	/*
	 * var formComponent = null;
	 * var filterClass = this.filterTypesStore.findRecord('propertyType', propertyType).data.class;
	 * var filter = Ext.create('Dashboard.view.shared.filtering.'+ filterClass,{ filter: { } });
	 */
	var formComponent = {

	    xtype : 'panel',
	    tag : 'field',
	    referenceHolder : true,
	    // width: '100%',
	    layout : 'anchor',
	    items : [ 
                {
                    xtype : 'textfield',
                    name : 'label',
                    reference : 'label',
                    fieldLabel : getText('Label'),
                    anchor : '100%',
                    value : record.data.label,
                    allowBlank : true
                }, {
                    xtype : 'combo',
                    hidden: !showCodeType,
                    name : 'codeType',
                    reference : 'codeType',
                    fieldLabel : getText('Code type'),
                    displayField : 'localizedLabel',
                    valueField : 'value',
                    //value : 'RFID_TAG',
                    anchor : '100%',
                    editable : false,
                    allowBlank : !showCodeType,
                    store : codeTypesStore,
                    listeners:{
                        scope: this,
                        select: function(combo, record){
                            var label = combo.up('form').down('textfield[name=label]');
                            var codeType = Dashboard.store.enums.CodeType[combo.getValue()+''];
                            label.setValue( getText('Code') +' (' +getText(codeType.label)+ ')' );
                        },
                        render: function(combo, record){
                            if(!combo.hidden){
                                var label = combo.up('form').down('textfield[name=label]');
                                if(!combo.getValue()){
                                    combo.setValue('RFID_TAG');
                                }
                                var codeType = Dashboard.store.enums.CodeType[combo.getValue()+''];
                                label.setValue( getText('Code') +' (' +getText(codeType.label)+ ')' );
                            }
                        }
                    }
                }, {
                    xtype : 'combo',
                    name : 'comparison',
                    reference : 'comparison',
                    fieldLabel : getText('Comparison'),
                    displayField : 'localizedLabel',
                    valueField : 'name',
                    value : defaultOperator,
                    anchor : '100%',
                    editable : false,
                    allowBlank : false,
                    store : operatorStore
                }, {
                    xtype : 'numberfield',
                    fieldLabel : getText('Width'),
                    reference : 'width',
                    name : 'width',
                    value : defaultWidth,
                    maxValue : 1000,
                    minValue : 30
                }, {
                    xtype : 'hiddenfield',
                    name : 'filterType',
                    value : filterType
                } 
            ]
	};

	if (formComponent) {
	    container.add(formComponent);
	}
    },

    /**
     * Mapping data > filter model Add new filter into configuration window
     * 
     * @param {type}
     *                data
     * @returns {undefined}
     */
    addNewFilter : function(data) {
                
        //Listenners : selct comparison
        if(data.comparison === 'FROM_TO'){
            data.type = 'DATES_RANGE';
            data.configuration.field.dataType = 'DATE';
            data.configuration.field.fieldType = 'datefield';
        }

	var filter = Ext.create('Dashboard.model.Filter', data);
                
	var controller = this.getView().mainController;
	controller.addNewFilter(filter);

    }

});