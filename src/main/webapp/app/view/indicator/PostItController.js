/* global Ext */

Ext.define('Dashboard.view.indicator.PostItController',{
    extend: 'Dashboard.view.indicator.IndicatorController',
    alias: 'controller.postIt',
    
    require:[
        'Dashboard.config.Config',
        'Dashboard.view.indicator.PostIt',
        'Dashboard.view.indicator.PostItEditor'
    ],
    
    view:['postIt'],


    /**
     * Event handler
     * @param {button} sender
     * @returns {undefined}
     */
    onEditWidget: function(sender){
        this.editWidget(sender.up('postIt'));
    },
    
    
    /**
     * Edit
     * @param {indicator} indicator
     * @returns {undefined}
     */
    editWidget: function(indicator){
        
        var editorWindow = Ext.create('Dashboard.view.indicator.PostItEditor',{
            serverId: indicator.serverId,
            action: 'EDIT',
            record: indicator.record,
            indicatorType: 'POST_IT'
        });
        
        var form = editorWindow.down('form');
        form.getForm().loadRecord(indicator.viewModel);
        editorWindow.down('ux-img').setSrc(indicator.viewModel.data.icon);
        editorWindow.down('hiddenfield[name=correlationId]').setValue(indicator.viewModel.data.correlationId);
                 
        var dataBinding = indicator.record.data.dataBinding;
        
        var filters = dataBinding.filters;
                
        Ext.each(filters, function(filter){
            
            switch(filter.filter){
                
                case 'LOCATION_ID':
                                                                                                    
                var combo = editorWindow.down('combo[reference=address]');
                combo.setValue(filter.value);
                combo.setDisabled( false );
                
                var store = editorWindow.addressStore;
                                                
                if(filter.value === null){
                    
                    //var store = combo.getStore();
                                        
                    var notAny = Ext.create('Dashboard.store.administration.Locations',{
                        name: '* ' + getText('Without address') + ' *',
                        id: 0
                    });
                    store.add(notAny);
                    
                    var record = combo.findRecordByValue(0);
                    combo.select(record);
                    
                }else{
                    
                    store.getProxy().extraParams.filter = [];
                    var myFilter = {
                        property: 'id',
                        value: filter.value,
                        type: 'LONG',
                        comparison: 'EQ'
                    };
                    store.getProxy().extraParams.filter.push(myFilter);
                                        
                    //var store = combo.getStore();
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
        editorWindow.down('ux-panel').body.setStyle('background', indicator.viewModel.data.color);
        
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
        var record = this.getView().record;
        
        var statisticReferences = [];
        statisticReferences.push(record.data.dataBinding);
        record.data.dataBinding.statisticReferences = statisticReferences;
        
        
        Dashboard.manager.DataCollectionManager.getStatisticsFromServer(this, this.getView().record);

    },
    
    
    updateValues: function(statisticReferences){
                
        if(statisticReferences === undefined){
            Dashboard.tool.Utilities.error('[PostItController.updateData] statisticReferences is undefined!');
            return;
        }
        
        var statName = this.getView().viewModel.data.statisticReference;
        var correlationId = this.getView().viewModel.data.correlationId;
        
        var statistics = statisticReferences[0].value;
        var statistic = Ext.Array.findBy(statistics, function(item, index){
            if(item.correlationId === correlationId){
                return item;
            }
        }, this);
        
        var value = statistic[statName +''];
                
        if(statName === undefined){
            Dashboard.tool.Utilities.error('[PostItController.updateData] statisticReferenceName is undefined!');
            return;
        }

       // if(! statistic || statistic.value === undefined){
        //    Dashboard.tool.Utilities.error('[PostItController.updateData] statistic value is undefined!');
        //    //TODO manage error
        //    return;
        //}
                        
        this.getView().viewModel.setData(
            {
                value: value
            }
        );

    },
    
    
    statics: {

        /**
         * Build widget
         * @param {indicatorModel} indicatorModel
         * @returns {PostIt} widget
         */
        buildIndicator: function(indicatorModel){
            
            if(!indicatorModel.data.id){
                throw new Error('[PostItController.buildWidget] indicatorModel.data.id is null!');
            }
            
            Dashboard.manager.DataCollectionManager.addWidgetStatistics(indicatorModel);
            
            var dataBinding = indicatorModel.data.dataBinding;
//            
//            Dashboard.manager.DataCollectionManager.setStatisticReferencesList(dataBinding, indicatorModel);
            
            var indicator = Ext.create('Dashboard.view.indicator.PostIt',{
                record: indicatorModel,
                serverId: indicatorModel.data.id,
                indicatorType: 'POST_IT',
                authorName: indicatorModel.data.authorName,
                viewModel: {
                    data: dataBinding
                }
                
            });
            
            var width = Dashboard.tool.Ihm.getIndicatorWidthBySize(dataBinding.size);
            indicator.width = width;
            
            return indicator;
        }  
    }
    
});