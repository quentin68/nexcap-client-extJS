
Ext.define('Dashboard.model.operation.Receiving', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'materialId',
            type: 'int'
        },{
            name: 'referenceId',
            type: 'int'
        },{
            name: 'userId',
            type: 'int'
        },{
            name: 'locationId',
            type: 'int'
        },{
            name: 'operationDate',
            type: 'date',
            dateWriteFormat:'c',
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
            name: 'userName', //sticker (operator)
            type: 'string'
        },{
            name: 'productReferenceCode',
            type: 'string'
        },{
            name: 'productReferenceDesignation',
            type: 'string'
        },{
            name: 'materialName',
            type: 'string'
        },{
            name: 'productCategoryName',
            type: 'string'
        },{
            name: 'opType',
            type: 'string'
        },{
            name: 'destinationAddress',
            type: 'string'
        },{
            name: 'quantity',
            type: 'int'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/operations/receive',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/operations/receive',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/operations/receive',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/operations/receive'
        }
    })

});