/*  global Ext, parseFloat */

Ext.define('Dashboard.view.historic.check.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'checkDetail',
    
    requires:[
        'Dashboard.view.shared.imagesViewer.Zoom'
    ],
    
    record: null,
    reportPanel: null,

    initComponent: function (){
        
        this.configDetail();

        this.attachmentFilesStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'file']
        });

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}'
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                }, {
                    title: getText('Item'),
                    reference: 'item',
                    iconCls: 'x-fa fa-tag'

                }, {
                    title: getText('Control'),
                    reference: 'control',
                    iconCls: 'fa fa-list'

                }, {
                    //title: getText('Report'),
                    reference: 'report',
                    //iconCls: 'fa fa-check',
                    ui: null,
                    bodyPadding : '0',
                    margin: 0,
                    defaults:{
                        xtype: 'panel',
                        ui: 'detail',
                        minHeight: 80,
                        bodyPadding : '12 0 12 12',
                        margin: '0 24 12 24'
                    }

                }, {
                    title: getText('Photos'),
                    reference: 'photos',
                    iconCls: 'fa fa-paperclip',
                    items: [
                        {
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
                                        flex: 1
                                    }, {
                                        text: '',
                                        flex: 1,
                                        renderer: function (value, metaData, rec, rowIndex, colIndex, store){
                                            var file = rec.data.file;
                                            return file;
                                        }
                                    }, {
                                        xtype: 'actioncolumn',
                                        reference: 'picture',
                                        text: getText('Show'),
                                        width: 75,
                                        align: 'center',
                                        items: [
                                            {
                                                icon: 'resources/icons/pictureButton.jpg',
                                                tooltip: getText('Show picture'),
                                                scope: this,
                                                handler: function (grid, rowIndex, colIndex, item, e, record){

                                                    var refId = record.data.refId;
                                                    var file = record.data.file; //encodeURI(file)
                                                    var name = record.data.name;
                                                    var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/image/SPECIFIC_CHECK/' + refId + '/';

                                                    this.doZoom(file, name, path, grid);
                                                }
                                            }
                                        ]
                                    }
                                ],
                                width: '100%'
                            }
                        }
                    ]
                }
            ]

        });

        this.callParent(arguments);

    },

    setData: function (data){
        
        
        this.record = data;
        if (!data) {
            return;
        }

        this.viewModel.setData(data);
        
        this.itemPanel = this.query('panel[reference=item]')[0];
        this.itemPanel.removeAll();

        this.controlPanel = this.query('panel[reference=control]')[0];
        this.controlPanel.removeAll();
        
        this.reportPanel = this.query('panel[reference=report]')[0];
        this.reportPanel.removeAll();

        this.controlPanel.add({
            xtype: 'button',
            iconCls: 'fa fa-file-pdf-o',
            margin: '0 0 15 20',
            listeners: {
                scope: this,
                click: function (me, e, eOpts ){
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckReport/pdf/' + data.id;
                    var fileName = data.name + '.pdf';
                    
                    Dashboard.manager.administration.FilesManager.readPdfFile(url, fileName);
                    
                }
            }
        });
        
        if (data.executionDate !== null) {
            var date = Ext.Date.format(data.executionDate, getText('m/d/Y H:i:s'));
            this.controlPanel.add(this.buildField({
                name: 'Date',
                value: date
            }));
        }
        
        this.controlPanel.add(this.buildField({
            name: 'Operator',
            value: data.operator
        }));

        if (data.materialName !== null) {
            this.itemPanel.add(this.buildField({
                name: getText('Item'),
                value: data.materialName
            }));
        }
        
        if (data.productReferenceCode !== null) {
            this.itemPanel.add(this.buildField({
                name: getText('Ref. code'),
                value: data.productReferenceCode
            }));
        }
        
        if (data.productReferenceDesignation !== null) {
            this.itemPanel.add(this.buildField({
                name: getText('Ref. designation'),
                value: data.productReferenceDesignation
            }));
        }
        

        if (data.specificCheckConfigurationId) {
            this.getSpecificCheckConfiguration(data.specificCheckConfigurationId);
        }
        
        var attachmentGrid = this.down('grid[name=attachmentGrid]');
        var attachmentFilesStore = attachmentGrid.getStore();
        attachmentFilesStore.removeAll();

        if (data.pictureNames) {
            //data.pictureNames = Ext.decode(data.pictureNames);
            for (var i = 0; i < data.pictureNames.length; i++) {
                attachmentFilesStore.add({
                    name: getText('Picture') + ' ' + (i + 1),
                    file: data.pictureNames[i],
                    refId: data.id
                });
            }
        }

    },

    getSpecificCheckConfiguration: function (id){
        Dashboard.manager.settings.SpecificCheckConfigManager.getOne(id, this, 'onLoadSpecificCheckConfig');
    },

    onLoadSpecificCheckConfig: function (model){
        
        var paragraphsConfig = model.data.specificForm;
        var controls = this.getControls(this.record, paragraphsConfig);
        
        this.reportPanel.add(controls);
    },
    
    buildparagraphFieldSet: function (title){
        var paragraphFieldSet = Ext.create('Ext.panel.Panel', {
            title: title,
            iconCls: 'fa fa-check-square-o'
        });
        return paragraphFieldSet;
    },
    
    
    addControlIntoParagrahFieldSet: function (paragraphFieldSet, control, value){

        var displayValue = this.formatControlValue(control, value);
        paragraphFieldSet.add(this.buildField({
            name: control.label,
            value: displayValue
        }));

        return paragraphFieldSet;
    },
    

//    buildparagraphFieldSet: function (title, control, value){
//        var paragraphFieldSet = Ext.create('Ext.form.FieldSet', {
//            title: title
//        });
//
//        var displayValue = this.formatControlValue(control, value);
//        paragraphFieldSet.add(this.buildField({
//            name: control.label,
//            value: displayValue
//        }));
//
//        return paragraphFieldSet;
//    },
    

    /**
     * Formats control value according to config
     * @param {type} control
     * @param {type} value
     * @returns Formatted Value
     */
    formatControlValue: function (control, value){
        var returnValue = value;
        try {
            var controlOptions = JSON.parse(control.options);
            console.log(control.controlType);
            if (controlOptions === null) {
                throw 'Unavailable control options';
            }
            console.log(controlOptions);
        } catch (ex) {
            Dashboard.tool.Utilities.info('[formatControlValue] :' + ex);
            return returnValue;
        }
        
        switch (control.controlType) {
            case 'text':
                break;
            case 'numeric':
                break;
            case 'slider':
                try {
                    var precision = 0; // Defaults to 0 decimal precision
                    if (controlOptions.numberDecimals &&
                            (!isNaN(parseInt(controlOptions.numberDecimals)) && isFinite(controlOptions.numberDecimals))) {
                        precision = parseInt(controlOptions.numberDecimals);
                    }
                    returnValue = parseFloat(value).toFixed(precision);
                } catch (ex) {
                    Dashboard.tool.Utilities.info('[formatControlValue.slider] :' + ex);
                }
                break;
            case 'conformity':
                break;
            case 'textArea':
                break;
            case 'radioButton':
                break;
            case 'list':
                break;
            case 'date':
                break;
            case 'photo':
                break;
            case 'scan':
                break;
            default:
                console.log('Should never happen - ControlType: ' + control.controlType);
        }
        return returnValue;
    },
    

    getControls: function (data, paragraphsConfig){
        
        var paragraphsList = [];

        Ext.each(Ext.JSON.decode(data.fields), function (paragraph){ // For each paragraph
            
            var paragraphConfig = null;
            
            var paragraphFieldSet = null;
            paragraphFieldSet = this.buildparagraphFieldSet(paragraph.title);
            
            
            for (var i = 0; i < paragraphsConfig.length; i++) {
                if (paragraph.id === paragraphsConfig[i].id) {
                    paragraph.max = paragraphsConfig[i].max; // meh .. maybe ?
                    paragraphConfig = paragraphsConfig[i];
                    break;
                }
            }
            

            Ext.each(paragraph.controls, function (control){ // For each control
                var finalValue = '';
                if (paragraphConfig !== null) {
                    var controlsConfig = paragraphConfig.controls;
                    for (var i = 0; i < controlsConfig.length; i++) {
                        if (control.id === controlsConfig[i].id) {
                            control.options = controlsConfig[i].options;
                            break;
                        }
                    }
                }
                
                var isShown = true;
                
                switch (control.controlType) {
                    case 'text':
                    case 'numeric':
                    case 'slider':
                    case 'conformity':
                    case 'textArea':
                        finalValue = control.value.toString().replace(/\r\n/g, '<br/>');
                        break;
                    case 'radioButton':
                        finalValue = control.value.toString().replace(/\r\n/g, '<br/>');
                        break;
                    case 'date':
                        if(Ext.typeOf(control.value) === 'date' ){
                            finalValue = Ext.Date.format(control.value, getText('m/d/Y'));
                        }else if(Ext.typeOf(control.value) === 'string'){
                            if(control.value && control.value !== ''){
                                var date = new Date(control.value);
                                finalValue = Ext.Date.format(date, getText('m/d/Y'));
                            }else{
                                finalValue = '';
                            }
                        }
                        break;
                    case 'list':
                        Ext.each(control.value, function (value){
                            if (finalValue !== '') {
                                finalValue = finalValue + '<br/>';
                            }
                            finalValue = finalValue + value;
                        });
                        break;
                    case 'photo':
                    case 'scan':
                        isShown = false; // Temporary
                        break;
                    default:
                }

                if (isShown) {
                    this.addControlIntoParagrahFieldSet(paragraphFieldSet, control, finalValue);
                }

            }, this);
            
            paragraphsList.push(paragraphFieldSet);

        }, this);
        

        // Create and add attachments
       var attachments = this.getAttachments(data.attachments, data.id);
       paragraphsList = paragraphsList.concat(attachments);



        // Add conformity fieldset
        var conformityFieldSet = Ext.create('Ext.panel.Panel', {
            title: getText('Control compliance'),
            iconCls: 'fa fa-check' //fa-list
            
        });

        var conformityDisplayField = Ext.create('Ext.form.field.Display',{
            padding: '0 24 0 0'
        });

        if (data.isRight) {
            conformityDisplayField.setValue(getText('Compliant'));
            conformityDisplayField.setFieldStyle('color: green;text-align : center;');

        } else {
            conformityDisplayField.setValue(getText('Non-compliant'));
            conformityDisplayField.setFieldStyle('color: red;text-align : center;');
        }

        conformityFieldSet.add(conformityDisplayField);
        paragraphsList.push(conformityFieldSet);

        return paragraphsList;
    },

    getAttachments: function (attachments, id){

        // Default display field
        if (attachments.length <= 0) {
            var noFileDisplayField = Ext.create('Ext.form.field.Display', {
                fieldLabel: getText('Attachments'),
                value: getText('No files')
            });
            return noFileDisplayField;
        }

        var attachmentsFieldSetList = [];

        for (var i = 0; i < attachments.length; i++) {
            var attachmentsFieldSet = this.buildAttachmentsFieldSet(attachments[i], id);
            if (attachmentsFieldSet !== undefined) {
                attachmentsFieldSetList.push(attachmentsFieldSet);
            }
        }
        ;
        return attachmentsFieldSetList;
    },

    buildAttachmentsFieldSet: function (attachmentSet, id){

        var attachmentsFieldSet = Ext.create('Ext.form.Panel', {
            border: false,
            items: {
                xtype: 'displayfield',
                fieldLabel: attachmentSet.label || '',
                flex: 1,
                margin: '0 0 15 20',
                labelWidth: '100%',
                labelCls: 'report-paragraph-title'
            }
        });

        var imagesList = [];
        var filesIconsList = [];

        for (var i = 0; i < attachmentSet.filenames.length; i++) {

            var fileType = this.getFileType(attachmentSet.filenames[i]);
            Dashboard.tool.Utilities.info('Display attachments : fileType = ' + fileType);

            /** Temporary (broken)
             if (fileType === "img") {
             var image = this.buildImage(attachmentSet.filenames[i], id);
             imagesList.push(image);
             } else {
             var fileIcon = this.buildFileIcon(attachmentSet.filenames[i], id);
             filesIconsList.push(fileIcon);
             }**/

            var fileIcon = this.buildFileIcon(attachmentSet.filenames[i], id);
            filesIconsList.push(fileIcon);
        }

        if (imagesList.length > 0) {
            attachmentsFieldSet.add(imagesList);
        }

        if (filesIconsList.length > 0) {
            attachmentsFieldSet.add(filesIconsList);
        }

        return attachmentsFieldSet;

    },

    getFileType: function (fileName){

        var stringArray = fileName.split(".");

        if (stringArray.length < 2) {
            return null;
        }

        var extention = (stringArray[stringArray.length - 1]).toLowerCase();

        switch (extention) {
            case 'jpeg':
            case 'jpg':
            case 'gif':
            case 'png':
            case 'bmp':
            case 'tiff':
                return 'img';
                break;

            default:
                return 'file';
        }

    },

    buildImage: function (attachmentName, id){

        var attachment = {
            xtype: 'imageViewerPanel',
            picture: attachmentName,
            materialId: this.itemId,
            listeners: {
                afterrender: function (c){
                    Ext.create('Ext.tip.ToolTip', {
                        target: c.getEl(),
                        html: getText('Double-click for download file')
                                // 'Double-cliquer sur l\'image pour la télécharger'
                    });
                }
            }
        };

        return attachment;
    },

    buildFileIcon: function (attachmentName, id){
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/SPECIFIC_CHECK/' + id + '/' + attachmentName;

        var attachment = {
            xtype: 'panel',
            border: false,
            margin: '0 0 15 20',
            items: [
                {
                    xtype: 'label',
                    html: '<a target="_blank" href="' + url + '" >' + attachmentName + '</a><br>'
                }
            ]
        };

        return attachment;
    },

    exportPdf: function (id){
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckReport/pdf/' + id;
        window.open(url);
    },

    doZoom: function (file, name, path, maskTarget){
        
        var pictureSrc = path + encodeURI(file);
        
        this.myMask = new Ext.LoadMask({
            msg    : getText('Loading') + '...',
            target : maskTarget
        });
        this.myMask.show();
                 
        Ext.Ajax.request({
            scope:this,
            binary: true,  //set binary to true
            url: pictureSrc,
            method: "GET",
            success: function(response) {

                this.myMask.hide();

                var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                url = window.URL.createObjectURL(blob);

                var record = {
                    file: file,
                    name: name,
                    path: url
                };

                var view = Ext.widget('zoom', {
                    autoShow: false,
                    record: record
                });

                view.show();
            }
        });

    }

});
