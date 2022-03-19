/* global Ext, moment */

Ext.define('Dashboard.model.administration.LocationCreate', {
    extend: 'Dashboard.model.Base',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],

    fields: [
        {
            name: 'id',
            type: 'auto'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'parentPositionId',
            type: 'auto'
        }, {
            name: 'lastUpdateDate',
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
            name: 'path',
            type: 'string'
        }, {
            name: 'address',
            type: 'string'
        }, {
            neme: 'authorizedUsers',
            type: 'auto'
        }, {
            name: 'isStock',
            type: 'boolean'
        }, {
            name: 'picture',
            type: 'auto'
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/locations',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/locations'
        }
    })
});