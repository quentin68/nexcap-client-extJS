Ext.define('Dashboard.manager.ConfigurationManager', {
    extend: 'Ext.app.Controller',
    alias: 'configurationManager',
    singleton: true,
    
    require: ['Dashboard.model.FeatureConfiguration'],
    
    currentConfiguration: null,
    globalConfiguration: null,
    autoLoginMode: false,
    
    configureWebClient: function(){
        this.loadGeneralConfiguration();
    },
            
    setWebClientConfiguration: function(configuration){

        this.currentConfiguration = configuration.data;
        
        if(Dashboard.config.Config.SHOW_CURRENT_LOCATION){
            Dashboard.manager.cartography.GeolocManager.locate();
        }
        
        //Dashboard.config.Config.LOCALE = configuration.data.language;
        Dashboard.manager.TranslationsManager.translate(Dashboard.config.Config.LOCALE);
        this.frameworkForceTranslate();
        
        //Rights management
        Dashboard.manager.FeaturesManager.applyServerConfigToFeatures(configuration.data.features);
        Dashboard.manager.FeaturesManager.applyServerConfigToRights(configuration.data.features);
        
        Dashboard.manager.MainMenuManager.buildMainMenu();
        
        this.loadGlobalConfiguration();

        if (Dashboard.manager.FeaturesManager.isEnabled('DASHBOARD_CONSULTATION') === true) {
            Dashboard.manager.DashboardSceneManager.loadDashboards();
            
        } else if (Dashboard.manager.FeaturesManager.isEnabled('MAT_INVENTORY') === true) {
            Dashboard.manager.MainMenuManager.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MAT_INVENTORY');
            Dashboard.manager.administration.MaterialManager.loadConfiguration(Dashboard.manager.MainMenuManager.currentFeature, false);
        }
    },

    inventoryNameChange: function(){
        return this.currentConfiguration;
    },

    frameworkForceTranslate: function(){
        Ext.window.MessageBox.prototype.closeToolText = getText('Close dialog');
        Ext.window.Window.prototype.closeToolText = getText('Close dialog');
        Ext.panel.Panel.prototype.collapseToolText = getText('Collapse panel');
        Ext.panel.Panel.prototype.expandToolText = getText('Expand panel');
        Ext.grid.feature.Grouping.prototype.expandTip = getText('Click to expand. CTRL key collapses all others');
        Ext.grid.feature.Grouping.prototype.collapseTip = getText('Click to collapse. CTRL/click collapses all others');
        
        Ext.grid.locking.Lockable.prototype.lockText = getText('Lock');
        Ext.grid.locking.Lockable.prototype.unlockText = getText('Unlock');
    },
    
            
    loadGeneralConfiguration: function(){
        
        var store = Ext.create('Dashboard.store.settings.ServerConfig', {
            autoload: false,
            listeners: {
                beforeLoad: function(me){
                    me.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/configuration/application';
                },
                load: function(me, records, successful, operation, eOpts){
                    me.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/configuration';
                }
            }
        });

        store.load({
            scope: this,
            callback: function(records, operation, success){

                if (success && records[0]) {

                    var configModel = records[0];
                    Dashboard.tool.Utilities.info('[ConfigurationManager.loadConfiguration] loading success. Version : ' + configModel.data.version);

                    this.setWebClientConfiguration(configModel);

                } else {
                    Dashboard.tool.Utilities.error('[ConfigurationManager.loadConfiguration] loading failed');
                }
            }
        });

    },
    
    
    getOne: function (name, callback) {
        var store = Ext.create('Dashboard.store.settings.ServerConfig', {
            autoload: false,
            listeners: {
                beforeLoad: function (me) {
                    me.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + name;
                },
                load: function (me, records, successful, operation, eOpts) {
                    me.getProxy().url = Dashboard.config.Config.SERVER_HOST_NAME + '/configuration';
                }
            }
        });

        store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (success && records[0]) {
                    Dashboard.tool.Utilities.info('[ConfigurationManager.getOne] loading success');
                    callback(records[0].data);
                } else {
                    Dashboard.tool.Utilities.error('[ConfigurationManager.getOne] loading failed');
                }
            }
        });

    },
    
    getDefaultMenu: function(){

        var menu = [
            {
                text: getText('Dashboards'),
                name: 'dashboards',
                //iconCls: 'icon-menu-dashboard',
                iconCls: 'fa fa-bar-chart',
                action: 'show_dashboards',
                right: 'DASHBOARD_CONSULTATION'
            },
            // {
            // text: getText('Search'),
            // name: 'search',
            // iconCls: 'icon-menu-search',
            // action: 'seach',
            // right: 'SEARCH_MATERIAL',
            // leaf: true
            // },
            // {
            // text: getText('Notifications'),
            // name: 'notifications',
            // iconCls: 'icon-menu-notifications',
            // action: 'show_notifications',
            // leaf: true
            // },

            {
                text: getText('Alerts'),
                iconCls: 'x-fa fa-exclamation-triangle',// 'fa fa-bug'
                children: [
//                    {
//                        text: getText('old Items'),
//                        iconCls: 'x-fa fa-tag',
//                        action: 'old_show_items_alerts',
//                        right: 'CUR_ALERTS_ITEMS',
//                        leaf: true
//                    }, 
                    {
                        text: getText('Items'),
                        iconCls: 'x-fa fa-tag',
                        action: 'show_cur_items_alerts',
                        right: 'CUR_ALERTS_ITEMS',
                        leaf: true
                    }, {
                        text: getText('Inventories'),
                        iconCls: 'fa fa-list',
                        action: 'show_cur_inventories_alerts',
                        right: 'CUR_ALERTS_INVENTORIES',
                        leaf: true
                    }, {
                        text: getText('Stocks'),
                        iconCls: 'fa fa-battery-half',
                        action: 'show_cur_stocks_alerts',
                        right: 'CUR_ALERTS_STOCKS',
                        leaf: true
                    }, {
                        text: getText('Users'),
                        iconCls: 'x-fa fa-user',
                        action: 'show_cur_users_alerts',
                        right: 'CUR_ALERTS_USERS',
                        leaf: true
                    }, {
                        text: getText('Locations'),
                        iconCls: 'fa fa-map-marker',
                        action: 'show_cur_locations_alerts',
                        right: 'CUR_ALERTS_LOCATIONS',
                        leaf: true
                    }, {
                        text: getText('Devices'),
                        iconCls: 'fa fa-cloud-download',
                        action: 'show_cur_devices_alerts',
                        right: 'CUR_ALERTS_DEVICES',
                        leaf: true
                    } /*,{
                        text: getText('Operations'),
                        iconCls: 'fa fa-exchange',
                        action: 'show_operations_alerts',
                        right: 'CUR_ALERTS_ITEMS',
                        leaf: true
                    } */
                ]
            }, {
                text: getText('Business'),
                iconCls: 'fa fa-lightbulb-o',
                children: [
                    // {
                    // text: getText('Plan'),
                    // iconCls: 'fa fa-calendar',
                    // action: 'show_planifications_management',
                    // right: 'PLANNED_OPERATIONS',
                    // leaf: true
                    // },
                    {
                        text: getText('Orders'),
                        action: 'show_interventionOrders_management',
                        iconCls: 'fa fa-ticket',
                        right: 'INTERVENTION_ORDER_ADMIN',
                        leaf: true
                    },
                    // {
                    // text: getText('Deadlines'),
                    // iconCls: 'fa fa-hourglass-half',
                    // action: 'show_expiration_dates_management',
                    // right: 'READ_MAT_EXPIRATION_DATES',
                    // leaf: true
                    // },
                    {
                        text: getText('Stock levels'),
                        iconCls: 'fa fa-battery-half',
                        action: 'show_stocks_management',
                        right: 'STOCK_ADMIN',
                        leaf: true
                    }, {
                        text: getText('Receiving'),
                        iconCls: 'fa fa-plus-circle',
                        action: 'show_receiving_operation',
                        right: 'OP_RECEIVE',
                        leaf: true
                    } // ,
                    // {
                    // text: getText('Controls'),
                    // iconCls: 'fa fa-check-square-o',
                    // action: 'show_controls_management',
                    // right: 'OP_SPECIFIC_CHECK',
                    // leaf: true
                    // },{
                    // text: getText('Inventoried items'),
                    // action: 'show_inventoried_items_management',
                    // iconCls: 'fa fa-list',
                    // right: 'OP_INVENTORY',
                    // leaf: true
                    // }
                ]
            }, {
                text: getText('Consultation'),
                iconCls: 'fa fa-eye',
                children: [
                    {
                        text: getText('Items'),
                        iconCls: 'x-fa fa-tag',
                        action: 'show_items_inventory',
                        right: 'MAT_INVENTORY',
                        leaf: true
                    }, {
                        text: getText('Materials Sets'),
                        iconCls: 'fa fa-tags',
                        action: 'show_materials_sets_inventory',
                        right: 'MATERIALS_SETS_INVENTORY',
                        leaf: true
                    }, {
                        text: getText('Borrowings'),
                        iconCls: 'fa fa-share-square',
                        action: 'show_current_borrowings',
                        right: 'CUR_BORROW_INVENTORY',
                        leaf: true
                    }, {
                        text: getText('Sendings'),
                        iconCls: 'fa fa-paper-plane-o',
                        action: 'show_current_sendings',
                        right: 'CUR_SEND_INVENTORY',
                        leaf: true
                    }, {
                        text: getText('Maintenances'),
                        iconCls: 'fa fa-medkit',
                        action: 'show_current_maintenances',
                        right: 'CUR_MAINTENANCE_INVENTORY',
                        leaf: true
                    }, {
                        text: getText('Calibrations'),
                        iconCls: 'fa fa-bullseye',
                        action: 'show_current_calibrations',
                        right: 'CUR_CALIBRATION_INVENTORY',
                        leaf: true
                    } 
//                    ,{
//                        text: getText('Maps'),
//                        iconCls: 'fa fa-map-o',
//                        action: 'maps_consultation',
//                        right: 'MAPS_CONSULTATION',
//                        leaf: true
//                    }
                    ,{
                        text:getText('Geolocalization'),
                        iconCls: 'fa fa-map-marker',
                        children: [
                            {
                                text: getText('Maps'),
                                iconCls: 'fa fa-map-marker',
                                action: 'maps_consultation',
                                right: 'MAPS_CONSULTATION',
                                leaf: true
                            }, {
                                text: getText('Outdoor'),
                                iconCls: 'fa fa-map-o',
                                action: 'geoloc_consultation',
                                right: 'GEOLOC_CONSULTATION',
                                leaf: true
                            }
                        ]
                    }
                ]
            }, {
                text: getText('Management'),
                iconCls: 'x-fa fa-database',
                children: [{
                        text: getText('Categories'),
                        iconCls: 'x-fa fa-object-group',
                        action: 'show_categories_management',
                        right: 'CAT_MAT_ADMIN',
                        leaf: true
                    }, {
                        text: getText('References'),
                        iconCls: 'fa fa-archive',
                        action: 'show_references_management',
                        right: 'REF_MAT_ADMIN',
                        leaf: true
                    }, {
                        text: getText('Items'),
                        iconCls: 'x-fa fa-tag',
                        action: 'show_items_management',
                        right: 'MAT_ADMIN',
                        leaf: true
                    }, {
                        text: getText('Users'),
                        iconCls: 'x-fa fa-user',
                        action: 'show_users_management',
                        right: 'USER',
                        leaf: true
                    }, {
                        text: getText('Profiles'),
                        hidden: Dashboard.manager.ConfigurationManager.autoLoginMode,
                        iconCls: 'fa fa-users',
                        action: 'show_profiles_management',
                        right: 'PROFILE_ADMIN',
                        leaf: true
                    }, {
                        text: getText('Locations'),
                        action: 'show_locations_management',
                        iconCls: 'fa fa-map-marker',
                        right: 'LOCATION_ADMIN',
                        leaf: true
                    }
//                    , {
//                        text: getText('Telemetry data'),
//                        action: 'show_telemetry_management',
//                        iconCls: 'fa fa-signal',//'fa fa-dot-circle-o',//'fa fa-thermometer-quarter',//'fa fa-bug',//
//                        right: 'SENSOR_ADMIN',
//                        leaf: true
//                    }
                ]
            }, {
                text: getText('Historics'),
                iconCls: 'fa fa-history',
                children: [
                    {
                        text: getText('Operations'),
                        iconCls: 'fa fa-exchange',
                        action: 'show_operations_historic',
                        right: 'HISTO_ALL_LIST',
                        leaf: true
                    },
                    // {
                    // text: getText('Maintenances'),
                    // iconCls: 'fa fa-cog',
                    // action: 'show_maintenances_historic',
                    // right: 'HISTO_MAINTENANCES_LIST',
                    // leaf: true
                    // },
                    // {
                    // text: getText('Calibrations'),
                    // iconCls: 'fa fa-wrench',
                    // action: 'show_calibrations_historic',
                    // right: 'HISTO_CALIBRATIONS_LIST',
                    // leaf: true
                    // },
                    {
                        text: getText('Checks'),
                        iconCls: 'fa fa-check-square-o',
                        action: 'show_checks_historic',
                        right: 'HISTO_SPECIFIC_CHECK_LIST',
                        leaf: true
                    }, {
                        text: getText('Inventories'),
                        iconCls: 'fa fa-list',
                        action: 'show_inventories_historic',
                        right: 'HISTO_INVENTORY_LIST',
                        leaf: true
                    },
                    // {
                    // text: getText('Consumptions'),
                    // iconCls: 'fa fa-times',
                    // action: 'show_consumptions_historic',
                    // right: '',
                    // leaf: true
                    // },
                    // {
                    // text: getText('Provisions'),
                    // iconCls: 'fa fa-sign-in',
                    // action: 'show_provision_historic',
                    // right: '',
                    // leaf: true
                    // },
//                    {
//                        text: getText('Old Alerts'),
//                        iconCls: 'fa fa-bug',
//                        action: 'show_alerts_historic',
//                        right: 'HISTO_ALERTS',
//                        leaf: true
//                    }, 
                    {
                        text: getText('Alerts'),
                        iconCls: 'x-fa fa-exclamation-triangle',// 'fa fa-bug'
                        children: [
                            {
                                text: getText('Items'),
                                iconCls: 'x-fa fa-tag',
                                action: 'show_histo_items_alerts',
                                // TODO : For now putting HISTO_ALERTS which is old because it is needed atm but this is to update in the server for dynamic individual alerttypes.
                                right: 'HISTO_ALERTS',  // New to add later: HISTO_ALERTS_ITEMS
                                leaf: true
                            }, {
                                text: getText('Inventories'),
                                iconCls: 'fa fa-list',
                                action: 'show_histo_inventories_alerts',
                                right: 'HISTO_ALERTS_INVENTORIES',
                                leaf: true
                            }, {
                                text: getText('Stocks'),
                                iconCls: 'fa fa-battery-half',
                                action: 'show_histo_stocks_alerts',
                                right: 'HISTO_ALERTS_STOCKS',
                                leaf: true
                            }, {
                                text: getText('Users'),
                                iconCls: 'x-fa fa-user',
                                action: 'show_histo_users_alerts',
                                right: 'HISTO_ALERTS_USERS',
                                leaf: true
                            }, {
                                text: getText('Locations'),
                                iconCls: 'fa fa-map-marker',
                                action: 'show_histo_locations_alerts',
                                right: 'HISTO_ALERTS_LOCATIONS',
                                leaf: true
                            }, {
                                text: getText('Devices'),
                                iconCls: 'fa fa-cloud-download',
                                action: 'show_histo_devices_alerts',
                                right: 'HISTO_ALERTS_DEVICES',
                                leaf: true
                            }
                        ]
                    }, {
                        text: getText('Access'), //ok
                        iconCls: 'fa fa-credit-card',
                        action: 'show_access_historic',
                        right: 'HISTO_ACCESS',
                        leaf: true
                    }
                ]
            }, {
                text: getText('System'),
                iconCls: 'fa fa-briefcase',
                children: [
                   {
                        text: getText('Alerts'),
                        iconCls: 'x-fa fa-exclamation-triangle',
                        action: 'show_alert_config',
                        right: 'ALERT_CONFIG_ADMIN',
                        leaf: true
                    },
                    /*{
                        text: getText('Alerts'),
                        iconCls: 'x-fa fa-exclamation-triangle',
                        children: [
                            {
                                text: getText('Items'),
                                iconCls: 'x-fa fa-tag',
                                action: 'show_system_items_alerts',
                                right: 'SYSTEM_ALERTS_ITEMS',
                                leaf: true
                            }, {
                                text: getText('Inventories'),
                                iconCls: 'fa fa-list',
                                action: 'show_system_inventories_alerts',
                                right: 'SYSTEM_ALERTS_INVENTORIES',
                                leaf: true
                            }, {
                                text: getText('Stocks'),
                                iconCls: 'fa fa-battery-half',
                                action: 'show_system_stocks_alerts',
                                right: 'SYSTEM_ALERTS_STOCKS',
                                leaf: true
                            }, {
                                text: getText('Users'),
                                iconCls: 'x-fa fa-user',
                                action: 'show_system_users_alerts',
                                right: 'SYSTEM_ALERTS_USERS',
                                leaf: true
                            }, {
                                text: getText('Locations'),
                                iconCls: 'fa fa-map-marker',
                                action: 'show_system_locations_alerts',
                                right: 'SYSTEM_ALERTS_LOCATIONS',
                                leaf: true
                            }, {
                                text: getText('Devices'),
                                iconCls: 'fa fa-cloud-download',
                                action: 'show_system_devices_alerts',
                                right: 'SYSTEM_ALERTS_DEVICES',
                                leaf: true
                            }
                        ]
                    }, */ {
                        text: getText('Connectivity'),
                        iconCls: 'fa fa-cloud',//'fa fa-laptop',
                        children: [
                            {
                                text: getText('Devices'),
                                iconCls: 'fa fa-cloud-download',
                                action: 'show_devices_admin',
                                right: 'DEVICE_CONSULTATION',
                                leaf: true
                            }, {
                                text: getText('Sensors'),
                                action: 'show_sensors_admin',
                                iconCls: 'fa fa-dot-circle-o',//'fa fa-thermometer-quarter',//'fa fa-bug',//
                                right: 'SENSOR_CONSULTATION',
                                leaf: true
                            }
                        ]
                    }, {
                        text: getText('Updates'), //ok
                        iconCls: 'fa fa-upload',
                        action: 'show_packages_admin',
                        right: 'MANAGE_DEVICE_UPDATES',
                        leaf: true
                    }, {
                        text: getText('Server'),
                        iconCls: 'fa fa-wrench',
                        action: 'show_server_config',
                        right: 'SERVER_CONFIG_ADMIN',
                        leaf: true
                    }, {
                        text: getText('Multi-Context'),
                        iconCls: 'fa fa-sitemap',
                        action: 'show_multisite_config',
                        right: 'MULTI_SITES_ADMIN',
                        leaf: true
                    }, {
                        text: getText('Properties'),
//                        iconCls: 'fa fa-asterisk',
//                        children: [
//                            {
//                                text: getText('Classic'),
                                iconCls: 'fa fa-asterisk',
                                action: 'show_properties_admin',
                                right: 'DYNAMIC_PROPERTIES_ADMIN',
                                leaf: true
//                            }, {
//                                text: getText('Telemetry'),
//                                iconCls: 'fa fa-asterisk',
//                                action: 'show_telemetry_properties_admin',
//                                right: 'DYNAMIC_TELEMETRY_PROPERTIES_ADMIN',
//                                leaf: true
//                            }, {
//                                text: getText('Computed'),
//                                iconCls: 'fa fa-asterisk',
//                                action: 'show_computed_properties_admin',
//                                right: 'DYNAMIC_COMPUTED_PROPERTIES_ADMIN',
//                                leaf: true
//                            }
//                        ]
                    }, {
                        text: getText('Plug-ins'),
                        iconCls: 'fa fa-puzzle-piece',
                        action: 'show_plugins_admin',
                        right: 'PLUGINS_MAINTENANCE',
                        leaf: true
                    }, {
                        text: getText('Imports'),
                        iconCls: 'fa fa-file-text-o',
                        action: 'show_imports_admin',
                        right: 'MANAGE_IMPORTS',
                        leaf: true
                    }, {
                        text: getText('Server logs'),
                        iconCls: 'fa fa-paw',
                        action: 'show_server_logs',
                        right: 'LOG_SERVER',
                        leaf: true
                    }
                    // ,{
                    // text: getText('Support'),
                    // iconCls: 'fa fa-life-ring',
                    // action: 'show_support',
                    // right: 'SUPPORT',
                    // leaf: true
                    // }
                ]

            }, {
                text: getText('Settings'),
                //iconCls: 'icon-menu-settings',
                iconCls: 'fa fa-wrench',
                children: [
                    {
                        text: getText('User settings', 'GENERAL_MENU'),
                        iconCls: 'fa fa-sliders',//'pictos pictos-settings2',//'fa fa-user-circle',
                        action: 'show_user_settings',
                        right: 'USER_SETTINGS',
                        leaf: true
                    },
                    {
                        text: getText('Alerts'),
                        iconCls: 'x-fa fa-exclamation-triangle',
                        action: 'show_alert_management',
                        right: 'BASIC_ALERT_CONFIGURATION',  //'ALERT_CONFIG_ADMIN': this is for superAdmin,
                        leaf: true
                    },
//                    {
//                        text: getText('Old Alerts'),
//                        iconCls: 'x-fa fa-exclamation-triangle',
//                        action: 'show_alert_management',
//                        right: 'BASIC_ALERT_CONFIGURATION',
//                        leaf: true
//                    },
                  /*  {
                        text: getText('Alerts'),
                        iconCls: 'x-fa fa-exclamation-triangle',
                        children: [
                            {
                                text: getText('Items'),
                                iconCls: 'x-fa fa-tag',
                                action: 'show_system_items_alerts',
                                right: 'SYSTEM_ALERTS_ITEMS',
                                leaf: true
                            }, {
                                text: getText('Inventories'),
                                iconCls: 'fa fa-list',
                                action: 'show_system_inventories_alerts',
                                right: 'SYSTEM_ALERTS_INVENTORIES',
                                leaf: true
                            }, {
                                text: getText('Stocks'),
                                iconCls: 'fa fa-battery-half',
                                action: 'show_system_stocks_alerts',
                                right: 'SYSTEM_ALERTS_STOCKS',
                                leaf: true
                            }, {
                                text: getText('Users'),
                                iconCls: 'x-fa fa-user',
                                action: 'show_system_users_alerts',
                                right: 'SYSTEM_ALERTS_USERS',
                                leaf: true
                            }, {
                                text: getText('Locations'),
                                iconCls: 'fa fa-map-marker',
                                action: 'show_system_locations_alerts',
                                right: 'SYSTEM_ALERTS_LOCATIONS',
                                leaf: true
                            }, {
                                text: getText('Devices'),
                                iconCls: 'fa fa-cloud-download',
                                action: 'show_system_devices_alerts',
                                right: 'SYSTEM_ALERTS_DEVICES',
                                leaf: true
                            }
                        ]
                    }, */
                /*    {
                        text: getText('Alerts'),
                        iconCls: 'x-fa fa-exclamation-triangle',
                        children: [
                            {
                                text: getText('Items'),
                                iconCls: 'x-fa fa-tag',
                                action: 'show_setting_items_alerts',
                                right: 'SETTINGS_ALERTS_ITEMS',
                                leaf: true
                            }, {
                                text: getText('Inventories'),
                                iconCls: 'fa fa-list',
                                action: 'show_setting_inventories_alerts',
                                right: 'SETTINGS_ALERTS_INVENTORIES',
                                leaf: true
                            }, {
                                text: getText('Stocks'),
                                iconCls: 'fa fa-battery-half',
                                action: 'show_setting_stocks_alerts',
                                right: 'SETTINGS_ALERTS_STOCKS',
                                leaf: true
                            }, {
                                text: getText('Users'),
                                iconCls: 'x-fa fa-user',
                                action: 'show_setting_users_alerts',
                                right: 'SETTINGS_ALERTS_USERS',
                                leaf: true
                            }, {
                                text: getText('Locations'),
                                iconCls: 'fa fa-map-marker',
                                action: 'show_setting_locations_alerts',
                                right: 'SETTINGS_ALERTS_LOCATIONS',
                                leaf: true
                            }, {
                                text: getText('Devices'),
                                iconCls: 'fa fa-cloud-download',
                                action: 'show_setting_devices_alerts',
                                right: 'SETTINGS_ALERTS_DEVICES',
                                leaf: true
                            }
                        ]
                    }, */  {
                        text: getText('Notif mails'),
                        iconCls: 'fa fa-envelope-o',
                        action: 'show_notif_mail_config',
                        right: 'EMAIL_SENDERS_ADMIN',
                        leaf: true
                    }, {
                        text: getText('Specific checks'),
                        iconCls: 'fa fa-cog',
                        action: 'show_specific_checks_config',
                        right: 'SPECIFIC_CHECK_CONFIG_ADMIN',
                        leaf: true
                    }, {
                        text: getText('Web client'),
                        iconCls: 'fa fa-paint-brush',
                        action: 'show_web_client_config',
                        right: 'EXTERNAL_CONFIGURATION_ADMIN',
                        leaf: true
                    }
                ]
            }
        ];

        return menu;
    },
            

    getGeneralMenu: function(){

        var defaultMenu = this.getDefaultMenu();
        return defaultMenu;
    },
            

    buildMenu: function(defaultMenu){

        var treeMenu = [];

        Ext.each(defaultMenu, function(menuItem){
            treeMenu.push(menuItem);
        }, this);

        return treeMenu;
    },
    
    
    loadGlobalConfiguration: function(){
        
        try {
            Dashboard.model.FeatureConfiguration.load('WEB_CLIENT', {
                scope: this,
                failure: function(record, operation) {
                    
                    Dashboard.tool.Utilities.error('[ConfigurationManager.loadGlobalConfiguration] error: loading failure');
                    var config = Ext.create('Dashboard.model.FeatureConfiguration');
                    this.globalConfiguration = config;
                    
                    this.applyGlobalConfiguration(config); 
                },
                success: function(record, operation) {
                                                            
                        var response = JSON.parse(operation._response.responseText);
                        var jsonData = JSON.parse(response.data);

                        if (response === undefined || jsonData === undefined) {
                            throw 'Bad JSON in response';
                        }
                        
                        var config = Ext.create('Dashboard.model.FeatureConfiguration', jsonData);
                        this.globalConfiguration = config;
                        
                        Dashboard.tool.Utilities.info('[ConfigurationManager.loadGlobalConfiguration] loading success. Feature: ' + config.data.featureName);
                        
                        this.applyGlobalConfiguration(config); 
                    }
            });

        } catch (err) {
            Dashboard.tool.Utilities.error('[ConfigurationManager.loadGlobalConfiguration] error: ' + err);
        }
        
    },
    
    
    applyGlobalConfiguration: function(config){
        
        if(!config){
            return;
        }
        
        var mainView = Ext.ComponentQuery.query('app_main')[0];
        var property = config.data.userProperty;
                        
        if(property){
            
            var user = Dashboard.manager.administration.UsersManager.getCurrentUser();
            var value  = user.data[property+''];
            
            if(property === 'firstNameLastName'){
                value = user.data.firstName + ' ' + user.data.lastName;
            }
            
            if(!Ext.String.trim(value)){
                value = user.data.sticker;
            }
                        
            var label = mainView.lookupReference('userName');
            label.setHtml(value);
        }
        
//        if(Dashboard.manager.FeaturesManager.isEnabled('EXTERNAL_CONFIGURATION_ADMIN')){
//            mainView.lookupReference('globalConfigurationButton').setVisible(true);
//        }
        
    },


    /**
     * Save configuration to server
     * @param {type} feature
     * @param {type} unsecured
     * @returns {undefined}
     */
    saveFeatureConfiguration: function(feature, unsecured){
                       
        var featureConfiguration = feature.data.configuration;
                
        if(featureConfiguration.id){
            delete featureConfiguration.id;
        }
        
        var key = feature.data.name;
        
        if(unsecured === 'unsecured'){
             key = 'unsecured.' + key;
        }
        
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/' + key;
        
        featureConfiguration.getProxy().api.create = url;
        featureConfiguration.getProxy().api.update = url;
        
        featureConfiguration.save({
            scope: this,
            success: function(record, response) {
                Dashboard.tool.Utilities.info(
                        '[ConfigurationManager.saveFeatureConfiguration] success. featureName : '+ feature.data.name);
            },
            failure: function(record, response) {
                var error = response.error.response.responseText;
                Dashboard.tool.Utilities.info(
                        '[ConfigurationManager.saveFeatureConfiguration] success. false : '+ error);
            }
        }); 
    },
    
    
    /**
     * Save user's configuration to server
     * @param {type} feature
     * @param {type} user
     * @param {type} unsecured
     * @returns {undefined}
     */
    saveUserConfiguration: function(feature, user, unsecured){
                                
        var configuration = feature.data.userConfiguration;
                
        if(configuration.id){
            delete configuration.id;
        }
        
        var key =  feature.data.name;
                
        if(unsecured === 'unsecured'){
             key = 'unsecured.' + key;
        }
        
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/currentuser/' + key;
                
        configuration.getProxy().api.create = url;
        configuration.getProxy().api.update = url;
        
        configuration.save({
            scope: this,
            success: function(record, response) {
                Dashboard.tool.Utilities.info(
                        '[ConfigurationManager.saveUserConfiguration] success. featureName : '+ feature.data.name);
            },
            failure: function(record, response) {
                var error = response.error.response.responseText;
                Dashboard.tool.Utilities.info(
                        '[ConfigurationManager.saveUserConfiguration] success. false : '+ error);
            }
        }); 
    },
    
    
    saveGlobalConfiguration: function(configuration, unsecured){
                
        this.globalConfiguration = configuration;
                                       
        if(configuration.id){
            delete configuration.id;
        }
        
        var key = 'WEB_CLIENT';
        
        if(unsecured === 'unsecured'){
             key = 'unsecured.' + key;
        }
        
        var url = Dashboard.config.Config.SERVER_HOST_NAME + '/externalconfiguration/' + key;
        
        configuration.getProxy().api.create = url;
        configuration.getProxy().api.update = url;
        
        configuration.save({
            scope: this,
            success: function(record, response) {
                Dashboard.tool.Utilities.info(
                        '[ConfigurationManager.saveGlobalConfiguration] success. featureName : '+ 'webClient');
            },
            failure: function(record, response) {
                var error = response.error.response.responseText;
                Dashboard.tool.Utilities.info(
                        '[ConfigurationManager.saveGlobalConfiguration] success. false : '+ error);
            }
        }); 
    }
});