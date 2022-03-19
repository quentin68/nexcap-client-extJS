/* global Ext */

Ext.define('Dashboard.view.shared.viewList.CreateColumn', {
    extend : 'Ext.window.Window',
    xtype : 'viewListCreateColumn',
    requires : [ 'Dashboard.tool.Utilities' ],

    autoShow : false,
    closable : true,
    resizable : true,
    modal : true,
    constrain : true,
    closeAction : 'destroy',
    layout : 'fit',

    controller : 'viewListCreateColumn',
    mainController : null,
    modelProperties : null,

    config : {
	propertiesStore : Ext.create('Dashboard.store.properties.Properties', {
	    autoLoad : false
	}),
	localPropertiesStore : Ext.create('Dashboard.store.properties.LocalProperties')
    },

    initComponent : function() {

	this.title = getText('Column configuration');

	this.getPropertiesStore().on('load', this.onPropertiesLoaded, this);
	this.getPropertiesStore().load();

	var selectPropertyPanel = {
	    xtype : 'panel',
	    title : getText('New property'),
	    reference : 'selectPropertyPanel',
	    iconCls : 'fa fa-info',
	    items : [ {
		xtype : 'combo',//'ux-combo',,
		name : 'property',
		fieldLabel : getText('Property'),
		store : this.getLocalPropertiesStore(),
		queryMode : 'local',
		displayField : 'label',
		valueField : 'name',
		editable : true,
		allowBlank : false,
		forceSelection : true,
		listeners : {
		    scope : this,
		    'select' : 'onPropertySelected'
		}
	    } ]
	};

	var configuration = {
	    xtype : 'panel',
	    title : getText('Configuration'),
	    iconCls : 'fa fa-cog',
	    reference : 'fieldFormContainer',
	    items : []
	};

	var form = {
	    xtype : 'panel',
	    border : false,
	    flex : 1,
	    height : '100%',
	    bodyPadding : '0 0 24 0',
	    scrollable : 'y',

	    defaults : {
		width : '100%',
		ui : 'property-create',
		minHeight : 80,
		bodyPadding : '24',
		layout : 'anchor',
		defaults : {
		    anchor : '100%'
		}
	    },
	    items : [ selectPropertyPanel, configuration ]
	};

	var me = this;
	Ext.apply(me, {

	    items : [ {
		xtype : 'form',
		border : false,
		width : 500,//950,
		height : 350,//600,
		layout : 'hbox',

		items : [ form ],

		buttons : [ {
		    text : getText('Add'),
		    disabled : false,
		    handler : 'onAddNewColumn'
		}, {
		    text : getText('Cancel'),
		    scope : this,
		    handler : this.close
		} ]
	    } ]
	});

	this.callParent(arguments);

    },

    onPropertySelected : function(combo) {

	var record = combo.getSelection();
	this.displayFieldForm(record);

    },

    displayFieldForm : function(record) {
                
	//cleaning
	var container = this.lookupReference('fieldFormContainer');
	container.removeAll();
	var isDynamic = record.data.propertyConfigurationType;
                
        var textValue = record.data.label;
        var codeTypesStore = Ext.create('Dashboard.store.enums.CodeType');
        var showCodeType = false;
        if(record.data.field && record.data.field.fieldType === 'code'){
            showCodeType = true;
            textValue = getText('RFID Tag');
        }
        
	var formComponent = {

	    xtype : 'panel',
	    tag : 'field',
	    referenceHolder : true,
	    width : '100%',
	    layout : 'anchor',
	    items : [ //add font color, font weigth, font size
	    {
                xtype : 'combo',
                hidden: !showCodeType,
                name : 'codeType',
                reference : 'codeType',
                fieldLabel : getText('Code type'),
                displayField : 'localizedLabel',
                valueField : 'value',
                anchor : '100%',
                editable : false,
                allowBlank : true,
                store : codeTypesStore,
                listeners:{
                    scope: this,
                    select: function(combo, record){
                        var label = combo.up('form').down('textfield[name=text]');
                        var codeType = Dashboard.store.enums.CodeType[combo.getValue()+''];
                        label.setValue( getText(codeType.label));
                    },
                    render: function(combo, record){
                        if(!combo.hidden){
                            var label = combo.up('form').down('textfield[name=text]');
                            if(!combo.getValue()){
                                combo.setValue('RFID_TAG');
                            }
                            var codeType = Dashboard.store.enums.CodeType[combo.getValue()+''];
                            label.setValue( getText(codeType.label) );
                        }
                    }
                }
            }, {
		xtype : 'textfield',
		name : 'text',
		fieldLabel : getText('Title'),
		reference : 'text',
		value : textValue,
		anchor : '100%'
	    }, {
		xtype : 'textfield',
		name : 'propertyName',
		reference : 'propertyName',
		value : record.data.name,
		hidden : true
	    }, {
		xtype : 'numberfield',
		name : 'width',
		fieldLabel : getText('Width'),
		reference : 'width',
		allowDecimals : false,
		value : 200,
		maxValue : 600,
		minValue : 30
	    }, {
		xtype : 'checkboxfield',
		name : 'flex',
		fieldLabel : getText('Size auto'),
		inputValue : true,
		checked : false,
		listeners : {
		    change : function(me, eOpts) {
			var widthField = me.up('form').down('numberfield[name=width]');
			widthField.setDisabled(eOpts);
		    }
		}
	    }, {
		xtype : 'checkboxfield',
		name : 'cellWrap',
		fieldLabel : getText('Cell wrap'),
		inputValue : true,
		checked : true
	    }, {
		xtype : 'checkboxfield',
		name : 'sortable',
		fieldLabel : getText('Sortable'),
		inputValue : false,
		hidden : false,//isDynamic ? true : false,
		checked : true
	    }, {
		xtype : 'checkboxfield',
		name : 'hidden',
		fieldLabel : getText('Hidden'),
		inputValue : true,
		checked : false
	    }, {
		xtype : 'checkboxfield',
		name : 'lockable',
		fieldLabel : getText('Lockable'),
		inputValue : true,
		checked : true
	    }, {
		xtype : 'checkboxfield',
		name : 'locked',
		fieldLabel : getText('Locked'),
		inputValue : true,
		checked : false
	    } ]
	};

	if (formComponent) {
	    container.add(formComponent);
	}
    },

    onPropertiesLoaded : function() {

	this.getLocalPropertiesStore().clearData();

	for (var i = 0; i < this.modelProperties.length; i++) {
	    if (!this.modelProperties[i].filterOnly) {
		this.getLocalPropertiesStore().add(this.modelProperties[i]);
	    }
	}
        
        var currentFeatureName = Dashboard.manager.FeaturesManager.currentFeature.data.name;
        var FEATURES_WITH_PROPS = ['MAT_ADMIN', 'MAT_INVENTORY', 'REF_MAT_ADMIN', 'MATERIALS_SETS_INVENTORY', 'USER_ADMIN'];

	if (FEATURES_WITH_PROPS.indexOf(currentFeatureName) > -1) {
	    var records = this.getPropertiesStore().getRange();
	    if (records.length > 0) {
		for (var j = 0; j < records.length; j++) {
		    var property = records[j];
                                       
                    if ((currentFeatureName === 'REF_MAT_ADMIN' || currentFeatureName === 'MATERIALS_SETS_INVENTORY')
                            && property.data.propertyConfigurationType !== 'PRODUCTREFERENCE') {
                        continue;
                    }

                    if ((currentFeatureName === "MAT_ADMIN" || currentFeatureName === "MAT_INVENTORY")
                            && property.data.propertyConfigurationType !== 'MATERIAL') {
                        continue;
                    }

                    if (currentFeatureName === "USER_ADMIN" && property.data.propertyConfigurationType !== 'USER') {
                        continue;
                    }
                                   
                    var enabledInTables = true;
                    if (property.data.enabledInTables !== undefined) {
                        enabledInTables = property.data.enabledInTables;
                    } else {
                        var control = Dashboard.model.PropertyConfiguration.getControl(property.data);
                        if (control !== undefined && control.configuration.enabledInTables !== undefined) {
                            enabledInTables = control.configuration.enabledInTables;
                        }
                    }
                    
		    if (enabledInTables !== false) {
			this.getLocalPropertiesStore().add(property);
		    }
		}
	    }
	}
    },

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data
     */
    getData : function() {
        
	var data = {};
  
	//data.property = this.down('combo[name=property]').getSelection();
        if(this.down('field[name=codeType]').hidden === false){
            data.codeType = this.down('field[name=codeType]').getValue();
            if(!data.codeType){
                data.codeType = 'RFID_TAG';
            }
        }
        
	data.text = this.down('field[name=text]').getRawValue();
	data.width = this.down('field[name=width]').getValue();
	data.flex = this.down('field[name=flex]').checked;
	data.cellWrap = this.down('field[name=cellWrap]').checked;
	data.sortable = this.down('field[name=sortable]').checked;
	data.hidden = this.down('field[name=hidden]').checked;
	data.lockable = this.down('field[name=lockable]').checked;
	data.locked = this.down('field[name=locked]').checked;
        data.type = this.down('combo[name=property]').getSelection().data.type;
	var dataIndex = null;
	if (this.down('combo[name=property]').getSelection().data.propertyConfigurationType) {
	    dataIndex = 'properties';
	    data.renderer = Ext.Function.pass(this.getPropertyValue, [ this.down('combo[name=property]').getValue() ]);
	    data.propertyName = this.down('field[name=propertyName]').getValue();
	    data.isDynamic = true;
	} else {
	    dataIndex = this.down('combo[name=property]').getValue();
	    //data.propertyName = data.text;
	}
	data.dataIndex = dataIndex;
        data.renderer = this.down('combo[name=property]').getSelection().data.renderer;
        
	try {
	    data.property = {
		name : this.down('combo[name=property]').getSelection().data.name,
		type: this.down('combo[name=property]').getSelection().data.field.dataType || this.down('combo[name=property]').getSelection().data.field.fieldType
	    //type: this.down('combo[name=property]').getSelection().data.type
	    };
	} catch (ex) {
	    // nothing
	}
        
	return data;
    },

    getPropertyValue : function(propertyName, properties, metaData, record) {
	var val;
	if (properties[(propertyName)]) {
	    val = properties[(propertyName)].value;
	}
	return val;
    }

});