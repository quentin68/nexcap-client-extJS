/*  global Ext, Dashboard  */

Ext.define('Dashboard.manager.IndicatorManager',{
    extend: 'Ext.app.Controller',
    alias: 'indicatorManager',
    singleton: true,
    
    requires:[
        'Dashboard.model.Indicator',
        'Dashboard.store.Indicators',
        'Dashboard.tool.DateTime'
    ],

    
    stores:[
        'Dashboard.store.Indicators'
    ],
    
    
     /**
     * Get indicator from server
     * @param {type} indicatorId
     * @returns {indicatorModel}
     */
    read: function(indicatorId){
        if(!indicatorId){
            throw new Error('[IndicatorManager.read] indicator.serverId is null or empty!] indicatorId is null or empty!');
        }
        
        this.getIndicatorModel().load(indicatorId, {
            success: function(_indicator) {

            }
        });
    },
    
    
    /**
     * Save new indicator into server
     * @param {indicatorModel} indicatorModel
     * @returns {null} 
     */
    save: function(indicatorModel){
        if(!indicatorModel){
            throw new Error('[IndicatorManager.save] indicator is null or empty!');
        }
        
        delete indicatorModel.data.id;
        
        if(indicatorModel.data.authorName === ''){
            indicatorModel.data.authorName = 'Unknown'; //TODO get user
        }
        
        //indicatorModel.data.dashboardIds = dashboardIds;
        indicatorModel.data.authorName = Ext.encode(indicatorModel.data.authorName); 
        indicatorModel.data.creationDate = Ext.Date.format(new Date(), 'c');
        indicatorModel.data.dataBinding = Ext.encode(indicatorModel.data.dataBinding);
        
        if(!indicatorModel.data.name){
            indicatorModel.data.name = Ext.encode(indicatorModel.data.dataBinding.title);
        }
        
        indicatorModel.save({
            success: function(_indicator, response) {
                
                indicatorModel.data.id = Ext.decode(response._response.responseText).data.id;
                indicatorModel.data.dataBinding = Ext.decode(indicatorModel.data.dataBinding);
                
                Dashboard.tool.Utilities.info('[Dashboard.manager.IndicatorManager.save] save and read success : indicator.id: '+ indicatorModel.data.id);
            
                try{
                    var widget = Dashboard.view.indicator.IndicatorController.buildIndicator(indicatorModel);
                }catch(ex){
                    Dashboard.tool.Utilities.info('[Dashboard.manager.IndicatorManager.save] building error: '+ ex);
                }
                
                try{
                    Dashboard.manager.DashboardEditorManager.addIndicator(widget);
                    Dashboard.manager.DashboardEditorManager.updateIndicatorsPosition();
                }catch(ex){
                    Dashboard.tool.Utilities.info('[Dashboard.manager.IndicatorManager.save] adding scene error: '+ ex);
                }
                
                Dashboard.tool.Utilities.info('[Dashboard.manager.IndicatorManager.save] indicator added into scene :'+ indicatorModel.data.id);
            }
        }); 
    },
    

    
    /**
     * Update indicator into server
     * @param {indicator} indicatorModel
     * @returns {undefined}
     */
    update: function(indicatorModel){
        if(!indicatorModel){
            throw new Error('[IndicatorManager.update] indicator is null or empty!');
        }
        
        indicatorModel.data.dataBinding = Ext.encode(indicatorModel.data.dataBinding);
                
        indicatorModel.save({
            success: function(_indicator, response) {
                
                indicatorModel.data.dataBinding = Ext.decode(indicatorModel.data.dataBinding);
                Dashboard.manager.DashboardEditorManager.refreshIndicator(indicatorModel);
            }
        });
    },
    
    
    /**
     * Destroy poor indicator violently and badly.
     * Confirmation : view side
     * @param {type} indicator
     * @returns {undefined}
     */
    deleteIndicator: function(indicator){
        if(!indicator){
            throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] indicator is null or empty!');
        }

        var indicatorModel = Ext.create('Dashboard.model.Indicator', {
            id:indicator.serverId
        });

        indicatorModel.erase({
            success: function(_indicator) {
                Dashboard.manager.DashboardEditorManager.removeIndicator(indicator);      
            }
        });
           
    },

    
    /**
     * 
     * @param {type} indicatorType
     * @returns {undefined}
     */
    displayIndicatorEditor: function(indicatorType, indicator){
        if(!indicatorType){
            throw new Error('[IndicatorManager.displayIndicatorEditor] param indicatorType is null or empty!');
        }
        
        var editorWindow = null;
        
        switch(indicatorType){
            
            case 'POST_IT':
                editorWindow = Dashboard.view.indicator.PostItEditorController.createWidgetEditor();
                break;
                
            case 'DONUT':
                editorWindow = Dashboard.view.indicator.DonutEditorController.createWidgetEditor();
                break;
                
            case 'PIE':
                editorWindow = Dashboard.view.indicator.PieEditorController.createWidgetEditor();
                break;
                
            case 'BAR_GRAPH':
                editorWindow = Dashboard.view.indicator.BarGraphEditorController.createWidgetEditor();
                break;
                
            case 'VERTICAL_BAR_GRAPH':
                editorWindow = Dashboard.view.indicator.VerticalBarGraphEditorController.createWidgetEditor();
                break;
                    
            case 'STACKED_BAR_GRAPH':
                editorWindow = Dashboard.view.indicator.StackedBarGraphEditorController.createWidgetEditor();
                break;
                
            case 'LINE':
                editorWindow = Dashboard.view.indicator.LineEditorController.createWidgetEditor();
                break;

        }
       
        if(editorWindow){
            editorWindow.show();
        }
        
    }

    
}, function(){
    //Dashboard.tool.Utilities.trace('Class loaded :  Dashboard.manager.IndicatorManager');
});


