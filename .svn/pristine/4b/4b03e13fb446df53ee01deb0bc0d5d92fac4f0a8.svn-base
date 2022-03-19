/* global Ext */

Ext.define('Dashboard.view.historic.operation.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'operationMain',
    tag: 'main',
    
    requires: [
        'Dashboard.tool.Utilities',
        'Dashboard.view.shared.viewList.ViewList',
        'Dashboard.view.historic.operation.Detail',
        'Dashboard.view.historic.operation.ViewModel',
        'Dashboard.view.historic.operation.MainController'
    ],
    
    controller: 'operationMain',
    store: null,
    configuration: null,
    feature: null,
    modelProperties: Dashboard.manager.historic.OperationsManager.getProperties(),
    
    iconCls : 'fa fa-exchange',
    border: false,
    heigth: '100%',
    layout: 'border',
    
    listeners:{
        render: 'onRenderMain'
    },
    
    defaults:{
        heigth: '100%'
    },

    initComponent: function() {
        
        this.getController().feature = this.feature;
        
        this.title = getText('Operations');
        
        var filtersPanel = {
            xtype: Ext.create('Dashboard.view.shared.filtering.FiltersBar',{
                store : this.store,
                parentView: this,
                modelProperties: this.modelProperties,
                filtersList: this.getController().getFilters(),
                region: 'north'
            })
        };
            
        this.items = [
            
            filtersPanel,
            {
                xtype: 'panel',
                region: 'center',
                reference: 'body',
                layout: 'border',
                collapsible: false,
                bodyStyle: 'background-color:#494D60;',
                items: [
                    {
                        xtype: 'form',
                        title: getText('Operations'),
                        region: 'west',
                        reference: 'filterModels',
                        width: 200,
                        split: false,
                        collapsible: false,
                        bodyPadding: 24,
                        margin: '0 1 0 0',
                        autoScroll: true,
                        scrollable:'y',
                        defaults:{
                            xtype: 'checkboxfield',
                            checked: true,
                            boxLabelAlign: 'after',
                            handler: 'updateDataStore'
                        },
                        
                        items: this.addFilterModels(),
                        listeners: {
                            scope: this,
                            boxready: function(me){
                                var filterModels = this.getController().getFilterModels();
                                this.store.filterModels = filterModels;
                            }
                        },
                        
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            vertical: true,
                            items: [
                                {
                                    text: getText('Select All'),
                                    width : 184,
                                    ui: 'menu-operations',
                                    //ui: 'nav',
                                    listeners: {
                                        scope: this,
                                        click: function(me){
                                            this.selectAll();
                                        }
                                    }
                                }, {
                                    text: getText('Deselect All'),
                                    width : 184,
                                    ui: 'menu-operations',
                                    //ui: 'nav',
                                    listeners: {
                                        scope: this,
                                        click: function(me){
                                            this.deselectAll();
                                        }
                                    }
                                }
                            ]
                        }],
                        
                        renderTo: Ext.getBody()
                    },
//                    {
//                        xtype: 'form',
//                        title: getText('Operations'),
//                        region: 'west',
//                        reference: 'filterModels',
//                        width: 200,
//                        split: false,
//                        collapsible: false,
//                        bodyPadding: 24,
//                        margin: '0 1 0 0',
//                        autoScroll: true,
//                        scrollable:'y',
//                        
//                        defaults:{
//                            xtype: 'checkboxfield',
//                            checked: true,
//                            boxLabelAlign: 'after',
//                            //handler: 'updateDataStore'
//                            listeners:{
//                                scope: this,
//                                change: function(me){
//                                    this.getController().updateDataStore();
//                                }
//                            }
//                        },
//                        items: this.addFilterModels(),
//                        listeners: {
//                            scope: this,
//                            render: function(me){
//                                var filterModels = this.getController().getFilterModels();
//                                this.store.filterModels = filterModels;
//                            }
//                        }
//                    },
                    {
                        xtype: 'viewList',
                        region: 'center',
                        reference: 'mainListContainer',
                        collapsible: false,
                        configuration: this.configuration,
                        store: this.store,
                        mainView: this,
                        modelProperties: this.modelProperties
                    }
                ]
            }
        ];

        this.callParent(arguments);
    },
    
    
    addFilterModels: function(){


        var list = [
                {
                    name : 'BORROW',
                    feature: 'HISTO_BORROW_LIST',
                    boxLabel: getText('Borrow')
                },{
                    name : 'RETURN',
                    feature: 'HISTO_RETURN_LIST',
                    boxLabel: getText('Return')
                },{
                    name : 'SEND',
                    feature: 'HISTO_SEND_LIST',
                    boxLabel: getText('Send')
                },{
                    name : 'RECEIVE',
                    feature: 'HISTO_RECEIVE_LIST',
                    boxLabel: getText('Receive')
                },{
                    name : 'MOVE',
                    feature: 'HISTO_MOVING_LIST',
                    boxLabel: getText('Move')
                },{
                    name : 'CONSUME',
                    feature: 'HISTO_CONSUME_LIST',
                    boxLabel: getText('Consume')
                },{
                    name : 'PROVISION',
                    feature: 'HISTO_CONSUME_LIST', // 'HISTO_PROVISIONS'
                    boxLabel: getText('Provision')
                },{
                    name : 'LEAVE_TO_MAINTENANCE',
                    feature: 'HISTO_MAINTENANCES_LIST',
                    boxLabel: getText('To maintenance')
                },{
                    name : 'RETURN_FROM_MAINTENANCE',
                    feature: 'HISTO_MAINTENANCES_LIST',
                    boxLabel: getText('From maintenance')
                },{
                    name : 'LEAVE_TO_CALIBRATION',
                    feature: 'HISTO_CALIBRATIONS_LIST',
                    boxLabel: getText('To calibration')
                },{
                    name : 'RETURN_FROM_CALIBRATION',
                    feature: 'HISTO_CALIBRATIONS_LIST',
                    boxLabel: getText('From calibration')
                }
            ];
            
            for(var i=0; i<list.length; i++){
                if(!this.isEnabled(list[i].feature)){
                    list[i].hidden = true;
                }
            }
                        
       return list;
        
    },
            
            
    isEnabled: function(featureName){
        
        return Dashboard.manager.FeaturesManager.isEnabled(featureName);
        
    },

    
    selectAll: function(button){

        var checksList = this.down('form[reference=filterModels]').query('checkboxfield');
        
        for(var i=0; i<checksList.length; i++){
            checksList[i].handler = null;
        }
        
        for(var i=0; i<checksList.length; i++){
            checksList[i].setValue(true);
        }
        
        for(var i=0; i<checksList.length; i++){
            checksList[i].handler = 'updateDataStore';
        }
        
        this.updateLayout();
        
        this.getController().updateDataStore();
    },
    
    
    deselectAll: function(button){

        var checksList = this.down('form[reference=filterModels]').query('checkboxfield');
        
        for(var i=0; i<checksList.length; i++){
            checksList[i].handler = null;
        }
        
        for(var i=0; i<checksList.length; i++){
            checksList[i].setValue(false);
        }
        
        for(var i=0; i<checksList.length; i++){
            checksList[i].handler = 'updateDataStore';
        }
        
        this.updateLayout();
        
        this.getController().updateDataStore('deselectAll');
    }

});