Ext.define('Dashboard.store.enums.Valorisation', {
    extend: 'Ext.data.Store',
    
    fields: [
        'name', 
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
        {
            'name': 'MATERIAL',
            'label': 'Items'
        }, {
            'name': 'PRODUCTREFERENCE',
            'label': 'References'
        }, {
            'name': 'USER',
            'label': 'Users'
        }, {
            'name': 'LOCATION',
            'label': 'Locations'
        }
    ]
});