/*  global Ext */

Ext.define('Dashboard.store.system.SensorDecoderConfiguration', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.sensorDecoderConfiguration',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    fields:['id', 'name', 'params', 'description', 'sensorDecoderId'],
    
    //model: 'Dashboard.model.system.Sensor',
    
    sorters: [
        {
            property: 'name', 
            direction: 'ASC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/sensordecoderconfiguration/search'
    })
    
});


