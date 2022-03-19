
/*  global Ext */

Ext.define('Dashboard.view.administration.location.GridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'locationGridPanel',
    
    requires: [
        //'Ext.selection.CheckboxModel',
        'Dashboard.tool.Utilities'
    ],

    reference: 'locationGridPanel',
    autoHeight: true,
    columnLines: true,
    stripeRows: true,
    border: true,
    multiSelect: true,
    scrollable : true,
    menuDisabled: false,
    
    cls: 'grid-checkbox-issue',
    
   // selType: 'checkboxmodel',
    
    locationsStore: null,
    withDevices: false,
    
    initComponent: function(){
        
        var sm = Ext.create('Ext.selection.CheckboxModel',{
            showHeaderCheckbox: true
        });
        
        var me = this;
                
        this.locationsStore = Ext.create('Dashboard.store.administration.Locations', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    if (this.withDevices) {
                        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/withdevices';
                    } else {
                        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/locations/search';
                    }
                    store.getProxy().setUrl(url);
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        this.locationsStore.getProxy().extraParams.filter = [];

        Ext.apply( me, {
            
            store: this.locationsStore,
//            selModel: {
//                type: 'checkboxmodel',
//                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                    var result = this.defaultRenderer(value);
//                    if (record) {
//                        return (record.get('userTrxId') === 1 || record.get('userTrxId') === 3) ? result : '';
//                    }
//                },
//                showHeaderCheckbox: true
//            },
//            selModel: {
//                selType: 'checkboxmodel',
//                showHeaderCheckbox: true
//            },
            selModel: sm,

//            selModel: {
//                type: 'spreadsheet',
//                mode: 'MULTI', //'SINGLE' 'SIMPLE'
//                allowDeselect: true,
//                columnSelect: true,
//                checkboxSelect: true,
////                checkboxColumnIndex : true,
//                showHeaderCheckbox: true,
//                pruneRemoved: false//,
//                //extensible: 'y'
//            },

            columns: {
                items: [
                    {
                        dataIndex: 'thumbnailName',
                        width: 50,
                        sortable: false,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store){

                            var picture = record.data.picture;
                            var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                            if (picture && picture.thumbnailName && picture.pictureSourceType) {
                                thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL
                                        + picture.pictureSourceType.toUpperCase()
                                        + '/'
                                        + picture.pictureSourceId
                                        + '?temp=' + Date.now();
                            }

                            return '<img src="' + thumbnailSrc + '" height="40" width="40" />';
                        }
                    }, 
                    {
                        text: getText('Address'),
                        dataIndex: 'address',
                        flex: 1
                    }, {
                        text: getText('Name'),
                        dataIndex: 'name',
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
                store: this.usersStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        this.callParent(arguments);
    },
    
    setFilters: function (filterList) {
        if (filterList === undefined || filterList.length < 1) {
            this.locationsStore.getProxy().extraParams.filter = [];
            this.locationsStore.removeAll();
            this.locationsStore.load();
            return;
        }

        if (!this.locationsStore.getProxy().extraParams.filter) {
            this.locationsStore.getProxy().extraParams.filter = [];
        }
        
        var locationStore = this.locationsStore;
        filterList.forEach(function (filter) {
            locationStore.getProxy().extraParams.filter.push(filter);
        });
        
        this.locationsStore.removeAll();
        this.locationsStore.load();
    }
});   