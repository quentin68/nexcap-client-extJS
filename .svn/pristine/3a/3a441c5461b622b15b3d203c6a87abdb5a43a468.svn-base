
Ext.define('Dashboard.view.dashboard.DashboardSceneEditor', {
    extend: 'Ext.window.Window',
    xtype: 'dashboardSceneEditor',
    
    requires: [
        'Dashboard.model.DataCollection'
    ],
    
    controller:'dashboardSceneEditor',
    
    
    layout: 'fit',
    autoShow: false, 
    closable : false,
    resizable : false,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    
    record: {},
    
    serverId: null,

    initComponent: function() {
        
        this.title = getText('Dashboard scene editor');
        
        this.items = [
            
            {
                xtype: 'form',
                itemId: 'form',
                border:false,
                width: 550,
                height: 300,
                bodyPadding: 10,
                fieldDefaults: {
                    labelWidth: 150,
                    anchor: '100%',
                    labelSeparator: getText(':')
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: getText('Title'),
                        name: 'title',
                        allowBlank: false,
                        maxLength: 255
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: getText('Menu label'),
                        name: 'name',
                        allowBlank: false,
                        maxLength: 40
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: getText('Author'),
                        name: 'authorName',
                        allowBlank: true,
                        maxLength: 255
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items:[
                            {
                                xtype:'displayfield',
                                fieldLabel: getText('Background color'),
                                margin: '0 0 0 0',
                                submitValue: false,
                                labelWidth: 150,
                                labelSeparator: getText(':')
                            },
                            {
                                xtype: 'ux-panel',
                                border:true,
                                width: 32, 
                                height: 32,
                                bodyStyle:{
                                    background: "#F3F3F3"
                                },
                                listeners:{
                                    scope:this,
                                    click: function(sender, e){
                                        this.getController().onColorPicker(sender);
                                    }
                                },
                                margin: 0
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'color',
                                value: "#F4F4F4"
                            }
                        ]
                    }
                    
                ]                       
            }

        ];        

        this.buttons = [
            {
                text: getText('Save'),
                handler: 'onSaveDashboard' // create
            },
            {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);

    }, 
    
    
    /**
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        
        if(this.serverId){
            values.serverId = this.serverId;
        }
        
        if(this.record.indicatorIds !== undefined){
            values.indicatorIds = this.record.indicatorIds;
        }
        
        values.configuration = {
            backgroundColor: values.color
        };
        
        return values;
    }
    
});   