Ext.define('Dashboard.view.shared.imagesViewer.ThumbnailEditController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.thumbnailEdit',
    
    require:[],
    
    view: 'thumbnailEdit',
    
    
    //==========================================================================
    //   Event handlers
    //==========================================================================
    
    onSelectThumbnail: function(sender){
        
        if (!sender.up('window').down('form').isValid()) {
            sender.up('window').getInvalidFields();
            return;
        }
                
        this.showNewThumbnail();
        
    },

    
    //==========================================================================
    //   Methods
    //==========================================================================
    
   
    
    showNewThumbnail: function(event){

        var imageTarget = Ext.ComponentQuery.query('image[name="thumbnailToEdit"]')[0];
        var imageSource = Ext.ComponentQuery.query('image[name=thumbnailImage]')[0];
        imageTarget.setSrc(imageSource.src);

        var thumbSelector = Ext.ComponentQuery.query('fileuploadfield[name="thumbnailFile"]')[0];
        var fileName = thumbSelector.getValue();
        
        var editWindown = this.getView().manager;
        
        if(editWindown !== null){
            try{
                editWindown.record.picture.thumbnailName = fileName;
            }catch(ex){}
        }
        
        this.getView().hide();
    }
    
    
});