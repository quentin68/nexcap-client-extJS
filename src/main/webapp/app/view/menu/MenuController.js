Ext.define('Dashboard.view.menu.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu',
    
    requires:[
        'Dashboard.view.dashboard.DashboardEditor',
        'Dashboard.view.dashboard.DashboardScene'
    ],
    
    
    /**
     * Load dashboards and build menus
     * @param {type} sender
     * @returns {undefined}
     */
    onRenderMenu: function(sender){
        
        Dashboard.manager.DashboardSceneManager.loadDashboards();
        
    },
    
    
    onSubMenuClicked: function(sender){
        
        //alert(sender.tag);
        
    },

    
    
    /**
     * Menu items events handler
     * @param {type} sender
     * @returns {undefined}
     */
    onMenuButtonClicked: function (sender) {

       //alert('menu clicked'+ sender.itemId);
       switch(sender.action){
           case 'show_dashboard':
               Dashboard.manager.DashboardEditorManager.displayDashboardById(sender.dashboardId);
               Dashboard.manager.DataCollectionManager.enableTimer();
               break;
               
            default:
                Dashboard.manager.DataCollectionManager.disableTimer();
       }
       
       sender.disable();
       
       Ext.defer(function() {
            sender.enable();
        }, 1000, this);
    },
    
    
    /**
     * Display menu, dashboards editor and first dashboard
     * @returns {undefined}
     */
    showDashbordEditor: function(){

        this.setCenter({xtype:'dashboardEditor'}); 

    },
    
    
    /**
     * Refresh menu with server data
     * @param {array} dasboardsList
     * @returns {undefined}
     */
    updateDashboardsMenu: function(dasboardsList){
        
        var target = this.getView().down('panel[name=dashboardsGeneralMenu]');
        target.removeAll();
        
        for(var i=0; i<dasboardsList.length; i++){
            var menuButton = this.buildMenuButton(dasboardsList[i]);
            target.add(menuButton);
        }
        
        this.getView().updateLayout();
    },
    
    
    /**
     * Refresh menus
     * @param {type} dashboardModel
     * @returns {undefined}
     */
    refreshMenuItem: function(dashboardModel){
        
        //side bar menu
        var target = this.getView().down('panel[name=dashboardsGeneralMenu]');
        var button = target.down('button[dashboardId='+dashboardModel.data.id+']');
        button.setText(dashboardModel.data.name);
        
        //bottom menu
        var bottomSubMenu = Ext.ComponentQuery.query('button[name=dashboardBottomMenu]')[0];
        var menuItem = bottomSubMenu.down('menuitem[dashboardId='+dashboardModel.data.id+']');
        menuItem.setText(dashboardModel.data.name);
        
    },
    
    
    addMenuItem: function(dashboardModel){
 
        //side bar menu
        var menuButton = this.buildMenuButton(dashboardModel);
        var sideMenu = this.getView().down('panel[name=dashboardsGeneralMenu]');
        sideMenu.add(menuButton);
       
        //bottom menu
        var menuItem = this.buildSubMenuItem(dashboardModel);
        var bottomSubMenu = Ext.ComponentQuery.query('button[name=dashboardBottomMenu]')[0];
        var menu = bottomSubMenu.getMenu();
        menu.add(menuItem);
 
    },
    
    
    buildMenuButton: function(record){
        
        if(record.data.name === ""){
            record.data.name = record.data.title;
        }
       
        var button = {
            xtype: 'button',
            text: record.data.name,
            width: '100%',
            height: 48,
            action: 'show_dashboard',
            dashboardId: record.data.id,
            handler: 'onMenuButtonClicked'
            
        };
        
        return button;
    },
    
    
    /**
     * Refresh bottom menu with server data
     * @param {array} dasboardsList
     * @returns {undefined}
     */
    updateDashboardsBottomMenu: function(dasboardsList){
        
        var subMenu = Ext.ComponentQuery.query('button[name=dashboardBottomMenu]')[0];
        subMenu.getMenu().removeAll();
        
        var items = [];
        
        for(var i=0; i<dasboardsList.length; i++){
            var item = this.buildSubMenuItem(dasboardsList[i]);
            items.push(item);
        }
        
        subMenu.setMenu(items);

    },
    
    
    buildSubMenuItem: function(record){
        
        if(record.data.name === ""){
            record.data.name = record.data.title;
        }
       
        var subMenuItem = {
            text: record.data.name,
            action: 'show_dashboard',
            dashboardId: record.data.id,
            handler: 'onMenuButtonClicked'
        };
        
        return subMenuItem;
    },
    
    
    /**
    * Add new panel into the main screen (in the center of vieport).
    * @argument {panel} panel Target panel
    */
    setCenter: function(panel){

        // Catch the main screen
        var mainCenterPanel = Ext.getCmp('mainPanelCenter');
        
        // Clear the previous content
        mainCenterPanel.removeAll();

        // Add new panel into viewport
        mainCenterPanel.add(panel);
    }
    
});

