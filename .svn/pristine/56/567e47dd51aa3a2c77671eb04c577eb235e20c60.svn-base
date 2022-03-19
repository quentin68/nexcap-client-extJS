/*  global Ext */

Ext.define('Dashboard.view.alerts.operationAlert.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'operationAlertDetail',
        
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
                    title: getText('Operation'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                },{
                    title: getText('Item'),
                    reference: 'item',
                    iconCls: 'x-fa fa-tag'
                }, {
                    title: getText('Traceability'),
                    reference: 'traceability',
                    iconCls: 'fa fa-map-marker'
                }, {
                    title: getText('Acknowlegement / resolution'),
                    reference: 'resolution',
                    iconCls: 'fa fa-check-circle-o'
                }
            ]
                
        });

        this.callParent(arguments);
        
    },
        
    setMaterialData: function (model) {
        var material = model.data;
        var itemPanel = this.query('panel[reference=item]')[0];
        
        // Dynamic properties
        var properties = material.properties;
        if (!properties) {
            Dashboard.tool.Utilities.error('[material.Detail.setData] properties null or empty !');
            return;
        }

        // Sort alphabetically 
        properties = properties.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        
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
    },
    
    
    setData: function(data){
        
        if(!data){
            return;
        }
        
        this.viewModel.setData(data);
        
        var alertLevelString;
        switch (data.alertLevel) {
            case '0':
            case 0:
                alertLevelString = getText('Low');
                break;
            case '1':
            case 1:
                alertLevelString = getText('Medium');
                break;
            case '2':
            case 2:
                alertLevelString = getText('High');
                break;
            default:
                break;
        }
        
        // Classic properties
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        characteristicsPanel.add(this.buildField({name: getText('Alert level'), value: alertLevelString}));
        characteristicsPanel.add(this.buildField({name: getText('Operation'), value: data.operationName}));
        characteristicsPanel.add(this.buildField({name: getText('Operator'), value: data.userSticker}));
        characteristicsPanel.add(this.buildField({name: getText('Alert name'), value: data.controlName}));
//        characteristicsPanel.add(this.buildField({name: getText('Creation date'), value: this.dateToString(data.startDate)}));
//        characteristicsPanel.add(this.buildField({name: getText('End date'), value: this.dateToString(data.endDate)}));
        characteristicsPanel.add(this.buildField({name: getText('Creation date'), value: Ext.Date.format(data.startDate, getText('m/d/Y'))}));
        characteristicsPanel.add(this.buildField({name: getText('End date'), value: Ext.Date.format(data.endDate, getText('m/d/Y'))}));

        
        var itemPanel = this.query('panel[reference=item]')[0];
        itemPanel.removeAll();
        itemPanel.add(this.buildField({name: getText('Item name'), value: data.materialName}));
        itemPanel.add(this.buildField({name: getText('Ref. code'), value: data.productReferenceCode}));
        itemPanel.add(this.buildField({name: getText('Ref. designation'), value: data.productReferenceDesignation}));
        itemPanel.add(this.buildField({name: getText('Category'), value: data.productCategoryName}));
        
         // Get material 
        if (data.material) {
            Dashboard.manager.administration.MaterialManager.getOne(data.material, this, 'setMaterialData');
        }
        
        var resolutionPanel = this.query('panel[reference=resolution]')[0];
        resolutionPanel.removeAll();
        resolutionPanel.add(this.buildField({name: getText('Is acknowledged'), value: data.isAcknowledged}));
        resolutionPanel.add(this.buildField({name: getText('Acknowledgment Date'), value: this.dateToString(data.acknowledgmentDate)}));
        resolutionPanel.add(this.buildField({name: getText('Acknowledger id'), value: data.acknowledgerSticker}));
        resolutionPanel.add(this.buildField({name: getText('Source address'), value: data.sourceAddress}));
        
    },
            
    getAlertLevelColor: function(num){

        switch(num){
            case 0 :
                return '#19C219'; //green
            case 1 :
                return '#FFDD00'; //Orange
            case 2 :
                return '#FF0000'; //raide
            case 3 :
                return '#000000'; // black
        }

    }
    
});