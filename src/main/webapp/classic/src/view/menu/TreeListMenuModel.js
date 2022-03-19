Ext.define('Dashboard.view.menu.TreeListMenuModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.treeListMenu',
    

    formulas: {
        selectionText: function(get) {
            var selection = get('treelist.selection'),
                path;
            if (selection) {
                path = selection.getPath('text');
                path = path.replace(/^\/Root/, '');
                return 'Selected: ' + path;
            } else {
                return 'No node selected';
            }
        }
    },

    stores: {
        navItems: {
            type: 'tree',
            root: {
                expanded: true,
                children: [
                    
//                {
//                    text: 'Dashboards',
//                    name: 'dashboards',
//                    iconCls: 'icon-menu-dashboard',
//                    children: [
//                        {
//                            text: 'Dash 1',
//                            iconCls: 'x-fa fa-tag',
//                            dashboardId: '1',
//                            action: 'show_dashboard',
//                            leaf: true
//                        },{
//                            text: 'Inactive',
//                            iconCls: 'x-fa fa-trash',
//                            dashboardId: '2',
//                            action: 'show_dashboard',
//                            leaf: true
//                        }
//                    ]
//                },
//                {
//                    text: 'Search',
//                    iconCls: 'icon-menu-search',
//                    leaf: true
//                },
//                {
//                    text: 'Notifications',
//                    iconCls: 'icon-menu-notifications',
//                    leaf: true
//                },
//                {
//                    text: 'Administration',
//                    iconCls: 'icon-menu-administration',
//                    children: [
//                        {
//                            text: 'Messages',
//                            iconCls: 'x-fa fa-inbox',
//                            leaf: true
//                        },
//                        {
//                            text: 'Archive',
//                            iconCls: 'x-fa fa-database',
//                            children: [{
//                                text: 'First',
//                                iconCls: 'x-fa fa-sliders',
//                                leaf: true
//                            },{
//                                text: 'No Icon',
//                                iconCls: null,
//                                leaf: true
//                            }]
//                        },
//                        {
//                            text: 'Music',
//                            iconCls: 'x-fa fa-music',
//                            leaf: true
//                        },
//                        {
//                            text: 'Video',
//                            iconCls: 'x-fa fa-film',
//                            leaf: true
//                        }
//                    ]
//                },
//                    {
//                        text: 'Settings',
//                        iconCls: 'icon-menu-settings',
//                        children: [{
//                            text: 'Sharing',
//                            iconCls: 'x-fa fa-share-alt',
//                            leaf: true
//                        },{
//                            text: 'Notifications',
//                            iconCls: 'x-fa fa-flag',
//                            leaf: true
//                        },{
//                            text: 'Network',
//                            iconCls: 'x-fa fa-signal',
//                            leaf: true
//                        },{
//                            text: 'Sharing',
//                            iconCls: 'x-fa fa-share-alt',
//                            leaf: true
//                        },{
//                            text: 'Notifications',
//                            iconCls: 'x-fa fa-flag',
//                            leaf: true
//                        },{
//                            text: 'Network',
//                            iconCls: 'x-fa fa-signal',
//                            leaf: true
//                        },{
//                            text: 'Sharing',
//                            iconCls: 'x-fa fa-share-alt',
//                            leaf: true
//                        },{
//                            text: 'Notifications',
//                            iconCls: 'x-fa fa-flag',
//                            leaf: true
//                        },{
//                            text: 'Network',
//                            iconCls: 'x-fa fa-signal',
//                            leaf: true
//                        },{
//                            text: 'Sharing',
//                            iconCls: 'x-fa fa-share-alt',
//                            leaf: true
//                        },{
//                            text: 'Notifications',
//                            iconCls: 'x-fa fa-flag',
//                            leaf: true
//                        },{
//                            text: 'Network',
//                            iconCls: 'x-fa fa-signal',
//                            leaf: true
//                        }
//                    ]
//                }
                ]
            }
        }
    }
});