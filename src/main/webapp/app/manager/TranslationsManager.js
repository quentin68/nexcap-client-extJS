/*  global Ext */

Ext.define('Dashboard.manager.TranslationsManager', {
    extend: 'Ext.app.Controller',
    alias: 'translationsManager',
    singleton: true,

    store: Ext.create('Dashboard.store.locale.TranslationsUS'),

    getTranslation: function (msgid, context){
                        
        var text = msgid;

        if (context) {
            
            var records = [];
            
            this.store.each(function(record) {
                if (record.data.msgctx !== undefined){
                    if(record.data.msgctx === context){
                        records.push(record);
                    }
                }
            });

            for(var i=0; i< records.length; i++){
                if(records[i].data.msgid === msgid){
                    return records[i].data.msgstr;
                }
            }
        }

        text = this.store.findRecord('msgid', msgid, 0, false, true, true); // , property, value, [startIndex] , [anyMatch] , [caseSensitive] , [exactMatch]

        if (text) {
            return text.data.msgstr;
        } else {
            Dashboard.tool.Utilities.error('Translation undefined : ' + msgid);
            return msgid;
        }
    },

    translate: function (lang){
        switch (lang) {
            case 'fr_FR':
                this.store = Ext.create('Dashboard.store.locale.TranslationsFR');
                break;

            case 'en_US':
                this.store = Ext.create('Dashboard.store.locale.TranslationsUS');
                break;
        }

    }

});