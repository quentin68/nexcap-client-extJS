Ext.define('Dashboard.view.administration.position.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.positionViewModel',

    requires: [
        'Dashboard.model.administration.Position'
    ],

    formulas: {
        typeFilter: function (get) {
            var category = get('category');
            return this.filters[category];
        }
    },

    filters: {
        all:   [ 'news', 'forum' ],
        news:  [ 'news' ],
        forum: [ 'forum' ]
    },

    stores: {
        viewListBinding: {
            type: 'positions',
            autoLoad: true//,
//            sorters: [
//                { property: 'date', direction: 'DESC' }
//            ]//,
//            filters: {
//                property: 'type',
//                operator: 'in',
//                value: '{typeFilter}'
//            }
        }
    }
});
