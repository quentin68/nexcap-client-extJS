/*  global Ext  */

Ext.define('Dashboard.manager.MainMenuManager', {
    extend: 'Ext.app.Controller',
    alias: 'mainMenuManager',
    singleton: true,
    
    currentFeature: null,
    
    
    /**
     * Show menu from configuration
     * @returns {undefined}
     */
    buildMainMenu: function(){
        
        var menuContainer = Ext.ComponentQuery.query('panel[name=treeMenuContainer]')[0];
        
        menuContainer.removeAll();
        
        var mainMenu = Ext.create(Dashboard.view.menu.TreeListMenu, {});
        var config = Dashboard.manager.ConfigurationManager.inventoryNameChange();
        var treeMenuNodes = Dashboard.manager.ConfigurationManager.getGeneralMenu();
        for (var i = 0; i <treeMenuNodes.length ; i++) {
            if (treeMenuNodes[i].text === "Historics" || treeMenuNodes[i].text === "Historiques") {
                for (var j = 0; j <treeMenuNodes[i].children.length ; j++) {
                    if (treeMenuNodes[i].children[j].text === "Inventories" || treeMenuNodes[i].children[j].text === "Inventaires") {
                        treeMenuNodes[i].children[j].text = config.logisticOperationMenuName;
                    }
                }
            }
        }
        var rootNode = mainMenu.viewModel.data.navItems.getRootNode();
        
        //Build default menu (with all features)
        this.addChildToNode(rootNode, treeMenuNodes);
        
        //Hide too many features from rights
        this.filterByEnabledFeatures(rootNode);
                        
        //display menu
        menuContainer.add(mainMenu);
        
    },
    
    
    /**
     * While exists, add child to treeNode
     * @param {type} node
     * @param {type} children
     * @returns {undefined}
     */
    addChildToNode: function(node, children){
        for(var i=0; i<children.length; i++){
            if(!children[i].hidden){
                node.appendChild(children[i]);
            }
        }
    },
            
            
    filterByEnabledFeatures: function(rootNode){
                
        var nodesToDelete = [];

        rootNode.cascadeBy(function(node){
            
            var enabledFeatures = Dashboard.manager.FeaturesManager.enabledFeatures;
                        
            if(node.data.right){
                if(Ext.Array.contains(enabledFeatures, node.data.right) === false){
                    nodesToDelete.push(node);
                }
            }
       });
              
       for(var i = 0; i<nodesToDelete.length; i++) {
           if(nodesToDelete[i] && nodesToDelete[i].parentNode){
                nodesToDelete[i].parentNode.removeChild(nodesToDelete[i]);
           }else{
               Dashboard.tool.Utilities.error('[MainMenuManager.filterByEnabledFeatures] unknown node ');
           }
       }
       
       nodesToDelete = [];
       
       rootNode.cascadeBy(function(node){
           if(!node.data.right && !node.data.leaf){
                if(node.childNodes.length < 1 && node.data.text !== getText('Dashboards')){
                    nodesToDelete.push(node);
                }
           }
       });
       
       for(var i = 0; i<nodesToDelete.length; i++) {
            nodesToDelete[i].parentNode.removeChild(nodesToDelete[i]);
       }
       
       return rootNode;

    },
            
    
    
    /**
     * Display screens
     * @param {object} menuData : menu.data
     * @returns {undefined}
     */
    showFeature: function(menuData){
        
        Dashboard.manager.DataCollectionManager.disableTimer();
        
        switch(menuData.action){
            
                //================ DASHBOARD =============================
                
            case 'show_dashboards':
                Dashboard.manager.DashboardEditorManager.displayInMain();
                Dashboard.manager.DashboardSceneManager.loadDashboards();
                Dashboard.manager.DataCollectionManager.enableTimer();
                break;
            
            case 'show_dashboard':
                Dashboard.manager.DashboardEditorManager.displayInMain();
                Dashboard.manager.DashboardEditorManager.displayDashboardById(menuData.dashboardId);
                Dashboard.manager.DataCollectionManager.enableTimer();
                break;
                
            case 'search':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SEARCH');
                Dashboard.manager.SearchManager.displayInMain();
                break;
                
            case 'show_notifications':
                break;
                
                //================ ALERTS =============================
                
//            case 'old_show_items_alerts':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_ALERTS_ITEMS');
//                Dashboard.manager.alerts.ItemsAlertsManager.loadConfiguration(this.currentFeature);
//                break;
                
            case 'show_cur_items_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_ALERTS_ITEMS');
                Dashboard.manager.alerts.CurItemsAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_cur_inventories_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_ALERTS_INVENTORIES');
                Dashboard.manager.alerts.InventoriesAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_cur_stocks_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_ALERTS_STOCKS');
                Dashboard.manager.alerts.StocksAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_cur_users_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_ALERTS_USERS');
                Dashboard.manager.alerts.UsersAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_cur_locations_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_ALERTS_LOCATIONS');
                Dashboard.manager.alerts.LocationsAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_cur_devices_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_ALERTS_DEVICES');
                Dashboard.manager.alerts.DevicesAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_operations_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_ALERTS_OPERATIONS');
                Dashboard.manager.alerts.OperationsAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
                //================ BUSINESS =============================
                
            case 'show_interventionOrders_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('INTERVENTION_ORDER_ADMIN');
                Dashboard.manager.administration.InterventionOrdersManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_planifications_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('PLANNED_OPERATIONS');
                Dashboard.manager.administration.PlanificationsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_expiration_dates_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('EXPIRATION_DATES_MANAGEMENT');
                Dashboard.manager.administration.ExpirationDatesManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_stocks_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('STOCK_ADMIN');
                Dashboard.manager.administration.StocksManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_receiving_operation':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('OP_RECEIVE');
                Dashboard.manager.operation.ReceivingsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_controls_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SPECIFIC_CHECK_VALIDATION');
                Dashboard.manager.administration.ChecksManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_inventoried_items_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('INVENTORIED_ITEMS_MANAGEMENT');
                Dashboard.manager.administration.InventoriedeItemsManager.loadConfiguration(this.currentFeature);
                break;
                
                //================ CONSULTATION =============================
                
//                // DEMO JUNE
//            case 'show_demo_map':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MAT_INVENTORY');
//                Dashboard.manager.demo.MapManager.loadConfiguration(this.currentFeature);
//                break;
                
            case 'show_items_inventory':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MAT_INVENTORY');
                Dashboard.manager.consultation.ItemsManager.loadConfiguration(this.currentFeature, false);
                break;
                
            case 'show_materials_sets_inventory':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MATERIALS_SETS_INVENTORY');
                Dashboard.manager.consultation.MaterialsSetsManager.loadConfiguration(this.currentFeature, false);
                break;
                
            case 'show_current_borrowings':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_BORROW_INVENTORY');
                Dashboard.manager.operation.BorrowingsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_current_sendings':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_SEND_INVENTORY');
                Dashboard.manager.operation.SendingsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_current_maintenances':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_MAINTENANCE_INVENTORY');
                Dashboard.manager.operation.MaintenancesManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_current_calibrations':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CUR_CALIBRATION_INVENTORY');
                Dashboard.manager.operation.CalibrationsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'maps_consultation':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MAPS_CONSULTATION');
                Dashboard.manager.cartography.CartographyManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'geoloc_consultation':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('GEOLOC_CONSULTATION');
                Dashboard.manager.cartography.GeolocManager.loadConfiguration(this.currentFeature);
                break;
                
                //================ ADMINISTRATION =============================
                
            case 'show_items_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MAT_ADMIN');
                Dashboard.manager.administration.MaterialManager.loadConfiguration(this.currentFeature, true);
                break;
                
            case 'show_references_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('REF_MAT_ADMIN');
                Dashboard.manager.administration.ReferencesManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_categories_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('CAT_MAT_ADMIN');
                Dashboard.manager.administration.CategoriesManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_users_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('USER');
                Dashboard.manager.administration.UsersManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_profiles_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('PROFILE_ADMIN');
                Dashboard.manager.administration.ProfilesManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_locations_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('POSITION_ADMIN');
                Dashboard.manager.administration.PositionsManager.loadConfiguration(this.currentFeature);
                break;
                
//            case 'show_telemetry_management':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SENSOR_ADMINISTRATION');
//                Dashboard.manager.administration.TelemetryDataManager.loadConfiguration(this.currentFeature);
//                break;
                                
                //================ HISTORICS =============================
                
            case 'show_operations_historic':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ALL_LIST');
                Dashboard.manager.historic.OperationsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_checks_historic':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_SPECIFIC_CHECK_LIST');
                Dashboard.manager.historic.ChecksManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_consumptions_historic':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_CONSUME_LIST');
                Dashboard.manager.historic.ConsumptionsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_provision_historic':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_PROVISIONS');
                Dashboard.manager.historic.ProvisionsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_inventories_historic':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_INVENTORY_LIST');
                Dashboard.manager.historic.InventoriesManager.loadConfiguration(this.currentFeature);
                break;
                
//            case 'show_maintenances_historic':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_MAINTENANCES_LIST');
//                Dashboard.manager.historic.MaintenancesManager.loadConfiguration(this.currentFeature);
//                break;
//                
//            case 'show_calibrations_historic':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_CALIBRATIONS_LIST');
//                Dashboard.manager.historic.CalibrationsManager.loadConfiguration(this.currentFeature);
//                break;
                
//            case 'show_alerts_historic':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ALERTS');
//                Dashboard.manager.historic.AlertsManager.loadConfiguration(this.currentFeature);
//                break;
                // Todo: For now putting old HISTO_ALERTS till the server adds other features for other alerttypes.
            case 'show_histo_items_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ALERTS');
                Dashboard.manager.historic.alert.ItemsAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_histo_inventories_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ALERTS_INVENTORIES');
                Dashboard.manager.historic.alert.InventoriesAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_histo_stocks_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ALERTS_STOCKS');
                Dashboard.manager.historic.alert.StocksAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_histo_users_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ALERTS_USERS');
                Dashboard.manager.historic.alert.UsersAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_histo_locations_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ALERTS_LOCATIONS');
                Dashboard.manager.historic.alert.LocationsAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_histo_devices_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ALERTS_DEVICES');
                Dashboard.manager.historic.alert.DevicesAlertsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_access_historic':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('HISTO_ACCESS');
                Dashboard.manager.historic.AccessManager.loadConfiguration(this.currentFeature);
                break;
                
                //================ SYSTEM =============================
                
            case 'show_about':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('ABOUT');
//                Dashboard.manager.system.AboutManager.displayInMain();
                break;
                
            case 'show_alert_config':
                
 				var token;
            	if (Dashboard.manager.administration.UsersManager.getToken()) {
                	token = Dashboard.manager.administration.UsersManager.getToken();
            	}
            	else {
               	 	token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
            	}               
             	//window.location.href='http://127.0.0.1:8081?token=' +token;
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('ALERT_CONFIG_ADMIN');
                Dashboard.manager.settings.AlertsConfigManager.loadConfiguration(this.currentFeature, true);
                break;
                
  /*          case 'show_system_items_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SYSTEM_ALERTS_ITEMS');
                Dashboard.manager.settings.alert.ItemsAlertsConfigManager.loadConfiguration(this.currentFeature, true);
                break;
                
            case 'show_system_inventories_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SYSTEM_ALERTS_INVENTORIES');
                Dashboard.manager.settings.alert.InventoriesAlertsConfigManager.loadConfiguration(this.currentFeature, true);
                break;
                
            case 'show_system_stocks_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SYSTEM_ALERTS_STOCKS');
                Dashboard.manager.settings.alert.StocksAlertsConfigManager.loadConfiguration(this.currentFeature, true);
                break;
                
            case 'show_system_users_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SYSTEM_ALERTS_USERS');
                Dashboard.manager.settings.alert.UsersAlertsConfigManager.loadConfiguration(this.currentFeature, true);
                break;
                
            case 'show_system_locations_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SYSTEM_ALERTS_LOCATIONS');
                Dashboard.manager.settings.alert.LocationsAlertsConfigManager.loadConfiguration(this.currentFeature, true);
                break;
                
            case 'show_system_devices_alerts':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SYSTEM_ALERTS_DEVICES');
                Dashboard.manager.settings.alert.DevicesAlertsConfigManager.loadConfiguration(this.currentFeature, true);
                break; */

            case 'show_devices_admin':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('DEVICE_MAINTENANCE');
                Dashboard.manager.system.DevicesManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_imports_admin':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MANAGE_IMPORTS');
                Dashboard.manager.system.ImportManager.loadConfiguration(this.currentFeature);
                break; 

            case 'show_packages_admin':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MANAGE_DEVICE_UPDATES');
                Dashboard.manager.system.PackagesManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_server_config':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SERVER_CONFIG_ADMIN');
                Dashboard.manager.settings.ServerConfigManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_multisite_config': 
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('MULTI_SITES_ADMIN');
                Dashboard.manager.system.ContextManager.loadConfiguration(this.currentFeature);
                break;

            case 'show_properties_admin':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('DYNAMIC_PROPERTIES_ADMIN');
                Dashboard.manager.system.DynamicPropertiesManager.loadConfiguration(this.currentFeature);
                break;
                
//            case 'show_telemetry_properties_admin':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('DYNAMIC_TELEMETRY_PROPERTIES_ADMIN');
//                Dashboard.manager.system.DynamicPropertiesManager.loadConfiguration(this.currentFeature);
//                break;
//                
//            case 'show_computed_properties_admin':
//                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('DYNAMIC_COMPUTED_PROPERTIES_ADMIN');
//                Dashboard.manager.system.DynamicPropertiesManager.loadConfiguration(this.currentFeature);
//                break;
                
            case 'show_plugins_admin':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('PLUGINS_MAINTENANCE');
                Dashboard.manager.system.PluginsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_server_logs':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('LOG_SERVER');
                Dashboard.manager.system.ServerLogsManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_sensors_admin':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SENSOR_CONSULTATION');
                Dashboard.manager.system.SensorsManager.loadConfiguration(this.currentFeature);
                break;

                
                //================ SETTINGS =============================
                
            case 'show_user_settings':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('USER_SETTINGS');
                Dashboard.manager.settings.UserSettingsManager.loadConfiguration(this.currentFeature);
                break;
            
            case 'show_alert_management':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('BASIC_ALERT_CONFIGURATION');
                Dashboard.manager.settings.AlertsConfigManager.loadConfiguration(this.currentFeature, false);
                break;
                
                // case 'show_setting_items_alerts':
                // this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SETTINGS_ALERTS_ITEMS');
                // Dashboard.manager.settings.alert.ItemsAlertsConfigManager.loadConfiguration(this.currentFeature, false);
                // break;
                //
                // case 'show_setting_inventories_alerts':
                // this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SETTINGS_ALERTS_INVENTORIES');
                // Dashboard.manager.settings.alert.InventoriesAlertsConfigManager.loadConfiguration(this.currentFeature, false);
                // break;
                //
                // case 'show_setting_stocks_alerts':
                // this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SETTINGS_ALERTS_STOCKS');
                // Dashboard.manager.settings.alert.StocksAlertsConfigManager.loadConfiguration(this.currentFeature, false);
                // break;
                //
                // case 'show_setting_users_alerts':
                // this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SETTINGS_ALERTS_USERS');
                // Dashboard.manager.settings.alert.UsersAlertsConfigManager.loadConfiguration(this.currentFeature, false);
                // break;
                //
                // case 'show_setting_locations_alerts':
                // this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SETTINGS_ALERTS_LOCATIONS');
                // Dashboard.manager.settings.alert.LocationsAlertsConfigManager.loadConfiguration(this.currentFeature, false);
                // break;
                //
                // case 'show_setting_devices_alerts':
                // this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SETTINGS_ALERTS_DEVICES');
                // Dashboard.manager.settings.alert.DevicesAlertsConfigManager.loadConfiguration(this.currentFeature, false);
                // break;
                
            case 'show_notif_mail_config':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('EMAIL_SENDERS_ADMIN');
                Dashboard.manager.settings.NotifMailConfigManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_specific_checks_config':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('SPECIFIC_CHECK_CONFIG_ADMIN');
                Dashboard.manager.settings.SpecificCheckConfigManager.loadConfiguration(this.currentFeature);
                break;
                
            case 'show_web_client_config':
                this.currentFeature = Dashboard.manager.FeaturesManager.setCurrentFeature('EXTERNAL_CONFIGURATION_ADMIN');
                Dashboard.manager.settings.WebClientManager.loadConfiguration(this.currentFeature);
                break;
            
             default:

        }
        
    },
            
    
    /**
     * Refresh menu with server data
     * @param {array} dasboardsList
     * @returns {undefined}
     */
    updateDashboardsMenu: function(dashboardsList){

        var mainMenu = Ext.ComponentQuery.query('treelist[reference=treelist]')[0];
        var node = mainMenu._store.findNode('name', 'dashboards');
        
        if(!node){
            return;
        }
        
        //node.eachChild( Function fn, [Object scope], [Array args] )
           
        this.clearNode(node);

        for(var i=0; i<dashboardsList.length; i++){

            var data = dashboardsList[i].data;
            if(data.name === ""){
                data.name = data.title;
            }

            var treeItem = this.buildDashboardMenuItem(data.name, data.id);
            node.appendChild(treeItem);
        }
        
    },
    
    
    /**
     * Get dashboard tree node child
     * @param {type} text
     * @param {type} id
     * @returns {MainMenuManagerAnonym$0.buildDashboardMenuItem.treeItem}
     */
    buildDashboardMenuItem: function(text, id){
                
        var treeItem = {
            text: text,
            iconCls: 'x-fa fa-bar-chart ',
            dashboardId: id,
            action: 'show_dashboard',
            leaf: true
        };
        
        return treeItem;
    },
    
    
    /**
     * Clear all node's children
     * @param {type} node
     * @returns {undefined}
     */
    clearNode: function(node){
        
        while(node.firstChild) {
            node.removeChild(node.firstChild);
        }
    },
    
    
    
    /**
     * Refresh bottom menu with server data
     * @param {array} dasboardsList
     * @returns {undefined}
     */
    updateDashboardsBottomMenu: function(dasboardsList){
        
        var subMenu = Ext.ComponentQuery.query('button[name=dashboardBottomMenu]')[0];
        
        if(!subMenu){
            return;
        }
        
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
    
    
    addMenuItem: function(dashboardModel){
        //side bar menu
        var mainMenu = Ext.ComponentQuery.query('treelist[reference=treelist]')[0];
        var node = mainMenu._store.findNode('name', 'dashboards');
        var treeItem = this.buildDashboardMenuItem(dashboardModel.data.name, dashboardModel.data.id);
        node.appendChild(treeItem);
      
        //bottom menu
        var menuItem = this.buildSubMenuItem(dashboardModel);
        var bottomSubMenu = Ext.ComponentQuery.query('button[name=dashboardBottomMenu]')[0];
        
        if(bottomSubMenu !== undefined){
            var menu = bottomSubMenu.getMenu();
            menu.add(menuItem);
        }
    },
           
            
    /**
     * Refresh menus
     * @param {type} dashboardModel
     * @returns {undefined}
     */
    refreshMenuItem: function(dashboardModel){
        try {
            //side bar menu
            var mainMenu = Ext.ComponentQuery.query('treelist[reference=treelist]')[0];
            var record = mainMenu._store.findNode('dashboardId', dashboardModel.data.id);
            var node = mainMenu.getItem(record);
            node.setText(dashboardModel.data.name);

            //bottom menu
            var bottomSubMenu = Ext.ComponentQuery.query('button[name=dashboardBottomMenu]')[0];
            var menuItem = bottomSubMenu.down('menuitem[dashboardId=' + dashboardModel.data.id + ']');
            menuItem.setText(dashboardModel.data.name);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[MainMenuManager.refreshMenuItem] error :' + ex);
        }       
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