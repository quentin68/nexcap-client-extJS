
Ext.define('Dashboard.view.system.updatePackage.SelectDevicesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'selectDevicesGrid',
    
    requires: [
        'Ext.selection.CheckboxModel', // CheckBox plug-in
        'Dashboard.tool.Utilities',
        'Dashboard.store.system.Devices'
    ],
    
    record:{},

    initComponent: function() {
        
        var sm = Ext.create('Ext.selection.CheckboxModel', {
                showHeaderCheckbox: false
            });
        var me = this;
        
        var devicesStore = Ext.create('Dashboard.store.system.Devices',{
            autoLoad: true
        });
        
        Ext.apply( me, {
            
            store : devicesStore,
            selModel: sm,
            iconCls: 'iconDevice',
            title: getText('Devices inventory'),
            autoHeight: true,
            columnLines: true,
            stripeRows: true,
            border: false,
            multiSelect: true,
            
            columns: {
                items: [
                    {
                        text: getText('Name'),  
                        dataIndex: 'name',  
                        flex: 1
                    },{
                        text: getText('Type'),
                        dataIndex: 'deviceType',
                        flex: 1,
                        renderer: function (val, metaData, record) {
                            return record.data.deviceTypeLabel;
                        }
                    },{
                        text: getText('Version'),
                        dataIndex: 'softwareVersion',
                        flex: 1
                    },{
                        text: getText('Description'),
                        dataIndex: 'description',
                        flex: 2
                    }
                ]
            },
            
            listeners:{
                "added" : function(grid){ //Reset proxy filter and sort params
                    if(grid.getStore().getProxy().extraParams.filter !== undefined){                                    
                        delete grid.getStore().getProxy().extraParams['filter'];
                    }         
                }
            },
            
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: devicesStore,
                    dock: 'bottom',
                    displayInfo: true,
                    displayMsg: getText('Results') + ' {0} - {1} sur {2}',
                    emptyMsg: getText('No results!')
                }
            ]

        } );

        this.callParent(arguments);        
    }

    
});   