
/**
 * Combobox with autocompletion.
 */
Ext.define('Dashboard.shared.NXComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.NXComboBox',
    
    listConfig: {
        loadingText: getText('Search in progress...'),
        emptyText: getText('No result!')
    },

    config: {
        filter: [],
        data: undefined
    },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            typeAhead: true,
            minChars: 1,
            editable: true,
            queryMode: 'remote',
            enableKeyEvents: true//,
//            listConfig: {
//                loadingText: getText('Search in progress...'),
//                emptyText: getText('No result!')
//            }
            //forceSelection: true
        });

        this.addEventsHandlers();

        this.callParent(arguments);
    },

    /**
    * Add handlers for combobox event and store events
    */
    addEventsHandlers: function () {
        //Add handlers to combobox events        
        this.on({
            beforequery: this.onBeforequery,
            scope: this // Important. Ensure "this" is correct during handler execution
        });

        //Add handlers to store events        
        this.store.on({
            beforeload: this.onStoreBeforeload,
            load: this.onStoreLoad,
            scope: this // Important. Ensure "this" is correct during handler execution
        });
    },

    /**
    * handler for beforeload store event
    * @argument {store} store 
    */
    onStoreBeforeload: function (store) {
        //Add data in the store loaded in the combobox (getListBy)
        if (this.data !== undefined) {
            store.getProxy().extraParams.data = Ext.encode(this.data);
        }

        //Add filter in the store loaded in the combobox
        if (this.filter.length > 0) {

            Ext.each(this.filter, function (filter) {
                if (filter.fc === 'contains') {
                    if (this.lastQuery === '') { //Mantis 4137. Usefull when clicking on the combobox's trigger when the form is first display
                        filter.fv = '';
                    } else {
                        filter.fv = this.getRawValue();
                    }
                }
            }, this);

            store.getProxy().extraParams.filter = Ext.encode(this.filter);
        }
    },

    /**
    * handler for load store event
    * @argument {store} store 
    */
    onStoreLoad: function (store) {
        //Clear filter in case this store is used elsewhere
        if (store.getProxy().extraParams.filter !== undefined) {
            delete store.getProxy().extraParams['filter'];
        }
        
        // After autocomplete process, if data is empty, clear comboBox field
//        if(this.getStore() !== null) {
//            if(this.getStore().data.length < 1){
//                this.setValue(null);
//                this.setRawValue ("");
//            }
//        }
    },

    /**
    * handler for comboboc beforequery event
    * @argument {query} qe Query
    */
    onBeforequery: function (qe) {
        if (qe.combo.getValue() === null) {
            //Force store load in case combo box value is empty    
            qe.combo.getStore().load();
        }
    }
});