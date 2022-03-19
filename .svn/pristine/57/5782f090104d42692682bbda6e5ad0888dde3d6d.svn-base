/* global Ext  */

Ext.define('Dashboard.view.system.about.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'aboutMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities'
    ],
  
    feature: null,
    iconCls : 'fa fa-info',
    border: false,
    heigth: '100%',
    autoScroll: true,
    scrollable:'y',
    ui: 'manage',
    bodyPadding: '20 0 0 30',
    
    informations: {},
    
    defaults:{
        heigth: '100%',
        ui: 'detail',
        bodyPadding: 20
    },
    
    initComponent: function() {  
        
        this.title = getText('About');
        this.informations = Dashboard.manager.system.AboutManager.getInformations();

        this.callParent(arguments);
    },
    
    buildUserGuideLink: function(path){
                
        var text = getText('Download user guide');
                
        var field = {
            html: '<a style="text-decoration: inherit; color: inherit;" href="' + path + '" target="_blank" >'+
                    '<i class="fa fa-book unsaturatedBlueIcon 20" aria-hidden="true" style="font-size: 20px;  margin-right: 12px; margin-bottom: 20px"></i>'+
                    '<span style="text-decoration: inherit; color: black; font-size: 14px;">' + text + '</span>'+
                '</a>'
        };

        return field;
    },
    
    setData: function(record){
        
        var data = record.data;
        
        var logoNexess = {
            xtype: 'image',
            src: 'resources/images/about/nexcapiot.png',
            height: 82,
            margin: '13 20 13 20',
            alt: 'Nexcap IOT logo',
            width: 190
        };
        

        var webClientVersion = '<b>' + data.webClientVersion + '</b>';
        var nexcapVersion = '<b>' + data.nexcapVersion + '</b>';
        var nexcapDatabaseVersion = '<b>' + data.nexcapDatabaseVersion + '</b>';
        var updates = '<b>' + '' + '</b>';
        var title = '<H2>' + 'PLATEFORME IoT NexCap®' + '</H2>';
        
        if(data.nexcapDescription === undefined){
            if(Dashboard.config.Config.LOCALE === 'fr_FR'){
                data.nexcapDescription = '<p>' + this.informations.ABOUT_RESUME_FR + '<p>';
            }else{
                data.nexcapDescription = '<p>' + this.informations.ABOUT_RESUME_EN + '<p>';
            }
        }
        
        if(data.nexcapUserManualUrl === undefined || data.nexcapUserManualUrl ===''){
            data.nexcapUserManualUrl = this.informations.USER_GUIDE_URL ;
        }
        
        var userGuide = this.buildUserGuideLink(data.nexcapUserManualUrl);
        
        var main = {
            xtype: 'panel',
            defaults: {
                border: false
            },
            items: [
                logoNexess,
                {
                    html: '<p>' + data.nexcapDescription + '<p>'
                }, {
                    html:  title
                }, {
                    html: getText('Server version') + getText(':') + ' ' + nexcapVersion
                },{
                    html: getText('Web client version') + getText(':') + ' ' + webClientVersion
                },{
                    html: getText('Data base version') + getText(':') + ' ' + nexcapDatabaseVersion
                }
            ]
        };
        
        
        var support = {
            xtype: 'panel',
            name: 'supportPanel',
            title: getText('Technical support'),
            iconCls: 'fa fa-life-ring redIcon',
            defaults: {
                xtype: 'displayfield',
                labelWidth: 90,
                width: "100%",
                labelSeparator: getText(':'),
                margin: 0,
                padding: 0
            },
            items:[
                {
                    fieldLabel: getText('Schedule'),
                    value: '<b>' + data.supportHours + '<b>'
                }, {
                    fieldLabel: getText('Phone'),
                    value: '<b>'+ data.supportPhone +'</b>'
                }, {
                    fieldLabel: getText('Mail'),
                    value: '<b>'+ data.supportMail +'</b>'
                }
            ]
        };
        
        
        var switchboard = {
            xtype: 'panel',
            name: 'switchboardPanel',
            title: getText('Switchboard'),
            iconCls: 'fa fa-handshake-o blueIcon',
            defaults: {
                xtype: 'displayfield',
                labelWidth: 90,
                width: "100%",
                labelSeparator: getText(':'),
                margin: 0,
                padding: 0
            },
            items:[
                {
                    fieldLabel: getText('Phone'),
                    value: '<b>'+ data.nexessPhone +'</b>'
                }, {
                    fieldLabel: getText('Mail'),
                    value: '<b>'+ data.nexessMail +'</b>'
                }
            ]
        };
        
        this.add(main);
        this.add(userGuide);
        this.add(support);
        this.add(switchboard);
        
    }
    
});