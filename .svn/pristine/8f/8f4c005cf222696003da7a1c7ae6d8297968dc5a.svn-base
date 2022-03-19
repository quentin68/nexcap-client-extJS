/* global Ext  */

Ext.define('Dashboard.view.administration.user.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'userDetail',
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
            
            items: [
                 {
                    reference: 'sticker',
                    xtype: 'displayfield',
                    bind: {
                        value: '{sticker}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                    //cls: 'detail-title'
                    //cls: 'view-list-title'

                },{
                    xtype: 'image',
                    reference: 'thumbnail',
                    width: this.getImageSize() ? this.getImageSize() : '90%',
                    margin: '0 24 12 24'
                },{
                    title: getText('Characteristics'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                },{
                    title: getText('Contact'),
                    reference: 'contact',
                    iconCls: 'fa fa-envelope-o'
                },{
                    title: getText('Profiles'),
                    reference: 'profiles',
                    iconCls: 'fa fa-check'
                },{
                    title: getText('Allowed locations'),
                    reference: 'locations',
                    iconCls: 'fa fa-map-marker'
                },{
                    title: getText('Requirements'),
                    reference: 'requirements',
                    iconCls: 'fa fa-bolt'
                },{
                    title: getText('Contexts'),
                    reference: 'contexts',
                    iconCls: 'fa fa-sitemap'
                }, {
                    title: getText('Alerts'),
                    reference: 'alerts',
                    iconCls: 'x-fa fa-exclamation-triangle'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    
    clean : function() {
        
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        
        var profilsPanel = this.query('panel[reference=profiles]')[0];
        profilsPanel.removeAll();
        
        var requirementsPanel = this.query('panel[reference=requirements]')[0];
        requirementsPanel.removeAll();
        
        var locationsPanel = this.query('panel[reference=locations]')[0];
        locationsPanel.removeAll();

        var contextPanel = this.query('panel[reference=contexts]')[0];
        contextPanel.removeAll();

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();
    },
    
    
    setData: function(data){
        
        if (!data) {
            return;
        }
        this.record = data;
        
        this.viewModel.setData(data);
        
        var imgSrc = data.imageSrc;
        
        Ext.Ajax.request({
            scope:this,
            binary: true,  //set binary to true
            url: imgSrc,
            success: function(response) {

                var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                url = window.URL.createObjectURL(blob);

                var thumbnail = this.down('image[reference=thumbnail]');
                thumbnail.setSrc(url);
                thumbnail.setAlt('thumbnail');
            }
        });

        //var model = this.config.configuration;

        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: getText('Identity'), value: data.sticker}));
        
        if (data.technical) {
            var imagePanel = this.query('panel[reference=image]')[0];
            imagePanel.hide();
            var sticker = this.down('displayfield[reference=sticker]');
            sticker.setValue('<i class="fa fa-cog" aria-hidden="true"></i> ' + data.sticker);
        } else {
            characteristicsPanel.add(this.buildField({name: getText('Firstname'), value: data.firstName}));
            characteristicsPanel.add(this.buildField({name: getText('Lastname'), value: data.lastName}));
            characteristicsPanel.add(this.buildField({name: getText('Badge number'), value: data.badgeNumber}));
        }
        
        //characteristicsPanel.add(this.buildField({name: getText('Code Pin'), value: data.pin}));
        
        characteristicsPanel.add(this.buildField({name: getText('Activated'), value: data.activated}));

        var contactPanel = this.query('panel[reference=contact]')[0];
        contactPanel.removeAll();
        contactPanel.add(this.buildField({name: getText('Email'), value: data.email}));

        var profilsPanel = this.query('panel[reference=profiles]')[0];
        profilsPanel.removeAll();
        for (var i = 0; i < data.profiles.length; i++) {
            profilsPanel.add(this.buildField({name: getText('Profile ') + (i + 1), value: data.profiles[i].name}));
        }

        var contextPanel = this.query('panel[reference=contexts]')[0];
        contextPanel.removeAll();
        for (var i = 0; i < data.contexts.length; i++) {
            contextPanel.add(this.buildField({name: getText('Context ') + (i + 1), value: data.contexts[i].name}));
        }

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();

        for (var i = 0; i < data.alerts.length; i++) {
            alertsPanel.add(this.buildField({
                name: getText('Warning'),
                value: data.alerts[i].alertConfiguration.name
            }));
        }

        var requirementsPanel = this.query('panel[reference=requirements]')[0];
        requirementsPanel.removeAll();
        for (var i = 0; i < data.requirementsNameList.length; i++) {
            requirementsPanel.add(this.buildField({name: getText('Requirement ') + (i + 1), value: data.requirementsNameList[i]}));
        }

        var locationsPanel = this.query('panel[reference=locations]')[0];
        locationsPanel.removeAll();

        for (var i = 0; i < data.authorizedLocations.length; i++) {
            locationsPanel.add(this.buildField({name: '' + (i + 1), value: data.authorizedLocations[i].address}));
        }

        // Dynamic properties
        var properties = data.properties;

        if (!properties) {
            Dashboard.tool.Utilities.error('[user.Detail.setData] properties null or empty !');
            return;
        }
        for (var i = 0; i < properties.length; i++) {
            var isDisplayed = true;
                        
            try {
                
                var property = Ext.create('Dashboard.model.PropertyConfiguration', properties[i].configuration);
                property.value = properties[i].value;
                
                var characteristicFields = null;
                var control = Dashboard.model.PropertyConfiguration.getControl(property);
                if (control !== undefined) {
                    var configuration = control.configuration;
                    if (configuration && configuration.enabledInDetails !== undefined) {
                        if (configuration.enabledInDetails === true) {
                            characteristicFields = this.buildField(property);
                            characteristicsPanel.add(characteristicFields);
                        }
                    } else {
                        characteristicFields = this.buildField(property);
                        characteristicsPanel.add(characteristicFields);
                    }
                }
                
//                if (property.data.options.nexcapweb) {
//                    var conf = JSON.parse(property.data.options.nexcapweb);
//                    if (conf.configuration) {
//                        isDisplayed = conf.configuration.enabledInDetails;
//                    }
//                }
//                if (isDisplayed) {
//                    var characteristicFields = this.buildField(property);
//                    characteristicsPanel.add(characteristicFields);
//                }
            } catch (ex) {
                Dashboard.tool.Utilities.error('[user.Detail.setData] error :' + ex);
            }
            
        }
    }
});