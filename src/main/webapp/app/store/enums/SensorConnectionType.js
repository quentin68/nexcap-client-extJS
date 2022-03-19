Ext.define('Dashboard.store.enums.SensorConnectionType', {
    extend: 'Ext.data.Store',
    
    fields: [
        'value', 
        'label',
        {
            name: 'localizedLabel',
            type: 'string',
            convert: function(val, record){
                if(record.data.label){
                    
                    if(record.data.label === 'Not any'){
                        return getText(record.data.label, 'masculine');
                    }
                    
                    return getText(record.data.label);
                }
            }
        }
    ],
    
    data: [
        {
            'name': 'NONE',
            'label': 'Not any'
        }, {
            'name': 'MQTT',
            'label': 'MQTT'
        }, {
            'name': 'RESTAPI',
            'label': 'REST API'
        }
    ]
});