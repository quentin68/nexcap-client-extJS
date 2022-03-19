/*  global Ext */

Ext.define('Dashboard.view.indicator.BarGraphController',{
    extend: 'Dashboard.view.indicator.IndicatorController',
    alias: 'controller.barGraph',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.manager.DashboardEditorManager',
        'Dashboard.manager.DashboardIndicatorManager',
        'Dashboard.model.Indicator',
        'dashboard.view.indicator.BarGraph',
        'dashboard.view.indicator.VerticalBarGraph'
    ],
    
    
    view:['barGraph'],
    
    dashboardEditorManager: Dashboard.manager.DashboardEditorManager,
    dashboardIndicatorManager: Dashboard.manager.DashboardIndicatorManager,
    
    
    /**
     * Event handler
     * @param {button} sender
     * @returns {undefined}
     */
    onEditWidget: function(sender){
        this.editWidget(sender.up('barGraph'));
    },


    /**
     * Edit
     * @param {indicator} indicator
     * @returns {undefined}
     */
    editWidget: function(indicator){
        
        var editorWindow = Ext.create('Dashboard.view.indicator.BarGraphEditor',{
            action: 'EDIT',
            serverId: indicator.serverId,
            record: indicator.record
        });
        
        var form = editorWindow.down('form');
        form.getForm().loadRecord(indicator.record);
        form.lookupReference('size').setValue(indicator.record.data.dataBinding.size);
        form.lookupReference('height').setValue(indicator.record.data.dataBinding.height);
        form.lookupReference('xTitle').setValue(indicator.record.data.dataBinding.xTitle);
        form.lookupReference('yTitle').setValue(indicator.record.data.dataBinding.yTitle);
        form.lookupReference('grid').setValue(indicator.record.data.dataBinding.grid);
        form.lookupReference('calculBy').setValue(indicator.record.data.dataBinding.calculByValue);
        
        form.down('panel[reference=propertiesSelectors]').removeAll();
        
        var dataBinding = indicator.record.data.dataBinding; 
        var properties =  dataBinding.statisticReferences;

        for(var i = 0; i < properties.length; i++){
            editorWindow.addPropertySelector(
                properties[i].color, 
                properties[i].label,
                properties[i].name,
                properties[i].correlationId
            );
        }
        
        var startDateValue = null;
        var endDateValue = null;
        var periodValue = null;
        
        var filters = dataBinding.filters;
        Ext.each(filters, function(filter){
            
            switch(filter.filter){
                
                case 'PERIOD':
                    form.lookupReference('period').setValue(filter.value);
                    form.lookupReference('period').setDisabled( false );
                    periodValue = filter.value;
                    break;

                case 'START_DATE':
                    form.lookupReference('fromDate').setValue(new Date(filter.value));
                    form.lookupReference('fromDate').setDisabled( false );
                    startDateValue = filter.value;
                    break;

                case 'END_DATE':
                    form.lookupReference('toDate').setValue(new Date(filter.value));
                    form.lookupReference('toDate').setDisabled( false );
                    endDateValue = filter.value;
                    break;

                case 'ADDRESS':
                    form.lookupReference('address').setValue(filter.value);
                    form.lookupReference('address').setDisabled(false);
                    break;

                case 'LOCATION_ID':
                    
                    var combo = form.lookupReference('address');    
                    combo.setValue(filter.value);
                    combo.setDisabled( false );

                    if(filter.value === null){

                        var store = combo.getStore();

                        var notAny = Ext.create('Dashboard.store.administration.Locations',{
                            name: '* ' + getText('Without address') + ' *',
                            id: 0
                        });
                        store.add(notAny);

                        var record = combo.findRecordByValue(0);
                        combo.select(record);

                    }else{

                        var store = combo.getStore();
                        
                        store.getProxy().extraParams.filter = [];
                        var myFilter = {
                            property: 'id',
                            value: filter.value,
                            type: 'LONG',
                            comparison: 'EQ'
                        };
                        store.getProxy().extraParams.filter.push(myFilter);
                        
                        store.setListeners({
                            load: function (store, operation, eOpts){
                                if (store.getProxy().extraParams.filter) {
                                    store.getProxy().extraParams.filter = [];
                                }
                            }
                        });
                        store.load();
                    }
                    break;

                case 'LIMIT':
                    form.lookupReference('limit').setValue(filter.value);
                    form.lookupReference('limit').setDisabled( false );
                    break

                case 'SORTED':
                    form.lookupReference('sortNone').setRawValue(false);
                    if(filter.value === 'ASC'){
                        form.lookupReference('sortAsc').setValue(true);
                    }else if(filter.value === 'DESC'){
                        form.lookupReference('sortDesc').setValue(true);
                    }else{
                        form.lookupReference('sortNone').setValue(true);
                    }
                    break
            }

        });
        
        if(!periodValue && startDateValue && endDateValue){
            form.lookupReference('period').setValue('DATE_TO_DATE');
        }else if(!periodValue){
            form.lookupReference('period').setValue('NONE');
        }
        
        editorWindow.show(); 
        
    },
    

    onRender: function(sender){
        
        this.refreshData();
    },
    
    
    /**
     * Force data refresh
     * @returns {undefined}
     */
    refreshData: function (){
                
        var statisticReferences = this.getView().record.data.dataBinding.statisticReferences;
        var calculBy = this.getView().record.data.dataBinding.calculByValue;
        var filters = this.getView().record.data.dataBinding.filters;
        
        var statistics = [];
        
        Ext.each(statisticReferences, function(statistic){
            
//            var statFiltersButton = statistic.down('button[name=statFilters]');
//            var statFilters = [];
//            if(statFiltersButton && statFiltersButton.hidden === false){
//                statFilters.push(statFiltersButton.filter);
//            }
            
            var stat = {
                statisticName: statistic.name,
                statisticFilters: statistic.statisticFilters,
                correlationId: statistic.correlationId
            };
            statistics.push(stat);
        });
        
        var statisticRequest = Ext.create('Dashboard.model.StatisticRequest', {});
        
        statisticRequest.data = {
            calculByType:calculBy, //DAY, WEEK
            statistics: statistics, // ["itemsborrowedcount","itemsreturnedcount"]
            filters: filters //[{"filter":"PERIOD","value":"LAST_MONTH" //"LAST_MONTH"}]
        };
        
        statisticRequest.getProxy().setUrl(
                Dashboard.config.Config.SERVER_HOST_NAME + '/statistics/calculate'
        );
        
        Dashboard.manager.StatisticManager.getStatisticsFromServer(statisticRequest, this.getView());
    
        
 },
    
    

    /**
     * Pushed data from statistics
     * @param {type} statistics
     * @returns {undefined}
     */
    updateValues: function(statistics){
                
        var references = this.getView().record.data.dataBinding.statisticReferences;
        var calculByType = this.getView().record.data.dataBinding.calculByType;
        
        Dashboard.tool.Utilities.debug('[LineController.updateValues] calculByType type :' + calculByType);
        
        var data = [];

        Ext.each(statistics, function(statistic){
            
            var name = statistic.calculByValue;
            
            if(calculByType === 'DATE' || calculByType === null && name !== 'NOW'){
                if (name && moment(name, moment.ISO_8601, true).isValid() ) {
                    var datetime =  moment(name).toDate();
                    name = Ext.Date.format(datetime, getText('m/d/Y H:i:s'));
                }
            }
            
            var record = {};
            record['name'] = name;
            
            for(var i=0; i < references.length; i++ ){
                var key = references[i].yField;
                var value = statistic.value[i][references[i].name];
                record[key] = value;
            }
            
            data.push(record);
            
        });
        
//        var data = [
//                {name: "Zqueez", v1: 34, v2: 14.0},
//                {name: "Zwa", v1: 12, v2: 15.0},
//                {name: "Bwa", v1: 94, v2: 25.0},
//                {name: "Ctock", v1: 3, v2: 43.0},
//                {name: "Mish", v1: 45, v2: 124.0},
//                {name: "Bawv", v1: 76, v2: 234.0}
//            ];
        
        try{
            
            this.getView().down('cartesian').store.loadData(data);
            this.getView().down('cartesian').redraw();
            
        }catch(ex){
            throw new Error('[LineController.updateData] set data store error! '+ ex);
        }
    },
    
    
    statics: {
    
        /**
         * Build widget
         * @param {indicatorModel} indicatorModel
         * @returns {PostIt} widget
         */
        buildIndicator: function(indicatorModel){
            
            if(!indicatorModel.data.id){
                throw new Error('[BarGraphController.buildWidget] indicatorModel.data.id is null!');
            }
            
            var dataBinding = indicatorModel.data.dataBinding;
            
            var indicator = Ext.create('Dashboard.view.indicator.BarGraph',{
                
                record: indicatorModel,
                serverId: indicatorModel.data.id,
                indicatorType: 'BAR_GRAPH',
                authorName: indicatorModel.data.authorName,
                title: indicatorModel.data.title,
                name: indicatorModel.data.name
                
            });
            
            var fields = ['name'];
            
            for(var i=0; i<dataBinding.statisticReferences.length; i++){
                fields.push('v'+i);
            }

            var store = Ext.create('Ext.data.Store', {
                fields: fields,
                data: []
            });
            
            indicator.myDataStore = store;
            indicator.setConfiguration(indicatorModel);
            
//            var width = Dashboard.tool.Ihm.getIndicatorWidthBySize(dataBinding.size);
//            indicator.width = width;
//            indicator.height = dataBinding.height;
            
//            series.setConfig({
//                "totalAngle": 270 * Math.PI / 180,
//                "minimum": 0,
//                "maximum": 150,
//                "value": 42,
//                "sectors": [
//                     {
//                         "start": 0, 
//                         "end": 25,
//                         "label": "Sector 1"
//                     },{
//                         "start": 25,
//                         "end": 100,
//                         "label": "Sector 2"
//                     },{
//                         "start": 100,
//                         "end": 150,
//                         "label": "Sector 3"
//                     }],
//                     "colors": ['black', 'green', 'yellow', 'red']
//                });
            
            return indicator;
        }  
    }
    
});