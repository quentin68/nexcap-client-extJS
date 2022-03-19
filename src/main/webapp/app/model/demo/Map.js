Ext.define('Dashboard.model.demo.Map', {
    extend: 'Dashboard.model.Base',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],

    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'thumbnailSrc',
            type: 'string'
        }, {
            name: 'imageSrc',
            type: 'string'
        }
    ]
});   