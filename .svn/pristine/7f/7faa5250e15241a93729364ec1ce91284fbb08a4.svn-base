Ext.define('Dashboard.view.administration.profile.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'profileMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.administration.profile.Detail',
        'Dashboard.view.administration.profile.ViewModel',
        'Dashboard.view.administration.profile.MainController'
    ],
    
    controller: 'profileMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.administration.ProfilesManager.getProperties(),
    
    iconCls : 'fa fa-check',
    border: false,
    heigth: '100%',
    layout: 'border',
    
    listeners:{
        render: 'onRenderMain'
    },
    
    
    defaults:{
        heigth: '100%'
    },
    

    initComponent: function() {

        this.title = getText('Profiles administration');
            
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
                    },{
                        xtype: 'panel',
                        region: 'east',
                        reference: 'detailContainer',
                        flex: 1,
                        layout: 'fit',
                        split: true,
                        collapsible: false,
                        items: {
                            xtype: 'profileDetail'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});