
/* global Dashboard, Ext */

Ext.define('Dashboard.view.system.context.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'contextDetail',

    usersStore: null,
    deviceStore: null,
    propertiesStore: null,
    materialsStore: null,

    initComponent: function () {
        
        this.configDetail();

        var me = this;
        Ext.apply(me, {
            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}'
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                }, {
                    title: getText('Position'),
                    reference: 'position',
                    iconCls: 'fa fa-map-marker'
                }, {
                    title: getText('Users'),
                    reference: 'users',
                    iconCls: 'fa fa-user',
                    xtype: 'panel',
                    items: []
                }, {
                    xtype: 'panel',
                    title: getText('Devices'),
                    reference: 'devices',
                    iconCls: 'fa fa-laptop',
                    items: []
                }, {
                    title: getText('Dynamic properties'),
                    hidden: true,
                    reference: 'properties',
                    iconCls: 'fa fa-asterisk',
                    items: []
                }, {
                    xtype: 'panel',
                    title: getText('Items'),
                    hidden: false,
                    reference: 'materials',
                    iconCls: 'fa fa-tag',
                    items: []
                }
            ]
        });
        this.callParent(arguments);
    },

    setData: function (data) {
        if (!data) {
            return;
        }
        
        var contextId = data.id;
        
        var materialsPanel = this.down('panel[reference=materials]');
        var usersPanel = this.down('panel[reference=users]');
        var devicesPanel = this.down('panel[reference=devices]');
        var propertiesPanel = this.down('panel[reference=properties]');
        
        materialsPanel.removeAll();
        usersPanel.removeAll();
        devicesPanel.removeAll();
        propertiesPanel.removeAll();
        
        
        if (data.isMaterialRestrictionEnabled) {
            materialsPanel.show();
        } else {
            materialsPanel.hide();
        }
              
        if (data.isMaterialRestrictionEnabled) {
            var materialsStore = Ext.create('Dashboard.store.Materials', {
                autoLoad: true,
                listeners: {
                    scope: this,
                    beforeload: function (store, operation, eOpts) {
                        store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME +
                                '/contexts/'  + contextId + '/materials';
                    },
                    load: function (store, operation, eOpts) {
                        store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/materials/search';
                    }
                }
            });

            var materialsColumns = [
                {text: getText('Name'), dataIndex: 'name', flex: 1, sortable: false},
                {text: getText('Description'), dataIndex: 'description', flex: 2, sortable: false}
            ];
            var materialsGrid = this.buildGrid(materialsStore, materialsColumns);
            materialsPanel.add(materialsGrid);
        }
        
        //------------------------------------------
        
        var usersStore = Ext.create('Dashboard.store.Users', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME +
                            '/contexts/'  + contextId + '/users';
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/users/search';
                }
            }
        });
        
        var usersColumns = [
            {text: getText('Identifier'), dataIndex: 'sticker', flex: 1, sortable: false},
            {text: getText('First name'), dataIndex: 'firstName', flex: 1, sortable: false},
            {text: getText('Last name'), dataIndex: 'lastName', flex: 1, sortable: false}
        ];
        var usersGrid = this.buildGrid(usersStore, usersColumns);
        usersPanel.add(usersGrid);
        
        //-----------------------------------------------------------
        
        var devicesStore = Ext.create('Dashboard.store.system.Devices', {
            autoLoad: true,
            listeners: {
                scope: this,
                beforeload: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME +
                            '/contexts/'  + contextId + '/devices';
                },
                load: function (store, operation, eOpts) {
                    store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/devices/search';
                }
            }
        });
        
        var devicesColumns = [
            {text: getText('Name'), dataIndex: 'name', flex: 2, sortable: false},
            {text: getText('Type'), dataIndex: 'deviceType', flex: 2, sortable: false},
            {text: getText('Version'), dataIndex: 'softwareVersion', flex: 2, sortable: false},
            {text: getText('Authorized'), dataIndex: 'authorized', flex: 1, sortable: false,
                renderer: function (val) {
                    return val ? getText('Yes') : getText('No');
                }
            }
        ];
        var devicesGrid = this.buildGrid(devicesStore, devicesColumns);
        devicesPanel.add(devicesGrid);
        
        //-----------------------------------------------------------
        
        if (data.isPropConfRestrictionEnabled) {
            propertiesPanel.show();
        } else {
            propertiesPanel.hide();
        }
        
        if (data.isPropConfRestrictionEnabled) {
            var propertiesStore = Ext.create('Dashboard.store.properties.Properties', {
                autoLoad: true,
                listeners: {
                    scope: this,
                    beforeload: function (store, operation, eOpts) {
                        store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME +
                                '/contexts/'  + contextId + '/dynamicproperties';
                    },
                    load: function (store, operation, eOpts) {
                        store.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/dynamicproperties/search';
                    }
                }
            });

            var propertiesColumns = [
                {text: getText('Name'), dataIndex: 'name', flex: 2, sortable: false},
                {text: getText('Type'), dataIndex: 'type', flex: 1, sortable: false},
                {text: getText('Configuration'), dataIndex: 'propertyConfigurationType', flex: 1, sortable: false}
            ];
            var propertiesGrid = this.buildGrid(propertiesStore, propertiesColumns);
            propertiesPanel.add(propertiesGrid);
        }
        
        //-----------------------------------------------------
        

        // Position
        if (data.rootPositionList && data.rootPositionList.length > 0) {
            var characteristicsPanel = this.query('panel[reference=position]')[0];
            characteristicsPanel.removeAll();

            var positionPath = '';
            if (data.rootPositionList[0].path) {
                positionPath = data.rootPositionList[0].path + ' / ';
            }

            characteristicsPanel.add(this.buildField({
                name: getText('Position'),
                value: positionPath + data.rootPositionList[0].name
            }));
        }
        
        // Rstrictions 
        characteristicsPanel.add(this.buildField({
            name: getText('Restricts dynamic properties'),
            value: data.isPropConfRestrictionEnabled ? getText('Yes') : getText('No')
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Restricts items'),
            value: data.isMaterialRestrictionEnabled ? getText('Yes') : getText('No')
        }));
        

        this.viewModel.setData(data);
                
    },
    
    
    buildGrid: function(store, columns){
        
        var grid = {
            xtype: 'grid',
            store: store,
            loadMask: true,
            width: '100%',
            maxHeight: 300,
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            viewConfig: {
                stripeRows: true
            },
            columns: columns,
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
                displayInfo: false
            }
        };
        
        return grid;
    }
});