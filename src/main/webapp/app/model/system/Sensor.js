/* global Ext, moment */

Ext.define('Dashboard.model.system.Sensor', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'value',
            type: 'auto'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'properties', // exemple : { "topic": "iotgateway/tisensortag/light" }
            type: 'auto'
        }, {
            name: 'enabled',
            type: 'boolean'
        }, {
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
        }, {
            name: 'codes',
            type: 'auto'
        }, {
            name: 'sensorConnectionType',
            type: 'auto'
        }, {
            name: 'sensorType',
            type: 'auto'
        }, {
            name: 'processors',
            type: 'auto'
        }, {
            name: 'sensorDecoderConfigurationDto',
            type: 'auto'
        }, {
            name: 'dataSensorRecorderConfigurationDto',
            type: 'auto'
        }, {
            name: 'linkedObject',  // exemple : { "propertyConfigurationType": "MATERIAL", "objectId": 7, "propertyName": "geolocalisation" }
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