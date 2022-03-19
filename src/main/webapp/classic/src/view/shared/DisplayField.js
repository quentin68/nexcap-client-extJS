/* global Ext */
Ext.define('Ux.DisplayField', {
    extend: 'Ext.form.field.Display',
    xtype: 'ux-displayfield',
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();

        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});