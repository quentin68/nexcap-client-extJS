/* global Ext */

Ext.define('Dashboard.store.administration.ServerDevicesTypes', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.serverDevicesTypes',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    fields: [
        'value', 
        'label'
    ],
    
    remoteSort: true,
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/loginrecords/systemtypevalues',
        actionMethods : { read : 'GET'}
    })
    
});