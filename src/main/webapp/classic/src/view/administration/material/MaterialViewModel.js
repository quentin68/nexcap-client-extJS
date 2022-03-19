Ext.define('Dashboard.view.administration.material.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.materialViewModel',

    requires: [
        'Dashboard.model.Material'
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
            type: 'materials',
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
