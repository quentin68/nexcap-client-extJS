Ext.define('Dashboard.view.shared.viewList.GridConfiguration',{
    extend: 'Ext.window.Window',
    xtype: 'viewListGridConfiguration',
    
    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    iconCls: 'fa fa-table',
    
    controller: 'viewListGridConfiguration',
    modelProperties: null,
    mainView: null,
    
    propertyPanelInEdition: null,
    
    initComponent: function() {
        
        this.title = getText('Grid configuration');
        
        var displayPanel = {
            
            xtype: 'panel',
            title: getText('Displaying'),
            //iconCls: 'fa fa-eye',
            reference: 'displayPanel',
            bodyPadding: 20,
            ui: 'form-panel',
            items:[
                {
                    xtype: 'checkboxfield',
                    name : 'displayRowNumbers',
                    fieldLabel: getText('Row numbers'),
                    value: true,
                    checked: true
                },{
                    xtype: 'checkboxfield',
                    name : 'displayThumbnail',
                    fieldLabel: getText('Thumbnails'),
                    value: true,
                    checked: true
                }
            ]
        };
        
        var columnsPanel = {
            
            xtype: 'panel',
            title: getText('Columns'),
            reference: 'columnsPanel',
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
                    handler: 'onAddNewColumn'
                }
            ]
        };
        
        var rowExpanderPanel = {
            
            xtype: 'panel',
            title: getText('Expanded rows'),
            reference: 'rowExpanderPanel',
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
                    displayPanel,
                    columnsPanel,
                    rowExpanderPanel
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
        this.setDisplaying();
        
    },
            
            
    addField: function(field){
        this.down('panel[reference=propertiesPanel]').add(field);
    },
    
    

    addColumn: function(data){
        var item = this.buildColumnRow(data);
        this.down('panel[reference=columnsPanel]').add(item);
    },
    
    
    addRow: function(data){
        var item = this.buildColumnRow(data);
        this.down('panel[reference=rowExpanderPanel]').add(item);
    },
    
    /**
     * 
     * @param {column} column
     * @returns {unresolved}
     */
    buildColumnRow: function(column){
                        
        var typeLabel = '';//eval('Dashboard.store.FilterTypes.'+ column.data.type).label;
        
        var property = Ext.create('Ext.panel.Panel',{
            layout: 'hbox',
            margin: '0 0 12 0',
            name: 'column',
            
            column: column,

            defaults:{
                //margin: '0 0 0 12',
                submitValue: false,
                flex:1,
                xtype: 'button',
                width:24,
                height:24,
                scale:'small',
                border: false,
                enableToggle: false
            },

            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'dataIndex',
                    value: column.dataIndex
                }, {
                    xtype: 'hiddenfield',
                    name: 'isDynamic',
                    value: column.isDynamic
                }, {
                    xtype: 'displayfield',
                    name: 'text',
                    value: column.text,
                    border: 1,
                    labelWidth: 200
                }, {
                    xtype: 'displayfield',
                    fieldLabel: getText('width'),
                    labelWidth: 60,
                    name: 'width',
                    value: column.flex? 'auto': column.width
                }, {
                    ui: 'indicator',
                    name: 'upArrow',
                    iconCls: 'fa-arrow-circle-o-up',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onUpColumn(button, button.up('panel'));
                        }
                    }
                }, {
                    ui: 'indicator',
                    name: 'downArrow',
                    iconCls: 'fa-arrow-circle-o-down',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.up('window').getController().onDownColumn(button, button.up('panel'));
                        }
                    }
                }, {
                    ui: 'indicator-font-icon-button-edit',
                    name: 'editButton',
                    iconCls: 'fa fa-pencil',
                    scope: this,
                    flex:0,
                    listeners:{
                        click: function(button, event, eOpts ){
                            this.propertyPanelInEdition = button.up('panel');
                            this.up('window').getController().onEditColumn(button, this.up('panel').column);
                        }
                    }
                }, {
                    ui: 'indicator-font-icon-button-minus',
                    name: 'minusButton',
                    iconCls: 'fa fa-minus-circle',
                    scope: this,
                    flex: 0,
                    listeners:{
                        scope: this,
                        click: function(button, event, eOpts ){
                            this.removeColumn(button.up('panel'));
                        }
                    }
                }
            ]
        });
        
        return property;
    },
    
    
    removeColumn: function(column){
        
        column.up('panel').remove(column);
    },
    
    
    getColumns: function(){
        
        var columnsList = [];
        var configuredList =  this.query('panel[reference=columnsPanel] > panel[name=column]');
        
        for(var i=0; i < configuredList.length; i++){
            columnsList.push(configuredList[i].column);
        }
                        
        return columnsList;
    },
            
            
    getRows: function(){
                
        var list = [];
        var configuredList =  this.query('panel[reference=rowExpanderPanel] > panel[name=column]');
        
        for(var i=0; i < configuredList.length; i++){
            
            var row = {
                property: configuredList[i].column.dataIndex,
                label: configuredList[i].column.text,
                style: configuredList[i].column.style,
                type: configuredList[i].column.type,
                isDynamic: configuredList[i].column.isDynamic
            };
            
            list.push(row);
        }
                        
        return list;
    },
            
            
    setDisplaying: function(){

        var config = this.mainView.configuration.table;
        var displayRowNumber = false;
        var displayThumbnails = false;
        
        if(config.displayRowNumbers){
            displayRowNumber = config.displayRowNumbers;
        }
        this.down('checkboxfield[name=displayRowNumbers]').setValue(displayRowNumber);
        
        
        var displayThumbnailCheckBox = this.down('checkboxfield[name=displayThumbnail]');
        if(config.displayThumbnail !== undefined){
            displayThumbnails = config.displayThumbnail;
            displayThumbnailCheckBox.hidden = false;
            displayThumbnailCheckBox.setValue(displayThumbnails);
        }else{
            displayThumbnailCheckBox.hidden = true;
            displayThumbnailCheckBox.setValue(false);
        }

    },
            

    setColumns: function(columnsList){
        
        for(var i=0; i<columnsList.length; i++){
            this.addColumn(columnsList[i]);
        }
    },
            
            
    setRows: function(rows){
        
        for(var i=0; i<rows.length; i++){
            
            var mapRow = {
                dataIndex: rows[i].property,
                text: rows[i].label,
                fit: true,
                style: rows[i].style,
                column: rows[i],
                isDynamic: rows[i].isDynamic
            };
            
            this.addRow(mapRow);
        }
    },
    
            
    getData: function(){

        var data = {
            extendedProperties: {properties: []}
        };
        
        data.columns = this.getColumns();
        data.extendedProperties.properties = this.getRows();
        
        
        data.displayRowNumbers = this.down('field[name=displayRowNumbers]').checked;
        
        var displayThumbnailCheckBox = this.down('checkboxfield[name=displayThumbnail]');
        if(displayThumbnailCheckBox.hidden === false){
            data.displayThumbnail = this.down('field[name=displayThumbnail]').checked;
        }
        
        return data;
    }
});