/* global Ext  */

Ext.define('Dashboard.store.administration.PositionsTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.positionsTree',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.administration.PositionTree',
    
    lazyFill: true,
    nodeParam: 'id',
    defaultRootId: '0',
    //defaultRootText: 'name',
    expanded: true,
    folderSort: true,
    
    sorters: [
        {
            property: 'text',
            direction: 'ASC'
        }
    ],
    
    proxy: Ext.create('Dashboard.store.Proxy', {
        actionMethods: {
            read: 'GET'
        },
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/positions/getTree'
        },
        reader: {
            rootProperty: function(node){
                if (node.data) {
                    if (node.data.parent === null) { // root position
                        node.data.iconCls = 'fa fa-bullseye locationIcon';
                    }
                    return node.data;
                } else if (node.children) {
                    for (var i = 0; i < node.children.length; i++) {
                        if (node.children[i].locations) {
                            node.children[i].iconCls = 'fa fa-bullseye locationIcon';
                        } else {
                            node.children[i].iconCls = 'fa fa-map-marker locationIcon';
                        }
                    }
                    return node.children;
                }
            },
            type: 'json',
            encoding: 'utf8',
            successProperty: 'success',
            totalProperty: 'total'
        }
    })
});
