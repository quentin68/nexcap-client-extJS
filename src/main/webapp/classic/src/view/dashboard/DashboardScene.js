/* global Ext */

Ext.define('Dashboard.view.dashboard.DashboardScene',{
    extend: 'Ext.dashboard.Dashboard',
    xtype: 'dashboardScene',
    
    controller: 'dashboardScene',
    ui: 'dashboard-scene',
    autoScroll: true,
    scrollable:'y',
    border: false,
    layout: 'column',
    
    header : {
        height : 48
    },
    
    config: {
        title :'Untitle Dashboard',
        serverId: null,
        authorName: null,
        creationDate: null,
        record: null
    },
    
     initComponent: function() {
        
        var me = this;
        Ext.apply( me, {

                tools: [
                    {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'fa fa-refresh',
                        ui: 'dashboard-scene',
                        //hidden: false,
                        border: false,
                        enableToggle: false,
                        action: 'refreshDashboard',
                        //flag: 'editionMode',
                        handler: 'onRefreshDashboard',
                        plugins: 'responsive',
                        platformConfig: {
                            desktop: {
                               hidden: false
                            },
                            '!desktop': {
                               hidden: true
                            }
                        }
                    }, {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'fa fa-pencil',
                        ui: 'dashboard-scene',
                        hidden: false,
                        border: false,
                        enableToggle: false,
                        action: 'editDashboard',
                        flag: 'editionMode',
                        handler: 'onEditDashboard',
                        plugins: 'responsive',
                        platformConfig: {
                            desktop: {
                               hidden: false
                            },
                            '!desktop': {
                               hidden: true
                            }
                        }
                    }, {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'fa fa-minus-circle',
                        ui: 'dashboard-scene',
                        hidden: false,
                        border: false,
                        enableToggle: false,
                        action: 'deleteDashboard',
                        flag: 'editionMode',
                        handler: 'onDeleteDashboard',
                        plugins: 'responsive',
                        platformConfig: {
                            desktop: {
                               hidden: false
                            },
                            '!desktop': {
                               hidden: true
                            }
                        }
                    }
                ],
                
                items : [ 
                ]        
            });

        this.callParent(arguments);
        
    },
    
    
    showEditionButtons: function(){
        
        var buttonsList = this.query('button[flag=editionMode]');
        
        Ext.each(buttonsList, function(button){
            button.setVisible(true);
        });    

    },
    
    hideEditionButtons: function(){
        
        var buttonsList = this.query('button[flag=editionMode]');
        
        Ext.each(buttonsList, function(button){
            button.setVisible(false);
        });
        
    },
    
    
    /**
     * Fill fields
     * @param {model.Dashboard} model
     * @returns {undefined}
     */
    setData: function(model){
        
        this.setTitle(model.data.title);
        this.setServerId(model.data.id);
        this.setAuthorName(model.data.authorname);
        this.setCreationDate(model.data.creationDate);
        
        this.setRecord(model.data);
        
        var backgroundColor = "#F2F2F2";
            
        if(model.data.configuration.backgroundColor !== undefined){
            backgroundColor = model.data.configuration.backgroundColor;
        }
        
        this.setBodyStyle({
            background: backgroundColor
        });
        
    }

    
});