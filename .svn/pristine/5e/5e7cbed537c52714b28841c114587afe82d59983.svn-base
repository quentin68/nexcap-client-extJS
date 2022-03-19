/* global Ext  */

Ext.define('Dashboard.view.system.device.EditConfigurationProperty', {
    extend: 'Ext.window.Window',
    xtype: 'deviceEditConfigurationProperty',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    mainController: 'profileManage',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 550,
    iconCls: 'fa fa-cogs',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    record:null,

    initComponent: function() {
        
        this.title = getText('Edit a configuration property');
        
        var characteristicsPanel = Ext.create('Ext.panel.Panel',{
            border: false,
            title: this.record.name,
            layout: 'vbox',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'displayfield',
                    name : 'description',
                    fieldLabel: getText('Description')
                },{
                    xtype: 'displayfield',
                    name : 'message',
                    fieldLabel: getText('Message')
                },{
                    xtype: 'displayfield',
                    name : 'deviceValue',
                    fieldLabel: getText('Device value')
                }, {
                    xtype: 'textarea',
                    name : 'serverValue',
                    fieldLabel: getText('New value'),
                    height: 170,
                    allowBlank: false,
                    margin : '12 0 0 0'
                }             
            ]
        });


        this.items = [ 
            {  
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width: 650,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable:'y',
                
                defaults:{
                    bodyPadding: 20,
                    ui: 'form-panel'
                },
                
                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },
                
                items: [
                    characteristicsPanel
                ]
            }
        ];
        
        
        this.buttons = [
            {
                text: getText('Save'),
                action: 'save'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];
        
        this.callParent(arguments);
        this.setData(this.record);

    },


    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        var property = Ext.create('Dashboard.model.system.DeviceConfigurationProperty', this.record);
        property.data.serverValue = values.serverValue;
        return property;
    },
            
            
    setData: function(data){
                
        this.down('form').getForm().setValues(data);
        
        if(data.serverValue !== undefined && data.serverValue !== null ){
            this.down('field[name=serverValue]').setValue(data.serverValue);
        }else{
            this.down('field[name=serverValue]').setValue(data.deviceValue);
        }
        
    }


});   