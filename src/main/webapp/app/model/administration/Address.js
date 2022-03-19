Ext.define('Dashboard.model.Address', {
    extend: 'Ext.data.Model',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        }, {
            name: 'positionId', 
            type: 'int'
        }, {
            name: 'locationId', 
            type: 'int'
        }, {
            name: 'name', 
            type: 'string'
        }
    ]

});   