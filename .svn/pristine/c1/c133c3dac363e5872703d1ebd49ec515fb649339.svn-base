/* global Ext, moment */

Ext.define('Dashboard.model.historic.alerts.Alert', {
    extend: 'Dashboard.model.Base',

    fields: [
        {
            name: 'id', 
            type: 'int'
        }, {
            name: 'alertConfigurationName',
            type: 'string'
        }, {
            name: 'alertConfigurationDescription',
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
                        return moment(val).toDate();
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
                        return moment(val).toDate();
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
            name: 'acknowledgmentDate',
            type: 'date',
            convert: function (val){
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate();
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
            name: 'alertLevel',
            type: 'string'
        }, {
            name: 'userSticker',
            type: 'string'
        }, {
            name: 'acknowledgerSticker',
            type: 'string'
        }, {
            name: 'sourceAddress',
            type: 'string'
        }
    ]
});
