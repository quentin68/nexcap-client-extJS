/* global Ext  */

Ext.define('Dashboard.store.system.DevicesLogsFiles', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.devicesLogs',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.system.DeviceLogsFile'//,
    
//    proxy : Ext.create('Dashboard.store.Proxy',{
//        url: Dashboard.config.Config.SERVER_HOST_NAME + '/devices/logs/search'
//    })
});   