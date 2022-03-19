/*  global Ext */

Ext.define('Dashboard.view.shared.viewList.EditColumnController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewListEditColumn',
    
    require:['Dashboard.model.PropertyConfiguration'],
    
    view: 'viewListEditColumn',
    filterTypesStore: Ext.create('Dashboard.store.FilterTypes'),
    

    /**
     * Create view handler
     * @param {type} sender
     * @returns {undefined}
     */
    onSaveColumn: function(sender){
        
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
        
        var record = this.getView().record;
        
        this.saveColumn(data, record);
        
    },
    

    saveColumn: function(data, record){
                        
        var mainController = this.getView().mainController;
        mainController.updateColumn(data, record);
        
    }
    
});