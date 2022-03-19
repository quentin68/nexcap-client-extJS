Ext.define('Ux.TagField', {
    extend: 'Ext.form.field.Tag',
    xtype: 'ux-tagfield',
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

