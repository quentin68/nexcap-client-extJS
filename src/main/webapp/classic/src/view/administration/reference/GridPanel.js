/* global Ext */

Ext.define('Dashboard.view.administration.reference.GridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'referenceGridPanel',
    requires: [
        'Dashboard.tool.Utilities'
    ],
    closeAction : 'destroy',
    
    referencesStore: null,
    
    initComponent: function() {
        
        var me = this;
        
        this.referencesStore = Ext.create('Dashboard.store.References',{
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
            
            store: this.referencesStore,
            //itemId: 'referenceGridPanel',
            reference: 'referenceGridPanel',
            autoHeight: true,
            columnLines: true,
            //stripeRows: true,
            //border: true,
            multiSelect: true,
            
//            selModel: {
//                type: 'spreadsheet',
//                mode: 'MULTI', //'SINGLE' 'SIMPLE'
//                allowDeselect: true,
//                columnSelect: true,
//                checkboxSelect: true//,
////                checkboxColumnIndex : true,
////                showHeaderCheckbox: true,
//                pruneRemoved: false//,
//                //extensible: 'y'
//            },
            
            columns: [
                {
                   dataIndex: 'thumbnailName',
                   width: 50,
                   sortable: false,
                   renderer: function(value, metaData, record, rowIndex, colIndex, store){

                       var picture = record.data.picture;
                       var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                       if(picture && picture.thumbnailName && picture.pictureSourceType){
                          thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL 
                               + picture.pictureSourceType.toUpperCase()
                               + '/' 
                               + picture.pictureSourceId
                               + '?temp=' + Date.now();
                       }

                       return '<img src="' + thumbnailSrc + '" height="40" width="40" />'; 
                   }
               },{
                   text: getText('Reference code'), 
                   dataIndex: 'referenceCode', 
                   flex: 1
               },{
                   text: getText('Designation'), 
                   dataIndex: 'designation', 
                   flex: 1
               },{
                   text: getText('Category'), 
                   dataIndex: 'productCategory', 
                   flex: 1,
                   renderer: function (productCategory) {
                       if (productCategory) {
                           return productCategory.fullPath;
                       }
                       return '';
                   }
               },{
                   text: getText('Type'),
                   dataIndex: 'identified',
                   flex: 1,
                   renderer : function(val) {
                       if (val === true) {
                           return '<span>' + getText('Item') + '</span>';
                       } else {
                           return '<span>' + getText('Items Set') + '</span>';
                       }
                       return val;
                   }
               }
           ],
            listeners:{
                render : function(grid){ //Reset proxy filter and sort params
                    if(grid.getStore().getProxy().extraParams.filter !== undefined){                                    
                        delete grid.getStore().getProxy().extraParams['filter'];
                    }         
                }
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                store: this.referencesStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        } );

        this.callParent(arguments);
    },
    
    setFilters: function (filterList) {
        if (filterList === undefined || filterList.length < 1) {
            this.referencesStore.getProxy().extraParams.filter = [];
            this.referencesStore.removeAll();
            this.referencesStore.load();
            return;
        }

        if (!this.referencesStore.getProxy().extraParams.filter) {
            this.referencesStore.getProxy().extraParams.filter = [];
        }

        var locationStore = this.referencesStore;
        filterList.forEach(function (filter) {
            locationStore.getProxy().extraParams.filter.push(filter);
        });

        this.referencesStore.removeAll();
        this.referencesStore.load();
    }
});   