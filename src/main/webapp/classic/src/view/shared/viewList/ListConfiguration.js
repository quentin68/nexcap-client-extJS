Ext.define('Dashboard.view.shared.viewList.ListConfiguration',{
    extend: 'Ext.window.Window',
    xtype: 'viewListListConfiguration',
    
    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    iconCls: 'fa fa-bars',
    
    controller: 'viewListListConfiguration',
    modelProperties: null,
    mainView: null,    
    
    initComponent: function() {
        
        this.title = getText('List configuration');
        
        var rowsPanel = {
            
            xtype: 'panel',
            title: getText('Rows'),
            reference: 'rowsPanel',
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
                    handler: 'onAddNewProperty'
                }
            ]
        };
        
        var rowsExpanderPanel = {
            
            xtype: 'panel',
            title: getText('Expanded rows'),
            reference: 'rowsExpanderPanel',
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
                    handler: 'onAddNewExpanderProperty'
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
                layout: 'vbox',
                scrollable:'y',
                defaults:{
                    width: '100%'
                },
                items:[ 
                    rowsPanel,
                    rowsExpanderPanel
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
            

    addProperty: function(data){
        var item = this.buildRow(data);
        this.down('panel[reference=rowsPanel]').add(item);
    },
    
    
    addExpanderProperty: function(data){
        var item = this.buildRow(data);
        this.down('panel[reference=rowsExpanderPanel]').add(item);
    },
    

    buildRow: function(data){
                        
        var typeLabel = '';//eval('Dashboard.store.FilterTypes.'+ column.data.type).label;
        
        var row = Ext.create('Ext.panel.Panel',{
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'row',
            row: data,

            defaults:{
                //margin: '0 0 0 12',
                submitValue: false,
                flex:1
            },

            items:[
                {
                    xtype: 'displayfield',
                    //fieldLabel: typeLabel? typeLabel: '',
                    name: 'label',
                    value: data.label,
                    border: 1,
                    labelWidth: 200
                },
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
                            this.up('window').getController().onUpColumn(button, button.up('panel'));
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
                            this.up('window').getController().onDownColumn(button, button.up('panel'));
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
                            this.removeRow(button.up('panel'));
                        }
                    }
                }
            ]
        });
        
        return row;
    },
    
    
    removeRow: function(row){
        row.up('panel').remove(row);
    },
    
    
    getRows: function(){
        
        var list = [];
        var configuredList =  this.query('panel[reference=rowsPanel] > panel[name=row]');
        
        for(var i=0; i < configuredList.length; i++){
            list.push(configuredList[i].row);
        }
                        
        return list;
    },
            
            
    getExpanderRows: function(){
        
        var list = [];
        var configuredList =  this.query('panel[reference=rowsExpanderPanel] > panel[name=row]');
        
        for(var i=0; i < configuredList.length; i++){
            list.push(configuredList[i].row);
        }
                        
        return list;
    },
            

    setProperties: function(list){
        
        for(var i=0; i<list.length; i++){
            this.addProperty(list[i]);
        }
    },
            
            
    setExpanderProperties: function(list){
        
        for(var i=0; i<list.length; i++){
            this.addExpanderProperty(list[i]);
        }
    },
    
            
    getData: function(){
        
        var title = this.mainView.configuration.list.mainProperties.title;
        var subtitle =  this.mainView.configuration.list.mainProperties.subTitle;

        var data = {
            mainProperties: {
                thumb: 'thumbnailSrc',
                title: title,
                subTitle: subtitle,
                properties: []
            },
            extendedProperties: {
                properties: []
            }
        };
                
        data.mainProperties.properties = this.getRows();
        data.extendedProperties.properties = this.getExpanderRows();
        
        
        return data;
    },
            
            
    setData: function(configuration){

        try{
            var properties = configuration.mainProperties.properties;
            if(properties && properties.length > 0){
                this.setProperties(properties);
            }
        }catch(ex){}

        try{
            var expanderProperties = configuration.extendedProperties.properties;
            if( expanderProperties && expanderProperties.length > 0){
                this.setExpanderProperties(expanderProperties);
            }
        }catch(ex){}

    }
});