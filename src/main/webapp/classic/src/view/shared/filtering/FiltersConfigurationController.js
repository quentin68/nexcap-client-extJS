Ext.define('Dashboard.view.shared.filtering.FiltersConfigurationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.filtersConfiguration',
    
    require:[],
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    
    onAddNewFilter: function(){
        this.showCreateWindow();
    },
    
    onSaveConfiguration: function(event){
        var filters = this.getView().getFilters();
        this.getView().filterBarController.saveFiltersConfiguration(filters);
        this.getView().close();
    },
    
    onUpFilter: function(button, item){
        //alert('up filter : '+ Ext.encode(item));
        this.goUp(item);
    },
    
    onDownFilter: function(button, item){
        //alert('down filter : '+ Ext.encode(item));
        this.goDown(item);
    },
    
    onRemoveFilter: function(button, filter){
        this.removeFilter(filter);
    },
    
    
    //==========================================================================
    //   Methods
    //==========================================================================
    
    
    showCreateWindow : function(type){
        var win = Ext.create('Dashboard.view.shared.filtering.Create',{
            mainController: this,
            modelProperties: this.getView().modelProperties
        });
        
        win.show();
    },
    
    
    showEditWindow: function(filter){  //TODO The same ?
        var win = Ext.create('Dashboard.view.shared.filtering.Edit',{
            mainController: this
        });
        win.show();
        win.setData(filter);
    },
    
    
    removeFilter: function(filter){
        this.getView().removeFilter(filter);
    },
            
            
    goUp: function(item){
        this.moveSelectedRow(item, -1);
    },
            
    
    goDown: function(item){
        this.moveSelectedRow(item, 1);
    },
            
            
    moveSelectedRow: function(item, direction) {
        
        var filtersPanel = this.getView().down('panel[reference=filtersPanel]');
        //var list = filtersPanel.items;

        //var record = list.getSelectionModel().getSelected();
        if (!item) {
            return;
        }
        var index = filtersPanel.items.indexOf(item);
        if (direction < 0) {
            index--;
            if (index < 0) {
                index = filtersPanel.items.getCount();
               // return;
            }
        } else {
            index++;
            if (index >= filtersPanel.items.getCount()) {
                index = 0;
               // return;
            }
        }
        
        filtersPanel.insert(index, item);
        //filtersPanel.remove(item);
    },
    
    
    closeFilterCreateWindow: function(){
        var win = Ext.ComponentQuery.query('filteringCreate')[0];
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
    
    
    /**
     * Display new filter into view and close window
     * @param {filter} filter
     * @returns {undefined}
     */
    addNewFilter: function(filter){
        this.getView().addFilter(filter);
        this.closeFilterCreateWindow();
    },
    
    
    
    doPostActionEditProperty: function(property){
        this.closeFilterEditWindow();
    }

});