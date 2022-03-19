
Ext.define('Dashboard.view.administration.location.UsersGridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'locationUsersGridPanel',
    requires: [
        'Dashboard.tool.Utilities'
    ],

    store: null,

    reference: 'locationUsersGridPanel',
    autoHeight: true,
    columnLines: true,
//  stripeRows: true,
    border: true,
    multiSelect: true,
    
    
    
    initComponent: function() {
        
        this.store = Ext.create('Ext.data.Store',{
            //model: 'Dashboard.model.User',
            fields:['id', 'sticker', 'firstName', 'lastName', 'badgeNumber']//,
            //autoLoad: true
        });
        
        var me = this;
        
        Ext.apply( me, {

            
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
                    { text: getText('Identifier'), dataIndex: 'sticker', flex: 1 },
                    { text: getText('First name'), dataIndex: 'firstName', flex: 1},
                    { text: getText('Last name'), dataIndex: 'lastName', flex: 1},
                    { text: getText('Badge number'),dataIndex: 'badgeNumber',flex: 1}
                ]
            }

        } );

        this.callParent(arguments);
    }
});   