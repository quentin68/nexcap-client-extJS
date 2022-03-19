Ext.define('Dashboard.store.settings.NotifMailConfig', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.notifMailConfig',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.settings.NotifMailConfig',
    
    proxy : Ext.create('Dashboard.store.Proxy',{   
        actionMethods: {read: 'POST', create: 'POST', update: 'PUT', destroy: 'DELETE'},
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/emailsenders/search'
    })
});   