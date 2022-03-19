/*  global Ext  */

Ext.define('Dashboard.manager.FeaturesManager', {
    extend: 'Ext.app.Controller',
    alias: 'featuresManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.Utilities',
        'Dashboard.store.Features',
        'Dashboard.store.settings.FeaturesConfig',
        'Dashboard.store.Rights'
    ],
    

    store: Ext.create('Dashboard.store.Features'),
    rightsStore: null,
    currentFeature: null,
    enabledFeatures: null,
    
    
    isEnabled: function(featureName){
        if(Ext.Array.contains(this.enabledFeatures, featureName)){
            return true;
        }else{
            return false;
        }
    },
    
    setCurrentFeature: function(featureName){
        if (featureName === "USER") {
            featureName='';
            var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var len = user.data.profiles.length;
            var user_feature_activated=[];
            for (i=0;i<len;i++) {
                for (j=0;j<user.data.profiles[i].features.length;j++) {
                    if (user.data.profiles[i].features[j].name === "USER_ADMIN") {
                        featureName = "USER_ADMIN";
                    }
                    else if (user.data.profiles[i].features[j].name === "USER_PROFILE_ADMIN"){
                        user_feature_activated.push("USER_PROFILE_ADMIN");
                    }
                    else if (user.data.profiles[i].features[j].name === "USER_DEVICE_ADMIN"){
                        user_feature_activated.push("USER_DEVICE_ADMIN");
                    }
                }
            }
            if (!featureName) {
                if (user_feature_activated.length>1){
                    featureName = "USER_BOTH_PROFILE_DEVICE_ADMIN";
                }
                else {
                    featureName = user_feature_activated[0];
                }
            }
        }
        this.currentFeature = this.store.findRecord('name', featureName, 0, false, true, true);
        return this.currentFeature;
    },
    
    
    initFeatures: function(){
        Ext.each(this.store.data.items, function(feature){
            if(!feature.data.superAdmin){
                feature.data.enabled = false;
            }
            
//            if(!feature.data.name === 'CARTOGRAPHY'){
//                feature.data.enabled = true;
//            }
            
        });
    },
            
    
    /**
     * Enable or disable features according to server configuration
     * @argument {Object} configuredFeatures
     */
    applyServerConfigToFeatures: function(configuredFeatures){
        
        this.initFeatures();
        
        var featuresConfigStore = Ext.create('Dashboard.store.settings.FeaturesConfig');
                        
         Ext.iterate(configuredFeatures, function(featureName, value){             
             var featureConfig = featuresConfigStore.findRecord('name', featureName, 0, false, true, true);
             if(featureConfig){
                 
                Ext.each(featureConfig.data.features, function(featureName){
                    var featureModel = this.getFeatureByName(featureName);
                    if(featureModel){
                        
                        if(featureModel.data.activate === true){
                            if(featureModel.data.name === 'HISTO_ALL_LIST' ){
                                if(featureModel.data.enabled === false){
                                    featureModel.data.enabled = value;
                                }
                            }else{
                                featureModel.data.enabled = value;
                            }
                            
                        }else{
                            featureModel.data.enabled = false;
                        }
                        
                    }
               }, this);
             }
         }, this);
         
         
        var applicationFeatures = this.getApplicationFeatures();
        Dashboard.tool.Utilities.info('Enabled application features: '+ applicationFeatures.toString());
    },
    
    
    
//    isEnabled: function(featureName){
//        
//        var feature = this.getFeatureByName(featureName);
//        if(feature){
//            if(feature.data.enabled){
//                return true;
//            }else{
//                return false;
//            }
//        }
//        return null;
//    },
    

    getFeatureByName: function(featureName){
        
        var feature = this.store.findRecord('name', featureName, 0, false, true, true);
        
        if(!feature){
            return null;
        }
        return feature;
    },
            
            
    /**
     * Enable or disable features according to server configuration
     * @argument {Object} configuredFeatures
     */
    applyServerConfigToRights: function(configuredFeatures){
        var featuresConfigStore = Ext.create('Dashboard.store.settings.FeaturesConfig');

         Ext.iterate(configuredFeatures, function(featureName, value){  
             var featureConfig = featuresConfigStore.findRecord('name', featureName, 0, false, true, true);
             
             if(featureConfig){
                Ext.each(featureConfig.data.features, function(featureName){
                    var rightModel = this.getRightByName(featureName);
                    
                    if(rightModel && rightModel.data.enabled === true){
                        rightModel.data.enabled = value;
                    }
               }, this);
             }
         }, this);
         
        //default enabled features 
        var defaultRights = this.getEnabledRights();
        Dashboard.tool.Utilities.info('Default enabled features: '+ defaultRights.toString());
        
        this.applyUserRightsToFeatures(defaultRights);
        
    },
            
    

    getRightByName: function(rightName){
        
        this.rightsStore = Ext.create('Dashboard.store.Rights');
        var model = this.rightsStore.findRecord('name', rightName, 0, false, true, true);
        
        if(!model){
            return null;
        }
        return model;
    },
            
            
    applyUserRightsToFeatures: function(defaultRights){

        this.enabledFeatures = defaultRights; // [];
        var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userRights = user.getRights();
                
        Ext.each(userRights, function(right){
            Ext.each(right.data.features, function(rightFeatureName){
                var feature = this.getFeatureByName(rightFeatureName);
                if(feature){
                    if(feature.data.enabled){
                        this.enabledFeatures.push(rightFeatureName);
                    }
                    if (feature.data.name==='MAPS_CONSULTATION'){
                        this.enabledFeatures.push('GEOLOC_CONSULTATION');
                    }
                    if (feature.data.name==='USER_ADMIN' || feature.data.name==='USER_PROFILE_ADMIN' || feature.data.name==='USER_DEVICE_ADMIN' ) {
                        // console.log("USER menu activated!");
                        this.enabledFeatures.push('USER');
                    }
                    if (feature.data.name==='MULTI_SITES_ADMIN'){
                        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
                        var highProfilecurrentUser = currentUser.data.highProfileLevel;
                        if (highProfilecurrentUser==="LOW" || highProfilecurrentUser==="MEDIUM" || highProfilecurrentUser==="HIGH"){
                            this.enabledFeatures.pop('MULTI_SITES_ADMIN');
                        }
                    }
                }else{
                    Dashboard.tool.Utilities.error('[FeaturesManager.applyUserRightsToFeatures] unknown features: '+ rightFeatureName);
                }
            }, this);
            
        }, this);
        
        Dashboard.tool.Utilities.info('Final enabled user features: '+ this.enabledFeatures.toString());

        return this.enabledFeatures;
    },
            
            
    getApplicationFeatures: function(){
        
        var applicationFeatures = [];
        Ext.each(this.store.data.items, function(record){
            if(record.data.enabled === true){
                applicationFeatures.push(record.data.name);
            }
        }, this);
        
        return applicationFeatures;
    },
            
            
    getEnabledRights: function(){
        
        var enabledRights = [];
        Ext.each(this.rightsStore.getRange(), function(record){
            if(record.data.enabled === true){
                enabledRights.push(record.data.name);
            }
        }, this);
        
        return enabledRights;
    },
    
   
    saveFiltersConfiguration: function(feature, filters){
                                
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userSettings = currentUser.getUserSettings();
        
        if(!userSettings.personalFilters){
                                
            if(!feature.data.configuration){
                feature.data.configuration = Ext.create('Dashboard.model.FeatureConfiguration');
            }
            
            feature.data.configuration.data.filtersConfiguration = filters;
            feature.data.userConfiguration = null;
            
            Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(feature);

        }else{
            
            if(!feature.data.userConfiguration){
                feature.data.userConfiguration = Ext.create('Dashboard.model.FeatureConfiguration');
            }
            feature.data.userConfiguration.data.filtersConfiguration = filters;
            Dashboard.manager.ConfigurationManager.saveUserConfiguration(feature, currentUser);
        }
        
        if(feature.data.name === 'MAPS_CONSULTATION' || feature.data.name === 'MAPS_ADMIN' ){
            Dashboard.manager.cartography.CartographyManager.setMapFilters(filters);
            return;
        }
        
    },
    
    
    getFiltersConfiguration: function(feature){
        
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userSettings = currentUser.getUserSettings();
        var filtersConfiguration = null;
                
        if(userSettings.personalFilters === true){
            if (!feature.data.userConfiguration || !feature.data.userConfiguration.data.filtersConfiguration) {
                Dashboard.tool.Utilities.info('[FeaturesManager.getFiltersConfiguration] user configuration is null');
                return null;
            }
            filtersConfiguration = feature.data.userConfiguration.data.filtersConfiguration;
       
        }else{
            if (!feature.data.configuration || !feature.data.configuration.data.filtersConfiguration) {
                Dashboard.tool.Utilities.info('[FeaturesManager.getFiltersConfiguration] configuration is null');
                return null;
            }
            filtersConfiguration = feature.data.configuration.data.filtersConfiguration;
        }
        
        if(filtersConfiguration){
            return filtersConfiguration;
        }else{
            return null;
        }
    },
            
            
//    getFiltersConfiguration: function(feature, configuration){
//        
//        var featureModel = this.store.findRecord('name', feature, 0, false, true, true);
//        var filterConfiguration = featureModel.configuration.filtersConfiguration;
//        
//        if(filterConfiguration){
//            return feature.configuration.filtersConfiguration;
//        }else{
//            return null;
//        }
//    },
            
    saveViewListConfiguration: function(feature, configuration){
                
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userSettings = currentUser.getUserSettings();
        
        if(!userSettings.personalColumns){
        
            if(!feature.data.configuration){
                feature.data.configuration = Ext.create('Dashboard.model.FeatureConfiguration');
            }
            
            feature.data.userConfiguration = null;

            feature.data.configuration.data.viewListConfiguration = configuration;
            Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(feature);
        
        }else{
            
            if(!feature.data.userConfiguration){
                feature.data.userConfiguration = Ext.create('Dashboard.model.FeatureConfiguration');
            }

            feature.data.userConfiguration.data.viewListConfiguration = configuration;
            Dashboard.manager.ConfigurationManager.saveUserConfiguration(feature);
            
        }
    },
    
    
    getViewListConfiguration: function(feature){
        
        if(!feature){
            Dashboard.tool.Utilities.error('[FeaturesManager.getViewListConfiguration] feature is null');
            return;
        }
                
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userSettings = currentUser.getUserSettings();
        var viewListConfiguration = null;
                
        if(userSettings.personalColumns === true){
            if (!feature.data.userConfiguration || !feature.data.userConfiguration.data.viewListConfiguration) {
                Dashboard.tool.Utilities.info('[FeaturesManager.getViewListConfiguration] user configuration is null');
                return null;
            }
            viewListConfiguration = feature.data.userConfiguration.data.viewListConfiguration;
       
        }else{
            if (!feature.data.configuration || !feature.data.configuration.data.viewListConfiguration) {
                Dashboard.tool.Utilities.info('[FeaturesManager.getViewListConfiguration] configuration is null');
                return null;
            }
            viewListConfiguration = feature.data.configuration.data.viewListConfiguration;
        }
        
        if(viewListConfiguration){
            return viewListConfiguration;
        }else{
            return null;
        }
    },
    
    
    deleteFeature: function (featureName, managerName) {
        Dashboard.tool.Utilities.error('[' + managerName + '.featureConfiguration] Decoding response error');

        var model = Ext.create('Dashboard.model.FeatureConfiguration', {
            key: featureName,
            id: featureName
        });
        
        // If JSON is corrupted, errase the JSON entry in DB nexcapup.external_configuration
        model.erase({
            success: function (record, operation) {
                Dashboard.tool.Utilities.info('[' + managerName + '.FeatureConfiguration] deleated configuration');
            },
            failure: function (record, operation) {
                Dashboard.tool.Utilities.error('[' + managerName + '.FeatureConfiguration] error: deleting feature');
            }
        });
    },
    
    
    saveDetailConfiguration: function(feature, configuration){
                
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userSettings = currentUser.getUserSettings();
        
        if(!userSettings.personalColumns){
        
            if(!feature.data.configuration){
                feature.data.configuration = Ext.create('Dashboard.model.FeatureConfiguration');
            }
            
            feature.data.userConfiguration = null;

            feature.data.configuration.data.detailConfiguration = configuration;
            Dashboard.manager.ConfigurationManager.saveFeatureConfiguration(feature);
        
        }else{
            
            if(!feature.data.userConfiguration){
                feature.data.userConfiguration = Ext.create('Dashboard.model.FeatureConfiguration');
            }

            feature.data.userConfiguration.data.detailConfiguration = configuration;
            Dashboard.manager.ConfigurationManager.saveUserConfiguration(feature);
            
        }

    },
    
    
    getDetailConfiguration: function(feature){
        
        if(!feature){
            Dashboard.tool.Utilities.error('[FeaturesManager.getDetailConfiguration] feature is null');
            return;
        }
                
        var currentUser = Dashboard.manager.administration.UsersManager.getCurrentUser();
        var userSettings = currentUser.getUserSettings();
        var detailConfiguration = null;
                
        if(userSettings.personalDetail === true){
            if (!feature.data.userConfiguration || !feature.data.userConfiguration.data.detailConfiguration) {
                Dashboard.tool.Utilities.info('[FeaturesManager.getDetailConfiguration] user configuration is null');
                return null;
            }
            detailConfiguration = feature.data.userConfiguration.data.detailConfiguration;
       
        }else{
            if (!feature.data.configuration || !feature.data.configuration.data.detailConfiguration) {
                Dashboard.tool.Utilities.info('[FeaturesManager.getDetailConfiguration] configuration is null');
                return null;
            }
            detailConfiguration = feature.data.configuration.data.detailConfiguration;
        }
        
        if(detailConfiguration){
            return detailConfiguration;
        }else{
            return null;
        }
    }
    
});