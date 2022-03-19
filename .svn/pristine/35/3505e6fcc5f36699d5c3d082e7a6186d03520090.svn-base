Ext.define('Dashboard.view.administration.position.Selector', {
    extend: 'Ext.window.Window',
    xtype: 'positionSelector',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.position.GridPanel'
    ],

    iconCls: 'iconBox',
    layout: 'fit',
    closable : false,
    closeAction : 'destroy',
    resizable : true,
    modal : true,
    record : [], // selectedRow.data
    constrain: true,
    bodyPadding: 16,
    
    parentController: null,

    initComponent: function() {
        
        this.title = getText('Position selection');
        
        this.items = [
            {
                xtype: 'form',//NXForm
                width: 640,
                height: 480,
                border: false,
                fieldDefaults: {
                    labelWidth: 112,
                    anchor: '100%',
                    labelSeparator: getText(':')
                }, 
                items: [ 
                    {
                        xtype: 'positionGridPanel',
                        anchor: '100% 100%',
                        multiSelect: false
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: getText('Select'),
                action: 'selectPositions',
                listeners:{ 
                    scope: this,
                    click: function( me , e , eOpts ){
                        this.parentController.onSelectPosition(me);
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
     * @return (object) data NOT encoded to jSon
     */
    getData: function(){
              
        // Get form values
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        return values; 
    }
    
});   