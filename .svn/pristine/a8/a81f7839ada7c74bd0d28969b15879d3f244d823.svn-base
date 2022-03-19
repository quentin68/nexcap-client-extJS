Ext.define('Dashboard.view.shared.viewList.CreateColumnController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewListCreateColumn',
    
    require:['Dashboard.model.PropertyConfiguration'],
    
    view: 'viewListCreateColumn',
    filterTypesStore: Ext.create('Dashboard.store.FilterTypes'),
    

    /**
     * Create view handler
     * @param {type} sender
     * @returns {undefined}
     */
    onAddNewColumn: function(sender){
        
        var form = sender.up('window').down('form').getForm();
        
        if (!form.isValid()) {
            
            Ext.Msg.show({
                title: getText('Warning'),
                message: getText('Form not valid!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
            
            return;
        }
        
        var data = this.getView().getData();
        
        this.addNewColumn(data);
        
    },
    
    
    /**
     * Mapping data > filter model
     * Add new filter into configuration window
     * @param {type} data
     * @returns {undefined}
     */
    addNewColumn: function(data){
                        
        var mainController = this.getView().mainController;
        mainController.addNewColumn(data);
        
    }
    
});