/* global Ext  */

Ext.define('Dashboard.view.operation.receivings.materialsSetsForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'receivingsMaterialsSetsForm',

    iconCls: 'fa fa-tag',
    reference: 'materialsSetsPanel',
    collapsible: false,
    ui: 'form-panel',
    closable: true,
    closeAction: 'destroy',
    
    materialsSelectWindow: null,

    initComponent: function (){
        
        this.setTitle(getText('Materials sets'));
        
        this.referencesStore = Ext.create('Dashboard.store.References',{
            autoLoad: false,
            listeners : {
                beforeload: function (store, filters, eOpts){
                    var myFilter = {
                        property: 'identified',
                        value: false,
                        type: 'BOOLEAN',
                        comparison: 'EQ'
                    };
                    store.getProxy().extraParams.filter.push(myFilter);
                },
                load : function (store) {
                    if (store.getProxy().extraParams.filter !== undefined) {
                        delete store.getProxy().extraParams['filter'];
                    }
                }
            }
        });

        this.materialsSetsStore = Ext.create(Ext.data.Store, {
            fields: [
                'id', 
                'referenceCode', 
                'designation', 
                'productCategoryName',
                {
                    name: 'quantity',
                    type: 'float'
                }
            ]
        });

        this.items = [
            {
                xtype: 'container',
                reference: 'materialsSetsContainer',
                items: {
                    xtype: 'grid',
                    name: 'materialsSetsGrid',
                    store: this.materialsSetsStore,
                    multiSelect: true,
                    viewConfig: {
                        stripeRows: true
                    },
                    
                    plugins: {
                        ptype: 'cellediting',
                        clicksToEdit: 1
                    },
                    
                    columns: [
                        {
                            text: getText('Ref. Code'),
                            dataIndex: 'referenceCode',
                            flex: 1
                        }, {
                            text: getText('Ref. Designation'),
                            dataIndex: 'designation',
                            flex: 1
                        }, {
                            text: getText('Category'),
                            dataIndex: 'productCategory', 
                            flex: 1,
                            renderer: function (productCategory) {
                                if (productCategory) {
                                    return productCategory.fullPath;
                                }
                                return '';
                            }
                        }, {
                            text: getText('Quantity'),
                            dataIndex: 'quantity',
                            width: 100,
                            align: 'right',
                            //formatter: 'round(5)',
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                allowDecimals:  false,
                                value: 1,
                                minValue: 1,//0.01,
                                maxValue: 999999
                            }
                        }
                    ],
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
                handler: 'onAddMaterialsSets'
            }, {
                xtype: 'button',
                ui: 'indicator',
                scale: 'small',
                iconCls: 'fa fa-minus-circle',
                hidden: false,
                border: false,
                enableToggle: false,
                scope: this,
                handler: 'onRemoveMaterialsSets'
            }
        ];

        this.callParent(arguments);
    },
    
    onRemoveMaterialsSets: function(sender){

        var grid = this.down('grid[name=materialsSetsGrid]');
        this.removeMaterialsSets(grid);
    },
    
    removeMaterialsSets: function(dataGrid){
        var selectedRows = dataGrid.getSelection();

        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        } 
        
        dataGrid.store.remove(selectedRows); 
        dataGrid.updateLayout();
    
    },
    
    onAddMaterialsSets: function(){
        this.selectWindow = Ext.create('Dashboard.view.reference.Selector', {
            autoShow: true,
            parentController: this,
            filterForMatertialsSets: true
            
        });
    },
    
    onSelectReferences: function(sender){
        
        var win = sender.up('window');
        var winGrid = win.down('referenceNotIdentifiedGridPanel');
        var selectedRows = winGrid.getSelection();
        
        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        
        var grid = this.down('grid[name=materialsSetsGrid]');
        
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
                    row.data.quantity = 1;
                    store.add(row);
                }
            });

            grid.updateLayout();
        }
        win.close();
        
    },
    
    
    getData: function(){
        
        var grid = this.down('grid[name=materialsSetsGrid]');
        var list = null;
        
        if(grid !== null){
            var store = grid.store;
            list = store.getRange();
        }

        return list;
        
    }

});