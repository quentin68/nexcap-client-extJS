Ext.define('Dashboard.view.dashboard.DashboardEditor', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboardEditor',

    requires: [
        'Dashboard.view.dashboard.DashboardMenu',
        'Dashboard.view.dashboard.DashboardEditorController'
    ],

    controller: 'dashboardEditor',

    name: 'dashboard_editor_menu',
    border: false,

    layout: {
        type: 'vbox'
    },

//    listeners: {
//        render: 'onRender'
//    },

    initComponent: function (){

        var me = this;

        Ext.apply(me, {

            items: [
                {
                    xtype: 'panel',
                    name: 'scene',
                    border: false,
                    width: '100%',
                    height: '100%',
                    layout: 'fit',
                    flex: 1,
                    autoScroll: true,
                    items: []

                },
                {
                    xtype: 'panel',
                    border: false,
                    height: 120,
                    layout: 'vbox',
                    flex: 0,
                    width: '100%',

                    plugins: 'responsive',
                    platformConfig: {
                        desktop: {
                            hidden: false
                        },
                        '!desktop': {
                            hidden: true
                        }
                    },

                    items: [
                        {
                            xtype: 'toolbar',
                            height: 24,
                            width: '100%',
                            ui: 'dashboard-editor-menu-toolbar',
                            layout: 'center',
                            margin: 0,
                            padding: 0,

                            items: [
                                {
                                    xtype: 'button',
                                    scale: "small",
                                    iconAlign: 'center',
                                    iconCls: 'fa fa-sort',
                                    ui: 'dashboard-editor-menu-icon',
                                    border: false,
                                    enableToggle: false,
                                    hidden: true,
                                    height: 24,
                                    reference: 'toogleEditionMode',
                                    handler: 'toogleEditionMode'
                                }
                            ]
                        }, {
                            xtype: 'panel',
                            ui: 'dashboard-editor-menu',
                            name: 'dashboardEditorBottom',
                            border: true,
                            layout: 'hbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'dashboard_editor_menu',
                                    height: 96,
                                    border: false,
                                    flex: 1
                                }, {
                                    xtype: 'button',
                                    ui: 'dashboard-editor-menu-button',
                                    width: 96,
                                    height: 96,
                                    scale: 'large',
                                    border: false,
                                    enableToggle: false,
                                    cls: 'icon-dashboard-menu-create',
                                    listeners: {
                                        click: 'onCreateDashboardClick'
                                    }
                                }
                            ]
                        }

                    ]
                }

            ]

        });

        me.callParent(arguments);
    }

});