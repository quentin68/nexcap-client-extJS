/* global Ext  */

Ext.define('Dashboard.view.system.dynamicProperties.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'dynamicPropertiesDetail',

    initComponent: function () {
        
        this.configDetail();

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '{label}'
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                }, {
                    title: getText('Property'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-asterisk'
                }, {
                    title: getText('Alerts'),
                    reference: 'alerts',
                    iconCls: 'fa fa-exclamation-triangle"',
                    hidden: true
                }, {
                    title: getText('Checks'),
                    reference: 'checks',
                    iconCls: 'fa fa-cog',
                    hidden: true
                }, {
                    title: getText('Statistics'),
                    reference: 'statistics',
                    iconCls: 'fa fa-area-chart',
                    hidden: true
                }
            ]
        });
        this.callParent(arguments);
    },

    setData: function (data) {
        if (!data) {
            return;
        }
        this.viewModel.setData(data);

        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();

        var checksPanel = this.query('panel[reference=checks]')[0];
        checksPanel.removeAll();

        var statisticsPanel = this.query('panel[reference=statistics]')[0];
        statisticsPanel.removeAll();

        // Classic properties
        characteristicsPanel.add(this.buildField({
            name: getText('Name'),
            value: data.name
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Valorisation'),
            value: data.propertyConfigurationType
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Type'),
            value: data.type
        }));
        
        var originValue = data.origin;
        if(!originValue){
            originValue = getText('Not any', 'selectOrigin'); //feminine
        }
        
        characteristicsPanel.add(this.buildField({
            name: getText('Origin'), 
            value: originValue
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Owner'),
            value: data.owner
        }));
        
        

        Dashboard.manager.system.DynamicPropertiesManager.getLinkedObject(data.name, this, 'displayLinkedObject');
    },

    clean: function () {
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();

        var checksPanel = this.query('panel[reference=checks]')[0];
        checksPanel.removeAll();

        var statisticsPanel = this.query('panel[reference=statistics]')[0];
        statisticsPanel.removeAll();
    },

    displayLinkedObject: function (model) {
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();

        var checksPanel = this.query('panel[reference=checks]')[0];
        checksPanel.removeAll();

        var statisticsPanel = this.query('panel[reference=statistics]')[0];
        statisticsPanel.removeAll();

        if (model.productCategory) {
            var path = '';
            if (model.productCategory.path) {
                path = model.productCategory.path + '/';
            }
            characteristicsPanel.add(this.buildField({
                name: getText('Category'),
                value: path + model.productCategory.fullPath
            }));
        }

        if (model.productReference) {
            characteristicsPanel.add(this.buildField({
                name: getText('Product reference'),
                value: model.productReference.designation
            }));
        }
        
        if (model.controls.length === 0) {
            alertsPanel.hide();
        } else {
            alertsPanel.show();
            for (var i = 0; i < model.controls.length; i++) {
                var index = i + 1;
                alertsPanel.add(this.buildField({
                    name: '[' + index + ']',
                    value: model.controls[i].name
                }));
            }
        }

        if (model.specificCheckConfigurations.length === 0) {
            checksPanel.hide();
        } else {
            checksPanel.show();
            for (var i = 0; i < model.specificCheckConfigurations.length; i++) {
                var index = i + 1;
                checksPanel.add(this.buildField({
                    name: '[' + index + ']',
                    value: model.specificCheckConfigurations[i].name
                }));
            }
        }

        if (model.statistics.length === 0) {
            statisticsPanel.hide();
        } else {
            statisticsPanel.show();
            for (var i = 0; i < model.statistics.length; i++) {
                var index = i + 1;
                statisticsPanel.add(this.buildField({
                    name: '[' + index + ']',
                    value: '<b>' + model.statistics[i].shortDescription + '</b> (' + model.statistics[i].name + ')'
                }));
            }
        }
    }
});