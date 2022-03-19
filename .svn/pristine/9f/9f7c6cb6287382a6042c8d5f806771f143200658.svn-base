Ext.define('Dashboard.view.shared.detail.DetailConfiguration',{
    extend: 'Ext.window.Window',
    xtype: 'detailConfiguration',
    
    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    iconCls: 'fa fa-table',
    
    controller: 'detailConfiguration',
    modelProperties: null,
    mainView: null,
    configuration: null,
    
    fieldDefaults: {
        labelWidth: 110,
        anchor: '100%'
    },
    
    initComponent: function() {
        
        this.title = getText('Detail configuration');
        
        var imageSize = null;
        if(this.configuration){
            imageSize = this.configuration.imageSize;
        }
        
        var imageSize = {
            xtype: 'combo',
            name: 'imageSize',
            reference: 'imageSize',
            fieldLabel: getText('Image size'),
            displayField: 'label',
            valueField: 'percent',
            editable:false,
            value: imageSize ? imageSize : '90%',
            store: Ext.create('Dashboard.store.enums.Sizes',{
                autoLoad: true
            })
        };
        
        
        this.items = [
            {
                xtype: 'form',
                //referenceHolder: true,
                border:false,
                width: 700,
                height: 400,
                layout: 'vbox',
                scrollable:'y',
                margin : 20,
                defaults:{
                    width: '100%'
                },
                items:[ 
                    imageSize
                ]
            }
        ];  
        
        this.buttons = [
            {
                text: getText('Save'),
                handler: 'onSaveConfiguration',
                action: 'onSaveConfiguration'
            },{
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];
    
        this.callParent(arguments);
        this.setDisplaying();
        
    },

      
    setDisplaying: function(){

//        var config = this.mainView.configuration.table;
//        var displayRowNumber = false;
//        var displayThumbnails = false;
//        
//        if(config.displayRowNumbers){
//            displayRowNumber = config.displayRowNumbers;
//        }
//        this.down('checkboxfield[name=displayRowNumbers]').setValue(displayRowNumber);
//        
//        
//        var displayThumbnailCheckBox = this.down('checkboxfield[name=displayThumbnail]');
//        if(config.displayThumbnail !== undefined){
//            displayThumbnails = config.displayThumbnail;
//            displayThumbnailCheckBox.hidden = false;
//            displayThumbnailCheckBox.setValue(displayThumbnails);
//        }else{
//            displayThumbnailCheckBox.hidden = true;
//            displayThumbnailCheckBox.setValue(false);
//        }

    },
            
    
            
    getData: function(){

        var data = {};
                
        var imageSize = this.down('combo[reference=imageSize]').getValue();
        if(imageSize){
            data.imageSize = imageSize;
        }else{
            data.imageSize = null;
        }
        
        return data;
    }
});