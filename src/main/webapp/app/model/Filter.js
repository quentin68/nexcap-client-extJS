Ext.define('Dashboard.model.Filter', {
    extend: 'Dashboard.model.Base',
    fields: [{
            name: 'name',
            type: 'string'
        }, {
            name: 'label',
            type: 'string'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'comparison',
            type: 'string'
        }, {
            name: 'configuration',
            type: 'auto'
        }, {
            name: 'property',
            type: 'auto'
        }]

});