Ext.define('Dashboard.store.enums.PropertyOriginType', {
    extend: 'Ext.data.Store',
    
    fields: [
        'value', 
        'label',
        {
            name: 'localizedLabel',
            type: 'string',
            convert: function(val, record){
                if(record.data.label){
                    return getText(record.data.label);
                }
            }
        }
    ],
    
    data: [
        {value:'NONE', label: 'Data input'},
        {value:'TELEMETRY', label: 'Telemetry'},
        {value:'COMPUTED', label: 'Computed'}
    ]
});