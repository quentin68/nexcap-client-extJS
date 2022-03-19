/* global Ext  */

Ext.define('Dashboard.view.menu.TreeListMenuController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.treeListMenu',
    
    menuLogoWidth: null,
    menuLogoHeight: 44,
    
    
    
   //==================================================
   //   Event listeners
   //==================================================
   
   
   /**
     * Load dashboards and build menus
     * @param {type} sender
     * @returns {undefined}
     */
    onRenderMenu: function(sender){
        
        Dashboard.manager.MainMenuManager.buildMainMenu();
        Dashboard.manager.DashboardSceneManager.loadDashboards();
        
    },
    
    
    /**
     * Show features
     * @param {type} sender
     * @param {type} info
     * @param {type} eOpts
     * @returns {undefined}
     */
    onTreeItemSelected: function(sender, info, eOpts){

        if(!info.item.config.node.data.action){
            return;
        }
       
       //alert(info.item._text);

       Dashboard.manager.MainMenuManager.showFeature(info.item.config.node.data);
     
       // Chill out, dickwad !
       // Wait 1 second before select new menu
       Ext.defer(function() {
       }, 1000, this);
       
   },
   

    onToggleConfig: function (menuitem) {
        var treelist = this.lookupReference('treelist');

        treelist.setConfig(menuitem.config, menuitem.checked);
    },
    

    onToggleMicro: function (button, pressed) {
        var treelist = this.lookupReference('treelist');
            //navBtn = this.lookupReference('navBtn'),
        var ct = treelist.ownerCt;

        var westMenu = Ext.ComponentQuery.query('panel[reference=westMenu]')[0];
        var username = Ext.ComponentQuery.query('label[reference=userName]')[0];
        var contextName = Ext.ComponentQuery.query('label[reference=contextName]')[0];
        var menuLogo = Ext.ComponentQuery.query('image[reference=menuLogo]')[0];
        var search = Ext.ComponentQuery.query('combo[reference=search]')[0];
        var copirate = Ext.ComponentQuery.query('component[reference=copirate]')[0];
        var footerLogo = Ext.ComponentQuery.query('image[reference=logo]')[0];

        treelist.setMicro(pressed);

        if (pressed) {
            this.oldWidth = ct.width;
            ct.setWidth(44);
            westMenu.setWidth(44);

            username.hide();
            contextName.hide();
            search.hide();
            //menuLogo.hide();
            
            this.menuLogoWidth = menuLogo.getWidth();
            menuLogo.setWidth(44);
            var ratio = this.menuLogoWidth / 44;
            menuLogo.setHeight(44 / ratio);
            
            copirate.hide();
            footerLogo.hide();
            
        } else {
            ct.setWidth(220);
            westMenu.setWidth(221);

            username.show();
            contextName.show();
            //menuLogo.show();
            menuLogo.setWidth(this.menuLogoWidth);
            menuLogo.setHeight(44);
            //search.show();
            copirate.show();
            footerLogo.show();
        }

        
        if (Ext.isIE8) {
            this.repaintList(treelist, pressed);
        }
    },

    onToggleNav: function (button, pressed) {
        
        var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer');
            //ct = this.lookupReference('westMenu');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
        treelist.setHighlightPath(pressed);
        //ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');
        
        if (Ext.isIE8) {
            this.repaintList(treelist);
        }
    },
    
    
   //==================================================
   //   Methods
   //==================================================
   
   
    
    
    
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
    
    
    
    /**
     * IES8 patch
     * @param {type} treelist
     * @param {type} microMode
     * @returns {undefined}
     * // IE8 has an odd bug with handling font icons in pseudo elements;
        // it will render the icon once and not update it when something
        // like text color is changed via style addition or removal.
        // We have to force icon repaint by adding a style with forced empty
        // pseudo element content, (x-sync-repaint) and removing it back to work
        // around this issue.
        // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
        // and this: https://github.com/twbs/bootstrap/issues/13863
     */
    repaintList: function(treelist, microMode) {
        treelist.getStore().getRoot().cascadeBy(function(node) {
            var item, toolElement;
            
            item = treelist.getItem(node);
            
            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();
                    
                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    }
    
    
});