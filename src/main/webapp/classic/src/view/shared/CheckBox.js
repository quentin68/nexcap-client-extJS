Ext.define('Ux.CheckBox', {
    extend: 'Ext.form.field.Checkbox',
    xtype: 'ux-checkBox',
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelSeparator = getText(':');
        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

