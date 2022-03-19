/* global Ext */

Ext.define('Dashboard.view.indicator.BarGraphEditorController',{
    //extend: 'Ext.app.ViewController',
    extend: 'Dashboard.view.indicator.IndicatorEditorController',
    alias: 'controller.barGraphEditor',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.view.indicator.BarGraph',
        'Dashboar.manager.DashboardEditorManager',
        'Dashboard.manager.IndicatorManager',
        'Dashboard.view.shared.IconPicker',
        'Dashboard.view.shared.ColorPicker'
    ],
    
    
    /**
     * Save indicator into server and add it to current dasboard
     * 
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
            indicatorType: 'BAR_GRAPH',
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
            indicatorType: 'BAR_GRAPH',
            name: data.title,
            title: data.title,
            dataBinding: data.dataBinding
        });
        
        try{
            Dashboard.manager.IndicatorManager.update(indicatorModel);
        }catch(ex){
            throw new Error('[BarGraphEditorController.updateIndicator] create bar graph failed!' + ex);
        }
        
        this.getView().close();
        
    },
    
    
    statics: {
    
        /**
         * Create editor window
         * 
         * @returns {BarGraphEditor}
         */
        createWidgetEditor: function(){
            var editorWindow = Ext.create('Dashboard.view.indicator.BarGraphEditor',{
                action: 'CREATE'
            });
            return editorWindow;
        }  
    }

    
});