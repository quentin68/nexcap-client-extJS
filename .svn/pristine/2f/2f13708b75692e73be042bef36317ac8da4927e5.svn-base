Ext.define('Dashboard.view.system.dynamicProperties.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'dynamicPropertiesMain',
    tag: 'main',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList'
    ],

    controller: 'dynamicPropertiesMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.system.DynamicPropertiesManager.getProperties(),

    iconCls: 'fa fa-asterisk',
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

        this.getController().feature = this.feature;

        this.title = getText('Dynamic properties administration');

        var filtersPanel = {
            xtype: Ext.create('Dashboard.view.shared.filtering.FiltersBar', {
                store: this.store,
                parentView: this,
                modelProperties: this.modelProperties,
                filtersList: this.getController().getFilters(),
                region: 'north'
            })
        };

        this.items = [
            filtersPanel,
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
                        flex: 2,
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
                            xtype: 'dynamicPropertiesDetail'
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});