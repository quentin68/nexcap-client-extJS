
Ext.define('Dashboard.view.shared.property.GridPanelContext', {
    extend: 'Ext.grid.Panel',
    xtype: 'propertyGridPanel',

    requires: [
        'Dashboard.tool.Utilities'
    ],

    type: null,
    propertiesStore: null,
    cls: 'grid-checkbox-issue',
    nameFilter: null,

    initComponent: function () {
        var sm = Ext.create('Ext.selection.CheckboxModel',{
            showHeaderCheckbox: true
        });

        var me = this;
        var contextId = this.conID;

        var type = this.type;
        var hidden = true;
        if (type === null) {
            hidden = false;
        }

        this.propertiesStore = Ext.create('Dashboard.store.properties.Properties', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    // Reset filters
                    store.getProxy().extraParams.filter = [];

                    if (type !== null) {
                        var filterType = {
                            property: 'propertyConfigurationType',
                            value: type,
                            type: 'ENUM',
                            comparison: 'EQ'
                        };
                        store.getProxy().extraParams.filter.push(filterType);
                        var filterNotUsedInCategory = {
                            property: 'productCategory',
                            value: '',
                            type: 'OBJECT',
                            comparison: 'IS_NULL'
                        };
                        var filterNotUsedInReference = {
                            property: 'productReference',
                            value: '',
                            type: 'OBJECT',
                            comparison: 'IS_NULL'
                        };
                        store.getProxy().extraParams.filter.push(filterNotUsedInCategory);
                        store.getProxy().extraParams.filter.push(filterNotUsedInReference);
                    }

                    if (this.nameFilter !== null) {
                        store.getProxy().extraParams.filter.push(this.nameFilter);
                    }
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/contexts/'  + contextId + '/dynamicproperties';
                },
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        Ext.apply(me, {

            store: this.propertiesStore,
            selModel: sm,
            itemId: 'propertyGridPanel',
            reference: 'propertyGridPanel',
            height: 340,
            columnLines: true,
            multiSelect: true,

            columns: {
                items: [
                    {
                        text: getText('Label'),
                        dataIndex: 'label',
                        flex: 1
                    }, {
                        text: getText('Type'),
                        dataIndex: 'type',
                        flex: 1
                    }, {
                        text: getText('Configuration'),
                        dataIndex: 'propertyConfigurationType',
                        flex: 1,
                        hidden: hidden
                    }
                ]
            },

            listeners: {
                "added": function (grid) { //Reset proxy filter and sort params
                    if (grid.getStore().getProxy().extraParams.filter !== undefined) {
                        delete grid.getStore().getProxy().extraParams['filter'];
                    }
                }
            },

            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: this.propertiesStore,
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
            this.propertiesStore.getProxy().extraParams.filter = [];
            this.propertiesStore.removeAll();
            this.propertiesStore.load();
            return;
        }

        this.nameFilter = filterList[0];
        this.propertiesStore.removeAll();
        this.propertiesStore.load();
    }
});