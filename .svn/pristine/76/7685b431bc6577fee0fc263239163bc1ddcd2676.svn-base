/* global Ext  */

Ext.define('Dashboard.view.system.plugin.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'pluginEdit',

    requires: ['Dashboard.tool.Utilities'],

    controller: 'pluginMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'fa fa-puzzle-piece',
    attachmentFilesStore: null,

    record: null,

    initComponent: function () {
        this.title = getText('Edit a plugin');

        var characteristicsPanel = {
            title: getText('Plugin'),
            items: [
                {
                    xtype: 'displayfield',
                    name: 'name',
                    fieldLabel: getText('Name'),
                    maxLength: 255
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: getText('Description'),
                    maxLength: 1024
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
                    labelWidth: 170,
                    width: '100%',
                    labelSeparator: getText(':'),
                    margin: '0 0 12 0'
                },
                items: [characteristicsPanel]
            }
        ];

        this.buttons = [{
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
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


    getData: function () {
        var winForm = this.down('form').getForm();

        var values = {};
        values.id = this.record.id;
        values.description = winForm.getValues().description;
        values.name = this.record.name;
        values.enabled = this.record.enabled;
        
        return values;
    },

    setData: function (data) {
        this.record = data;

        this.down('displayfield[name=name]').setValue(data.name);
        this.down('textareafield[name=description]').setValue(data.description);
    }
});