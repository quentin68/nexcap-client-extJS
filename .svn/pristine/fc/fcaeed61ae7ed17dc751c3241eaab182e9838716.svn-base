
Ext.define('Dashboard.store.administration.Positions', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.positions',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.administration.Position',
    
    sorters: [{property: 'name', direction: 'ASC'}],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/positions/search'
    })
    
});   