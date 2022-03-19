/*  global Ext */

Ext.define('Dashboard.store.system.SensorTypeDescriptions', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.sensorTypeDescriptions',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.system.SensorTypeDescription',
    remoteSort: true,
    
    sorters: [
        {
            property: 'name', 
            direction: 'ASC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/sensors/typedescription',
        actionMethods : {
            read : 'GET'
	}
    })
    
});   