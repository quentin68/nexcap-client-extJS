Ext.define('Dashboard.store.enums.OrganizationType', {
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
            'name': 'PRODUCT_CATEGORY',
            'label': 'Categories'
        }, {
            'name': 'PRODUCT_REFERENCE',
            'label': 'References'
        }
    ]
});