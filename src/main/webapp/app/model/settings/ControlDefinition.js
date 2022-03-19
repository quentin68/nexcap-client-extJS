Ext.define('Dashboard.model.settings.ControlDefinition', {
    extend: 'Dashboard.model.Base',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
    
    
    fields: [
        {
            name: 'id', 
            type: 'int'
        },{
            name: 'className',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name:'displayField',
            type:'string',
            convert: function(val,record) {
                return getText(val);
            }
        }
    ]

});   