Ext.define('Dashboard.view.historic.consumption.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'consumptionDetail',
    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        Ext.apply( me, {
                        
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{sticker}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                    //cls: 'detail-title'
                    //cls: 'view-list-title'

                },
//                {
//                    layout: 'center',
//                    items:[
//                       {
//                            xtype: 'image',
//                            height: 400,
//                            cls: 'img',
//                            bind: {
//                                src: '{imageSrc}',//'resources/icons/{thumbnailName}' 
//                                alt: '{imageSrc}'
//                            }
//                        }
//                    ]
//                    
//                },
                {
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
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.viewModel.setData(data);
        
        //var model = this.config.configuration;
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: 'Identity', value: data.sticker}));
        characteristicsPanel.add(this.buildField({name: 'Firstname', value: data.firstname}));
        characteristicsPanel.add(this.buildField({name: 'Lastname', value: data.lastname}));
        characteristicsPanel.add(this.buildField({name: 'Badge number', value: data.badgeNumber}));
        characteristicsPanel.add(this.buildField({name: 'Activated', value: data.activated}));
        
        var contactPanel = this.query('panel[reference=contact]')[0];
        contactPanel.removeAll();
        contactPanel.add(this.buildField({name: 'Email', value: data.email}));
        
        var profilsPanel = this.query('panel[reference=profiles]')[0];
        profilsPanel.removeAll();
        for(var i=0; i<data.profiles.length; i++){
            profilsPanel.add(this.buildField({name: 'Profile ' + (i+1), value: data.profiles[i].name}));
        }
        
        var requirementsPanel = this.query('panel[reference=requirements]')[0];
        requirementsPanel.removeAll();
        for(var i=0; i<data.requirementsNameList.length; i++){
            requirementsPanel.add(this.buildField({name: 'Requirement '+ (i+1), value: data.requirementsNameList[i]}));
        }
        
        var locationsPanel = this.query('panel[reference=locations]')[0];
        locationsPanel.removeAll();
        for(var i=0; i<data.authorizedLocationIdList.length; i++){
            locationsPanel.add(this.buildField({name: 'Location '+ (i+1), value: data.authorizedLocationIdList[i]}));
        }
        

        // Dynamic properties
        var properties = data.properties;
        
        if(!properties){
            Dashboard.tool.Utilities.error('[user.Detail.setData] properties null or empty !');
            return;
        }
        for(var i = 0; i < properties.length; i++){
            var characteristicFields = this.buildField(properties[i]);
            characteristicsPanel.add(characteristicFields);
        }      
        

    }
    
});