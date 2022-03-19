Ext.define('Dashboard.view.shared.ColorPicker',{
    extend: 'Ext.window.Window',
    xtype: 'colorPicker',
    
    title: 'Color picker',
    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    closeAction : 'destroy',
    target: null,
    
    initComponent: function(){
        
        var colorPicker = Ext.create('Ext.picker.Color', {
            renderTo: Ext.getBody(),
            listeners: {
                select: function(picker, selColor) {
                    var fieldset = this.up('form').lookupReference('selectedColor');
                    fieldset.setValue("#"+selColor);
                }
            }
        });
        
        var me = this;
        Ext.apply( me, {
            
            items:[
                {
                    xtype: 'form',
                    referenceHolder: true,
                    border:false,
                    bodyPadding: 10,
                    items:[
                        colorPicker,
                        {
                            xtype: 'hiddenfield',
                            name: 'selectedColor',
                            reference: 'selectedColor'
                        }
                    ]       
                }
            ]      
        });

        this.callParent(arguments);
    }

});