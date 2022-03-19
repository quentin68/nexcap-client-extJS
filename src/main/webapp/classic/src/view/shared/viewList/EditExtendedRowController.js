Ext.define('Dashboard.view.shared.viewList.EditExtendedRowController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewListEditExtendedRow',
    
    require:['Dashboard.model.PropertyConfiguration'],
    
    view: 'viewListEditExtendedRow',
    


    onSaveRow: function(sender){
        
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
        
        this.saveRow(data, record);
        
    },
    

    saveRow: function(data, record){
                        
        var mainController = this.getView().mainController;
        mainController.updateRow(data, record);
        
    }
    
});