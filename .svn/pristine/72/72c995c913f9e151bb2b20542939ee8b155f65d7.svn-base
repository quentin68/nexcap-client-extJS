/* global Ext */

Ext.define('Dashboard.view.shared.property.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.propertyEdit',

    require: ['Dashboard.model.Property'],

    view: 'propertyEdit',

    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onFieldTypeSelected: function (combo, field){

        var record = combo.findRecord('name', combo.getValue());
        this.displayFieldForm(record, field);

    },

    onSaveProperty: function (sender){

        var form = sender.up('window').down('form').getForm();

        if (!form.isValid()) {

            var invalidFields = this.getInvalidFields(form);
            var messages = [];

            for (var i = 0; i < invalidFields.length; i++) {
                messages.push(invalidFields[i].fieldLabel + " > " + invalidFields[i].activeErrors[0]);
            }

            Ext.Msg.show({
                title: getText('Errors'),
                message: messages.join('<br>'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            
             return;
        }

        var data = this.getView().getData();
        var control = Dashboard.model.PropertyConfiguration.getControl(data);
        
        if ((control.field.fieldType === "combobox" || control.field.fieldType === "radio") && control.field.itemValues.length < 1) {
            
            sender.up('window').down('textfield[name=itemValue]').markInvalid('error');
            
            Ext.Msg.show({
                title: getText('Warning'),
                message: getText('Please enter an item!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });

            return;
        }
        this.updateProperty(data, sender.up('window').parentController);

    },
    
    getInvalidFields: function (form){

        var invalidFields = [];

        Ext.suspendLayouts();

        form.getFields().filterBy(function (field){
            if (field.validate())
                return;
            invalidFields.push(field);
        });

        Ext.resumeLayouts(true);

        return invalidFields;
    },

    onFormChange: function (control, newValue, oldValue, eOpts){

        if (newValue !== oldValue) {
            this.doPreview();
        }

    },

    onFormRender: function (){
        this.doPreview();
    },

    // ==========================================================================
    // Methods
    // ==========================================================================

    displayFieldForm: function (record, field){

        var fieldPanel = null;

        try {
            fieldPanel = Ext.create('Dashboard.view.shared.property.' + record.data.className, {
                isFloatingPointEditable: false
            });

        } catch (ex) {
            // do error
        }
                
        if(this.getView().record.data.origin === 'TELEMETRY' || this.getView().record.data.origin === 'COMPUTED'){
            var fields = fieldPanel.query('field');
        
            Ext.each(fields, function(field){
                if(field.name !== 'fieldLabel' && field.name !== 'description'){
                    field.setVisible(false);
                }
            });
        }

        var container = this.getView().lookupReference('fieldFormContainer');

        container.removeAll();

        if (fieldPanel) {
            container.add(fieldPanel);

            // fill fields
            if (field) {
                fieldPanel.setData(field);
            }
        }
    },

    updateProperty: function (data, parentController){

        var model = Ext.create('Dashboard.model.PropertyConfiguration', data);

        if (parentController != null) {
            var controller = parentController;
        } else {
            var controller = this.getView().mainController;
        }

        if (!controller) {
            throw new Error('[property.EditController.updateProperty] error: mainController undefined !');
            // Dashboard.tool.Utilities.error('[property.EditController.updateProperty] error: mainController undefined !');
            return;
        }

        try {
            Dashboard.manager.system.DynamicPropertiesManager.update(model, controller, 'doPostActionEditProperty');
        } catch (ex) {
            Dashboard.tool.Utilities.error('[property.EditController.updateProperty] saving error ! ' + ex);
        }

    },

    doPreview: function (){

        var previewContainer = this.getView().lookupReference('previewContainer');
        var data = this.getView().getData();
        var control = Dashboard.model.PropertyConfiguration.getControl(data);
        // disable required for preview
        control.configuration.required = false;
        var field = this.getView().down('panel[tag=field]').buildField(data, control);

        previewContainer.removeAll();
        previewContainer.add(field);
    }
});
