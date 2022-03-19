/* global Ext  */

Ext.define('Dashboard.view.indicator.PostItEditorController',{
    //extend: 'Ext.app.ViewController',
    extend: 'Dashboard.view.indicator.IndicatorEditorController',
    alias: 'controller.postItEditor',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.view.indicator.PostIt',
        'Dashboar.manager.DashboardEditorManager',
        'Dashboard.manager.IndicatorManager',
        'Dashboard.view.shared.IconPicker',
        'Dashboard.view.shared.ColorPicker'
    ],
    
    
    /**
     * Save indicator into server and add it to current dasboard
     * @param {type} sender
     * @returns {undefined}
     */
    saveIndicator: function(){
        
        var data = this.getView().getData();
        
        if(data.serverId){
            this.updateIndicator();
            return;
        }
              
        var indicatorModel = Ext.create('Dashboard.model.Indicator',{
            indicatorType: 'POST_IT',
            dataBinding: data.dataBinding
        });                    
        
        Dashboard.manager.IndicatorManager.save(indicatorModel);
        
        this.getView().close();
    },
    
    
    /**
     * Update indicator into server
     * @returns {undefined}
     */
    updateIndicator: function(){
        
        var data = this.getView().getData();
         
        var indicatorModel = Ext.create('Dashboard.model.Indicator',{
            id: data.serverId,
            indicatorType: 'POST_IT',
            dataBinding: data.dataBinding
        });                    
        
        try{
            Dashboard.manager.IndicatorManager.update(indicatorModel);
        }catch(ex){
            throw new Error('[PostItEditorController.updateIndicator] create PostIt widget failed!' + ex);
        }
        
        this.getView().close();
        
    },
    
    
    statics: {
    
        /**
         * Create editor window
         * 
         * @returns {PostItEditor}
         */
        createWidgetEditor: function(){
            var editorWindow = Ext.create('Dashboard.view.indicator.PostItEditor',{
                action: 'CREATE'
            });
            return editorWindow;
        }  
    }

    
});