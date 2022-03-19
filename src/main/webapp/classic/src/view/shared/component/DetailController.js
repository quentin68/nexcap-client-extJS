/* global Ext  */

Ext.define('Dashboard.view.shared.component.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detail',
    
    require: ['Dashboard.view.shared.detail.DetailConfigurationController'],
    
    feature: Ext.create('Dashboard.store.Features').findRecord('name', 'USER_ADMIN', 0, false, true, true),
    
    windowEdit: null,
    windowCreate: null,
    selection: null,
    selectionMultiple: null,
    
    detailConfigurationWindow: null,

    init: function(){
    },
    // ==========================================================================
    // Event handlers
    // ==========================================================================
    
    onConfigDetail: function(sender){
        this.configDetail();
    },
    
    onHide: function(sender){
        
        var viewList = Ext.ComponentQuery.query('viewList')[0];
        if(!viewList){
            var button = Ext.ComponentQuery.query('button[toggleHandler=toggleDisplayDetail]')[0];
            if(!button){
                return;
            }
            button.setPressed(true);
                return;
        }
        
        var viewListButton = viewList.down('button[toggleHandler=toggleDisplayDetail]');
        if(!viewListButton){
            return;
        }
        viewListButton.setPressed(true);
        
    },

            
    // ==========================================================================
    // Methods
    // ==========================================================================

    configDetail: function(){
                        
        this.detailConfigurationWindow = Ext.create('Dashboard.view.shared.detail.DetailConfiguration',{
            mainView: this.getView().up('panel[tag=main]'),
            configuration : this.getView().getConfiguration()
        });
        this.detailConfigurationWindow.show();
    }


});
