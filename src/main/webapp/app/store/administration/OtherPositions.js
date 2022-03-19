Ext.define('Dashboard.store.administration.OtherPositions', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.otherPositions',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
    
    model: 'Dashboard.model.administration.Position',
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false,
            
    sorters: [{property: 'name', direction: 'ASC'}],
            
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/positions/getPotentialParents'
    })
});   