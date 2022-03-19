Ext.define('Dashboard.store.operation.Receivings', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.operationReceivings',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.store.Proxy'
    ],
    
    model: 'Dashboard.model.operation.Receiving',
    
    sorters: [
        {
            property: 'operationDate',
            direction: 'DESC'
        }
    ],
    
    
    listeners:{
        beforeload: function( store , operation , eOpts){
            store.getProxy().extraParams.filter.push({"property":"operationType","value":["RECEIVE"],"type":"LIST","comparison":"IN"});
        }
    },
            
    proxy : Ext.create('Dashboard.store.Proxy',{
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/history/operations/search'
    })


});   