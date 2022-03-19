Ext.define('Dashboard.store.settings.SpecificCheckConfigReferences',{
    extend:'Dashboard.store.StoreBase',
    alias: 'store.specificCheckConfigReferences',
    storeId: 'specificCheckConfigReferencesStore',
    
    requires:[
        'Dashboard.model.Reference', 
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.Reference',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/productreference/search'
    })
});

