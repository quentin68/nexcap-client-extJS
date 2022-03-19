Ext.define('Dashboard.model.settings.SpecificCheckParagraphConfig', {
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
            name: 'type',
            type: 'string'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'max',
            type: 'int'
        },
        {
            name: 'controls',
            type: 'auto'
        }
    ]

});   