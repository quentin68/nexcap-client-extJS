/* global Ext */
Ext.define('Dashboard.view.administration.stocks.Create', {
    extend: 'Ext.window.Window',
    xtype: 'stocksCreate',

    requires: ['Dashboard.tool.Utilities', 'Dashboard.view.shared.imagesViewer.ThumbnailEditor'],

    controller: 'stocksMain',

    layout: 'fit',
    autoShow: false,
    closable: true,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 500,
    iconCls: 'fa fa-battery-half',

    record: null,
    addressStore: null,
    categoriesStore: null,
    referencesStore: null,

    initComponent: function (){
	console.log("ini");
        this.title = getText('Create a stock level monitoring');

        this.categoriesStore = Ext.create('Dashboard.store.Categories', {
            autoLoad: false
        });

		console.log( this.categoriesStore);
        this.referencesStore = Ext.create('Dashboard.store.References', {
            autoLoad: false,
            listeners: {
                load: function (store, operation, eOpts) {
                    if (store.getProxy().extraParams.filter) {
                        store.getProxy().extraParams.filter = [];
                    }
                }
            }
        });

        this.addressStore = Ext.create('Dashboard.store.Addresses', {
            autoLoad: true
        });

        var characteristicsPanel = {

            xtype: 'panel',
            bodyPadding: 20,
            ui: 'form-panel',

            defaults: {
                labelWidth: 112,
                width: '100%',
                labelSeparator: getText(':'),
                margin: '0 0 12 0'
            },
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    name: 'productCategory',
                    fieldLabel: getText('Category'),
                    id: 'productCategoryBox',
                    forceSelection:false,
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank: false,
                    requires: ['Dashboard.model.Category'],
                    store: this.categoriesStore,
                    listeners: {
                        scope: this,
                        change: function (combo, newValue, oldValue, eOpts) {
                            
                            if(newValue === null){
                                this.referencesStore.on('beforeload', function(store){
                                    store.getProxy().extraParams.filter = [];
                                }); 
                                this.referencesStore.removeAll();
                                var productReferenceCombo = Ext.ComponentQuery.query('combobox[name=productReferenceId]')[0];
                                productReferenceCombo.setValue(null);
                            }
                        },
                        select: function (ctrl, evt){
                            this.updateComboBox(ctrl);
                        },
                        beforequery: function (qe){
                            qe.combo.tpl = '<tpl for="."><div data-qtip="{reasonNotSelectable}"' +
                                    ' class="x-boundlist-item x-combo-list-item-selectable-{hasReferences}">'
                                    + '{path}/<b>{name}</b></div></tpl>';
                        },
                        beforeselect: function (combo, record, index, eOpts){
                            return record.get('productReferenceIdList').length > 0;
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'productReferenceId',
                    fieldLabel: getText('Reference'),
                    id: 'productReferenceBox',
                    displayField: 'referenceCode',
                    queryParam: false, // to remove param "query"
                    valueField: 'id',
                    allowBlank: false,
                    requires: ['Dashboard.store.References'],
                    store: this.referencesStore,
                    listeners: {
                        scope: this,
                        "select": function (ctrl, evt){
                            this.updateComboBox(ctrl);
                        }
                    },
                    listConfig: {
                        getInnerTpl: function (){
                            return '<b>{referenceCode}</b>' + '</br>{designation}';
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'address',
                    fieldLabel: getText('Address'),
                    displayField: 'name',
                    queryParam: false,
                    valueField: 'name',
                    allowBlank: false,
                    requires: ['Dashboard.store.Addresses'],
                    store: this.addressStore,
                    listeners: {
                        scope: this,
                        "select": function (ctrl, evt){
                            this.updateComboBox(ctrl);
                        }
                    },
                    listConfig: {
                        getInnerTpl: function (){
                            return '{path}/<b>{name}</b>';
                        }
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'minLevel',
                    fieldLabel: getText('Lower threshold'),
                    anchor: '50%',
                    allowBlank: false,
                    minValue: 0,
                    //blankText: getText('At least one threshold must be filled'),
                    validator: function (value){
                        
                        var minValue = parseInt(value, 10);
                        var maxValItem = Ext.ComponentQuery.query('[name=maxLevel]');
                        var thisField = Ext.ComponentQuery.query('[name=minLevel]');
                        thisField = thisField[thisField.length - 1];
                        thisField.setValue(minValue);

                        maxValItem = maxValItem[maxValItem.length - 1];
                        var maxValue = parseInt(maxValItem.getRawValue(), 10);

                        maxValItem.clearInvalid();
                        thisField.clearInvalid();
                        // No problem with bounderies 
                        if (isNaN(maxValue) || isNaN(minValue)) {
                            return true;
                        }
                        return (maxValue >= minValue) ? true : getText('Min value can\'t be greater than Max value');
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'maxLevel',
                    fieldLabel: getText('Higher threshold'),
                    anchor: '50%',
                    allowBlank: false,
                    minValue: 0,
                    //blankText: getText('At least one threshold must be filled'),
                    validator: function (value){
                        
                        var maxValue = parseInt(value, 10);
                        var minValItem = Ext.ComponentQuery.query('[name=minLevel]');
                        var thisField = Ext.ComponentQuery.query('[name=maxLevel]');
                        thisField = thisField[thisField.length - 1];
                        thisField.setValue(maxValue);

                        minValItem = minValItem[minValItem.length - 1];
                        var minValue = parseInt(minValItem.getRawValue(), 10);

                        minValItem.clearInvalid();
                        thisField.clearInvalid();
//                        // No problem with bounderies
                        if (isNaN(maxValue) || isNaN(minValue)) {
                            return true;
                        }
                        return (maxValue >= minValue) ? true : getText('Min value can\'t be greater than Max value');
                    }
                },
                {
                  xtype: 'numberfield',
                    name: 'secuLevel',
                    fieldLabel: getText('Safe threshold'),
                    anchor: '50%',
                    allowBlank: false,
                    minValue: 0,
                    validator: function (value) {
                                    var secuValue = parseInt(value, 10);
                                    var minValItem = Ext.ComponentQuery.query('[name=minLevel]');
                                    var thisField = Ext.ComponentQuery.query('[name=secuLevel]');
                                    thisField = thisField[thisField.length - 1];
                                    thisField.setValue(secuValue);
                                    
                                    minValItem = minValItem[minValItem.length - 1];
                                    var minValue = parseInt(minValItem.getRawValue(), 10);
                                    
                                    minValItem.clearInvalid();
                                    thisField.clearInvalid();
                                    // No problem with bounderies
                                    if (isNaN(secuValue) || isNaN(secuValue)) {
                                        return true;
                                    }
                                    return (secuValue >= minValue) ? true : getText('Min value can\'t be greater than Secu value');
                                }
                }
                ]
        };

        this.items = [{
                xtype: 'form',
                referenceHolder: true,
                border: false,
                width: 700,
                height: 650,
                scrollable: 'y',
                defaults: {
                    xtype: 'panel',
                    ui: 'form-panel',
                    bodyPadding: 20,
                    border: false,
                    width: '100%'
                },
                fieldDefaults: {
                    labelWidth: 112,
                    width: '100%',
                    labelSeparator: getText(':'),
                    margin: '0 0 12 0'
                },
                items: [characteristicsPanel]
            }];

        this.buttons = [{
                text: getText('Save'),
                action: 'save'
            }, {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }];

        this.callParent(arguments);
    },


    /**
     * Clean filters
     * 
     * @argument {comboBox} ctrl ComboBox
     */
    updateComboBox: function (ctrl){
        var productCategoryCombo = Ext.getCmp('productCategoryBox');
        var productReferenceCombo = Ext.getCmp('productReferenceBox');
        switch (ctrl.name) {
            // Filter productReference combo box depending on category selected
            case 'productCategory':
                
                productReferenceCombo.setValue(null);
                                
                this.referencesStore.on('beforeload', function(store){
                    var myFilter = {
                        property: 'productCategory',
                        value: productCategoryCombo.getValue(),
                        type: 'LONG',
                        comparison: 'EQ'
                    };

                    store.getProxy().extraParams.filter.push(myFilter);
                }); 

                this.referencesStore.removeAll();
                break;

            case 'productReferenceId':
                // Fill category if refrence selected 
                var referenceId = productReferenceCombo.getValue();
                var reference = productReferenceCombo.findRecordByValue(referenceId).data;
                var categ = {
        			id : reference.productCategory.id,
        			name : reference.productCategory.name
    			};
                this.categoriesStore.add(categ);
                productCategoryCombo.setValue(reference.productCategory.id);
                break;
        }

        // switch(ctrl.name){
        // case 'productCategory':
        // //Load productReference combo box depending on category selected
        // productReferenceCombo.reset();
        // var productReferencesByProductCategoryStore = Ext.create('Dashboard.store.Categories',{
        // autoLoad: true
        // });
        // productReferenceCombo.setData({model:"productCategory", value:productCategoryCombo.getSubmitValue()});
        // productReferenceCombo.bindStore(productReferencesByProductCategoryStore);
        // productReferenceCombo.addEventsHandlers(); //Declare again event handlers
        //
        // //Disable address combobox
        // addressCombo.reset();
        // addressCombo.disable();
        //
        // break;
        //                
        // case 'productReferenceId':
        // //Fill category combobox
        // var referenceId = productReferenceCombo.getValue();
        // var record = productReferenceCombo.findRecordByValue(referenceId).data;
        // productCategoryCombo.setValue(record.productCategoryName);
        //                
        // //Enable address combo box since one reference is selected
        // addressCombo.enable();
        //                
        // //Load address combo box depending on reference selected
        // addressCombo.reset();
        //                
        // var locationsByProductReferenceStore = Ext.create('Dashboard.store.administration.Locations',{
        // autoLoad: true,
        // listeners:{
        // "beforeload" : function(store){
        // var data = {model:"assignedLocForPositions.id", value:productReferenceCombo.getSubmitValue()};
        //                            
        // store.getProxy().extraParams.data = Ext.encode(data);
        //                            
        // //Add filter in the store loaded in the combobox
        // var filter;
        //
        // if (addressCombo.lastQuery === '') { //Mantis 4103. Usefull when clicking on the combobox's trigger when the form is first display
        // filter = [{property: 'name', comparison: 'CONTAINS', type: 'STRING', value: ''}];
        // } else {
        // filter = [{property: 'name', comparison: 'CONTAINS', type: 'STRING', value: addressCombo.getRawValue()}];
        // }
        //                            
        // store.getProxy().extraParams.filter = Ext.encode(filter);
        // },
        // "load" : function(store){
        //
        // if(store.count() === 0 && addressCombo.getRawValue() === ""){ //If there is no reference associated to the category and nothing has been typed in the combobox
        // Ext.Msg.alert(getText('Warning'), getText('This item is not present to any address.'));
        //                                
        // //disable address combobox
        // addressCombo.disable();
        // }
        //                            
        //
        // if(store.getProxy().extraParams.data !== undefined){
        // delete store.getProxy().extraParams['data'];
        // }
        // }
        // }
        // });
        //                
        // //reset address combobox
        // addressCombo.reset();
        //               
        // addressCombo.bindStore(locationsByProductReferenceStore);
        // break;
        // default:
        // //do nothing
        // }
    },

    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function (){

        var winForm = this.down('form').getForm();
        var values = winForm.getValues();

        return values;
    }

});