Ext.define('Dashboard.store.administration.OtherCategories',{
    extend:'Dashboard.store.StoreBase',
    alias: 'store.otherCategories',
    storeId: 'otherCategoriesStore',
    
    requires:[
        'Dashboard.model.Category', 
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.Category',
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false,
        
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/productcategory/getPotentialParents'
    })
});
