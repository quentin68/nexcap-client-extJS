/* global Ext */

Ext.define('Dashboard.view.shared.imagesViewer.ThumbnailEdit', {
    extend: 'Ext.window.Window',
    xtype: 'thumbnailEdit',
    requires: [
        'Dashboard.tool.Utilities'
    ],
    

    layout: 'fit',
    autoShow: false, 
    closable : true,
    resizable : true,
    modal : true,
    constrain: true,
    closeAction : 'destroy',
    
    controller: 'thumbnailEdit',

    initComponent: function() {
        
        this.title = getText('Image editor');
        
        this.manager = null,

        this.items = [
            
            {
                xtype: 'form',
                name: 'thumbSelectorForm',
                border:false,
                width: 450,
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'panel',
                        name: 'thumbPanel',
                        border: false,
                        height: 96,
                        items: this.createThumbnail(null)
                    },
                    {        
                        xtype: 'filefield',
                        name: 'thumbnailFile',
                        fieldLabel: '',
                        vtype: 'imageFile', 
                        tooltip: getText('Select image'),
                        margin: '12',
                        allowBlank: false,
                        anchor: '100%',
                        labelSeparator: ' : ',
                        msgTarget : 'side',
                        buttonText: '',
                        buttonConfig: {
                            iconCls: 'fa fa-camera'
                        },
                        listeners: {
                            scope: this,
                            change: function(input, value, opts){
                                var me = this;
                                
                                var node = Ext.DomQuery.selectNode('input[id='+input.getInputId()+']');
                                node.value = value.replace("C:\\fakepath\\","");
                                
                                var file = input.getEl().down('input[type=file]').dom.files[0];

                                if (file.type === "image/jpeg" ||
                                    file.type === "image/jpg" ||
                                    file.type === "image/png" ||
                                    file.type === "image/bmp" ||
                                    file.type === "image/gif"){
                                
                                    var reader = new FileReader();
                                    
                                    reader.onload = function (e) {
                                        me.addThumbnail(e.target.result);
                                    };
                                        
                                    reader.readAsDataURL(file);

                                } 
                            }
                        }
                    }
                ]                        
            }

        ];        

        this.buttons = [
            {
                text: getText('Select'),
                action: 'upload',
                handler: 'onSelectThumbnail'
            },
            {
                text: getText('Cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);

    },   
    
    
    createThumbnail: function(imgSource){
        
        var defaultThumbnailSrc = 'resources/images/default_thumbnail.jpg';
            
            if(imgSource === null){
                imgSource = defaultThumbnailSrc;
            }
            
            var thumb = Ext.create('Ext.Img', {
                src : imgSource,
                name: 'thumbnailImage',
                height: 96,
                margin: '0 0 0 12',
                listeners: {
                    render: function (image) {

                        var widthMax = 350;
                        image.el.dom.onload = function () {

                            var originalImageSize = {
                                width: image.el.dom.width,
                                height: image.el.dom.height
                            };

                            if(originalImageSize.width > widthMax){
                                image.setHeight(96 * widthMax / originalImageSize.width);
                                image.setWidth(widthMax);
                            }
                        };
                    }
                }
            });
            
            return thumb;
            
        },
    
    
    addThumbnail: function(imgSource){
        
        var target = Ext.ComponentQuery.query('panel[name=thumbPanel]')[0];
        var previousThumb =  Ext.ComponentQuery.query('image[name="thumbnailImage"]')[0];
        
        if(previousThumb !== undefined){
            target.remove(previousThumb);
        }
                
       target.add(this.createThumbnail(imgSource));
        
    },
    
    
    getInvalidFields: function (){

        var invalidFields = [];

        Ext.suspendLayouts();

        this.down('form').getForm().getFields().filterBy(function (field){
            if (field.validate())
                return;
            invalidFields.push(field);
        });

        Ext.resumeLayouts(true);
        
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

        return invalidFields;
    },
            
            
    getImageSrc: function(){

        var imageSrc = this.down('image[name=thumbnailImage]').src;
        return imageSrc;
    },
    
    
    /**
     * Method used by the controller to get values
     * @return (object) data encoded to jSon
     */
    getData: function(){
        var winForm = this.down('form').getForm();
        var values = winForm.getFieldValues();
        return Ext.encode(values); 
    }
    
});   