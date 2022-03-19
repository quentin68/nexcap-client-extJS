
/*  global Ext */

Ext.define('Dashboard.view.administration.telemetryData.GridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'telemetryDataGridPanel',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],

    reference: 'telemetryDataGridPanel',
    autoHeight: true,
    columnLines: true,
    stripeRows: true,
    border: true,
    multiSelect: true,
    scrollable : true,
    menuDisabled: false,
    
    cls: 'grid-checkbox-issue',
        
    telemetryDataStore: null,
    
    initComponent: function(){
        
        var sm = Ext.create('Ext.selection.CheckboxModel',{
            showHeaderCheckbox: true
        });
        
        var me = this;
                
        this.telemetryDataStore = Ext.create('Dashboard.store.administration.TelemetryData', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/search';
                    store.getProxy().setUrl(url);
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        this.telemetryDataStore.getProxy().extraParams.filter = [];

        Ext.apply( me, {
            
            store: this.telemetryDataStore,
            selModel: sm,

            columns: {
                items: [
                    {
                        text: getText('Name'),
                        dataIndex: 'name',
                        flex: 1
                    }, {
                        text: getText('Type'),
                        dataIndex: 'sensorType',
                        flex: 1
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
            
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                store: this.telemetryDataStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        this.callParent(arguments);
    },
    
    setFilters: function (filterList) {
        if (filterList === undefined || filterList.length < 1) {
            this.telemetryDataStore.getProxy().extraParams.filter = [];
            this.telemetryDataStore.removeAll();
            this.telemetryDataStore.load();
            return;
        }

        if (!this.telemetryDataStore.getProxy().extraParams.filter) {
            this.telemetryDataStore.getProxy().extraParams.filter = [];
        }
        
        var telemetryDataStore = this.telemetryDataStore;
        filterList.forEach(function (filter) {
            telemetryDataStore.getProxy().extraParams.filter.push(filter);
        });
        
        this.telemetryDataStore.removeAll();
        this.telemetryDataStore.load();
    }
});   