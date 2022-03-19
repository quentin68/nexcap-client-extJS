
Ext.define('Dashboard.view.devicesManager.PositionSelection', {
    extend: 'Ext.window.Window',
    xtype: 'devicesManagerPositionSelection',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.system.Devices'
    ],
    
    stores: ['Devices'],
    
    iconCls: 'iconPosition',
    layout: 'fit',
    autoShow: true, 
    closable : false,
    resizable : false,
    modal : true,
    constrain: true,

    initComponent: function() {
        
        this.title = getText('Where do you want to assign this device?');
        
        this.items = [
            {
                xtype: 'form',
                width: 450,
                bodyPadding: 10,
                border: false,
                fieldDefaults: {
                    labelWidth: 118,
                    anchor: '100%',
                    labelSeparator: ' : '
                }, 
                items: [                    
                    {
                        xtype: 'autocompleteComboBox',
                        name: 'position',
                        anchor: '100%',
                        fieldLabel: getText('Position'),
                        displayField: 'name',
        				queryParam : false, //to remove param "query"
                        valueField: 'id',
                        filter: [
//                            {property: 'locationId', comparison: 'eq', type: 'long', value: 0} //We only need position, no location
                        ],
                        requires : ['Dashboard.store.administration.Positions'],
                        store: Ext.create('Dashboard.store.administration.Positions', {
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
                        hidden: true,
                        fieldLabel: getText('Location'),
                        allowBlank: false,
                        maxLength: 40
                    }
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