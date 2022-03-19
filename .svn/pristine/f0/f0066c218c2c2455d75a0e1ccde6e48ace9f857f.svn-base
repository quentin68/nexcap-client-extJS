Ext.define('Dashboard.store.settings.FeaturesConfig', {
    extend: 'Ext.data.Store',

    model: 'Dashboard.model.settings.FeaturesConfig',

    data: [
        {
            name: 'SEND_RECEIVE', //ok
            label: getText('Send/Receive'),
            features: ['OP_SEND', 'OP_RECEIVE', 'HISTO_SEND_LIST', 'CUR_SEND_INVENTORY', 'HISTO_RECEIVE_LIST', 'HISTO_ALL_LIST']
        }, {
            name: 'BORROW_RETURN', //ok
            label: getText('Borrow/Return'),
            features: ['OP_BORROW', 'OP_RETURN', 'HISTO_RETURN_LIST', 'HISTO_BORROW_LIST', 'CUR_BORROW_INVENTORY', 'HISTO_ALL_LIST']
        }, {
            name: 'CONSUME', //ok
            label: getText('Consume/Provision'),
            features: ['OP_CONSUME', 'HISTO_CONSUME_LIST', 'HISTO_PROVISIONS', 'HISTO_ALL_LIST']
        }, {
            name: 'MOVE', //ok
            label: getText('Move'),
            features: ['OP_MOVE', 'HISTO_MOVING_LIST', 'HISTO_ALL_LIST']
        }, {
            name: 'TAGS', //ok
            label: getText('Associate/Dissociate tag'),
            features: ['OP_DISSOCIATE_TAG', 'OP_ASSOCIATE_TAG']
        }, {
            name: 'SPECIFIC_CHECKS', //ok
            label: getText('Specific checks management'),
            features: ['HISTO_SPECIFIC_CHECK_LIST', 'OP_SPECIFIC_CHECK', 'SPECIFIC_CHECK_VALIDATION',
                'SPECIFIC_CHECK_CONFIG_ADMIN']
        }, {
            name: 'INVENTORIES', //ok
            label: getText('Inventories'),
            features: ['OPERATIONS_INVENTORY', 'INVENTORIED_ITEMS_MANAGEMENT', 'OP_INVENTORY',
                'HISTO_INVENTORY_LIST'/*, 'MATERIALS_SETS_INVENTORY'*/] // MATERIALS_SETS_INVENTORY is not operation
        }, {
            name: 'STOCK_LEVELS', //ok
            label: getText('Stock levels management'),
            features: ['STOCK_MANAGEMENT', 'STOCK_ADMIN']
        }, {
            name: 'PLANNED_OPERATIONS', //ok (P2)
            label: getText('Planned operations management'),
            features: ['PLANNED_OPERATIONS', 'ASSIGN_PLANNED_OPERATIONS', 'OP_EXECUTE']
        }, {
            name: 'INTERVENTION_ORDERS', //ok
            label: getText('Intervention orders'),
            features: ['INTERVENTION_ORDER_ADMIN']
        }, {
            name: 'MATERIAL_MAINTENANCE', //ok
            label: getText('Departure/return for maintenance'),
            features: ['CUR_MAINTENANCE_INVENTORY', 'HISTO_MAINTENANCES_LIST', 'OP_MAINTENANCE', 'HISTO_ALL_LIST']
        }, {
            name: 'MATERIAL_CALIBRATION', //ok
            label: getText('Departure/return for calibration'),
            features: ['CUR_CALIBRATION_INVENTORY', 'OP_CALIBRATION', 'HISTO_CALIBRATIONS_LIST', 'HISTO_ALL_LIST']
        }, {
            name: 'ALERTS', //ok
            label: getText('Alerts management'),
            features: ['HISTO_ALERTS', 'CUR_ALERTS_ITEMS', 'ALERT_ACKNOWLEDGMENT', 'BASIC_ALERT_CONFIGURATION', 'ALERT_CONFIG_ADMIN']
            //  'SYSTEM_ALERTS_ITEMS', 'SYSTEM_ALERTS_INVENTORIES', 'SYSTEM_ALERTS_STOCKS', 'SYSTEM_ALERTS_USERS',
            //             'SYSTEM_ALERTS_LOCATIONS', 'SYSTEM_ALERTS_DEVICES', 'SETTINGS_ALERTS_ITEMS', 'SETTINGS_ALERTS_INVENTORIES',
            //             'SETTINGS_ALERTS_STOCKS', 'SETTINGS_ALERTS_USERS', 'SETTINGS_ALERTS_LOCATIONS', 'SETTINGS_ALERTS_DEVICES',
        }, {
            name: 'DATA_SYNCHRONIZATION', //ok
            label: getText('Synchronization with devices'),
            features: ['DATA_SYNCHRONIZATION']
        }, {
            name: 'DASHBOARD', //ok
            label: getText('Dashboard'),
            features: ['DASHBOARD_CONSULTATION', 'DASHBOARD_CONFIGURATION']
        }, {
            name: 'CARTOGRAPHY', //ok
            label: getText('Cartography'),
            features: ['MAPS_ADMIN', 'MAPS_CONSULTATION']
        }, {
            name: 'ADMINISTRATION', //Ok
            label: getText('Super administration'),
            features: ['CAT_MAT_ADMIN', 'REF_MAT_ADMIN', 'MAT_ADMIN', 'LOCATION_ADMIN', 'PROFILE_ADMIN',
                'USER_ADMIN','USER_PROFILE_ADMIN','USER_DEVICE_ADMIN', 'DYNAMIC_PROPERTIES_ADMIN', 'LOG_SERVER', 'CW_CONFIG_ADMIN']
        }, {
            name: 'DEVICE_MAINTENANCE_CONFIGURATION', //ok
            label: getText('Devices maintenance configuration'),
            features: ['OP_MAINTAIN', 'DEVICE_MAINTENANCE', 'DEVICE_CONSULTATION', 'MANAGE_DEVICE_UPDATES',
                'HISTO_ACCESS', 'DEVICE_READER_CONFIG']
        }, {
            name: 'MAT_INVENTORY', //ok
            label: getText('Items inventory'),
            features: ['MAT_INVENTORY']
        }, {
            name: 'MATERIALS_SETS_INVENTORY', //ok
            label: getText('Materials sets inventory'),
            features: ['MATERIALS_SETS_INVENTORY']
        }, {
            name: 'NOTIFICATIONS', //ok
            label: getText('Notifications'),
            features: ['NOTIFICATIONS']
        }, {
            name: 'SEARCH',//ok
            label: getText('Search'),
            features: ['SEARCH_MATERIAL']
        }, {
            name: 'WEBCLIENT_CONFIGURATION', //ok
            label: getText('Web client configuration'),
            features: ['EXTERNAL_CONFIGURATION_ADMIN']
        }, {
            name: 'EMAIL_SENDERS_ADMIN', //ok
            label: getText('Notif Mail configuration'),
            features: ['EMAIL_SENDERS_ADMIN']
        }, {
            name: 'IMPORTS',
            label: getText('Manage imports'),
            features: ['MANAGE_IMPORTS']
        }, {
            name: 'MONITORING',
            label: getText('Sensors management'),
            features: ['SENSOR_ADMINISTRATION', 'SENSOR_CONSULTATION', 'DYNAMIC_TELEMETRY_PROPERTIES_ADMIN']
                //, 'DYNAMIC_COMPUTED_PROPERTIES_ADMIN'
        }
    ]
});