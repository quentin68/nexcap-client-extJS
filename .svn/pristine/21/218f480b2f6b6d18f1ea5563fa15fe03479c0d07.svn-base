Ext.define('Dashboard.store.operation.Calibrations', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.operationCalibrations',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.operation.Calibration',
    
    sorters: [
        {
            property: 'date',
            direction: 'DESC'
        }
    ],
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/calibrations/search'
    })
});   