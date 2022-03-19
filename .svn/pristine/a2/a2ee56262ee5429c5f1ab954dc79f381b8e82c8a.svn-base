/* global Ext */

Ext.define('Dashboard.view.settings.specificCheckConfig.MainController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.specificCheckConfigMain',
    
    require:[],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'SPECIFIC_CHECK_CONFIG_ADMIN', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    
    selection: null,
    
    init: function() {
        
         this.control({
             
             // Selected item in dataGrid
            'specificCheckConfigMain viewListGrid': {itemclick: this.onSelectItem},
            
            // Create window
            'specificCheckConfigCreate button[action=save]': {click: this.onSave},
            
            // export pdf window
            'specificCheckConfigCreate button[action=exportPdf]': {click: this.onExportPdf},
            
            // Edit window
            'specificCheckConfigEdit button[action=save]': {click: this.onUpdate},
            
            // export pdf window
            'specificCheckConfigEdit button[action=exportPdf]': {click: this.onExportPdf}
                  
        });
    },
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onRenderMain: function(sender){
        
        if(!this.getView().configuration){
            Dashboard.tool.Utilities.error('[profile.MainController.onRenderMain] configuration null or empty !');
        } 
    },
            
    onSelectItem: function(sender){
        this.selection = sender.selection;
    },
    
    onCreate: function(sender){
        this.create();
    },
    
    onEdit: function(sender){
        var model = this.getSelection();
        if(model){
           this.edit(model);
        }
    },
    
    onDestroy: function(sender){
        this.doDelete();
    },
    
    onRefresh: function(sender){
        this.refresh();
    },
    
    onSave: function(sender){
        var win = sender.up('window');
        this.save(win);
    },
    
    onUpdate: function(sender){
        var win = sender.up('window');
        this.update(win);
    },
    
    onCreateSpecificCheckParagraph: function(sender){
        this.createSpecificCheckParagraph();
    },
      
    onEditSpecificCheckParagraph: function(sender, panel, paragraph){
        this.editSpecificCheckParagraph(panel, paragraph);
    },
    
    onUpParagraph: function(button, item){
        this.goUp(item);
    },
    
    onDownParagraph: function(button, item){
        this.goDown(item);
    },
    
    
    onExportPdf: function(sender){
        var win = sender.up('window');
        this.exportPdf(win);
    },
    
    onAssociate: function(sender){
        var win = sender.up('window');
        this.associate();
    },
            
    onDissociate: function(sender){
        var win = sender.up('window');
        var grid = win.down('grid[name=referencesGrid]');
        this.dissociate(grid);
    },
    
    onSelectReferences: function(sender){
        this.selectItems(sender, 'referencesGrid');
    },
    
    onAssociateCategory: function(sender){
        var win = sender.up('window');
        this.associateCategory();
    },
            
    onDissociateCategory: function(sender){
        var win = sender.up('window');
        var grid = win.down('grid[name=categoriesGrid]');
        this.dissociate(grid);
    },
    
    onSelectCategories: function(sender){
        this.selectItems(sender, 'categoriesGrid');
    },
    //==========================================================================
    //   Methods 
    //==========================================================================
    
    
    getSelection: function(){

        var selection = null;
        var viewList = this.getView().down('viewList');
        
        if(viewList){
            selection = viewList.getSelection();
        }

        if(!selection){
            return null;
        }
        
        return selection;
    },
    

    
    create: function(){

        this.windowCreate = Ext.create('Dashboard.view.settings.specificCheckConfig.Create');
        this.windowCreate.show();

    },
    
    
    edit: function(model){
        
        Ext.Msg.show({
            title: getText('Edit'),
            msg: getText('Attention, this modification requires total synchronizations on all the tablets. First, make sure that all the controls done on the tablets were synchronized.'),
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    this.windowEdit = Ext.create('Dashboard.view.settings.specificCheckConfig.Edit', {record:model.data});
                    this.windowEdit.show();                
                }
            }
        }); 
                
    },
    
    
    doDelete: function(){
        
        var selection = this.getSelection();
        if (selection) {
            this.confirmDelete(selection);
        }else {
            Ext.Msg.alert(getText('Warning'), getText('No element selected'));
        }
    },
    
    
    confirmDelete: function (selection){
        
        var selectionId = selection.data.id;
        
        Ext.Msg.show({
            title: getText('Delete'),
            msg: getText('Do you really want to delete ') + " \"" + selection.data.name + "\" ?",
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if(btn === 'yes'){
                    Dashboard.manager.settings.SpecificCheckConfigManager.deleteOne(selectionId, this, 'refresh');                
                }
            }
        }); 
    },
    
    
    refresh: function (){
        var store = Ext.ComponentQuery.query('specificCheckConfigMain')[0].store;
        store.load();        
    },
    
    
    save: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.settings.SpecificCheckConfig', data);
        Dashboard.manager.settings.SpecificCheckConfigManager.save(model, this, 'doPostSaveAction');
    },
    
    
    update: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getData();
        var model = Ext.create('Dashboard.model.settings.SpecificCheckConfig', data);
        Dashboard.manager.settings.SpecificCheckConfigManager.update(model, this, 'doPostEditAction');
        
    },   
    
    exportPdf: function(win){

        if ( !win.down('form').isValid() ) {
            Ext.Msg.show({ title : getText('Error'), msg : getText('Form not valid!'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            return;
        }
        
        var data = win.getDataExport();

        var xhr = new XMLHttpRequest();
        xhr.open('POST', Dashboard.config.Config.SERVER_HOST_NAME + '/specificCheckReport/pdf');
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.responseType = 'blob';
        xhr.send(JSON.stringify(data));
        
        xhr.onload = function (e) {
            if (this.status === 200) {
                var blob = new Blob([this.response], {type: 'image/pdf'});
                saveAs(blob, getText('Specific check') + '_' + getText('Report') +'_preview.pdf');
            } else {
                Ext.Msg.show({ title : getText('Error'), msg : getText('Server error'), buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });
            }
        };
    },
    
    goUp: function(item){
        this.moveSelectedRow(item, -1);
    },
            
    
    goDown: function(item){
        this.moveSelectedRow(item, 1);
    },
            
            
    moveSelectedRow: function(item, direction) {
        var paragraphPanel = this.getView().down('panel[reference=specificCheckParagraphPanel]');
        if (!item) {
            return;
        }
        var index = paragraphPanel.items.indexOf(item);
        if (direction < 0) {
            index--;
            if (index < 0) {
                index = paragraphPanel.items.getCount();
            }
        } else {
            index++;
            if (index >= paragraphPanel.items.getCount()) {
                index = 0;
            }
        }       
        paragraphPanel.insert(index, item);
    },
    
    
    associate: function(selection){
        this.referencesSelectWindow = Ext.create('Dashboard.view.reference.Selector', {
            autoShow: true,
            parentController: this
        }); 
    },
    
    dissociate: function(dataGrid){
        var selectedRaws = dataGrid.getSelection();

        if (selectedRaws.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        } 
        
        dataGrid.store.remove(selectedRaws); 
        dataGrid.updateLayout();
    
    },
    
    associateCategory: function(selection){
        this.referencesSelectWindow = Ext.create('Dashboard.view.administration.category.Selector', {
            autoShow: true,
            parentController: this
        }); 
    },
    
    
    selectItems: function(button, nameGrid){
        
        // Get winForm
        var win = button.up('window');
        var dataGrid = win.down('grid');
        
        // Get selected line from dataGrid
        var selectedRows = dataGrid.getSelectionModel().getSelection();
        
        if (selectedRows.length < 1) {          
            Dashboard.tool.Utilities.showNotSelectedMessage();
            return;
        }
        
        var createWindow = Ext.ComponentQuery.query('specificCheckConfigCreate');
        var editWindow = Ext.ComponentQuery.query('specificCheckConfigEdit');
        var grid = null;

        if(createWindow.length > 0){
            grid = createWindow[0].down('grid[name='+nameGrid+']');
        }else if(editWindow.length > 0){
            grid = editWindow[0].down('grid[name='+nameGrid+']');
        }
        
        if(grid !== null){
            var store = grid.store;
            Ext.each(selectedRows, function(row) {
                var found = false;
                for(var i = 0; i < store.data.items.length; i++) {
                    if (store.data.items[i].data.id === row.data.id) {
                        found = true;
                        break;
                    }
                }
                if(!found){
                    store.add(row);
                }
            });

            grid.updateLayout();
        }
        win.close();
    },
    
    //=========================================
    //   Paragraph gestion
    //=========================================
    
    
    
    createSpecificCheckParagraph : function(type){
        var win = Ext.create('Dashboard.view.settings.specificCheckConfig.paragraph.Create',{
            mainController: this
        });
        win.show();
    },
    
    editSpecificCheckParagraph: function(currentPanel, paragraph){
        var win = Ext.create('Dashboard.view.settings.specificCheckConfig.paragraph.Edit',{
            mainController: this, record:paragraph, currentPanel: currentPanel
        });
        win.show();
    },
    
    
    
    doPostSaveAction: function(model){        
        var win = Ext.ComponentQuery.query('specificCheckConfigCreate')[0];
        win.close();
        this.refresh();
    },
    
    
    doPostEditAction: function(model){
        
        var win = Ext.ComponentQuery.query('specificCheckConfigEdit')[0];
        win.close();
        this.refresh();
    },    
    
    doPostActionSaveParagraph: function(model){
        
        Dashboard.manager.authentication.LoginScreenManager.keepSession();

        var win = Ext.ComponentQuery.query('specificCheckConfigCreate')[0];
        
        if(win === undefined){
            win = Ext.ComponentQuery.query('specificCheckConfigEdit')[0];
        }
        
        win.addParagraph(model);
        this.closeParagraphCreateWindow();
        
        
    },
    
    closeParagraphCreateWindow: function(){
        var win = Ext.ComponentQuery.query('paragraphCreate')[0];
        if(win !== undefined){
            win.close();
        }
    },
    
    doPostActionEditParagraph: function(currentPanel, model){
        
        Dashboard.manager.authentication.LoginScreenManager.keepSession();
        
        var win = Ext.ComponentQuery.query('specificCheckConfigCreate')[0];
        
        if(win === undefined){
            win = Ext.ComponentQuery.query('specificCheckConfigEdit')[0];
        }
        win.updateParagraph(currentPanel, model);
        this.closeParagraphEditWindow();
    },
    
    closeParagraphEditWindow: function(){
       var win = Ext.ComponentQuery.query('paragraphEdit')[0];
        if(win !== undefined){
            win.close();
        }
    }

});