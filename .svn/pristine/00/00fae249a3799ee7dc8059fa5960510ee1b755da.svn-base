/* global Ext  */

Ext.define('Dashboard.view.administration.user.GridPanelContext', {
    extend: 'Ext.grid.Panel',
    xtype: 'userGridPanel',
    requires: [
        'Dashboard.tool.Utilities'
    ],

    usersStore: null,
    cls: 'grid-checkbox-issue',
    scrollable : true,
    anchor: '100% 100%',

    initComponent: function() {
        var sm = Ext.create('Ext.selection.CheckboxModel',{
            showHeaderCheckbox: true
        });

        var me = this;
        var contextId = this.conID;

        this.usersStore = Ext.create('Dashboard.store.Users', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + contextId + '/users';
                }
                //,
                // load: function (store, operation, eOpts) {
                //     store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/users/search';
                // }
            }
        });

        Ext.apply( me, {

            store: this.usersStore,
            selModel: sm,
            itemId: 'userGridPanel',
            //reference: 'userGridPanel',
            autoHeight: true,
            columnLines: true,
            //stripeRows: true,
            //border: true,
            multiSelect: true,
            columns: {
                items: [
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
                        text: getText('Identifier'),
                        dataIndex: 'sticker',
                        flex: 1
                    },{
                        text: getText('First name'),
                        dataIndex: 'firstName',
                        flex: 1
                    },{
                        text: getText('Last name'),
                        dataIndex: 'lastName',
                        flex: 1
                    },{
                        text: getText('Badge number'),
                        dataIndex: 'badgeNumber',
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

        } );

        this.callParent(arguments);
    },

    setFilters: function (filterList) {
        if (filterList === undefined || filterList.length < 1) {
            this.usersStore.getProxy().extraParams.filter = [];
            this.usersStore.removeAll();
            this.usersStore.load();
            return;
        }

        if (!this.usersStore.getProxy().extraParams.filter) {
            this.usersStore.getProxy().extraParams.filter = [];
        }

        var usersStore = this.usersStore;
        filterList.forEach(function (filter) {
            usersStore.getProxy().extraParams.filter.push(filter);
        });

        this.usersStore.removeAll();
        this.usersStore.load();
    }
});