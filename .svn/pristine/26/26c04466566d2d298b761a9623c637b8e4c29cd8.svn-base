
Ext.define('Dashboard.view.setting.webClient.EditTitle', {
    extend: 'Ext.window.Window',
    xtype: 'webClientEditTitle',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    controller: 'webClientMain',
    

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
//    constrain: true,
    closeAction : 'destroy',
    //height: 450,
    iconCls: 'fa fa-wrench',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    initComponent: function() {
        
        this.title = getText('Edit title');
        
        var characteristicsPanel = Ext.create('Ext.panel.Panel',{
            border: false,
//            title: getText('Title'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'textfield',
                    name : 'title',
                    //fieldLabel: getText('Name'),
                    allowBlank: false,
                    minLength: 4, // If you edit this also edit MainContr.js 
                    maxLength: 50,
                    listeners: {
                        afterrender: function(field) {
                            field.focus(false, 100);
                        }
                    }
                }            
            ]
        });
        


        this.items = [ 
            {  
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width : 550,
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
                
                items : [
                    characteristicsPanel
                ]
            }
        ];
        
        
        this.buttons = [
            {
                text: getText('Save'),
                action: 'save',
                handler: 'onSaveTitle'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];
        
        this.callParent(arguments);

    },
    
    
    setData: function(title){
        
        var field = this.down('textfield[name=title]');
        field.setValue(title);
    },


    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues(); 
        
        return values;
    }
});   