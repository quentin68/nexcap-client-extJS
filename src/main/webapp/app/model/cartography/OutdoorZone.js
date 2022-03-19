/* global Ext, moment */

Ext.define('Dashboard.model.cartography.OutdoorZone', {
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
            name: 'tooltip',
            type: 'string'
        }, {
            name: 'color',
            type: 'string'
        }, {
            name: 'indoorMapId',
            type: 'int'
        }, {
            name: 'gpsPoints',
            type: 'auto'
        }, {
            name: 'saved',
            type: 'boolean',
            convert: function (val, record){
                if (record.data.id) {
                    return true;
                }else{
                    return false;
                }
            }
        }, {
            name: 'date',
            type: 'date',
            convert: function (val){
                try {
                    if (moment(val).isValid())
                        return moment(val).toDate(); // IE is crap

                    return '';
                } catch (e) {
                    return '';
                }
            }
        }, {
            name: 'geolocalization',
            type: 'auto',
            convert: function (val, record){
                
                var points = [];

                if (record.data.gpsPoints) {

                    Ext.each(record.data.gpsPoints, function (gpsPoint){

                        var point = {
                            format: 'DD',
                            coordinates: {
                                latitude: parseFloat(gpsPoint.coordinates.latitude),
                                longitude: parseFloat(gpsPoint.coordinates.longitude)
                            }
                        };
                        points.push(point);

                    });

                }
                return points;
            }
        }, {
            name: 'coordinates',
            type: 'auto',
            convert: function (val, record){
                
                var coordinates = [];

                if (record.data.gpsPoints) {

                    Ext.each(record.data.gpsPoints, function (gpsPoint){

                        var point = [
                            parseFloat(gpsPoint.coordinates.longitude),
                            parseFloat(gpsPoint.coordinates.latitude)
                        ];
                        coordinates.push(point);

                    });
                }
                return coordinates;
            }
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor/zones',
            create: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor/zones',
            update: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor/zones',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/carto/outdoor/zones'
        }
    })
});   