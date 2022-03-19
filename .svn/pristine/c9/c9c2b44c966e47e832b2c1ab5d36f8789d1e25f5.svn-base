Ext.define('Ux.Panel', {
    extend : 'Ext.panel.Panel',
    xtype  : 'ux-panel',

    onRender : function() {
        this.callParent(arguments);

        this.el.on('click', this.onClick, this);
    },

    onClick : function(e, t) {
        this.fireEvent('click', this, e, t);
    }
});