Ext.define('Dashboard.store.historic.Calibrations', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.calibrations',
    
    requires: ['Dashboard.tool.Utilities'],
    
    model: 'Dashboard.model.historic.Calibration',
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/calibrations/search'
    })
});   