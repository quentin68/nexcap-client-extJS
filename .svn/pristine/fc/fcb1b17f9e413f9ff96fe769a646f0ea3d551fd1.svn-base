Ext.define('Ux.TimeField', {
    extend: 'Ext.form.field.Time',
    xtype: 'ux-timefield',
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelSeparator = getText(':');
        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

