Ext.define('Dashboard.model.settings.FeaturesConfig', {
    extend: 'Dashboard.model.Base',
    
    fields: [
        {
            name: 'name',
            type: 'string'
        },{
            name: 'label',
            type: 'string'
        },{
            name: 'features',
            type: 'auto' //List of features
        }
    ]

});   