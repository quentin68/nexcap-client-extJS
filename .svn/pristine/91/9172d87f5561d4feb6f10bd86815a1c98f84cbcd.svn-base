/* global Ext, moment */

Ext.define('Dashboard.model.administration.TelemetryData', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'value',
            type: 'string'
        },{
            name: 'description',
            type: 'string'
        },{
            name: 'properties',
            type: 'auto'
        },{
            name: 'enabled',
            type: 'boolean'
        },{
            name: 'lastUpdateDate',
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
            name: 'sensorConnectionType',
            type: 'auto'
        },{
            name: 'sensorType',
            type: 'auto'
        },{
            name: 'processors',
            type: 'auto'
        }
    ],
    
    proxy : Ext.create('Dashboard.model.Proxy',{
        api: {
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/sensors',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/sensors',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/sensors',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/sensors'
        }
    })

});