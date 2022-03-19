Ext.define('Dashboard.model.StatisticRequest',{
    extend: 'Ext.data.Model',
   
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.config.Config'
    ],
   
    /**
     *
    fp : filter property : propriété sur laquelle on souhaite filtrer
    fc : filter comparison : operateur de comparaison.
        Par exemple : IS_NULL, IS_NOT_NULL, GT, LT, EQ, NE, IN,  CONTAINS, STARTSWITH, ENDSWITH.
        Pour la propriété calculby seul le filtre CONTAINS est géré pour le moment.
    fv : filter value
    ft : filter type (STRING, DATE, NUMERIC, LONG, LIST, BOOLEAN, OBJECT)
    li : limit
    st : start
    sp : sort property
    sd : sort direction (ASC, DESC)
    
     */
  
    
    fields: [
        {
            name: 'calculByType',
            type: 'string'
        }, {
            name: 'filters',
            type: 'auto'
        }, {
            name: 'statistics',
            type: 'auto'
        }, {
            name: 'fp', //filter property
            type: 'string'
        }, {
            name: 'fc', //filter comparison IS_NULL, IS_NOT_NULL, GT, LT, EQ, NE, IN,  CONTAINS, STARTSWITH, ENDSWITH
            type: 'string'
        }, {
            name: 'fv', //filter value
            type: 'string'
        }, {
            name: 'ft', //filter type (STRING, DATE, NUMERIC, LONG, LIST, BOOLEAN, OBJECT)
            type: 'string'
        }, {
            name: 'li', //paging limit
            type: 'string'
        }, {
            name: 'st', //paging start
            type: 'string'
        }, {
            name: 'sp', //sort property
            type: 'string'
        }, {
            name: 'sd', //sort direction (ASC, DESC)
            type: 'string'
        }, {
            name: 'date',
            type: 'date',
            convert: function (val) {
                try {
                    if (moment(val).isValid()) {
                        return moment(val).toDate(); // IE is crap
                    }
                    return '';
                } catch (e) {
                    return '';
                }
            }
        }, {
            name: 'calculByValue',
            type: 'string'
        }, {
            value: 'value',
            type: 'auto'
        }
      
    ],
           
    proxy :  {
       
        type: 'rest',

        headers : {},
       
        pageParam: false,
        startParam: false,
        limitParam: false,
        appendId: false,
        noCache: true,
        timeout: 30000,
        
        cors: true,
        useDefaultXhrHeader: false,
        withCredentials: true,
      
        //url: 'resources/data/dataCollections.json',
        url: Dashboard.config.Config.SERVER_HOST_NAME + '/statistics/calculate',
 
        actionMethods: {read: 'POST', create: 'POST', update: 'POST'},
        
        reader: {
            type: 'json',
            rootProperty: 'data',
            encoding: 'utf8',
            successProperty: 'success',
            totalProperty: 'total'
        },
       
        writer: {
            type: 'json',
            writeAllFields: false,
            writeRecordId: false
        },
       
        listeners: {
            exception: function(proxy, response, operation) {
                Dashboard.tool.Utilities.error(response);
               
                //Find widget
                
                //Delete bad statisticRequest
               
                //Dashboard.engine.ResponseManager.errorHandler(proxy, response, operation);
            }
        }
    }
 
});