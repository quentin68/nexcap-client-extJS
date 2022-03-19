/* global Ext */

Ext.define('Dashboard.view.settings.specificCheckConfig.control.EditController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.controlEdit',
    
    require:['Dashboard.model.settings.SpecificCheckParagraphConfig'],
    
    view: 'controlEdit',
    
    
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
        var currentPanel = this.getView().currentPanel;
        this.updateControl(currentPanel, data);
        
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

    
    
    updateControl: function(currentPanel, data){
        
        Dashboard.manager.authentication.LoginScreenManager.keepSession();
        
        var model = Ext.create('Dashboard.model.settings.SpecificCheckControlConfig', data);

        var controller = this.getView().mainController;
        
        if(!controller){
            throw new Error('[Paragraph.EditController.updateProperty] error: mainController undefined !');
            return;
        }        
       controller.doPostActionEditControl(currentPanel, model);
        
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
            width: "100%",
            defaults: {
                xtype: 'displayfield',
                labelWidth: 112,
                flex: 1,
                margin: '4 0 0 0',
                labelSeparator: getText(':')
            }, 
            items: []
        });
        
        if(data.label !== null && data.label !== ""){
            var label =  {
                    fieldLabel: getText('Label'),
                    value: data.label
                };
            field.add(label);
        }
        
        if(data.propertyName !== null && data.propertyName !== ""){
            
            var propertyName =  {
                    fieldLabel: getText('Property name'),
                    value: data.propertyName
                };
            field.add(propertyName);
        }
        
        if(data.controlType !== null && data.controlType !==""){
            var controlType =  {
                    fieldLabel: getText('Control type'),
                    value: data.controlType
                };
            field.add(controlType);
        }
        
        if(data.comment !== null && data.comment !== ""){
            var comment =  {
                    fieldLabel: getText('Comment'),
                    value: data.comment
                };
            field.add(comment);
        }
        
        return field;
        
    }
    
});