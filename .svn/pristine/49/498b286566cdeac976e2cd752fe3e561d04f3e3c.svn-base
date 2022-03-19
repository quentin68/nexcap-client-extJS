
Ext.define('Dashboard.view.system.device.Register', {
    extend: 'Ext.window.Window',
    xtype: 'deviceRegister',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    parentController: 'deviceMain',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 350,
    //iconCls: 'fa fa-bullseye',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    record:null,


    initComponent: function() {
        
        this.title = getText('Register');
        
        var formPanel = {
            xtype: 'panel',
            border: false,
            title: getText('Place'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    name : 'position',
                    fieldLabel: getText('Position address'),
                    allowBlank: false,
    				queryParam : false, //to remove param "query"
                    displayField: 'address',
                    valueField: 'address',
                    requires : ['Dashboard.store.administration.Locations'],
                    store: Ext.create('Dashboard.store.administration.Locations', {
                        autoLoad: false,
                        sorters: [ {
                            property: 'name',
                            direction: 'ASC'
                        } ]
                    })
                },
                {
                    xtype: 'textfield',
                    name : 'locationName',
                    fieldLabel: getText('New location name'),
                    hidden: true,
                    allowBlank: false
                }             
            ]
        };

        this.items = [ 
            {  
                xtype: 'form',
                bodyPadding: 6,
                border: false,
                width : 650,
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
                    formPanel
                ]
            }
        ];
        
        
        this.buttons = [
            {
                text: getText('Save'),
                //handler: 'onSubmitRegister',
                listeners:{ 
                    scope: this,
                    click: function( me , e , eOpts ){
                        this.parentController.onSubmitRegister(me);
                    }
                }
            },{
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
        
        return values;
    }

});   