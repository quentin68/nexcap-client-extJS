//Putain, mais qu'est-ce que ça fout là ça ???

Ext.define('Dashboard.view.dashboard.contextSelectWindow', {
    extend: 'Ext.window.Window',
    xtype: 'contextSelect',
    
    requires: ['Dashboard.tool.Utilities', 'Dashboard.view.shared.component.AutocompleteComboBox'],

    
    //controller: 'materialMain',
    
    layout: 'fit',
    autoShow: false,
    closable: false,
    resizable: true,
    modal: true,
    constrain: true,
    closeAction: 'destroy',
    height: 200,
    iconCls: 'x-fa fa-sitemap',
    record: null,
    contextsStore: null,
    parentScope: null,
    action: null,
    isClosable: false,
    
    config: {
         keyHandlers: {
             ENTER: 'onSelect'
         }
     },
    
    initComponent: function(){
        this.title = getText('Select context');
        
        this.contextsStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'context']
        });

        this.items = [{
                xtype: 'form',
                referenceHolder: true,
                border: false,
                width: 300,
                height: 50,
                scrollable: false,
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: getText('Context'),
                        style: 'padding-top: 10px; padding-left: 10px',
                        id: 'contextsComboSelect',
                        queryMode: 'local',
                        allowBlank: false,
                        matchFieldWidth: false,
                        displayField: 'context',
                        valueField: 'context',
                        store: this.contextsStore,
                        editable : false
                    }
                ]
            }];

        this.buttons = [
            {
                text: getText('Select'),
                handler: this.onSelect
            },
            {
                text: getText('Cancel'),
                scope: this,
                handler: this.close,
                hidden: !this.isClosable
            }
        ];

        this.callParent(arguments);
    },
    
    onSelect : function (){    
        var contextsComboSelect = Ext.getCmp('contextsComboSelect');
        var selectedContext = contextsComboSelect.value;

        var win = this.up('window'); // button
        if (!win) {
            win = this; // enter
        }
         
        // Temporary until store is implemented
        Dashboard.config.Config.contexts = {
            store: win.record,
            selected: selectedContext
        };
        
        if(win.action === 'login'){
            win.parentScope.showMustGoOn();
        }else if (win.action === 'dashboard'){
            Dashboard.app.getMainView().destroy();
            Dashboard.app.setMainView('Dashboard.view.main.MainPanel');
        }
        win.close();        
    },
    
    /**
     * Method used by the controller to get values
     * 
     * @return (object) data encoded to jSon
     */
    getData: function(){
        var winForm = this.down('form').getForm();
        var values = winForm.getValues();
        return values;
    },
    
    setParentScope: function (scope, action){
        this.parentScope = scope;
        this.action = action;
    },
    
    // SET DATA FOR DUPLICATE
    setData: function (data) {
        this.record = data;
        
        var parentContext = this;
        
        data.forEach(function (context) {
            parentContext.contextsStore.add({
                id: context,
                context: context
            });
        });
        
        var contextsComboSelect = Ext.getCmp('contextsComboSelect');
        contextsComboSelect.setValue(data[0]);
    }
});