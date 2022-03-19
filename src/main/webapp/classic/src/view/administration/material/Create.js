/*  global Ext  */

Ext.define('Dashboard.view.administration.material.Create', {
    extend: 'Ext.window.Window',
    xtype: 'materialCreate',
    
    requires: [
        'Dashboard.tool.Utilities', 
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor',
        'Ux.TextField'
    ],
    
    controller: 'materialMain',
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'x-fa fa-tag',
    attachmentFilesStore: null,
    attachedFilesSelectionWindow: null,
    telemetryDataStore: null,
    record: null,
        
    initComponent: function(){
                
        this.title = getText('Create an item');

        this.referencesStore = Ext.create('Dashboard.store.References', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    var myFilter = {
                        property: 'identified',
                        value: true,
                        type: 'BOOLEAN',
                        comparison: 'EQ'
                    };

                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });
        
        
        this.telemetryDataStore = Ext.create(Ext.data.Store, {
            fields: ['name', 'sensorType']
        });
        
        this.codesStore = Ext.create(Ext.data.Store, {
            fields: ['code', 'codeType', 'codeTypeLabel']
        });


        var characteristicsPanel = {
            title: getText('Item'),
            items: [
                {
                    xtype: Ext.widget('thumbnailEditor')
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    maxLength: 255,
                    listeners: {
                        afterrender: function(field){
                            field.focus(false, 100);
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    reference: 'productReference',
                    fieldLabel: getText('Reference code'),
                    displayField: 'referenceCode',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false, //to remove param "query"
                    matchFieldWidth: false,
                    store: this.referencesStore,
                    listeners: {
                        scope: this,
                        select: function(combo, record, eOpts){
                            this.getController().onReferenceSelected(combo);
                            this.down('autocompleteComboBox[reference=productReferenceDesignation]').select(record);
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'productReferenceId',
                    reference: 'productReferenceDesignation',
                    fieldLabel: getText('Reference designation'),
                    displayField: 'designation',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam: false, //to remove param "query"
                    matchFieldWidth: false,
                    store: this.referencesStore,
                    listeners: {
                        scope: this,
                        select: function(combo, record, eOpts){
                            this.getController().onReferenceSelected(combo);
                            this.down('autocompleteComboBox[reference=productReference]').select(record);
                        }
                    }
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
                },{
                    xtype: 'container',
                    name: 'assignedLocationContainer',
                    hidden: false,
                    anchor: '100%',
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'autocompleteComboBox',
                            name: 'assignedLocationId',
                            anchor: '100%',
                            fieldLabel: getText('Assigned location'),
                            displayField: 'address',
                            valueField: 'id',
                            queryParam: false,
                            filter: [],
                            requires: ['Dashboard.store.administration.Locations'],
                            store: Ext.create('Dashboard.store.administration.Locations', {
                                autoLoad: true,
                                sorters: [
                                    {
                                        property: 'name',
                                        direction: 'ASC'
                                    }
                                ]
                            })
                        }
                    ]
                }
            ]
        };
        
        
        var traceabilityInformationPanel = {
            name: 'traceabilityInformationPanel',
            title: getText('Identification'),//getText('Traceability information'),
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
                        reference: 'codesGrid',
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
        

        var propertiesPanel = {
            title: getText('Properties'),
            reference: 'propertiesPanel',
            boddyPadding: '0 0 24 0',
            defaults: {
                margin: '0 0 12 0',
                submitValue: false,
                labelWidth: 170,
                width: '100%',
                labelSeparator: getText(':')
            },
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        submitValue: false,
                        margin: 0,
                        labelWidth: 170
                    },
                    items: []
                }
            ]
        };
        
        
        var telemetryDataPanel = {
            xtype: 'panel',
            title: getText('Telemetry data'),
            reference: 'telemetryDataPanel',
            collapsible: false,
            ui: 'form-panel',
            //hidden: !Dashboard.manager.FeaturesManager.isEnabled('SENSORS_ADMIN'),
            items: [
                {
                    xtype: 'container',
                    reference: 'telemetryData',
                    items: {
                        xtype: 'grid',
                        name: 'telemetryDataGrid',
                        store: this.telemetryDataStore,
                        multiSelect: true,
                        viewConfig: {
                            stripeRows: true
                        },
                        columns: [
                            {
                                text: getText('Name'),
                                dataIndex: 'name',
                                flex: 2
                            }, {
                                text: getText('Type'),
                                dataIndex: 'sensorType',
                                flex: 2
                            }
                        ],
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
                    handler: 'onAddTelemetryData'
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: 'onDeleteTelemetryData'
                }
            ]
        };
        
       
        // Make hidden file attachment window
        var attachedFilesSelectionWindow = Ext.create('Dashboard.view.shared.component.AttachedFilesSelection', {
            autoShow: false,
            parentController: this.controller,
            managedFolders: true
        });
        
        this.attachmentFilesStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'file', 'folderName', 'securedFileUrl'],
            groupField: 'folderName',
            sorters: ['folderName','file']
        });
        
        var attachmentPanel = {
            xtype: 'panel',
            title: getText('File attachments'),
            reference: 'attachmentPanel',
            collapsible: false,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'container',
                    reference: 'files',
                    items: {
                        xtype: 'grid',
                        reference: 'filesGrid',
                        frame: true,
                        requires: [
                            'Ext.grid.feature.Grouping'
                        ],
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
                                    return getText('Not synchronized'); // @todo // see what to put here ?
                                }
                            }
                        ],
                        
                        features: [
                            {
                                ftype: 'grouping',
                                startCollapsed: false,
                                groupHeaderTpl: getText('{name}') + ' ({rows.length} '+ getText('File') + '{[values.rows.length > 1 ? "s" : ""]})'
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
                    traceabilityInformationPanel,
                    //telemetryDataPanel,
                    attachmentPanel
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
    
    
    onAddCode: function(){
        this.addCode();
    },
    
    
    addCode: function(){
        this.windowAddCode = Ext.create('Dashboard.view.shared.component.AddCodeWindow');
        
        this.windowAddCode.down('button[action=addCode]').on('click', function (me) {
            this.addNewCode(me);
        }, this);
        
        this.windowAddCode.show();
    },
    
    addNewCode: function(sender){
        
        var win = sender.up('window');
        
        if (!win.down('form').isValid()) {
            win.getInvalidFields();
            return;
        }
        
        var data = win.getData();
        this.down('field[name=code]').setFieldLabel(data.codeTypeLabel);
        this.down('field[name=code]').setValue(data.code);
        this.down('field[name=code]').data = data;
                
        win.close();
        
    },
    
    confirmRemoveCode: function(code){

        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to remove this code ?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn){
                if (btn === 'yes') {
                    this.deleteCode();
                }
            }
        });
    },
    
//    deleteCode: function(){
//        this.down('field[name=code]').setFieldLabel(getText('code'));
//        this.down('field[name=code]').setValue('');
//        this.down('field[name=code]').data = {code : ''};
//    },
    
    cleanFields: function(){
        this.down('panel[reference=propertiesPanel]').removeAll();
    },
    
    addField: function(field){

        this.down('panel[reference=propertiesPanel]').add(field);
    },
    
    getProperties: function(){

        var list = this.query('component[tag=property]');
        var materialPropertiesList = [];
        var sensorId = null;

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

            var materialProperty = {
                    name: list[i].name,
                    value: value
            };
            //case of String
            if (list[i].xtype === 'textfield') {
                if (materialProperty.value==""){
                    materialProperty.value=null;
                }
            }

            if(list[i].property){
                if(list[i].property.sensorId){
                    sensorId = list[i].property.sensorId;
                }else{
                    sensorId = null;
            }
                materialProperty.sensorId = sensorId;
        }

            if (include) {
                materialPropertiesList.push(materialProperty);
            }
        }

        return materialPropertiesList;
    },
    
    
    getTelemetryData: function () {

        var list = [];
        var data = this.down('grid[name=telemetryDataGrid]').store.data.items;

        if (data) {
            Ext.each(data, function (row) {
                list.push(row.data.id);
            });
        }

        return list;
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
    getData: function(){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        var productReferenceCombo = this.down('combo[reference=productReference]');
        values.productReferenceId = productReferenceCombo.getValue();

        values.properties = this.getProperties();
        values.name = (values.name).trim();
        
        //values.telemetryData = this.getTelemetryData();

        values.code = null;
        
        if (!values.assignedLocationId) {
            values.assignedLocationId = -1;
        }
        
        var codesGrid = this.down('grid[name=codesGrid]').store.data.items;
        if (codesGrid && codesGrid.length > 0) {
            values.codes = [];
            Ext.each(codesGrid, function(raw){
                values.codes.push({
                    code: raw.data.code,
                    codeType: raw.data.codeType
                });
            });
        }else {
            values.codes = null;
        }

        return values;
    },
    
    setThumbnail: function(tumb){

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('materialEdit image[name=thumbnailToEdit]')[0];

        if (tumb !== null) {
            thumbnailSrc = tumb;
        }

        img.setSrc(thumbnailSrc);
    },
    
    // SET DATA FOR DUPLICATE
    setData: function (data) {
        this.record = data;
        
//        var productReferenceCombo = this.down('combo[name=productReferenceId]');
//        this.referencesStore.load({
//            callback: function (record, operation, success) {
//                if (success) {
//                    productReferenceCombo.setValue(data.productReference.id);
//                } else {
//                    Dashboard.tool.Utilities.error('[Material.setData] error loading store');
//                }
//            }
//        });

        this.down('combo[name=productReferenceId]').setValue(data.productReference.id);
        this.down('combo[name=productReferenceId]').setRawValue(data.productReference.designation);
//        this.down('combo[name=productReferenceId]').doQuery(data.productReference.id, false, true);
//        this.down('combo[name=productReferenceId]').blur();
        
        this.down('combo[reference=productReference]').setValue(data.productReference.id);
        this.down('combo[reference=productReference]').setRawValue(data.productReference.referenceCode);
//        this.down('combo[reference=productReference]').doQuery(data.productReference.referenceCode, false, true);
//        this.down('combo[reference=productReference]').blur();

        this.down('textfield[name=name]').setValue(data.name + '_' + getText('copy'));
        this.down('textareafield[name=description]').setValue(data.description);
        this.down('combo[name=assignedLocationId]').setValue(data.assignedLocation.id);


        Dashboard.manager.administration.ReferencesManager.getReference(data.productReference.id, this.getController(), 'buildFields');
    },
    /**
     * Override close method to close attachedFilesSelectionWindow when closing this window
     * 
     */
    close: function () {
        var attachedFilesSelectionWindow = Ext.ComponentQuery.query('attachedFilesSelection')[0];
        
        if (attachedFilesSelectionWindow) {
            attachedFilesSelectionWindow.destroy();
        }

        this.callParent(arguments);
    }
});