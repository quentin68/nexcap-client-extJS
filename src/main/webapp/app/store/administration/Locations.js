Ext.define('Dashboard.store.administration.Locations', {
    extend: 'Dashboard.store.StoreBase',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.administration.Location',
    
    sorters: [{property: 'name', direction: 'ASC'}],
    
    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/locations/search'
    })
});