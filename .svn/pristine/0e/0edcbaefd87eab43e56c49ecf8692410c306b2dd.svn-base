Ext.define('Dashboard.view.consultation.materialsSets.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'materialsSetsDetail',
    attachmentFilesStore : null,

    
    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        
//        this.attachmentFilesStore = Ext.create(Ext.data.Store, {
//            fields: ['id', 'file']
//        });

        
        Ext.apply( me, {
            
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{productReference.designation}' 
                    },
                    cls: 'reference-detail-title',
                    margin: '12 12 12 24'

                },{
                    xtype: 'image',
                    reference: 'thumbnail',
                    width: this.getImageSize() ? this.getImageSize() : '90%',
                    margin: '0 24 12 24'
                },{
                    title: getText('Materials set'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                },{
                    title: getText('Properties'),
                    reference: 'properties',
                    iconCls: 'fa fa-cube'
                },{
                    title : getText('Alerts'),
                    reference : 'alerts',
                    iconCls : 'x-fa fa-exclamation-triangle',
                    hidden: true // TODO
                },{
                    title: getText('Material properties'),
                    reference: 'materialProperties',
                    iconCls: 'fa fa-cube',
                    hidden: true
                },{
                    title: getText('Inherited material properties'),
                    reference: 'inheritedProperties',
                    iconCls: 'fa fa-cubes',
                    hidden: true
                },{
                    title: getText('Intervention orders'),
                    reference: 'interventionOrdersPanel',
                    iconCls: 'fa fa-check'
                },
                {
                    title: getText('Traceability'),
                    reference: 'traceability',
                    iconCls: 'fa fa-map-marker',
                    items:[

                    ]
                },{
                    title: getText('Attachments'),
                    reference: 'attachments',
                    iconCls: 'fa fa-paperclip',
                    hidden: true,
                    items: [{
                            xtype: 'container',
                            reference: 'files',
                            items: {
                                xtype: 'grid',
                                name: 'attachmentGrid',
                                store: this.attachmentFilesStore,
                                multiSelect: false,
                                viewConfig: {
                                    stripeRows: true
                                },
                                columns: [
                                    {
                                        text: getText('Files'),
                                        dataIndex: 'name',
                                        flex: 1
                                    },
                                    {
                                        text: '',
                                        flex: 1,
                                        renderer: function (value, metaData, rec, rowIndex, colIndex, store) {
                                            var file = rec.data.file;
                                            var id = rec.data.refId;
                                            var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/PRODUCT_REFERENCE/' + id + '/' + file;

                                            return '<a style="text-decoration: inherit; color: inherit;" href="' +
                                                    path +
                                                    '" ><i class="fa fa-download" aria-hidden="true"></i> ' +
                                                    getText('Download') +
                                                    '</a>';
                                        }
                                    }
                                ],
                                width: '100%'
                            }
                        }]
                }
            ]
                
        });

        this.callParent(arguments);

    },
    
    
    clean : function() {

        this.characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        this.characteristicsPanel.removeAll();
        
        this.traceabilityPanel = this.query('panel[reference=traceability]')[0];
	this.traceabilityPanel.removeAll();
        
//        this.alertsPanel = this.query('panel[reference=alerts]')[0];;
//        this.alertsPanel.removeAll();
        
        this.interventionOrdersPanel = this.query('panel[reference=interventionOrdersPanel]')[0];;
        this.interventionOrdersPanel.removeAll();
        
        this.propertiesPanel = this.query('panel[reference=properties]')[0];
        this.propertiesPanel.removeAll();
        
//        this.materialPropertiesPanel = this.query('panel[reference=materialProperties]')[0];
//        this.materialPropertiesPanel.removeAll();
        
//        this.inheritedPropertiesPanel = this.query('panel[reference=inheritedProperties]')[0];
//        this.inheritedPropertiesPanel.removeAll();
        
//        var attachmentGrid = this.down('grid[name=attachmentGrid]');
//        this.attachmentFilesStore = attachmentGrid.getStore();
//        this.attachmentFilesStore.removeAll();
//        
//        this.materialPropertiesPanel.setVisible(false);
//        this.inheritedPropertiesPanel.setVisible(false);
        

    },
    
    
    setData: function(data){
        
        var parentScope = this;
        if(!data){
            return;
        }
        
        this.clean();
        
        this.viewModel.setData(data);
        
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
        
//        if(data.identified){
//            
//            this.materialPropertiesPanel.setVisible(true);
//            this.inheritedPropertiesPanel.setVisible(true);
//            
//            var materialProperties = data.materialPropertyConfigurationList;
//            var inheritedProperties = data.inheritedMaterialPropertyConfigurationList;
//            
//            if(materialProperties){
//                for(var i = 0; i < materialProperties.length; i++){
//                    var propertyFields = this.buildInheritedField(materialProperties[i]);
//                    this.materialPropertiesPanel.add(propertyFields);
//                }
//            }
//
//            if(inheritedProperties){
//                for(var i = 0; i < inheritedProperties.length; i++){
//                    var propertyFields = this.buildInheritedField(inheritedProperties[i]);
//                    this.inheritedPropertiesPanel.add(propertyFields);
//                }
//            }
//        }else{
//            this.materialPropertiesPanel.setVisible(false);
//            this.inheritedPropertiesPanel.setVisible(false);
//            
//            this.characteristicsPanel.setTitle(this.characteristicsPanel.title + ' ' + getText('(Materials set)'));
//        }
        
        //var model = this.config.configuration;
        
        this.characteristicsPanel.add(this.buildField({
            name: getText('Reference code'),
            value: data.productReference.referenceCode
        }));
        
        this.characteristicsPanel.add(this.buildField({
            name: getText('Reference designation'),
            value: data.productReference.designation
        }));
        
        this.characteristicsPanel.add(this.buildField({
            name: getText('Reference description'),
            value: data.productReference.description
        }));
        
        this.characteristicsPanel.add(this.buildField({
            name: getText('Category'),
            value: data.productReference.productCategory.fullPath
        }));
        
        if (data.productReference.description) {
            var description = data.productReference.description.replace(/\n/g, '<br/>');
            this.characteristicsPanel.add(this.buildField({
                name: getText('Description'),
                value: description ||''
            }));
        }
        
        // ALERTS
        
//        for (var i = 0; i < data.alertList.length; i++) {
//            this.alertsPanel.add(this.buildField({
//                name : getText('Warning'),
//                value : data.alerts[i].controlDescription
//            }));    
//        }
        
                
        // TRACEABILITY
        
        this.traceabilityPanel.add(this.buildField({
            name : getText('Quantity'),
            value : data.count
        }));
        
        this.traceabilityPanel.add(this.buildField({
            name: getText('Address'),
            value: data.location.path + '/' + data.location.name
        }));
        
        this.traceabilityPanel.add(this.buildField({
            name: getText('Last update'),
            value: this.dateToString(data.lastUpdateDate)
        }));
        
        // Properties
        var properties = data.productReference.properties;
        if (properties) {
            for (var i = 0; i < properties.length; i++) {
                var characteristicFields = this.buildField(properties[i]);
                this.propertiesPanel.add(characteristicFields);
            }
        }
        
        for(var i = 0; i < data.productReference.interventionOrderList.length; i++){
            var ioFields = this.buildField({name: null, value: data.productReference.interventionOrderList[i].number});
            this.interventionOrdersPanel.add(ioFields);
        }
        

//        var locationStore = Ext.create('Dashboard.store.administration.Locations', {
//            autoLoad: false
//        });

//        locationStore.on('load', function (store, records, successful, eOpts) {
//            if (successful) {
//                records.forEach(function (record) {
//                    for (var i = 0; i < data.assignedLocForPositions.length; i++) {
//                        if (data.assignedLocForPositions[i].locationId === record.id) {
//                            this.traceabilityPanel.add(parentScope.buildField({name: getText('Assigned location'), value: record.data.address}));
//                        }
//                    }
//                }, this);
//            } else {
//                Dashboard.tool.Utilities.error('[reference.MainController.onEditGetLocations] loading error');
//            }
//        });
//        // @TODO : add RFID CODE ? data.codeList ??
//        locationStore.load(); // async

        
//        if (data.files) {
//            data.files.forEach(function (file) {
//                this.attachmentFilesStore.add({
//                    name: file.slice(15), // remove timestamp & unique random chars
//                    file: file,
//                    refId: data.id
//                });
//            }, this);
//        }
    },
    
    
    buildProperty: function(property){
        
        var html = [
            '<div>',
                '<span class="material-detail-text">',
                    property.label,
                '</span>',
            '</div>'
        ];

        var field = {
            'html': html
        };
        
        return field;
    },
    
    
    buildInheritedField: function(property){
        
        var html = [
            '<table><tr>',
                '<td class="material-detail-label">',
                    property.label,
                '</td>',
            '</tr></table>'
        ];

        var field = {'html': html};
        return field;
    }

});