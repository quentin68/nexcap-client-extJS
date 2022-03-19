/*  global Ext */

Ext.define('Dashboard.view.settings.specificCheckConfig.paragraph.CreateController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.paragraphCreate',
    
    require:['Dashboard.model.settings.SpecificCheckParagraphConfig'],
    
    view: 'paragraphCreate',
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
   
    /**
     * Create view handler
     * @param {type} sender
     * @returns {undefined}
     */
    onSaveParagraph: function(sender){
        
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
        this.saveParagraph(data);
        
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
    
    onEditSpecificCheckControl: function(sender, panel, paragraph){
        this.editSpecificCheckControl(panel, paragraph);
    },
    
    onUpControl: function(button, item){
        this.goUp(item);
    },
    
    onDownControl: function(button, item){
        this.goDown(item);
    },

    
    //==========================================================================
    //   Methods
    //==========================================================================

    
    
    saveParagraph: function(data){
        
        var model = Ext.create('Dashboard.model.settings.SpecificCheckParagraphConfig', data);

        var controller = this.getView().mainController;
        
        if(!controller){
            throw new Error('[Paragraph.CreateController.saveParagraph] error: mainController undefined !');
            return;
        }
        controller.doPostActionSaveParagraph(model);
        
    },
    
    
    doPreview: function(){
       
        var previewContainer = this.getView().lookupReference('previewContainer');
        var data = this.getView().getData();
        var field = this.buildField(data);
        
        for (var i = 0; i < data.controls.length; i++) {
            var control = data.controls[i];
            field.add(this.getPanelControl(control, i));
        }
        
        previewContainer.removeAll();
        previewContainer.add(field);
        
        
    },
    
    buildField: function (data) {

        var field = Ext.create('Ext.panel.Panel', {
            border: false,
            reference: 'paragraphPreviewPanel',
            title: getText('Paragraph'),
            bodyPadding: 16,
            width: "100%",
            defaults: {
                xtype: 'displayfield',
                labelWidth: 112,
                width: "100%",
                labelSeparator: getText(':'),
                bodyPadding: 16,
                margin: '8 0 0 0'
            },
            items: []
        });

        if(data.title !== null && data.title !== ""){            
            var title = {
                fieldLabel: getText('Name'),
                value: data.title,
                margin: '16 0 0 16'
            };
            field.add(title);
        }
        if (data.type !== null && data.type !== "") {
            var type = {
                fieldLabel: getText('Type'),
                value: data.type,
                margin: '0 0 0 16'
            };
            field.add(type);
        }

        if (data.max !== null && data.max !== "") {
            var max = {
                fieldLabel: getText('Max'),
                value: data.max,
                margin: '0 0 0 16'
            };
            field.add(max);
        }     

        return field;

    },
    
    
    getPanelControl: function(control, index){        
        var controlPanel = Ext.create('Ext.panel.Panel', {
                border: true,
                reference: 'controlPreviewPanel',
                //title: getText('Control ')+index,
                defaults: {
                    labelWidth: 112,
                    width: "100%",
                    labelSeparator: getText(':')
                },
                items: []
            });
        
        if(control.label !== null && control.label !== ""){
            var label = {
                    xtype: 'displayfield',
                    fieldLabel: getText('Label'),
                    value: control.label,
                    maxWidth: '100%',
                    margin: '4 0 0 0'
            };
            controlPanel.add(label);
        }
        if(control.propertyName !== null && control.propertyName !== ""){
            
            var propertyName =  {
                    xtype: 'displayfield',
                    fieldLabel: getText('Property name'),
                    value: control.propertyName,
                    maxWidth: '100%',
                    margin: '4 0 0 0'
                };
            controlPanel.add(propertyName);
        };
        
        if(control.controlType !== null && control.controlType !==""){
            var controlType =  {
                    xtype: 'displayfield',
                    fieldLabel: getText('Control type'),
                    value: control.controlType,
                    maxWidth: '100%',
                    margin: '4 0 0 0'
                };
            controlPanel.add(controlType);
        };        
        return controlPanel; 
    },
    
    createSpecificCheckControl : function(type){
        var win = Ext.create('Dashboard.view.settings.specificCheckConfig.control.Create',{
            mainController: this
        });
        win.show();
    },
    
    doPostActionSaveControl: function(model){

        var win = Ext.ComponentQuery.query('paragraphCreate')[0];
        
        if(win === undefined){
            win = Ext.ComponentQuery.query('paragraphEdit')[0];
        }
        
        win.addControl(model);
        this.closeControlCreateWindow();
    },
    
    closeControlCreateWindow: function(){
        var win = Ext.ComponentQuery.query('controlCreate')[0];
        if(win !== undefined){
            win.close();
        }
    },
    
    editSpecificCheckControl: function(currentPanel, paragraph){
        var win = Ext.create('Dashboard.view.settings.specificCheckConfig.control.Edit',{
            mainController: this, record:paragraph, currentPanel: currentPanel
        });
        win.show();
    },
    
    doPostActionEditControl: function(currentPanel, model){
        
        var win = Ext.ComponentQuery.query('paragraphCreate')[0];
        
        if(win === undefined){
            win = Ext.ComponentQuery.query('paragraphEdit')[0];
        }
        
        win.updateControl(currentPanel, model);
        this.closeControlEditWindow();
    },
    
    closeControlEditWindow: function(){
       var win = Ext.ComponentQuery.query('controlEdit')[0];
        if(win !== undefined){
            win.close();
        }
    },
    
    goUp: function(item){
        this.moveSelectedRow(item, -1);
    },
            
    
    goDown: function(item){
        this.moveSelectedRow(item, 1);
    },
            
            
    moveSelectedRow: function(item, direction) {

        var controlPanel = this.getView().down('panel[reference=specificCheckControlPanel]');
        if (!item) {
            return;
        }
        var index = controlPanel.items.indexOf(item);
        if (direction < 0) {
            index--;
            if (index < 0) {
                index = controlPanel.items.getCount();
            }
        } else {
            index++;
            if (index >= controlPanel.items.getCount()) {
                index = 0;
            }
        }       
        controlPanel.insert(index, item);
    }
    
    
});