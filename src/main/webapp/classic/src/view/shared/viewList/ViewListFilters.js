Ext.define('Dashboard.view.shared.viewList.ViewListFilters',{
    extend: 'Ext.panel.Panel',
    xtype: 'widget.viewListFilters',
    
    requires:[],
    
    title: 'Filters',
    
    initComponent: function() {
        
        var me = this;
        Ext.apply( me, {

                tools: [
                    {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'fa fa-bars',
                        ui: 'dashboard-scene',
                        //hidden: false,
                        border: false,
                        enableToggle: false,
                        action: 'displayList',
                        //handler: 'onEditDashboard',
                        plugins: 'responsive',
                        platformConfig: {
                            desktop: {
                               hidden: false
                            },
                            '!desktop': {
                               hidden: true
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'fa fa-picture-o',
                        ui: 'dashboard-scene',
                        //hidden: false,
                        border: false,
                        enableToggle: false,
                        action: 'displayCard',
                        //flag: 'editionMode',
                        //handler: 'onDeleteDashboard',
                        plugins: 'responsive',
                        platformConfig: {
                            desktop: {
                               hidden: false
                            },
                            '!desktop': {
                               hidden: true
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'fa fa-table',
                        ui: 'dashboard-scene',
                        //hidden: false,
                        border: false,
                        enableToggle: false,
                        action: 'displayTable',
                        //flag: 'editionMode',
                        //handler: 'onDeleteDashboard',
                        plugins: 'responsive',
                        platformConfig: {
                            desktop: {
                               hidden: false
                            },
                            '!desktop': {
                               hidden: true
                            }
                        }
                    }
                ],
                
                items : [ 
                ]        
            });

        this.callParent(arguments);
    }
    
    
});