Ext.define('Dashboard.view.system.importData.GridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'importGridPanel',
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    importStore: null,
    
    initComponent: function() {
        
        var me = this;
        
        this.importStore = Ext.create('Dashboard.store.system.Import',{
            autoLoad: true,
            listeners: {
                scope: this,
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });
        
        Ext.apply( me, {
            
            store: this.importStore,
            itemId: 'importGridPanel',
            import: 'importGridPanel',
            autoHeight: true,
            columnLines: true,
            multiSelect: true,
            
            columns: [
                {
                   text: getText('File name'), 
                   dataIndex: 'filename', 
                   flex: 1
               },{
                   text: getText('Author'), 
                   dataIndex: 'username', 
                   flex: 1
               },{
                   text: getText('Date'), 
                   dataIndex: 'importationDate',
                   flex: 1
               },{
                   text: getText('Errors'),
                   dataIndex: 'nbErrors',
                   flex: 1
               }
           ],
            listeners:{
                "added" : function(grid){ //Reset proxy filter and sort params
                    if(grid.getStore().getProxy().extraParams.filter !== undefined){                                    
                        delete grid.getStore().getProxy().extraParams['filter'];
                    }         
                }
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                store: this.importStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        } );

        this.callParent(arguments);
    },
    
    setFilters: function (filterList) {
        if (filterList === undefined || filterList.length < 1) {
            this.importStore.getProxy().extraParams.filter = [];
            this.importStore.removeAll();
            this.importStore.load();
            return;
        }

        if (!this.importStore.getProxy().extraParams.filter) {
            this.importStore.getProxy().extraParams.filter = [];
        }

        this.importStore.removeAll();
        this.importStore.load();
    }
});   