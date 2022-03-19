
Ext.define('Dashboard.model.operation.Calibration', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id',
            type: 'int'
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
            name: 'actorName',
            type: 'string'
        },{
            name: 'useCount',
            type: 'int'
        },{
            name: 'assignedLocationAddress',
            type: 'string'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/calibrations',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/calibrations',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/calibrations',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/inventories/calibrations'
        }
    })

});