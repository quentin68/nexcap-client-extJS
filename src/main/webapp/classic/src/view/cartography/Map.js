Ext.define('Dashboard.view.cartography.Map', {
    extend: 'Ext.panel.Panel',
    xtype: 'cartographyMap',
    tag: 'mapDetail',
    id: 'mapDetail',
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.cartography.MapController'
    ],

    controller: 'cartographyMap',
    mainController: null,
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.administration.MaterialManager.getProperties(),

    border: false,
    heigth: '100%',
    layout: 'border',

    listeners: {
        boxready: 'onRenderMap'
    },

    defaults: {
        heigth: '100%',
        width: '100%'
    },

    record: null,

    initComponent: function () {
        this.getController().feature = this.feature;

        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                reference: 'body',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'panel',
                        id: 'demoDetailMap',
                        html: '<div id="demoMapWrapper" style="display: block; width:100%; height:100%;"><div class="map-container" id="demoMapcontainer"></div></div>',
                        flex: 1
                    }
                ]
            }
        ];

        this.callParent(arguments);
    },

    setData: function (data) {
        this.record = data;
    }
});