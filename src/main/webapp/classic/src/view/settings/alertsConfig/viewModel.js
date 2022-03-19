Ext.define('Dashboard.view.settings.alertsConfig.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.alertsConfigViewModel',

    requires: [
      'Dashboard.model.alerts.AlertsConfiguration' //old: 'Dashboard.model.settings.AlertsConfig'
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
            type: 'alertsConfig',
            autoLoad: true
        }
    }
});
