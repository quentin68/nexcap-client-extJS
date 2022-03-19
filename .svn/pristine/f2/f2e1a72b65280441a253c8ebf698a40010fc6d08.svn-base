Ext.define('Dashboard.store.settings.SpecificCheckConfigCategories',{
    extend:'Dashboard.store.StoreBase',
    alias: 'store.specificCheckConfigCategories',
    storeId: 'specificCheckConfigCategoriesStore',
    
    requires:[
        'Dashboard.model.Reference', 
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.Category',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/productcategory/search'
    })
});
