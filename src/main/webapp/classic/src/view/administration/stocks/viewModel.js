Ext.define('Dashboard.view.administration.stocks.ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.stocksViewModel',

    requires: [
        'Dashboard.model.administration.Stocks'
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
            type: 'stocks',
            autoLoad: true,
            sorters: [
                { property: 'id', direction: 'DESC' }
            ]
        }
    }
});
