Ext.define('Dashboard.store.settings.ServerConfig', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.serverConfig',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.settings.ServerConfig',
    
    remoteSort: true,
    remoteFilter: true,
    pageSize: Dashboard.config.Config.DATAGRID_NB_LINES,
    autoLoad: false,
       
    proxy : Ext.create('Dashboard.store.Proxy',{   
         actionMethods: {read: 'GET', create: 'POST', update: 'PUT', destroy: 'DELETE'},
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/configuration'
    })
});   