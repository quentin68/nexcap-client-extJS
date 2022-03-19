Ext.define('Dashboard.store.CategoriesTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.categoriesTree',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.CategoryTree',

    lazyFill: true,
    nodeParam: 'id',
    defaultRootId: '0',
    defaultRootText: 'name',
    expanded: true,
    folderSort: true,
    
    sorters: [
        {
            property: 'name',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        actionMethods: {
            read: 'GET'
        },

        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/productcategory/getTree'
        },

        reader: {
            rootProperty: function (node){
                if (node.data) {
                    return node.data;
                } else {
                    return node.subCategoryList;
                }
            },
            type: 'json',
            encoding: 'utf8',
            successProperty: 'success',
            totalProperty: 'total'
        }
    })
});
