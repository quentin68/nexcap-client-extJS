/* global Ext */

Ext.define('Dashboard.view.administration.reference.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'referenceEdit',

    requires: ['Dashboard.tool.Utilities', 'Dashboard.view.shared.imagesViewer.ThumbnailEditor'],

    controller: 'referenceMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'fa fa-archive',

    propertyPanelInEdition: null,

    record: null,
    locationsStore: null,
    attachmentFilesStore: null,

    initComponent: function () {

        this.title = getText('Edit a product reference');

        this.categoriesStore = Ext.create('Dashboard.store.Categories', {
            autoLoad: true
        });

        this.locationsStore = Ext.create(Ext.data.Store, {
            fields: [
                'id', 
                'address', 
                'parentPosition' //shop
            ]
        });

        this.attachmentFilesStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'file']
        });
        
        this.codesStore = Ext.create(Ext.data.Store, {
            fields: ['code', 'codeType', 'codeTypeLabel']
        });

        var characteristicsPanel = {
            xtype: 'panel',
            title: getText('Product reference'),
            bodyPadding: 20,
            ui: 'form-panel',
            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':'),
                margin: '0 0 12 0'
            },
            items: [
                {
                    xtype: Ext.widget('thumbnailEditor', {
                        record: this.record,
                        thumbnailSourceType: 'PRODUCT_REFERENCE'
                    })
                }, {
                    xtype: 'textfield',
                    name: 'designation',
                    fieldLabel: getText('Designation'),
                    allowBlank: false,
                    maxLength: 255,
                    listeners: {
                        afterrender: function (field) {
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'referenceCode',
                    fieldLabel: getText('Reference code'),
                    allowBlank: false,
                    maxLength: 255,
                    listeners: {
                        afterrender: function (field) {
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'productCategoryId',
                    reference: 'category',
                    fieldLabel: getText('Category'),
                    displayField: 'fullPath',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false, // to remove param "query"
                    matchFieldWidth: false,
                    store: this.categoriesStore,
                    listeners: {
                        'select': 'onCategorySelected',
                        beforequery: function (qe) {
                            qe.combo.tpl = '<tpl for="."><div class="x-boundlist-item">{path}/<b>{name}</b></div></tpl>';
                        }
                    }
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: getText('Type'),
                    allowBlank: true,
                    enabled: false,
                    columns: 2,
                    vertical: true,
                    items: [
                        {
                            boxLabel: getText('Item'),
                            name: 'identified',
                            tag: 'itemRadio',
                            inputValue: 'true',
                            disabled: true

                        }, {
                            boxLabel: getText('Materials set'),
                            name: 'identified',
                            tag: 'itemSetRadio',
                            inputValue: 'false',
                            disabled: true
                        }
                    ]
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                }
            ]
        };
        

        var traceabilityInformationPanel = {
            name: 'traceabilityInformationPanel',
            title: getText('Traceability information'),
            collapsible: false,
            hidden: false,
            ui: 'form-panel',
            listeners: {
                'added': function(me){
                    if (Dashboard.manager.FeaturesManager.isEnabled('OP_ASSOCIATE_TAG')) {
                        me.hidden = false;
                    } else {
                        me.hidden = true;
                    }
                }
            },
            items: [
                {
                    xtype: 'container',
                    reference: 'codes',
                    items: {
                        xtype: 'grid',
                        name: 'codesGrid',
                        store: this.codesStore,
                        multiSelect: true,
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {
                                text: getText('Type'),
                                dataIndex: 'codeTypeLabel',
                                flex: 1
                            }, {
                                text: getText('Code'),
                                dataIndex: 'code',
                                flex: 3
                            }
                        ],
                        //height: 400,
                        width: '100%'
                    }
                }

            ],
            tools: [
                {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAddCode'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onDeleteCode'
                }
            ]
        };  
        

        var locationsPanel = {
            xtype: 'panel',
            title: getText('Assigned locations'),
            reference: 'locationsPanel',
            collapsible: false,
            ui: 'form-panel',
            items: [{
                    xtype: 'container',
                    reference: 'locations',
                    items: {
                        xtype: 'grid',
                        name: 'locationsGrid',
                        store: this.locationsStore,
                        multiSelect: true,
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [{
                                text: getText('Address'),
                                dataIndex: 'address',
                                flex: 1
                            }],
                        height: 400,
                        width: '100%'
                    }
                }
                // {
                // xtype: 'interventionOrderReferencesGridPanel',
                // height: 400
                // }
            ],
            tools: [{
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onAddLocation'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onDeleteLocation'
                }]
        };

        /*************/
        var attachedFilesSelectionWindow = Ext.create('Dashboard.view.shared.component.AttachedFilesSelection', {
            autoShow: false,
            parentController: this.controller,
            managedFolders: false
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
                        reference: 'filesGrid',
                        frame: true,
                        name: 'attachmentGrid',
                        store: this.attachmentFilesStore,
                        multiSelect: false,
                        width: '100%',
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {
                                text: getText('Files'),
                                dataIndex: 'name',
                                flex: 2
                            }, {
                                text: '',
                                sortable: false,
                                menuDisabled: true,
                                hideable: false,
                                'cfg-draggable': false,
                                groupable: false,
                                focusable: false,
                                flex: 1,
                                renderer: function (value, metaData, rec, rowIndex, colIndex, store) {
                                    
                                    if (rec.data.isSaved) {
                                        return '';
                                    } else {
                                        return getText('Not synchronized');
                                    }
                                }
                            }, {
                                xtype: 'actioncolumn',
                                width: 50,
                                items: [
                                    {
                                        //xtype: 'button',
                                        iconCls: 'x-fa fa-download',
                                        text: getText('Download'),
                                        tooltip: getText('Download'),
                                        isDisabled: function( view, rowIndex, colIndex, item, record ) {
                                            return record.get('isSaved') === true ? false : true;
                                        },
                                        handler: function (grid, rowIndex, colIndex){

                                            var rec = grid.getStore().getAt(rowIndex);
                                            var file = rec.data.file;
                                            var id = rec.data.refId;

                                            if (rec.data.isSaved) {

                                                var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/PRODUCT_REFERENCE/' + id;
                                                path += '/' + encodeURI(file);

                                                Ext.Ajax.request({
                                                    scope: this,
                                                    binary: true,
                                                    url: path,
                                                    success: function (response){
                                                        var blob = new Blob([response.responseBytes], {
                                                            type: 'application/octet-stream'
                                                        });
                                                        //url = window.URL.createObjectURL(blob);
                                                        saveAs(blob, file);
                                                    }
                                                });
                                            }
                                        }
                                    }
                                ]//items
                            }
                        ]
                    }
                }
            ],
            tools: [
                {
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
                }
            ]
        };
        
        var propertiesPanel = {
            xtype: 'panel',
            title: getText('Properties'), // getText('Inherited properties'),
            reference: 'propertiesPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            defaults: {
                margin: '0 0 12 0',
                submitValue: false
            },
            items: []
        };

        var referencePropertiesPanel = {
            xtype: 'panel',
            title: getText('References properties'),
            reference: 'referencePropertiesPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            hidden: !Dashboard.manager.FeaturesManager.isEnabled('DYNAMIC_PROPERTIES_ADMIN'),
            items: [],
            tools: [{
                    xtype: 'button',
                    scale: 'small',
                    iconCls: 'fa fa-search-plus',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onAssignReferenceProperty',
                    cls: 'btnAssignProp'
                }, {
                    xtype: 'button',
                    // ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onCreateReferenceProperty'
                }]
        };

        var materialPropertiesPanel = {
            xtype: 'panel',
            title: getText('Items properties'),
            reference: 'materialPropertiesPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            hidden: !Dashboard.manager.FeaturesManager.isEnabled('DYNAMIC_PROPERTIES_ADMIN'),
            items: [],
            tools: [
                {
                    xtype: 'button',
                    scale: 'small',
                    iconCls: 'fa fa-search-plus',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onAssignMaterialProperty',
                    cls: 'btnAssignProp'
                }, {
                    xtype: 'button',
                    // ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onCreateMaterialProperty'
                }
            ]
        };

        this.items = [
            {
                xtype: 'form',
                referenceHolder: true,
                border: false,
                width: 700,
                height: 650,
                scrollable: 'y',
                defaults: {
                    xtype: 'panel',
                    ui: 'form-panel',
                    bodyPadding: 20,
                    border: false,
                    width: '100%'
                },
                fieldDefaults: {
                    labelWidth: 112,
                    width: '100%',
                    labelSeparator: getText(':'),
                    margin: '0 0 12 0'
                },
                items: [
                    characteristicsPanel,
                    propertiesPanel,
                    materialPropertiesPanel,
                    referencePropertiesPanel,
                    traceabilityInformationPanel,
                    attachmentPanel,
                    locationsPanel
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },

    // Add reference's proprerties defined from categories
    addField: function (field) {
        this.down('panel[reference=propertiesPanel]').add(field);
    },

    removeAllFields: function () {
        var propertiesPanel = this.down('panel[reference=propertiesPanel]');
        propertiesPanel.items.items.forEach(function (item) {
            propertiesPanel.remove(item);
        });
    },

    // Add properties defined from references 
    addProperty: function (propertyConfModel) {
        var panel;

        if (propertyConfModel.data.propertyConfigurationType === 'PRODUCTREFERENCE') {
            panel = this.down('panel[reference=referencePropertiesPanel]');
            try {
                var control = Dashboard.model.PropertyConfiguration.getControl(propertyConfModel.data);
                var field = this.getController().generateFieldInput(control, propertyConfModel.data);
                this.addField(field, true);
            } catch (ex) {
                Dashboard.tool.Utilities.error('[reference.Edit.addProperty] Add field error : ' + ex);
            }
        } else if (propertyConfModel.data.propertyConfigurationType === 'MATERIAL') {
            panel = this.down('panel[reference=materialPropertiesPanel]');
        }

        var properyPanel = this.buildProperty(propertyConfModel);
        
        for(var i=0; i< panel.items.items.length; i++){
            var item = panel.items.items[i];
            
            var serverName = properyPanel.record.data.name;
            var newName = Dashboard.tool.Utilities.stringCompacted(item.record.data.name);
                      
            if(serverName === newName){
                Ext.Msg.show({
                    title: getText('Warning'),
                    msg: getText('Dynamic property already exists')+ getText(':') + item.record.data.label ,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.WARNING
                });
                return;
            }
        }
        
        panel.add(properyPanel);
    },

    // Update properties defined from references
    updateProperty: function (propertyConfModel) {
        var panel = null;

        if (propertyConfModel.data.propertyConfigurationType === 'PRODUCTREFERENCE') {
            panel = this.down('panel[reference=referencePropertiesPanel]');
        } else if (propertyConfModel.data.propertyConfigurationType === 'MATERIAL') {
            panel = this.down('panel[reference=materialPropertiesPanel]');
        }

        if (panel === null || panel === undefined) {
            Dashboard.tool.Utilities.error('[reference.Edit.updateProperty] PropertiesPanel is not found');
            return;
        }

        try {
            // replace item in panel
            var newProperyPanel = this.buildProperty(propertyConfModel);
            var position = panel.items.indexOf(this.propertyPanelInEdition);
            panel.insert(position, newProperyPanel);
            panel.remove(this.propertyPanelInEdition, true);
            panel.updateLayout();
        } catch (ex) {
            Dashboard.tool.Utilities.error('[reference.Edit.updateProperty] replace item in panel error : ' + ex);
        }

        try {
            // Replace property field
            if (propertyConfModel.data.propertyConfigurationType === 'PRODUCTREFERENCE') {
                var propertiesPanel = this.down('panel[reference=propertiesPanel]');
                for (var i = 0; i < propertiesPanel.items.items.length; i++) {
                    if (propertiesPanel.items.items[i].items.items['0'].name === propertyConfModel.data.name) {
                        var control = Dashboard.model.PropertyConfiguration.getControl(propertyConfModel.data);
                        var field = this.getController().generateFieldInput(control, propertyConfModel.data);

                        propertiesPanel.items.items[i].items.items['0'].ownerCt.remove(propertiesPanel.items.items[i].items.items['0']);
                        propertiesPanel.insert(i, field);
                        propertiesPanel.updateLayout();
                        break;
                    }
                }
            }
        } catch (ex) {
            Dashboard.tool.Utilities.error('[reference.Edit.updateProperty] replace field in panel error : ' + ex);
        }

        this.propertyPanelInEdition = null;
    },

    //get properties defined for materials
    getMaterialProperties: function () {

        var list = this.down('panel[reference=materialPropertiesPanel]').query('panel[name=dynamicProperty]');
        var materialPropertyConfigurationList = [];

        for (var i = 0; i < list.length; i++) {
            var id = list[i].query('field[name=dynamicPropertyId]')[0].value;
            var name = list[i].query('field[name=dynamicPropertyName]')[0].value;
            materialPropertyConfigurationList.push({
                id: id,
                name: name
            });
        }

        return materialPropertyConfigurationList;
    },

    buildProperty: function (model) {

        var label = model.data.label;
        var isControlUndefined = Dashboard.model.PropertyConfiguration.getControl(model.data) === undefined;

        var property = Ext.create('Ext.panel.Panel', {
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'dynamicProperty',
            record: model,
            defaults: {
                submitValue: false,
                flex: 1,
                xtype: 'button',
                width:24,
                height:24,
                scale:'small',
                border: false,
                enableToggle: false
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'dynamicPropertyId',
                    value: model.data.id
                }, {
                    xtype: 'hiddenfield',
                    name: 'dynamicPropertyName',
                    value: model.data.name
                }, {
                    xtype: 'displayfield',
                    name: 'label',
                    value: (label ? label : '') + (isControlUndefined ? '<span class="fa fa-exclamation-triangle" style="margin-left:10px; color:red;"/>' : '')
                }, {
                    name: 'upArrow',
                    ui: 'indicator',
                    iconCls: 'fa-arrow-circle-o-up',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            button.up('window').getController().onUpFilter(button, button.up('panel'));
                        }
                    }
                }, {
                    name: 'downArrow',
                    ui: 'indicator',
                    iconCls: 'fa-arrow-circle-o-down',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            button.up('window').getController().onDownFilter(button, button.up('panel'));
                        }
                    }
                }, {
                    ui: 'indicator-font-icon-button-edit',
                    name: 'editButton',
                    iconCls: 'fa fa-pencil',
                    // hidden: !model.data.isEditable,
                    scope: this,
                    flex: 0,
                    listeners: {
                        scope: this,
                        click: function (button, event, eOpts) {
                            this.propertyPanelInEdition = button.up('panel');
                            button.up('window').getController().onEditProperty(button, button.up('panel').record);
                        }
                    }
                }, {
                    ui: 'indicator-font-icon-button-minus',
                    name: 'minusButton',
                    iconCls: 'fa fa-minus-circle',
                    scope: this,
                    disabled: model.data.isSystem,
                    flex: 0,
                    listeners: {
                        scope: this,
                        click: function (button, event, eOpts) {
                            this.confirmRemoveProperty(button.up('panel[name=dynamicProperty]'));
                        }
                    }
                }]
        });

        return property;
    },

    confirmRemoveProperty: function (property) {

        var name = property.record.data.name;

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to dissociate property ') + " \"" + name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.removeProperty(property);
                }
            }
        });

    },

    removeProperty: function (property) {
        property.ownerCt.remove(property);

        if (property.record.data.propertyConfigurationType === 'PRODUCTREFERENCE') {
            // Remove input fild
            var propertiesPanel = this.down('panel[reference=propertiesPanel]');
            for (var i = 0; i < propertiesPanel.items.items.length; i++) {
                try {
                    if (propertiesPanel.items.items[i].items.items['0'].name === property.record.data.name) {
                        propertiesPanel.items.items[i].items.items['0'].ownerCt.remove(propertiesPanel.items.items[i].items.items['0']);
                        break;
                    }
                } catch (ex) {
                    Dashboard.tool.Utilities.error('[reference.Edit.removeProperty] error : ' + ex);
                }
            }
        } else {
            // this.getController().doDeleteProperty(property.record);
            this.getController().updateCategory(this);
        }
    },

    // get inherited valorised properties from categories
    getProperties: function () {
        var list = this.down('panel[reference=propertiesPanel]').query('component[tag=property]');

        var propertiesList = [];

        for (var i = 0; i < list.length; i++) {
            var include = true;
            var value = list[i].value;

            if (list[i].xtype === 'datefield') {
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
                var date = list[i].down('field[xtype=datefield]').getValue();
                var time = list[i].down('field[xtype=timefield]').getValue();
                if(date){
                    value = Ext.Date.format(date, 'Y-m-d') + ' ' + Ext.Date.format(time, 'H:i:s');
                }else{
                    value = null;
                }
            }

            if (include) {
                propertiesList.push({
                    name: list[i].name,
                    value: value
                });
            }
        }
        return propertiesList;
    },

    // Get properties defined within the reference    
    getProductReferencePropreties: function () {
        try {
            var list = this.down('panel[reference=referencePropertiesPanel]').query('panel[name=dynamicProperty]');
            var productReferencePropertyConfigurationList = [];
            for (var i = 0; i < list.length; i++) {
                var id = list[i].query('field[name=dynamicPropertyId]')[0].value;
                var name = list[i].query('field[name=dynamicPropertyName]')[0].value;
                productReferencePropertyConfigurationList.push({
                    id: id,
                    name: name
                });
            }
            return productReferencePropertyConfigurationList;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[reference.Edit.getProductReferencePropreties] error : ' + ex);
            return [];
        }
    },

    // Build self defined fields
    setRefrenceFields: function () {
        var data = this.record;
        Ext.each(data.productReferencePropertyConfigurationList, function (propertyConf) {
            var property = Ext.create('Dashboard.model.PropertyConfiguration', propertyConf);
            this.addProperty(property);
        }, this);
    },

    setData: function (data) {

        this.record = data; // important

        this.down('textfield[name=designation]').setValue(data.designation);
        this.down('textfield[name=referenceCode]').setValue(data.referenceCode);
        
        //this.down('combo[name=productCategoryId]').setValue(data.productCategory.id);
        this.down('combo[name=productCategoryId]').setRawValue(data.productCategory.fullPath);
        this.down('combo[name=productCategoryId]').doQuery(data.productCategory.fullPath, false, true);
        this.down('combo[name=productCategoryId]').blur();
        
        this.down('textareafield[name=description]').setValue(data.description);

        if (data.identified) {
            this.down('radio[tag=itemRadio]').setValue(true);
            
            if(Dashboard.manager.FeaturesManager.isEnabled('DYNAMIC_PROPERTIES_ADMIN')){
                this.down('panel[reference=materialPropertiesPanel]').setHidden(false);                                  
            }

        } else {
            this.down('radio[tag=itemSetRadio]').setValue(true);
            this.down('panel[reference=materialPropertiesPanel]').setHidden(true);
        }

        // this.down('combo[name=assignedLocation]').setValue(data.assignedLocation.id);

        var locationsGrid = this.down('grid[name=locationsGrid]');
        var gridStore = locationsGrid.getStore();

        if (data.assignedLocForPositions) {
            data.assignedLocForPositions.forEach(function (location) {
                gridStore.add({
                    id: location.location.id,
                    address: location.location.address || 'Address not found',
                    parentPosition: {
                        id: location.positionId // location.location.parentPosition.id
                    }
                });
            });
        }

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


        var codesGrid = this.down('grid[name=codesGrid]');
        var codesStore = codesGrid.getStore();
        
        if (data.codeList && data.codeList.length > 0) {
            data.codeList.forEach(function (code) {
                var label = Dashboard.store.enums.CodeType[code.codeType +''].label;
                codesStore.add({
                    code: code.code,
                    codeType: code.codeType,
                    codeTypeLabel: getText(label)
                });
            });
        }

        Dashboard.manager.administration.CategoriesManager.getCategory(data.productCategory.id, this.getController(), 'buildFields');

        // fill ref properties
        Ext.each(data.materialPropertyConfigurationList, function (propertyConf) {
            var property = Ext.create('Dashboard.model.PropertyConfiguration', propertyConf);
            this.addProperty(property);
        }, this);

    },

    setThumbnail: function (tumb) {

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('referenceEdit image[name=thumbnailToEdit]')[0];

        if (tumb !== null) {
            thumbnailSrc = tumb;
        }

        img.setSrc(thumbnailSrc);
        // Ext.ComponentQuery.query('referenceEdit panel[name=thumbnailEditor]')[0].updateLayout();
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
    

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function () {

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        values.id = this.record.id;
        values.designation = (values.designation).trim();
        values.referenceCode = (values.referenceCode).trim();
        values.identified = this.record.identified;
        values.properties = this.getProperties();

        //productCategoryId
        var productCategoryCombo = this.down('autocompleteComboBox[name=productCategoryId]');        
        if(productCategoryCombo.getSelectedRecord() === null){
            values.productCategoryId = null;
        }

        if (values.identified === true) {
            values.materialPropertyConfigurationIdList = [];
            Ext.each(this.getMaterialProperties(), function (propertyConf) {
                values.materialPropertyConfigurationIdList.push(propertyConf.id);
            });
        }

        values.productReferencePropertyConfigurationIdList = [];
        Ext.each(this.getProductReferencePropreties(), function (propertyConf) {
            values.productReferencePropertyConfigurationIdList.push(propertyConf.id);
        });

        var locationsGrid = this.down('grid[name=locationsGrid]').store.data.items;
        if (locationsGrid) {
            values.assignedLocForPositions = [];
            Ext.each(locationsGrid, function (raw) {
                values.assignedLocForPositions.push({
                    'locationId': raw.data.id,
                    'positionId': raw.data.parentPosition.id
                });
            });
        }

        var codesGrid = this.down('grid[name=codesGrid]').store.data.items;
        if (codesGrid) {
            values.codeList = [];
            Ext.each(codesGrid, function(raw){
                values.codeList.push({
                    code: raw.data.code,
                    codeType: raw.data.codeType
                });
            });
        }else {
            values.codeList = null;
        }

        if (this.record.picture !== undefined && this.record.picture.pictureSourceType === null) {
            delete this.record.picture;
        }

        if (this.record.picture !== undefined && this.record.picture.thumbnailName === '') {
            values.picture = {
                thumbnailName: '',
                pictureName: ''
            };
        }

        return values;
    },

    /**
     * Override close method to close attachedFilesSelectionWindow when closing this window
     * 
     */
    close: function () {
        var attachedFilesSelectionWindow = Ext.ComponentQuery.query('attachedFilesSelection')[0];
        
        if(attachedFilesSelectionWindow){
            attachedFilesSelectionWindow.destroy();
        }

        this.callParent(arguments);
    }

});
