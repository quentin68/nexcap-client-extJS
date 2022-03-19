/*  global Ext */

Ext.define('Dashboard.view.shared.component.SelectFile', {
    extend: 'Ext.window.Window',
    xtype: 'selectFile',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 350,
    width: 550,
    iconCls: 'fa fa-download',
    plain : true,
    autoScroll: true,
    scrollable:'y',
    
    title: null,
    vtype: null,
    accept: null,
    controller: null,

    initComponent: function() {
        
        if(!this.title){
            this.title = getText('Import file');
        }
        
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 20,
                border: false,
                width: 500,
                height: 400,

                items: [
                    {        
                        xtype: 'filefield',
                        //name: 'file',
                        flex: 1,
                        vtype: this.vtype,
                        //accept: this.accept,
                        allowBlank: false,
                        labelSeparator: getText(':'),
                        emptyText: getText('Select file'),
                        scale: 'small',
                        anchor: '100%',
                        listeners:{
                            change: function(field, value, eOpts){
                                if(value){
                                    field.setRawValue(value.replace('C:\\fakepath\\', ''));
                                }
                            }
                        }
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Add'),
                action: 'importFile'//,
                //handler: 'importFile'
            },{
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
    getData: function(){        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        return values;
    }

});   