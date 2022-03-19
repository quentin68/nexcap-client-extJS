
Ext.define('Dashboard.store.consultation.Items', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.items',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
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