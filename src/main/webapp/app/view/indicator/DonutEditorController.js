/*  global Ext  */

Ext.define('Dashboard.view.indicator.DonutEditorController',{
    //extend: 'Ext.app.ViewController',
    extend: 'Dashboard.view.indicator.IndicatorEditorController',
    alias: 'controller.donutEditor',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.view.indicator.Donut',
        'Dashboar.manager.DashboardEditorManager',
        'Dashboard.manager.IndicatorManager',
        'Dashboard.view.shared.IconPicker',
        'Dashboard.view.shared.ColorPicker'
    ],
    
    
    /**
     * Save indicator into server and add it to current dasboard
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
            indicatorType: 'DONUT',
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
            indicatorType: 'DONUT',
            name: data.title,
            title: data.title,
            dataBinding: data.dataBinding
        });
        
        try{
            Dashboard.manager.IndicatorManager.update(indicatorModel);
        }catch(ex){
            throw new Error('[DonutEditorController.updateIndicator] create Donut widget failed!' + ex);
        }
        
        this.getView().close();
        
    },
    
    
    statics: {
    
        /**
         * Create editor window
         * @returns {DonutEditor}
         */
        createWidgetEditor: function(){
            
            var editorWindow = Ext.create('Dashboard.view.indicator.DonutEditor',{
                title: getText('Donut widget editor'),
                indicatorType: 'DONUT',
                action: 'CREATE'
            });
            
            return editorWindow;
        }  
    }

    
});