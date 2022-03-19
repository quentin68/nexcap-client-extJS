Ext.define('Ux.NumberField', {
    extend: 'Ext.form.field.Number',
    xtype: 'ux-numberfield',
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelSeparator = getText(':');
        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

