
Ext.define('Dashboard.store.Rights', {
    extend: 'Ext.data.Store',

    model: 'Dashboard.model.Right',

    data: [
        {
            id: 2,
            name: 'USER_ADMIN',
            label: getText('Users administration'),
            features: ['USER_ADMIN'],
            group: 'MANAGEMENT',
            enabled: false
        },  {
            id: 2000,
            name: 'USER',
            label: getText('Users'),
            features: ['USER'],
            group: 'MANAGEMENT',
            enabled: false
        },{
            id: 3,
            name: 'LOCATION_ADMIN',
            label: getText('Locations administration'),
            features: ['LOCATION_ADMIN', 'POSITION_ADMIN'],
            group: 'MANAGEMENT',
            enabled: false
        }, {
            id: 4,
            name: 'REF_MAT_ADMIN',
            label: getText('References administration'),
            features: ['REF_MAT_ADMIN'],
            group: 'MANAGEMENT',
            enabled: false
        }, {
            id: 5,
            name: 'CAT_MAT_ADMIN',
            label: getText('Categories administration'),
            features: ['CAT_MAT_ADMIN'],
            group: 'MANAGEMENT',
            enabled: false
        }, {
            id: 6,
            name: 'MAT_ADMIN',
            label: getText('Items administration'),
            features: ['MAT_ADMIN'],
            group: 'MANAGEMENT',
            enabled: false
        }, {
            id: 7,
            name: 'OP_ASSOCIATE_TAG',
            label: getText('Associate / dissociate tag'),
            features: ['OP_ASSOCIATE_TAG', 'OP_DISSOCIATE_TAG'],
            group: 'MANAGEMENT',
            enabled: false
        }, {
            id: 8,
            name: 'PROFILE_ADMIN',
            label: getText('Profiles administration'),
            features: ['PROFILE_ADMIN'],
            group: 'MANAGEMENT',
            enabled: false
        }, {
            id: 9,
            name: 'OP_SEND',
            label: getText('Send'),
            features: ['OP_SEND', 'OP_RECEIVE'],
            group: 'BUSINESS',
            enabled: false
        },
          {
            id: 10,
            name: 'OP_RECEIVE',
            label: getText('Receiving'),
            group: 'BUSINESS',
            enabled: false,
            hiddenInProfiles: true
          },
        {
            id: 11,
            name: 'OP_BORROW',
            label: getText('Borrow'),
            features: ['OP_BORROW', 'OP_RETURN'],
            group: 'BUSINESS',
            enabled: false
        },
          {
            id: 12,
            name: 'OP_RETURN',
            label: getText('Return'),
            features: ['OP_RETURN'],
            group: 'BUSINESS',
            enabled: false,
            hiddenInProfiles: true
          },
        {
            id: 13,
            name: 'OP_CONSUME',
            label: getText('Consumptions'),
            features: ['OP_CONSUME'],
            group: 'BUSINESS',
            enabled: false
        }, {
            id: 14,
            name: 'OP_MOVE',
            label: getText('Movements'),
            features: ['OP_MOVE'],
            group: 'BUSINESS',
            enabled: false
        }, {
            id: 15,
            name: 'HISTO_BORROW_LIST',
            label: getText('Logging of borrows'),
            features: ['HISTO_BORROW_LIST', 'HISTO_ALL_LIST', 'HISTO_RETURN_LIST'],
            group: 'HISTORIC',
            enabled: false
        },
          {
            id: 16,
            name: 'HISTO_RETURN_LIST',
            label: getText('Logging of returns'),
            features: ['HISTO_RETURN_LIST', 'HISTO_ALL_LIST'],
            group: 'HISTORIC',
            enabled: false,
            hiddenInProfiles: true
          },
        {
            id: 17,
            name: 'HISTO_MOVING_LIST',
            label: getText('Logging of movings'),
            features: ['HISTO_MOVING_LIST', 'HISTO_ALL_LIST'],
            group: 'HISTORIC',
            enabled: false
        }, {
            id: 18,
            name: 'HISTO_CONSUME_LIST',
            label: getText('Logging of consumptions'),
            features: ['HISTO_CONSUME_LIST', 'HISTO_ALL_LIST'],
            group: 'HISTORIC',
            enabled: false
        },
          {
            id: 19,
            name: 'HISTO_RECEIVE_LIST',
            label: getText('Logging of receives'),
            features: ['HISTO_RECEIVE_LIST', 'HISTO_ALL_LIST'],
            group: 'HISTORIC',
            enabled: false,
            hiddenInProfiles: true
          },
        {
            id: 20,
            name: 'HISTO_ALL_LIST',
            label: getText('Loggings'),
            features: ['HISTO_ALL_LIST'],
            group: 'HISTORIC',
            enabled: false,
            hiddenInProfiles: true
        }, {
            id: 21,
            name: 'HISTO_SEND_LIST',
            label: getText('Loggins of sendings'),
            features: ['HISTO_SEND_LIST', 'HISTO_ALL_LIST', 'HISTO_RECEIVE_LIST'],
            group: 'HISTORIC',
            enabled: false
        }, {
            id: 22,
            name: 'MAT_INVENTORY',
            label: getText('Items inventory'),
            features: ['MAT_INVENTORY'],
            group: 'CONSULTATION',
            enabled: false
        },
//          {
//            id: 23,
//            name: 'MAT_BY_LOC_INVENTORY',
//            label: getText('Inventory by location'),
//            features: ['MAT_BY_LOC_INVENTORY'],
//            group: 'CONSULTATION'
//          },
        {
            id: 24,
            name: 'CUR_SEND_INVENTORY',
            label: getText('Sendings'),
            features: ['CUR_SEND_INVENTORY'],
            group: 'CONSULTATION',
            enabled: false
        }, {
            id: 25,
            name: 'CUR_BORROW_INVENTORY',
            label: getText('Borrowings'),
            features: ['CUR_BORROW_INVENTORY'],
            group: 'CONSULTATION',
            enabled: false
        }, {
            id: 26,
            name: 'DEVICE_MAINTENANCE',
            label: getText('Devices administration'), //Connected things administration
            features: ['DEVICE_MAINTENANCE', 'DEVICE_CONSULTATION'],
            group: 'SYSTEM',
            enabled: false
        }, {
            id: 27,
            name: 'STOCK_ADMIN',
            label: getText('Stock levels'),
            features: ['STOCK_ADMIN'],
            group: 'BUSINESS',
            enabled: false
        }, {
            id: 28,
            name: 'PLANNED_OPERATIONS',
            label: getText('Planifications'),
            features: ['PLANNED_OPERATIONS'],
            group: 'BUSINESS',
            enabled: false,
            hiddenInProfiles: true
        }, {
            id: 29,
            name: 'OP_SPECIFIC_CHECK',
            label: getText('Specific check'),
            features: ['OP_SPECIFIC_CHECK'],
            group: 'BUSINESS',
            enabled: false
        }, {
            id: 30,
            name: 'HISTO_SPECIFIC_CHECK_LIST',
            label: getText('Logging of specific checks'),
            features: ['HISTO_SPECIFIC_CHECK_LIST'],
            group: 'HISTORIC',
            enabled: false
        }, {
            id: 31,
            name: 'OP_DISSOCIATE_TAG',
            label: getText('Dissociate tag'),
            features: ['OP_DISSOCIATE_TAG', 'OP_ASSOCIATE_TAG'],
            group: 'MANAGEMENT',
            enabled: false,
            hiddenInProfiles: true
        }, 
//        {
//            id: 32,
//            name: 'OP_IDENTIFY',
//            label: getText('Identify'),
//            features: ['OP_IDENTIFY'],
//            group: 'BUSINESS',
//            enabled: false,
//            hiddenInProfiles: true
//        }, 
        {
            id: 33,
            name: 'OP_LOCATE',
            label: getText('Locate'),
            features: ['OP_LOCATE'],
            group: 'BUSINESS',
            enabled: false
        }, {
            id: 34,
            name: 'OP_EXECUTE',
            label: getText('Execute'),
            features: ['OP_EXECUTE'],
            group: 'BUSINESS',
            enabled: false,
            hiddenInProfiles: true
        }, {
            id: 35,
            name: 'OP_MAINTAIN', // Configuration
            label: getText('Devices configuration'), //'Connected things configuration'
            features: ['OP_MAINTAIN', 'DEVICE_CONSULTATION'],
            group: 'SYSTEM',
            enabled: false
        }, {
            id: 36,
            name: 'ASSIGN_PLANNED_OPERATIONS',
            label: getText('Assignations'),
            features: ['ASSIGN_PLANNED_OPERATIONS'],
            group: 'BUSINESS',
            enabled: false,
            hiddenInProfiles: true
        },
//          {
//            id: 37,
//            name: 'READ_MAT_EXPIRATION_DATES',
//            label: getText('Expiration dates'),
//            features: ['READ_MAT_EXPIRATION_DATES'],
//            group: 'CONSULTATION'
//          },
        {
            id: 38,
            name: 'MANAGE_DEVICE_UPDATES',
            label: getText('Device updates'),
            features: ['MANAGE_DEVICE_UPDATES'],
            group: 'SYSTEM',
            enabled: false
        }, {
            id: 41,
            name: 'OP_INVENTORY',
            label: getText('Inventory'),
            features: ['OP_INVENTORY'],
            group: 'BUSINESS',
            enabled: false
        }, {
            id: 42,
            name: 'HISTO_INVENTORY_LIST',
            label: getText('Logging of inventories'),
            features: ['HISTO_INVENTORY_LIST'],
            group: 'HISTORIC',
            enabled: false
        }, {
            id: 43,
            name: 'OP_MAINTENANCE',
            label: getText('Maintenances'),
            features: ['OP_MAINTENANCE'],
            group: 'BUSINESS',
            enabled: false
        }, {
            id: 44,
            name: 'OP_CALIBRATION',
            label: getText('Calibrations'),
            features: ['OP_CALIBRATION'],
            group: 'BUSINESS',
            enabled: false
        },
//          {
//            id: 45,
//            name: 'SEARCH_MATERIAL',
//            label: getText('Search'),
//            features: ['SEARCH_MATERIAL'],
//            group: 'CONSULTATION'
//          },
        {
            id: 46,
            name: 'INTERVENTION_ORDER_ADMIN',
            label: getText('Intervention orders'),
            features: ['INTERVENTION_ORDER_ADMIN'],
            group: 'BUSINESS',
            enabled: false
        }, {
            id: 47,
            name: 'HISTO_MAINTENANCES_LIST',
            label: getText('Logging of maintenances'),
            features: ['HISTO_MAINTENANCES_LIST', 'HISTO_ALL_LIST'],
            group: 'HISTORIC',
            enabled: false
        }, {
            id: 48,
            name: 'HISTO_CALIBRATIONS_LIST',
            label: getText('Logging of calibrations'),
            features: ['HISTO_CALIBRATIONS_LIST', 'HISTO_ALL_LIST'],
            group: 'HISTORIC',
            enabled: false
        }, {
            id: 52,
            name: 'ALERT_ACKNOWLEDGMENT',
            label: getText('Acknowledge alerts'),
            features: ['ALERT_ACKNOWLEDGMENT'],
            group: 'ALERTS',
            enabled: false
        }, {
            id: 53,
            name: 'CUR_CALIBRATION_INVENTORY',
            label: getText('Calibrations inventory'),
            features: ['CUR_CALIBRATION_INVENTORY'],
            group: 'CONSULTATION',
            enabled: false
        }, {
            id: 54,
            name: 'CUR_MAINTENANCE_INVENTORY',
            label: getText('Maintenance inventory'),
            features: ['CUR_MAINTENANCE_INVENTORY'],
            group: 'CONSULTATION',
            enabled: false
        }, {
            id: 55,
            name: 'SERVER_CONFIG_ADMIN',
            label: getText('Server configuration'),
            features: ['SERVER_CONFIG_ADMIN'],
            group: 'SYSTEM',
            enabled: false,
            hiddenInProfiles: true
        }, {
            id: 56,
            name: 'DASHBOARD_CONSULTATION',
            label: getText('Dashboard consultation'),
            features: ['DASHBOARD_CONSULTATION'],
            group: 'DASHBOARD',
            enabled: false
        }, {
            id: 57,
            name: 'DASHBOARD_CONFIGURATION',
            label: getText('Dashboard configuration'),
            features: ['DASHBOARD_CONFIGURATION', 'DASHBOARD_CONSULTATION'],
            group: 'DASHBOARD',
            enabled: false
        }, {
            id: 58,
            name: 'DYNAMIC_PROPERTIES_ADMIN',
            label: getText('Dynamic properties'),
            features: ['DYNAMIC_PROPERTIES_ADMIN'], //, 'DYNAMIC_TELEMETRY_PROPERTIES_ADMIN', 'DYNAMIC_COMPUTED_PROPERTIES_ADMIN'
            group: 'CONFIGURATION',
            enabled: false
        }, {
            id: 59,
            name: 'SPECIFIC_CHECK_CONFIG_ADMIN',
            label: getText('Specific checks configuration'),
            features: ['SPECIFIC_CHECK_CONFIG_ADMIN'],
            group: 'CONFIGURATION',
            enabled: false
        }, {
            id: 60,
            name: 'EMAIL_SENDERS_ADMIN',
            label: getText('Notif Mail configuration'),
            features: ['EMAIL_SENDERS_ADMIN'],
            group: 'CONFIGURATION',
            enabled: false
        }, {
            id: 61,
            name: 'ALERT_CONFIG_ADMIN',
            label: getText('Alerts configuration'),
            features: ['ALERT_CONFIG_ADMIN'],
            group: 'CONFIGURATION',
            enabled: false,
            hiddenInProfiles: true
        }, {
            id: 62,
            name: 'EXTERNAL_CONFIGURATION_ADMIN',//'WEB_CLIENT_CONFIGURATION',
            label: getText('Web client configuration'),
            features: ['EXTERNAL_CONFIGURATION_ADMIN'],
            group: 'CONFIGURATION',
            enabled: false
        }, {
            id: 63,
            name: 'HISTO_ALERTS',
            label: getText('Logging of alerts'),
            features: ['HISTO_ALERTS'],
            group: 'HISTORIC',
            enabled: false
        },
//          {
//            id: 64,
//            name: 'SUPPORT',
//            label: getText('Support'),
//            features: ['SUPPORT'],
//            group: 'SYSTEM',
//            enabled: false
//          },
        {
            id: 65,
            name: 'CUR_ALERTS_ITEMS',
            label: getText('Consultation of current alerts'),
            features: ['CUR_ALERTS_ITEMS'],
            group: 'ALERTS',
            enabled: false
        }, {
            id: 66,
            name: 'BASIC_ALERT_CONFIGURATION',
            label: getText('Basic alerts configuration'),
            features: ['BASIC_ALERT_CONFIGURATION'],
            group: 'CONFIGURATION',
            enabled: false
        }, {
            id: 67,
            name: 'MATERIALS_SETS_INVENTORY',
            label: getText('Materials sets inventory'),
            features: ['MATERIALS_SETS_INVENTORY'],
            group: 'CONSULTATION',
            enabled: false
        }, {
            id: 68,
            name: 'MANAGE_IMPORTS',
            label: getText('Imports'),
            features: ['MANAGE_IMPORTS'],
            group: 'SYSTEM',
            enabled: false,
            hiddenInProfiles: true
        }, {
            id: 69,
            name: 'DEVICE_CONSULTATION',
            label: getText('Devices consultation'), //Connected things consultation
            features: ['DEVICE_CONSULTATION'],
            group: 'SYSTEM',
            enabled: false,
            hiddenInProfiles: false
        }, {
            id: 70,
            name: 'LOG_SERVER', //SERVER_LOGS
            label: getText('Server logs'),
            features: ['LOG_SERVER'],
            group: 'SYSTEM',
            enabled: false,
            hiddenInProfiles: false
        }, {
            id: 71,
            name: 'HISTO_ACCESS',
            label: getText('Loggin of access'),
            features: ['HISTO_ACCESS'],
            group: 'HISTORIC',
            enabled: false, 
            hiddenInProfiles: false
        }, {
            id: 72,
            name: 'PLUGINS_MAINTENANCE',
            label: getText('Plug-ins'),
            features: ['PLUGINS_MAINTENANCE'],
            group: 'SYSTEM',
            enabled: false, 
            hiddenInProfiles: true
        }, {
            id: 73,
            name: 'MULTI_SITES_ADMIN',
            label: getText('Context management'),
            features: ['MULTI_SITES_ADMIN'],
            group: 'SYSTEM',
            enabled: false
            //hiddenInProfiles: true
        }, {
            id: 74,
            name: 'SENSOR_ADMINISTRATION', 
            label: getText('Sensors administration'),
            features: ['SENSOR_ADMINISTRATION', 'SENSOR_CONSULTATION'],
            group: 'SYSTEM',
            enabled: false,
            hiddenInProfiles: false
        }, {
            id: 75,
            name: 'SENSOR_CONSULTATION',
            label: getText('Sensors consultation'),
            features: ['SENSOR_CONSULTATION'],
            group: 'SYSTEM',
            enabled: false,
            hiddenInProfiles: false
        }, {
            id: 76,
            name: 'DEVICE_READER_CONFIG',
            label: getText('Reader configuration'),
            features: ['DEVICE_READER_CONFIG'],
            group: 'SYSTEM',
            enabled: false,
            hiddenInProfiles: false
        }, {
            id: 1000,
            name: 'MAPS_ADMIN',
            label: getText('Maps management'),
            features: ['MAPS_ADMIN', 'MAPS_CONSULTATION'],
            group: 'CARTOGRAPHY',
            enabled: false,
            hiddenInProfiles: false
        }, {
            id: 1001,
            name: 'MAPS_CONSULTATION',
            label: getText('Maps consultation'),
            features: ['MAPS_CONSULTATION'],
            group: 'CARTOGRAPHY',
            enabled: false,
            hiddenInProfiles: false
        },

//          {
//            id: 1002,
//            name: 'HISTO_PROVISIONS',
//            label: getText('Provisions historic')
//          },

//          {
//            id: 1004,
//            name: 'STOCK_MANAGEMENT',
//            label: getText('Stock levels'),
//            features:[],
//            group: 'BUSINESS'
//          }//,
//          {
//            id: 1005,
//            name: 'EXPIRATION_DATES_MANAGEMENT',
//            label: getText('Expiration dates')
//          },{
//            id: 1006,
//            name: 'SPECIFIC_CHECK_VALIDATION',
//            label: getText('Controls validation')
//          },{
//            id: 1007,
//            name: 'INVENTORIED_ITEMS_MANAGEMENT',
//            label: getText('Inventoried items management')
//          },{
//            id: 1008,
//            name: 'OPERATIONS_INVENTORY',
//            label: getText('Operations inventory')
//          },
        {
            id: 1010,
            name: 'ABOUT',
            label: getText('About'),
            features: ['ABOUT'],
            group: 'SYSTEM',
            enabled: true,
            hiddenInProfiles: true
        },  {
            id: 1029,
            name: 'NOTIFICATIONS',
            label: getText('Notifications'),
            features: ['NOTIFICATIONS'],
            group: 'SYSTEM',
            enabled: false,
            hiddenInProfiles: false
        }, {
            id: 1030,
            name: 'USER_SETTINGS',
            label: getText('User settings'),
            features: ['USER_SETTINGS'],
            group: 'CONFIGURATION',
            enabled: true,
            hiddenInProfiles: true
        }, {
            id: 1033,
            name: 'CW_CONFIG_ADMIN',
            label: getText('Environment configuration'),
            features: ['CW_CONFIG_ADMIN'],
            group: 'SYSTEM',
            enabled: true,
            hiddenInProfiles: false
        }, {
            id: 1034,
            name: 'DYNAMIC_TELEMETRY_PROPERTIES_ADMIN',
            label: getText('Telemetry properties'),
            features: ['DYNAMIC_TELEMETRY_PROPERTIES_ADMIN'],
            group: 'SYSTEM',
            enabled: true,
            hiddenInProfiles: true
        }, 
//        {
//            id: 1035,
//            name: 'DYNAMIC_COMPUTED_PROPERTIES_ADMIN',
//            label: getText('Computed properties'),
//            features: ['DYNAMIC_COMPUTED_PROPERTIES_ADMIN'],
//            group: 'CONFIGURATION',
//            enabled: true
//        }, 
        {
            id: 1036,
            name: 'GEOLOC_CONSULTATION',
            label: getText('Geolocalization consultation'),
            features: ['GEOLOC_CONSULTATION'],
            group: 'CARTOGRAPHY',
            enabled: false,
            hiddenInProfiles: true
        },
        // same here for the id: new id should be checked with the database.
        {
            id: 77,
            name: 'USER_PROFILE_ADMIN',
            label: getText('Users profiles allocation'),
            features: ['USER_PROFILE_ADMIN'],
            group: 'MANAGEMENT',
            enabled: false
        },
        {
            id: 78,
            name: 'USER_DEVICE_ADMIN',
            label: getText('Devices access allocation'),
            features: ['USER_DEVICE_ADMIN'],
            group: 'MANAGEMENT',
            enabled: false
        },
        {
            id: 1040,
            name: 'SYSTEM_ALERTS_ITEMS', // System menu
            label: getText('Items alerts'),
            features: ['SYSTEM_ALERTS_ITEMS'],
            group: 'SYSTEM',
            enabled: true
        }, {
            id: 1041,
            name: 'SYSTEM_ALERTS_INVENTORIES', // System menu
            label: getText('Inventories alerts'),
            features: ['SYSTEM_ALERTS_INVENTORIES'],
            group: 'SYSTEM',
            enabled: true
        }, {
            id: 1042,
            name: 'SYSTEM_ALERTS_STOCKS', // System menu
            label: getText('Stocks alerts'),
            features: ['SYSTEM_ALERTS_STOCKS'],
            group: 'SYSTEM',
            enabled: true
        }, {
            id: 1043,
            name: 'SYSTEM_ALERTS_USERS', // System menu
            label: getText('Users alerts'),
            features: ['SYSTEM_ALERTS_USERS'],
            group: 'SYSTEM',
            enabled: true
        }, {
            id: 1044,
            name: 'SYSTEM_ALERTS_LOCATIONS', // System menu
            label: getText('Locations alerts'),
            features: ['SYSTEM_ALERTS_LOCATIONS'],
            group: 'SYSTEM',
            enabled: true
        }, {
            id: 1045,
            name: 'SYSTEM_ALERTS_DEVICES', // System menu
            label: getText('Devices alerts'),
            features: ['SYSTEM_ALERTS_DEVICES'],
            group: 'SYSTEM',
            enabled: true
        }, {
            id: 1046,
            name: 'HISTO_ALERTS_ITEMS', // Histo
            label: getText('Items alerts'),
            features: ['HISTO_ALERTS_ITEMS'],
            group: 'HISTORIC',
            enabled: true
        }, {
            id: 1047,
            name: 'HISTO_ALERTS_INVENTORIES', // Histo
            label: getText('Inventories alerts'),
            features: ['HISTO_ALERTS_INVENTORIES'],
            group: 'HISTORIC',
            enabled: true
        }, {
            id: 1048,
            name: 'HISTO_ALERTS_STOCKS', // Histo
            label: getText('Stocks alerts'),
            features: ['HISTO_ALERTS_STOCKS'],
            group: 'HISTORIC',
            enabled: true
        }, {
            id: 1049,
            name: 'HISTO_ALERTS_USERS', // Histo
            label: getText('Users alerts'),
            features: ['HISTO_ALERTS_USERS'],
            group: 'HISTORIC',
            enabled: true
        }, {
            id: 1050,
            name: 'HISTO_ALERTS_LOCATIONS', // Histo
            label: getText('Locations alerts'),
            features: ['HISTO_ALERTS_LOCATIONS'],
            group: 'HISTORIC',
            enabled: true
        }, {
            id: 1051,
            name: 'HISTO_ALERTS_DEVICES', // Histo
            label: getText('Devices alerts'), 
            features: ['HISTO_ALERTS_DEVICES'],
            group: 'HISTORIC',
            enabled: true
        }, /*{
            id: 1052,
            name: 'CUR_ALERTS_ITEMS',  //Alerts menu
            label: getText('Items alerts'),
            features: ['CUR_ALERTS_ITEMS'],
            group: 'ALERTS',
            enabled: true
        }, */ {
            id: 1053,
            name: 'CUR_ALERTS_INVENTORIES', //Alerts menu
            label: getText('Inventories alerts'),
            features: ['CUR_ALERTS_INVENTORIES'],
            group: 'ALERTS',
            enabled: true
        }, {
            id: 1054,
            name: 'CUR_ALERTS_STOCKS', //Alerts menu
            label: getText('Stocks alerts'),
            features: ['CUR_ALERTS_STOCKS'],
            group: 'ALERTS',
            enabled: true
        }, {
            id: 1055,
            name: 'CUR_ALERTS_USERS', //Alerts menu
            label: getText('Users alerts'),
            features: ['CUR_ALERTS_USERS'],
            group: 'ALERTS',
            enabled: true
        }, {
            id: 1056,
            name: 'CUR_ALERTS_LOCATIONS', //Alerts menu
            label: getText('Locations alerts'),
            features: ['CUR_ALERTS_LOCATIONS'],
            group: 'ALERTS',
            enabled: true
        }, {
            id: 1057,
            name: 'CUR_ALERTS_DEVICES', //Alerts menu
            label: getText('Devices alerts'),
            features: ['CUR_ALERTS_DEVICES'],
            group: 'ALERTS',
            enabled: true
        }, {
            id: 1058,
            name: 'SETTINGS_ALERTS_ITEMS', // Settings
            label: getText('Items alerts'),
            features: ['SETTINGS_ALERTS_ITEMS'],
            group: 'CONFIGURATION',
            enabled: true
        }, {
            id: 1059,
            name: 'SETTINGS_ALERTS_INVENTORIES', // Settings
            label: getText('Inventories alerts'),
            features: ['SETTINGS_ALERTS_INVENTORIES'],
            group: 'CONFIGURATION',
            enabled: true
        }, {
            id: 1060,
            name: 'SETTINGS_ALERTS_STOCKS', // Settings
            label: getText('Stocks alerts'),
            features: ['SETTINGS_ALERTS_STOCKS'],
            group: 'CONFIGURATION',
            enabled: true
        }, {
            id: 1061,
            name: 'SETTINGS_ALERTS_USERS', // Settings
            label: getText('Users alerts'),
            features: ['SETTINGS_ALERTS_USERS'],
            group: 'CONFIGURATION',
            enabled: true
        }, {
            id: 1062,
            name: 'SETTINGS_ALERTS_LOCATIONS', // Settings
            label: getText('Locations alerts'),
            features: ['SETTINGS_ALERTS_LOCATIONS'],
            group: 'CONFIGURATION',
            enabled: true
        }, {
            id: 1063,
            name: 'SETTINGS_ALERTS_DEVICES', // Settings
            label: getText('Devices alerts'),
            features: ['SETTINGS_ALERTS_DEVICES'],
            group: 'CONFIGURATION',
            enabled: true
        }

    ]
}
);