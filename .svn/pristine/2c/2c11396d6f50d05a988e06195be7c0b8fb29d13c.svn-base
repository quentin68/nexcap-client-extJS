Ext.define('Ux.DateField', {
    extend: 'Ext.form.field.Date',
    xtype: 'ux-datefield',
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelSeparator = getText(':');
        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

