Ext.define('Dashboard.store.alerts.Stocks', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.alertsStocks',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.alerts.StockAlert',
    
    sorters: [
        {
            property: 'startDate',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/stocklevel/search'
    })
});