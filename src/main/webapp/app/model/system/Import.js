/* global Ext, moment */

Ext.define('Dashboard.model.system.Import', {
    extend: 'Dashboard.model.Base',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'filename',
            type: 'string'
        }, {
            name: 'username',
            type: 'string'
        }, {
            name: 'importationDate',
            type: 'date',
            convert: function (val, record) {
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
            name: 'nbErrors',
            type: 'int'
        }, {
            name: 'nbComputedLines',
            type: 'int'
        }, {
            name: 'nbProcessedLines',
            type: 'int'
        }, {
            name: 'nbMistakenLines',
            type: 'int'
        }, {
            name: 'nbIgnoredLines',
            type: 'int'
        }, {
            name: 'importStatus',
            type: 'string',
            convert: function (val, record) {
                if(!val){
                    return "InProgress";
                }
            }
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/import/',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/import/'
        }
    })
});   