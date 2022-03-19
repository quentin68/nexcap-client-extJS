/* global Ext */

Ext.define('Dashboard.view.indicator.Indicator', {
    extend: 'Ext.panel.Panel',
    xtype: 'indicator',

    name: 'indicator',
    
    controller: 'indicatorController',

    minWidth: 150,
    minHeight: 80,
    layout: 'anchor',
    border: true,
    titleAlign: 'left',
    ui: 'indicator',
    cls: 'indicator',
    bodyPadding: '16 12 12 12',
    
    resizable: false,
    draggable: false,
    
    record: {},
    
    header : {
        height : 40//34
    },
    
    config: {
        serverId: null,
        title: 'My new Indicator',
        width: 420,
        height: 240
    },
    
    listeners:{
        'render': 'onRender',
        'afterrender': 'onAfterRender'
    },
    
    dockedItems: [
        {
            xtype: 'panel',
            layout: 'hbox',
            dock: 'top',
            name: 'errorPanel',
            hidden: true,
            bodyStyle: {
                background: '#FFFFFF'
            },
            items:[
                {
                    xtype : 'displayfield',
                    fieldStyle : 'font-family: FontAwesome; color: red',
                    value: '\uF071',
                    margin: '0 0 0 12'
                },
                {
                    xtype: 'displayfield',
                    name: 'errorField',
                    value: getText('Server error'),
                    margin: '0 0 0 12',
                    fieldStyle: 'color: red'
                }
            ]
        }
    ],
    
    
    tools: [
        {
            xtype: 'button',
            ui: 'indicator',
            scale: 'small',
            iconCls: 'fa-arrow-circle-o-up',
            hidden: true,
            border: false,
            enableToggle: false,
            flag: 'editionMode',
            handler: 'onMoveBefore'
        },
        {
            xtype: 'button',
            ui: 'indicator',
            scale: 'small',
            iconCls: 'fa-arrow-circle-o-down',
            hidden: true,
            border: false,
            enableToggle: false,
            flag: 'editionMode',
            handler: 'onMoveAfter'
        },
        {
            xtype: 'button',
            ui: 'indicator',
            scale: 'small',
            iconCls: 'fa fa-pencil',
            hidden: true,
            border: false,
            enableToggle: false,
            flag: 'editionMode',
            handler: 'onEditWidget'
        },
        {
            xtype: 'button',
            ui: 'indicator',
            scale: 'small',
            iconCls: 'fa fa-minus-circle',
            hidden: true,
            border: false,
            enableToggle: false,
            flag: 'editionMode',
            handler: 'onDeleteWidget'
        }
    ],
    
    showEditionButtons: function(){
        
        var buttonsList = this.query('button[flag=editionMode]');
        
        Ext.each(buttonsList, function(button){
            button.setVisible(true);
        });    

    },
            
    
    hideEditionButtons: function(){
        
        var buttonsList = this.query('button[flag=editionMode]');
        
        Ext.each(buttonsList, function(button){
            button.setVisible(false);
        });     
    }
    
});