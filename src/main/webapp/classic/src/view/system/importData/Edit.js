Ext.define('Dashboard.view.system.importData.Edit', {
	extend : 'Ext.window.Window',
	xtype : 'importEdit',

	requires : [ 'Dashboard.tool.Utilities', 'Dashboard.view.shared.imagesViewer.ThumbnailEditor' ],

	controller : 'importMain',

	layout : 'fit',
	autoShow : false,
	closable : true,
	resizable : true,
	modal : true,
	constrain : true,
	closeAction : 'destroy',
	height : 500,
	iconCls : 'x-fa fa-tag',
	attachmentFilesStore : null,

	record : null,

	initComponent : function() {
            
            this.title = getText('Edit an item');

            this.referencesStore = Ext.create('Dashboard.store.References', {
                autoLoad: true,
                listeners: {
                    scope: this,
                    beforeload: function (store, operation, eOpts) {
                        var myFilter = {
                            property: 'type',
                            value: true, // material item (I don't know why) @Todo check for bug
                            type: 'BOOLEAN',
                            comparison: 'EQ'
                        };

                        store.getProxy().extraParams.filter = [];

                        store.getProxy().extraParams.filter.push(myFilter);
                    },
                    load: function (store, operation, eOpts) {
                        if (store.getProxy().extraParams.filter) {
                            store.getProxy().extraParams.filter = [];
                        }
                    }
                }
            });

                this.attachmentFilesStore = Ext.create(Ext.data.Store, {
                    fields: ['id', 'file']
                });
                
		var characteristicsPanel = {

			title : getText('Item'),
			items : [ {
				xtype : Ext.widget('thumbnailEditor', {
					record : this.record,
					thumbnailSourceType : 'IMPORT'
				})
			}, {
				xtype : 'textfield',
				name : 'name',
				fieldLabel : getText('Name'),
				allowBlank : false,
				// maxLength: 40,
				listeners : {
					afterrender : function(field) {
						field.focus(false, 100);
					}
				}
			}, {
				xtype : 'autocompleteComboBox',
				name : 'productReferenceId',
				reference : 'productReference',
				fieldLabel : getText('Product reference'),
				displayField : 'designation',
				valueField : 'id',
				allowBlank : false,
				queryParam : false, // to remove param "query"
				matchFieldWidth : false,
				store : this.referencesStore,
				listConfig : {
					getInnerTpl : function() {
						return '<b>{designation}</b> | {referenceCode}';
					}
				},
				listeners : {
					'select' : 'onReferenceSelected'
				}
			}, {
				xtype : 'textareafield',
				name : 'description',
				fieldLabel : getText('Description')
			} ]
		};
                
        /*************/
        var attachedFilesSelectionWindow = Ext.create('Dashboard.view.shared.component.AttachedFilesSelection', {
            autoShow: false,
            parentController: this.controller
        });
        
        var attachmentPanel = {
            xtype: 'panel',
            title: getText('File attachments'),
            reference: 'attachmentPanel',
            collapsible: false,
            ui: 'form-panel',
            items: [{
                    xtype: 'container',
                    reference: 'files',
                    items: {
                        xtype: 'grid',
                        name: 'attachmentGrid',
                        store: this.attachmentFilesStore,
                        multiSelect: false,
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {
                                text: getText('Files'),
                                dataIndex: 'name',
                                flex: 2
                            },
                            {
                                text: '',
                                flex: 1,
                                renderer: function (value, metaData, rec, rowIndex, colIndex, store) {
                                    var file = rec.data.file;
                                    var id = rec.data.refId || rec.data.id;
                                    if (rec.data.isSaved) {
                                        var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/IMPORT/' + id + '/' + file;
                                        return '<a style="text-decoration: inherit; color: inherit;" href="' +
                                                path +
                                                '" ><i class="fa fa-download" aria-hidden="true"></i> ' +
                                                getText('Download') +
                                                '</a>';
                                    } else {
                                        return getText('Not synchronized');
                                    }
                                }
                            }
                        ],
                        width: '100%'
                    }
                }],
            tools: [{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: function (sender) {
                        attachedFilesSelectionWindow.show();
                    }
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onDeleteFile'
                }]
        };
        /*************/



		var propertiesPanel = {

			xtype : 'panel',
			title : getText('Properties'),
			reference : 'propertiesPanel',
			bodyPadding : 20,
			ui : 'form-panel',
			defaults : {
				margin : '0 0 12 0',
				submitValue : false,
				labelWidth : 170,
				width : '100%',
				labelSeparator : getText(':')
			},
			items : []

		};

		var traceabilityInformationPanel = {

			name : 'traceabilityInformationPanel',
			title : getText('Traceability information'),
			collapsible : false,
			hidden : false,
			items : [ {
				xtype : 'container',
				name : 'assignedLocationContainer',
				hidden : false,
				anchor : '100%',
				layout : 'anchor',
				items : [ {
					xtype : 'autocompleteComboBox',
					name : 'assignedLocationId',
					anchor : '100%',
					fieldLabel : getText('Assigned location'),
					displayField : 'address',
					valueField : 'id',
					queryParam : false, // to remove param "query"
					filter : [],
					requires : [ 'Dashboard.store.administration.Locations' ],
					store : Ext.create('Dashboard.store.administration.Locations', {
						autoLoad : true,
						sorters : [ {
							property : 'name',
							direction : 'ASC'
						} ]
					})
				} ]
			}, {
				xtype : 'panel',
				name : 'useCountPanel',
				border : false,
				layout : 'hbox',
				margin : '0 0 6 0',
				hidden : false,
				items : [ {
					xtype : 'displayfield',
					name : 'useCountLabel',
					fieldLabel : getText('Use count'),
					flex : 1
				}, {
					xtype : 'button',
					action : 'resetUseCount',
					scope : this,
					handler : this.resetUseCount,
					text : getText('Reset use count'),
					tooltip : getText('Reset use count'),
					margin : '0 0 6 4'
				} ]
			}, {
				xtype : 'hiddenfield',
				name : 'useCount'
			}, {
				xtype : 'textfield',
				name : 'code',
                                id: 'rfid-code-edit',
				fieldLabel : getText('Code'),
				maxLength : 200,
				enableKeyEvents : true,
				selectOnFocus : true,
				afterSubTpl : '<i class="greyLabel">' + getText('Before scanning RFID tag, place your cursor in the above code textfield') + '</i>',
                                listeners:{
                                    'added': function(me){
                                        if(Dashboard.manager.FeaturesManager.isEnabled('OP_ASSOCIATE_TAG')){
                                            me.hidden = false;
                                        }else{
                                            me.hidden = true;
                                        }
                                    }
                                }
			}, {
                          xtype: 'button',
                          iconCls: 'fa fa-tag fa-white',
                          text: 'Scan',
                          iconAlign: 'right',
                           handler: function() {
                                Ext.getCmp('rfid-code-edit').focus();
                           },
                            listeners: {
                                'added': function (me) {
                                    if (Dashboard.manager.FeaturesManager.isEnabled('OP_ASSOCIATE_TAG')) {
                                        me.hidden = false;
                                    } else {
                                        me.hidden = true;
                                    }
                                }
                            }
                        }]
		};

		this.items = [ {
			xtype : 'form',
			referenceHolder : true,
			border : false,
			width : 700,
			height : 650,
			scrollable : 'y',
			defaults : {
				xtype : 'panel',
				ui : 'form-panel',
				bodyPadding : 20,
				border : false,
				width : '100%'
			},
			fieldDefaults : {
				labelWidth : 170,
				width : '100%',
				labelSeparator : getText(':'),
				margin : '0 0 12 0'
			},
			items : [ characteristicsPanel, propertiesPanel, attachmentPanel, traceabilityInformationPanel ]
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
	},

	cleanFields : function() {
		this.down('panel[reference=propertiesPanel]').removeAll();
	},

	addField : function(field) {

		this.down('panel[reference=propertiesPanel]').add(field);
	},

	getProperties : function() {

		var list = this.query('component[tag=property]');
		var materialPropertiesList = [];

		for (var i = 0; i < list.length; i++) {

			var include = true;
			var value = list[i].value;

                        if (list[i].xtype === 'datefield') {
                            // value = Ext.Date.format(list[i].value, 'c');
                            if (list[i].rawValue.trim() !== '') {
                                value = Ext.Date.format(list[i].value, 'Y-m-d'); // yyyy-MM-dd HH:mm
                            } else {
                                value = null;
                            }
                        }

			if (list[i].xtype === 'radio') {
				if (list[i].value === true) {
					value = list[i].inputValue;
				} else {
					include = false;
				}
			}

			if (list[i].fieldType === 'datetimefield') {
				var date = list[i].down('field[xtype=datefield]').value;
				var time = list[i].down('field[xtype=timefield]').value;
				value = Ext.Date.format(date, 'Y-m-d') + ' ' + Ext.Date.format(time, 'H:i:s');
			}

			if (include) {
				materialPropertiesList.push({
					name : list[i].name,
					value : value
				});
			}
		}

		return materialPropertiesList;
	},

	resetUseCount : function() {
            this.down('displayfield[name=useCountLabel]').setValue(0);
	},

	/**
	 * Method used by the controller to get values
	 * 
	 * @return (object) data encoded to jSon
	 */
	getData : function() {

		var winForm = this.down('form').getForm();
		var values = winForm.getValues();

		values.id = this.record.id;
                
                values.name = (values.name).trim();
		values.properties = this.getProperties();

		if (values.code) {
			values.code = {
				"code" : (values.code).toUpperCase(),
				"codeType" : "RFID_TAG"
			};
		} else {
			values.code = null;
		}

		if (!values.assignedLocationId) {
			values.assignedLocationId = -1;
		}

		if (this.record.picture !== undefined && this.record.picture.pictureSourceType === null) {
			delete this.record.picture;
		}

		if (this.record.picture !== undefined && this.record.picture.thumbnailName === '') {
			values.picture = {
				thumbnailName : '',
				pictureName : ''
			};
		}

		return values;
	},

	setData : function(data) {

		this.record = data; // important

		this.down('textfield[name=name]').setValue(data.name);
		this.down('combo[name=productReferenceId]').setValue(data.productReference.id);
		this.down('textareafield[name=description]').setValue(data.description);

		this.down('displayfield[name=useCountLabel]').setValue(data.useCount);
		this.down('hiddenfield[name=useCount]').setValue(data.useCount);

		this.down('combo[name=assignedLocationId]').setValue(data.assignedLocation.id);
                
                var attachmentGrid = this.down('grid[name=attachmentGrid]');
                var attachmentFilesStore = attachmentGrid.getStore();

                if (data.files) {
                    data.files.forEach(function (file) {
                        attachmentFilesStore.add({
                            name: file.slice(15), // remove timestamp & unique random chars
                            file: file,
                            refId: data.id,
                            isSaved: true
                        });
                    });
                }

		if (data.code) {
			this.down('textfield[name=code]').setValue(data.code.code);
		}

		Dashboard.manager.administration.ReferencesManager.getReference(data.productReference.id, this.getController(), 'buildFields');
	},

	/**
	 * Used for update
	 */
	setThumbnail : function(tumb) {
            
		var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
		var img = Ext.ComponentQuery.query('importEdit image[name=thumbnailToEdit]')[0];

		if (tumb !== null) {
			thumbnailSrc = tumb;
		}

		img.setSrc(thumbnailSrc);
	},
        
    /**
     * Override close method to close attachedFilesSelectionWindow when closing this window
     * 
     */
    close: function () {
        var attachedFilesSelectionWindow = Ext.getCmp('attachedFilesSelectionWindow');
        if (attachedFilesSelectionWindow) {
            attachedFilesSelectionWindow.destroy();
        }

        this.callParent(arguments);
    }

});