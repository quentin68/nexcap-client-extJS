/*  global Ext  */

Ext.define('Dashboard.view.shared.component.AutocompleteComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'autocompleteComboBox',
    
    name: null,
    fieldLabel: null,
    displayField: null,
    store: null,
    
    typeAhead: true,
    minChars: 1,
    editable: true,
    queryMode: 'remote',
    enableKeyEvents: true,
    labelWidthAuto: false,
    filter: [],
    
    initComponent: function () {
        var me = this;
        
        if(this.labelWidthAuto){
            var tm = new Ext.util.TextMetrics();
            me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
            tm.destroy();
        }
        
        this.labelSeparator = getText(':');
        
        this.getStore().on({
            'load': function(me , newValue , oldValue , eOpts){
                me.getProxy().extraParams.filter = [];
                if (me.sorters) {
                    me.sorters.clear();
                }
             }
        });
        
        me.callParent(arguments);
    },
            
    listeners:{
        'beforequery' : function( me ){
                        
            me.combo.store.setSorters({ // Sort alphabetically
                property: me.combo.displayField,
                direction: 'ASC'
            });

            var filters = [];

            if (this.filter.length > 0) {
                Ext.each(this.filter, function (filter) {
                    filters.push(filter);
                }, this);
            }

            if (me.query) {
                
                var autoCompleteFilter = {
                    'property': me.combo.displayField,
                    'value': me.query,
                    'type': 'STRING',
                    'comparison': 'CONTAINS'
                };
                
                if(me.combo.store.getProxy().actionMethods.read === 'GET'){
                    me.combo.store.getProxy().extraParams.fp = me.combo.displayField;
                    me.combo.store.getProxy().extraParams.fc = 'CONTAINS';
                    me.combo.store.getProxy().extraParams.fv = me.query;
                    me.combo.store.getProxy().extraParams.ft = 'STRING';
                    
                }else{
                    filters.push(autoCompleteFilter);
                    me.combo.store.getProxy().extraParams.filter = filters;
                }
                
            }else{
                if(me.combo.store.getProxy().extraParams){
                    me.combo.store.getProxy().extraParams.filter = [];
                }
            }
        }//,
//                 'change' : function( me , newValue , oldValue , eOpts){
//                }

    },
    
    
    getSecurValue: function(){
                
        //displayField = me.displayField,
         var record = this.store.findRecord(displayField, this.getRawValue());
 
        if (record) {
            var newValue = record.get(displayField);

        }
    }
    
});

