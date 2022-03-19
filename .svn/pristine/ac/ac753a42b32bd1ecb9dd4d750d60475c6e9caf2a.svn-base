/*  global Ext */

Ext.define('Dashboard.view.shared.component.AttachedFilesSelection', {
    extend: 'Ext.window.Window',
    xtype: 'attachedFilesSelection',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.model.administration.FilesFolder',
        'Ux.ComboBox'
    ],

    parentController: null,

    iconCls: 'fa fa-file',
    closable: true,
    closeAction: 'hide',
    resizable: true,
    modal: true,
    record: [],
    constrain: true,
    bodyPadding: 16,
    reference: 'attachedFilesSelectionWindow',
    
    width: 700,
    height: 500,
    layout: 'fit',

    managedFolders: false,

    initComponent: function () {
        
        this.title = getText('File attachments');

        this.folderNames = Ext.create(Ext.data.Store, {
            model: 'Dashboard.model.administration.FilesFolder',
            sorters: ['folderName']
        });
                
        var foldersNamesList = Dashboard.manager.ConfigurationManager.currentConfiguration.filesFoldersNames;
        if(!foldersNamesList){
            foldersNamesList = "[]";
        }
        
        Ext.each(Ext.decode(foldersNamesList), function(name){
            this.folderNames.add({folderName: name});
        }, this);
        

        this.items = [
            {
                xtype: 'panel',
                title: getText('Select files'),
                ui: 'form-panel',
                reference: 'attachmentPanel',  //attachmentPanelForm
                items: [
                        this.generateFileFiledPanel()
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Save'),
                listeners: {
                    scope: this,
                    click: function (me, e, eOpts) {
                        
                        var fileInputPanels = this.query('panel[reference=formPanel]');
                        
                        // hide not saved files, remove saved files
                        fileInputPanels.forEach(function (panel) {
                            if (panel.items.items['0'].value.trim() === '') {
                                panel.ownerCt.remove(panel);
                            } else {
                                panel.hide();
                            }
                        });

                        // add files to files  list and hide this window
                        this.parentController.onAddFiles(me);
                    }
                }

            }, {
                text: getText('Cancel'),

                listeners: {
                scope: this,
                    click: function (me, e, eOpts) {

                        var fileInputPanels = this.query('panel[reference=formPanel]');
                        
                        fileInputPanels.forEach(function (panel) {
                            if (panel.hidden === false) {
                                panel.ownerCt.remove(panel);
                            }
                        });
                        
                        this.hide();
                    }
                }
            }
        ];
        
        this.callParent(arguments);
    },

    /**
     * Panel with file input and (-) button
     * @returns {Ext.Panel}
     */
    generateFileFiledPanel: function () {
        
        return new Ext.form.Panel({
            method: 'GET',//'POST',
            type: 'ajax',
            headers: {'Content-type': 'multipart/form-data'},
            timeout: 119000,
//                cors: true,
//                useDefaultXhrHeader: false,
//                withCredentials: true
                
            reference: 'formPanel',  //'fieldPanel',
            tag: 'formPanel',
            formId: Date.now(),
            flex: 1,
            margin: '8 0 8 0',
            layout: 'hbox',
            items: [
                {
                    xtype: 'filefield',
                    id: 'filefieldsCreateRef-' + Date.now(), //Math.floor((Math.random() * 1000000) + 1),
                    reference: 'fileName',
                    flex: 2,
                    buttonConfig: {
                        text: getText('Select'),
                        ui: 'default-toolbar-small'
                    },
                    listeners: {
                        scope: this,
                        change: function (sender, value, oldValue, eOpts) {
                            if(value){
                                sender.setRawValue(value.replace('C:\\fakepath\\', ''));
                            }
                            if (oldValue === '') {
                                this.appendattachmentFieldToPanel(sender);
                            }
                        }
                    }
                }, {
                    xtype: 'combobox',
                    flex: 1,
                    reference: 'folderName',
                    submitValue: false,
                    emptyText: getText('Folder'),
                    displayField: 'folderName',
                    valueField: 'folderName',
                    hidden: !this.managedFolders,
                    queryParam: false,
                    queryMode: 'local',
                    store: this.folderNames,
                    margin: '0 0 0 12'
                }, {
                    xtype: 'button',
                    flex: null,
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    margin: '0 0 0 12',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    scope: this,
                    handler: function (sender) {
                        
                        var nbFields = 0;
                                                
                        var fileInputPanels = this.query('panel[reference=formPanel]');
                        
                        fileInputPanels.forEach(function (panel) {
                            if (panel.isHidden() === false) {
                                nbFields++;
                            }
                        });
                        
                        // Do not delete last field
                        if (nbFields > 1) {
                            this.removeFilefield(sender);
                        }
                    }
                }
            ]
        });
    },

    onShow: function () {
        
        var isEmpty = true;

        var fileInputPanels = this.query('panel[reference=formPanel]');
        
        fileInputPanels.forEach(function (panel) {
            if (panel.isHidden() === false) {
                isEmpty = false;
            }
        });

        if (isEmpty) {
            this.appendattachmentFieldToPanel();
        }

        this.callParent(arguments);
    },

    appendattachmentFieldToPanel: function () {
        var attachmentPanel = this.down('panel[reference=attachmentPanel]');
        var panelToAdd = this.generateFileFiledPanel();
        attachmentPanel.add(panelToAdd);
    },

    removeFilefield: function (sender) {
        var panel = sender.ownerCt.ownerCt;
        panel.remove(sender.ownerCt);
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

    
    selectByFolderName: function(name){
                
        var formItems = this.query('panel[reference=formPanel]');
        
        formItems.forEach(function (item) {
                        
            var fileField  = item.down('filefield');
            var folderField = item.down('combo');
            
            var folderName = folderField.getValue();
            if(folderName === name ){
                //fileField.bodyElement.dom.childNodes[0].childNodes[2].childNodes[1].childNodes[0].childNodes[2].disabled = false;
                //fileField.setDisabled(false);
                fileField.enable();
                //fileField.button.enable();
                //fileField.bodyEl.dom.childNodes[0].childNodes[1].childNodes["0"].childNodes[1].disabled = false;
            }else{
                //fileField.bodyElement.dom.childNodes[0].childNodes[2].childNodes[1].childNodes[0].childNodes[2].disabled = true;
                //fileField.setDisabled(true);
                fileField.disable();
                //fileField.button.disable();
                //fileField.down('button').disable();
                //fileField.bodyEl.dom.childNodes[0].childNodes[1].childNodes["0"].childNodes[1].disabled = true;
            }
        });
    },

    
    getFoldersList: function(){
        
        var formItems = this.query('panel[reference=formPanel]');
        var list = [];
        
        formItems.forEach(function (item) {
            
            var folderField = item.down('combo');
            var fileField = item.down('filefield');
            
            if(fileField.getValue() && fileField.getValue() !== '' ){
                var folderName = folderField.getValue();
            
                if(!folderName){
                    folderName === null;
                }

                if(!Ext.Array.contains(list, folderName)){
                    list.push(folderName);
                }
            }
        });
        
        return list;
    },
    
    
    getFormsList: function(){
        
        var wins  = Ext.ComponentQuery.query('attachedFilesSelection');
        
        if(wins.length > 1){
            Dashboard.tool.Utilities.error('[attachedFilesSelection.getFormsList] error: more than 1 window !');
        }
        
        var win = wins[0];
        var forms = win.query('form[tag=formPanel]');
        var list = [];
        
        forms.forEach(function (form) {
            
            var folderField = form.down('combo');
            var fileField = form.down('filefield');
            
            if(fileField.getValue() && fileField.getValue() !== '' ){
                var folderName = folderField.getValue();
            
                if(!folderName){
                    folderName === null;
                }

                if(!Ext.Array.contains(list, form)){
                    list.push(form);
                }
            }
        });
        
        return list;
    },
    
    
    cleanForm: function(){

        var fileInputPanels = this.query('panel[reference=formPanel]');
        
        fileInputPanels.forEach(function (panel) {
            panel.ownerCt.remove(panel);
        });

            this.appendattachmentFieldToPanel();
    },
    

    getData: function () {
        
        var files = [];
        var formItems = this.query('panel[reference=formPanel]');
                                
        formItems.forEach(function (item) {
            
            var fileField  = item.down('filefield');
            var folderField = item.down('combo');
            
            var fileName = fileField.getValue().replace(/^.*[\\\/]/, '');
            fileName = fileName.trim();
            
            var folderName = folderField.getValue();
            if(!folderName || folderName === ''){
                folderName = null;
        }

            if (fileName && fileName !== '') {
                files.push({
                    name: fileName,
                    id: fileField.id,
                    refId: id,
                    isSaved: false,
                    folderName: folderName
                });
            }else{
                item.ownerCt.remove(item);
            }
        });   
        
        return files;
    }
});   