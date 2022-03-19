Ext.define('Dashboard.model.Right', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'id',
            type: 'int'
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'label',
            type: 'string'
        },{
            name: 'configuration',
            type: 'auto'
        },{
            name: 'features',
            type: 'auto'
        },{
            name: 'group',
            type: 'string'
        }
    ]

});   