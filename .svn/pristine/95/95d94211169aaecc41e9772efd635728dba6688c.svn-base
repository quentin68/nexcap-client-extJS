/* global Ext */

Ext.define('Dashboard.view.settings.specificCheckConfig.paragraph.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'paragraphEdit',
    requires: [
        'Dashboard.tool.Utilities'
    ],
    

    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    layout: 'fit',
    controller: 'paragraphEdit',
    currentPanel: null,
    mainController: null,
    record: null,
    

    initComponent: function() {
        
        this.title = getText('Edit paragraph');
        
        this.paragraphType = Ext.create('Ext.data.Store', {
                fields: ['type'],
                data : [
                    {"type":"paragraph"},
                    {"type":"picture"}
                ]
        });
        
        var charasteristics = {
            xtype: 'panel',
            title: getText('Characteristics'),
            reference: 'characteristics',
            iconCls: 'fa fa-info',
            items:[
                {
                    xtype: 'textfield',
                    name : 'title',
                    maxLength: 255,
                    allowBlank: false,
                    fieldLabel: getText('Name'),
                   listeners: {
                       change: 'onFormChange' 
                    }           
                },{
                    xtype: 'combo',
                    name : 'type',
                    store: this.paragraphType, 
                    displayField: 'type',
                    allowBlank: false,
                    editable:false,
                    fieldLabel: getText('Type'),
                    listeners: {
                        select: {
                            fn: function (combo, record) {
                                var max = Ext.ComponentQuery.query('numberfield[name=max]')[0];
                                if (record.data.type === 'picture') {
                                    max.show();
                                } else {
                                    max.hide();
                                }
                            }
                        },
                        change: 'onFormChange' ,
                        afterrender: function(combo) {
                            var max = Ext.ComponentQuery.query('numberfield[name=max]')[0];
                            if (combo.value === 'picture') {
                                max.show();
                            } else {
                                max.hide();
                            }                        
                        }
                    }
                },{
                    xtype: 'numberfield',
                    name : 'max',
                    maxLength: 255,
                    hidden: true,
                    fieldLabel: getText('Max'),
                    listeners: {
                       change: 'onFormChange' 
                    }
                }
            ]
        };
        
        var controlPanel = {
            
            xtype: 'panel',
            title: getText('Specific check control'),
            reference: 'specificCheckControlPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            items:[],
            tools: [
                {
                    xtype: 'button',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onCreateSpecificCheckControl'
                }
            ]
        };
        
        var preview = {
            xtype: 'panel',
            ui: 'property-create',
            title: getText('Preview'),
            iconCls: 'fa fa-check',
            reference: 'previewContainer',
            layout: 'center',
            flex:1,
            height: '100%',
            scrollable:'y',
            bodyPadding: 16,
            bodyStyle: {
                background: '#F2F2F2', 
                padding: '24px'
            },
            items:[
                {
                    html: '<span><b>' + getText('Select a field type') +'</b></span>'
                }
            ]
        };
        
        var form = {
            xtype: 'panel',
            border:false,
            flex: 1,
            height: '100%',
            bodyPadding : '0 0 24 0',
            scrollable:'y',

            defaults: {
                width: '100%',
                ui: 'property-create',
                minHeight: 80,
                bodyPadding : '24',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            items: [
                charasteristics,
                controlPanel
            ]                       
        };
        
        
        var me = this;
        Ext.apply( me, {
        

            items: [
                {
                    xtype: 'form',
                    border:false,
                    width: 1000,
                    height: 600,
                    layout: 'hbox',

                    items: [
                        form,
                        preview
                    ],

                    buttons: [
                        {
                            text: getText('Save'),
                            disabled: false,
                            handler: 'onSaveParagraph'
                        },
                        {
                            text: getText('Cancel'),
                            scope: this,
                            handler: this.close
                        }
                    ]                       
                }
            ]
        });

        this.callParent(arguments);
        this.setData(this.record);
    },   
    
       
    addControl: function(model){

        var item = this.buildControl(model);
        this.down('panel[reference=specificCheckControlPanel]').add(item);
        this.getController().onFormRender();
    },
    
    
    updateControl: function(currentPanel, model){
        var item = this.buildControl(model);
        var index = currentPanel.ownerCt.items.indexOf(currentPanel);
        currentPanel.ownerCt.remove(currentPanel);
        this.down('panel[reference=specificCheckControlPanel]').insert(index,item);
        this.getController().onFormRender();
    },
    
    buildControl: function(model){
        
        var label = model.data.label;
        
        var paragraph = Ext.create('Ext.panel.Panel',{
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'dynamicControl',
            
            record: model,

            defaults:{
                submitValue: false,
                flex:1
            },

            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'controlId',
                    value: model.data.id
                },{
                    xtype: 'hiddenfield',
                    name: 'controlType',
                    value: model.data.controlType
                },{
                    xtype: 'hiddenfield',
                    name: 'propertyName',
                    value: model.data.propertyName
                },{
                    xtype: 'hiddenfield',
                    name: 'options',
                    value: model.data.options
                },{
                    xtype: 'hiddenfield',
                    name: 'properties',
                    value: model.data.properties
                },{
                    xtype: 'hiddenfield',
                    name: 'comment',
                    value: model.data.comment
                },{
                    xtype: 'displayfield',
                    name: 'label',
                    value: label ? label : ''
           
                },{
                    xtype: 'button',
                    ui: 'indicator',
                    name: 'upControl',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa-arrow-circle-o-up',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onUpControl(button, button.up('panel[name=dynamicControl]'));
                        }
                    }
                },{
                    xtype: 'button',
                    ui: 'indicator',
                    name: 'downControl',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa-arrow-circle-o-down',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onDownControl(button, button.up('panel[name=dynamicControl]'));
                        }
                    }
                },{
                    xtype: 'button',
                    ui: 'indicator-font-icon-button-minus',
                    name: 'editButton',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa fa-pencil',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onEditSpecificCheckControl(button, button.up('panel[name=dynamicControl]'), this.up('panel').record);
                        }
                    }
                },{
                    xtype: 'button',
                    ui: 'indicator-font-icon-button-minus',
                    name: 'minusButton',
                    width:24,
                    height:24,
                    scale:'small',
                    border: false,
                    enableToggle: false,
                    iconCls: 'fa fa-minus-circle',
                    scope: this,
                    flex:0,
                    listeners:{
                        scope: this,
                        click: function(button, event, eOpts ){
                            this.confirmRemoveControl(button.up('panel[name=dynamicControl]'));
                        }
                    }
                }
            ]
        });
        
        return paragraph;
    },
    
    
    confirmRemoveControl: function(control){
        
        var name = control.record.data.label;
        
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete ') + " \"" + name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    control.ownerCt.remove(control);        
                }
            }
        }); 
    },
   
    
    getControl: function(){

        var list = this.down('panel[reference=specificCheckControlPanel]').query('panel[name=dynamicControl]');
        var controlList = [];
        
        for(var i=0; i<list.length; i++){
            var propertyName = list[i].query('field[name=propertyName]')[0].value;
            var controlType = list[i].query('field[name=controlType]')[0].value;
            var label = list[i].query('field[name=label]')[0].value;
            var options = list[i].record.data.options;
            var properties = list[i].record.data.properties;
            var comment = list[i].query('field[name=comment]')[0].value;
            controlList.push({
                propertyName:propertyName.replace(' ', ''), 
                controlType:controlType, 
                label: label,
                options: options ,
                properties: properties,
                comment: comment
            });
        }
        
        return controlList;
    },
    
    
    setData: function(model){    
       
        this.down('form').getForm().setValues(model.data);         
        var controls = model.data.controls;
        Ext.each(controls, function(control){
            var controlAdd = Ext.create('Dashboard.model.settings.SpecificCheckControlConfig', control);
            this.addControl(controlAdd);
        },this);
    },
    
    /**
     * Method used by the controller to get values
     * @return (object) data
     */
    getData: function(){
        var values = this.down('form').getValues();
        values.controls = this.getControl();
        return values; 
    }
    
});  
