/* global Konva, Ext */

Ext.define('Dashboard.view.cartography.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cartographyMap',

    require: [
        //'Dashboard.view.cartography.sprite.MaterialSprite',
        'Dashboard.tool.Utilities'
    ],

    view: 'Dashboard.view.cartography.Map',

    mainController: null,
    stage: null,
    chosenMap: null,

    backgroundLayerMap: null,
    materialsLayerMap: null,
    linksLayerMap: null,
    locationsLayerMap: null,
    devicesLayerMap: null,
    toolTipLayerMap: null,
    referenceAreaLayerMap: null,
    selectionLayerMap: null,
    labelsLayerMap: null,

    navigationHistory: [],
    panelMap: null,

    MATERIAL_RADIUS: 8, // px
    LABEL_FONT_SIZE: 14,
    COUNT_FONT_SIZE: 20,

    selectedItem: null,
    isEditionMode: true,

    // ==========================================================================
    // Init methods
    // ==========================================================================

    init: function () {
        this.mainController = this.getView().mainController;
        this.isEditionMode = Dashboard.manager.cartography.CartographyManager.editionMode;
        Dashboard.tool.Utilities.info('[MapController.init] EDITION :' + this.isEditionMode);
        
        this.devicesTypesStore = Ext.create('Dashboard.store.system.DevicesTypes', {
            autoLoad: true
        });
    },

    //build layers
    initMapLayers: function () {
        // Order is important
        this.setSelectionLayer();
        this.setLocationsLayer();
        this.setLinksLayer();
        this.setDevicesLayer();
        this.setMaterialsLayer();
        this.setLabelsLayer();
        // @todo refrence rect. layer
    },

    //display elements
    showMap: function (map) {
        this.setMapData(map);
    },

    toggleEditionMode: function (mapId, isEditionMode) {
        this.isEditionMode = isEditionMode;
        this.mainController.getAndDisplayMap(mapId);
    },

    //display elements
    setMapData: function (record, previous) {
        
        this.chosenMap = record.data;

        var pictureWidth = this.getView().getSize().width;
        var pictureHeight = this.getView().getSize().height;

        if (this.chosenMap.picture) {
            pictureWidth = this.chosenMap.picture.widthInPixels;
            pictureHeight = this.chosenMap.picture.heightInPixels;
        }

        var panelSize = this.getResponsiveStageSize(pictureWidth, pictureHeight);

        // Initialize stage
        if (!this.stage) {
            this.stage = new Konva.Stage({
                container: 'demoMapcontainer',
                width: panelSize.width,
                height: panelSize.height
            });
        } else {
            this.stage.setWidth(panelSize.width);
            this.stage.setHeight(panelSize.height);
        }

        // Set background map
        if (this.chosenMap.imageSrc) {
            
            Ext.Ajax.request({
                scope:this,
                binary: true,  //set binary to true
                method:'GET',
                url: this.chosenMap.imageSrc,
                success: function(response) {

                    var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                    url = window.URL.createObjectURL(blob);

                    this.setBackgroundImage(url);
                }
            });
            
            //this.setBackgroundImage(this.chosenMap.imageSrc);
        }

        this.initMapLayers();

        // Add materials to map
        if (this.chosenMap.materialsLayer && this.chosenMap.materialsLayer.mapMaterials) {
            for (var i = 0; i < this.chosenMap.materialsLayer.mapMaterials.length; i++) {
                this.addMaterialToMap(this.chosenMap.materialsLayer.mapMaterials[i]);
            }
        }

        // Set links 
        if (this.chosenMap.linkingZonesLayer && this.chosenMap.linkingZonesLayer.mapLinkingZones) {
            for (var i = 0; i < this.chosenMap.linkingZonesLayer.mapLinkingZones.length; i++) {
                this.addLinkToMap(this.chosenMap.linkingZonesLayer.mapLinkingZones[i]);
            }
        }

        // Set locations
        if (this.chosenMap.locationsLayer && this.chosenMap.locationsLayer.mapLocations) {
            for (var i = 0; i < this.chosenMap.locationsLayer.mapLocations.length; i++) {
                this.addLocationToMap(this.chosenMap.locationsLayer.mapLocations[i]);
            }
        }

        // Set Devices
        if (this.chosenMap.devicesLayer && this.chosenMap.devicesLayer.mapDevices) {
            for (var i = 0; i < this.chosenMap.devicesLayer.mapDevices.length; i++) {
                this.addDeviceToMap(this.chosenMap.devicesLayer.mapDevices[i]);
            }
        }

        // Set Labels
        if (this.chosenMap.labelsLayer && this.chosenMap.labelsLayer.mapLabels) {
            for (var i = 0; i < this.chosenMap.labelsLayer.mapLabels.length; i++) {
                this.addLabelToMap(this.chosenMap.labelsLayer.mapLabels[i]);
            }
        }

        // Set tooltips
        this.setToolTips();

        // draw stage
        this.stage.batchDraw();
    },

    setBackgroundImage: function (backgroundSrc) {
        var parentScope = this;

        // Set map as background layer
        if (this.backgroundLayerMap === null) {
            this.backgroundLayerMap = new Konva.Layer({
                id: 'layerBackground'
            });
        }

        var imageObj = new Image();
        imageObj.src = backgroundSrc;

        var imgMap = new Konva.Image({
            x: 0,
            y: 0,
            image: imageObj,
            width: parentScope.stage.width(),
            height: parentScope.stage.height(),
            name: 'bgImg'
        });

        imageObj.onload = function () {
            parentScope.backgroundLayerMap.add(imgMap);
            parentScope.stage.add(parentScope.backgroundLayerMap);
            parentScope.backgroundLayerMap.moveToBottom();
        };

        imgMap.on('click', function (me) {
            parentScope.onBackgroundImageClick(me);
        });
    },

    setSelectionLayer: function () {
        if (this.selectionLayerMap === null) {
            this.selectionLayerMap = new Konva.Layer({
                id: 'layerSelection'
            });
            this.stage.add(this.selectionLayerMap);
        }
    },

    setLabelsLayer: function () {
        if (this.labelsLayerMap === null) {
            this.labelsLayerMap = new Konva.Layer({
                id: 'layerLabels'
            });
            this.stage.add(this.labelsLayerMap);
        }
    },

    setMaterialsLayer: function () {
        if (this.materialsLayerMap === null) {
            this.materialsLayerMap = new Konva.Layer({
                id: 'layerMaterial'
            });
            this.stage.add(this.materialsLayerMap);
        }
    },

    setTooltipLayer: function () {
        if (this.toolTipLayerMap === null) {
            this.toolTipLayerMap = new Konva.Layer({
                id: 'layerTooltip'
            });
            this.stage.add(this.toolTipLayerMap);
        }
    },

    setLinksLayer: function () {
        if (this.linksLayerMap === null) {
            this.linksLayerMap = new Konva.Layer({
                id: 'layerLinkingZone'
            });
            this.stage.add(this.linksLayerMap);
        }
    },

    setLocationsLayer: function () {
        if (this.locationsLayerMap === null) {
            this.locationsLayerMap = new Konva.Layer({
                id: 'layerLocations'
            });
            this.stage.add(this.locationsLayerMap);
        }
    },


    setDevicesLayer: function () {
        if (this.devicesLayerMap === null) {
            this.devicesLayerMap = new Konva.Layer({
                id: 'layerDevices'
            });
            this.stage.add(this.devicesLayerMap);
        }
    },

    loadLinkedMap: function (id) {
        this.emptyStage(); // empty stage
        Dashboard.manager.demo.MapManager.getOne(id, this, 'navigateToMap');
    },

    emptyStage: function () {
        
        this.backgroundLayerMap = null;
        this.elementsNamesLayerMap = null;
        this.materialsLayerMap = null;
        this.linksLayerMap = null;
        this.toolTipLayerMap = null;
        this.labelsLayerMap = null;

        // remove events        
        this.stage.off('mousemove');
        this.stage.off('mouseout');

        this.stage.destroyChildren();
    },

    getPanelSize: function () {
        var stage = Ext.ComponentQuery.query('cartographyMap')[0];
        var size = stage.getSize();
        return size;
    },

    getResponsiveStageSize: function (origalWidth, origalHeight) {
        var panelSize = this.getPanelSize();
        var desiredWidth = panelSize.width;

        var ratio = desiredWidth / origalWidth;
        var desiredHeight = origalHeight * ratio;

        if (desiredHeight > panelSize.height) {
            desiredHeight = panelSize.height;
            ratio = desiredHeight / origalHeight;
            desiredWidth = origalWidth * ratio;
        }

        return {
            width: desiredWidth,
            height: desiredHeight,
            ratio: ratio
        };
    },

    getResponsiveRatio: function (point, ratioCalc) {
        try {
            var x = point.x;
            var y = point.y;

            x = ratioCalc * x;
            // @todo check this later 
            y = ratioCalc * y;

            return {x: x, y: y};
            
        } catch (ex) {
            Dashboard.tool.Utilities.error('[MapController.getResponsiveRatio] error :' + ex);
            return point;
        }
    },

    navigateToMap: function (model) {
        try {
            Dashboard.tool.Utilities.info('[MapController.init] navigateToMap to : ' + model.id);

            var panelMap = Ext.getCmp('mapDetail');
            var previous = panelMap.record;
            panelMap.setData(model);

            this.chosenMap = model.data;
            this.setMapData(model.data, previous);

            this.hideDetail(model);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[MapController.navigateToMap] error :' + ex);
        }
        this.pingServer();
    },


    hideAllToolTips: function () {
        var toolTips = this.toolTipLayerMap.getChildren();
        toolTips.forEach(function (tooltip) {
            tooltip.hide();
        });
    },

    getLayerElements: function (layerName) {

        var mapStage = this.stage;
        var layers = mapStage.getChildren();

        var children = [];
        layers.forEach(function (layer) {
            if (layer.attrs.id === layerName) {
                children = layer.getChildren();
            }
        }.bind(this));

        return children;
    },

    removeAllSelectedItems: function () {
        if (!this.selectedElement) {
            return;
        }

        if (this.selectedElement.className === "Image") {
            this.selectedElement.stroke(null);
            this.selectedElement.strokeWidth(null);
            
        }else if(this.selectedElement.className === "Text"){
            this.selectedElement.stroke(null);
            this.selectedElement.strokeWidth(null);
            
        } else {
            this.selectedElement.stroke('black');
            this.selectedElement.strokeWidth(2);
        }
    },

    showSelectedBox: function (element) {
                
        if (element instanceof Array && element.length > 0) {
            element = element[0];
        }
        if (this.selectedElement !== element) {
            this.removeAllSelectedItems();
            this.selectedElement = element;
        } else {
            return; // don't select twice ?
        }

        var SIZE = 3; // px 
        var MARGIN = 5; // px 
        var COLOR = 'rgba(15, 115, 255, 0.6)'; // RGBA
        
        if (element.attrs.id.startsWith('material_icon_circle')) {
            var group = element.getParent();
            var itemCircle = group.getChildren(function (node) {
                return node.getClassName() === 'Circle';
            });
            this.selectedElement = itemCircle;
            itemCircle.stroke(COLOR);
            itemCircle.strokeWidth(SIZE);
            this.stage.draw();
            
        } else if (element.stroke) { //label, Pin
            element.stroke(COLOR);
            element.strokeWidth(SIZE);
            this.stage.draw();
            
        } else {
            if (element.className === 'Image') {
                var width = element.width + MARGIN;
                var height = element.height + MARGIN;
                var x = x - (width / 2);
                var y = y - (height / 2);
            }

            var rect = new Konva.Rect({
                x: x,
                y: y,
                width: width,
                height: height,
                opacity: 0,
                dash: [2, 5],
                stroke: COLOR,
                strokeWidth: SIZE,
                name: 'selectedBox',
                id: 'selectedBox'
            });

            this.selectionLayerMap.add(rect);
            this.selectionLayerMap.draw();
        }
    },


    // ==========================================================================
    // Event handlers
    // ==========================================================================

    onChangePosition: function (sender) {
        if (sender.name) {
            var materialId = sender.name.split('#')[1];

            var inputPosX = Ext.getCmp('inputPosX');
            var inputPosY = Ext.getCmp('inputPosY');

            var posX = parseInt(inputPosX.value) / 100;
            var posY = parseInt(inputPosY.value) / 100;

            var materialCircle = this.getMaterialFormById(materialId);

            var panelSize = this.getResponsiveStageSize(this.chosenMap.width, this.chosenMap.height);
            var position = {
                x: posX * panelSize.width,
                y: posY * panelSize.height
            };

            this.updateMapData(materialId, posX, posY, null);

            materialCircle.x(position.x);
            materialCircle.y(position.y);
            this.stage.batchDraw();
        }
        this.pingServer();
    },

    onRenderMap: function () {
        try {
            this.navigationHistory = [];
            var map = this.getView().record;
            this.showMap(map);
        } catch (ex) {
            Dashboard.tool.Utilities.error('[MapController.onRenderMap] error :' + ex);
        }
    },

    snapshot: function () {
        var canvas = this.stage;
        var mapData = canvas.toDataURL("image/png");

        var link = document.createElement('a');
        link.download = "map.png";
        link.href = mapData;
        link.click();
    },

    onRefresh: function () {
        this.refresh();
    },

    onBackgroundImageClick: function (sender) {
        
        this.selectionLayerMap.destroyChildren();
        this.removeAllSelectedItems();
        this.selectedElement = null;
        this.stage.draw();
        this.mainController.onBackgroundImageClick(sender);
    },

    // @TODO test
    centerTest: function (x, y) {
        return new Konva.Star({
            x: x,
            y: y,
            numPoints: 5,
            innerRadius: 5,
            outerRadius: 5,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 1
        });
    },

    setDragAndDropEvents: function (canvasElement, element, parentScope, startDragCallback, endDragCallback) {
                
        canvasElement.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });

        canvasElement.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });

        // listen to dragstart
        canvasElement.on('dragstart', function (e) {
            e.target.opacity(0.5);
            parentScope.toolTipLayerMap.hide(); // hide tooltip when dragging
            var layer = this.getLayer();
            layer.draw();
            parentScope.selectionLayerMap.destroyChildren();
            parentScope.selectionLayerMap.draw();
            startDragCallback(e.evt.pageX, e.evt.pageY, element, canvasElement);

            // Before
            if (e.target.nodeType === 'Group') {
                var group = e.target;
            } else if (e.target.getParent().nodeType === 'Group') {
                var group = e.target.getParent();
            }

            // Do pin stuff
            if (group && group.attrs.name.startsWith('group_location_pin')) {
                var pin = null;
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].className === 'Image') {
                        pin = group.children[i];
                        break;
                    }
                }

                if (pin) {
                    element.dragStart = {
                        id: element.id,
                        x: group.attrs.x,
                        y: group.attrs.y,
                        width: pin.getWidth(),
                        height: pin.getHeight()
                    };
                }
            }

            // Do material stuff
            else if (group && group.attrs.name.startsWith('group_material_circle')) {
                var circle = null;
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].className === 'Circle') {
                        circle = group.children[i];
                        break;
                    }
                }

                if (circle) {
                    element.dragStart = {
                        id: circle.attrs.id,
                        x: group.getAbsolutePosition().x,
                        y: group.getAbsolutePosition().y
                    };
                    return;
                }
            }else if (group && group.attrs.name.startsWith('group_device')) {
                var img = null;
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].className === 'Image') {
                        img = group.children[i];
                        break;
                    }
                }

                if (img) {
                    element.dragStart = {
                        id: img.attrs.id,
                        x: group.getAbsolutePosition().x,
                        y: group.getAbsolutePosition().y
                    };
                    return;
                }
            } else if (group) {
                var topLeft = group.get('.tooltipTopLeft')[0];
                var topRight = group.get('.tooltipTopRight')[0];
                var bottomRight = group.get('.tooltipBottomRight')[0];
                var bottomLeft = group.get('.tooltipBottomLeft')[0];

                topLeft.show();
                topRight.show();
                bottomRight.show();
                bottomLeft.show();

                var rect = null;
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].className === 'Rect') {
                        rect = group.children[i];
                        break;
                    }
                }

                if (rect !== null) {
                    var x = topLeft.getAbsolutePosition().x;
                    var y = topLeft.getAbsolutePosition().y;
                    element.dragStart = {
                        id: element.id,
                        x: x,
                        y: y,
                        width: rect.getWidth(),
                        height: rect.getHeight()
                    };
                }

                // text 
                var itemsCountMapText = null;
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].attrs.name === 'itemsCountMapText') {
                        itemsCountMapText = group.children[i];
                        break;
                    }
                }

                if (itemsCountMapText) {
                    itemsCountMapText.hide();
                }

                var startPosition = {};
                group.children.forEach(function (child) {
                    if (child.attrs.name === 'tooltipTopLeft') {
                        startPosition.x = child.getAbsolutePosition().x;
                        startPosition.y = child.getAbsolutePosition().y;
                    }

                    if (child.className === 'Rect') {
                        startPosition.width = child.getWidth();
                        startPosition.height = child.getHeight();
                    }
                });

                element.dragStart.startPosition = startPosition;
                return;
            }
            element.dragStart = e.currentTarget; // group (target = Circle) 
        });

        // listen to dragend
        canvasElement.on('dragend', function (e) {
                                                
            e.target.opacity(1);
            var layer = this.getLayer();
            layer.draw();
            parentScope.toolTipLayerMap.show(); // show tooltip at drag end

            if (e.target.nodeType === 'Group') {
                var group = e.target;
            } else if (e.target.getParent().nodeType === 'Group') {
                var group = e.target.getParent();
            }

            // Do pin stuff
            if (group && group.attrs.name.startsWith('group_location_pin')) {

                var pin = group.findOne('Image');
                
                // PIN
                if (pin) {
                                        
                    canvasElement.attrs.width = pin.getSize().width;
                    canvasElement.attrs.height = pin.getSize().height;
                    canvasElement.type = 'PIN';
                    
                    var updatedValue = {
                        id: element.id,
                        x: group.attrs.x,
                        y: group.attrs.y,
                        name: pin.attrs.name,
                        elementName: pin.attrs.elementName
                    };

                    parentScope.selectionLayerMap.destroyChildren();
                    parentScope.selectionLayerMap.draw();
                    endDragCallback(element, updatedValue, canvasElement);
                    return;
                }

            } else if (group && group.attrs.name.startsWith('group_material_circle')) {
                // Do material stuff
                var circle = null;
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].className === 'Circle') {
                        circle = group.children[i];
                        break;
                    }
                }

                if (circle) {
                                        
                    canvasElement.attrs.width = circle.attrs.radius *2;
                    canvasElement.attrs.height = circle.attrs.radius *2;
                    canvasElement.type = 'MATERIAL';
                    
                    var updatedValue = {
                        id: element.id,
                        x: group.attrs.x,
                        y: group.attrs.y,
                        name: circle.attrs.name,
                        elementName: circle.attrs.elementName
                    };

                    parentScope.selectionLayerMap.destroyChildren();
                    parentScope.selectionLayerMap.draw();
                    endDragCallback(element, updatedValue, canvasElement);
                    return;
                }
                
             // Devices   
            }else if (group && group.attrs.name.startsWith('group_device')) {
                
                // Do material stuff
                var img = group.findOne('Image');

                if (img) {
                                                            
                    canvasElement.attrs.width = img.getSize().width;
                    canvasElement.attrs.height = img.getSize().height;
                    canvasElement.type = 'DEVICE';
                    
                    var updatedValue = {
                        id: element.id,
                        x: group.attrs.x,
                        y: group.attrs.y,
                        name: img.attrs.name,
                        elementName: img.attrs.elementName
                    };

                    parentScope.selectionLayerMap.destroyChildren();
                    parentScope.selectionLayerMap.draw();
                    endDragCallback(element, updatedValue, canvasElement);
                    return;
                }
                
             // Location / link   
            } else if (group) {
                                
                var topLeft = group.get('.tooltipTopLeft')[0];
                var topRight = group.get('.tooltipTopRight')[0];
                var bottomRight = group.get('.tooltipBottomRight')[0];
                var bottomLeft = group.get('.tooltipBottomLeft')[0];

                topLeft.show();
                topRight.show();
                bottomRight.show();
                bottomLeft.show();

                var rect = null;
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].className === 'Rect') {
                        rect = group.children[i];
                        break;
                    }
                }

                if (rect !== null) {
                    if (rect.getWidth() < 0 || rect.getHeight() < 0) {
                        
                        Ext.MessageBox.alert('Ooops!', 'Looks like you\'re doing something wrong!', function () {
                            var startPosition = element.dragStart.startPosition;
                            rect.setWidth(startPosition.width);
                            rect.setHeight(startPosition.height);

                            var itemsCountMapText = group.get('.itemsCountMapText');
                            if (itemsCountMapText && itemsCountMapText.length > 0) {
                                itemsCountMapText[0].show();
                            }

                            rect.x(0);
                            rect.y(0);

                            topLeft.x(0);
                            topLeft.y(0);

                            topRight.x(startPosition.width);
                            topRight.y(0);

                            bottomLeft.x(0);
                            bottomLeft.y(startPosition.height);

                            bottomRight.x(startPosition.width);
                            bottomRight.y(startPosition.height);

                            parentScope.stage.draw();
                            return true;
                        });
                        
                    } else {
                        var x = topLeft.getAbsolutePosition().x;
                        var y = topLeft.getAbsolutePosition().y;

                        var updatedValue = {
                            id: element.id,
                            x: x,
                            y: y,
                            width: rect.getWidth(),
                            height: rect.getHeight(),
                            name: element.name,
                            elementName: element.elementName
                        };
                                                
                        canvasElement.attrs.width = rect.getWidth();
                        canvasElement.attrs.height = rect.getHeight();
                        canvasElement.type = 'REC';

                        parentScope.selectionLayerMap.destroyChildren();
                        parentScope.selectionLayerMap.draw();

                        // text 
                        var itemsCountMapText = null;
                        for (var i = 0; i < group.children.length; i++) {
                            if (group.children[i].attrs.name === 'itemsCountMapText') {
                                itemsCountMapText = group.children[i];
                                break;
                            }
                        }

                        if (itemsCountMapText) {
                            itemsCountMapText.setAbsolutePosition({
                                x: x + (rect.getWidth() / 2),
                                y: y + 5
                            });
                            itemsCountMapText.show();
                            itemsCountMapText.draw();
                        }

                        endDragCallback(e.evt.pageX, e.evt.pageY, element, updatedValue, canvasElement);
                        return;
                    }
                }
            } else {
                var updatedValue = {
                    id: element.id,
                    x: e.target.x(),
                    y: e.target.y(),
                    name: element.name,
                    elementName: element.elementName
                };
                                
                if(canvasElement.className === 'Text'){
                    
                    canvasElement.attrs.width = canvasElement.textWidth;
                    canvasElement.attrs.height = canvasElement.textHeight;
                    canvasElement.type = 'LABEL';
                }else if(canvasElement.className === 'Image'){
                    canvasElement.type = 'IMAGE';
                }

                
                parentScope.selectionLayerMap.destroyChildren();
                parentScope.selectionLayerMap.draw();
                endDragCallback(element, updatedValue, canvasElement);
            }
        });
    },

    // MATERIAL 
    onMaterialClick: function (scope, element) {
        if (element.target) {
            var materialId = element.target.attrs.id.split('_');
            materialId = materialId[materialId.length - 1];
        } else {
            var materialId = element.material.id;
        }

        scope.mainController.onSelectMapElement(element, 'MATERIAL');
        this.setSelectedItem(element.target, scope.setSelectedMaterialMap);
    },

    onMaterialDragStart: function (x, y, element) {
        element.dragStart = {x: x, y: y};
    },

    onMaterialDragEnd: function (element, updatedValue, canvasElement) {
        
        // Check if object moved 
        if (element.dragStart.x === updatedValue.x && element.dragStart.y === updatedValue.y) {
            this.onMaterialClick(this, element);
            
        } else {
            updatedValue = this.ifOutOfStage(element, updatedValue, canvasElement);
            updatedValue.elementName = element.elementName;
            
            //Save new values
            this.mainController.onMaterialDragEnd(updatedValue, element);
        }

        this.mainController.onSelectMapElement(element, 'MATERIAL');
        delete element.dragStart;
    },
    
    
    /**
     * Test if element out of stage
     * @param {type} element
     * @param {type} updatedValue
     * @param {type} canvasElement
     * @returns {unresolved}
     */
    ifOutOfStage: function(element, updatedValue, canvasElement){
                                
        var width = canvasElement.attrs.width;
        var height = canvasElement.attrs.height;
        
        var stageWidth = this.stage.attrs.width;
        var stageHeight = this.stage.attrs.height;

        if(updatedValue.x >= stageWidth ){
            //informationBubble
            updatedValue.x = stageWidth - (width/2);
            
            if(canvasElement.type === 'PIN' || canvasElement.type === 'IMAGE' || canvasElement.type === 'MATERIAL' || canvasElement.type === 'DEVICE'){
                updatedValue.x = stageWidth;
            }
            
            canvasElement.x(updatedValue.x);
            
        }else if(updatedValue.x <= 0){
            
            updatedValue.x = -width/2;
            
            if(canvasElement.type === 'PIN' 
                    || canvasElement.type === 'IMAGE' 
                    || canvasElement.type === 'MATERIAL'
                    || canvasElement.type === 'DEVICE'){
                updatedValue.x = 0;
            }else if(canvasElement.type === 'LABEL'){
                updatedValue.x = width/2;
            }
            
            canvasElement.x(updatedValue.x);
        }

        if(updatedValue.y >= stageHeight ){
            updatedValue.y = stageHeight - (height/2);
            
            if(canvasElement.type === 'PIN'){
                updatedValue.y = stageHeight;
            }else if(canvasElement.type === 'IMAGE' || canvasElement.type === 'MATERIAL'){
                updatedValue.y = stageHeight;
            }
            
            canvasElement.y(updatedValue.y);
            
        }else if(updatedValue.y <= 0){
            updatedValue.y = -height/2;
            
            if(canvasElement.type === 'PIN' || canvasElement.type === 'LABEL'){
                updatedValue.y = height/2;
            }else if(canvasElement.type === 'IMAGE' 
                    || canvasElement.type === 'MATERIAL' 
                    || canvasElement.type === 'DEVICE'){
                updatedValue.y = 0;
            }
            
            canvasElement.y(updatedValue.y);
        }


        this.stage.draw();
        
        return updatedValue;
    },

    // LINKS
    onLinkResizeStart: function (x, y, width, height, element) {
        element.dragStart = {x: x, y: y, width: width, height: height};
    },

    onLinkResizeEnd: function (x, y, width, height, element) {
        element.dragStart = {x: x, y: y, width: width, height: height};
    },

    onLinkDragStart: function (x, y, element) {
        element.dragStart = {x: x, y: y};
    },

    onLinkDragEnd: function (x, y, element, updatedValue, canvasElement) {
        
        updatedValue = this.ifOutOfStage(element, updatedValue, canvasElement);
 
        updatedValue.elementName = element.elementName;
        this.mainController.onLinkDragEnd(updatedValue);  // id, x, y, width, height, name

        this.mainController.onSelectMapElement(element, 'LINK');
        delete element.dragStart;
    },

    onLinkClick: function (element, isNativeClick, sender) {
        if (this.mainController === undefined) {
            this.mainController = Ext.ComponentQuery.query('cartographyMapStage')[0].getController();
        }
        this.mainController.onLinkClicked(sender, element);
    },

    onLinkAnchorClick: function (link) {
        this.mainController.onSelectMapElement(link, 'LINK');
    },

    // LOCATION
    onLocationAreaDragStart: function (x, y, element) {
        element.dragStart = {x: x, y: y};
    },

    onLocationAreaDragEnd: function (x, y, element, updatedValue, canvasElement) {
                
        var moved = false;
        if(element.dragStart.x !== updatedValue.x || element.dragStart.y !== updatedValue.y){
            moved = true;
        }
        
        var resized = false;
        if(element.dragStart.width !== updatedValue.width || element.dragStart.height === updatedValue.height){
            resized = true;
        }
        
        // Check if object moved 
        if (!moved && !resized) {
            // do click
            this.onLocationClick(element, this);
        } else {
            updatedValue = this.ifOutOfStage(element, updatedValue, canvasElement);
            
            updatedValue.elementName = element.elementName;
            this.mainController.onLocationDragEnd(updatedValue); // id, x, y, width, height, name
        }
                
        this.mainController.onSelectMapElement(element, 'LOCATION');
        delete element.dragStart;
    },
    
    // LOCATION
    onLocationClick: function (element, sender) {
                
        var id = element.id || function () {
            element.target.attrs.id.split('_');
            return id[id.length - 1];
        };

        this.setSelectedItem(sender.target, null);

        this.mainController.onSelectMapElement(element, 'LOCATION');
    },

    onLocationDragStart: function (x, y, element) {
        element.dragStart = {x: x, y: y};
    },

    onLocationDragEnd: function (element, updatedValue, canvasElement) {
                
        var moved = false;
        if(element.dragStart.x !== updatedValue.x || element.dragStart.y !== updatedValue.y){
            moved = true;
        }
        
        // Check if object moved 
        if (!moved) {
            this.onLocationClick(element, this);
        } else {
            
            updatedValue = this.ifOutOfStage(element, updatedValue, canvasElement);
            
            this.mainController.onLocationDragEnd({
                id: element.id,
                x: updatedValue.x,
                y: updatedValue.y,
                width: 0,
                height: 0,
                name: element.name,
                elementName: element.elementName
            });

        }
        this.mainController.onSelectMapElement(element, 'LOCATION');
        delete element.dragStart;
    },

    // DEVICE 
    onDeviceClick: function (parentScope, element) {
        this.setSelectedItem(element.target, parentScope.setSelectedDeviceMap);
        this.mainController.onSelectMapElement(element, 'DEVICE');
        this.mainController.onDeviceClick(element);
    },

    onDeviceDragStart: function (x, y, element) {
        element.dragStart = {x: x, y: y};
    },

    onDeviceDragEnd: function (element, updatedValue, canvasElement) {
                
        // Check if object moved 
        if (element.dragStart.x === updatedValue.x && element.dragStart.y === updatedValue.y) {
            this.onDeviceClick(this, element);
        } else {
            
            updatedValue = this.ifOutOfStage(element, updatedValue, canvasElement);
            
            updatedValue.elementName = element.elementName;
            this.mainController.onDeviceDragEnd(updatedValue);
        }
                
        this.mainController.onSelectMapElement(element, 'DEVICE');
        delete element.dragStart;
    },
    
    //LABEL
    
    onLabelTextClick: function (scope, element) {
        if (element.target) {
            var labelId = element.target.attrs.id.split('_');
            labelId = labelId[labelId.length - 1];
        } else {
            var labelId = element.material.id;
        }

        scope.mainController.onSelectMapElement(element, 'LABEL');
        this.setSelectedItem(element.target, scope.setSelectedLabelMap);
    },
    
    setSelectedLabelMap: function(){
        
    },

    // ==========================================================================
    // Map Methods
    // ==========================================================================
    

    // MATERIAL
    addMaterialToMap: function (mapMaterial) {
                
        var homothetie = this.chosenMap.materialsLayer.options.homothetie;
        if(!homothetie){
            homothetie = 1;
        }
                        
        mapMaterial.elementName = mapMaterial.name;
        
        var stageSize = this.stage.getSize();
        var width = 8;
        var height = 8;
        var percent = 1;
        
        if(!mapMaterial.width){
            mapMaterial.width = width;
        }
        if(!mapMaterial.height){
            mapMaterial.height = height;
        }
        
        // check if material layer exits
        this.setMaterialsLayer();
        
        if(stageSize.width >= stageSize.height){
            percent = stageSize.width / 100 / width;
        }else {
            percent = stageSize.height / 100 / height;
        }
        
        if(percent !== 1){
            width = width * percent;
            height = height * percent;
        }
                
        var position = {
            x: mapMaterial.posX * stageSize.width,
            y: mapMaterial.posY * stageSize.height
        };
        
        if( position.x > stageSize.width){
            position.x = stageSize.width - (mapMaterial.width / 2);
        }else if(position.x < 0){
            position.x = mapMaterial.width / 2;
        }
        if( position.y > stageSize.height){
            position.y = stageSize.height - (mapMaterial.height / 2);
        }else if(position.y < 0){
            position.y = mapMaterial.height / 2;
        }

        var color = mapMaterial.color || mapMaterial.icon;

        var radius = {x: this.MATERIAL_RADIUS * percent * homothetie};
                
        var sprite = Dashboard.view.cartography.sprite.MaterialSprite.buildSprite({
            mapMaterial: mapMaterial,
            x: position.x,
            y: position.y,
            draggable: this.isEditionMode,
            radius: radius,
            color: color,
            fontSize: this.LABEL_FONT_SIZE
        });
        
        
        var labelIsVisible = this.chosenMap.materialsLayer.options.labelIsVisible;
        var label = sprite.findOne('.elementLabel');
       
        if(labelIsVisible === false){
            label.hide();
        }else{
            label.show();
        };
       
        
        // drag and drop, click and effects
        this.setDragAndDropEvents(sprite, mapMaterial, this, this.onMaterialDragStart.bind(this), this.onMaterialDragEnd.bind(this));

        var parentScope = this;
        
        sprite.on('click', function (me) {
            parentScope.onMaterialClick(parentScope, me);
        });

        this.materialsLayerMap.add(sprite);
    },
    

    setSelectedMaterialMap: function (materialCanvas) {
        var coordonates = {
            x: materialCanvas.x,
            y: materialCanvas.y,
            height: materialCanvas.getHeight(),
            width: materialCanvas.getWidth()
        };
    },

    // LINK 
    addLinkToMap: function (link) {
        
        //var parentScope = this;
        link.elementName = link.name;

        // check if links layer exits
        this.setLinksLayer();

        var referenceWidth = this.getView().getSize().width;
        var referenceHeight = this.getView().getSize().height;

        if (this.chosenMap.picture) {
            referenceWidth = this.chosenMap.picture.widthInPixels;
            referenceHeight = this.chosenMap.picture.heightInPixels;
        }

        var panelSize = this.getResponsiveStageSize(referenceWidth, referenceHeight);
        var linkWidth = link.width || 0.25; // default
        var linkHeight = link.height || 0.15; // default

        var linkSizePx = {
            x: linkWidth * panelSize.width,
            y: linkHeight * panelSize.height
        };

        var position = {
            x: link.posX * panelSize.width,
            y: link.posY * panelSize.height
        };

        var color = link.color || '#37474f';
        if (this.isEditionMode) {
            this.addEditbleLinkToMap(position.x, position.y, linkSizePx.x, linkSizePx.y, color, link);
        } else {
            this.addStaticLinkToMap(position.x, position.y, linkSizePx.x, linkSizePx.y, color, link);
        }
    },

    addEditbleLinkToMap: function (x, y, width, height, color, link) {
        var parentScope = this;

        link.elementName = link.name;

        var linkRect = new Konva.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: color,
            opacity: 0.6,
            dash: [10, 5],
            stroke: 'black',
            strokeWidth: 2,
            name: link.label || '',
            elementName: link.name,
            id: 'link_' + link.id,
            dragDistance: 5
        });
        
        // Group for drag and resize
        var linkGroup = new Konva.Group({
            x: x,
            y: y,
            draggable: true,
            name: 'group_link_' + link.id,
            dragDistance: 5
        });

        // drag and drop, click and effects
        this.setDragAndDropEvents(linkGroup, link, parentScope, this.onLinkDragStart.bind(this), this.onLinkDragEnd.bind(this));

        this.linksLayerMap.add(linkGroup);
        linkGroup.add(linkRect);

        addAnchor(linkGroup, 0, 0, 'tooltipTopLeft', link, parentScope);
        addAnchor(linkGroup, linkRect.width(), 0, 'tooltipTopRight', link, parentScope);
        addAnchor(linkGroup, linkRect.width(), linkRect.height(), 'tooltipBottomRight', link, parentScope);
        addAnchor(linkGroup, 0, linkRect.height(), 'tooltipBottomLeft', link, parentScope);

        function addAnchor(group, x, y, name, element, parentScope) {
            var layer = group.getLayer();
            var anchor = new Konva.Circle({
                x: x,
                y: y,
                stroke: '#666',
                fill: '#ddd',
                strokeWidth: 2,
                radius: 8,
                name: name,
                draggable: true,
                dragOnTop: false
            });

            anchor.on('click', function () {
                parentScope.setSelectedItem(linkRect, null);
                parentScope.onLinkAnchorClick(element);
            });

            anchor.on('dragmove', function () {
                updateGroupLayout(this);
                layer.draw();
            });

            anchor.on('mousedown touchstart', function (e) {
                group.setDraggable(false);
                this.moveToTop();
            });

            anchor.on('dragend', function (e) {
                group.setDraggable(true);
                layer.draw();
            });

            // add hover styling
            anchor.on('mouseover', function () {
                var layer = this.getLayer();
                document.body.style.cursor = 'pointer';
                this.setStrokeWidth(4);
                layer.draw();
            });
            anchor.on('mouseout', function () {
                var layer = this.getLayer();
                document.body.style.cursor = 'default';
                this.setStrokeWidth(2);
                layer.draw();
            });

            group.add(anchor);
        }

        // Helper function
        function updateGroupLayout(activeAnchor) {
            var group = activeAnchor.getParent();
            var topLeft = group.get('.tooltipTopLeft')[0];
            var topRight = group.get('.tooltipTopRight')[0];
            var bottomRight = group.get('.tooltipBottomRight')[0];
            var bottomLeft = group.get('.tooltipBottomLeft')[0];
            var rect = group.get('Rect')[0];
            var anchorX = activeAnchor.getX();
            var anchorY = activeAnchor.getY();

            // update anchor positions
            switch (activeAnchor.getName()) {
                case 'tooltipTopLeft':
                    topRight.setY(anchorY);
                    bottomLeft.setX(anchorX);
                    topRight.hide();
                    bottomRight.hide();
                    bottomLeft.hide();
                    break;
                case 'tooltipTopRight':
                    topLeft.setY(anchorY);
                    bottomRight.setX(anchorX);
                    topLeft.hide();
                    bottomRight.hide();
                    bottomLeft.hide();
                    break;
                case 'tooltipBottomRight':
                    bottomLeft.setY(anchorY);
                    topRight.setX(anchorX);
                    topLeft.hide();
                    topRight.hide();
                    bottomLeft.hide();
                    break;
                case 'tooltipBottomLeft':
                    bottomRight.setY(anchorY);
                    topLeft.setX(anchorX);
                    topLeft.hide();
                    topRight.hide();
                    bottomRight.hide();
                    break;
            }

            rect.position(topLeft.position());
            var width = topRight.getX() - topLeft.getX();
            var height = bottomLeft.getY() - topLeft.getY();

            if (width && height) {
                rect.width(width);
                rect.height(height);
            }
        }

        // Group
        linkRect.on('click', function (me) {
            parentScope.setSelectedItem(linkRect, null);
            parentScope.mainController.onSelectMapElement(link, 'LINK');
        });

        linkRect.on('dblclick', function (me) {
            parentScope.onLinkClick(link, true, me);
        });
        this.linksLayerMap.draw();
    },

    addStaticLinkToMap: function (x, y, width, height, color, link) {
        var parentScope = this;

        link.elementName = link.name;
        var linkRect = new Konva.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            fill: color,
            opacity: 0.6,
            dash: [10, 5],
            stroke: 'black',
            strokeWidth: 2,
            name: link.label || '',
            elementName: link.name,
            id: 'link_' + link.id
        });

        linkRect.on('click', function (me) {
            parentScope.onLinkClick(link, true, me);
        });

        linkRect.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });

        linkRect.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });

        this.linksLayerMap.add(linkRect);
        this.linksLayerMap.batchDraw();
    },

    // LOCATION
    addLocationToMap: function (location) {
                
        location.elementName = location.name;
        
        // check if location layer exits
        this.setLocationsLayer();

        if (location.width === 0 && location.height === 0) {
            this.addLocationPinToMap(location);
        } else {
            this.addLocationAreaToMap(location);
        }
    },

    addLocationAreaToMap: function (location) {

        var referenceWidth = this.getView().getSize().width;
        var referenceHeight = this.getView().getSize().height;

        if (this.chosenMap.picture) {
            referenceWidth = this.chosenMap.picture.widthInPixels;
            referenceHeight = this.chosenMap.picture.heightInPixels;
        }

        var panelSize = this.getResponsiveStageSize(referenceWidth, referenceHeight);
        var locationWidth = location.width || 0.25; // default
        var locationHeight = location.height || 0.15; // default

        var locationSizePx = {
            x: locationWidth * panelSize.width,
            y: locationHeight * panelSize.height
        };

        var position = {
            x: location.posX * panelSize.width,
            y: location.posY * panelSize.height
        };

        var color = location.color || '#37474f';

        if (this.isEditionMode) {
            this.addEditableLocationAreaToMap(position.x, position.y, locationSizePx.x, locationSizePx.y, color, location);
        } else {
            this.addStaticLocationAreaToMap(position.x, position.y, locationSizePx.x, locationSizePx.y, color, location);
        }
    },

    addEditableLocationAreaToMap: function (x, y, width, height, color, location) {
        var parentScope = this;

        location.elementName = location.name;
        var locationRect = new Konva.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: color,
            opacity: 0.6,
            stroke: 'black',
            strokeWidth: 2,
            name: location.location.name || '',
            elementName: location.name,
            id: 'location_area_' + location.id
        });

        var itemsCount = location.location.statistic.itemsCount || 0;
        
        var itemsCountMapText = new Konva.Text({
            x: width / 2,
            y: 5,
            text: location.location.name + ' | ' + itemsCount,
            fontSize: this.COUNT_FONT_SIZE, //25,
            fontFamily: 'Calibri',
            fill: '#050505',
            name: 'itemsCountMapText'
        });

        itemsCountMapText.offsetX(itemsCountMapText.getWidth() / 2);

        // Group for drag and resize
        var locationGroup = new Konva.Group({
            x: x,
            y: y,
            draggable: true,
            name: 'group_location_' + location.id
        });

        // drag and drop, click and effects
        this.setDragAndDropEvents(locationGroup, location, parentScope, this.onLocationAreaDragStart.bind(this), this.onLocationAreaDragEnd.bind(this));

        this.locationsLayerMap.add(locationGroup);
        locationGroup.add(locationRect);
        locationGroup.add(itemsCountMapText);

        addAnchor(locationGroup, 0, 0, 'tooltipTopLeft', location, parentScope);
        addAnchor(locationGroup, locationRect.width(), 0, 'tooltipTopRight', location, parentScope);
        addAnchor(locationGroup, locationRect.width(), locationRect.height(), 'tooltipBottomRight', location, parentScope);
        addAnchor(locationGroup, 0, locationRect.height(), 'tooltipBottomLeft', location, parentScope);

        function addAnchor(group, x, y, name, element, parentScope) {
            var layer = group.getLayer();
            var anchor = new Konva.Circle({
                x: x,
                y: y,
                stroke: '#666',
                fill: '#ddd',
                strokeWidth: 2,
                radius: 8,
                name: name,
                draggable: true,
                dragOnTop: false
            });

            anchor.on('click', function () {
                parentScope.setSelectedItem(locationRect, null);
                parentScope.onLinkAnchorClick(element);
            });

            anchor.on('dragmove', function () {
                updateGroupLayout(this);
                layer.draw();
            });

            anchor.on('mousedown touchstart', function (e) {
                group.setDraggable(false);
                this.moveToTop();
            });

            anchor.on('dragend', function (e) {
                group.setDraggable(true);
                layer.draw();
            });

            // add hover styling
            anchor.on('mouseover', function () {
                var layer = this.getLayer();
                document.body.style.cursor = 'pointer';
                this.setStrokeWidth(4);
                layer.draw();
            });
            anchor.on('mouseout', function () {
                var layer = this.getLayer();
                document.body.style.cursor = 'default';
                this.setStrokeWidth(2);
                layer.draw();
            });

            group.add(anchor);
        }
        
        // Helper function
        function updateGroupLayout(activeAnchor) {
            var group = activeAnchor.getParent();
            var topLeft = group.get('.tooltipTopLeft')[0];
            var topRight = group.get('.tooltipTopRight')[0];
            var bottomRight = group.get('.tooltipBottomRight')[0];
            var bottomLeft = group.get('.tooltipBottomLeft')[0];
            var rect = group.get('Rect')[0];
            var anchorX = activeAnchor.getX();
            var anchorY = activeAnchor.getY();

            // update anchor positions
            switch (activeAnchor.getName()) {
                case 'tooltipTopLeft':
                    topRight.setY(anchorY);
                    bottomLeft.setX(anchorX);
                    break;
                case 'tooltipTopRight':
                    topLeft.setY(anchorY);
                    bottomRight.setX(anchorX);
                    break;
                case 'tooltipBottomRight':
                    bottomLeft.setY(anchorY);
                    topRight.setX(anchorX);
                    break;
                case 'tooltipBottomLeft':
                    bottomRight.setY(anchorY);
                    topLeft.setX(anchorX);
                    break;
            }
            rect.position(topLeft.position());
            var width = topRight.getX() - topLeft.getX();
            var height = bottomLeft.getY() - topLeft.getY();
            if (width && height) {
                rect.width(width);
                rect.height(height);
            }
        }
        
        // Group
        locationRect.on('click', function (me) {
            parentScope.setSelectedItem(locationRect, null);
            parentScope.onLocationClick(location, me);
        });
        this.locationsLayerMap.draw();
    },

    addStaticLocationAreaToMap: function (x, y, width, height, color, location) {
        var parentScope = this;

        location.elementName = location.name;
        var locationRect = new Konva.Rect({
            x: x,
            y: y,
            width: width,
            height: height,
            fill: color,
            opacity: 0.6,
            stroke: 'black',
            strokeWidth: 2,
            name: location.location.name || '',
            elementName: location.name,
            id: 'location_area_' + location.id
        });

        var itemsCount = location.location.statistic.itemsCount || 0;
        var itemsCountMapText = new Konva.Text({
            x: x + (width / 2),
            y: y + 5,
            text: location.location.name + ' | ' + itemsCount,
            fontSize: this.COUNT_FONT_SIZE,//25,
            fontFamily: 'Calibri',
            fill: '#050505',
            name: 'itemsCountMapText'
        });

        itemsCountMapText.offsetX(itemsCountMapText.getWidth() / 2);

        locationRect.on('click', function (me) {
            parentScope.onLocationClick(location, me);
        });

        locationRect.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });

        locationRect.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });

        this.locationsLayerMap.add(locationRect);
        this.locationsLayerMap.add(itemsCountMapText);
        this.locationsLayerMap.batchDraw();
    },
    

    addLocationPinToMap: function (location) {
        
        var homothetie = this.chosenMap.locationsLayer.options.homothetie;
        if(!homothetie){
            homothetie = 1;
        }
                
        var parentScope = this;
        var stageSize = this.stage.getSize();
        var width = 50;
        var height = 64;
        var percent = 1;
        
        if(stageSize.width >= stageSize.height){
            percent = stageSize.width / 18 / width;
        }else {
            percent = stageSize.height / 18 / height;
        }
        
        if(percent !== 1){
            width = width * percent * homothetie;
            height = height * percent * homothetie;
        }
        
        var position = {
            x: location.posX * stageSize.width,
            y: location.posY * stageSize.height
        };

        if (position.x <= 0) {
            position.x = 40;
        }
        if (position.y <= 0) {
            position.y = 128;
        }
        
        if( position.x > stageSize.width){
            position.x = stageSize.width - (location.width / 2);
        }else if(position.x < 0){
            position.x = location.width / 2;
        }
        if( position.y > stageSize.height){
            position.y = stageSize.height - (location.height / 2);
        }else if(position.y < 0){
            position.y = location.height / 2;
        }
        
        var imageObj = new Image();
        imageObj.src = './resources/images/icons/128/pin_solid.png';
        
        var sprite = Dashboard.view.cartography.sprite.PinSprite.buildSprite({
            location: location,
            width: width,
            height: height,
            x: position.x,
            y: position.y,
            isEditionMode: this.isEditionMode,
            fontSize: this.LABEL_FONT_SIZE,
            textFontSize: this.COUNT_FONT_SIZE,
            imageObj: imageObj
        }, this);
        
        var labelIsVisible = this.chosenMap.locationsLayer.options.labelIsVisible;
        var label = sprite.findOne('.elementLabel');
       
        if(labelIsVisible === false){
            label.hide();
        }else{
            label.show();
        };

        imageObj.onload = function () {

            var img = sprite.findOne('Image');
            img.on('click', function (me) {
                parentScope.onLocationClick(location, me);
            });

            parentScope.locationsLayerMap.add(sprite);
            parentScope.locationsLayerMap.batchDraw();
        };
        
        // drag and drop, click and effects
        parentScope.setDragAndDropEvents(
                sprite, 
                location, 
                parentScope,
                parentScope.onLocationDragStart.bind(parentScope),
                parentScope.onLocationDragEnd.bind(parentScope)
        );
        
    },

    // DEVICE 
    addDeviceToMap: function (device) {
        
        var homothetie = this.chosenMap.devicesLayer.options.homothetie;
        if(!homothetie){
            homothetie = 1;
        }
        
        device.elementName = device.name;
                
        var parentScope = this;
        var iconURL = this.getDeviceIconURL(device.device.deviceType);
        var stageSize = this.stage.getSize();
        var width = 80;
        var height = 80;
        var percent = 1;
        
        if(stageSize.width > stageSize.height){
            percent = stageSize.width / 14 / width;
        }else {
            percent = stageSize.height / 14 / height;
        }
        
        width = width * percent * homothetie;
        height = height * percent* homothetie;

        var position = {
            x: device.posX * stageSize.width,
            y: device.posY * stageSize.height
        };
        
        if( position.x > stageSize.width){
            position.x = stageSize.width - (device.width / 2);
        }else if(position.x < 0){
            position.x = device.width / 2;
        }
        if( position.y > stageSize.height){
            position.y = stageSize.height - (device.height / 2);
        }else if(position.y < 0){
            position.y = device.height / 2;
        }
        
        var imageObj = new Image();
        imageObj.src = iconURL;
        
        var sprite = Dashboard.view.cartography.sprite.DeviceSprite.buildSprite({
            device: device,
            x: position.x,
            y: position.y,
            width: width,
            height: height,
            isEditionMode: this.isEditionMode,
            fontSize: this.LABEL_FONT_SIZE,
            iconURL: iconURL,
            imageObj: imageObj,
            homothetie: percent * homothetie
        }, this);
        
        var labelIsVisible = this.chosenMap.devicesLayer.options.labelIsVisible;
        var label = sprite.findOne('.elementLabel');
       
        if(labelIsVisible === false){
            label.hide();
        }else{
            label.show();
        };
        
        
        var imgChildren = sprite.getChildren(function(node){
            return node.getClassName() === 'Image';
         });
         var img = imgChildren[0];
        
        imageObj.onload = function () {
            
            if(img.size().width > img.size().height){
                var imageRatio = img.size().height / img.size().width;
                height = width * imageRatio;
            }else {
                var imageRatio = img.size().width / img.size().height;
                width = height * imageRatio;
            }
            
            img.attrs.width = width;
            img.attrs.height = height;
            img.attrs.offsetX = width / 2;
            img.attrs.offsetY = height / 2;
                        
            sprite.on('click', function (me) {
                parentScope.onDeviceClick(parentScope, me);
            });
            
            parentScope.devicesLayerMap.add(sprite);
            parentScope.devicesLayerMap.batchDraw();
        };
        
        // drag and drop, click and effects
        parentScope.setDragAndDropEvents(sprite, device, parentScope,
            parentScope.onDeviceDragStart.bind(parentScope),
            parentScope.onDeviceDragEnd.bind(parentScope));
                
    },

    getDeviceIconURL: function (deviceType) {
                
        var deviceType = this.devicesTypesStore.findRecord('type', deviceType);
        var iconSrc = deviceType.data.iconSrc;
        
        return iconSrc;
    },

    getMaterialBubbleValues: function (element) {
        if (element.id().startsWith('material_icon_circle_')) {
            if (element.getParent().nodeType === 'Group') {
                var circleElement;
                var group = element.getParent();
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].className === 'Circle') {
                        circleElement = group.children[i];
                        if (circleElement.attrs && circleElement.attrs.informationBubble) {
                            element.attrs.informationBubble = circleElement.attrs.informationBubble;
                        }
                    }
                }

            }
        }

        if (element.attrs.informationBubble) {
            var displayBubleText = '';
            element.attrs.informationBubble.forEach(function (entry) {
                var stringValue = entry.value || '';
                displayBubleText += entry.propertyLabel
                        + getText('colon') //':' 
                        + ' ' + stringValue + '\n';
            });
            return displayBubleText.substring(0, displayBubleText.length - 1);
        }
        return element.attrs.name;
    },

    // LABEL
    addLabelToMap: function (label) {
        
        var parentScope = this;
        var stageSize = this.stage.getSize();
        label.elementName = label.name;

        var referenceWidth = this.getView().getSize().width;
        var referenceHeight = this.getView().getSize().height;

        if (this.chosenMap.picture) {
            referenceWidth = this.chosenMap.picture.widthInPixels;
            referenceHeight = this.chosenMap.picture.heightInPixels;
        }

        var panelSize = this.getResponsiveStageSize(referenceWidth, referenceHeight);
        var position = {
            x: label.posX * panelSize.width,
            y: label.posY * panelSize.height
        };
        
        if( position.x > stageSize.width){
            position.x = stageSize.width - (label.width / 2);
        }else if(position.x < 0){
            position.x = label.width / 2;
        }
        if( position.y > stageSize.height){
            position.y = stageSize.height - (label.height / 2);
        }else if(position.y < 0){
            position.y = label.height / 2;
        }
        
        var fontFamily = label.font || 'Arial';
        var fontSize = parseInt(label.fontSize) || 18;

        var labelText = new Konva.Text({
            x: position.x,
            y: position.y,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fill: label.color,
            text: label.label,
            elementName: label.name,
            name: 'label_text',
            id: 'label_text_' + label.id,
            draggable: parentScope.isEditionMode
        });
        
        labelText.offsetX(labelText.getWidth() / 2);
        labelText.offsetY(labelText.getHeight() / 2);

        // drag and drop, click and effects
        this.setDragAndDropEvents(labelText, 
            label,
            parentScope,
            this.onLabelDragStart.bind(this),
            this.onLabelDragEnd.bind(this));
            
        labelText.on('click', function (me) {
            parentScope.onLabelTextClick(parentScope, me);
        });

        this.labelsLayerMap.add(labelText);
        this.labelsLayerMap.draw();
    },

    onLabelDragStart: function (x, y, element) {
        element.dragStart = {x: x, y: y};
    },

    onLabelDragEnd: function (element, updatedValue, canvasElement) {
        
        if (element.dragStart.x === updatedValue.x && element.dragStart.y === updatedValue.y) {
            this.onLabelTextClick(this, element);
        } else {
            
            updatedValue = this.ifOutOfStage(element, updatedValue, canvasElement);
            
            updatedValue.elementName = element.elementName;
            this.mainController.onLabelDragEnd(updatedValue, element);
        }
        
        //this.mainController.onLabelDragEnd(updatedValue, element);
        this.mainController.onSelectMapElement(element, 'LABEL');
        delete element.dragStart;
    },
    
    

    // TOOLTIPS
    setToolTips: function () {
        var parentScope = this;

        // check if tolltip layer exits
        this.setTooltipLayer();

        var tooltip = new Konva.Label({
            opacity: 0.75,
            visible: false,
            listening: false
        });

        tooltip.add(new Konva.Tag({
            fill: 'black',
            pointerDirection: 'down',
            pointerWidth: 10,
            pointerHeight: 10,
            lineJoin: 'round',
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: 10,
            shadowOpacity: 0.5
        }));

        tooltip.add(new Konva.Text({
            text: '',
            fontFamily: 'Calibri',
            fontSize: this.LABEL_FONT_SIZE,//18,
            padding: 5,
            fill: 'white'
        }));

        this.toolTipLayerMap.add(tooltip);

        function updateTooltip(tooltip, x, y, text) {
            tooltip.getText().setText(text);
            tooltip.setPosition({
                x: x,
                y: y
            });
            tooltip.show();
        }

        this.stage.on('mousemove', function (evt) {
            var shape = evt.target;
            var tooltipText = shape.attrs.name;

            if (shape.attrs.id && (shape.attrs.id.startsWith('material_circle_')
                    || shape.attrs.id.startsWith('material_icon_circle_'))) {
                tooltipText = parentScope.getMaterialBubbleValues(shape);
            }

            var excludedShapes = ['label', 'backArrow', 'backText', 'tooltipTopLeft', 'tooltipTopRight', 'tooltipBottomRight', 'tooltipBottomLeft', 'locationPin', 'itemsCountMapText', 'selectedBox', 'elementLabel', 'label_text'];

            if (shape && shape.attrs.name !== 'bgImg' && excludedShapes.indexOf(shape.attrs.name) === -1) {
                var mousePos = parentScope.stage.getPointerPosition();
                var x = mousePos.x;
                var y = mousePos.y - 5;
                updateTooltip(tooltip, x, y, tooltipText);
                parentScope.toolTipLayerMap.batchDraw();
            }
        });

        this.stage.on('mouseout', function (evt) {
            var shape = evt.target;

            if (shape && (shape.attrs.name !== 'bgImg')) {
                tooltip.hide();
                parentScope.toolTipLayerMap.draw();
            }
        });
    },

    getMaterialFormById: function (id) {
        return this.stage.find('#circle_' + id);
    },

    // ==========================================================================
    // Methods
    // ==========================================================================

    setSelectedItem: function (item, callback) {
        if (!item) {
            return;
        }
        if (item.attrs && item.attrs.id.startsWith('material_icon_circle')) {
            var group = item.getParent();
            this.selectedItem = group.getChildren(function (node) {
                return node.getClassName() === 'Circle';
            });
        } else {
            this.selectedItem = item;
        }

        this.showSelectedBox(this.selectedItem);
        if (callback) {
            callback(this.selectedItem);
        }
    },
    

    deleteMapElement: function (id, elementType) {
        
        switch (elementType) {
            case 'MATERIAL':
                this.deleteMaterialFromMap(id);
                break;
            case 'LINKINGZONE':
                this.deleteLinkingZoneFromMap(id);
                break;
            case 'DEVICE':
                this.deleteDeviceFromMap(id);
                break;
            case 'LOCATION':
                this.deleteLocationFromMap(id);
                break;
            case 'LABEL':
                this.deleteLabelFromMap(id);
                break;
            default:
                throw 'Unsuported element type : ' + elementType;
                break;
        }
        // summer cleaning
        this.hideAllToolTips();
        this.stage.batchDraw();
    },

    deleteMaterialFromMap: function (id) {
        
        var materialsCanvas = this.getLayerElements('layerMaterial');
        materialsCanvas.forEach(function (materialCanvas) {
            try {
                var canvasId = materialCanvas.children['0'].attrs.id.split('_');
                canvasId = parseInt(canvasId[canvasId.length - 1]);

                if (parseInt(id) === canvasId) {
                    materialCanvas.destroy();
                }
            } catch (ex) {
                Dashboard.tool.Utilities.error('[deleteMaterialFromMap] error ' + ex);
            }
        });
    },

    deleteDeviceFromMap: function (id) {

        var devicesCanvas = this.getLayerElements('layerDevices');

        devicesCanvas.forEach(function (deviceCanvas) {
            var canvasId = deviceCanvas.attrs.name.split('_');
            canvasId = parseInt(canvasId[canvasId.length - 1]);

            if (parseInt(id) === canvasId) {
                deviceCanvas.destroy();
            }
        });
    },

    deleteLinkingZoneFromMap: function (id) {
        
        var parentScope = this;
        
        var linkingZonesCanvas = this.getLayerElements('layerLinkingZone');

        linkingZonesCanvas.forEach(function (linkingZoneCanvas) {

            var canvasId = linkingZoneCanvas.attrs.name.split('_');
            canvasId = parseInt(canvasId[canvasId.length - 1]);

            if (parseInt(id) === canvasId) {
                linkingZoneCanvas.destroy();
                parentScope.linksLayerMap.draw();
            }
        });
    },

    deleteLocationFromMap: function (id) {
        
        var parentScope = this;
        var locationsCanvas = this.getLayerElements('layerLocations');
        
        var element = null;
        
        //find element
        locationsCanvas.forEach(function (locationCanvas) {
            var canvasId = locationCanvas.attrs.name.split('_');
            var foundId = parseInt(canvasId[canvasId.length - 1]);
            
            if(foundId === id){
                element = locationCanvas;
            }
            
//            if(locationCanvas.attrs.elementName === id){
//                element = locationCanvas;
//            }
        });
        
        if(element !== null){

            element.destroy();
            parentScope.locationsLayerMap.draw();
        }

//        locationsCanvas.forEach(function (locationCanvas) {
//            
////            var type = locationCanvas.type;
//            
//            // Handle groups & pins
//            var canvasId = locationCanvas.attrs.name.split('_');
//            canvasId = parseInt(parseInt(canvasId[canvasId.length - 1]));
//
//            if (isNaN(canvasId)) {
//                canvasId = locationCanvas.attrs.id.split('_');
//                canvasId = parseInt(parseInt(canvasId[canvasId.length - 1]));
//            }
//
//            if (id === canvasId) {
//                locationCanvas.destroy();
//                if (!isNaN(canvasId)) { 
//                   parentScope.deleteAttachedLabel(locationCanvas, 'LOCATION_PIN'); 
//                }
//            }
//        });
        
        
    },

    
    deleteLabelFromMap: function (id) {
        var labelsList = this.getLayerElements('layerLabels');

        labelsList.forEach(function (labelCanvas) {

            var canvasId = labelCanvas.attrs.id.split('_');
            canvasId = parseInt(canvasId[canvasId.length - 1]);

            if (parseInt(id) === canvasId) {
                labelCanvas.destroy();
            }
        });
    },

    // ==========================================================================
    // get DATA
    // ==========================================================================

    getLocationAreaData: function (canvasLocationGroup) {
        var rectLocation = null;
        for (var i = 0; i < canvasLocationGroup.children.length; i++) {
            if (canvasLocationGroup.children[i].className === 'Rect') {
                rectLocation = canvasLocationGroup.children[i];
                break;
            }
        }

        if (rectLocation === null) {
            return null;
        }

        var loccationId = rectLocation.attrs.id.split('_');
        loccationId = loccationId[loccationId.length - 1];

        var locationArea = {
            id: parseInt(loccationId),
            color: rectLocation.attrs.fill,

            width: parseInt(rectLocation.attrs.width), // absolute px
            height: parseInt(rectLocation.attrs.height), // absolute px

            x: parseInt(canvasLocationGroup.x()), // absolute px
            y: parseInt(canvasLocationGroup.y()) // absolute px
        };
        return locationArea;
    },

    getLocationPinData: function (canvasLocation) {
        var loccationId = canvasLocation.attrs.id.split('_');
        loccationId = loccationId[loccationId.length - 1];

        var location = {
            id: parseInt(loccationId),

            x: parseInt(canvasLocation.attrs.x), // absolute px
            y: parseInt(canvasLocation.attrs.y), // absolute px
            width: 0,
            height: 0
        };
        return location;
    },

    getLocationDataFromMap: function (canvasLocation) {
        try {
            if (canvasLocation.nodeType === 'Group') {
                return this.getLocationAreaData(canvasLocation);
            } else {
                return this.getLocationPinData(canvasLocation);
            }
        } catch (ex) {
            Dashboard.tool.Utilities.error('[getMaterialDataFromMap] error ' + ex);
            return null;
        }
    },

    getMaterialDataFromMap: function (canvasMaterial) {
        try {
            var materialId = canvasMaterial.attrs.id.split('_');
            materialId = materialId[materialId.length - 1];

            var material = {
                id: parseInt(materialId),
                color: canvasMaterial.attrs.fill,

                x: parseInt(canvasMaterial.attrs.x), // absolute px
                y: parseInt(canvasMaterial.attrs.y) // absolute px
            };

            return material;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[getMaterialDataFromMap] error ' + ex);
            return null;
        }
    },

    getDeviceDataFromMap: function (canvasDevice) {
        try {
            var deviceId = canvasDevice.attrs.id.split('_');
            deviceId = deviceId[deviceId.length - 1];

            var device = {
                id: parseInt(deviceId),
                x: parseInt(canvasDevice.attrs.x), // absolute px
                y: parseInt(canvasDevice.attrs.y) // absolute px
            };

            return device;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[getDeviceDataFromMap] error ' + ex);
            return null;
        }
    },

    getLinkDataFromMap: function (canvasLink) {
        try {
            if (canvasLink.nodeType !== 'Group') {
                return null;
            }

            var rectLink = null;
            for (var i = 0; i < canvasLink.children.length; i++) {
                if (canvasLink.children[i].className === 'Rect') {
                    rectLink = canvasLink.children[i];
                    break;
                }
            }

            if (rectLink === null) {
                return null;
            }

            var linkId = rectLink.attrs.id.split('_');
            linkId = linkId[linkId.length - 1];

            var link = {
                id: parseInt(linkId),
                color: rectLink.attrs.fill,

                width: parseInt(rectLink.attrs.width), // absolute px
                height: parseInt(rectLink.attrs.height), // absolute px

                x: parseInt(canvasLink.x()), // absolute px
                y: parseInt(canvasLink.y()) // absolute px
            };

            return link;
        } catch (ex) {
            Dashboard.tool.Utilities.error('[getMaterialDataFromMap] error ' + ex);
            return null;
        }
    },

    getLabelDataFromMap: function (canvasLabel) {
        try {
            // ?? Meh
        } catch (ex) {
            Dashboard.tool.Utilities.error('[getLabelDataFromMap] error ' + ex);
            return null;
        }
    },

    getSelectedItem: function () {
        return this.selectedItem;
    },

    getData: function () {
        var data = {
            materials: [],
            linkingZones: [],
            devices: [],
            locations: [],
            labels: []
        };
        
        var mapStage = this.stage;
        var layers = mapStage.getChildren();

        layers.forEach(function (layer) {
            switch (layer.attrs.id) {
                case 'layerMaterial': // Material
                    var canvasMaterials = layer.getChildren();
                    canvasMaterials.forEach(function (canvasMaterial) {
                        data.materials.push(this.getMaterialDataFromMap(canvasMaterial));
                    }.bind(this));
                    break;

                case 'layerLinkingZone': // Links
                    var canvasLinks = layer.getChildren();
                    canvasLinks.forEach(function (canvasLink) {
                        data.linkingZones.push(this.getLinkDataFromMap(canvasLink));
                    }.bind(this));
                    break;

                case 'layerDevices': // Devices
                    var canvasDevices = layer.getChildren();
                    canvasDevices.forEach(function (canvasDevice) {
                        data.devices.push(this.getDeviceDataFromMap(canvasDevice));
                    }.bind(this));
                    break;

                case 'layerLocations': // Locations
                    var canvasLocations = layer.getChildren();
                    canvasLocations.forEach(function (canvasLocation) {
                        data.locations.push(this.getLocationDataFromMap(canvasLocation));
                    }.bind(this));
                    break;

                case 'layerLabels': // Labels
                    var canvasLabels = layer.getChildren();
                    canvasLabels.forEach(function (canvasLabel) {
                        data.labels.push(this.getLabelDataFromMap(canvasLabel));
                    }.bind(this));
                    break;
                case 'layerTooltip':
                case 'layerBackground':
                    // do nothing 
                    break;
                default:
                    Dashboard.tool.Utilities.warn('[MapController.getData] Layer [' +
                            layer.attrs.id + '] Not supported yet!');
                    break;
            }
        }.bind(this));
        return data;
    }
});
