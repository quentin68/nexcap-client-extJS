
/* global Ext  */
Ext.define('Dashboard.view.system.serverLogs.Tree', {
    extend: 'Ext.panel.Panel',
    xtype: 'serverLogsTree',
    width: 640,
    
    require:[
        'Dashboard.store.administration.ServerLogsTree'
    ],

    layout: 'fit',
    cls: 'view-list',
    collapsible: false,
    
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
                
                store: Ext.create('Dashboard.store.system.ServerLogsTree',{
                    listeners:{
                        scope: this,
                        load: function( store, records, successful, operation, eOpts){
                            //this.onExpandAllClick();
                            this.onExpandFirstNode();
                        }
                    }
                }),
                
                columns: [
                    {
                        xtype: 'treecolumn',
                        text: 'Name', 
                        dataIndex: 'name',
                        flex: 1
                    }, {
                        xtype: 'actioncolumn',
                        width : 50,
                        items: [{
                            xtype: 'button',
                            iconCls: 'x-fa fa-download',
                            text: getText('Download'),
                            tooltip: getText('Download'),
                            isDisabled: function( view, rowIndex, colIndex, item, record ) {

                                if(record.data.leaf){
                                    item.iconCls = 'x-fa fa-download';
                                    return false;
                                }

                                item.iconCls = null;
                                return true;
                            },
                            handler: function(grid, rowIndex, colIndex) {
                                
                                var rec = grid.getStore().getAt(rowIndex);
                                
                                var fileName = rec.data.name;
                                var url = rec.data.url;
                                if(!url){
                                    return;
                                }
                                
                                var maskTarget = grid;
                                
                                Dashboard.manager.administration.FilesManager.loadFile(url, fileName, maskTarget);

                            }
                        }]
                    }
                ],
                
                bbar: [
                    {
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
                    }
                ]
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
//                    {
//                        reference: 'load',
//                        iconCls: 'fa fa-file-text-o',
//                        tooltip: getText('Load'),
//                        handler: 'onLoad'
//                    },
//                    {
//                        reference: 'loadLast',
//                        iconCls: 'fa fa-clipboard',
//                        tooltip: getText('Load last'),
//                        handler: 'onLoadLast'
//                    },
                    {
                        reference: 'loadAll',
                        iconCls: 'fa fa-stack-overflow',//'fa fa-folder-o',
                        tooltip: getText('Load all (zip file)'),
                        handler: 'onLoadAll'
                    }
                ]
            }
        ];

        this.callParent();
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
    
    onExpandFirstNode: function(){
        var me = this.down('treepanel');
        
        try{
            me.getRootNode().firstChild.expand();
        }catch(ex){
            //empty
        }
    },

    onCollapseAllClick: function(){
        var toolbar = this.down('toolbar');
        toolbar.disable();
        
        this.down('treepanel').collapseAll(function() {
            toolbar.enable();
        });
    }
});