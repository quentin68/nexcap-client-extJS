/* global Ext  */

Ext.define('Dashboard.view.system.dynamicProperties.ComputedCreateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dynamicPropertiesComputedCreate',

    require: ['Dashboard.model.Property'],

    view: 'dynamicPropertiesComputedCreate',

    // ==========================================================================
    // Event handlers
    // ==========================================================================

    selectFieldType: function (dataType){
        
        if(!dataType){
            dataType = 'STRING';
        }
        
        var fieldTypes = Ext.create('Dashboard.store.properties.FieldTypes');
        var record = fieldTypes.findRecord('propertyValueType', dataType);

        //var record = combo.findRecord('name', combo.getValue());
        
        this.displayFieldForm(record);

    },

    /**
     * Create view handler
     * 
     * @param {type} sender
     * @returns {undefined}
     */
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
        if ((control.field.fieldType === "combobox" || control.field.fieldType === "radio") && data.control.field.itemValues.length < 1) {

            Ext.Msg.show({
                title: getText('Error'),
                message: getText('Please enter an item!'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.Error
            });

            return;
        }

        this.saveProperty(data, sender.up('window').parentController);

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

    displayFieldForm: function (record){
        
        if(!record){
            return;
        }

        var form = null;

        try {
            form = Ext.create('Dashboard.view.shared.property.' + record.data.className);
        } catch (ex) {
            // do error
        }
        
        var fields = form.query('field');
        
        Ext.each(fields, function(field){
            if(field.name !== 'fieldLabel' && field.name !== 'description'){
                field.setVisible(false);
            }
        });

        var container = this.getView().lookupReference('fieldFormContainer');

        container.removeAll();

        if (form) {
            container.add(form);
        }
    },

    saveProperty: function (data, parentController){
        var model = Ext.create('Dashboard.model.PropertyConfiguration', data);

        if (parentController !== null) {
            var controller = parentController;
        } else {
            var controller = this.getView().mainController;
        }

        if (!controller) {
            throw new Error('[property.CreateController.saveProperty] error: mainController undefined !');
            return;
        }

        try {
            Dashboard.manager.system.DynamicPropertiesManager.save(model, controller, 'doPostActionSaveProperty');
        } catch (ex) {
            Dashboard.tool.Utilities.error('[property.CreateController.addProperty] saving error ! ' + ex);
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
