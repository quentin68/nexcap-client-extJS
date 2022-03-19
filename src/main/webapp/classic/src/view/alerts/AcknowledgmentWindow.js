/* global Ext */

Ext.define('Dashboard.view.alerts.AcknowledgmentWindow', {
    extend: 'Ext.window.Window',
    xtype: 'acknowledgmentWindow',

    requires: [
        'Dashboard.tool.Utilities'
    ],

    controller: null,

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 550,
    iconCls: 'fa fa-check-circle-o',
    plain: true,
    autoScroll: true,
    scrollable: 'y',

    record: null,

    initComponent: function (){

        this.title = getText('Acknowledgment');

        var items = {

            xtype: 'panel',
            bodyPadding: 20,
            ui: 'form-panel',

            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':'),
                margin: '0 0 12 0'
            },
            items: [
//                {
//                    xtype: 'textfield',
//                    name: 'reason',
//                    fieldLabel: getText('Reason'),  //fr : Raison d’acquittement
//                    allowBlank: false,
//                    maxLength: 255,
//                    listeners: {
//                        afterrender: function (field){
//                            field.focus(false, 100);
//                        }
//                    }
//                }, 
                {
                    xtype: 'textareafield',
                    name: 'reason',
                    fieldLabel: getText('Reason'),
                    allowBlank: true,
                    height: 300,
                    maxLength: 1024
                }
            ]
        };

        this.items = [
            {
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: 600,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable: 'y',

                defaults: {
                    bodyPadding: 20,
                    ui: 'form-panel'
                },

                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },

                items: [items]
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
     * Method stocks by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function (){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        var data = this.record;
        data.description = values.reason;

        return data;
    }

});