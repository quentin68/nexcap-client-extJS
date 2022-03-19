Ext.define('Dashboard.store.alerts.OperationsAlerts', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.operationsAlerts',

    requires: ['Dashboard.tool.Utilities'],

    model: 'Dashboard.model.alerts.OperationAlert',

    sorters: [
        {
            property: 'controlName',
            direction: 'ASC'
        }
    ],

    proxy: Ext.create('Dashboard.store.Proxy', {
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/alerts/operations/search'
    })
});
