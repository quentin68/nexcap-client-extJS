Ext.define('Dashboard.view.administration.reference.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.referenceViewModel',

    requires: [
        'Dashboard.model.Reference'
    ],

//    formulas: {
//        typeFilter: function (get) {
//            var category = get('category');
//            return this.filters[category];
//        }
//    },
//
//    filters: {
//        all:   [ 'news', 'forum' ],
//        news:  [ 'news' ],
//        forum: [ 'forum' ]
//    },

    stores: {
        viewListBinding: {
            type: 'references',
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
