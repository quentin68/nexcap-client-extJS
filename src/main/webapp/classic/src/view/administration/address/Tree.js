
Ext.define('Dashboard.view.administration.address.Tree', {
    extend: 'Ext.tree.Panel',
    xtype: 'addressTreePanel',
    
    requires: ['Dashboard.tool.Utilities'],
    
    reference: 'addressTreePanel',
    rootVisible: false,
    useArrows: true,
    multiSelect: true,
    border: false,
    autoHeight: true,

    bufferedRenderer: false,
    animate: true,
    
    store: Ext.create('Dashboard.store.administration.PositionsTree'),
    
    listeners:{
        checkchange : function(node, checked) {
            node.cascadeBy(function(n){
                n.set('checked', checked);
            });
        }
    },  
    
//    columns: [{
//        xtype: 'treecolumn',
//        header: 'Name', 
//        dataIndex: 'name',
//        flex: 1
//    }],

    initComponent: function() {
        
        this.store.load();
        
        var me = this;
        
        Ext.apply( me, {

        } );

        this.callParent(arguments);
    }    
}); 