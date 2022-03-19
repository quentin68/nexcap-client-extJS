/* global Ext, moment  */

Ext.define('Dashboard.model.cartography.MapMaterial', {
    extend: 'Dashboard.model.cartography.GeoLocElement',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    fields: [
        {
            name: 'icon',
            type: 'auto'
        }, {
            name: 'material',
            type: 'auto'
        }, {
            name: 'defaultColor',
            type: 'string'
        }, {
            name: 'date',
            type: 'date',
            convert: function (val) {
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
             convert: function(val, record){
                                 
                if(val){
                                        
                    if(val.format === 'DD'){
                        if(val.coordinates.latitude){
                            val.coordinates.latitude = parseFloat(val.coordinates.latitude.replace(",", "."));
                        }
                        if(val.coordinates.longitude){
                            val.coordinates.longitude = parseFloat(val.coordinates.longitude.replace(",", "."));
                        }
                        if(val.coordinates.altitude){
                            val.coordinates.altitude = parseFloat(val.coordinates.altitude.replace(",", "."));
                        }
                    }
                    return val;
                }
             }
        }
//        {
//             name: 'geolocalization',
//             type: 'auto',
//             convert: function(val, record){
//                 //debugger;
//                var props = {};
//                
//                if (!record.data.material.properties) {
//                    return null;
//                }
//                Ext.each(record.data.material.properties, function (prop) {
//                    props[prop.name] = prop;
//                });
//                
//                if(props.mapOutdoorGeolocalization){
//                    
//                    var geoloc = Ext.decode(props.mapOutdoorGeolocalization.value);
//                    
//                    if(geoloc.format === 'DD'){
//                        geoloc.coordinates.latitude = parseFloat(geoloc.coordinates.latitude.replace(",", "."));
//                        geoloc.coordinates.longitude = parseFloat(geoloc.coordinates.longitude.replace(",", "."));
//                        geoloc.coordinates.altitude = parseFloat(geoloc.coordinates.altitude.replace(",", "."));
//                    }
//                    return geoloc;
//                }
//             }
//        }
    ]
    
});   