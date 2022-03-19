/* global Ext, moment */

Ext.define('Dashboard.view.administration.material.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'materialDetail',
    attachmentFilesStore: null,
        
    initComponent: function (){

        var me = this;
        
        this.attachmentFilesStore = Ext.create(Ext.data.Store, {
            alias: 'store.attachmentFiles',
            fields: ['id', 'file', 'folderName', 'securedFileUrl'],
            groupField: 'folderName',
            sorters: ['folderName','file']
        });
                
        this.configDetail(this.feature);
                        
        Ext.apply(me, {

            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}'
                    },
                    cls: 'material-detail-title',
                    margin: '12 12 12 24'

                }, {
                    xtype: 'image',
                    alt: 'picture',
                    reference: 'thumbnail',
                    width: this.getImageSize() ? this.getImageSize() : '90%',
                    margin: '0 24 12 24'//,
//                    bind: {
//                        src: '{imageSrc}',
//                        alt: '{imageSrc}'
//                    }//,

                }, {
                    title: getText('Item'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Traceability'),
                    reference: 'traceability',
                    iconCls: 'fa fa-map-marker'
                }, {
                    title: getText('Alerts'),
                    reference: 'alerts',
                    iconCls: 'x-fa fa-exclamation-triangle'
                }, {
                    title: getText('Control'),
                    reference: 'control',
                    iconCls: 'fa fa-stethoscope'
                }, {
                    title: getText('Attachments'),
                    reference: 'attachments',
                    iconCls: 'fa fa-paperclip',
                    items: [
                        {
                            xtype: 'container',
                            reference: 'files',
                            items: {
                                xtype: 'grid',
                                reference: 'filesGrid',
                                frame: true,
                                requires: [
                                    'Ext.grid.feature.Grouping'
                                ],
                                name: 'attachmentGrid',
                                store: this.attachmentFilesStore,
                                multiSelect: false,
                                width: '100%',
                                viewConfig: {
                                    stripeRows: true
                                },
                                
                                columns: [
                                    {
                                        text: getText('Files'),
                                        dataIndex: 'name',
                                        flex: 1
                                    }, {
                                        xtype: 'actioncolumn',
                                        width : 50,
                                        items: [{
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-download',
                                            text: getText('Download'),
                                            tooltip: getText('Download'),
                                            handler: function(grid, rowIndex, colIndex) {

                                                var rec = grid.getStore().getAt(rowIndex);

                                                var file = rec.data.file;
                                                var id = rec.data.refId;
                                                var folderName = rec.data.folderName;

                                                var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/MATERIAL/' + id;

                                                if(folderName && folderName !== '' && folderName !== getText('Mixed')){
                                                    path += '/' + encodeURI(folderName);
                                                }

                                                path += '/' + encodeURI(file);
                                                
                                                Dashboard.manager.administration.FilesManager.loadFile(path, file, grid);
                                            }
                                        }]
                                    }
                                ],
                                    
                                features: [
                                    {
                                        ftype: 'grouping',
                                        startCollapsed: false,
                                        groupHeaderTpl: '{name}' + ' ({rows.length} '+ getText('File') + '{[values.rows.length > 1 ? "s" : ""]})'

                                        //groupHeaderTpl: getText('{name}') + ' ({rows.length} '+ getText('File') + '{[values.rows.length > 1 ? "s" : ""]})'
                                    }
                                ]
                                
                            }
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);

    },

    clean: function (){

        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        var traceabilityPanel = this.query('panel[reference=traceability]')[0];
        traceabilityPanel.removeAll();
        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();
        var controlPanel = this.query('panel[reference=control]')[0];
        controlPanel.removeAll();
    },

    setData: function (data){
        
        if (!data) {
            return;
        }
        
        if(this.viewModel){
            this.viewModel.setData(data);
        }
        
        var imgSrc = data.imageSrc;
        
        Ext.Ajax.request({
            scope:this,
            binary: true,  //set binary to true
            url: imgSrc,
            success: function(response) {

                var blob = new Blob([response.responseBytes], {type: 'image/png'}),
                url = window.URL.createObjectURL(blob);

                var thumbnail = this.down('image[reference=thumbnail]');
                thumbnail.setSrc(url);
                thumbnail.setAlt('thumbnail');
            }
        });

        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        // Classic properties
        characteristicsPanel.add(this.buildField({
            name: getText('Reference code'),
            value: data.productReference.referenceCode
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Reference designation'),
            value: data.productReference.designation
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Category'),
            value: data.productReference.productCategory.fullPath
        }));

        if (data.lastUpdateDate) {
            characteristicsPanel.add(this.buildField({
                name: getText('Last Updated'),
                value: Ext.Date.format(data.lastUpdateDate, getText('m/d/Y H:i:s'))
            }));
        }

        if (data.description) {
            var description = data.description.replace(/\n/g, '<br/>');
            characteristicsPanel.add(this.buildField({
                name: getText('Description'),
                value: description || ''
            }));
        }


        // var interventionOrdersPanel = this.query('panel[reference=interventionOrdersPanel]')[0];;
        // interventionOrdersPanel.removeAll();
        //        
        // for(var i = 0; i < data.interventionOrderList.length; i++){
        // var ioFields = this.buildField(data.interventionOrderList[i].number);
        // interventionOrdersPanel.add(ioFields);
        // }

        var traceabilityPanel = this.query('panel[reference=traceability]')[0];
        traceabilityPanel.removeAll();
        

//        if (data.code && data.code.code) {
//
//            if(data.code.codeType){
//                var label = Dashboard.store.enums.CodeType[data.code.codeType +''].label;
//                traceabilityPanel.add(this.buildField({
//                    name: getText(label),
//                    value: data.code.code
//                }));
//            }else{
//
//                Dashboard.tool.Utilities.error('[material.Detail.setData] code.codeType null or empty !');
//                traceabilityPanel.add(this.buildField({
//                    name: '\/!\\ ' + getText('Unreadable or incorrect code'),
//                    value: data.code.code,
//                    color: '#ff0000'
//                }));
//            }
//        }
        
        if (data.codes && data.codes.length > 0) {
            
            Ext.each(data.codes, function(code){
                
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
            value: data.location.address || ''
        }));
        
        traceabilityPanel.add(this.buildField({
            name: getText('Assignation address'),
            value: data.assignedLocation.address || ''
        }));
        
        
        if(data.geolocalization){
                        
            traceabilityPanel.add(this.buildField({
                name: getText('Latitude'),
                value: data.geolocalization.coordinates.latitude || ''
            }));

            traceabilityPanel.add(this.buildField({
                name: getText('Longitude'),
                value: data.geolocalization.coordinates.longitude || ''
            }));
            
            if(data.geolocalization.coordinates.altitude){
                traceabilityPanel.add(this.buildField({
                    name: getText('Altitude'),
                    value: data.geolocalization.coordinates.altitude + ' m'
                }));
            }
        }
        
        
        if (data.lastOperation && data.lastOperation.data) {
            var operation = data.lastOperation.data;

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
        }
        
        /** Instead of last action date **/

        traceabilityPanel.add(this.buildField({
            name: getText('Uses count'),
            value: data.useCount
        }));

        var alertsPanel = this.query('panel[reference=alerts]')[0];
        alertsPanel.removeAll();

        for (var i = 0; i < data.alerts.length; i++) {
            alertsPanel.add(this.buildField({
                name: getText('Warning'),
                value: data.alerts[i].alertConfiguration.name
            }));
        }

        // specificChecks
        var controlPanel = this.query('panel[reference=control]')[0];
        controlPanel.removeAll();

        for (var i = 0; i < data.specificChecks.length; i++) {
            var compliance = data.specificChecks[i].isRight ? getText('Compliant') : getText('Non-compliant');
            var color = data.specificChecks[i].isRight ? 'green' : 'red';

            compliance = '<span style="color:' + color + ';">' + compliance + '</span>';

            var dateString = '';
            if (moment(data.specificChecks[i].executionDate).isValid()) {
                   dateString = this.dateToString(data.specificChecks[i].executionDate, 'DATETIME');
            }
            controlPanel.add(this.buildField({
                name: data.specificChecks[i].name + ' (' + compliance + ')',
                value: dateString
            }));
        }

        
        var attachmentGrid = this.down('grid[name=attachmentGrid]');
        var attachmentFilesStore = attachmentGrid.getStore();
        attachmentFilesStore.removeAll();

        if (data.OrganizedFiles) {
            data.OrganizedFiles.forEach(function (fileObject){
                attachmentFilesStore.add({
                    name: fileObject.file.slice(15), // remove timestamp & unique random chars
                    file: fileObject.file,
                    folderName: fileObject.folderName,
                    refId: data.id
                });
            });
        }
        
        
        // Dynamic properties
        var properties = data.properties;
        
        if (!properties) {
            Dashboard.tool.Utilities.error('[material.Detail.setData] properties null or empty !');
            return;
        }

        for (var i = 0; i < properties.length ; i++) {
            
            try {
            
                var property = Ext.create('Dashboard.model.PropertyConfiguration', properties[i].configuration);
                property.value = properties[i].value;
                                
                if(property.data.name === 'mapOutdoorGeolocalization' || property.data.name === 'latitude' || property.data.name === 'longitude'){
                    continue;
                }

                var characteristicFields = null;
                var control = Dashboard.model.PropertyConfiguration.getControl(property);

                if (control !== undefined) {
                    
                    var configuration = control.configuration;
                    if (configuration && configuration.enabledInDetails !== undefined) {
                        if (configuration.enabledInDetails === true) {
                            characteristicFields = this.buildField(property);
                            characteristicsPanel.add(characteristicFields);
                        }
                    } else {
                        characteristicFields = this.buildField(property);
                        characteristicsPanel.add(characteristicFields);
                    }
                }
            
            } catch (ex) {
                Dashboard.tool.Utilities.error('[material.Detail.setData] property error : ' + ex);
            }
        }
    }

});
