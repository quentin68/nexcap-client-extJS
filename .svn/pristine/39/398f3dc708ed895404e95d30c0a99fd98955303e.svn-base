Ext.define('Dashboard.view.shared.viewList.ListConfigurationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewListListConfiguration',
    
    require:[],
    
    windowEdit: null,
    windowCreate: null,
    
    createRowWindow: null,
    
    selection: null,
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================

    
    onAddNewProperty: function(){
        this.showCreatePropertyWindow('row');
    },
            
    onAddNewExpanderProperty: function(){
        this.showCreatePropertyWindow('expander');
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
            
    
    
    
    //==========================================================================
    //   Methods
    //==========================================================================
    
    
    showCreatePropertyWindow : function(rowType){
        
        if(rowType === 'row' ){
            
            this.createRowWindow = Ext.create('Dashboard.view.shared.viewList.CreateRow',{
                mainController: this,
                rowType: rowType,
                modelProperties: this.getView().modelProperties
            });
            
        }else{
            this.createRowWindow = Ext.create('Dashboard.view.shared.viewList.CreateExtendedRow',{
                mainController: this,
                rowType: rowType,
                modelProperties: this.getView().modelProperties
            });
        }
        
        
        
        this.createRowWindow.show();
    },
    
    
    removeRow: function(row){
        this.getView().removeColumn(row);
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
    
    
    closeCreateRowWindow: function(){

        if(this.createRowWindow){
            this.createRowWindow.close();
        }
    },
            

     addNewRow: function(data, rowType){
         
        if(rowType === 'row'){
            this.getView().addProperty(data);
        }else{
            this.getView().addExpanderProperty(data);
        }
        
        this.closeCreateRowWindow();
    },
    

    
    doPostActionEditProperty: function(property){
        this.closeCreateRowWindow();
    },
            
    /**
     * Save configuration and refresh viewList
     */
    saveConfiguration: function(_data){
        
        var configuration = this.getView().mainView.configuration;
        
        // save To Server
        var feature = this.getView().mainView.feature;

        configuration.list = _data;
        
        this.refreshViewList(configuration);

        Dashboard.manager.FeaturesManager.saveViewListConfiguration(feature, configuration);
    },
            
            
    refreshViewList: function(configuration){

        this.getView().mainView.down('viewList').config.configuration = configuration;
        this.getView().mainView.down('viewList').refresh();

    }

});