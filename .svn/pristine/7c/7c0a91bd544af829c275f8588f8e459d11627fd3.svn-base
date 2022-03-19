Ext.define('Dashboard.view.administration.profile.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'profileDetail',

    initComponent: function () {
        
        this.configDetail();
        
        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}'
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                            //cls: 'view-list-title'

                }, {
                    title: getText('Characteristics'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Features'),
                    reference: 'features',
                    iconCls: 'fa fa-check',
                    bodyStyle: 'background-color:#ffffff; padding: 5px',
                    autoScroll: true,
                    defaults: {
                        anchor: '100%'
                    }
                }
            ]

        });

        this.callParent(arguments);
    },

    buildGroupField: function (label, reference) {
        return {
            xtype: 'panel',
            margin: '20 0 0 0',
            name: 'groupPanel',
            items: [
                {
                    xtype: 'label',
                    anchor: '100%',
                    margin: '3 6 0 6',
                    html: '<b>' + getText(label) + '</b>',
                    name: 'detail' + reference,
                    scope: this
                }, {
                    xtype: 'panel',
                    bodyPadding: '0 0 0 30',
                    name: 'detail' + reference
                }
            ]
        };
    },

    /**
     * 
     * @param {type} availableRights
     * @param {type} localfeature
     * @returns {isFound: Bool, label: String | null}
     */
    isInRightsList: function (availableRights, localfeature) {
        for (var k = 0; k < availableRights.length; k++) {
            var remoteRight = availableRights[k];
            if (localfeature === remoteRight.name) {
                return {isFound: true, label: remoteRight.translatedName};
            }
        }
        return {isFound: false, label: null};
    },

    filterRights: function (localRights) {
        var parentScope = this;
        
        var filteredRights = [];

        Ext.Ajax.request({
            url: Dashboard.config.Config.SERVER_HOST_NAME + '/features/available',
            cors: true,
            useDefaultXhrHeader: false,
            withCredentials: true,
            
            method: 'GET',
            success: function (response, opts) {
                                
                var responseObj = JSON.parse(response.responseText);
                if (responseObj.success) {
                    var availableRights = responseObj.data;

                    // Go over local rights
                    for (var i = 0; i < localRights.length; i++) {
                        // Is local feature in Remote available Rights list ?
                        var foundRight = parentScope.isInRightsList(availableRights, localRights[i].data.name);
                        if (foundRight.isFound) {
                            
                            if(foundRight.label !== ''){
                                localRights[i].data.label = foundRight.label;
                            }else{
                                localRights[i].data.label = getText(localRights[i].data.label);
                            }
                            
                            filteredRights.push(localRights[i]);
                        }
                        
                    }
                    parentScope.setRightsSelector(filteredRights);
                } else {
                    throw '[Profile.Create.getUserfilterRightsContexts] ERROR ' + (responseObj.error || 'null');
                }
            }, failure: function (response, opts) {
                Dashboard.engine.ResponseManager.showFailure(getText('Failed loading available features'));
            }
        });
    },

    setRightsSelector: function (rightsList) {
        var panelAlerts = this.query('panel[name="detailALERTS"]')[0];
        var panelOperation = this.query('panel[name="detailBUSINESS"]')[0];
        var panelConsultation = this.query('panel[name="detailCONSULTATION"]')[0];
        var panelHistoric = this.query('panel[name="detailHISTORIC"]')[0];
        var panelAdmin = this.query('panel[name="detailMANAGEMENT"]')[0];
        var panelCartography = this.query('panel[name="detailCARTOGRAPHY"]')[0];
        var panelSystem = this.query('panel[name="detailSYSTEM"]')[0];
        var panelConfiguration = this.query('panel[name="detailCONFIGURATION"]')[0];
        var panelDashboard = this.query('panel[name="detailDASHBOARD"]')[0];

        panelAlerts.removeAll();
        panelOperation.removeAll();
        panelConsultation.removeAll();
        panelHistoric.removeAll();
        panelAdmin.removeAll();
        panelSystem.removeAll();
        panelConfiguration.removeAll();
        panelDashboard.removeAll();
        panelCartography.removeAll();

        if (!rightsList) {
            return false;
        }

        this.hideUnusedGroups(rightsList);

        for (var i = 0; i < rightsList.length; i++) {
            this.addRight(i, rightsList[i]);
        }

    },

    hideUnusedGroups: function (rightsList) {
        var groups = {
            DASHBOARD: 0,
            CONFIGURATION: 0,
            SYSTEM: 0,
            MANAGEMENT: 0,
            HISTORIC: 0,
            CONSULTATION: 0,
            BUSINESS: 0,
            ALERTS: 0,
            CARTOGRAPHY: 0
        };

        for (var i = 0; i < rightsList.length; i++) {
            groups[rightsList[i].data.group]++;
        }

        for (var key in groups) {
            if (groups.hasOwnProperty(key)) {
                if (groups[key] === 0) {
                    var panel = this.query('panel[name="detail' + key + '"]')[0];
                    var parentPanel = panel.up('panel');
                    parentPanel.hide();
                }
            }
        }
    },

    addRight: function (index, localRight) {
        var panel = this.query('panel[name="detail' + localRight.data.group + '"]')[0];

        var feature = Dashboard.manager.FeaturesManager.getFeatureByName(localRight.data.name);
        var right = Dashboard.manager.FeaturesManager.getRightByName(localRight.data.name);
        
        if (feature === null || right === null) {
            return;
        }

        var add = true;
        if (right.data.hiddenInProfiles) {
            add = false;
        }

        if (feature && feature.data.enabled && add) {
            panel.add(this.buildRightField(localRight));
        }
    },

    buildRightField: function (right) {
        return {
            xtype: 'label',
            margin: '3 6 0 6',
            html: '- ' + right.data.label + '<br>'
        };
    },

    // buildField: function (characteristic) {
    //     return {
    //         xtype: 'label',
    //         text: characteristic.name + ' : ' + characteristic.value
    //     };
    // },

    setData: function (data) {
        if (!data) {
            return;
        }

        this.viewModel.setData(data);

        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({
            name:  getText('Description'),
            value: data.description
        }));
        characteristicsPanel.add(this.buildField({
            name:  getText('Level'),
            value: data.level
        }));

        // Dynamic properties
        var featuresPanel = this.query('panel[reference=features]')[0];
        featuresPanel.removeAll();

        // Add default groups 
        featuresPanel.add(this.buildGroupField('DASHBOARD', 'DASHBOARD'));
        featuresPanel.add(this.buildGroupField('ALERTS', 'ALERTS'));
        featuresPanel.add(this.buildGroupField('BUSINESS', 'BUSINESS'));
        featuresPanel.add(this.buildGroupField('CONSULTATION', 'CONSULTATION'));
        featuresPanel.add(this.buildGroupField('HISTORIC', 'HISTORIC'));
        featuresPanel.add(this.buildGroupField('MANAGEMENT', 'MANAGEMENT'));
        featuresPanel.add(this.buildGroupField('CARTOGRAPHY', 'CARTOGRAPHY'));
        featuresPanel.add(this.buildGroupField('SYSTEM', 'SYSTEM'));
        featuresPanel.add(this.buildGroupField('SETTINGS', 'CONFIGURATION'));

        this.rightsStore = Ext.create('Dashboard.store.Rights');
        var allLocalRights = this.rightsStore.data.items;
        
        allLocalRights.forEach(function (localRight) {
            for (var i = 0; i < data.features.length; i++) {
                if (data.features[i].id === localRight.data.id) {
                    data.features[i].group = localRight.data.group;
                    
                    if(data.features[i].translatedName === ''){
                        data.features[i].translatedName = localRight.data.label;
                    }
                    
                }
            }
        });

        var userRights = [];
        data.features.forEach(function (localRight) {
            
            userRights.push({
                id: localRight.id,
                data: {
                    id: localRight.id,
                    name: localRight.name,
                    label: localRight.translatedName,
                    group: localRight.group
                }
            });
        });

        this.filterRights(userRights);
    }
});