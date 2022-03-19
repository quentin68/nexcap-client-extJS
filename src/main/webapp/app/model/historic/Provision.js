
Ext.define('Dashboard.model.historic.Provision', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        },{
            name: 'updateDate',
            type: 'string'
        },{
            name: 'quantity',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'material',
            type: 'int'
        },{
            name: 'materialName',
            type: 'string'
        },{
            name: 'productReference',
            type: 'int'
        },{
            name: 'productReferenceName',
            type: 'string'
        },{
            name: 'productReferenceCode',
            type: 'string'
        },{
            name: 'productReferenceDesignation',
            type: 'string'
        },{
            name: 'productCategoryName',
            type: 'string'
        },{
            name: 'location',
            type: 'int'
        },{
            name: 'locationName',
            type: 'string'
        },{
            name: 'locationSourceName',
            type: 'string'
        },{
            name: 'path',
            type: 'string'
        },{
            name: 'sourcePath',
            type: 'string'
        },{
            name: 'sourceAddress',
            type: 'string'
        },{
            name: 'locationDestinationName',
            type: 'string'
        },{
            name: 'destinationPath',
            type: 'string'
        },{
            name: 'destinationAddress',
            type: 'string'
        },{
            name: 'requestedDestinationAddress',
            type: 'string'
        },{
            name: 'requestedDestinationId',
            type: 'int'
        },{
            name: 'userSticker',
            type: 'string'
        },{
            name: 'userName',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'interventionOrderNumber',
            type: 'string'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/provisions',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/provisions',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/provisions',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/provisions'
        }
    })
    
});