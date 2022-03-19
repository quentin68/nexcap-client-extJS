
/*  global Ext */

Ext.define('Dashboard.engine.ExportToFile', {
    requires: ['Dashboard.tool.Utilities', 'Dashboard.engine.ResponseManager' ],
    
    statics: {
        
        /**
         * Export data to file
         * @param {string} link 
         * @param {object} data
         * @param {string} sort
         * @param {string} filter
         */
        doRequest: function (link, data, sort, filter) {

            var token;
            if (Dashboard.manager.administration.UsersManager.getToken()) {
                token = Dashboard.manager.administration.UsersManager.getToken();
            }
            else {
                token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
            }
            sort = this.cleanSort(sort.items);
            data.locale = Dashboard.config.Config.LOCALE;
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', Dashboard.config.Config.SERVER_HOST_NAME + link);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            
            xhr.withCredentials = true;
            xhr.useDefaultXhrHeader = false,
            xhr.responseType = 'text';//'blob'; //json

            xhr.onload = function (e) {
                if (this.status === 200) {
                    var blob = new Blob([this.response], {type: 'image/pdf'});
                        saveAs(blob, data.fileName + '.csv');
                } else {
                    
                    var message = getText('Failed to process');
                    if(this.response){
                        message = Ext.decode(this.response).message;
                    }
                    
                    Ext.Msg.show({
                        title: getText('Error'), 
                        msg: message,//getText('Server error'), 
                        buttons: Ext.Msg.OK, 
                        icon: Ext.Msg.ERROR
                    });
                }
            };
            
            xhr.send(JSON.stringify({
                exportParameters: data,
                sort: sort || [],
                filter: filter,
                start: 0, // ignored
                limit: 0 // ignored
            }));
           
        },
        
        
        /**
        * Download file from serveur
        * @param {string} url
        * @param {string} fileName
        * @param {string} masktarget
        */
        loadFile: function(url, fileName, masktarget){
            
            Dashboard.manager.administration.FilesManager.loadFile(url, fileName, masktarget);
            
        },
        
        /**
         * Delete unwanted params
         * @argument {array} sorts
         */
        cleanSort: function(sorts){
            if (!sorts[0]) {
                return [];
            }

            var clearnSort = [];

            sorts.forEach(function (sort) {
                clearnSort.push({
                    direction: sort._direction,
                    property: sort._property
                });
            });
            
            return clearnSort;
        },
                
                
        /**
        * Add export params to request 
        * @argument {object} main
        * @return encoded json
        */
       getExportParams: function(main){

           // Get columns list
           //var gridColumns = main.configuration.table.columns;

           var displayedColumns = main.down('viewList').down('grid').query('gridcolumn:not([hidden])');
           var badColumns = [];
           
           Ext.each(displayedColumns, function(displayedColumn, index){
               
               if(displayedColumn.ignoreExport && displayedColumn.ignoreExport === true){
                   badColumns.push(displayedColumn);
               }else if(displayedColumn.config.dataIndex === "thumbnailName"){
                   badColumns.push(displayedColumn);
               }
               
           });
           
           Ext.each(badColumns, function(badColumn, index){
               //Ext.Array.erase(displayedColumns, index);
               Ext.Array.remove(displayedColumns, badColumn);
           });
           
           var columns = [];

           Ext.each(displayedColumns, function(_column){
                if (_column.dataIndex !== "") { // check and thumbnail columns
                    var column = {};
                    if (_column.dataIndex === 'properties' && _column.propertyName !== undefined) {
                        column = {
                            header: _column.text,
                            column: _column.propertyName,
                            width: _column.width
                        };
                    } else {
                        column = {
                            header: _column.text,
                            column: _column.dataIndex,
                            width: _column.width
                        };
                    }
                    columns.push(column);
                }
           });

           var request = ({
                   'originalRequest': main.store.getProxy().extraParams.subRequest,
                   'title': Dashboard.config.Config.TITLE,
                   'subtitle': main.title,
                   'fileName': main.title,
                   'fileFormat':'CSV',
                   'columns':columns
               });

           return request;
       },
       
       
       exportToPdf: function(specificCheckId, familyRequest, subRequest){

           var token;
           if (Dashboard.manager.administration.UsersManager.getToken()) {
               token = Dashboard.manager.administration.UsersManager.getToken();
           }
           else {
               token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
           }
            
            // Create new query
            var form = new Ext.FormPanel({
                url: Dashboard.config.Config.SERVER_HOST_NAME,
                cors: true,
                useDefaultXhrHeader: false,
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + token
                },
            
                method: 'POST',
                type: 'ajax',
                timeout : 119000,
                noCache: true
            });

            Ext.Msg.wait('Veuillez patienter, export en cours...','Export');

            form.getForm().submit({
                scope: this,
                params:{
                    familyRequest: familyRequest,
                    subRequest: subRequest,
                    lang: Dashboard.config.Config.LOCALE,
                    exportFormat: Dashboard.config.Config.EXPORT_FORMAT,
                    encoding: Dashboard.config.Config.ENCODING,
                    data: Ext.encode(data),
                    sort: Ext.encode(sort),
                    filter: Ext.encode(filter)
                },
                success: function(form, action) {

                    var fileName = action.result.data[0].fileName;
                    var filePath = action.result.data[0].filePath;
                    
                    if(fileName === undefined || filePath === undefined){
                        Ext.Msg.show({
                            title:getText('Error'),
                            msg: getText('Export failed !'),
                            buttons: Ext.Msg.ERROR,
                            icon: Ext.Msg.INFO
                        });
                        return;
                    }else{

                        // Download export file
                        this.loadFile(filePath, fileName, filePath);

                        Ext.Msg.show({
                            title:getText('Success'),
                            msg: getText('Export successful !'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                },
                failure: function(form, action) {
                    Dashboard.engine.ResponseManager.showFailure(action);
                }
            }); 
        }
 
    }// end static
    

});   