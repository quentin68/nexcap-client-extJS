Ext.define('Dashboard.store.Materials',{
    extend:'Dashboard.store.StoreBase',
    alias: 'store.materials',
    
    requires:[
        'Dashboard.model.Material', 
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.Material',
    
    sorters: [
        {
            property: 'name', 
            direction: 'ASC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/materials/search'
    })
});

