Ext.define('Ux.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'ux-combo',
    
//    typeAhead: true,
//    minChars: 1,
//    editable: true,
//    queryMode: 'remote',
//    enableKeyEvents: true,
    
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelSeparator = getText(':');
        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

