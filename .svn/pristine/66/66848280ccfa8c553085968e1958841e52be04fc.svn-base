Ext.define('Dashboard.view.shared.filtering.EditController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.filteringEdit',
    
    require:['Dashboard.model.PropertyConfiguration'],
    
    view: 'filteringEdit',
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onFieldTypeSelected: function(combo, field){
        
        var record = combo.findRecord('name', combo.getValue());
        this.displayFieldForm(record, field);
        
    },
    
    
    onSaveProperty: function(sender){
        
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
        this.updateProperty(data);
        
    },
    
        
    onFormChange: function( control , newValue , oldValue , eOpts ){
        
        if(newValue !== oldValue){
            this.doPreview();
        }
        
    },
    
    
    onFormRender: function(){
        this.doPreview();
    },

    
    //==========================================================================
    //   Methods
    //==========================================================================
    
    displayFieldForm: function(record, field){
        
        var fieldPanel = null;
        
        try{
            var propertyClass = 'Dashboard.view.shared.property' + record.data.className;
            fieldPanel = Ext.create(propertyClass);

        }catch(ex){
            //do error
        }
        
        var container = this.getView().lookupReference('fieldFormContainer');
        
        container.removeAll();
        
        if(fieldPanel){
            container.add(fieldPanel);
            
            //fill fields
            if(field){
                fieldPanel.setData(field);
            }
        }
    },
    
    
    updateProperty: function(data){
        
        var model = Ext.create('Dashboard.model.PropertyConfiguration', data);

        var controller = this.getView().mainController;
        
        if(!controller){
            throw new Error('[property.EditController.updateProperty] error: mainController undefined !');
            //Dashboard.tool.Utilities.error('[property.EditController.updateProperty] error: mainController undefined !');
            return;
        }
        
        try{
            Dashboard.manager.system.DynamicPropertiesManager.update(model, controller, 'doPostActionEditProperty');
        }catch(ex){
            Dashboard.tool.Utilities.error('[property.CreateController.updateProperty] saving error ! ' + ex);
        }
        
    },
    
    
    doPreview: function(){
        
        var previewContainer = this.getView().lookupReference('previewContainer');
        var data = this.getView().getData();
        var field = this.getView().down('panel[tag=field]').buildField(data);
        
        previewContainer.removeAll();
        previewContainer.add(field);
        
    }
    
});