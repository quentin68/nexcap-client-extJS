
Ext.define('Dashboard.model.historic.Operation', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        },{
            name: 'operationType', 
            type: 'string',
            convert: function (val) {
                switch (val) {
                    case 'MOVE':
                        return getText('Move');
                    case 'BORROW':
                        return getText('Borrow');
                    case 'SEND':
                        return getText('Send');
                    case 'RECEIVE':
                        return getText('Receive');
                    case 'RETURN_FROM_CALIBRATION':
                        return getText('Return from calibration');
                    case 'LEAVE_TO_CALIBRATION':
                        return getText('Leave for calibration');
                    case 'RETURN_FROM_MAINTENANCE':
                        return getText('Return from maintenance');
                    case 'LEAVE_TO_MAINTENANCE':
                        return getText('Leave for maintenance');
                    default:
                        // Just in case
                        val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
                        return getText(val);
                }
            }
        },{
            name: 'operationDate', 
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
            name: 'quantity', 
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
            name: 'sourceAddress', 
            type: 'string'
        },{
            name: 'destinationAddress', 
            type: 'string'
        },{
            name: 'userName', 
            type: 'string'
        },{
            name: 'operator', 
            type: 'string'
        },{
            name: 'recipient', 
            type: 'string'
        },{
            name: 'interventionOrderNumber', 
            type: 'string'
        },{
            name: 'sendingNumber',
            type: 'string'
        }
        
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/history/operations',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/history/operations',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/history/operations',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/history/operations'
        }
    })

});