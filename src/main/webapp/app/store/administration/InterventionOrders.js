Ext.define('Dashboard.store.administration.InterventionOrders', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.interventionOrders',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.administration.InterventionOrder',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/interventionorders/search'
    })

});   