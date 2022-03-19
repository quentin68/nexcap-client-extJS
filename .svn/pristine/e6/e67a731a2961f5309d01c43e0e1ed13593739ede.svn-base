/* global Ext  */

Ext.define('Dashboard.view.menu.TreeListMenu', {
    extend: 'Ext.panel.Panel',
    xtype: 'treeListMenu',
    
    requires: [
        'Ext.list.Tree',
        'Ext.list.TreeItem',
        'Dashboard.view.menu.TreeListMenuModel',
        'Dashboard.view.menu.TreeListMenuController',
        'Dashboard.view.menu.MyCustomTreeListItem'
    ],
    
    controller: 'treeListMenu',
    reference: 'treelistContainer',

    width: 220,//192,
    ui: 'nav',
    layout: 'border',
    
//    listeners:{
       // render: 'onRenderMenu'
//    },
    

    viewModel: {
        type: 'treeListMenu',
        mode: 'micro'
    },


//    header: {
//        items: [
//            {
//                xtype: 'button',
//                iconCls: 'fa fa-bars',
//                ui: 'nav',
//                enableToggle: true,
//                toggleHandler: 'onToggleMicro'
//            }
//        ]
//    },

    items: [
        {
            region: 'west',
            //width: 230,//192,
            width: '100%',
            reference: 'treelistContainer',
            ui: 'nav',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            scrollable: 'y',
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    pack: 'center',
                    ui: 'nav',
                    items: [
                        {
                            xtype: 'combo',
                            displayField: 'title',
                            typeAhead: false,
                            hideLabel: true,
                            hideTrigger: true,
                            //anchor: '100%',
                            emptyText: 'Search',
                            reference: 'search',
                            hidden: true // @Todo
                        }, {
                            xtype: 'button',
                            ui: 'nav',
                            scale: 'small',
                            iconCls: 'fa fa-bars',
                            reference: 'menuBars',
                            tooltip: 'Menu',
                            enableToggle: true,
                            toggleHandler: 'onToggleMicro',
                            style: 'margin-left: 13px; margin-top: 12px; margin-bottom: 8px;',
                            hidden: false // @Todo
                        }
                    ]
                }, {
                    xtype: 'treelist',
                    reference: 'treelist',
                    ui: 'nav',
                    expanderOnly: false,
                    
//                    viewConfig: {
//                        plugins: {
//                            ptype: 'treeviewdragdrop',
//                            containerScroll: true
//                        }
//                    },
                    defaults: {
                        xtype: 'customtreelistitem',
                        floaterConfig: {
                            maxHeight: 350
                        }
                    },
                    
                    bind: '{navItems}',
                    listeners:{
                        itemclick: 'onTreeItemSelected'
                    }
                }
            ],
            listeners:{
                render: 'onToggleNav'
            }
        }
    ]
});




Ext.define('Dashboard.view.menu.MyCustomTreeListItem', {
    extend: 'Ext.list.TreeItem',
    xtype: 'customtreelistitem',
    config: {
        floaterConfig: {}
    },
    createFloaterMenu: function () {
        var me = this,
            owner = me.getOwner(),
            ui = owner.getUi(),
            cls = Ext.baseCSSPrefix + 'treelist',
            floater;

        if (ui) {
            cls += ' ' + cls + '-' + ui;
        }

        me.floater = floater = new Ext.container.Container(Ext.applyIf({
            cls: cls + ' ' + Ext.baseCSSPrefix + 'treelist-floater',
            floating: true,
            width: 192,
            maxHeight: 350,
            scrollable: true,
            shadow: false,
            renderTo: Ext.getBody(),
            listeners: {
                element: 'el',
                click: function (e) {
                    return owner.onClick(e);
                }
            }
        }, me.getFloaterConfig()));

        floater.add(me);
        floater.el.alignTo(me.getToolElement(), 'tr?');

        return floater;
    }
});

