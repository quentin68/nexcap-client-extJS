
Ext.define('Dashboard.store.cartography.Maps', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.maps',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.cartography.Map',
    remoteSort : true,

    listeners: {
        beforeload: function (store, sorters, eOpts) {
            this.getProxy().extraParams.sort = [];
            this.getProxy().extraParams.sort.push({
                property: 'title',
                direction: 'ASC'
            });
        }
    },
    
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/cartomaps/search'
    })
});   