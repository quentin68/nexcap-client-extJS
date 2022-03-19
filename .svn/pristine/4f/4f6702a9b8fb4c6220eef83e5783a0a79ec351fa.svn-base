Ext.define('Dashboard.view.administration.alerts.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'alertsMain',
    tag: 'main',

    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.settings.alertsConfig.ViewModel',
        'Dashboard.view.settings.alertsConfig.MainController'
    ],

    controller: 'alertsMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.settings.AlertsConfigManager.getProperties(),

    iconCls: 'fa fa-cog',
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

        this.title = getText('Alerts configuration');

        this.items = [

            {
                xtype: 'panel',
                region: 'center',
                reference: 'body',
                layout: 'border',
                collapsible: false,
                //titleCollapse: false,
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
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});