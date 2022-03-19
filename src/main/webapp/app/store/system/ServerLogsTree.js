/* global Ext  */

Ext.define('Dashboard.store.system.ServerLogsTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.serverLogsTree',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.system.ServerLogTree',
    
    lazyFill: true,
    nodeParam: 'name',
    
    defaultRootId: '0',
    defaultRootText: 'name',
    
    expanded: false,
    folderSort: true,
    
    sorters: [
        {
            property: 'text',
            direction: 'ASC'
        }
    ],
        
    proxy: Ext.create('Dashboard.store.Proxy', {
        
        appendId: false,
        actionMethods: {
            read: 'GET'
        },
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/logging/tree'
        },
        reader: {
            rootProperty: function(node){
                if (node.data) {
                    return node.data;
                } else {
                    Ext.each(node.children, function(file){
                        file.folder = node.name;
                        file.depth = node.depth;
                    });
                    
                    return node.children; //subFolderList
                }
            },
            type: 'json',
            encoding: 'utf8',
            successProperty: 'success',
            totalProperty: 'total'
        }
    })
});
