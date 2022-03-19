/* global Ext */

Ext.define('Dashboard.store.system.Import',{
    extend:'Dashboard.store.StoreBase',
    alias: 'store.import',
    storeId: 'importStore',
    
    requires:[
        'Dashboard.model.system.Import', 
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.system.Import',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/import/search'
    })
    
});
