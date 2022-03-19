/* global Ext */

Ext.define('Dashboard.view.system.importData.Create', {
    extend: 'Ext.window.Window',
    xtype: 'importCreate',
    
    requires: ['Dashboard.tool.Utilities'],
    
    controller: 'importMain',
    
    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'fa fa-file-text-o',
    
    initComponent: function(){
        
        this.title = getText('Import files');
        
        
        Ext.apply(Ext.form.field.VTypes, {
            
            spreadsheetFile: function(val, field) {
                                
                var fileName = /^.*\.(csv|xls|xlsx)$/i;
                return fileName.test(val);
            },
            spreadsheetFileText: (getText('This file must be in spreadsheet format')) + ' (.csv, .xls, .xlsx).'
        });


        this.items = [
            {
                xtype: 'form',
                ui: 'form-panel',
                bodyPadding: '20 20 0 20',
                referenceHolder: true,
                border: false,
                width: 700,
                height: 650,
                scrollable: 'y',
                fieldDefaults: {
                    labelWidth: 112,
                    width: '100%',
                    labelSeparator: getText(':'),
                    margin: '16 0 0 0'
                },
                items: [
                   {        
                        xtype: 'filefield',
                        //id: 'csv',
                        fieldLabel: '',
                        vtype: 'spreadsheetFile',
                        tooltip: getText('Select file'),
                        //allowBlank: false,
                        emptyText: getText('Select file (.csv, .xls, .xlsx)'),
                        listeners:{
                            change: function(field, value, eOpts){
                                if(value){
                                    field.setRawValue(value.replace('C:\\fakepath\\', ''));
                                                                        
                                    var result = field.validate();
                                    
                                    if(field.activeErrors && field.activeErrors[0]){
                                        Ext.Msg.show({
                                            title: getText('Errors'),
                                            message: field.activeErrors[0],
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.ERROR
                                        });
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Import a file'),
                handler: 'importFile'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },
    
    cleanFields: function(){
        this.down('panel[reference=propertiesPanel]').removeAll();
    },
    
    addField: function(field){

        this.down('panel[reference=propertiesPanel]').add(field);
    },
    
    getProperties: function(){

        var list = this.query('component[tag=property]');
        var importPropertiesList = [];

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
                var date = list[i].down('field[xtype=datefield]').value;
                var time = list[i].down('field[xtype=timefield]').value;
                value = Ext.Date.format(date, 'Y-m-d') + ' ' + Ext.Date.format(time, 'H:i:s');
            }

            if (include) {
                importPropertiesList.push({
                    name: list[i].name,
                    value: value
                });
            }
        }

        return importPropertiesList;
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
            messages.push(invalidFields[i].fieldLabel + " > " + invalidFields[i].activeErrors[0]);
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

        values.username = (values.username).trim();
        values.importationDate = (values.importationDate).trim();
        values.nbErrors = (values.nbErrors).trim();
        values.properties = this.getProperties();

        return values;
    },
    
    /**
     * Override close method to close importedFilesSelectionWindow when closing this window
     * 
     */
    close: function () {
        var importedFilesSelectionWindow = Ext.getCmp('importedFilesSelectionWindow');
        if (importedFilesSelectionWindow) {
            importedFilesSelectionWindow.destroy();
        }

        this.callParent(arguments);
    }
});