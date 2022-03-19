/* global Ext */

Ext.define('Dashboard.view.administration.material.GridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'materialGridPanel',

    requires: [
        'Dashboard.tool.Utilities'
    ],
    closeAction : 'destroy',

    type: null,
    materialStore: null,
    cls: 'grid-checkbox-issue',
    nameFilter: null,

    scrollable: true,

    initComponent: function () {
        var sm = Ext.create('Ext.selection.CheckboxModel',{
            showHeaderCheckbox: true
        });

        var me = this;
        
        this.materialStore = Ext.create('Dashboard.store.Materials', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, filters, eOpts){
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        Ext.apply(me, {

            store: this.materialStore,
            selModel: sm,
            itemId: 'materialGridPanel',
            reference: 'materialGridPanel',
            height: 340,
            columnLines: true,
            multiSelect: true,

            columns: {
                items: [
                    /*{
                        dataIndex: 'thumbnailName',
                        width: 50,
                        sortable: false,
                        locked: true,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {

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
                    },*/ {
                        text: getText('Name'),
                        dataIndex: 'name',
                        flex: 1
                    }, {
                        text: getText('Ref. code'),
                        dataIndex: 'productReference',
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            return value.referenceCode || '';
                        },
                        flex: 1
                    }, {
                        text: getText('Ref. designation'),
                        dataIndex: 'productReference',
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            return value.designation || '';
                        },
                        flex: 1
                    }, {
                        text: getText('Category'),
                        dataIndex: 'productReference',
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            return value.productCategory.fullPath || '';
                        },
                        flex: 1
                    }
                ]
            },

            listeners: {
                render: function (grid) { //Reset proxy filter and sort params
                    if (grid.store.getProxy().extraParams.filter) {
                        grid.store.getProxy().extraParams.filter = [];
                    }
                }
            },

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: this.materialStore,
                    dock: 'bottom',
                    displayInfo: true,
                    displayMsg: getText('Results') + ' {0} - {1} sur {2}',
                    emptyMsg: getText('No results!')
                }
            ]

        });

        this.callParent(arguments);
    },

    setFilters: function (filterList) {
                
        if (filterList === undefined || filterList.length < 1) {
            this.nameFilter = null;
            this.materialStore.getProxy().extraParams.filter = [];
            this.materialStore.removeAll();
            this.materialStore.load();
            return;
        }
        
        if (!this.materialStore.getProxy().extraParams.filter) {
            this.materialStore.getProxy().extraParams.filter = [];
        }

        var materialStore = this.materialStore;
        filterList.forEach(function (filter) {
            materialStore.getProxy().extraParams.filter.push(filter);
        });

        this.materialStore.removeAll();
        this.materialStore.load();
    }
});