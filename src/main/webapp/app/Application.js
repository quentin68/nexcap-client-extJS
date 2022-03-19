/* global Ext  */

/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.Loader.setConfig({ enabled: true });
// enable state
Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
    expires:new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7)) //7 days from now
}));
/*
* Before localization management
* @param (string) key 
*/
function getText(key, context){
   return Dashboard.manager.TranslationsManager.getTranslation(key, context);
};


Ext.define('Dashboard.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Dashboard',
    
    TOKEN: null,
    
    requires: [

        'Dashboard.view.main.MainPanel',
        'Dashboard.view.authentication.LoginScreen',
        
        /* singletons */
        'Dashboard.manager.TranslationsManager',
        'Dashboard.manager.ConfigurationManager',
        'Dashboard.manager.DashboardSceneManager',
        'Dashboard.manager.MainMenuManager',
        'Dashboard.manager.DashboardEditorManager',
        'Dashboard.manager.IndicatorManager',
        'Dashboard.manager.DataCollectionManager',
        'Dashboard.manager.StatisticManager',
        'Dashboard.manager.BaseManager',
        'Dashboard.manager.cartography.CartographyManager',
        'Dashboard.manager.authentication.MyAtService'
    ],
    
    controllers: [
         
    ],

    stores: [

    ],
    
    models: [
       
    ],
    
    profiles: [
        'Desktop',
        'Tablet',
        'Phone'
    ],
    
    
    init: function () {
        Ext.enableAria = false;
        Ext.enableAriaButtons = false;
        Ext.enableAriaPanels = false;
    },


    
    launch: function () {
        //alert(Ext.os.deviceType);
        
        this.extjsOverriding();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    
    extjsOverriding: function(){
        
        /**
        * Add a vtype file, usefull for filefield to check file extension (pdf)
        */            
        Ext.apply(Ext.form.field.VTypes, {    
            //  vtype validation function
            file : function(val, field) {
                var fileName = /^.*\.(pdf)$/i;
                return fileName.test(val);
            },

            // vtype Text property to display error Text
            // when the validation function returns false
            fileText : getText('File must be in .pdf format.'),

            // vtype Mask property for keystroke filter mask
            fileMask : /[a-z_\.]/i 
        });  
        
        /**
        * Add a vtype file, usefull for filefield to check file extension (zip)
        */            
        Ext.apply(Ext.form.field.VTypes, { 
            
            zipFile : function(val, field) {
                var fileName = /^.*\.(zip)$/i;
                return fileName.test(val);
            },
            zipFileText : getText('File must be in .zip format.')
        });  
        
        /**
        * Add a vtype file, usefull for filefield to check file extension (csv)
        */    
        Ext.apply(Ext.form.field.VTypes, {    
            //  vtype validation function
            csvFile : function(val, field) {
                var fileName = /^.*\.(csv)$/i;
                return fileName.test(val);
            },

            // vtype Text property to display error Text
            // when the validation function returns false
            csvFileText : getText('File must be in .csv format.'),

            // vtype Mask property for keystroke filter mask
            csvFileMask : /[a-z_\.]/i 
        }); 
        
        
//        Ext.apply(Ext.form.field.VTypes, {
//            
//            spreadsheetFile: function(val, field) {
//                                
//                var fileName = /^.*\.(csv|xls|xlsx)$/i;
//                return fileName.test(val);
//            },
//            spreadsheetFileText: (getText('This file must be in spreadsheet format')) + ' (.csv, .xls, .xlsx).'
//        });
        

        /**
        * Add a image file extention vtype
        */
        Ext.apply(Ext.form.field.VTypes, {
            imageFile: function(val, field) {
                var fileName = /^.*\.(jpg|jpeg|gif|png|bmp)$/i;
                return fileName.test(val);
            },
            // vtype Text property to display error Text
            // when the validation function returns false
            imageFileText: (getText('This file must be an image')) + ' (.jpg, .png, .gif, .bmp).'

        });


        /**
        * Add a Interger vtype
        */
        Ext.apply(Ext.form.field.VTypes, {
            integer: function(v) {
                return this.integerVal.test(v);
            },
            integerVal: /^[0-9]+$/i,
            integerMask: /[0-9]/,
            integerText: getText('This field can only contain integers.') //Must be an integer 
        });
        
        
        Ext.apply(Ext.form.field.VTypes, {
            numeric: function(v){
                return this.numericRe.test(v);
            },
            numericRe: /^[0-9]+$/i,
            numericMask: /[0-9]/,
            numericText: getText('This field can only contain numeric characters.')
        });
        
        
        /**
         * Add alphanumeric type
         */
        Ext.apply(Ext.form.field.VTypes, {
            alphanumeric: function (v) {
                return this.alphanumericVal.test(v);
            },
            alphanumericVal: /^[A-Za-z0-9]+$/i,
            alphanumericMask: /[A-Za-z0-9]/,
            alphanumericText: getText('This field can only contain alphanumeric characters.')
        });
        
        
//        
//        
//        Ext.override(Ext.scroll.Scroller, {
//            scrollIntoView: function(el, hscroll, animate, highlight) {
//                var me = this,
//                    position = me.getPosition(),
//                    newPosition;
//                if (el) {
//                    newPosition = me.getScrollIntoViewXY(el, hscroll);
//                    if (newPosition.y !== position.y || newPosition.x !== position.x) {
//                        if (highlight) {
//                            me.on({
//                                scrollend: 'doHighlight',
//                                scope: me,
//                                single: true,
//                                args: [
//                                    el,
//                                    highlight
//                                ]
//                            });
//                        }
//                        // Disabled this, but not sure what effect this is going to have.
//                        // This prevents the grid from scrolling the cell you are editing to the far right of the screen
//                        // me.doScrollTo(newPosition.x, newPosition.y, animate); 
//                         //me.doScrollTo(newPosition.x, newPosition.y, animate);
//                    }
//                    else if (highlight) {
//                        me.doHighlight(el, highlight);
//                    }
//                }
//            }
//        });
                
    }
    
});
