Ext.define('Dashboard.view.shared.filtering.FiltersConfiguration',{
    extend: 'Ext.window.Window',
    xtype: 'filtersConfiguration',
    
    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    iconCls: 'fa fa-filter',
    
    controller: 'filtersConfiguration',
    modelProperties: null,
    filterBarController: null,
    
    initComponent: function() {
        
        this.title = getText('Filters configuration');
        
        var filtersPanel = {
                        
            xtype: 'panel',
            title: getText('Filters'),
            reference: 'filtersPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            scrollable:'y',
            items:[],
            tools: [
                {
                    xtype: 'button',
                    //ui: 'indicator',
                    scale: 'small',
                    iconCls: 'fa fa-plus-circle',
                    hidden: false,
                    border: false,
                    enableToggle: false,
                    flag: 'editionMode',
                    handler: 'onAddNewFilter'
                }
            ]
        };
        
        this.items = [
            {
                xtype: 'form',
                referenceHolder: true,
                border:false,
                width: 700,
                height: 400,
                layout: 'fit',
                defaults:{
                    width: '100%'
                },
                items:[ 
                    filtersPanel
                ]
            }
        ];  
        
        this.buttons = [
            {
                text: getText('Save'),
                handler: 'onSaveConfiguration',
                action: 'onSaveConfiguration'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];
    
        this.callParent(arguments);
    },
            
            
    addField: function(field){

        this.down('panel[reference=propertiesPanel]').add(field);
    },
    
    
    /**
     * Build and add filter into list
     * @param {type} filterModel
     * @returns {undefined}
     */
    addFilter: function(filterModel){
                
        var item = this.buildFilterRaw(filterModel);
        this.down('panel[reference=filtersPanel]').add(item);
    },
    
    
    /**
     * 
     * @param {filter} filter
     * @returns {unresolved}
     */
    buildFilterRaw: function(filter){
                                
        var typeLabel = eval('Dashboard.store.FilterTypes.'+ filter.data.type).label;
        var localizedTypeLabel = getText(typeLabel);
        
        var property = Ext.create('Ext.panel.Panel',{
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'filter',
            
            filter: filter,

            defaults:{
                //margin: '0 0 0 12',
                submitValue: false,
                flex:1
            },

            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'name',
                    value: filter.data.name
                },
                {
                    xtype: 'displayfield',
                    labelSeparator: getText(':'),
                    fieldLabel: localizedTypeLabel? localizedTypeLabel: '',
                    name: 'label',
                    value: getText(filter.data.label),
                    border: 1,
                    labelWidth: 150
                },
//                {
//                    xtype: 'displayfield',
//                    name: 'type',
//                    value: filter.data.type
//                },
                {
                    xtype: 'button',
                    //ui: 'indicator-font-icon-button-minus',
                    ui: 'indicator',
                    name: 'upArrow',
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
                            this.up('window').getController().onUpFilter(button, button.up('panel'));
                        }
                    }
                },
                {
                    xtype: 'button',
                    //ui: 'indicator-font-icon-button-minus',
                    ui: 'indicator',
                    name: 'downArrow',
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
                            this.up('window').getController().onDownFilter(button, button.up('panel'));
                        }
                    }
                },
//                {
//                    xtype: 'button',
//                    ui: 'indicator-font-icon-button-minus',
//                    name: 'editButton',
//                    width:24,
//                    height:24,
//                    scale:'small',
//                    border: false,
//                    enableToggle: false,
//                    iconCls: 'fa fa-pencil',
//                    scope: this,
//                    flex:0,
//                    listeners:{
//                        click: function(button, event, eOpts ){
//                            this.up('window').getController().onEditProperty(button, this.up('panel').record);
//                        }
//                    }
//                },
                {
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
                    flex: 0,
                    listeners:{
                        scope: this,
                        click: function(button, event, eOpts ){
                            this.removeFilter(button.up('panel[name=filter]'));
                        }
                    }
                }
            ]
        });
        
        return property;
    },
    
    
    removeFilter: function(filter){
        
        filter.up('panel[reference=filtersPanel]').remove(filter);
        
    },
    
    
    getFilters: function(){
        
        var filtersList = [];
        
        var configuredList =  this.query('panel[name=filter]');
        
        for(var i=0; i < configuredList.length; i++){
            filtersList.push(configuredList[i].filter);
        }
                        
        return filtersList;
    },
            
    
    setFilters: function(filtersList){
                
        for(var i=0; i<filtersList.length; i++){
            this.addFilter(filtersList[i]);
        }
        
    }
            
});