/*  global Ext */

Ext.define('Dashboard.view.indicator.IndicatorEditorController',{
    extend: 'Ext.app.ViewController',
    
    require:[
        'Dashboard.config.Config',
        'Dashboar.manager.DashboardEditorManager',
        'Dashboard.manager.IndicatorManager',
        'Dashboard.view.shared.IconPicker',
        'Dashboard.view.shared.ColorPicker'
    ],
    
    
    onIconPicker: function(sender){

        var iconPicker = Ext.create('Dashboard.view.shared.IconPicker',{});
        
        iconPicker.down('form').lookupReference( 'selectedIconSrc' ).on({
            scope: this,
            change: function(sender) {
                //update icon
               this.getView().down('ux-img').setSrc(sender.value); 
               this.getView().down('hiddenfield[name=icon]').setValue(sender.value);
               sender.up('window').close();
            }
        });
        
        iconPicker.show(); 
    },
    
    
    /**
     * Event handler
     * @param {ux-panel} target
     * @returns {undefined}
     */
    onColorPicker: function(target){

        var colorPicker = Ext.create('Dashboard.view.shared.ColorPicker',{
            target: target
        });
        
        colorPicker.down('form').lookupReference( 'selectedColor' ).on({
            change: function(sender) {
                var target = sender.up('window').target;
                target.body.setStyle('background', sender.value);
                target.up('panel').down('hiddenfield[name=color]').setValue(sender.value);
                
                Ext.Function.defer(function(){
                    sender.up('window').close();
                }, 100);

            }
        });
        
        colorPicker.show(); 
    },
    
    
    /**
     * Event handler
     * @param {button} sender
     * @returns {undefined}
     */
    onSaveIndicator: function(sender){
        
        var form = this.getView().down('form').getForm();
        
        if (!form.isValid()) {
            this.getView().getInvalidFields();
            return;
        }
        
        this.saveIndicator();
    },
            
            
    deleteProperty: function(sender){
        var selectors = Ext.ComponentQuery.query('panel[name=propertySelector]');
        
        if(selectors.length > 1){
            sender.up('form').down('panel[reference=propertiesSelectors]').remove(sender.up('panel'));
        }
        
        selectors = Ext.ComponentQuery.query('panel[name=propertySelector]');
        
        if(selectors.length === 1 ){
            selectors[0].down('button[name=minusButton]').setDisabled( true );
        }
    }//,
    
    
//    /**
//     * Save indicator into server and add it to current dasboard
//     * @param {type} sender
//     * @returns {undefined}
//     */
//    saveIndicator: function(){
//        
//        var data = this.getView().getData();
//        
//        if(data.serverId){
//            this.updateIndicator();
//            return;
//        }
//              
//        var indicatorModel = Ext.create('Dashboard.model.Indicator',{
//            indicatorType: 'POST_IT',
//            dataBinding: data.dataBinding
//        });                    
//        
//        Dashboard.manager.IndicatorManager.save(indicatorModel);
//        
//        this.getView().close();
//    },
    
    
//    /**
//     * Update indicator into server
//     * @returns {undefined}
//     */
//    updateIndicator: function(){
//        
//        var data = this.getView().getData();
//         
//        var indicatorModel = Ext.create('Dashboard.model.Indicator',{
//            id: data.serverId,
//            indicatorType: 'POST_IT',
//            dataBinding: data.dataBinding
//        });                    
//        
//        try{
//            Dashboard.manager.IndicatorManager.update(indicatorModel);
//        }catch(ex){
//            throw new Error('[PostItEditorController.updateIndicator] create PostIt widget failed!' + ex);
//        }
//        
//        this.getView().close();
//        
//    },
    

    
});