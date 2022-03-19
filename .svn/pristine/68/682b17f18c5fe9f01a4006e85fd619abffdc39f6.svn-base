/* global Ext  */

Ext.define('Dashboard.manager.administration.FilesManager', {
    extend: 'Ext.app.Controller',
    alias: 'filesManager',
    singleton: true,

    requires: [
        'Dashboard.tool.Utilities'
    ],

    openThumbnailEditor: function (controller){
        this.closeThumbnailEditor();
        var thumbnailEditor = Ext.widget('thumbnailEdit', {
            manager: controller
        });
        thumbnailEditor.show();
    },

    closeThumbnailEditor: function (){
        var thumbEditor = Ext.ComponentQuery.query('thumbnailEdit');
        if (thumbEditor.length > 0) {
            thumbEditor[0].close();
        }
    },   

    saveThumbnail: function (modelId, modelName, callBack, scope, unsecured, url){

        if (modelId === null || modelId === undefined) {
            Dashboard.tool.Utilities.error('saveThumbnail : modelId null or undefined');
            return;
        }

        modelName = modelName.toUpperCase();

        //get image
        var selectThumbWindowsList = Ext.ComponentQuery.query('thumbnailEdit');
        if (selectThumbWindowsList.length < 1) {
            return;
        }

        var form = selectThumbWindowsList[0].down('form');
        
        var thumbSelector = Ext.ComponentQuery.query('fileuploadfield[name="thumbnailFile"]')[0];
        var fileName = thumbSelector.getValue();

        var link = '/resources/web/image/' + modelName + '/' + modelId + '/' + Ext.htmlEncode(fileName);

        if (unsecured === 'unsecured') {
            link = '/resources/web/unsecuredresource/' + modelName + '/' + Ext.htmlEncode(fileName);
        }

        if (url) {
            link = url + '/resources/web/image/' + modelName + '/' + modelId + '/' + Ext.htmlEncode(fileName);
        }

        var token;
        if (Dashboard.manager.administration.UsersManager.getToken()) {
            token = Dashboard.manager.administration.UsersManager.getToken();
        }
        else {
            token = Dashboard.manager.authentication.MyAtService.getReferenceAccessToken();
        }


        var file = thumbSelector.fileInputEl.dom.files[0];
        var data = new FormData();
        data.append('file', file);
        
        Ext.Ajax.request({
           url: Dashboard.config.Config.SERVER_HOST_NAME + link,
           rawData: data,
           callBack: callBack,
           headers: {
               'Content-Type':'multipart/form-data',
               Authorization: 'Bearer ' + token
           },
           success: function(response, result){ 
                              
               form.up('window').close();

                var url = result.url;

                if (result.callBack === 'configLoginScreenBackground') {
                    scope.configLoginScreenBackground(link, Ext.htmlEncode(fileName));
                } else if (result.callBack === 'configLoginScreenLogo') {
                    scope.configLoginScreenLogo(link, Ext.htmlEncode(fileName));
                } else if (result.callBack === 'doAfterThumbnailSaved') {
                    scope.doAfterThumbnailSaved(link, Ext.htmlEncode(fileName));
                }
           },
           failure: function(response, result){ 
                     
               //CORS patch
                var response = result.response.statusText;
                if(response.indexOf('Blocked a frame with origin') !== -1){
                    form.up('window').close();
                    if (result.callBack === 'configLoginScreenBackground') {
                        scope.configLoginScreenBackground(link, Ext.htmlEncode(fileName));
                    } else if (result.callBack === 'configLoginScreenLogo') {
                        scope.configLoginScreenLogo(link, Ext.htmlEncode(fileName));
                    } else if (result.callBack === 'doAfterThumbnailSaved') {
                        scope.doAfterThumbnailSaved(link, Ext.htmlEncode(fileName));
                    }
                }
                
                Dashboard.tool.Utilities.error('saveThumbnail : error');
           }
        });

    },
    
    /**
     * Download file from serveur
     * @param {string} url
     * @param {string} fileName
     * @param {panel} maskTarget
     */
    loadFile: function (url, fileName, maskTarget, method){
        
        if(!maskTarget){
            maskTarget = Ext.ComponentQuery.query('app_main')[0];
        }
        
        var myMask = new Ext.LoadMask({
            msg    : getText('Loading') + '...',
            target : maskTarget
        });

        myMask.show();
                        
        Ext.Ajax.request({
            binary: true,
            url: url,
            method:'GET',
            //method: method ? method : null,
            noCache: true,
            success: function(response, opts) {
                
                myMask.hide();
                
                var blob = new Blob([response.responseBytes], {
                    type: 'application/octet-stream'
                });
                
                saveAs(blob, fileName); // content, filename, [charset], [mimeType]   //Ext.exporter.File
            },
            failure: function (response, opts){
                myMask.hide();
                Dashboard.engine.ResponseManager.showFailure(response);
            }
        });
    },
    
    readPdfFile: function(url, fileName){        

        Ext.Ajax.request({
            binary: true,
            url: url,
            method: 'GET',
            success: function(response) {

                var blob = new Blob([response.responseBytes], {
                    type: 'application/octet-stream'
                });

                url = window.URL.createObjectURL(blob);
                saveAs(blob, fileName, 'UTF-8', 'application/pdf');  // 'application/octet-stream'  
            }
        });
    }


//    image reader
//    updateThumbnail: function(target){
//
//        var canvas = Ext.ComponentQuery.query('image[name="thumbnailToEdit"]')[0];
//        var file = target.getEl().down('input[type=file]').dom.files[0];
//
//        if (file.type === "image/jpeg" ||
//            file.type === "image/jpg" ||
//            file.type === "image/png" ||
//            file.type === "image/bmp" ||
//            file.type === "image/gif"){
//
//            var reader = new FileReader();
//
//            reader.onload = function (e) {
//                canvas.setSrc(e.target.result);
//            }
//
//            reader.readAsDataURL(file);
//        }
//    }
});