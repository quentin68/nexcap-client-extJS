Ext.define('Dashboard.view.settings.specificCheckConfig.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.specificCheckConfigViewModel',

    requires: [
        'Dashboard.model.settings.SpecificCheckConfig'
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
            type: 'specificCheckConfig',
            autoLoad: true,
            sorters: [  ]
        }
    }
});
