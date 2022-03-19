Ext.define('Ux.TextField', {
    extend: 'Ext.form.field.Text',
    xtype: 'ux-textfield',
    
    initComponent: function () {
        var me = this,
            tm = new Ext.util.TextMetrics();
    
        me.labelSeparator = getText(':');
        me.labelWidth = tm.getWidth(me.fieldLabel) + 10;
        tm.destroy();

        me.callParent(arguments);
    }
});

