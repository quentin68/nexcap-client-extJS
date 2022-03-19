
Ext.define('Dashboard.store.FilterTypes', {
    extend: 'Ext.data.Store',
    
    fields: [
        'propertyValueType', 
        'type', 
        'fieldType', 
        {
            name: 'label',
            type: 'string',
            convert: function(val) {
                 return getText(val);
            }
        },
        'className', 
        'operators'],
    
    data: [
        {
            type: 'TEXT', 
            propertyValueType: 'STRING',
            fieldType: 'textfield',
            label: getText('Text field'), 
            className: 'TextFilter',
            operators:['IS_NULL','IS_NOT_NULL', 'CONTAINS', 'EQ','NE','STARTSWITH','ENDSWITH']
        },{
            type: 'TEXT_AREA', 
            propertyValueType: 'STRING',
            fieldType: 'textareafield',
            label: getText('Text area'), 
            className: 'TextAreaFilter',
            operators:['IS_NULL','IS_NOT_NULL', 'CONTAINS', 'EQ','NE','STARTSWITH','ENDSWITH']
        },{
            type:'LONG', 
            propertyValueType: 'LONG', 
            fieldType: 'integerfield',
            label: getText('Integer'), 
            className: 'LongFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },{
            type:'INT', 
            propertyValueType: 'INT', 
            fieldType: 'integerfield',
            label: getText('Integer'), 
            className: 'IntegerFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },{
            type:'NUMBER', 
            propertyValueType: 'FLOAT',
            fieldType: 'numberfield',
            label: getText('Number'), 
            className: 'NumberFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },{
            type:'DATE', 
            propertyValueType: 'DATE', 
            fieldType: 'datefield',
            label: getText('Date'), 
            className: 'DateFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT', 'FROM_TO']
        },{
            type:'TIME', 
            propertyValueType: 'TIME', 
            fieldType: 'timefield',
            label: getText('Time'), 
            className: 'TimeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },{
            type:'DATETIME', 
            propertyValueType: 'DATETIME', 
            fieldType: 'datetimefield',
            label: getText('Date & Time'), 
            className: 'DateTimeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },{
            type:'CHECKBOX', 
            propertyValueType: 'BOOLEAN',
            fieldType: 'checkbox',
            label: getText('Check box'), 
            className: 'CheckBoxFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE']
        },{
            type:'COMBOBOX', 
            propertyValueType: 'STRING',
            fieldType: 'combobox',
            label: getText('Combo box'), 
            className: 'ComboBoxFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },{
            type:'DATES_RANGE', 
            propertyValueType: 'DATE',
            fieldType: 'datesrange',
            label: getText('Dates range'), 
            className: 'DatesRangeFilter',
            operators:[]
        },{
            type:'DATES_TIME_RANGE', 
            propertyValueType: 'DATETIME',
            fieldType: 'datestimerange',
            label: getText('Dates times range'), 
            className: 'DatesTimeRangeFilter',
            operators:[]
        },{
            type:'ADDRESS', 
            propertyValueType: 'STRING',
            fieldType: 'address',
            label: getText('Address'), 
            className: 'AddressFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },{
            type:'PROPERTY_CONFIGURATION_TYPE', 
            propertyValueType: 'STRING',
            fieldType: 'propertyConfigurationType',
            label: getText('Linked object'), 
            className: 'PropertyConfigurationTypeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE']
        },{
            type:'PROPERTY_TYPE', 
            propertyValueType: 'STRING',
            fieldType: 'propertyType',
            label: getText('Type'), 
            className: 'propertyType',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE']
        },{
            type:'COMBO_ITEM_REF_CAT', 
            propertyValueType: 'STRING',
            fieldType: 'comboitemrefcat',
            label: getText('Multiple comboBox'), 
            className: 'ComboItemRefCatFilter',
            operators:[]
        },{
            type:'INTERVENTION_ORDERS', 
            propertyValueType: 'STRING',
            fieldType: 'interventionorders',
            label: getText('Intervention order'), 
            className: 'InterventionOrdersFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },{
            type:'USERS', 
            propertyValueType: 'STRING',
            fieldType: 'users',
            label: getText('User identifier'), 
            className: 'UsersFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },{
            type:'BADGE_NUMBER', 
            propertyValueType: 'STRING',
            fieldType: 'badgenumber',
            label: getText('Badge number'), 
            className: 'BadgeNumberFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },{
            type:'REFRENCES_CODE', 
            propertyValueType: 'STRING',
            fieldType: 'referencescode',
            label: getText('Reference code'), 
            className: 'ReferencesCodeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },{
            type:'REFRENCES_DESIGNATION', 
            propertyValueType: 'STRING',
            fieldType: 'referencesdesignation',
            label: getText('Reference designation'), 
            className: 'ReferencesDesignationFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        }, {
            type:'REFRENCES_DESCRIPTION', 
            propertyValueType: 'STRING',
            fieldType: 'referencesdescription',
            label: getText('Reference description'), 
            className: 'ReferencesDescriptionFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        }, {
            type:'REFRENCES_IDENTIFIED', 
            propertyValueType: 'BOOLEAN',
            fieldType: 'referencesIdentified',
            label: getText('Type'), 
            className: 'ReferencesIdentifiedFilter',
            operators: ['EQ','NE']
        }, {
            type:'CATEGORIES', 
            propertyValueType: 'STRING',
            fieldType: 'categories',
            label: getText('Category'), 
            className: 'CategoriesFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        }, {
            type:'CATEGORIES_FULLPATH', 
            propertyValueType: 'STRING',
            fieldType: 'categoriesFullPath',
            label: getText('Category (Full path)'), 
            className: 'CategoriesFullPathFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        }, {
            type:'PROFILES', 
            propertyValueType: 'STRING',
            fieldType: 'profiles',
            label: getText('Profile'), 
            className: 'ProfilesFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        }, {
            type: 'ALERT_LEVEL',
            propertyValueType: 'STRING',
            fieldType: 'alertLevel',
            label: getText('Alert level'),
            className: 'AlertLevelFilter',
            operators: ['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH'] // OLD TO BE CHECKED: ['EQ', 'NE', 'GT', 'LT']
        }, {
            type:'ALERT_NAME', 
            propertyValueType: 'STRING',
            fieldType: 'alertName',
            label: getText('Alert'), 
            className: 'AlertNameFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        }, {
            type: 'ENUM', 
            propertyValueType: 'ENUM',
            fieldType: 'enum',
            label: getText('Text field'), 
            className: 'EnumFilter',
            operators:['IS_NULL','IS_NOT_NULL', 'CONTAINS', 'EQ','NE','STARTSWITH','ENDSWITH']
        }, {
            type:'CODE', 
            propertyValueType: 'STRING',
            fieldType: 'code',
            label: getText('Code'), 
            className: 'CodeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        }, {
            type:'DEVICE_TYPE', 
            propertyValueType: 'STRING',
            fieldType: 'deviceType',
            label: getText('Type'), 
            className: 'DeviceTypeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE']
        }
    ],
    
    statics: {
        
        TEXT: {
            propertyValueType: 'STRING', 
            fieldType: 'textfield',
            label: getText('Text field'), 
            className: 'TextFilter',
            operators:['IS_NULL','IS_NOT_NULL', 'CONTAINS', 'EQ','NE','STARTSWITH','ENDSWITH']
        },
        TEXT_AREA: {
            propertyValueType: 'STRING',
            fieldType: 'textareafield',
            label: getText('Text area'), 
            className: 'TextAreaFilter',
            operators:['IS_NULL','IS_NOT_NULL', 'CONTAINS', 'IN','EQ','NE','STARTSWITH','ENDSWITH']
        },
        LONG: {
            propertyValueType: 'LONG', 
            fieldType: 'integerfield',
            label: getText('Integer'), 
            className: 'LongFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },
        INT: {
            propertyValueType: 'INT', 
            fieldType: 'integerfield',
            label: getText('Integer'), 
            className: 'IntegerFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },
        NUMBER: {
            propertyValueType: 'FLOAT',
            fieldType: 'numberfield',
            label: getText('Number'), 
            className: 'NumberFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },
        DATE: {
            propertyValueType: 'DATE', 
            fieldType: 'datefield',
            label: getText('Date'), 
            className: 'DateFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT','FROM_TO']
        },
        TIME: {
            propertyValueType: 'TIME', 
            fieldType: 'datefield',
            label: getText('Time'), 
            className: 'TimeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },
        DATETIME: {
            propertyValueType: 'DATETIME', 
            fieldType: 'datetimefield',
            label: getText('Date & Time'), 
            className: 'DateTimeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','GT','LT']
        },
        CHECKBOX: {
            propertyValueType: 'BOOLEAN',
            fieldType: 'checkbox',
            label: getText('Check box'), 
            className: 'CheckBoxFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE']
        },
        COMBOBOX: {
            propertyValueType: 'STRING', 
            fieldType: 'combobox',
            label: getText('Combo box'), 
            className: 'ComboBoxFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        DATES_RANGE: {
            propertyValueType: 'DATE',
            fieldType: 'datesrange',
            label: getText('Dates range'), 
            className: 'DatesRangeFilter',
            operators:[]
        },
        DATES_TIME_RANGE: {
            propertyValueType: 'DATETIME',
            fieldType: 'datestimerange',
            label: getText('Dates times range'), 
            className: 'DatesTimeRangeFilter',
            operators:[]
        },
        ADDRESS: {
            propertyValueType: 'STRING',
            fieldType: 'address',
            label: getText('Address'), 
            className: 'AddressFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        PROPERTY_CONFIGURATION_TYPE: {
            propertyValueType: 'STRING',
            fieldType: 'propertyConfigurationType',
            label: getText('Linked object'), 
            className: 'PropertyConfigurationTypeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE']
        },
        PROPERTY_TYPE: {
            propertyValueType: 'STRING',
            fieldType: 'propertyType',
            label: getText('Type'), 
            className: 'PropertyTypeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE']
        },
        COMBO_ITEM_REF_CAT: {
            propertyValueType: 'STRING',
            fieldType: 'comboitemrefcat',
            label: getText('Multiple comboBox'), 
            className: 'ComboItemRefCatFilter',
            operators:[]
        },
        INTERVENTION_ORDERS:{
            propertyValueType: 'STRING',
            fieldType: 'interventionorders',
            label: getText('Intervention order'), 
            className: 'InterventionOrdersFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        USERS:{
            propertyValueType: 'STRING',
            fieldType: 'users',
            label: getText('User identifier'), 
            className: 'UsersFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        BADGE_NUMBER:{
            propertyValueType: 'STRING',
            fieldType: 'badgenumber',
            label: getText('Badge number'), 
            className: 'BadgeNumberFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        REFRENCES_CODE:{
            propertyValueType: 'STRING',
            fieldType: 'referencescode',
            label: getText('Reference code'), 
            className: 'ReferencesCodeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        REFRENCES_DESIGNATION:{
            propertyValueType: 'STRING',
            fieldType: 'referencesdesignation',
            label: getText('Reference designation'), 
            className: 'ReferencesDesignationFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        REFRENCES_DESCRIPTION:{
            propertyValueType: 'STRING',
            fieldType: 'referencesdescription',
            label: getText('Reference description'), 
            className: 'ReferencesDescriptionFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        REFRENCES_IDENTIFIED:{
            propertyValueType: 'BOOLEAN',
            fieldType: 'referencesIdentified',
            label: getText('Type'), 
            className: 'ReferencesIdentifiedFilter',
            operators:['EQ','NE']
        }, 
        CATEGORIES:{
            propertyValueType: 'STRING',
            fieldType: 'categories',
            label: getText('Category'), 
            className: 'CategoriesFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        CATEGORIES_FULLPATH:{
            propertyValueType: 'STRING',
            fieldType: 'categoriesFullPath',
            label: getText('Category (Full path)'), 
            className: 'CategoriesFullPathFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        PROFILES:{
            propertyValueType: 'STRING',
            fieldType: 'profiles',
            label: getText('Profile'), 
            className: 'ProfilesFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        VALUE_IS_FILLED:{
            propertyValueType: 'STRING',
            fieldType: 'valueisfilled',
            label: getText('Null'), 
            className: 'ValueIsFilled',
            operators:[]
        },
        ALERT_LEVEL: {
            propertyValueType: 'STRING',
            fieldType: 'alertLevel',
            label: getText('Alert level'), 
            className: 'AlertLevelFilter',
            operators: ['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']  // OLD TO CHECK WITH MARIE: ['EQ', 'NE', 'GT', 'LT']
        },
        ALERT_NAME: {
            propertyValueType: 'STRING',
            fieldType: 'alertName',
            label: getText('Alert'), 
            className: 'AlertNameFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE','CONTAINS','STARTSWITH','ENDSWITH']
        },
        ENUM: {
            propertyValueType: 'ENUM', 
            fieldType: 'enum',
            label: getText('Text field'), 
            className: 'EnumFilter',
            operators:['IS_NULL','IS_NOT_NULL', 'CONTAINS', 'EQ','NE','STARTSWITH','ENDSWITH']
        },
        CODE: {
            propertyValueType: 'STRING', 
            fieldType: 'code',
            label: getText('Code'), 
            className: 'CodeFilter',
            operators:['IS_NULL','IS_NOT_NULL', 'CONTAINS', 'EQ','NE','STARTSWITH','ENDSWITH']
        },
        DEVICE_TYPE: {
            propertyValueType: 'STRING',
            fieldType: 'deviceType',
            label: getText('Type'), 
            className: 'DeviceTypeFilter',
            operators:['IS_NULL','IS_NOT_NULL','EQ','NE']
        },

        
        FILTER_COMPARISON: {
            IS_NULL: getText('Is empty'), 
            IS_NOT_NULL: getText('Is not empty'),
            GT: getText('Greater than'), 
            LT: getText('Lower than'), 
            EQ: getText('Equals'), 
            NE: getText('Different'), 
            IN: getText('Into'),
            CONTAINS: getText('Contains'), 
            STARTSWITH: getText('Starts with'),
            ENDSWITH: getText('Ends with'),
            FROM_TO: getText('From...To')
        }
    }
    
});