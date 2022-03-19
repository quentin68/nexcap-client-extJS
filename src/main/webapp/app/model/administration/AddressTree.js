
Ext.define('Dashboard.model.administration.AddressTree', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    fields: [
        {
            name: 'id', 
            type: 'auto'
        },{
            name: 'name', 
            type: 'string'
        },{
            name: 'code', 
            type: 'auto'
        },{
            name: 'positionId', 
            type: 'auto'
        },{
            name: 'locationId', 
            type: 'auto'
        },{
            name: 'picture',
            type: 'auto'
        },{
            name: 'children', 
            type: 'auto'
        },{
            name: 'leaf',
            value : false,
            convert: function(val,record) {
                if(record.data.positionId === 0){
                    return true;
                }
            }
        },{
            name: 'text',
            type : 'string',
            mapping: 'name',
            convert: function(val,record) {
                if(record.data.name){
                    return record.data.name;
                }
            }
        },{
            name: 'checked', 
            type: 'boolean',
            value : false
        }
    ]
});   