Ext.define('Dashboard.view.companynews.NewsView', {
    extend: 'Ext.grid.Panel',
    xtype: 'newsView',
    itemId: 'news',
    id: 'images-view',
    cls: 'company-news-grid',

    requires: [
        'Ext.grid.plugin.RowExpander'
    ],

    config: {
        activeState: null,
        defaultActiveState: 'all'
    },

    controller: 'news',

    viewModel: {
        type: 'newsViewModel'
    },
    
    listeners: {
        render: 'onNewsClick'
    },

    hideHeaders: true,

    bind: '{newsBinding}',

//    tbar: [{
//        text: 'All Posts',
//        xtype: 'cycle',
//        reference: 'filterButton',
//        showText: true,
//        width: 150,
//        textAlign: 'left',
//
//        listeners: {
//            change: 'onNewsClick'
//        },
//
//        menu: {
//            id: 'news-menu',
//            items: [{
//                text: 'All Posts',
//                type: 'all',
//                itemId: 'all',
//                checked: true
//            },{
//                text: 'News',
//                type: 'news',
//                itemId: 'news'
//            },{
//                text: 'Forum',
//                type: 'forum',
//                itemId: 'forum'
//            }]
//        }
//    }],

    columns: [{
        dataIndex: 'title',
        flex: 1,
        renderer: 'renderTitleColumn'
    }],

    viewConfig: {
        listeners: {
            itemclick: 'onCompanyClick',
            expandbody: 'onCompanyExpandBody',
            collapsebody: 'onCompanyCollapseBody'
        }
    },

    plugins: [{
        ptype: 'ux-rowexpander',
        pluginId: 'rowexpander'
    }],
    
    initComponent: function() {
        
        this.titleTpl = this.getTemplate();

        this.callParent(arguments);

    },

    validStates: {
        all: 1,
        news: 1,
        forum: 1
    },

    isValidState: function (state) {
        return state in this.validStates;
    },
    
    
    getTemplate: function(){
        var tpl = '<div class="text-wrapper">' +
            '<div class="news-data">' +
                '<div class="news-picture"><img src="resources/icons/{thumbnailName}"></div>' +
                '<div class="news-content">' +
                
                '<div class="news-title">{name}' +
                    '<tpl switch="curState">'+
                        '<tpl case="Hors service">'+
                            '<span class="news-text-red">{curState}</span>'+
                        '<tpl case="A vérifier">'+
                            '<span class="news-text-orange">{curState}</span>'+
                        '<tpl default>'+
                            '<span class="news-text-green">{curState}</span>'+
                    '</tpl>'+
                ' </div>' +

                '<p class="text_ellipsis">' +
                    getText('Reference') + ' : <b>{productReferenceCode}</b><br/>' +
                    getText('Designation') + ' : {productReferenceDesignation}</br>' +
                    'Test : '+ this.getTest()  +
                '</p>'+
                    '<div class="news-paragraph news-paragraph-simple" {expanded}></div>' +
                    '<div class="news-toggle expand" {expanded}><span>expand</span>' +
                        '<img src="resources/icons/expand-news.png">'+
                    '</div>' +
                '</div>' +
            '</div>' +
        '<div>';
        
        return tpl;
    },
    
    getTest: function(){
        return 'test OK';
    }

    
});
