Ext.define('Dashboard.view.administration.interventionOrder.Create', {
	extend : 'Ext.window.Window',
	xtype : 'interventionOrderCreate',

	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.view.administration.interventionOrder.ReferencesGridPanel' ],

	controller : 'interventionOrderMain',

	layout : 'fit',
	autoShow : false,
	closable : true,
	resizable : true,
	modal : true,
	constrain : true,
	closeAction : 'destroy',
	height : 550,
	iconCls : 'fa fa-ticket',
	plain : true,
	autoScroll : true,
	scrollable : 'y',

	record : null,

	referencesStore : null,

	initComponent : function() {
            
                this.title = getText('Create an intervention order');

		this.referencesStore = Ext.create(Ext.data.Store, {
			fields : [ 'id', 'referenceCode', 'designation', 'productCategoryName', 'type' ]
		});

		var characteristicsPanel = {
			xtype : 'panel',
			border : false,
			title : getText('Intervention order'),
			defaults : {
				labelWidth : 112,
				width : "100%",
				labelSeparator : getText(':')
			},
			items : [ {
				xtype : 'textfield',
				name : 'number',
				fieldLabel : getText('OI Number'),
				allowBlank : false,
                                maxLength : 255,
				listeners : {
					afterrender : function(field) {
						field.focus(false, 100);
					}
				}
			}, {
				xtype : 'textfield',
				name : 'label',
				fieldLabel : getText('Label'),
				maxLength : 255
			}, {
				xtype : 'textarea',
				name : 'description',
				fieldLabel : getText('Description'),
				maxLength : 255
			} ]
		};

		var referencesPanel = {
			xtype : 'panel',
			title : getText('References'),
			reference : 'referencesPanel',
			collapsible : false,
			ui : 'form-panel',

			items : [ {
				xtype : 'container',
				reference : 'references',
				items : {
					xtype : 'grid',
					name : 'referencesGrid',
					store : this.referencesStore,
					multiSelect : true,
					viewConfig : {
						stripeRows : true
					},
					columns : [ {
						text : getText('Reference code'),
						dataIndex : 'referenceCode',
						flex : 1
					}, {
						text : getText('Designation'),
						dataIndex : 'designation',
						flex : 1
					}, {
						text : getText('Category'),
						dataIndex : 'productCategory',
						flex : 1,
                                                renderer: function (productCategory) {
                                                    if (productCategory) {
                                                        return productCategory.name;
                                                    }
                                                    return '';
                                                }
					}, {
						text : getText('Type'),
						dataIndex : 'type',
						flex : 1
					} ],
					height : 400,
					width : '100%'
				}
			}
			// {
			// xtype: 'interventionOrderReferencesGridPanel',
			// height: 400
			// }
			],

			tools : [ {
				xtype : 'button',
				ui : 'indicator',
				scale : 'small',
				iconCls : 'fa fa-plus-circle',
				hidden : false,
				border : false,
				enableToggle : false,
				handler : 'onAssociate'
			}, {
				xtype : 'button',
				ui : 'indicator',
				scale : 'small',
				iconCls : 'fa fa-minus-circle',
				hidden : false,
				border : false,
				enableToggle : false,
				handler : 'onDissociate'
			} ]
		};

		this.items = [ {
			xtype : 'form',
			bodyPadding : 6,
			border : false,
			width : 650,
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
				// anchor: '100%',
				msgTarget : 'side',
				labelSeparator : getText(':')
			},

			items : [ characteristicsPanel, referencesPanel ]
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

		// this.loadReferences();

	},

	loadReferences : function() {

		this.referencesStore = Ext.create('Dashboard.store.References', {
			listeners : {
				scope : this,
				beforeload : function(store, operation, eOpts) {
					// var myFilter = {
					// property: 'interventionOrderIdList',
					// value: data.id,
					// type: 'LONG',
					// comparison: 'EQ'
					// };
					//                    
					// if(!store.getProxy().extraParams.filter){
					// store.getProxy().extraParams.filter = [];
					// }
					//                    
					// store.getProxy().extraParams.filter.push(myFilter);
				},
				load : function(store, operation, eOpts) {
					if (store.getProxy().extraParams.filter) {
						store.getProxy().extraParams.filter = [];
					}
				}
			}
		});

		this.referencesStore.load();

	},

	/**
	 * Method used by the controller to get values
	 * 
	 * @return (object) data encoded to jSon
	 */
	getData : function() {

		var winForm = this.down('form').getForm();
		var values = winForm.getValues();

		var references = this.down('grid').store.data.items;

		if (references) {
			values.productReferenceIds = [];
			Ext.each(references, function(raw) {
				values.productReferenceIds.push(raw.data.id);
			});
		}

		return values;
	}

});
