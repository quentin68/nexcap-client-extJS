Ext.define('Dashboard.view.system.sensor.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sensorViewModel',

    requires: [
        'Dashboard.model.system.Sensor'
    ],

    formulas: {
        
    },

    filters: {
        all:   [ 'news', 'forum' ],
        news:  [ 'news' ],
        forum: [ 'forum' ]
    },

    stores: {
        viewListBinding: {
            type: 'sensors',
            autoLoad: true,
            sorters: [
                { property: 'id', direction: 'DESC' }
            ]
        }
    }
});
