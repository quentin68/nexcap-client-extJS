Ext.define('Dashboard.view.dashboard.DashboardScene',{
    extend: 'Ext.panel.Panel',
    xtype: 'dashboardScene',
    
    controller: 'dashboardScene',
    ui: 'dashboard-scene',
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

    tools: [
        {
            xtype: 'button',
            scale: 'small',
            iconCls: 'fa fa-pencil',
            ui: 'dashboard-scene',
            hidden: false,
            border: false,
            enableToggle: false,
            action: 'editDashboard',
            flag: 'editionMode',
            handler: 'onEditDashboard'
        },
        {
            xtype: 'button',
            scale: 'small',
            iconCls: 'fa fa-eraser',
            ui: 'dashboard-scene',
            hidden: false,
            border: false,
            enableToggle: false,
            action: 'deleteDashboard',
            flag: 'editionMode',
            handler: 'onDeleteDashboard'
        }
    ],

    items : [    
//                    {
//                        xtype: 'partWidget'//,
////                        height: 400,
////                        width: 600
//                    }

//                    {
//                        xtype: 'donut',
//                        title: 'Donut 1',
//                        border: true,
//                        margin: '24 0 0 24'
//                    },
//                    {
//                        xtype: 'postIt',
//                        margin: '24 0 0 24',
//                        viewModel:{
//                            data:{
//                                icon: 'cloud-icon.png',
//                                label: 'label',
//                                value: '001',
//                                color: 'blue'
//                            }
//                        }
//                    }
    ],      

    
    
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
        
    }
    
});