Ext.define('Dashboard.view.consultation.items.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.itemsViewModel',

    requires: [
        'Dashboard.model.consultation.Item'
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
            type: 'items',
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
