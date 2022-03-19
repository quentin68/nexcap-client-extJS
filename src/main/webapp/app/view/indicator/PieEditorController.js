Ext.define('Dashboard.view.indicator.PieEditorController',{
    //extend: 'Ext.app.ViewController',
    extend: 'Dashboard.view.indicator.IndicatorEditorController',
    alias: 'controller.pieEditor',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.view.indicator.Pie',
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
            this.updateIndicator(data);
            return;
        }
              
        var indicatorModel = Ext.create('Dashboard.model.Indicator',{
            name: data.title,
            title: data.title,
            indicatorType: 'PIE',
            dataBinding: data.dataBinding
        });                    
        
        Dashboard.manager.IndicatorManager.save(indicatorModel);
        
        this.getView().close();
    },
    
    
    /**
     * Update indicator into server
     * @param {data} data
     * @returns {undefined}
     */
    updateIndicator: function(data){
        
        var indicatorModel = Ext.create('Dashboard.model.Indicator',{
            id: data.serverId,
            indicatorType: 'PIE',
            name: data.title,
            title: data.title,
            dataBinding: data.dataBinding
        });
        
        try{
            Dashboard.manager.IndicatorManager.update(indicatorModel);
        }catch(ex){
            throw new Error('[PieEditorController.updateIndicator] create Pie widget failed!' + ex);
        }
        
        this.getView().close();
        
    },
    
    
    statics: {
    
        /**
         * Create editor window
         * @param {indicator} indicator
         * @returns {PieEditor}
         */
        createWidgetEditor: function(){
            
            var editorWindow = Ext.create('Dashboard.view.indicator.PieEditor',{
                action: 'CREATE'
            });
            return editorWindow;
        }  
    }

    
});