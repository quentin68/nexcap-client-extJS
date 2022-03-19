
Ext.define('Dashboard.store.StatisticFilters', {
    extend: 'Ext.data.Store',
    
    fields: ['name', 'label'],
    
    data: [
        {name:'START_DATE', label: getText('Start date')},
        {name:'END_DATE', label: getText('End date')},
        {name:'PERIOD', label: getText('Period')},
        {name:'ADDRESS', label: getText('Address')},
        {name:'LOCATION_ID', label: getText('Address')},
        {name:'MATERIAL', label: getText('Address')},
        {name:'REFERENCE', label: getText('Référence')},
        {name:'CATEGORY', label: getText('Category')},
        {name:'DEVICE', label: getText('Device')},
        {name:'LIMIT', label: getText('Limit')},
        {name:'SORTED', label: getText('Sorted')},
        {name:'SENSOR', label: getText('Sensor')}
    ]
});