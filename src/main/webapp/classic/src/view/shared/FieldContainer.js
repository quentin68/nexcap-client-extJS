Ext.define('Ux.FieldContainer', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'ux-fieldcontainer',
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

