
Ext.define('Dashboard.store.OperationType', {
    extend: 'Ext.data.Store',
    
    fields: [
        {
            name:'id', 
            type:'int'
        }, 
        'name', 
        {
            name: 'label',
            type: 'string',
            convert: function(val) {
                 return getText(val);
            }
        }
    ],
    
    data: [
        {id: 1, name: 'BORROW', label: getText('Borrow')},
        {id: 2, name: 'RETURN', label: getText('Return')},
        {id: 3, name: 'SEND', label: getText('Send')},
        {id: 4, name: 'RECEIVE', label: getText('Receive')},
        {id: 5, name: 'MOVE', label: getText('Move')},
        {id: 6, name: 'CONSUME', label: getText('Consume')},
        {id: 7, name: 'PROVISION', label: getText('Provision')},
        {id: 8, name: 'LEAVE_TO_MAINTENANCE', label: getText('To maintenance')},
        {id: 9, name: 'RETURN_FROM_MAINTENANCE', label: getText('From maintenance')},
        {id: 10, name: 'LEAVE_TO_CALIBRATION', label: getText('To calibration')},
        {id: 11, name: 'RETURN_FROM_CALIBRATION', label: getText('From calibration')}
    ],
    
    statics: {
        
        BORROW: {id: 1, label: getText('Borrow')},
        RETURN: {id: 2, label: getText('Return')},
        SEND: {id: 3, label: getText('Send')},
        RECEIVE: {id: 4, label: getText('Receive')},
        MOVE: {id: 5, label: getText('Move')},
        CONSUME: {id: 6, label: getText('Consume')},
        PROVISION: {id: 7, label: getText('Provision')},
        LEAVE_TO_MAINTENANCE: {id: 8, label: getText('To maintenance')},
        RETURN_FROM_MAINTENANCE: {id: 9, label: getText('From maintenance')},
        LEAVE_TO_CALIBRATION: {id: 10, label: getText('To calibration')},
        RETURN_FROM_CALIBRATION: {id: 11, label: getText('From calibration')}

    }
    
});