
Ext.define('Dashboard.view.administration.interventionOrder.ReferencesGridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'interventionOrderReferencesGridPanel',
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    referencesStore: null,
    
    initComponent: function() {
        
        var me = this;
        
        this.referencesStore = Ext.create('Dashboard.store.administration.InterventionOrderReferences',{
            autoLoad: false
        });
        
//        var filter = {
//            property: filter._property,
//            value: filter._value,
//            type: filter._type,
//            comparison: filter._comparison
//        };
        this.referencesStore.getProxy().extraParams.filter = [];
        
        
        Ext.apply( me, {
            
            store: this.referencesStore,
            itemId: 'interventionOrderReferencesGridPanel',
            reference: 'interventionOrderReferencesGridPanel',
            autoHeight: true,
            columnLines: true,
            stripeRows: true,
            border: true,
            multiSelect: true,
            
//            selModel: {
//                type: 'spreadsheet',
//                columnSelect: true,
//                checkboxSelect: true,
//                pruneRemoved: false,
//                extensible: 'y'
//            },
            
            columns: {
                items: [
                     {

                        dataIndex: 'thumbnailName',
                        width: 50,
                        sortable: false,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store){
                            
                            var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;
                            
                            if(value !== null && value !== "" ){
                                
                                var pictureSourceType = record.get('pictureSourceType');
                                
                                if(pictureSourceType === null){
                                    return '<img src="' + thumbnailSrc + '" height="40" width="40" />';
                                }

                                thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL 
                                        + pictureSourceType.toLowerCase()
                                        + '/' 
                                        + record.get('pictureSourceId')
                                        +'/thumbnail'
                                        + '?temp=' + Date.now();               
                            }
                            
                            return '<img src="' + thumbnailSrc + '" height="40" width="40" />'; 
                        }
                    },
                    {
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
                        renderer: function (productCategory) {
                            if (productCategory) {
                                return productCategory.fullPath;
                            }
                            return '';
                        },
                        flex: 1
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
                    store: this.referencesStore,
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