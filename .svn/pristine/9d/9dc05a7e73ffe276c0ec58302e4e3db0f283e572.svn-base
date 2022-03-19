
Ext.define('Dashboard.model.historic.Calibration', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'updateDate',
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
            name: 'opType',
            type: 'string'
        },{
            name: 'quantity',
            type: 'auto'
        },{
            name: 'materialName',
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
            name: 'userName',
            type: 'string'
        },{
            name: 'sourceAddress',
            type: 'string'
        },{
            name: 'destinationAddress',
            type: 'string'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/calibrations',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/calibrations',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/calibrations',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/calibrations'
        }
    })

});