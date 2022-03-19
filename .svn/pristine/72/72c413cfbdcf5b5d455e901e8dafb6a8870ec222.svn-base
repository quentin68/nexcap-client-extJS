Ext.define('Dashboard.store.settings.SpecificCheckConfig', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.specificCheckConfig',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.settings.SpecificCheckConfig',
    
    proxy : Ext.create('Dashboard.store.Proxy',{   
         actionMethods: {read: 'GET', create: 'POST', update: 'PUT', destroy: 'DELETE'},
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckConfiguration'
    })
});   