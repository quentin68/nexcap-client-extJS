/*  global Ext */

Ext.define('Dashboard.view.reference.Selector', {
    extend: 'Ext.window.Window',
    xtype: 'referenceSelector',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.administration.reference.GridPanel',
        'Dashboard.view.administration.reference.NotIdentifiedGridPanel'
    ],

    iconCls: 'iconBox',
    closable : false,
    closeAction : 'destroy',
    resizable : true,
    modal : true,
    record : [],
    constrain: true,
    
    parentController: null,
    
    width: 800,
    height: 600,
    minWidth: 640,
    minHeight: 480,
    layout: 'border',
        
    categoriesStore : null,
    refrencesStore : null,
    
    filterForMatertialsSets: false,

    initComponent: function() {
        
        this.title = getText('References selection');
        
        this.fieldDefaults ={
            labelWidth: 112,
            anchor: '100%',
            labelSeparator: getText(':')
        };
        
        //Stores
        var identifiedStore = Ext.create('Ext.data.Store', {
            fields: ['val', 'label'],
            data: [
                {'val': 'item', 'label': getText('Item')},
                {'val': 'set', 'label': getText('Items Set')}
            ]
        });
        
        this.categoriesStore = Ext.create('Dashboard.store.Categories', {
            autoLoad: true
        });
        
        this.refrencesForMaterialsStore = Ext.create('Dashboard.store.References', {
            autoLoad: true
        });
        
        this.referencesForSetsStore = Ext.create('Dashboard.store.References',{
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
        
        if(this.filterForMatertialsSets === true){
            this.refrencesStore = this.referencesForSetsStore;
        }else{
            this.refrencesStore = this.refrencesForMaterialsStore;
        }
        
        // Filters
        var filterButtonsPanel = {
            xtype: 'panel',
            width: '100%',
            bodyPadding: '12 6 12 12',
            layout: {
                type: 'hbox',
                pack: 'end'
            }, 
            defaults: {
                xtype: 'button',
                width: 80
            }, 
            items: [
                {
                    text: getText('Reset'),
                    margin: '0 8 0 0',
                    listeners: {
                        scope: this,
                        "click": function (ctrl, evt) {
                            this.resetForm();
                            this.updateDataStore(ctrl);
                        }
                    }
                }, {
                    text: getText('Filter'),
                    listeners: {
                        scope: this,
                        "click": function (ctrl, evt) {
                            this.updateDataStore(ctrl);
                        }
                    }
                }
            ]
        };
        
        var filterFieldsPanel = {
            xtype: 'panel',
            width: '100%',
            layout: 'vbox', 
            region: 'north',
            bodyPadding: 16,
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        padding: '0 0 10 0'
                    }, 
                    items: [
                        {
                            xtype: 'autocompleteComboBox',
                            id: 'codeReferenceGridPanelFilter',
                            fieldLabel: getText('Reference code'),
                            displayField: 'referenceCode',
                            valueField: 'referenceCode',
                            allowBlank: true,
                            queryParam: false,
                            matchFieldWidth: false,
                            store: this.refrencesStore,
                            flex: 1
                        }, {
                            xtype: 'autocompleteComboBox',
                            id: 'designationReferenceGridPanelFilter',
                            fieldLabel: getText('Designation'),
                            displayField: 'designation',
                            valueField: 'designation',
                            allowBlank: true,
                            queryParam: false,
                            matchFieldWidth: false,
                            store: this.refrencesStore,
                            flex: 1,
                            margin: '0 0 0 10'
                        }
                    ]
                }, {
                    xtype: 'panel',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'stretch'
                    }, 
                    items: [
                        {
                            xtype: 'autocompleteComboBox',
                            id: 'categoryReferenceGridPanelFilter',
                            name: 'productCategoryId',
                            reference: 'productCategoryId',
                            fieldLabel: getText('Category'),
                            displayField: 'name',
                            valueField: 'id',
                            allowBlank: true,
                            queryParam: false,
                            matchFieldWidth: false,
                            store: this.categoriesStore,
                            flex: 1,
                            listeners: {
                                beforequery: function (qe) {
                                    qe.combo.tpl = '<tpl for="."><div class="x-boundlist-item">{path}/<b>{name}</b></div></tpl>';
                                }
                            }
                        }, {
                            xtype: 'combo',
                            fieldLabel: getText('Type'),
                            id: 'typeReferenceGridPanelFilter',
                            flex: 1,
                            store: identifiedStore,
                            queryMode: 'local',
                            displayField: 'label',
                            valueField: 'val',
                            allowBlank: true,
                            margin: '0 0 0 10'
                        }
                    ]
                },
                filterButtonsPanel
            ]
        };
        
        
        var grid = {
            xtype: 'referenceGridPanel'
        };
        
        if(this.filterForMatertialsSets === true){
            grid = {
                xtype: 'referenceNotIdentifiedGridPanel'
            };
        }
        
                        
        this.items = [
            filterFieldsPanel,
            {
                xtype: 'panel',
                bodyPadding: 16,
                region: 'center',
                layout: 'fit',
                items: grid
            }
            
        ];

        this.buttons = [
            {
                text: getText('Select'),
                action: 'selectReferences',
                listeners:{ 
                    scope: this,
                    click: function( me , e , eOpts ){
                        this.parentController.onSelectReferences(me);
                    }
                }
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },   
    
    /**
     * Method used by the controller to get values
     * @return (object) data NOT encoded to jSon
     */
    getData: function(){
              
        // Get form values
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        return values; 
    },
    
    resetForm: function () {
        var codeReferenceGridPanelFilter = Ext.getCmp('codeReferenceGridPanelFilter');
        var designationReferenceGridPanelFilter = Ext.getCmp('designationReferenceGridPanelFilter');
        var categoryReferenceGridPanelFilter = Ext.getCmp('categoryReferenceGridPanelFilter');
        var typeReferenceGridPanelFilter = Ext.getCmp('typeReferenceGridPanelFilter');
     

        if (codeReferenceGridPanelFilter) {
            codeReferenceGridPanelFilter.setValue(null);
        }
        if (designationReferenceGridPanelFilter) {
            designationReferenceGridPanelFilter.setValue(null);
        }
        if (categoryReferenceGridPanelFilter) {
            categoryReferenceGridPanelFilter.setValue(null);
        }
        if (typeReferenceGridPanelFilter) {
            typeReferenceGridPanelFilter.setValue(null);
        }
    },
    
    updateDataStore: function (sender) {
        var filterList = [];

        var codeReferenceGridPanelFilter = Ext.getCmp('codeReferenceGridPanelFilter');
        var designationReferenceGridPanelFilter = Ext.getCmp('designationReferenceGridPanelFilter');
        var categoryReferenceGridPanelFilter = Ext.getCmp('categoryReferenceGridPanelFilter');
        var typeReferenceGridPanelFilter = Ext.getCmp('typeReferenceGridPanelFilter');

        if (codeReferenceGridPanelFilter && codeReferenceGridPanelFilter.value) {
            var valueString = codeReferenceGridPanelFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'referenceCode',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }

        if (designationReferenceGridPanelFilter && designationReferenceGridPanelFilter.value) {
            var valueString = designationReferenceGridPanelFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'designation',
                    value: valueString,
                    type: 'STRING',
                    comparison: 'CONTAINS'
                });
            }
        }
        
        if (categoryReferenceGridPanelFilter && categoryReferenceGridPanelFilter.value) {
            var valueString = categoryReferenceGridPanelFilter.value;
            if (valueString) {
                filterList.push({
                    property: 'productCategory.id', // check this
                    value: valueString,
                    type: 'LONG',
                    comparison: 'EQ'
                });
            }
        }

        if (typeReferenceGridPanelFilter && typeReferenceGridPanelFilter.value) {
            var valueString = typeReferenceGridPanelFilter.value.trim();
            if (valueString.length > 0) {
                filterList.push({
                    property: 'identified',
                    value: valueString === 'item' ? true : false,
                    type: 'BOOLEAN',
                    comparison: 'EQ'
                });
            }
        }
        
        var win = sender.up('window');
        
        var grid = win.down('referenceGridPanel');
        if(this.filterForMatertialsSets === true){
            grid = win.down('referenceNotIdentifiedGridPanel');
        }
        
        
        grid.setFilters(filterList);
    }
    
});   