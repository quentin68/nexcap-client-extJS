Ext.define('Dashboard.view.system.context.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'contextMain',
    tag: 'main',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.system.context.ViewModel',
        'Dashboard.view.system.context.MainController'
    ],

    controller: 'contextMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.system.ContextManager.getProperties(),

    iconCls: 'fa fa-sitemap',
    border: false,
    heigth: '100%',
    layout: 'border',

    listeners: {
        render: 'onRenderMain'
    },

    defaults: {
        heigth: '100%'
    },

    initComponent: function () {
        this.title = getText('Context management');

        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                reference: 'body',
                layout: 'border',
                collapsible: false,
                items: [
                    {
                        xtype: 'viewList',
                        region: 'center',
                        reference: 'mainListContainer',
                        collapsible: false,
                        flex: 1,
                        configuration: this.configuration,
                        store: this.store,
                        mainView: this,
                        modelProperties: this.modelProperties
                    }, {
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        items: {
                            xtype: 'contextDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});