/*  global Ext */

Ext.define('Dashboard.store.system.SensorRecorderConfiguration', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.sensorRecorderConfiguration',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    fields:['id', 'name', 'description', 'dataSensorRecorderFactoryBeanId', 'properties'],
    
    //model: 'Dashboard.model.system.Sensor',
    remoteSort : false,
    remoteFilter : false,
    
    sorters: [
        {
            property: 'name', 
            direction: 'ASC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/sensorrecorderconfiguration/search'
    })
    
});


