
Ext.define('Dashboard.view.system.updatePackage.SelectDevices', {
    extend: 'Ext.window.Window',
    xtype: 'selectDevices',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.system.Devices'
    ],
    
    controller: 'updatePackageMain',

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
                handler: 'onSelectTargetDevices'
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
     * @return (object) data
     */
    getData: function(){
      
        var selectedDevices = this.getSelectedDevices();
        var devices = [];
        
        Ext.each(selectedDevices, function(device) {
            devices.push(device.data.id);
        });
      
        var values = {
            'id': this.record.id,
            'deviceIdList': devices
        };

        return values ;

    }

    
});   