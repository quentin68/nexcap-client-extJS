/*  global Ext  */

Ext.define('Dashboard.view.indicator.IndicatorController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.indicatorController',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.manager.DashboardEditorManager',
        'Dashboard.manager.DashboardIndicatorManager',
        'Dashboard.model.Indicator',
        'dashboard.view.indicator.PostIt'
    ],
    
    
    view:['indicator'],
    
    dashboardEditorManager: Dashboard.manager.DashboardEditorManager,
    dashboardIndicatorManager: Dashboard.manager.DashboardIndicatorManager,
    

    onAfterRender: function(sender){
        
    },
    
    
    /**
     * Event handler
     * @param {button} sender
     * @returns {undefined}
     */
    onDeleteWidget: function(sender){
        this.deleteWidget(sender.up('indicator'));
    },
    
    
    /**
     * Delete indicator
     * @param {indicator} indicator
     * @returns {undefined}
     */
    deleteWidget: function(indicator){
        
        if(!indicator){
            throw new Error('[IndicatorController.deleteWidget] indicator param is null or empty!');
        }
        
        Ext.MessageBox.show({
            title: 'Delete indicator confirmation',
            //msg: getText('Do you really want to delete this item:') +" \"" + selectedRaw.data.name + "\" ?",
            msg: getText('Are you sure you want to delete this indicator') + getText('?'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    this.dashboardEditorManager.deleteIndicator(indicator);   
                }
            }
        }); 
    },
    
    
    /**
     * Order button event
     * @param {type} sender
     * @returns {undefined}
     */
    onMoveAfter: function(sender){
        
        var indicator = sender.up('indicator');
        Dashboard.manager.DashboardEditorManager.moveIndicatorAfter(indicator);
        
    },
    
    /**
     * Order button event
     * @param {type} sender
     * @returns {undefined}
     */
    onMoveBefore: function(sender){
        
        var indicator = sender.up('indicator');
        Dashboard.manager.DashboardEditorManager.moveIndicatorBefore(indicator);
    },
            
            

    showError: function(error){

        if(error.message !== undefined && error.message !== ""){
            var field = this.getView().down('displayfield[name=errorField]');
            field.setValue(error.message);
            
            var panel = this.getView().down('panel[name=errorPanel]');
            panel.setVisible(true);
        }

    },
    
    
    
    statics: {
    
        /**
         * create widget indicator
         * @param {indicator} indicatorModel
         * @returns {unresolved}
         */
        buildIndicator: function(indicatorModel){
            if(!indicatorModel){
                throw new Error('[IndicatorController.buildIndicator] indicatorModel param is null or empty!');
            }
            
            var widget = null;

            switch(indicatorModel.data.indicatorType){
                case 'POST_IT':
                    widget = Dashboard.view.indicator.PostItController.buildIndicator(indicatorModel);
                    break;

                case 'DONUT':
                    widget = Dashboard.view.indicator.DonutController.buildIndicator(indicatorModel);
                    break;

                case 'PIE':
                    widget = Dashboard.view.indicator.PieController.buildIndicator(indicatorModel);
                    break;
                    
                case 'BAR_GRAPH':
                    widget = Dashboard.view.indicator.BarGraphController.buildIndicator(indicatorModel);
                    break;
                    
                case 'VERTICAL_BAR_GRAPH':
                    widget = Dashboard.view.indicator.VerticalBarGraphController.buildIndicator(indicatorModel);
                    break;
                    
                case 'STACKED_BAR_GRAPH':
                    widget = Dashboard.view.indicator.StackedBarGraphController.buildIndicator(indicatorModel);
                    break;
                    
                case 'LINE':
                    widget = Dashboard.view.indicator.LineController.buildIndicator(indicatorModel);
                    break;
                    
                case 'AREA':
                    widget = Dashboard.view.indicator.AreaController.buildIndicator(indicatorModel);
                    break;

            }
            
            if(!widget){
                throw new Error('[IndicatorController.buildIndicator] indicator creation failed: widget error !');
            }
            
            return widget;

        }
    }
    
});