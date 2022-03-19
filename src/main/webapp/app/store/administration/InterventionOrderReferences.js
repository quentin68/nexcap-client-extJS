
Ext.define('Dashboard.store.administration.InterventionOrderReferences',{
    extend:'Dashboard.store.StoreBase',
    alias: 'store.interventionOrderReferences',
    storeId: 'interventionOrderReferencesStore',
    
    requires:[
        'Dashboard.model.Reference', 
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.Reference',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/productreference/search'
    })
    
});

