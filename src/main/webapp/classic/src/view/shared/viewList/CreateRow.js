Ext.define('Dashboard.view.shared.viewList.CreateRow', {
    extend : 'Ext.window.Window',
    xtype : 'viewListCreateRow',
    requires : [ 'Dashboard.tool.Utilities' ],

    autoShow : false,
    closable : true,
    resizable : true,
    modal : true,
    constrain : true,
    closeAction : 'destroy',
    layout : 'fit',

    controller : 'viewListCreateRow',
    rowType : null,
    mainController : null,
    modelProperties : null,

    config : {
	propertiesStore : Ext.create('Dashboard.store.properties.Properties', {
	    autoLoad : false
	}),
	localPropertiesStore : Ext.create('Dashboard.store.properties.LocalProperties')
    },

    initComponent : function() {

	this.title = getText('Row configuration');

	this.getPropertiesStore().on('load', this.onPropertiesLoaded, this);
	this.getPropertiesStore().load();

	var selectPropertyPanel = {
	    xtype : 'panel',
	    title : getText('New information'),
	    reference : 'selectPropertyPanel',
	    iconCls : 'fa fa-info',
	    items : [ {
		xtype : 'combo',//'ux-combo',
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
		    //handler: 'onAddNewRow'
		    listeners : {
			scope : this,
			click : function(me, e, eOpts) {
			    this.getController().onAddNewRow(me, this.rowType);
			}
		    }
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

	var formComponent = {

	    xtype : 'panel',
	    tag : 'field',
	    referenceHolder : true,
	    width : '100%',
	    layout : 'anchor',
	    items : [ //add font color, font weigth, font size
	    {
		xtype : 'textfield',
		name : 'label',
		fieldLabel : getText('Label'),
		reference : 'label',
		value : record.data.label,
		anchor : '100%'
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

	//TODO filter remote properties by feature
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

	data.property = this.down('combo[name=property]').getValue();
	data.label = this.down('field[name=label]').getRawValue();
	data.fit = true;
	data.style = 'color:black; font-size:12px;';
	data.type = this.down('combo[name=property]').getSelection().data.type;

	if (this.down('combo[name=property]').getSelection().data.propertyConfigurationType) {
	    data.isDynamic = true;
	}

	return data;
    }

});