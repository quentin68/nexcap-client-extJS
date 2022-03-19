
Ext.define('Dashboard.view.administration.position.GridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'positionGridPanel',
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    initComponent: function() {
        
        var me = this;
        
        var usersStore = Ext.create('Dashboard.store.administration.Positions',{
            autoLoad: true
        });
        
        Ext.apply( me, {
            
            store: usersStore,
            itemId: 'positionGridPanel',
            //reference: 'userGridPanel',
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
            
            columns: {
                items: [
//                     {
//                        xtype: 'checkcolumn',
//                        header: 'Active?',
//                        dataIndex: 'active', // model property to bind to
//                        width: 60//,
//                        editor: {
//                            xtype: 'checkbox',
//                            cls: 'x-grid-checkheader-editor'
//                        }
//                     },
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
                    },
                    {
                        text: getText('Position'), 
                        dataIndex: 'name', 
                        flex: 1
                    },{
                        text: getText('Address'), 
                        dataIndex: 'address', 
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
            
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: usersStore,
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