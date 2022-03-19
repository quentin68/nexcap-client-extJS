Ext.define('Dashboard.view.shared.viewList.CreateExtendedRowController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewListCreateExtendedRow',
    
    require:['Dashboard.model.PropertyConfiguration'],
    
    view: 'viewListCreateExtendedRow',
    

    /**
     * Create view handler
     * @param {type} sender
     * @returns {undefined}
     */
    onAddNewRow: function(sender){
        
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
        
        this.addNewRow(data);
        
    },
    
    
    /**
     * Mapping data > filter model
     * Add new filter into configuration window
     * @param {type} data
     * @returns {undefined}
     */
    addNewRow: function(data){
                        
        var mainController = this.getView().mainController;
        mainController.addNewRow(data);
        
    }
    
});