/*  global Ext  */

Ext.define('Dashboard.view.settings.specificCheckConfig.control.CreateController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.controlCreate',
    
    require:['Dashboard.model.settings.SpecificCheckControlConfig'],
    
    view: 'controlCreate',
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
   
    /**
     * Create view handler
     * @param {type} sender
     * @returns {undefined}
     */
    onSaveControl: function(sender){
        
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
        this.saveControl(data);
        
    },
    
    onFormChange: function( control , newValue , oldValue , eOpts ){
        
        if(newValue !== oldValue){
            this.doPreview();
        }
        
    },
    
    onFormRender: function(){
        this.doPreview();
    },
    
    onCreateSpecificCheckControl: function(sender){
        this.createSpecificCheckControl();
    },

    
    //==========================================================================
    //   Methods
    //==========================================================================

    
    
    saveControl: function(data){
        
        Dashboard.manager.authentication.LoginScreenManager.keepSession();
        
        var model = Ext.create('Dashboard.model.settings.SpecificCheckControlConfig', data);

        var controller = this.getView().mainController;
        
        if(!controller){
            throw new Error('[Control.CreateController.saveControl] error: mainController undefined !');
            return;
        }
        controller.doPostActionSaveControl(model);
        
    },
    
    
    doPreview: function(){
       
        var previewContainer = this.getView().lookupReference('previewContainer');
        var data = this.getView().getData();
        var field = this.buildField(data);
        
        
        previewContainer.removeAll();
        previewContainer.add(field);
        
        
    },
    
    buildField: function(data){
        
        
         var field =  Ext.create('Ext.panel.Panel',{
            border: false,
            reference: 'controlPreviewPanel',
            title: getText('Control'),
            bodyPadding: 16,
            defaults: {
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':')
            }, 
            items: []
        });
        
        if(data.label !== null && data.label !== ""){
            var label =  {
                    xtype: 'displayfield',
                    fieldLabel: getText('Label'),
                    value: data.label,
                    maxWidth: '100%',
                    margin: '4 0 0 0'
                };
            field.add(label);
        }
        
        if(data.propertyName !== null && data.propertyName !== ""){
            
            var propertyName =  {
                    xtype: 'displayfield',
                    fieldLabel: getText('Property name'),
                    value: data.propertyName,
                    maxWidth: '100%',
                    margin: '4 0 0 0'
                };
            field.add(propertyName);
        }
        
        if(data.controlType !== null && data.controlType !==""){
            var controlType =  {
                    xtype: 'displayfield',
                    fieldLabel: getText('Control type'),
                    value: data.controlType,
                    maxWidth: '100%',
                    margin: '4 0 0 0'
                };
            field.add(controlType);
        }
        
        if(data.comment !== null && data.comment !== ""){
            var comment =  {
                    xtype: 'displayfield',
                    fieldLabel: getText('Comment'),
                    value: data.comment,
                    maxWidth: '100%',
                    margin: '4 0 0 0'
                };
            field.add(comment);
        }
        
        return field;
        
    }
    
});