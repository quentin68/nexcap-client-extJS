Ext.define('Dashboard.view.shared.viewList.CreateRowController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewListCreateRow',
    
    require:['Dashboard.model.PropertyConfiguration'],
    
    view: 'viewListCreateRow',
    


    onAddNewRow: function(sender, rowType){
                
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
        
        this.addNewRow(data, rowType);
        
    },
    

    addNewRow: function(data, rowType){
                        
        var mainController = this.getView().mainController;
        mainController.addNewRow(data, rowType);
        
    }
    
});