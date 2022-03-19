Ext.define('Dashboard.view.system.device.GridPanelContext', {
    extend: 'Ext.grid.Panel',
    xtype: 'deviceGridPanel',
    requires: [
        'Dashboard.tool.Utilities'
    ],

    deviceStore: null,
    cls: 'grid-checkbox-issue',
    scrollable : true,
    // anchor: '100% 100%',

    initComponent: function () {
        var sm = Ext.create('Ext.selection.CheckboxModel',{
            showHeaderCheckbox: true
        });

        var me = this;
        var contextId = this.conID;

        this.deviceStore = Ext.create('Dashboard.store.system.Devices', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + contextId + '/devices';
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        Ext.apply(me, {
            store: this.deviceStore,
            selModel: sm,
            itemId: 'deviceGridPanel',
            height: 350,
            columnLines: true,
            multiSelect: true,

            columns: {
                items: [
                    {
                        text: getText('Name'),
                        dataIndex: 'name',
                        flex: 2
                    }, {
                        text: getText('Type'),
                        dataIndex: 'deviceType',
                        flex: 2
                    }, {
                        text: getText('Version'),
                        dataIndex: 'softwareVersion',
                        flex: 2
                    }, {
                        text: getText('Authorized'),
                        dataIndex: 'authorized',
                        flex: 1,
                        renderer: function (val) {
                            return val ? getText('Yes') : getText('No');
                        }
                    }, {
                        text: getText('Address'),
                        dataIndex: 'address',
                        flex: 2
                    }
                ]
            },

            listeners: {
                'added': function (grid) {
                    if (grid.getStore().getProxy().extraParams.filter !== undefined) {
                        delete grid.getStore().getProxy().extraParams['filter'];
                    }
                }
            },

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: this.deviceStore,
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
        if (filterList == undefined || filterList.length < 1) {
            this.deviceStore.getProxy().extraParams.filter = [];
            this.deviceStore.removeAll();
            this.deviceStore.load();
            return;
        }

        if (!this.deviceStore.getProxy().extraParams.filter) {
            this.deviceStore.getProxy().extraParams.filter = [];
        }

        var deviceStore = this.deviceStore;
        filterList.forEach(function (filter) {
            deviceStore.getProxy().extraParams.filter.push(filter);
        });

        this.deviceStore.removeAll();
        this.deviceStore.load();
    }
});