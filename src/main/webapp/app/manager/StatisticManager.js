/* global Ext  */

Ext.define('Dashboard.manager.StatisticManager', {
    extend: 'Ext.app.Controller',
    alias: 'statisticManager',
    singleton: true,
    
    requires:[
        'Dashboard.tool.DateTime'
    ],
    
    
    /**
     * Do server request
     * @param {type} statisticRequest
     * @param {type} sender
     * @returns {undefined}
     */
    getStatisticsFromServer: function(statisticRequest, sender){
        
        //Stop if statisticRequest is empty
        if(statisticRequest === null){
            return;
        }
                
        statisticRequest.save({
            success: function(record, operation) {
                Dashboard.tool.Utilities.info('[StatisticManager.getStatisticsFromServer] : statistic loaded success');
                
                var statistics = Ext.decode(operation._response.responseText).data;
                
                if(sender){
                    try{
                        sender.getController().updateValues(statistics);
                    }catch(ex){
                        console.log('getStatisticsFromServer - exception: ' + ex);
                    }
                    
                }
            },
            
            failure: function(record, operation) {
                Dashboard.tool.Utilities.info('[StatisticManager.getStatisticsFromServer] : statistic loaded failure');
                var error = null;
                
                try{
                                        
                    var response = operation.error.response.responseText;
                    
                    if(response && response !== ''){
                        response = Ext.decode(operation.error.response.responseText);
                        error = response.error;
                    }else{
                        
                        var errorMsg = operation.error.statusText;
                        
                        if(!errorMsg || errorMsg === ''){
                            errorMsg = getText('Server error');
                        }
                        
                        error = {
                            name: 'SERVER_ERROR' ,
                            code: operation.error.status,
                            message: operation.error.statusText,
                            log: "name:'SERVER_ERROR'"
                        };
                    }
                
                    if(sender){
                        sender.getController().showError(error);
                    }
                
                }catch(ex){
                    Dashboard.tool.Utilities.error('[StatisticManager.getStatisticsFromServer] : statistic loaded failure');
                }
                
                
            },
            
            callback: function(record, operation, success) {
                // do something whether the save succeeded or failed.
            }
        });

    },
    
    getStatisticFiltersList: function(){
        
        var filters = [
            {name:'START_DATE', label: getText('Start date')},
            {name:'END_DATE', label: getText('End date')},
            {name:'PERIOD', label: getText('Period')},
            {name:'ADDRESS', label: getText('Address')},
            {name:'LOCATION_ID', label: getText('Location')},
            {name:'MATERIAL', label: getText('Item')},
            {name:'REFERENCE', label: getText('Reference')},
            {name:'CATEGORY', label: getText('Category')},
            {name:'DEVICE', label: getText('Device')},
            {name:'LIMIT', label: getText('Limit')},
            {name:'SORTED', label: getText('Sorted')}
        ];
        
        return filters;
    },
    
    
    /**
     * Enums
     */
    statics: {
        
        
        STATISTIC_REQUEST_FILTER:{
            FILTER_PROPERTY: 'fp',
            FILTER_COMPARISON: 'fc',
            FILTER_VALUE: 'fv',
            FILTER_TYPE: 'ft',
            PAGING_LIMIT: 'li',
            PAGING_START: 'st',
            SORT_PROPERTY: 'sp',
            SORT_DIRECTION: 'sd'
        },
        
        FILTER_TYPE: {
            STRING: 'STRING', 
            DATE: 'DATE', 
            NUMERIC: 'NUMERIC', 
            LONG: 'LONG', 
            LIST: 'LIST', 
            BOOLEAN: 'BOOLEAN', 
            OBJECT: 'OBJECT'
        },
        
        FILTER_COMPARISON: {
            IS_NULL: 'IS_NULL', 
            IS_NOT_NULL: 'IS_NOT_NULL', 
            GT: 'GT', 
            LT: 'LT', 
            EQ: 'EQ', 
            NE: 'NE', 
            IN: 'IN',  
            CONTAINS: 'CONTAINS', 
            STARTSWITH: 'STARTSWITH',
            ENDSWITH: 'ENDSWITH'
        },
        
        SORT_DIECTION: {
            ASC: 'ASC',
            DESC: 'DESC'
            
        }

    }

    
});