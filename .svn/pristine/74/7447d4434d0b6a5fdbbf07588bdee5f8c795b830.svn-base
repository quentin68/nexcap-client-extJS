Ext.define('Dashboard.view.administration.telemetryData.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.telemetryDataViewModel',

    requires: [
        'Dashboard.model.administration.TelemetryData'
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
            type: 'telemetryData',
            autoLoad: true,
            sorters: [
                { property: 'id', direction: 'DESC' }
            ]
        }
    }
});
