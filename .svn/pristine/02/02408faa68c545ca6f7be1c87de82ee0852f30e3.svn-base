
Ext.define('Dashboard.view.system.updatePackage.SelectPackage', {
    extend: 'Ext.window.Window',
    xtype: 'selectPackage',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.system.updatePackage.MainController'
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
    iconCls: 'fa fa-gift',
    plain : true,
    autoScroll: true,
    scrollable:'y',
    
    controller: 'updatePackageMain',

    initComponent: function() {
        
        this.title = getText('Add a package');
        
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 20,
                border: false,
                width: 500,
                height: 400,

                items: [
                    {
                        xtype: 'fileuploadfield',                        
                        name: 'file',
                        scale: 'small',
                        anchor: '100%',
                        buttonText: getText('Select'),
                        emptyText : getText('Select a package update in .zip format'),
                        allowBlank : false,
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
                action: 'savePackage',
                handler: 'onSavePackage'
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