/*  global Ext, Konva  */

Ext.define('Dashboard.view.cartography.sprite.DeviceSprite', {
    
    statics: {
        
        buildSprite: function(config, scope){
            
            var greenLedColor = 'green';
            var orangeLedColor = 'white';
            var redLedColor = 'white';

            try{
                var greenLedSwitchOn = config.device.device.properties.fodWarning;
                var redLedSwitchOn = config.device.device.properties.alertWarning;

                if(greenLedSwitchOn === 'true' || greenLedSwitchOn === true){
                    greenLedColor = 'white';
                    orangeLedColor = 'orange';
                }

                if(redLedSwitchOn === 'true' || redLedSwitchOn === true){
                    redLedColor = 'red';
                }
            }catch(ex){
                //undo
            }
            
            var greenLed = new Konva.Circle({
                x: 34 * config.homothetie,
                y: -40 * config.homothetie,
                radius: 4 * config.homothetie,
                fill: greenLedColor,
                stroke: 'green',
                strokeWidth: 1,
                name: 'FOD',
                id: 'greenLed',
                shadowColor: 'black',
                shadowBlur: 2,
                shadowOffset: {x: 2, y: 2},
                shadowOpacity: 0.5
            });
            
            var orangeLed = new Konva.Circle({
                x: 34 * config.homothetie,
                y: -27 * config.homothetie,
                radius: 4 * config.homothetie,
                fill: orangeLedColor,
                stroke: 'orange',
                strokeWidth: 1,
                name: 'FOD',
                id: 'orangeLed',
                shadowColor: 'black',
                shadowBlur: 2,
                shadowOffset: {x: 2, y: 2},
                shadowOpacity: 0.5
            });

            var redLed = new Konva.Circle({
                x: 34 * config.homothetie,
                y: -14 * config.homothetie,
                radius: 4 * config.homothetie,
                fill: redLedColor,
                stroke: 'red',
                strokeWidth: 1,
                name: 'Alert',
                id: 'redLed',
                shadowColor: 'black',
                shadowBlur: 2,
                shadowOffset: {x: 2, y: 2},
                shadowOpacity: 0.5
            });

            var deviceGroup = new Konva.Group({
                x: config.x,
                y: config.y,
                draggable: config.isEditionMode,
                dragOnTop: false,
                name: 'group_device_' +  + config.device.id,
                elementName: config.device.name
            });
            
//            if(config.device.device.properties && config.device.device.properties.fodWarning){
//                deviceGroup.add(greenLed);
//                deviceGroup.add(orangeLed);
//            }
//            
//            if(config.device.device.properties && config.device.device.properties.alertWarning){
//                deviceGroup.add(redLed);
//            }

            var height = config.height;

            var label = new Konva.Text({
                x: 0,
                y: 0,
                text: config.device.device.name,
                fontSize: config.fontSize,//18,
                fontFamily: 'Calibri',
                fill: '#050505',
                id: 'device_name_label_' + config.device.id,
                name: 'elementLabel',
                reference: 'label',
                elementName: config.device.name
            });

            label.offsetX(label.getWidth() / 2);
            label.offsetY(- height/2 -2);

            deviceGroup.add(label);

            var imgDevice = new Konva.Image({
                x: 0,
                y: 0,
                image: config.imageObj,
                //width: 0,
                //height: 0,
                offsetX: 0,
                offsetY: 0,
                name: config.device.device.name,
                elementName: config.device.name,
                id: 'device_' + config.device.id
            });
            
            deviceGroup.add(imgDevice);
            
            if(config.device.device.properties && config.device.device.properties.fodWarning){
                deviceGroup.add(greenLed);
                deviceGroup.add(orangeLed);
            }
            
            if(config.device.device.properties && config.device.device.properties.alertWarning){
                deviceGroup.add(redLed);
            }
            
//            var warning = new Konva.Group({
//                x: 0,
//                y: 0,
//                
//                name: 'warning',
//                elementName: 'warning'
//            });
//            
//            var warningTriangle = new Konva.RegularPolygon({
//                x: 0,
//                y: 0,
//                sides: 3,
//                radius: 16, //- config.height * 0.85
//                fill: 'red',
//                stroke: 'wite',
//                strokeWidth: 2,
//                shadowColor: 'black',
//                shadowBlur: 2,
//                shadowOffset: {x: 2, y: 2},
//                shadowOpacity: 0.5
//            });
//            
//            var exclamation = new Konva.Text({
//                x: 0,
//                y:  0,
//                text: '!',
//                fontSize: 12,
//                fontFamily: 'Calibri',
//                fill: '#fff'
//            });
//            
//            warning.add(warningTriangle);
//            warning.add(exclamation);
//            deviceGroup.add(warning);
            
            return deviceGroup;
        }
    }
    
});