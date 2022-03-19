Ext.define('Dashboard.model.administration.Stocks', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'productCategoryName',
            type: 'string'
        },{
            name: 'productReferenceCode',
            type: 'string'
        },{
            name: 'productReferenceDesignation',
            type: 'string'
        },{
            name: 'productReferenceDescription',
            type: 'string'
        },
        {
            name: 'productReferenceId',
            type: 'int'
        },
        {
            name: 'address',
            type: 'string'
        },{
            name: 'identified',
            type: 'boolean'
        },{
            name: 'type',
            type: 'string'
        },{
            name: 'minLevel',
            type: 'auto'
        },{
            name: 'maxLevel',
            type: 'auto'
        },{
            name: 'quantity',
            type: 'auto'
        },{
            name: 'levelIsCorrect',
            type: 'boolean'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/stockLevel'
        }
    })

});