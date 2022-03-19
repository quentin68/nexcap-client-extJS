/*  global Ext, Konva  */

Ext.define('Dashboard.view.cartography.sprite.MaterialSprite', {
    //extend: 'Ext.window.Window',
    xtype: 'materialSprite',
    
    requires: ['Dashboard.tool.Utilities'],
    
    statics: {
        /**
         * 
         * @param {type} config :  
            mapMaterial: mapMaterial,
            x: position.x,
            y: position.y,
            draggable: parentScope.isEditionMode,
            radius: radius,
            color: color,
            fontSize: this.LABEL_FONT_SIZE
         * @returns {Konva.Group}
         */
        buildSprite: function(config){
                        
            var materialCircleGroup = new Konva.Group({
                x: config.x,
                y: config.y,
                draggable: config.draggable,
                dragOnTop: false,
                name: 'group_material_circle_' + config.mapMaterial.material.id
            });
            
            var circleElement = new Konva.Circle({
                x: 0,
                y: 0,
                radius: config.radius.x,
                fill: config.color,
                stroke: 'black',
                strokeWidth: 1,
                name: config.mapMaterial.material.name,
                elementName: config.mapMaterial.name,
                id: 'material_circle_' + config.mapMaterial.material.id,
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffset: {x: 5, y: 2},
                shadowOpacity: 0.5,
                informationBubble: config.mapMaterial.informationBubble
            });

            materialCircleGroup.add(circleElement);
            
            var label = new Konva.Text({
                x: 0,
                y: config.radius.x + 5,
                text: config.mapMaterial.material.name,
                fontSize: config.fontSize,
                fontFamily: 'Calibri',
                fill: '#050505',
                id: 'material_name_label_' + config.mapMaterial.material.id,
                name: 'elementLabel',
                reference: 'label'
            });

            label.offsetX(label.getWidth() / 2);

            materialCircleGroup.add(label);
            
            if (config.mapMaterial.icon) {
                var imageObj = new Image();
                imageObj.onload = function () {
                    var imgMaterialIcon = new Konva.Image({
                        x: 0,
                        y: 0,
                        image: imageObj,
                        width: 16,
                        height: 16,
                        offsetX: 8,
                        offsetY: 8,
                        name: config.mapMaterial.material.name,
                        elementName: config.mapMaterial.name,
                        id: 'material_icon_circle_' + config.mapMaterial.material.id
                    });

                    materialCircleGroup.add(imgMaterialIcon);
                    materialCircleGroup.draw();
                    
                    if (materialCircleGroup.attrs.x < materialCircleGroup.getWidth()) {
                        circleElement.attrs.x = circleElement.getWidth();
                    }

                    if (materialCircleGroup.attrs.y < materialCircleGroup.getHeight()) {
                        materialCircleGroup.attrs.y = materialCircleGroup.getHeight();
                    }
                };
                imageObj.src = config.mapMaterial.icon;
            }
                        
            return materialCircleGroup;
        }  
    }
});
