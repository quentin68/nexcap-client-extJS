Ext.define('Dashboard.store.enums.Sizes', {
    extend: 'Ext.data.Store',
    
    fields: ['name', 'label', 'percent'],
    
    data: [
        {name:'S', label: getText('Small'), percent: '20%'},
        {name:'M', label: getText('Medium'), percent: '40%'},
        {name:'L', label: getText('Large'), percent: '60%'},
        {name:'XL', label: getText('Extra large'), percent: '90%'}
    ]
});