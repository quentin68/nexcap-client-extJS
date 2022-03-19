Ext.define('Dashboard.view.administration.stocks.Edit', {
	extend : 'Ext.window.Window',
	xtype : 'stocksEdit',

	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.view.shared.imagesViewer.ThumbnailEditor' ],

	controller : 'stocksMain',

	layout : 'fit',
	autoShow : false,
	closable : true,
	resizable : true,
	modal : true,
	constrain : true,
	closeAction : 'destroy',
	height : 550,
	iconCls : 'fa fa-battery-half',
	plain : true,
	autoScroll : true,
	scrollable : 'y',

	record : null,

	profilesList : [],
	profilesStore : null,
	triggersStore : null,
	daysStore : null,
	controlStore : null,

	initComponent : function() {
            
            this.title = getText('Edit a stock level monitoring');

		var characteristicsPanel = {

			xtype : 'panel',
			bodyPadding : 20,
			ui : 'form-panel',

			defaults : {
				labelWidth : 112,
				width : '100%',
				labelSeparator : getText(':'),
				margin : '0 0 12 0'
			},
			items : [ {
				xtype : 'displayfield',
				name : 'productCategoryName',
				fieldLabel : getText('Category'),
				width : 500,
				submitValue : true
			}, {
				xtype : 'displayfield',
				name : 'productReferenceCode',
				fieldLabel : getText('Ref. Code'),
				submitValue : true
			}, 
			{
				xtype : 'displayfield',
				name : 'productReferenceDesignation',
				fieldLabel : getText('Designation'),
				width : 500,
				submitValue : true
			}, 	
			
			{
				xtype : 'displayfield',
				name : 'address',
				fieldLabel : getText('Address'),
				width : 500
			},
			
			{
				xtype : 'numberfield',
				name : 'minLevel',
				fieldLabel : getText('Lower threshold'),
				anchor : '50%',
				allowBlank : false,
				width : 500,
				minValue : 0,
				blankText : getText('At least one threshold must be filled'),
                                validator: function (value) {
                                    var minValue = parseInt(value, 10);
                                    var maxValItem = Ext.ComponentQuery.query('[name=maxLevel]'); 
                                    var thisField = Ext.ComponentQuery.query('[name=minLevel]');
                                    thisField = thisField[thisField.length - 1];
                                    thisField.setValue(minValue);
                                    
                                    maxValItem = maxValItem[maxValItem.length - 1];
                                    var maxValue = parseInt(maxValItem.getRawValue(), 10);
                                    
                                    maxValItem.clearInvalid();
                                    thisField.clearInvalid();
                                    // No problem with bounderies 
                                    if (isNaN(maxValue) || isNaN(minValue)) {
                                        return true;
                                    }
                                    return (maxValue >= minValue) ? true : getText('Min value can\'t be greater than Max value');
                                }
			}, {
				xtype : 'numberfield',
				name : 'maxLevel',
				fieldLabel : getText('Higher threshold'),
				anchor : '50%',
				width : 500,
				allowBlank : false,
				minValue : 0,
				blankText : getText('At least one threshold must be filled'),
                                validator: function (value) {
                                    var maxValue = parseInt(value, 10);
                                    var minValItem = Ext.ComponentQuery.query('[name=minLevel]');
                                    var thisField = Ext.ComponentQuery.query('[name=maxLevel]');
                                    thisField = thisField[thisField.length - 1];
                                    thisField.setValue(maxValue);
                                    
                                    minValItem = minValItem[minValItem.length - 1];
                                    var minValue = parseInt(minValItem.getRawValue(), 10);
                                    
                                    minValItem.clearInvalid();
                                    thisField.clearInvalid();
                                    // No problem with bounderies
                                    if (isNaN(maxValue) || isNaN(minValue)) {
                                        return true;
                                    }
                                    return (maxValue >= minValue) ? true : getText('Min value can\'t be greater than Max value');
                                }
			},
			{
                  xtype: 'numberfield',
                    name: 'secuLevel',
                    fieldLabel: getText('Safe threshold'),
                    anchor: '50%',
                    allowBlank: false,
                    minValue: 0
                },
			
			{	
				xtype : 'hidden',
				name : 'productReferenceId',
				submitValue : true
			}, 
						{	
				xtype : 'hidden',
				name : 'fromView',
				submitValue : true
			}, 
			
			 ]
		};

		this.items = [ {
			xtype : 'form',
			bodyPadding : 6,
			border : false,
			width : 600,
			frame : true,
			referenceHolder : true,
			autoScroll : true,
			scrollable : 'y',

			defaults : {
				bodyPadding : 20,
				ui : 'form-panel'
			},

			fieldDefaults : {
				labelWidth : 112,
				width : 300,
				msgTarget : 'side',
				labelSeparator : getText(':')
			},

			items : [ characteristicsPanel ]
		} ];

		this.buttons = [ {
			text : getText('Save'),
			action : 'save'
		}, {
			text : getText('Cancel'),
			scope : this,
			handler : this.close
		} ];

		this.callParent(arguments);
		this.setData(this.record);

	},

	/**
	 * Method stocks by the controller to get values
	 * 
	 * @return (object) data encoded to jSon
	 */
	getData : function() {

		var winForm = this.down('form').getForm();
		var values = winForm.getValues();

		values.id = this.record.id;
		return values;
	},

	setData : function(data) {

		this.down('form').getForm().setValues(data);
	}

});