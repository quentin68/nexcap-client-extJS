/* global Ext, moment */

Ext.define('Dashboard.model.alerts.Alert', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id', 
            type: 'int'
        }, {
            name: 'alertConfiguration', 
            type: 'auto'
        }, {
            name: 'objectId', 
            type: 'int'
        }, {
            name: 'userId', 
            type: 'int'
        }, {
            name: 'userSticker', 
            type: 'string'
        }, {
            name: 'triggerEvent', 
            type: 'string'
        }, {
            name: 'triggerEventLabel', 
            type: 'string'
        }, {
            name: 'startDate', 
            type: 'date',
            convert: function (val){
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        }, {
            name: 'endDate', 
            type: 'date',
            convert: function (val){
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        }, {
            name: 'isAcknowledged', 
            type: 'boolean'
        }, {
            name: 'acknowledger', 
            type: 'int'
        }, {
            name: 'acknowledgmentDate', 
            type: 'date',
            convert: function (val){
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        }, {
            name: 'acknowledmentDescription', 
            type: 'string'
        }, {
            name: 'acknowledgerSticker', 
            type: 'string'
        }, {
            name: 'sourceLocation', 
            type: 'string'
        }, {
            name: 'sourceAddress', 
            type: 'string'
        }
    ]
});
