/* global Ext  */

Ext.define('Dashboard.view.operation.receivings.materialsForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'receivingsMaterialsForm',
    
    iconCls: 'fa fa-tag',
    reference: 'materialsPanel',
    collapsible: false,
    ui: 'form-panel',
    closable: true,
    closeAction : 'destroy',
    
    selectWindow: null,

    initComponent: function (){

        this.materialsStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'name', 'referenceCode', 'designation', 'category']
        });
        
        this.setTitle(getText('Items'));

        this.items = [
            {
                xtype: 'container',
                reference: 'materialsContainer',
                items: {
                    xtype: 'grid',
                    name: 'materialsGrid',
                    store: this.materialsStore,
                    multiSelect: true,
                    viewConfig: {
                        stripeRows: true
                    },
                    columns: [
                        {
                            text: getText('Name'),
                            dataIndex: 'name',
                            flex: 1
                        }, {
                            text: getText('Ref. Code'),
                            dataIndex: 'referenceCode',
                            flex: 1
                        }, {
                            text: getText('Ref. Designation'),
                            dataIndex: 'designation',
                            flex: 1
                        }, {
                            text: getText('Category'),
                            dataIndex: 'category',
                            flex: 1
                        }],
                    //height: 400,
                    width: '100%'
                }
            }
        ];

        this.tools = [
            {
                xtype: 'button',
                ui: 'indicator',
                scale: 'small',
                iconCls: 'fa fa-plus-circle',
                hidden: false,
                border: false,
                enableToggle: false,
                scope: this,
                handler: 'onAddMaterials'
            }, {
                xtype: 'button',
                ui: 'indicator',
                scale: 'small',
                iconCls: 'fa fa-minus-circle',
                hidden: false,
                border: false,
                enableToggle: false,
                scope: this,
                handler: 'onRemoveMaterials'
            }
        ];

        this.callParent(arguments);
    },
    
    onRemoveMaterials: function(sender){

        var grid = this.down('grid[name=materialsGrid]');
        this.removeMaterial(grid);
    },
    
    removeMaterial: function(dataGrid){
        var selectedRows = dataGrid.getSelection();

        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        } 
        
        dataGrid.store.remove(selectedRows); 
        dataGrid.updateLayout();
    
    },
    
    onAddMaterials: function(){
        this.selectWindow = Ext.create('Dashboard.view.administration.material.Selector', {
            autoShow: true,
            parentController: this
        });
    },
    
    onSelectMaterial: function(sender){
        
        var win = sender.up('window');
        var winGrid = win.down('materialGridPanel');
        var selectedRows = winGrid.getSelection();
        
        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        
        var grid = this.down('grid[name=materialsGrid]');
        
        if(grid !== null){
            var store = grid.store;
            Ext.each(selectedRows, function(row) {
                var found = false;
                for(var i = 0; i < store.data.items.length; i++) {
                    if (store.data.items[i].data.id === row.data.id) {
                        found = true;
                        break;
                    }
                }
                if(!found){
                    store.add(row);
                }
            });

            grid.updateLayout();
        }
        win.close();
        
    },
    
    
    getData: function(){
        
        var grid = this.down('grid[name=materialsGrid]');
        var list = null;
        
        if(grid !== null){
            var store = grid.store;
            list = store.getRange();
        }

        return list;
        
    }

});