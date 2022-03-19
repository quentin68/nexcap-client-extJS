Ext.define('Dashboard.view.settings.notifMailConfig.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.notifMailConfigViewModel',

    requires: [
        'Dashboard.model.settings.NotifMailConfig'
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
            type: 'notifMailConfig',
            autoLoad: true,
            sorters: [
//                { property: 'alertLevel', direction: 'DESC' }
            ]
        }
    }
});
