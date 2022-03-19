Ext.define('Dashboard.store.historic.alerts.Stocks', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.historicAlertsStocks',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.historic.alerts.StockAlert',
    
    sorters: [
        {
            property: 'alertConfigurationName',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/history/alerts/stocklevel/search'
    })
});