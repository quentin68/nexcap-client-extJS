/* global Ext  */

Ext.define('Dashboard.view.cartography.CreateRuleController', {
    extend : 'Ext.app.ViewController',
    alias : 'controller.createRule',

    require : ['Dashboard.model.PropertyConfiguration'],

    view : 'createRule',
    filterTypesStore : Ext.create('Dashboard.store.FilterTypes'),

    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onPropertySelected : function(combo) {
	var property = combo.getSelection();
	this.displayFieldForm(property);
    },
    
    onComparisonSelected: function(combo) {
	var comparison = combo.getSelection();
	this.displayValue(comparison);
    },


    onAddNewFilter : function(sender) {

	var form = sender.up('window').down('form').getForm();

	if (!form.isValid()) {

	    Ext.Msg.show({
		title : getText('Warning'),
		message : getText('Form not valid!'),
		buttons : Ext.Msg.OK,
		icon : Ext.Msg.WARNING
	    });
	}

	var data = this.getView().getData();
	this.addNewFilter(data);

    },

    // ==========================================================================
    // Methods
    // ==========================================================================


    displayFieldForm : function(property) {
        
        //dynamicPropertiesContext //propertyConfigurationType

	// cleaning
	var container = this.getView().lookupReference('fieldFormContainer');
	container.removeAll();

	var propertyValueType = property.data.type;
        
	if (propertyValueType === undefined) {
	    Dashboard.tool.Utilities.error('[Dashboard.view.cartography.CreateRuleController.displayFieldForm] problem with property named=' + property.data.name
		    + ' (check property configuration, probably dynamic property not yet configured in web client)');
	    Ext.Msg.alert(getText('Error'), getText('Error occured with rule, check property configuration!'));
	    return;
	}
        
	var filterType = this.filterTypesStore.findRecord('propertyValueType', propertyValueType, 0, false, true, true);
        
	if (filterType === undefined || filterType === null) {
	    Dashboard.tool.Utilities.error('[Dashboard.view.cartography.CreateRuleController.displayFieldForm] property filterType \'' + propertyValueType + '\' unmanaged: id=' + property.data.id
		    + ' name=' + property.data.name);
	    Ext.Msg.alert(getText('Error'), getText('Error occured with filter!'));
	    return;
	}
        
	var operators = filterType.data.operators;
	var filterType = filterType.data.type;
        
	var field;
	if (property.data.control !== undefined) {
	    field = property.data.control.field;
	}
        
	if (field && field.fieldType) {
	    var fieldType = field.fieldType;

	    if (fieldType === 'radio') {
		fieldType = 'combobox';
	    }

	    filterType = this.filterTypesStore.findRecord('fieldType', fieldType, 0, false, true, true).data.type;
	}

//	// If specific filter
//	if (field) {
//	    if (field.fieldType === 'datesrange' || field.fieldType === 'comboitemrefcat') {
//		container.add({
//		    xtype : 'hiddenfield',
//		    name : 'filterType',
//		    value : filterType
//		});
//		return;
//	    }
//	}
        
	var operatorStore = this.buildComparisonStore(operators);

        var valueField = null;
        
        switch(propertyValueType){
            case 'STRING':
                valueField = this.getView().getTextField();
                break;
            case 'INT':
            case 'LONG':
                valueField = this.getView().getIntField();
                break;
            case 'FLOAT':
                valueField = this.getView().getNumberField();
                break;
            case 'DATE':
            case 'DATETIME':
                valueField = this.getView().getDateField();
                break;
            case 'BOOLEAN':
                valueField = this.getView().getBooleanField();
                break;
            default:
                valueField = this.getView().getTextField();
        }
                
//        switch(filterType){
//            case 'TEXT':
//            case 'TEXT_AREA':
//                valueField = this.getView().getTextField();
//                break;
//            case 'INT':
//            case 'LONG':
//                valueField = this.getView().getIntField();
//                break;
//            case 'NUMBER':
//            case 'NUMERIC':
//                valueField = this.getView().getNumberField();
//                break;
//            case 'DATE':
//            case 'DATETIME':
//            case 'DATES_RANGE':
//                valueField = this.getView().getDateField();
//                break;
//            default:
//                valueField = this.getView().getTextField();
//        }
        
        var resultPanel = this.getView().getResultPanel();

	var formComponent = {

	    xtype : 'panel',
	    tag : 'field',
	    referenceHolder : true,
	    // width: '100%',
	    layout : 'anchor',
	    items : [ 
                {
                    xtype: 'hiddenfield',
                    name: 'propertyConfigurationType',
                    value: property.data.propertyConfigurationType
                    
                }, {
                    xtype : 'hiddenfield',
                    name : 'filterType',
                    value : filterType
                }, {
                    xtype : 'combo',
                    name : 'comparison',
                    reference : 'comparison',
                    fieldLabel : getText('Comparison'),
                    displayField : 'label',
                    valueField : 'name',
                    value : 'EQ',
                    editable : false,
                    allowBlank : false,
                    store : operatorStore,
                    scope: this,
                    listeners : {
                        'select' : 'onComparisonSelected'
                    }
                }, 
                valueField,
                resultPanel
                
            ]
	};

	if (formComponent) {
	    container.add(formComponent);
	}
    },
    
    
    displayValue: function(comparison){
        
        //IS_NULL, IS_NOT_NULL, GT, LT, EQ, NE, IN,  CONTAINS, STARTSWITH, ENDSWITH
        //STRING, DATE, NUMERIC, LONG, LIST, BOOLEAN, OBJECT)

        var valueField = this.getView().down('field[name=valueField]');
        
        switch(comparison.data.name){
            case 'IS_NULL':
            case 'IS_NOT_NULL':
                valueField.setVisible(false);
                valueField.setDisabled(true);
                break;
            default:
                valueField.setVisible(true);
                valueField.setDisabled(false);
        }
        
    },
    
    
    buildComparisonStore: function(operators){
        
        var data = [];

	for (var i = 0; i < operators.length; i++) {
	    var item = {
		name : operators[i],
		label : eval('Dashboard.store.FilterTypes.FILTER_COMPARISON.' + operators[i])
	    };
	    data.push(item);
	}

	var operatorStore = Ext.create('Ext.data.Store', {
	    fields : [ 'name', 'label' ],
	    data : data
	});
        
        return operatorStore;
    },


    addNewRule : function(data) {

	var rule = Ext.create('Dashboard.model.cartography.DisplayingRule', data);

	var mainController = this.getView().mainController;
	mainController.addNewRule(rule);

    }

});