/* global Ext  */

Ext.define('Dashboard.view.administration.material.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'materialEdit',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
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

    initComponent: function (){

        this.title = getText('Edit an item');

        this.referencesStore = Ext.create('Dashboard.store.References', {
            autoLoad: true,
            listeners: {
                beforeload: function (store, operation, eOpts){
                    var myFilter = {
                        property: 'identified',
                        value: true,
                        type: 'BOOLEAN',
                        comparison: 'EQ'
                    };

                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load: function (store, operation, eOpts){
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

        this.attachmentFilesStore = Ext.create(Ext.data.Store, {
            alias: 'store.attachmentFiles',
            fields: ['id', 'file', 'folderName', 'securedFileUrl'],
            groupField: 'folderName',
            sorters: ['folderName', 'file']
        });

        var characteristicsPanel = {

            title: getText('Item'),
            items: [
                {
                    xtype: Ext.widget('thumbnailEditor', {
                        record: this.record,
                        thumbnailSourceType: 'MATERIAL'
                    })
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    allowBlank: false,
                    maxLength: 255,
                    listeners: {
                        afterrender: function (field){
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
                    queryParam: false,
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
                }, {
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
                            matchFieldWidth: false,
                            selectOnFocus: true,
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
                }, {
                    xtype: 'panel',
                    name: 'useCountPanel',
                    border: false,
                    layout: 'hbox',
                    margin: '0 0 6 0',
                    hidden: false,
                    items: [
                        {
                            xtype: 'displayfield',
                            name: 'useCountLabel',
                            fieldLabel: getText('Use count'),
                            flex: 1
                        }, {
                            xtype: 'button',
                            action: 'resetUseCount',
                            scope: this,
                            handler: this.resetUseCount,
                            text: getText('Reset use count'),
                            tooltip: getText('Reset use count'),
                            margin: '0 0 6 4'
                        }
                    ]
                }, {
                    xtype: 'hiddenfield',
                    name: 'useCount'
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
                'added': function (me){
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
                        requires: [
                            'Ext.grid.feature.Grouping'
                        ],
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
                                renderer: function (value, metaData, rec, rowIndex, colIndex, store){
                                    
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
                                            var folderName = rec.data.folderName;

                                            if (rec.data.isSaved) {

                                                var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/MATERIAL/' + id;

                                                if (folderName && folderName !== '' && folderName !== getText('Mixed')) {
                                                    path += '/' + encodeURI(folderName);
                                                }

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
                        ],
                        features: [
                            {
                                ftype: 'grouping',
                                startCollapsed: false,
                                groupHeaderTpl: getText('{name}') + ' ({rows.length} ' + getText('File') + '{[values.rows.length > 1 ? "s" : ""]})'
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
                    scope: this,
                    handler: function (sender){
                        this.showFilesSelector(sender);
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
            title: getText('Properties'),
            reference: 'propertiesPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            defaults: {
                margin: '0 0 12 0',
                submitValue: false,
                labelWidth: 170,
                width: '100%',
                labelSeparator: getText(':')
            },
            items: []

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
                    labelWidth: 170,
                    width: '100%',
                    labelSeparator: getText(':'),
                    margin: '0 0 12 0'
                },
                items: [
                    characteristicsPanel,
                    traceabilityInformationPanel,
                    propertiesPanel,
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

        this.listeners = {
            scope: this,
            destroy: function(){
                var attachedFilesSelectionWindow = Ext.ComponentQuery.query('attachedFilesSelectionWindow')[0];
                if (attachedFilesSelectionWindow) {
                    attachedFilesSelectionWindow.destroy();
                }
            },
            render: function(){
                var attachedFilesSelectionWindow = Ext.ComponentQuery.query('attachedFilesSelectionWindow')[0];
                if (attachedFilesSelectionWindow) {
                    attachedFilesSelectionWindow.destroy();
                }
            }
        };

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

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        if (values.code !== null && values.code !== undefined) {
            var data = this.down('field[name=code]').data;
            this.windowAddCode.setData(data);
        }

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

    deleteCode: function(){
        this.down('field[name=code]').setFieldLabel(getText('code'));
        this.down('field[name=code]').setValue('');
        this.down('field[name=code]').data = {code: ''};
    },

    cleanFields: function (){
        this.down('panel[reference=propertiesPanel]').removeAll();
    },

    addField: function (field){

        this.down('panel[reference=propertiesPanel]').add(field);
    },

    getProperties: function (){

        var list = this.query('component[tag=property]');
        var materialPropertiesList = [];
        var sensorId = null;

        for (var i = 0; i < list.length; i++) {

            var include = true;
            var value = list[i].value;

            if (list[i].config.editable === false) {
                include = false;
                
                try{
                    if(list[i].property.origin === "TELEMETRY"){
                        include = true;
                        if (list[i].property.sensorId === undefined) {
                            list[i].property.sensorId = null;
                        }
                    }
                }catch(ex){}
            }

            if (list[i].xtype === 'radio') {
                if (list[i].value === true) {
                    value = list[i].inputValue;
                } else {
                    include = false;
                }
            }

            if (list[i].xtype === 'datefield') {
                if (list[i].rawValue.trim() !== '') {
                    value = Ext.Date.format(list[i].value, 'Y-m-d'); // yyyy-MM-dd HH:mm
                } else {
                    value = null;
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

    resetUseCount: function (){
        this.down('displayfield[name=useCountLabel]').setValue(0);
        this.down('field[name=useCount]').setValue(0);
    },

    showFilesSelector: function (sender){

        if (!this.attachedFilesSelectionWindow) {
            this.attachedFilesSelectionWindow = Ext.create('Dashboard.view.shared.component.AttachedFilesSelection', {
                autoShow: false,
                parentController: this.controller,
                managedFolders: true
            });
        }

        this.attachedFilesSelectionWindow.show();

    },

    getTelemetryData: function (){

        var list = [];
        var data = this.down('grid[name=telemetryDataGrid]').store.data.items;

        if (data) {
            Ext.each(data, function(row){
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
     * @return (object) data encoded to jSon
     */
    getData: function (){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        var referenceCombo = this.down('autocompleteComboBox[reference=productReferenceDesignation]');
        if(referenceCombo.getSelectedRecord() === null){
            values.productReferenceId = null;
        }

        var assignedLocationCombo = this.down('autocompleteComboBox[name=assignedLocationId]');
        if(assignedLocationCombo.getSelectedRecord() === null){
            values.assignedLocationId = null;
        }

        if (assignedLocationCombo.rawValue === '') {
            values.assignedLocationId = -1;
        }

        values.id = this.record.id;
        values.name = (values.name).trim();
        values.properties = this.getProperties();
        //values.telemetryData = this.getTelemetryData();

        values.code = null;

        var codesGrid = this.down('grid[name=codesGrid]').store.data.items;
        if (codesGrid && codesGrid.length > 0) {
            values.codes = [];
            Ext.each(codesGrid, function(raw){
                values.codes.push({
                    code: raw.data.code,
                    codeType: raw.data.codeType
                });
            });
        }else{
            values.codes = [];
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


    setData: function (data){

        this.record = data; // important

        this.down('textfield[name=name]').setValue(data.name);

        this.down('combo[name=productReferenceId]').setRawValue(data.productReference.designation);
        //this.down('combo[name=productReferenceId]').setValue(data.productReference.id);
        this.down('combo[name=productReferenceId]').doQuery(data.productReference.designation, false, true);
        this.down('combo[name=productReferenceId]').blur();

        this.down('combo[reference=productReference]').setRawValue(data.productReference.referenceCode);

        this.down('textareafield[name=description]').setValue(data.description);

        this.down('displayfield[name=useCountLabel]').setValue(data.useCount);
        this.down('hiddenfield[name=useCount]').setValue(data.useCount);

        //this.down('combo[name=assignedLocationId]').setValue(data.assignedLocation.id);
        this.down('combo[name=assignedLocationId]').setRawValue(data.assignedLocation.address);
        this.down('combo[name=assignedLocationId]').doQuery(data.assignedLocation.address, false, true);
        this.down('combo[name=assignedLocationId]').blur();

        this.telemetryDataStore.clearData();
        if (data.telemetryData) {
            for (var i = 0; i < data.telemetryData.length; i++) {
                this.telemetryDataStore.add(data.telemetryData[i]);
            }
        }

        var attachmentGrid = this.down('grid[name=attachmentGrid]');
        var attachmentFilesStore = attachmentGrid.getStore();

        if (data.OrganizedFiles) {
            data.OrganizedFiles.forEach(function (fileObject){
                attachmentFilesStore.add({
                    name: fileObject.file.slice(15), // remove timestamp & unique random chars
                    file: fileObject.file,
                    refId: data.id,
                    folderName: fileObject.folderName,
                    isSaved: true
                });
            });
        }
        

        var codesGrid = this.down('grid[name=codesGrid]');
        var codesStore = codesGrid.getStore();

        if (data.codes && data.codes.length > 0) {
            data.codes.forEach(function (code){
                var label = Dashboard.store.enums.CodeType[code.codeType + ''].label;
                codesStore.add({
                    code: code.code,
                    codeType: code.codeType,
                    codeTypeLabel: getText(label)
                });
            });
        }

        Dashboard.manager.administration.ReferencesManager.getReference(data.productReference.id, this.getController(), 'buildFields');
    },

    setThumbnail: function (tumb){

        var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
        var img = Ext.ComponentQuery.query('materialEdit image[name=thumbnailToEdit]')[0];

        if (tumb !== null) {
            thumbnailSrc = tumb;
        }

        img.setSrc(thumbnailSrc);
        // Ext.ComponentQuery.query('materialEdit panel[name=thumbnailEditor]')[0].updateLayout();
    },

    /**
     * Override close method to close attachedFilesSelectionWindow when closing this window
     * 
     */
    close: function (){

        var attachedFilesSelectionWindow = Ext.ComponentQuery.query('attachedFilesSelection')[0];
        if (attachedFilesSelectionWindow) {
            attachedFilesSelectionWindow.destroy();
        }

        this.callParent(arguments);
    }
    
});