/*  global Ext, moment */

Ext.define('Dashboard.model.User', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities', 'Dashboard.config.Config'],
    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'firstName',
            type: 'string'
        }, {
            name: 'lastName',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'login',
            type: 'string'
        }, {
            name: 'password',
            type: 'string'
        }, {
            name: 'sticker',
            type: 'string'
        }, {
            name: 'badgeNumber',
            type: 'string'
        }, {
            name: 'pin',
            type: 'string'
        }, {
            name: 'lastUpdateDate',
            type: 'date',
            convert: function (val) {
                if(val === undefined){
                    return '';
                }
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return null;
                }
            }
        }, {
            name: 'userSettings',
            type: 'auto'
        }, {
            name: 'profiles',
            type: 'auto'
        }, {
            name: 'profilesNames',
            type: 'string',
            convert: function(val, record) {
                if (record.data.profiles) {
                    var names = [];
                    Ext.each(record.data.profiles, function(profile) {
                        names.push(profile.name);
                    });
                    return names.toString();
                }
            }
        }, {
            name: 'passwordDate',
            type: 'date',
            convert: function (val) {
                if(val === undefined){
                    return '';
                }
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return null;
                }
            }
        }, {
            name: 'passwordHistory',
            type: 'string'
        }, {
            name: 'activated',
            type: 'boolean'
        }, {
            name: 'technical',
            type: 'boolean'
        }, {
            name: 'authorizedLocationIdList',
            type: 'auto'
        }, {
            name: 'requirementsNameList',
            type: 'auto'
        }, {
            name: 'picture',
            type: 'auto'
        }, {
            name: 'securedThumbnailSrc',
            type: 'string'
        }, {
            name: 'securedImageSrc',
            type: 'string'
        }, {
            name: 'thumbnailSrc',
            type: 'string',
            convert: function(val, record) {

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

                return thumbnailSrc; // "https://localhost:8443/nexcap/api/v0.1/resources/thumbnail/MATERIAL/2";
            }
        }, {
            name: 'imageSrc',
            type: 'string',
            convert: function(val, record) {

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

                return thumbnailSrc; // "https://localhost:8443/nexcap/api/v0.1/resources/thumbnail/MATERIAL/2";
            }
        }, {
            name: 'properties',
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
        }],
    
    
    getRights: function() {

        var rights = [];
        var profiles = this.data.profiles;
        var rightsStore = Ext.create('Dashboard.store.Rights');

        // Add default rights
        Ext.each(rightsStore.getRange(), function(record) {
            if (record.data.enabled) {
                rights.push(record);
            }
        }, this);
        
        // Add user's rights
        for (var i = 0; i < profiles.length; i++) {

            var features = profiles[i].features; // user feature = right

            for (var j = 0; j < features.length; j++) {
                var right = rightsStore.findRecord('name', features[j].name, 0, false, true, true);

                if (right && Ext.Array.contains(rights, right) === false) {
                    rights.push(right);
                }
            }
        }

        return rights;
    },
            
            
    getUserFeatures: function() {

        var features = [];
        var rights = this.getRights();

        Ext.each(rights, function(right) {
            Ext.each(right.data.features, function(feature) {
                features.push(feature);
            });
        });

        return features;
    },
    
    
    getUserSettings: function() {
                        
        if(this.data.userSettings === undefined || !this.data.userSettings ){
            return Dashboard.manager.settings.UserSettingsManager.getDefaultUserSettings() ;
        }
        
        return this.data.userSettings;
    },
    
    
    proxy: Ext.create('Dashboard.model.Proxy', {
        api: {
            create : Dashboard.config.Config.SERVER_HOST_NAME + '/users',
            read: Dashboard.config.Config.SERVER_HOST_NAME + '/users',
            update : Dashboard.config.Config.SERVER_HOST_NAME + '/users',
            destroy: Dashboard.config.Config.SERVER_HOST_NAME + '/users'
        }
    })

});