Ext.define('Dashboard.view.shared.component.ImportedFilesSelection', {
    extend: 'Ext.window.Window',
    xtype: 'importedFilesSelection',

    requires: [
        'Dashboard.tool.Utilities'
    ],

    iconCls: 'fa fa-file',
    layout: 'fit',
    closable: false,
    resizable: true,
    modal: true,
    record: [],
    constrain: true,
    bodyPadding: 16,
    id: 'importedFilesSelectionWindow',
    parentController: null,
    width: 500,
    height: 500,
    importPanel: null,

    initComponent: function () {
        this.title = getText('Import files');

        this.importPanel = {
            xtype: 'panel',
            title: getText('Select files'),
            reference: 'importPanel',
            collapsible: false,
            ui: 'form-panel',
            items: [
                {
                    xtype: 'form',
                    method: 'POST',
                    id: 'attachmentPanelForm',
                    type: 'ajax',
                    headers: {'Content-type': 'multipart/form-data'},
                    timeout: 119000,
                    items: [this.generateFileFiledPanel()],
                    cors: true,
                    useDefaultXhrHeader: false,
                    withCredentials: true
                }
            ]
        };

        this.items = [
            this.importPanel
        ];

        this.buttons = [
            {
                text: getText('Import a file'),
                listeners: {
                    scope: this,
                    click: function (me, e, eOpts) {
                        this.hide(); // hide window
                        // hide fields && remove empty fileds
                        var filesForm = this.items.items['0'];
                        var fileInputPanels = filesForm.items.items['0'].items.items;
                        
                        fileInputPanels.forEach(function (panel) {
                            if (panel.items.items['0'].value.trim() === '') {
                                panel.ownerCt.remove(panel);
                            } else {
                                panel.hide();
                            }
                        });

                        this.parentController.onAddFiles(me);
                    }
                }

            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.hide
            }
        ];
        this.callParent(arguments);
    },

    /**
     * Panel with file input and (-) button
     * @returns {Ext.Panel}
     */
    generateFileFiledPanel: function () {
        return new Ext.Panel({
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                margin: '8 0 8 0'
            },
            items: [
                {
                    xtype: 'filefield',
                    flex: 8,
                    id: 'filefieldsCreateRef-' + Date.now(), //Math.floor((Math.random() * 1000000) + 1),
                    buttonConfig: {
                        text: getText('Select'),
                        ui: 'default-toolbar-small'
                    },
                    listeners: {
                        scope: this,
                        change: function (sender, value, oldValue, eOpts) {
                            if (oldValue === '') {
                                this.appendattachmentFieldToPanel(sender);
                            }
                        }
                    }
                }, {
                    xtype: 'button',
                    ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-minus-circle',
                    flex: 1,
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    handler: function (sender) {
                        var nbFields = 0;
                        var importedFilesSelectionWindow = Ext.getCmp('importedFilesSelectionWindow');
                        var filesForm = importedFilesSelectionWindow.items.items['0'];
                        var fileInputPanels = filesForm.items.items['0'].items.items;
                        fileInputPanels.forEach(function (panel) {
                            if (panel.isHidden() === false) {
                                nbFields++;
                            }
                        });
                        // Do not delete last field
                        if (nbFields > 1) {
                            importedFilesSelectionWindow.removeFilefield(sender);
                        }
                    }
                }
            ]
        });
    },

    appendattachmentFieldToPanel: function () {
        var attachmentPanelForm = Ext.getCmp('attachmentPanelForm');
        var panelToAdd = this.generateFileFiledPanel();
        attachmentPanelForm.add(panelToAdd);
    },

    removeFilefield: function (sender) {
        var panel = sender.ownerCt.ownerCt;
        panel.remove(sender.ownerCt);
    },

    getData: function () {
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        return values;
    },

    onShow: function () {
        var isEmpty = true;
        var filesForm = this.items.items['0'];
        var fileInputPanels = filesForm.items.items['0'].items.items;
        fileInputPanels.forEach(function (panel) {
            if (panel.isHidden() === false) {
                isEmpty = false;
            }
        });

        if (isEmpty) {
            this.appendattachmentFieldToPanel();
        }

        this.callParent(arguments);
    }
});   