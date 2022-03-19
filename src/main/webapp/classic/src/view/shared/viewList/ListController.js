Ext.define('Dashboard.view.shared.viewList.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.list',

    init: function (view) {

    },


    renderTitleColumn: function (value, metaData, record) {

        var view = this.getView(),
            plugin = view.getPlugin('rowexpander'),
            tpl = view.titleTpl;

        if (!tpl.isTemplate) {
            view.titleTpl = tpl = new Ext.XTemplate(tpl);
        }

        var data = Ext.Object.chain(record.data);
        data.expanded = plugin.recordsExpanded[record.internalId] ? ' style="display: none"' : '';

        return tpl.apply(data);
    },
    


    //-------------------------------------------------------------------------
    // RowExpander management

    onClick: function(dv, record, item, index, e) {
        if (e.getTarget('.viewlist-toggle')) {
            var grid = this.getView(),
                plugin = grid.getPlugin('rowexpander');

            plugin.toggleRow(index, record);
        }
    },

    onExpandBody: function (rowNode) {   // , record, expandRow, eOpts
        Ext.fly(rowNode).addCls('x-grid-row-expanded');
        Ext.fly(rowNode).down('.expand').enableDisplayMode().hide();
        Ext.fly(rowNode).down('.viewlist-paragraph-simple').enableDisplayMode().hide();
        
    },

    onCollapseBody: function (rowNode) {  //, record, expandRow, eOpts
        Ext.fly(rowNode).removeCls('x-grid-row-expanded');
        Ext.fly(rowNode).down('.expand').enableDisplayMode().show();
        Ext.fly(rowNode).down('.viewlist-paragraph-simple').enableDisplayMode().show();
        
    }
});
