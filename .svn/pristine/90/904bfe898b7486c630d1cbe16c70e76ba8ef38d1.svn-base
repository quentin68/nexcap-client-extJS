/*  global Ext  */

Ext.define('Dashboard.view.system.device.SelectDevices', {
    extend: 'Ext.window.Window',
    xtype: 'deviceSelectDevices',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.system.Devices'
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
    width : 650,
    iconCls: 'fa fa-upload',
    plain : true,
    autoScroll: true,
    scrollable:'y',
    
    record: null,

    initComponent: function() {
        
        this.title = getText('Select targeted devices');
        
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 20,
                border: false,
                autoScroll: true,
                items : [
                    {
                        xtype: 'selectDevicesGrid', 
                        record: this.record,
                        anchor: '100% 100%'
                    }
                ]
            }
        ];
        
        this.buttons = [
            {
                text: getText('Select'),
                action: 'select'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);

    }, 
            
            
    getSelectedDevices: function(){
        
        var dataGrid = this.down('grid');
        var selectedRaw = dataGrid.getSelectionModel().getSelection();
        return selectedRaw;
    },

    
    /**
     * Method used by the controller to get values
     * @return (array) list of deviceId
     */
    getData: function(){
      
        var selectedDevices = this.getSelectedDevices();
        var devices = [];
        
        Ext.each(selectedDevices, function(device) {
            devices.push(device.data.id);
        });
      
        return devices ;
    }
    
});   