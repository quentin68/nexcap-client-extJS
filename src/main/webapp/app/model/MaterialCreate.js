/*  global Ext, moment  */

Ext.define('Dashboard.model.MaterialCreate', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name'
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'codes',
            type: 'auto'
        }, {
            name: 'lastUpdateDate',
            type: 'date',
            dateWriteFormat: 'c',
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
            name: 'lastActionUpdateDate',
            type: 'date',
            dateWriteFormat: 'c',
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
            name: 'productReferenceId',
            type: 'auto'
        }, {
            name: 'assignedLocationId',
            type: 'auto'
        }, {
            name: 'useCount',
            type: 'int'
        }, {
            name: 'availabilityDate',
            type: 'date',
            dateWriteFormat: 'c',
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
            name: 'calibrationDate',
            type: 'date',
            dateWriteFormat: 'c',
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
            name: 'verificationFrequency',
            type: 'int'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'useDate',
            type: 'date',
            dateWriteFormat: 'c',
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
            name: 'status',
            type: 'string'
        }, {
            name: 'picture',
            type: 'auto'
        }, {
            name: 'specificCheckIds',
            type: 'auto'
        }, {
            name: 'properties',
            type: 'auto'
        }, {
            name: 'telemetryData',
            type: 'auto'
        }, {
            name: 'opLeavingToCalibrationId',
            type: 'int'
        }, {
            name: 'opLeavingToMaintenanceId',
            type: 'int'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/materials',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/materials',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/materials'
        }
    })
});