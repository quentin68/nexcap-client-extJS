/* global Ext */

Ext.define('Dashboard.view.administration.position.Tree', {
    extend: 'Ext.panel.Panel',
    xtype: 'positionTree',
    width: 640,
    
    require:[
        'Dashboard.store.administration.PositionsTree'
    ],

    layout: 'fit',
    cls: 'view-list',
    collapsible: true,
    
    config: {
        configuration : null
    },
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'treepanel',
                reference: 'treePanel',
                rootVisible: false,
                useArrows: true,
                viewConfig: {

                    stateful: true,   // Require
                    stateId: 'my_id', //Require, tree id

                    plugins:  [ Ext.create('Dashboard.ux.TreeStateful') ] // TreeStateful plugin
                },
                store: Ext.create('Dashboard.store.administration.PositionsTree',{
                   /* listeners:{
                        scope: this,
                        load: function(){
                            this.onExpandAllClick();
                        }
                    } */
                }),
                columns: [{
                    xtype: 'treecolumn',
                    header: 'Name', 
                    dataIndex: 'name',
                    flex: 1
                }],
                bbar: [{
                    text: getText('Expand All'),
                    scope: this,
                    handler: this.onExpandAllClick
                }, {
                    text: getText('Collapse All'),
                    scope: this,
                    handler: this.onCollapseAllClick
                }, {
                    text: getText('Refresh'),
                    handler: 'onRefresh'
                }]
//                dockedItems: [
//                    {
//                        xtype: 'toolbar',
//                        dock: 'bottom',
//                        items: [
//                            {
//                                xtype: 'button',
//                                text: 'Refresh',
//                                handler: 'onRefresh'
//                            }
//                        ]
//                    }
//                ]
            }
        ];
        
        this.dockedItems = [                
            {
                xtype: 'toolbar',
                defaults:{
                    xtype: 'button',
                    scale: 'small',
                    ui: 'view-list',
                    border: false
                },
                items: [
                    {
                        reference: 'addButton',
                        iconCls: 'fa fa-plus-circle',
                        tooltip: getText('Add'),
                        handler: 'onCreate',
                        menu: {
                            xtype: 'menu',
                            plain: true,
                            items: {
                                xtype: 'buttongroup',
                                columns: 2,
                                defaults: {
                                    xtype: 'button',
                                    scale: 'small',
                                    width: 130,
                                    iconAlign: 'left',
                                    colspan: 2
                                },
                                items: [
                                    {
                                        iconCls: 'fa fa-bullseye',
                                        action: 'addPosition',
                                        text: getText('New position'),
                                        handler: 'onCreatePosition'
                                        
                                    },{
                                        iconCls: 'fa fa-map-marker',
                                        action: 'addLocation',
                                        text: getText('New location'),
                                        handler: 'onCreateLocation'
                                    }
                                ]
                            }
                        }
                    },
//                    {
//                        iconCls: 'fa fa-plus-circle',
//                        tooltip: getText('Create a position'),
//                        handler: 'onCreate'
//                    },
                    {
                        reference: 'duplicate',
                        iconCls: 'fa fa-files-o',
                        tooltip: getText('Duplicate'),
                        handler: 'onDuplicate'
                    },{
                        iconCls: 'fa fa-pencil',
                        tooltip: getText('Edit'),
                        reference: 'editButton',
                        disabled: true,
                        handler: 'onEdit'
                    },{
                        iconCls: 'fa fa-minus-circle',
                        tooltip: getText('Delete'),
                        reference: 'deleteButton',
                        disabled: true,
                        handler: 'onDestroy'
                    },
//                    {
//                        iconCls: 'fa fa-file-excel-o',
//                        tooltip: getText('c'),
//                        handler: 'onExportToExel'
//                    },
                    {
                        reference: 'exportButton',
                        iconCls: 'fa fa-file-excel-o',
                        tooltip: getText('Export to file'),
                        handler: 'cExport to file',
                        menu: {
                            xtype: 'menu',
                            plain: true,
                            items: {
                                xtype: 'buttongroup',
                                columns: 2,
                                defaults: {
                                    xtype: 'button',
                                    scale: 'small',
                                    width: 160,
                                    iconAlign: 'left',
                                    colspan: 2
                                },
                                items: [
                                    {
                                        iconCls: 'fa fa-bullseye',
                                        action: 'exportPosition',
                                        text: getText('Export positions'),
                                        handler: 'onExportPositions'
                                        
                                    },{
                                        iconCls: 'fa fa-map-marker',
                                        action: 'exportdLocation',
                                        text: getText('Export locations'),
                                        handler: 'onExportLocations'
                                    }
                                ]
                            }
                        }
                    },
//                    {
//                        iconCls: 'fa fa-filter',
//                        tooltip: getText('Filter results'),
//                        handler: 'onFilter'
//                    },
                    '->',
                    {
                        iconCls: 'fa fa-wrench',
                        enableToggle: false,
                        handler: 'onConfigViewList'
                    }, {
                    iconCls: 'fa fa-compress',
                    enableToggle: true,
                    toggleHandler: 'toggleDisplayDetail',
                    reference: 'displayDetail',
                    scope: this
                    }
                ]

            }
        ];

        this.callParent();
        
        this.configViews();
    },
    
    
    configViews: function(){

        var viewsCount = 0;
        var conf = this.getConfiguration();
        
        this.down('button[handler=onCreate]').hidden = true;
        this.down('button[handler=onDuplicate]').hidden = true;
        this.down('button[handler=onEdit]').hidden = true;
        this.down('button[handler=onDestroy]').hidden = true;
        this.down('button[reference=exportButton]').hidden = true;

        if(!conf){
            return;
        };
        
        if(conf.enabledTools){
            if(conf.enabledTools.create){
                this.down('button[handler=onCreate]').hidden = false;
            }
            if(conf.enabledTools.edit){
                this.down('button[handler=onEdit]').hidden = false;
            }
            if(conf.enabledTools.destroy){
                this.down('button[handler=onDestroy]').hidden = false;
            }
            if(conf.enabledTools.duplicate){
                this.down('button[handler=onDuplicate]').hidden = false;
            }
            if(conf.enabledTools.exportToFile){
                this.down('button[reference=exportButton]').hidden = false;
            }
        }
        
        this.down('button[handler=onConfigViewList]').hidden = true;
    },
    
    
    onExpandAllClick: function(){
        var me = this.down('treepanel');
        var toolbar = me.down('toolbar');

        me.getEl().mask('Expanding tree...');
        toolbar.disable();

        me.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
        });
    },

    onCollapseAllClick: function(){
        var toolbar = this.down('toolbar');
        toolbar.disable();
        
        this.down('treepanel').collapseAll(function() {
            toolbar.enable();
        });
    },
    
    /**
     * Toggle Detail view 
     */
    toggleDisplayDetail: function (sender, state) {
        
        var detailContainer = Ext.ComponentQuery.query('panel[reference=detailContainer]')[0];

        if (state) {
            detailContainer.hide();
            sender.setIconCls('fa fa-expand');
        } else {
            detailContainer.show();
            sender.setIconCls('fa fa-compress');
        }
    }
});