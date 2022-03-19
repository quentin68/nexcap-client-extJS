/*  global Ext, Konva  */

Ext.define('Dashboard.view.cartography.sprite.PinSprite', {
    
    statics: {
        
        buildSprite: function(config, scope){
            
            var elementName = config.location.name;
            
            var locationPinGroup = new Konva.Group({
                x: config.x,
                y: config.y,
                draggable: config.isEditionMode,
                dragOnTop: false,
                name: 'group_location_pin_' + config.location.id,
                elementName: elementName
            });
            
            var imgPinLocation = new Konva.Image({
                x: 0,
                y: 0,
                image: config.imageObj,
                width: config.width,//50,
                height: config.height,//64,
                offsetX: config.width / 2,//25,
                offsetY: config.height,//64,
                name: config.location.location.name,
                elementName: elementName,
                id: 'location_pin_' + config.location.id
            });
            
            locationPinGroup.add(imgPinLocation);

            var itemsCount = config.location.location.statistic.itemsCount || 0;

            var itemsCountMapText = new Konva.Text({
                x: 0,
                y: - config.height * 0.85 ,
                text: itemsCount + '',
                fontSize: config.textFontSize,
                fontFamily: 'Calibri',
                fill: '#050505', //'#fff',//
                name: 'itemsCountMapText',
                elementName: elementName
            });

            itemsCountMapText.offsetX(itemsCountMapText.getWidth() / 2);
            locationPinGroup.add(itemsCountMapText);

            var label = new Konva.Text({
                x: 0,
                y: 0 + 2,
                text: config.location.location.name,
                fontSize: config.fontSize,
                fontFamily: 'Calibri',
                fill: '#050505',
                id: 'location_pin_name_label_' + config.location.id,
                name: 'elementLabel',
                reference: 'label',
                elementName: config.location.name
            });

            label.offsetX(label.getWidth() / 2);
            locationPinGroup.add(label);
            
            return locationPinGroup;
            
        }
    }
});