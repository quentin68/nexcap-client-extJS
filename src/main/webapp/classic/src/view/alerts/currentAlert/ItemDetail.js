/* global Ext */

Ext.define('Dashboard.view.alerts.currentAlert.ItemDetail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'currentAlertItemDetail',
    
    requires: ['Dashboard.store.enums.CodeType'],
        
    initComponent: function() {
        
        this.configDetail();
                
        var me = this;
        Ext.apply( me, {
                        
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{controlName}' 
                    },
                    cls: 'user-detail-title',
                    margin: '12 12 12 24'
                },{
                    title: getText('Alert'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Acknowledgment'),
                    reference: 'acknowledgment',
                    iconCls: 'fa fa-check-circle-o'
                },{
                    title: getText('Item'),
                    reference: 'item',
                    iconCls: 'x-fa fa-tag'
                }, {
                    title: getText('Traceability'),
                    reference: 'traceability',
                    iconCls: 'fa fa-map-marker'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
    
    setMaterialData: function (model) {
        var material = model.data;
        console.log("material", material);
        var itemPanel = this.query('panel[reference=item]')[0];
        
       itemPanel.add(this.buildField({name: 'Item name', value: material.name}));
       itemPanel.add(this.buildField({name: 'Reference code', value: material.productReference.referenceCode}));
       itemPanel.add(this.buildField({name: 'Reference designation', value: material.productReference.designation}));
       itemPanel.add(this.buildField({name: getText('Category'), value: material.productReference.productCategory.fullPath}));
        
        if (material.lastUpdateDate) {
            itemPanel.add(this.buildField({
                name: getText('Last Updated'),
                value: Ext.Date.format(material.lastUpdateDate, getText('m/d/Y H:i:s'))
            }));
        }

        if (material.description) {
            var description = material.description.replace(/\n/g, '<br/>');
            itemPanel.add(this.buildField({
                name: getText('Description'),
                value: description || ''
            }));
        }
        
        // Dynamic properties
        var properties = material.properties;
        if (!properties) {
            Dashboard.tool.Utilities.error('[material.Detail.setData] properties null or empty !');
            return;
        }

        // Sort alphabetically 
//        properties = properties.sort(function (a, b) {
//            var nameA = a.name.toUpperCase();
//            var nameB = b.name.toUpperCase();
//
//            if (nameA < nameB) {
//                return -1;
//            }
//            if (nameA > nameB) {
//                return 1;
//            }
//            return 0;
//        });
        
        for (var i = 0; i < properties.length; i++) {
            
            var property = Ext.create('Dashboard.model.PropertyConfiguration', properties[i].configuration);
            property.value = properties[i].value;
            
            var characteristicFields = null;
            var control = Dashboard.model.PropertyConfiguration.getControl(properties[i].configuration);
            
            if (control !== undefined) {
                
                var configuration = control.configuration;
                if (configuration && configuration.enabledInDetails !== undefined) {
                    
                    if (configuration.enabledInDetails === true) {
                        //characteristicFields = this.buildField(properties[i]);
                        characteristicFields = this.buildField(property);
                        itemPanel.add(characteristicFields);
                    }
                } else {
                    //characteristicFields = this.buildField(properties[i]);
                    characteristicFields = this.buildField(property);
                    itemPanel.add(characteristicFields);
                }
            }
        }
        
        
        // Tracability 
        var traceabilityPanel = this.query('panel[reference=traceability]')[0];
        traceabilityPanel.removeAll();

//        if (material.code) {
//            traceabilityPanel.add(this.buildField({
//                name: getText('RFID code'),
//                value: material.code.code
//            }));
//        }

        if (material.codes && material.codes.length > 0) {
            
            Ext.each(material.codes, function(code){
                
                if(code.codeType){
                    var label = Dashboard.store.enums.CodeType[code.codeType +''].label;
                    traceabilityPanel.add(this.buildField({
                        name: getText(label),
                        value: code.code
                    }));
                }else{

                    Dashboard.tool.Utilities.error('[material.Detail.setData] code.codeType null or empty !');
                    traceabilityPanel.add(this.buildField({
                        name: '\/!\\ ' + getText('Unreadable or incorrect code'),
                        value: code.code,
                        color: '#ff0000'
                    }));
                }
                
            }, this);
            
        }

        traceabilityPanel.add(this.buildField({
            name: getText('Current address'),
            value: material.location.address || ''
        }));
        
        traceabilityPanel.add(this.buildField({
            name: getText('Assignation address'),
            value: material.assignedLocation.address || ''
        }));
        
        /** Instead of last action date **/
        traceabilityPanel.add(this.buildField({
            name: getText('Uses count'),
            value: material.useCount
        }));

        //IF NEEDED:
      /*  if(material.geolocalization){

            traceabilityPanel.add(this.buildField({
                name: getText('Latitude'),
                value: material.geolocalization.coordinates.latitude || ''
            }));

            traceabilityPanel.add(this.buildField({
                name: getText('Longitude'),
                value: material.geolocalization.coordinates.longitude || ''
            }));

            if(material.geolocalization.coordinates.altitude){
                traceabilityPanel.add(this.buildField({
                    name: getText('Altitude'),
                    value: material.geolocalization.coordinates.altitude + ' m'
                }));
            }
        }


        if (material.lastOperation && material.lastOperation.data) {
            var operation = material.lastOperation.data;

            if (operation.operationType) {
                traceabilityPanel.add(this.buildField({
                    name: getText('Last operation'),
                    value: operation.operationType
                }));
            }

            if (operation.date) {
                traceabilityPanel.add(this.buildField({
                    name: getText('Last operation date'),
                    value: this.dateToString(operation.date, 'DATETIME')
                }));
            }

            if (operation.user) {
                traceabilityPanel.add(this.buildField({
                    name: getText('Last user'),
                    value: operation.user.sticker
                }));
            }
        } */

    },
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.viewModel.setData(data);
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        characteristicsPanel.add(this.buildField({name: getText('Alert name'), value: data.alertConfiguration.name}));
        characteristicsPanel.add(this.buildField({name: getText('Description'), value: data.alertConfiguration.description}));
        characteristicsPanel.add(this.buildField({name: getText('Alert level'), value: data.alertConfiguration.alertLevel}));
        characteristicsPanel.add(this.buildField({name: getText('Trigger'), value: data.triggerEventLabel}));
        characteristicsPanel.add(this.buildField({name: getText('Alert manager'), value: data.userSticker}));
        characteristicsPanel.add(this.buildField({name: getText('Creation date'), value: this.dateToString(data.startDate, 'DATE_TIME')}));
        characteristicsPanel.add(this.buildField({name: getText('Informations'), value: data.informations}));  // this one to be discuss with marie
        characteristicsPanel.add(this.buildField({name: getText('Address'), value: data.sourceAddress}));
    
        
        
        // Acknowledgment properties
        var acknowledgmentPanel = this.query('panel[reference=acknowledgment]')[0];
        acknowledgmentPanel.removeAll();
        
        acknowledgmentPanel.add(this.buildField({name: getText('Is acknowledged'), value: data.isAcknowledged}));
        acknowledgmentPanel.add(this.buildField({name: getText('Reason'), value: data.acknowledmentDescription}));
        acknowledgmentPanel.add(this.buildField({name: 'Acknowledgment Date', value: this.dateToString(data.acknowledgmentDate, 'DATE_TIME')}));
        acknowledgmentPanel.add(this.buildField({name: getText('Acknowledgment manager'), value: data.acknowledgerSticker}));
        acknowledgmentPanel.add(this.buildField({name: getText('Address'), value: data.address})); // this one to be discuss with Marie

        var itemPanel = this.query('panel[reference=item]')[0];
        itemPanel.removeAll();

        // Get material 
        if (data.material) {
            Dashboard.manager.administration.MaterialManager.getOne(data.material.id, this, 'setMaterialData');
        }

        
    }
    
});