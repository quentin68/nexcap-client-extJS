/* global Ext */

Ext.define('Dashboard.view.settings.alertsConfig.Create', {
    extend: 'Ext.window.Window',
    xtype: 'alertsConfigCreate',
    
    //OLD
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.imagesViewer.ThumbnailEditor'
    ],
    
    controller: 'alertsConfigMain',

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    height: 550,
    iconCls: 'fa fa-cog',
    plain : true,
    autoScroll: true,
    scrollable:'y',

    record:null,
    
    triggerStore : null,

    initComponent: function() {
        
        this.title = getText('Create an alert');
        
        this.controlDefStore = Ext.create('Dashboard.store.settings.ControlDefinition', {
            autoLoad: false
        });
         
        var alertConfigPanel = Ext.create('Ext.panel.Panel',{
            border: false,
            title: getText('Alert'),
            reference: 'alertConfigPanel',
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: [
                {
                    xtype: 'autocompleteComboBox',
                    name: 'controlDef',
                    reference: 'controlDef',
                    fieldLabel: getText('Type of control'),
                    displayField: 'description',
                    valueField: 'id',
                    allowBlank: false,
                    queryParam : false,
                    matchFieldWidth: true,
                    forceSelection: true,
                    store: this.controlDefStore,
                    listeners: {
                        scope: this,
                        select: function(me, obj){
                            this.displayTriggers(obj);
                        }
                    }
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: getText('Alert level'),
                    allowBlank: false,
                    items: [
                        { boxLabel: getText('Low'), name: 'alertLevel', inputValue: '0', width: 100},
                        { boxLabel: getText('Medium'), name: 'alertLevel', inputValue: '1', width: 100 },
                        { boxLabel: getText('High'), name: 'alertLevel', inputValue: '2', width: 100 }
                    ]
                }, {
                    xtype: 'textfield',
                    name : 'name',
                    maxLength: 255,
                    fieldLabel: getText('Name')
                }, {
                    xtype: 'textfield',
                    name : 'description',
                    maxLength: 255,
                    fieldLabel: getText('Description')
                }, {
                    xtype: 'textfield',
                    name : 'params',
                    fieldLabel: getText('Parameters'),                    
                    validator: function(val){
                        if(val !== null && Ext.String.startsWith(val,'{')&& Ext.String.endsWith(val,'}') ){
                             try {
                                JSON.parse(val);
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }
                        return true;
                       
                    }
                },{
                    xtype: 'checkbox',
                    name : 'raisedByOnGoingOp',
                    fieldLabel: getText('Raised by ongoing operation')
                }, {
                    xtype: 'checkbox',
                    name : 'enabled',
                    fieldLabel: getText('Enabled')
                }                
            ]
        });
        
        var triggersFieldSet = Ext.create('Ext.panel.Panel',{
            title: getText('Trigger selection'),
            name: 'triggerSelector',
            bodyStyle: 'background-color:#ffffff; padding: 5px',
            autoScroll: true,
            defaults: {
                anchor: '100%'
                },
            items:[]
        });



        this.items = [ 
            {  
                xtype: 'form',
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
                    alertConfigPanel,
                    triggersFieldSet
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
    
    
    displayTriggers: function(obj){
                
        var operations = obj.data.operations;
        var  triggerStore = Ext.create('Dashboard.store.settings.TriggerEnum');
        var models = [];
        
        Ext.each(operations, function(operationid){
            
            var model = triggerStore.getById(operationid);
            models.push(model);
            
        }, this);
        
        this.setTriggerSelector(models);
    },   
    
            
    /**
     * Clean and fill the triggers panel
     * @param {type} triggersList
     * @returns {undefined}
     */
    setTriggerSelector: function (triggersList){
        
        var triggersSelector = Ext.ComponentQuery.query('panel[name="triggerSelector"]')[0];
        triggersSelector.removeAll();
        
        for(var i = 0; i < triggersList.length; i++){
            this.addTrigger(i, triggersList[i].data.id, triggersList[i].data.description, triggersSelector);
        }
    },
    

    /**
     * add checkBox
     * @param {type} index
     * @param {type} id
     * @param {type} description
     * @param {type} triggersSelector
     * @returns {undefined}
     */
    addTrigger: function(index, id, description, triggersSelector){

        triggersSelector.add({

            xtype: 'checkbox',
            checked: false,
            border: false,
            anchor: '100%',
            margin: '3 6 0 6',
            boxLabel: description,
            name: 'triggers',
            inputValue: id
        });       
    },            
            
    
    
    /**
     * Method alertConfig by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){
        
        var winForm = this.down('form').getForm();
        var values = winForm.getValues(); 

        var controlDefinition = {'id': values.controlDef};
        values.controlDefinition = controlDefinition;
        delete values.triggers;
        values.raisedByOnGoingOp = this.query('checkbox[name=raisedByOnGoingOp][checked=true]')[0] ? true : false;
        values.enabled = this.query('checkbox[name=enabled][checked=true]')[0] ? true : false;
        values.operations = [];        
        var triggersRecords = this.query('checkbox[name=triggers][checked=true]');
        Ext.Array.each(triggersRecords, function(rec){
            if (rec.inputValue !== null) {
                    values.operations.push(rec.inputValue);
            }
        });        

        return values;
    }

});   