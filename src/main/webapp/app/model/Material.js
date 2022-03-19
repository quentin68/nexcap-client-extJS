/* global Ext, moment  */

Ext.define('Dashboard.model.Material', {
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
            name: 'name'
        }, {
            name: 'code',
            type: 'auto'
        }, {
            name: 'codes',
            type: 'auto',
            convert: function (val, record) {
                if (val === undefined || val === null) {
                    var list = null;
                    
                    if (record.data.code && record.data.code.code ) {
                        list = [];
                        list.push(record.data.code);
                    }
                    
                    return list;
                }
            }
        }, {
            name: 'codeType'
        }, {
            name: 'lastUpdateDate',
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
            name: 'lastActionUpdateDate',
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
            name: 'productReference',
            type: 'auto'
        },
        {
            name: 'location',
            type: 'auto',
            convert: function (val, record) {
                if (!val) {
                    return {address: ''};
                }
            }
        }, {
            name: 'assignedLocation',
            type: 'auto',
            convert: function (val, record) {
                if (val === undefined || val === null) {
                    return {address: ''};
                }
            }
        }, {
            name: 'status',
            type: 'auto',
            convert: function (val, record) {
                
                //TODO add Absents
                if (record.data.location && record.data.assignedLocation && record.data.assignedLocation.id) {
                    if(record.data.assignedLocation.id){
                        if (record.data.location.id === record.data.assignedLocation.id) {
                            return 'Present';
                        }else{
                            return 'Intruder'; //'Muddled';
                        }
                    }else if(record.data.assignedLocation.id){
                        return 'Intruder';
                    }
                }else{
                    return 'Intruder';
                }
            }
        }, {
            name: 'useCount',
            type: 'int'
        }, {
            name: 'availabilityDate',
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
            name: 'calibrationDate',
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
            name: 'verificationFrequency',
            type: 'int'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'useDate',
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
            name: 'picture',
            type: 'auto'
        }, {
            name: 'specificChecks',
            type: 'auto'
        }, {
            name: 'properties',
            type: 'auto'
        }, {
            name: 'telemetryData',
            type: 'auto'
        }, {
            name: 'propertiesObject',
            type: 'auto',
            convert: function (val, record) {
                var props = {};
                if (!record.data.properties) {
                    return props;
                }
                Ext.each(record.data.properties, function (prop) {
                    props[prop.name] = prop;
                });
                return props;
            }
        }, {
            name: 'alerts',
            type: 'auto'
        }, {
            name: 'files',
            type: 'auto'
        }, {
            name: 'OrganizedFiles',
            type: 'auto',
            convert: function (val, record) {
                
                if (!record.data.files) {
                    return null;
                }
                var list = [];
                
                Ext.each(record.data.files, function (file) {
                    
                    if(!file.folderName){
                        file.folderName = getText('Mixed');
                    }
                    
                    Ext.each(file.files, function (fileName) {
                        var obj = {
                            folderName:file.folderName, 
                            file:fileName,
                            id: file.id
                        };
                        list.push(obj);
                    });
                });
                return list;
            }
        }, {
            name: 'interventionOrderList',
            type: 'auto'
        }, {
            name: 'sendingNumber',
            type: 'string'
        }, {
            name: 'operationType',
            type: 'string'
        }, {
            name: 'operationTypeEnum',
            type: 'string'
        }, {
            name: 'operationDate',
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
            name: 'lastOperation',
            type: 'auto',
            convert: function (val) {
                try {
                    if (!val) {
                        return null;
                    }
                    return Ext.create('Dashboard.model.MaterialLastOperation', val);
                } catch (e) {
                    return null;
                }
            }
        },  {
             name: 'geolocalization',
             type: 'auto',
             convert: function(val, record){

                var props = {};
                
                if (!record.data.properties) {
                    return null;
                }
                Ext.each(record.data.properties, function (prop) {
                    props[prop.name] = prop;
                });
                
                try{
                
                if(props.mapOutdoorGeolocalization && props.mapOutdoorGeolocalization.value){
                    var geoloc = Ext.decode(props.mapOutdoorGeolocalization.value);
                                        
                    if(geoloc.format === 'DD'){
                        if(geoloc.coordinates.latitude){
                            geoloc.coordinates.latitude = parseFloat(geoloc.coordinates.latitude.replace(",", "."));
                        }
                        if(geoloc.coordinates.longitude){
                            geoloc.coordinates.longitude = parseFloat(geoloc.coordinates.longitude.replace(",", "."));
                        }
                        if(geoloc.coordinates.altitude){
                            geoloc.coordinates.altitude = parseFloat(geoloc.coordinates.altitude.replace(",", "."));
                        }

                    }
                    return geoloc;
                }
                
                }catch(ex){
                    
                };
//                if(props.geoCoordinatesLatitude && props.geoCoordinatesLongitude){
//                    return {
//                        coordinates:{
//                            latitude: Ext.decode(props.geoCoordinatesLatitude.value),
//                            longitude: Ext.decode(props.geoCoordinatesLongitude.value),
//                            altitude: null
//                        }
//                        
//                    };
//                }
             }
        },
        {
            name: 'securedThumbnailSrc',
            type: 'string'
        }, {
            name: 'securedImageSrc',
            type: 'string'
        }, {
            name: 'thumbnailSrc',
            type: 'string',
            convert: function (val, record) {

                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                if (!record.data.picture) {
                    return thumbnailSrc;
                }
                var zoomHidden = true;

                if (record.data.picture.thumbnailName !== undefined && record.data.picture.thumbnailName) {
                    if (record.data.picture.pictureSourceType !== null && record.data.picture.pictureSourceType !== "") {
                        thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_THUMBNAIL
                                + record.data.picture.pictureSourceType.toUpperCase()
                                + '/'
                                + record.data.picture.pictureSourceId
                                + '?temp=' + Date.now();

                        zoomHidden = false;
                    }
                }

                return thumbnailSrc; //"https://localhost:8443/nexcap/api/v0.1/resources/thumbnail/MATERIAL/2";
            }
        }, {
            name: 'imageSrc',
            type: 'string',
            convert: function (val, record) {

                var thumbnailSrc = Dashboard.config.Config.DEFAULT_THUMBNAIL_SRC;

                if (!record.data.picture) {
                    return thumbnailSrc;
                }
                var zoomHidden = true;

                if (record.data.picture.pictureName !== undefined && record.data.picture.pictureName) {
                    if (record.data.picture.pictureSourceType !== null && record.data.picture.pictureSourceType !== "") {
                        thumbnailSrc = Dashboard.config.Config.SERVER_URL_DOWNLOAD_IMAGE
                                + record.data.picture.pictureSourceType.toUpperCase()
                                + '/'
                                + record.data.picture.pictureSourceId
                                + '?temp=' + Date.now();

                        zoomHidden = false;
                    }
                }

                return thumbnailSrc; //"https://localhost:8443/nexcap/api/v0.1/resources/thumbnail/MATERIAL/2";
            }
        }
    ],

    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/materials',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/materials'
        }
    })
});   