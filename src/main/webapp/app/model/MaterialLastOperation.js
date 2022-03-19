
Ext.define('Dashboard.model.MaterialLastOperation', {
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
            name: 'user', 
            type: 'auto'
        },{
            name: 'operator', 
            type: 'string'
		},{
            name: 'location',
            type: 'auto',
            convert: function (val, record) {
                if (!val) {
                    return {address: ''};
                }
            }
		},{
            name: 'interventionOrder', 
            type: 'string'
        },{
            name: 'interventionOrderString', 
            type: 'string'
        },{
            name: 'sendingNumber',
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
        }
    ]
});