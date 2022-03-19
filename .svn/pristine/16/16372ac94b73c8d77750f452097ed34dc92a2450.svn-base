Ext.define('Dashboard.view.historic.provision.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.provisionViewModel',

    requires: [
        'Dashboard.model.historic.Provision'
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
            type: 'provisions',
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
