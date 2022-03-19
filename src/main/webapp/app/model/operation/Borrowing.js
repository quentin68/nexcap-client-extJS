
Ext.define('Dashboard.model.operation.Borrowing', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'productReferenceCode',
            type: 'string'
        },{
            name: 'productReferenceDesignation',
            type: 'string'
        },{
            name: 'date',
            type: 'date',
            convert: function (val) {
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        },{
            name: 'sourceAddress',
            type: 'string'
        },{
            name: 'userSticker',
            type: 'string'
        },{
            name: 'actorSticker',
            type: 'string'
        },{
            name: 'interventionOrderNumber',
            type: 'string'
        },{
            name: 'interventionOrderId',
            type: 'int'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/borrowings',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/borrowings',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/borrowings',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/borrowings'
        }
    })

});