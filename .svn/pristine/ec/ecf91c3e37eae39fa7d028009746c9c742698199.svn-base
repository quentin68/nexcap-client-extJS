/* global Ext  */

Ext.define('Dashboard.manager.DataCollectionManager',{
    extend: 'Ext.app.Controller',
    alias: 'dataCollectionManager',
    singleton: true,
    
    requires:[
        'Dashboard.config.Config',
        'Dashboard.model.StatisticRequest'
    ],
    
    models:['Dashboard.model.DataCollection'],
    
    statisticReferencesList: [],
    badStatisticReferencesList: [],
    
    dataCollectionRequest: undefined,
    
    runner: undefined,
    dataLoadingTask: undefined,
    
    widgetStatisticsList: [],
    
    
    /**
     * Build dataCollection statisticRequest object
     * @returns {statisticRequest}
     */
    getDataCollection: function(){
        
        var statistics = [];
                
        for(var i=0; i< this.statisticReferencesList.length; i++){
            if(!Ext.Array.contains(this.badStatisticReferencesList, this.statisticReferencesList[i].statisticName)){
                statistics.push(this.statisticReferencesList[i]);
            }
        }
                
        if(statistics.length < 1){
            return null;
        }
       
        this.dataCollectionRequest = Ext.create('Dashboard.model.StatisticRequest',{});
       
        this.dataCollectionRequest.data = {
            calculByType:'NOW',
            statistics: statistics,
            filters: []
        };
        
        return this.dataCollectionRequest;
        
    },
    
    
    /**
     * Enable dataCollection loading scheduler
     * @returns {undefined}
     */
    enableTimer: function(){
        
        if(this.runner !== undefined ){
            this.disableTimer();
        }
        
        var period = Dashboard.config.Config.DATAVIZ_REFRESH_PERIOD;
        
        if(period === 0){
            Dashboard.tool.Utilities.info('[Dashboard.manager.DataCollectionManager enableTimer] timer disabled');
            return;
        }
        
        this.runner = new Ext.util.TaskRunner();

        this.dataLoadingTask = this.runner.start({
            run: this.refreshDataCollection,
            scope:this,
            interval: period
        }); 
        
        Dashboard.tool.Utilities.info('[Dashboard.manager.DataCollectionManager enableTimer] timer start');
    },

    
    /**
     * Disable dataCollection loading scheduler
     * @returns {undefined}
     */
    disableTimer: function(){
        if(this.runner){
            this.runner.destroy();
        }
        Dashboard.tool.Utilities.info('[Dashboard.manager.DataCollectionManager disableTimer] timer stop');
    },
    
    
    /**
     * Scheduler task
     * @returns {undefined}
     */
    refreshDataCollection: function(){
        
        //this.getDataFromServer(null);
        
        var postItsList = Ext.ComponentQuery.query('postIt');
        Ext.each(postItsList, function(indicator) {
            indicator.getController().onRender();
        }, this);

        var donutsList = Ext.ComponentQuery.query('donut');
        Ext.each(donutsList, function(indicator) {
            indicator.getController().onRender();
        }, this);

        var piesList = Ext.ComponentQuery.query('pie');
        Ext.each(piesList, function(indicator) {
            indicator.getController().onRender();
        }, this);
    },
    

    
    getStatisticsFromServer: function(sender, record){
                
        //Find widget
        var widget = Ext.Array.findBy(this.widgetStatisticsList, function(widget, index){
            if(widget.id === record.data.id){
                return widget;
            }
        }, this);
        
        if(!widget){
            return;
        }
                
        var statistics = [];
        
        Ext.each(widget.statisticReferences, function(statistic){
            
            var stat = {
                statisticName: statistic.statisticName,
                statisticFilters: statistic.statisticFilters,
                correlationId: statistic.correlationId
            };
            statistics.push(stat);
        });
        
        var statisticRequest = Ext.create('Dashboard.model.StatisticRequest', {});
        
        if(widget.filters === undefined){
            widget.filters = [];
        }
        
        statisticRequest.data = {
            calculByType: 'NOW',
            statistics: statistics,
            filters: widget.filters
        };
        
        statisticRequest.getProxy().setUrl(
            Dashboard.config.Config.SERVER_HOST_NAME + '/statistics/calculate'
        );
        
        Dashboard.manager.StatisticManager.getStatisticsFromServer(statisticRequest, sender.getView());
        
    },
    

    /**
     * Get dataCollection object from server
     * @param {indicator} sender
     * @returns {undefined}
     */
    getDataFromServer: function(sender){
 
        var dataCollectionRequest = this.getDataCollection();
       
        //Stop if dataCollectionRequest is empty
        if(dataCollectionRequest === null){
            return;
        }
 
        dataCollectionRequest.save({
            scope:this,
            success: function(dataCollectionRequest, response) {
                Dashboard.tool.Utilities.info('[DataCollectionManager.getDataFromServer] : dataCollection loaded success');
 
                var values = response._records;
                                
                var statistics = values[0].data.statistics;
                
                try{
                    for(var i=0; i< statistics.length; i++){
                                                                       
                        var statisticName = statistics[i].statisticName;
                        var statValue = Ext.Array.findBy(values[0].data.value, function(item, index){
                            if(item.correlationId === statistics[i].correlationId){
                                return item;
                            }else{
                                return null;
                            }
                       }, this);

                       if(statValue){
                           statistics[i].value = statValue[statisticName+''];
                       }else{
                           statistics[i].value = null;
                       }                            
                    }
                }catch(ex){
                    Dashboard.tool.Utilities.error('[DataCollectionManager.getDataFromServer] error : '+ ex);
                }
               
                if(sender){
                    sender.updateValues(values);
                   
                }else{
                    var postItsList = Ext.ComponentQuery.query('postIt');
                    Ext.each(postItsList, function(indicator) {
                        indicator.getController().updateValues(values);
                    }, this);
                    
                    var donutsList = Ext.ComponentQuery.query('donut');
                    Ext.each(donutsList, function(indicator) {
                        indicator.getController().updateValues(values);
                    }, this);
                    
                    var piesList = Ext.ComponentQuery.query('pie');
                    Ext.each(piesList, function(indicator) {
                        indicator.getController().updateValues(values);
                    }, this);
                }
            },
                    
            failure: function(record, operation) {
                
                Dashboard.tool.Utilities.info('[DataCollectionManager.getDataFromServer] : statistic loaded failure');
                                
                ///var error = Ext.decode(operation.error.response.responseText).error;
                                
//                var statisticName = (error.message.split(' '))[0];
//                
//                this.removeStatisticReferencefromList(statisticName);
//                
//                if(!Ext.Array.contains(this.badStatisticReferencesList, statisticName)){
//                    this.badStatisticReferencesList.push(statisticName);
//                }

            }//,
//            callback: function(record, operation, success) {
//        
//                if(this.badStatisticReferencesList.length > 0){
//                    this.showErrors();
//                }
//                
//            }
        });
    },
    
    
//    showErrors: function(statisticName, error){
//        
//        var statistics = [];
//        
//        var postItsList = Ext.ComponentQuery.query('postIt');
//        var donutsList = Ext.ComponentQuery.query('donut');
//        var piesList = Ext.ComponentQuery.query('pie');
//        
//        var indicators = postItsList.concat(donutsList).concat(piesList);
//        
//        var statError = {
//            name: 'STATISTIC_ERROR' ,
//            code: 0,
//            message: getText('Statistic not complete'),
//            log: "name:'STATISTIC_ERROR'"
//        }; 
//
//        Ext.each(indicators, function(indicator) {
//            
//            indicator.getController().showError(statError);
//            
//        }, this);
//    
//    },
    
    
    addWidgetStatistics: function(widget){
                       
        var widgetSatistics = {
            id: widget.data.id,
            indicatorType: widget.data.indicatorType,
            name: widget.data.name,
            title: widget.data.title,
            filters: widget.data.dataBinding.filters,
            statisticReferences: []
        };
                
        var statisticsList = [];
        
        if(widget.data.indicatorType === 'POST_IT'){
            statisticsList.push(widget.data.dataBinding);
        }else{
            statisticsList = widget.data.dataBinding.statisticReferences;
        }
        
        Ext.each(statisticsList, function(statistic){
            var stat = {
                statisticName: statistic.statisticReference,
                correlationId: statistic.correlationId,
                statisticFilters: statistic.statisticFilters,
                filters: statistic.filters
            };
            widgetSatistics.statisticReferences.push(stat);
        }, this);
        
        //Find old widget
        var oldWidget = Ext.Array.findBy(this.widgetStatisticsList, function(widget, index){
            if(widget.id === widgetSatistics.id){
                return widget;
            }
        }, this);
        
        if(oldWidget){
            Ext.Array.remove(this.widgetStatisticsList, oldWidget);
        }
        
        //Add new widget
        this.widgetStatisticsList.push(widgetSatistics);
    },
    
    
    /**
     * Add statistic reference in statisticReferencesList
     * @param {object} statistic
     * @returns {undefined}
     */
    setStatisticReferencesList: function(statistic, widget){
                
        if(!statistic || !statistic.statisticReference || statistic.statisticReference.length <= 1){
            Dashboard.tool.Utilities.error('[DataCollectionManager.setStatisticReferencesList] statistic error. reference: emprty' );
            return;
        }
        
        var stat = {
            statisticName: statistic.statisticReference,
            correlationId: statistic.correlationId,
            statisticFilters: [],
            filters: []
        };
        
        if(statistic.statisticFilters){
            stat.statisticFilters = statistic.statisticFilters;
        }
        
        if(statistic.filters){
            stat.filters = statistic.filters;
        }
        
        var statFound = Ext.Array.findBy(this.statisticReferencesList, function(item, index){
            if(item.correlationId === stat.correlationId){
                item = stat;
                return item;
            }else{
                return null;
            }
        }, this);
       
        if (!statFound) {
            this.statisticReferencesList.push(stat);
        }
        
//        if ( !Ext.Array.contains(this.statisticReferencesList, stat)  ) {
//            this.statisticReferencesList.push(stat);
//        }
        
    },
            
            
    /**
     * Remove the out of date statistic
     * @param {string} statisticName
     */        
    removeStatisticReferencefromList: function(statistic){
                
        var index = -1;
        
        for(var i=0; i<this.statisticReferencesList.length; i++){
            if(this.statisticReferencesList[i].correlationId === statistic.correlationId){
                index = i;
                break;
            }
        }
        
        if(index === -1){
            return;
        }
        
        this.statisticReferencesList.splice(index, 1);

    },
            
    
    /**
     * CleanUp list
     */
    cleanUpStatisticReferencesList: function(){
        this.disableTimer();
        this.statisticReferencesList = [];
        
        this.extractStatisticReferences('postIt');
        this.extractStatisticReferences('pie');
        this.extractStatisticReferences('donut');
        
        if(this.statisticReferencesList.length > 0){
            this.enableTimer();
        }

    },
    
    
    extractStatisticReferences: function(indicatorTypeName){

        var list = Ext.ComponentQuery.query(indicatorTypeName);
        
        if(list.length < 1){
            return;
        }
        
        Ext.each(list, function(indicator) {
            
            var dataBinding = indicator.record.data.dataBinding;
            Ext.each(dataBinding.statisticReferences, function(statistic){
                this.setStatisticReferencesList(statistic.statisticReference);
            }, this);
            
        }, this);
        
    }
    
});


