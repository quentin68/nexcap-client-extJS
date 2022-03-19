
/*  global Ext */

Ext.define('Dashboard.view.system.sensor.GridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'sensorGridPanel',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],

    reference: 'sensorGridPanel',
    autoHeight: true,
    columnLines: true,
    stripeRows: true,
    border: true,
    multiSelect: false,
    scrollable : true,
    menuDisabled: false,
    
    sensorType: null,
    sensorsStoreUrl: null,
    
    cls: 'grid-checkbox-issue',
        
    sensorStore: null,
    
    initComponent: function(){
        
        var sm = Ext.create('Ext.selection.CheckboxModel',{
            showHeaderCheckbox: true
        });
        
        var me = this;
                
        this.sensorStore = Ext.create('Dashboard.store.system.Sensors', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    
//                    if(this.sensorsStoreUrl){
//                        store.getProxy().setUrl(this.sensorsStoreUrl);
//                    }
//                    
//                    store.getProxy().setActionMethods({read: 'GET'});
//                    
//                    
//                    if(!this.sensorType){
//                        this.sensorType = '';
//                    }
//                    
//                    var myFilter = {
//                        property: 'sensorType',
//                        value: this.sensorType,
//                        type: 'STRING',
//                        comparison: 'CONTAINS'
//                    };
//                    
                    if(!store.getProxy().extraParams.filter){
                        store.getProxy().extraParams.filter = [];
                    }
//                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                    var url = Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/search';
                    store.getProxy().setUrl(url);
                    store.getProxy().setActionMethods({read: 'POST'});
                }
            }
        });

        //this.sensorStore.getProxy().extraParams.filter = [];

        Ext.apply( me, {
            
            store: this.sensorStore,
            //selModel: sm,

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
                store: this.sensorStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        this.callParent(arguments);
    },
    
    setFilters: function (filterList) {
                
        if (filterList === undefined || filterList.length < 1) {
            this.sensorStore.getProxy().extraParams.filter = [];
            this.sensorStore.removeAll();
            this.sensorStore.load();
            return;
        }

        if (!this.sensorStore.getProxy().extraParams.filter) {
            this.sensorStore.getProxy().extraParams.filter = [];
        }
        
        var sensorStore = this.sensorStore;
        filterList.forEach(function (filter) {
            sensorStore.getProxy().extraParams.filter.push(filter);
        });
        
        this.sensorStore.removeAll();
        this.sensorStore.load();
    }
});   