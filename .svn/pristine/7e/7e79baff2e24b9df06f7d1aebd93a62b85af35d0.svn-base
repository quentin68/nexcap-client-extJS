Ext.define('Dashboard.view.shared.viewList.GridConfigurationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewListGridConfiguration',
    
    require:[],
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    
    onAddNewColumn: function(){
        this.showCreateColumnWindow();
    },
    
    onSaveConfiguration: function(event){

        var data = this.getView().getData();
        this.saveConfiguration(data);
        this.getView().close();
    },
    
    onUpColumn: function(button, item){
        //alert('up column : '+ Ext.encode(item));
        this.goUp(item);
    },
    
    onDownColumn: function(button, item){
        //alert('down column : '+ Ext.encode(item));
        this.goDown(item);
    },
    
    onRemoveColumn: function(button, column){
        this.removeColumn(column);
    },
            
    onAddNewProperty: function(){
        this.showCreateExtendedRowWindow();
    },
    
    onEditColumn: function (sender, column) {
        
        if(sender.up('panel[reference=rowExpanderPanel]')){
            this.editRow(column);
        }else{
            this.editColumn(column);
        }
    },
    
    
    //==========================================================================
    //   Methods
    //==========================================================================
    
    
    showCreateColumnWindow : function(type){
        var win = Ext.create('Dashboard.view.shared.viewList.CreateColumn',{
            mainController: this,
            modelProperties: this.getView().modelProperties
        });
        
        win.show();
    },
            
            
    showCreateExtendedRowWindow : function(type){
        var win = Ext.create('Dashboard.view.shared.viewList.CreateExtendedRow',{
            mainController: this,
            modelProperties: this.getView().modelProperties
        });
        
        win.show();
    },
    
    
    findColumn: function(record){
                
        var panel = this.getView().down('panel[reference=columnsPanel]');
        var updatedColumn = null;
        
        for (var i = 0; i < panel.items.items.length; i++) {
	    if (panel.items.items[i].column === record) {
		updatedColumn = panel.items.items[i];
                break;
	    }
	}
        return {column:updatedColumn, index:i};
    },
    
    
    updateColumn: function(data, record){
        
        var columnObj = this.findColumn(record);
        var index = columnObj.index;
        var column = columnObj.column;

        var newColumnRow = this.getView().buildColumnRow(data);
                
        var panel = this.getView().down('panel[reference=columnsPanel]');
        
        var editWin = Ext.ComponentQuery.query('viewListEditColumn')[0];
        editWin.close();
        
        panel.remove(column);
        panel.insert(index, newColumnRow);

    },
    
    
    findRow: function(record){
                
        var panel = this.getView().down('panel[reference=rowExpanderPanel]');
        var row = null;
        
        for (var i = 0; i < panel.items.items.length; i++) {
	    if (panel.items.items[i].column === record) {
		row = panel.items.items[i];
                break;
	    }
	}
        return {row:row, index:i};
    },
    
    
    updateRow: function(data, record){
        
        var columnObj = this.findRow(record);
        var index = columnObj.index;
        var row = columnObj.row;

        var newColumnRow = this.getView().buildColumnRow(data);
                
        var panel = this.getView().down('panel[reference=rowExpanderPanel]');
        
        var editWin = Ext.ComponentQuery.query('viewListEditExtendedRow')[0];
        editWin.close();
        
        panel.remove(row);
        panel.insert(index, newColumnRow);

    },
    
    
    removeColumn: function(column){
        this.getView().removeColumn(column);
    },
            
            
    goUp: function(item){
        this.moveSelectedRow(item, -1);
    },
            
    
    goDown: function(item){
        this.moveSelectedRow(item, 1);
    },
            
            
    moveSelectedRow: function(item, direction) {

        var columnsPanel = item.up('panel');

        if (!item) {
            return;
        }
        var index = columnsPanel.items.indexOf(item);
        if (direction < 0) {
            index--;
            if (index < 0) {
                index = columnsPanel.items.getCount();
            }
        } else {
            index++;
            if (index >= columnsPanel.items.getCount()) {
                index = 0;
            }
        }
        
        columnsPanel.insert(index, item);
    },
    
    
    closeColumnCreateWindow: function(){
        var win = Ext.ComponentQuery.query('viewListCreateColumn')[0];
        if(win !== undefined){
            win.close();
        }
    },
            
    
    closeExtendedRowCreateWindow: function(){
        var win = Ext.ComponentQuery.query('viewListCreateExtendedRow')[0];
        if(win !== undefined){
            win.close();
        }
    },
    
    
//    closeFilterEditWindow: function(){
//        var win = Ext.ComponentQuery.query('filteringEdit')[0];
//        if(win !== undefined){
//            win.close();
//        }
//    },
    
    

    addNewColumn: function(column){
        this.getView().addColumn(column);
        this.closeColumnCreateWindow();
    },
            
            
    addNewRow: function(row){
        this.getView().addRow(row);
        this.closeExtendedRowCreateWindow();
    },
    
    editColumn: function (column) {
                                
        var win = Ext.create('Dashboard.view.shared.viewList.EditColumn',{
            mainController: this,
            modelProperties: this.getView().modelProperties,
            record: column
        });

        win.show();
    },
    
    editRow: function (row) {
                        
        var win = Ext.create('Dashboard.view.shared.viewList.EditExtendedRow',{
            mainController: this,
            modelProperties: this.getView().modelProperties,
            record: row
        });

        win.show();
    },
    
    doPostActionEditProperty: function(property){
        this.closeColumnEditWindow();
    },
            

    saveConfiguration: function(_data){
        
        var configuration = this.getView().mainView.configuration;
        
        // save To Server
        var feature = this.getView().mainView.feature;

        configuration.table.columns = _data.columns;
        configuration.table.extendedProperties = _data.extendedProperties;
        configuration.table.displayRowNumbers = _data.displayRowNumbers;
        configuration.table.displayThumbnail = _data.displayThumbnail;
        
        this.refreshViewList(configuration);

        Dashboard.manager.FeaturesManager.saveViewListConfiguration(feature, configuration);
    },
            
            
    refreshViewList: function(configuration){

        this.getView().mainView.down('viewList').config.configuration = configuration;
        this.getView().mainView.down('viewList').configuration = configuration;
        this.getView().mainView.down('viewList').refresh();

    }

});