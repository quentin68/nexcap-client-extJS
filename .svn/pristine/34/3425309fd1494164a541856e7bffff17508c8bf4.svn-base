
Ext.define('Dashboard.view.dashboard.DashboardSceneEditorController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboardSceneEditor',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.view.indicator.PostIt',
        'Dashboar.manager.DashboardEditorManager',
        'Dashboard.manager.DashboardSceneManager'
    ],
    
    
       /**
     * Event handler
     * @param {ux-panel} sender
     * @returns {undefined}
     */
    onColorPicker: function(target){

        var colorPicker = Ext.create('Dashboard.view.shared.ColorPicker',{
            target: target
        });
        
        colorPicker.down('form').lookupReference( 'selectedColor' ).on({
            change: function(sender) {
                var target = sender.up('window').target;
                target.body.setStyle('background', sender.value);
                target.up('form').down('hiddenfield[name=color]').setValue(sender.value);
                
                Ext.Function.defer(function(){
                    sender.up('window').close();
                }, 100);

            }
        });
        
        colorPicker.show();
    },

    
    /**
     * Event handler
     * @param {button} sender
     * @returns {undefined}
     */
    onSaveDashboard: function(){
        
        var form = this.getView().down('form').getForm();
        
        if (form.isValid()) {
             this.saveDashboard();
        }

    },
    
    
    /**
     * Save and display dashboard
     * @param {type} sender
     * @returns {undefined}
     */
    saveDashboard: function(){
        
        var data = this.getView().getData();
        
        if(data.serverId){
            this.updateDashboard(data);
            return;
        }
              
        var dashboardModel = Ext.create('Dashboard.model.DashboardScene',{
            name: data.name,
            title: data.title,
            authorName: data.authorName,
            configuration: data.configuration
        }); 
        
        Dashboard.manager.DashboardSceneManager.save(dashboardModel);
        
        this.getView().close();
    },
    
    
    /**
     * Update dashboard into server
     * @param {data} window.getData
     * @returns {undefined}
     */
    updateDashboard: function(data){
        
        var dashboardModel = Ext.create('Dashboard.model.DashboardScene',{
            id: data.serverId
        });
        dashboardModel.data = data;
        dashboardModel.data.id = data.serverId;
        
        dashboardModel.data = data;
        dashboardModel.data.id = data.serverId;
        
        if(dashboardModel.data.serverId !== undefined){
            delete dashboardModel.data.serverId;
        }
        
        try{
            Dashboard.manager.DashboardSceneManager.update(dashboardModel);
        }catch(ex){
            throw new Error('[DashboardSceneEditorController.updateDashboard] update failed!' + ex);
        }
        
        this.getView().close();
        
    },
    
    
    statics: {
    
        /**
         * Create editor window
         * @param {indicator} indicator
         * @returns {PostItEditor}
         */
        createDashboardSceneEditor: function(){
            
            var editorWindow = Ext.create('Dashboard.view.dashboard.DashboardSceneEditor',{
                action: 'CREATE'
            });
            
            return editorWindow;
        }  
    }

    
});