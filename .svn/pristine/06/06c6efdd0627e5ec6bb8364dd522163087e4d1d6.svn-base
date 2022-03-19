
/* global Ext */

Ext.define('Dashboard.view.operation.receivings.Create', {
    extend: 'Ext.window.Window',
    xtype: 'receivingsCreate',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.operation.receivings.materialsForm',
        'Dashboard.view.operation.receivings.materialsSetsForm'
    ],
    
    controller: 'operationReceivingsMain',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 550,
    iconCls: 'fa fa-plus-circle',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    currentUser:null,

    initComponent: function() {
        
        this.title = getText('Receive');
        
        this.locationsStore = Ext.create('Dashboard.store.administration.Locations',{
            autoLoad: false
        });
        
        var characteristicsPanel = {
            xtype: 'panel',
            border: false,
            title: getText('Receiving'),
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'radiogroup',
                    fieldLabel: getText('Type'),
                    items: [
                        { 
                            boxLabel: getText('Identified items'),
                            name: 'identifiedItem',
                            inputValue: true,
                            checked: true
                        },{ 
                            boxLabel: getText('Materials sets'),
                            name: 'identifiedItem',
                            inputValue: false
                        }                       
                    ],
                    listeners:{
                        scope : this,
                        change: function( me , newValue , oldValue , eOpts ){
                            
                            var form = me.up('form').down('container[reference=list]');
                            form.removeAll();
                                                        
                            if(newValue.identifiedItem === true){
                                form.add({
                                    xtype: 'receivingsMaterialsForm'
                                });
                                
                            }else{
                                form.add({
                                    xtype: 'receivingsMaterialsSetsForm'
                                });
                            }
                        }
                    }
                }, {
                    xtype: 'autocompleteComboBox',
                    name: 'location',
                    reference: 'location',
                    fieldLabel: getText('Address'),
                    displayField: 'address',
                    valueField: 'id',
                    allowBlank: false,
                    matchFieldWidth: true,
                    queryParam : false, //to remove param "query"
                    store: this.locationsStore,
                    forceSelection: true
                }
//                , {
//                    xtype: 'textarea',
//                    name : 'description',
//                    fieldLabel: getText('Comments')
//                }                  
            ]
        };
        
            
        this.items = [ 
            {  
                xtype: 'form',
                reference: 'form',
                bodyPadding: 6,
                border: false,
                width : 650,
                frame: true,
                referenceHolder: true,
                autoScroll: true,
                scrollable:'y',
                
                defaults:{
                    bodyPadding: 20,
                    ui: 'form-panel'
                },
                
                fieldDefaults: {
                    labelWidth: 112,
                    width: 300,
                    msgTarget: 'side',
                    labelSeparator: getText(':')
                },
                
                items : [
                    characteristicsPanel,
                    {
                        xtype: 'container',
                        reference: 'list',
                        items:[
                            {
                                xtype: 'receivingsMaterialsForm'
                            }
                        ]
                    }
                ]
            }
        ];
        
        
        this.buttons = [
            {
                text: getText('Save'),
                action: 'save'
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
     * @return (object) data encoded to jSon
     */
    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues(); 
        
        var data = null;

        if(values.identifiedItem === true){
            data = this.getMaterials(values);
        }else{
            data = this.getMaterialsSets(values);
        }
        
        return data;
    },
    
    /*
        Array[OpReceiveMaterialDto {
        materialId (integer, optional),
        locationId (integer, optional),
        operationDate (string, optional),
        userId (integer, optional)
        }]
        */
    getMaterials: function(values){
        var data = [];
        var list = this.down('receivingsMaterialsForm').getData();
        if(!list){
            return null;
        }
        Ext.each(list, function(item){
            var receipt = {
                materialId: item.id,
                locationId: values.location,
                operationDate: Ext.Date.format(new Date(), 'c'),
                userId: this.currentUser.data.id
            };
            data.push(receipt);
        }, this);
        
        return data;
    },
    
    /*
        Array[OpReceiveMaterialSetDto {
        productReferenceId (integer, optional),
        quantity (integer, optional),
        locationId (integer, optional),
        operationDate (string, optional),
        userId (integer, optional)
    }]
    */
    getMaterialsSets: function(values){
        var data = [];
        var list = this.down('receivingsMaterialsSetsForm').getData();
        if(!list){
            return null;
        }
        Ext.each(list, function(item){
            
            if(!item.data.quantity){
                item.data.quantity = 1;
            }
            
            var receipt = {
                productReferenceId: item.data.id,
                quantity: item.data.quantity,
                locationId: values.location,
                operationDate: Ext.Date.format(new Date(), 'c'),
                userId: this.currentUser.data.id
            };
            data.push(receipt);
        }, this);
        
        return data;
    },
    
    
    getInvalidFields: function (){

        var invalidFields = [];
        Ext.suspendLayouts();

        this.down('form').getForm().getFields().filterBy(function (field){
            if (field.validate())
                return;
            invalidFields.push(field);
        });

        Ext.resumeLayouts(true);
        var messages = [];

        for (var i = 0; i < invalidFields.length; i++) {
            messages.push(invalidFields[i].fieldLabel + " > " + invalidFields[i].activeErrors[0]);
        }

        Ext.Msg.show({
            title: getText('Errors'),
            message: messages.join('<br>'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });

        return invalidFields;
    }

});   