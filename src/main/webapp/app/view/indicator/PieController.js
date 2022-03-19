/* global Ext */

Ext.define('Dashboard.view.indicator.PieController',{
    extend: 'Dashboard.view.indicator.IndicatorController',

    alias: 'controller.pie',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.manager.DashboardEditorManager',
        'Dashboard.manager.DashboardIndicatorManager',
        'Dashboard.model.Indicator',
        'Dashboard.view.indicator.Pie'
    ],
    
    
    view:['pie'],
    
    dashboardEditorManager: Dashboard.manager.DashboardEditorManager,
    dashboardIndicatorManager: Dashboard.manager.DashboardIndicatorManager,
    
    
    /**
     * Event handler
     * @param {button} sender
     * @returns {undefined}
     */
    onEditWidget: function(sender){
        this.editWidget(sender.up('pie'));
    },


    /**
     * Edit
     * @param {indicator} indicator
     * @returns {undefined}
     */
    editWidget: function(indicator){
        
        var editorWindow = Ext.create('Dashboard.view.indicator.PieEditor',{
            action: 'EDIT',
            serverId: indicator.serverId,
            indicatorType: 'PIE',
            record: indicator.record
        });
        
        var form = editorWindow.down('form');
        form.getForm().loadRecord(indicator.record);
        form.lookupReference('size').setValue(indicator.record.data.dataBinding.size);
        form.lookupReference('height').setValue(indicator.record.data.dataBinding.height);
        
        form.down('panel[reference=propertiesSelectors]').removeAll();
        
        var dataBinding = indicator.record.data.dataBinding;
        var properties =  dataBinding.statisticReferences;
        
        for(var i = 0; i < properties.length; i++){
            editorWindow.addPropertySelector(
                properties[i].color, 
                properties[i].label,
                properties[i].statisticReference,
                properties[i].attribute,
                properties[i].correlationId
            );
        }
        
        var filters = dataBinding.filters;
        Ext.each(filters, function(filter){
            
            switch(filter.filter){
                case 'ADDRESS':
                    form.lookupReference('address').setValue(filter.value);
                    form.lookupReference('address').setDisabled(false);
                    break;
                case 'LOCATION_ID':
                var combo = editorWindow.down('combo[reference=address]');
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
            }

        });
        
        editorWindow.show(); 
        
    },
    
    refreshData: function (){
        this.onRender();
    },
    
    
    /**
     * Fire when widget render
     * @returns {undefined}
     */
    onRender: function(){
       //Dashboard.manager.DataCollectionManager.getDataFromServer(this);   
       
        Dashboard.manager.DataCollectionManager.getStatisticsFromServer(this, this.getView().record);
    },
    
    
    
    /**
     * Pushed data from dataCollection
     * @param {type} _statisticReferences
     * @returns {undefined}
     */
    updateValues: function(_statisticReferences){
        
        if(_statisticReferences === undefined){
            Dashboard.tool.Utilities.error('[PieController.updateData] statisticReferences is undefined!');
            return;
        }
        
        var badReferencesList = Dashboard.manager.DataCollectionManager.badStatisticReferencesList;
        
        var data = [];
        var references = this.getView().record.data.dataBinding.statisticReferences;
        
        for(var i= 0; i < references.length; i++ ){

            var statName  = references[i].statisticReference;
            var color = references[i].color;
            
            var statistics = _statisticReferences[0].value;
            var statistic = Ext.Array.findBy(statistics, function(item, index){
                if(item.correlationId === references[i].correlationId){
                    return item;
                }
            }, this);
            
            var value = statistic[statName +''];
            
            if(Ext.Array.contains(badReferencesList, statName)){
                var statError = {
                    name: 'STATISTIC_ERROR' ,
                    code: 0,
                    message: getText('Statistic error'),
                    log: "name:'STATISTIC_ERROR'"
                }; 
                this.showError(statError);
            }
            
            if(value !== undefined){
                var stat = {
                    label: references[i].label,
                    value: value,
                    color: color
                };
                
                data.push(stat);
            }  
        }
        
        this.getView().down('polar').getStore().setData(data);

    },
    
    
    statics: {
    
        /**
         * Build widget
         * @param {indicatorModel} indicatorModel
         * @returns {indicator} widget
         */
        buildIndicator: function(indicatorModel){
            
            if(!indicatorModel.data.id){
                throw new Error('[PieController.buildWidget] indicatorModel.data.id is null!');
            }
            
            Dashboard.manager.DataCollectionManager.addWidgetStatistics(indicatorModel);
            
//            var dataBinding =  indicatorModel.data.dataBinding;
//            
//            Ext.each(dataBinding.statisticReferences, function(statistic){
//                Dashboard.manager.DataCollectionManager.setStatisticReferencesList(statistic, indicatorModel);
//            });
            
            var data = {
                record: indicatorModel,
                serverId: indicatorModel.data.id,
                indicatorType: 'PIE',
                authorName: indicatorModel.data.authorName,
                title: indicatorModel.data.title,
                name: indicatorModel.data.name
            };

            var indicator = Ext.create('Dashboard.view.indicator.Pie', data);

            indicator.setConfiguration(indicatorModel);
            
            return indicator;
        }  
    }
    
});