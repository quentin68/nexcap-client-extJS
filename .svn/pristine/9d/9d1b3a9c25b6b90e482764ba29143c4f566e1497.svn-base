/* global Ext  */

Ext.define('Dashboard.store.Features', {
    extend: 'Ext.data.Store',

    model: 'Dashboard.model.Feature',

    data: [
//        {
//            id: 1,
//            name: 'INTERNAL_OP',
//            label: getText('Internal operation'),
//            enabled: false,
//            activate: false
//        },
        {
            id: 2,
            name: 'USER_ADMIN',
            label: getText('Users administration'),
            enabled: true,
            activate: true // if feature exists into web client
        }, {
            id: 3,
            name: 'LOCATION_ADMIN',
            label: getText('Locations administration'),
            enabled: true,
            activate: true
        }, {
            id: 4,
            name: 'REF_MAT_ADMIN',
            label: getText('References administration'),
            dynamicPropertiesContext: 'REFERENCE',
            enabled: true,
            activate: true
        }, {
            id: 5,
            name: 'CAT_MAT_ADMIN',
            label: getText('Categories administration'),
            enabled: true,
            activate: true
        }, {
            id: 6,
            name: 'MAT_ADMIN',
            label: getText('Items administration'),
            dynamicPropertiesContext: 'MATERIAL',
            enabled: true,
            activate: true
        }, {
            id: 7,
            name: 'OP_ASSOCIATE_TAG',
            label: getText('Associate tag'),
            enabled: true,
            activate: true
        }, {
            id: 8,
            name: 'PROFILE_ADMIN',
            label: getText('Profiles administration'),
            enabled: true,
            activate: true
        }, {
            id: 9,
            name: 'OP_SEND',
            label: getText('Send'),
            enabled: false,
            activate: true
        }, {
            id: 10,
            name: 'OP_RECEIVE',
            label: getText('Receiving'),
            enabled: true,
            activate: true
        }, {
            id: 11,
            name: 'OP_BORROW',
            label: getText('Borrow'),
            enabled: false,
            activate: true
        }, {
            id: 12,
            name: 'OP_RETURN',
            label: getText('Return'),
            enabled: false,
            activate: true
        }, {
            id: 13,
            name: 'OP_CONSUME',
            label: getText('Consumptions'),
            enabled: false,
            activate: true
        }, {
            id: 14,
            name: 'OP_MOVE',
            label: getText('Movements'),
            enabled: false,
            activate: true
        }, {
            id: 15,
            name: 'HISTO_BORROW_LIST',
            label: getText('Logging of borrows'),
            enabled: false,
            activate: true
        }, {
            id: 16,
            name: 'HISTO_RETURN_LIST',
            label: getText('Logging of returns'),
            enabled: false,
            activate: true
        }, {
            id: 17,
            name: 'HISTO_MOVING_LIST',
            label: getText('Logging of movings'),
            enabled: false,
            activate: true
        }, {
            id: 18,
            name: 'HISTO_CONSUME_LIST',
            label: getText('Logging of consumptions'),
            enabled: false,
            activate: true
        }, {
            id: 19,
            name: 'HISTO_RECEIVE_LIST',
            label: getText('Logging of receives'),
            enabled: false,
            activate: true
        }, {
            id: 20,
            name: 'HISTO_ALL_LIST',
            label: getText('Loggings'),
            enabled: true,
            activate: true
        }, {
            id: 21,
            name: 'HISTO_SEND_LIST',
            label: getText('Loggins of sendings'),
            enabled: false,
            activate: true
        }, {
            id: 22,
            name: 'MAT_INVENTORY',
            label: getText('Items inventory'),
            enabled: true,
            activate: true
        }, {
            id: 24,
            name: 'CUR_SEND_INVENTORY',
            label: getText('Sendings'),
            enabled: false,
            activate: true
        }, {
            id: 25,
            name: 'CUR_BORROW_INVENTORY',
            label: getText('Borrowings'),
            enabled: true,
            activate: true
        }, {
            id: 26,
            name: 'DEVICE_MAINTENANCE',
            label: getText('Devices administration'), //Connected things administration
            enabled: true,
            activate: true
        }, {
            id: 27,
            name: 'STOCK_ADMIN',
            label: getText('Stock administration'),
            enabled: false,
            activate: true
        }, {
            id: 28,
            name: 'PLANNED_OPERATIONS',
            label: getText('Planifications'),
            enabled: false,
            activate: false
        }, {
            id: 29,
            name: 'OP_SPECIFIC_CHECK',
            label: getText('Specific check'),
            enabled: false,
            activate: true
        }, {
            id: 30,
            name: 'HISTO_SPECIFIC_CHECK_LIST',
            label: getText('Logging of specific checks'),
            enabled: false,
            activate: true
        }, {
            id: 31,
            name: 'OP_DISSOCIATE_TAG',
            label: getText('Dissociate tag'),
            enabled: true,
            activate: true
        }, 
//        {
//            id: 32,
//            name: 'OP_IDENTIFY',
//            label: getText('Identify'),
//            enabled: true
//        }, 
        {
            id: 33,
            name: 'OP_LOCATE',
            label: getText('Locate'),
            enabled: false,
            activate: false
        }, {
            id: 34,
            name: 'OP_EXECUTE',
            label: getText('Execute'),
            enabled: false,
            activate: false
        }, {
            id: 35,
            name: 'OP_MAINTAIN', // Configuration
            label: getText('Devices configuration'), //'Connected things configuration'
            enabled: true,
            activate: true
        }, {
            id: 36,
            name: 'ASSIGN_PLANNED_OPERATIONS',
            label: getText('Assignations'),
            enabled: false,
            activate: false
        },
//      {
//        id: 37,
//        name: 'READ_MAT_EXPIRATION_DATES',
//        label: getText('Expiration dates')
//      },
        {
            id: 38,
            name: 'MANAGE_DEVICE_UPDATES',
            label: getText('Device updates'),
            enabled: true,
            activate: true
        }, {
            id: 41,
            name: 'OP_INVENTORY',
            label: getText('Inventory'),
            enabled: false,
            activate: true
        }, {
            id: 42,
            name: 'HISTO_INVENTORY_LIST',
            label: getText('Logging of inventories'),
            enabled: true,
            activate: true
        }, {
            id: 43,
            name: 'OP_MAINTENANCE',
            label: getText('Maintenances'),
            enabled: false,
            activate: true
        }, {
            id: 44,
            name: 'OP_CALIBRATION',
            label: getText('Calibrations'),
            enabled: false,
            activate: true
        }, {
            id: 45,
            name: 'SEARCH_MATERIAL',
            label: getText('Search'),
            enabled: false,
            activate: false
        }, {
            id: 46,
            name: 'INTERVENTION_ORDER_ADMIN',
            label: getText('Intervention orders'),
            enabled: false,
            activate: true
        }, {
            id: 47,
            name: 'HISTO_MAINTENANCES_LIST',
            label: getText('Logging of maintenances'),
            enabled: false,
            activate: true
        }, {
            id: 48,
            name: 'HISTO_CALIBRATIONS_LIST',
            label: getText('Logging of calibrations'),
            enabled: false,
            activate: true
        }, {
            id: 52,
            name: 'ALERT_ACKNOWLEDGMENT',
            label: getText('Alerts acknowledgement'),
            enabled: false,
            activate: true
        }, {
            id: 53,
            name: 'CUR_CALIBRATION_INVENTORY',
            label: getText('Calibrations inventory'),
            enabled: false,
            activate: true
        }, {
            id: 54,
            name: 'CUR_MAINTENANCE_INVENTORY',
            label: getText('Maintenance inventory'),
            enabled: false,
            activate: true
        }, {
            id: 55,
            name: 'SERVER_CONFIG_ADMIN',
            label: getText('Server configuration'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 56,
            name: 'DASHBOARD_CONSULTATION',
            label: getText('Dashboard consultation'),
            enabled: true,
            activate: true
        }, {
            id: 57,
            name: 'DASHBOARD_CONFIGURATION',
            label: getText('Dashboard configuration'),
            enabled: true,
            activate: true
        }, {
            id: 58,
            name: 'DYNAMIC_PROPERTIES_ADMIN',
            label: getText('Dynamic properties administration'),
            enabled: true,
            activate: true
        }, {
            id: 59,
            name: 'SPECIFIC_CHECK_CONFIG_ADMIN',//'SPECIFIC_CHECK_CONFIG_SETTINGS',
            label: getText('Specific checks configuration'),
            enabled: true,
            activate: true
        }, {
            id: 60,
            name: 'EMAIL_SENDERS_ADMIN',//'NOTIF_MAIL_CONFIG_SETTINGS',
            label: getText('Notif Mail configuration'),
            enabled: true,
            activate: true
        }, {
            id: 61,
            name: 'ALERT_CONFIG_ADMIN',//'ALERT_CONFIG_SETTINGS',
            label: getText('Alerts configuration'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 62,
            name: 'EXTERNAL_CONFIGURATION_ADMIN',//'WEB_CLIENT_CONFIGURATION',
            label: getText('Web client configuration'),
            enabled: true,
            activate: true
        }, {
            id: 63,
            name: 'HISTO_ALERTS',
            label: getText('Loggin of alerts'),
            enabled: true,
            activate: true
        },

//        {
//        id: 64,
//        name: 'SUPPORT',
//        label: getText('Support'),
//        enabled: true
//      },
        {
            id: 65,
            name: 'CUR_ALERTS_ITEMS',
            label: getText('Items alerts'),
            enabled: true,
            activate: true
        }, {
            id: 66,
            name: 'BASIC_ALERT_CONFIGURATION',
            label: getText('Basic alerts configuration'),
            enabled: true,
            activate: true
        }, {
            id: 67,
            name: 'MATERIALS_SETS_INVENTORY',
            label: getText('Materials sets inventory'),
            enabled: true,
            activate: true
        }, {
            id: 68,
            name: 'MANAGE_IMPORTS',
            label: getText('Imports'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 69,
            name: 'DEVICE_CONSULTATION',
            label: getText('Devices consultation'), //Connected things consultation
            enabled: false,
            activate: true
        }, {
            id: 70,
            name: 'LOG_SERVER', //SERVER_LOGS
            label: getText('Server logs'),
            enabled: true,
            activate: true
        }, {
            id: 71,
            name: 'HISTO_ACCESS',
            label: getText('Loggin of access'),
            enabled: true,
            activate: true
        }, {
            id: 72,
            name: 'PLUGINS_MAINTENANCE',
            label: getText('Plug-ins'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 73,
            name: 'MULTI_SITES_ADMIN',
            label: getText('Context management'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 74,
            name: 'SENSOR_ADMINISTRATION',
            label: getText('Sensors administration'),
            enabled: true,
            activate: true
        }, {
            id: 75,
            name: 'SENSOR_CONSULTATION',
            label: getText('Sensors consultation'),
            enabled: true,
            activate: true
        }, {
            id: 76,
            name: 'DEVICE_READER_CONFIG',
            label: getText('Reader configuration'),
            enabled: true,
            activate: true
        }, {
            id: 1000,
            name: 'MAPS_ADMIN',
            label: getText('Maps management'),
            enabled: true,
            activate: true
        }, {
            id: 1001,
            name: 'MAPS_CONSULTATION',
            label: getText('Maps consultation'),
            enabled: true,
            activate: true
        }, {
            id: 1002,
            name: 'HISTO_PROVISIONS',
            label: getText('Provisions historic'),
            enabled: true,
            activate: true
        }, {
            id: 1003,
            name: 'CUR_ALERTS_OPERATIONS',
            label: getText('Operations alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1004,
            name: 'STOCK_MANAGEMENT',
            label: getText('Items alerts'),
            enabled: false,
            activate: false
        }, {
            id: 1005,
            name: 'EXPIRATION_DATES_MANAGEMENT',
            label: getText('Expiration dates'),
            enabled: false,
            activate: false
        }, {
            id: 1006,
            name: 'SPECIFIC_CHECK_VALIDATION',
            label: getText('Controls validation'),
            enabled: false,
            activate: false
        }, {
            id: 1007,
            name: 'INVENTORIED_ITEMS_MANAGEMENT',
            label: getText('Inventoried items management'),
            enabled: false,
            activate: false
        }, {
            id: 1008,
            name: 'OPERATIONS_INVENTORY',
            label: getText('Operations inventory'),
            enabled: false,
            activate: false
        }, {
            id: 1010,
            name: 'ABOUT',
            label: getText('About'),
            enabled: true,
            activate: true
        }, {
            id: 1011,
            name: 'POSITION_ADMIN',
            label: getText('Positions administration'),
            enabled: true,
            activate: true
        }, {
            id: 1015,
            name: 'PLANNED_OPERATIONS',
            label: getText('Planned operations'),
            enabled: false,
            activate: false
        }, 
//        {
//            id: 1017,
//            name: 'REFERENCE_INVENTORY',
//            label: getText('References inventory'),
//            enabled: false
//        }, 
        {
            id: 1018,
            name: 'ASSIGNED_LOCS_FOR_POSITIONS',
            label: getText('Assigned position for material references'),
            enabled: false,
            activate: false
        }, {
            id: 1019,
            name: 'DATA_SYNCHRONIZATION',
            label: getText('Synchronisation with devices'),
            enabled: false,
            activate: false
        }, {
            id: 1022,
            name: 'LOGIN_SCREEN',
            label: getText('Home page'),
            enabled: true,
            activate: true
        }, {
            id: 1029,
            name: 'NOTIFICATIONS',
            label: getText('Notifications'),
            enabled: false,
            activate: true
        }, {
            id: 1030,
            name: 'USER_SETTINGS',
            label: getText('User settings'),
            enabled: true,
            activate: true
        }, {
            id: 1033,
            name: 'CW_CONFIG_ADMIN',
            label: getText('Environment configuration'),
            enabled: true,
            activate: true
        }, {
            id: 1034,
            name: 'DYNAMIC_TELEMETRY_PROPERTIES_ADMIN',
            label: getText('Telemetry properties administration'),
            enabled: true,
            activate: true
        },
        // {
//            id: 1035,
//            name: 'DYNAMIC_COMPUTED_PROPERTIES_ADMIN',
//            label: getText('Computed properties administration'),
//            enabled: true,
//            activate: true
//        }
         {
            id: 1036,
            name: 'GEOLOC_CONSULTATION',
            label: getText('Geolocalization consultation'),
            enabled: true,
            activate: true
        },
        //latest but need to confirm with trunk database for the "id"
        // {
        //     id: 77,
        //     name: 'USER_PROFILE_ADMIN',
        //     label: getText('Users profiles allocation'),
        //     enabled: true,
        //     activate: true // if feature exists into web client
        // },
        // {
        //     id: 78,
        //     name: 'USER_DEVICE_ADMIN',
        //     label: getText('Devices access allocation'),
        //     enabled: true,
        //     activate: true // if feature exists into web client
        // },
        // for now putting this new id just in case
        {
            id: 77,
            name: 'USER_PROFILE_ADMIN',
            label: getText('Users profiles allocation'),
            enabled: true,
            activate: true // if feature exists into web client
        },
        {
            id: 78,
            name: 'USER_DEVICE_ADMIN',
            label: getText('Devices access allocation'),
            enabled: true,
            activate: true // if feature exists into web client
        },
        {
            id: 3000,
            name: 'USER_BOTH_PROFILE_DEVICE_ADMIN',
            label: getText('Users profiles & device allocation'),
            enabled: false,
            activate: false
        }, {
            id: 1040,
            name: 'SYSTEM_ALERTS_ITEMS', // System menu
            label: getText('Items alerts'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 1041,
            name: 'SYSTEM_ALERTS_INVENTORIES', // System menu
            label: getText('Inventories alerts'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 1042,
            name: 'SYSTEM_ALERTS_STOCKS', // System menu
            label: getText('Stocks alerts'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 1043,
            name: 'SYSTEM_ALERTS_USERS', // System menu
            label: getText('Users alerts'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 1044,
            name: 'SYSTEM_ALERTS_LOCATIONS', // System menu
            label: getText('Locations alerts'),
            enabled: true,
            activate: true,
            superAdmin: true
        }, {
            id: 1045,
            name: 'SYSTEM_ALERTS_DEVICES', // System menu
            label: getText('Devices alerts'),
            enabled: true,
            activate: true,
            superAdmin: true
        },/* {
            id: 1046,
            name: 'HISTO_ALERTS_ITEMS', // Histo
            label: getText('Items alerts'),
            enabled: true,
            activate: true
        }, */{
            id: 1047,
            name: 'HISTO_ALERTS_INVENTORIES', // Histo
            label: getText('Inventories alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1048,
            name: 'HISTO_ALERTS_STOCKS', // Histo
            label: getText('Stocks alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1049,
            name: 'HISTO_ALERTS_USERS', // Histo
            label: getText('Users alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1050,
            name: 'HISTO_ALERTS_LOCATIONS', // Histo
            label: getText('Locations alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1051,
            name: 'HISTO_ALERTS_DEVICES', // Histo
            label: getText('Devices alerts'), 
            enabled: true,
            activate: true
        }, /*{
            id: 1052,
            name: 'CUR_ALERTS_ITEMS',  //Alerts menu
            label: getText('Items alerts'),
            enabled: true,
            activate: true
        }, */ {
            id: 1053,
            name: 'CUR_ALERTS_INVENTORIES', //Alerts menu
            label: getText('Inventories alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1054,
            name: 'CUR_ALERTS_STOCKS', //Alerts menu
            label: getText('Stocks alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1055,
            name: 'CUR_ALERTS_USERS', //Alerts menu
            label: getText('Users alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1056,
            name: 'CUR_ALERTS_LOCATIONS', //Alerts menu
            label: getText('Locations alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1057,
            name: 'CUR_ALERTS_DEVICES', //Alerts menu
            label: getText('Devices alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1058,
            name: 'SETTINGS_ALERTS_ITEMS', // Settings
            label: getText('Items alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1059,
            name: 'SETTINGS_ALERTS_INVENTORIES', // Settings
            label: getText('Inventories alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1060,
            name: 'SETTINGS_ALERTS_STOCKS', // Settings
            label: getText('Stocks alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1061,
            name: 'SETTINGS_ALERTS_USERS', // Settings
            label: getText('Users alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1062,
            name: 'SETTINGS_ALERTS_LOCATIONS', // Settings
            label: getText('Locations alerts'),
            enabled: true,
            activate: true
        }, {
            id: 1063,
            name: 'SETTINGS_ALERTS_DEVICES', // Settings
            label: getText('Devices alerts'),
            enabled: true,
            activate: true
        }
    ]
});