Ext.define('Ux.TextAreaField', {
    extend: 'Ext.form.field.TextArea',
    xtype: 'ux-textareafield',
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelSeparator = getText(':');
        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

