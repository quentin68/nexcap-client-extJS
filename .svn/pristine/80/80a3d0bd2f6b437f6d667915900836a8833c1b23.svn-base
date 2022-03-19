/* global Ext  */

Ext.define('Dashboard.view.administration.reference.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'referenceDetail',
    attachmentFilesStore : null,

    initComponent: function() {
        
        this.configDetail();
        
        var me = this;
        
        this.attachmentFilesStore = Ext.create(Ext.data.Store, {
            fields: ['id', 'file']
        });
                
        Ext.apply( me, {
            
            items: [
                 {
                    xtype: 'displayfield',
                    bind: {
                        value: '{designation}' 
                    },
                    cls: 'reference-detail-title',
                    margin: '12 12 12 24'

                },{
                    xtype: 'image',
                    reference: 'thumbnail',
                    width: this.getImageSize() ? this.getImageSize() : '90%',
                    margin: '0 24 12 24'
                },{
                    title: getText('Product reference'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                },{
                    title: getText('Properties'),
                    reference: 'properties',
                    iconCls: 'fa fa-cube',
                    hidden: true //TODO
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
                }, {
                    title: getText('Traceability'),
                    reference: 'traceability',
                    iconCls: 'fa fa-map-marker',
                    items:[

                    ]
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
                                                var path = Dashboard.config.Config.SERVER_HOST_NAME + '/resources/file/PRODUCT_REFERENCE/' + id;
                                                path += '/' + encodeURI(file);

                                                Dashboard.manager.administration.FilesManager.loadFile(path, file, grid);
                                            }
                                        }]
                                    }
                                ]
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
        
        this.interventionOrdersPanel = this.query('panel[reference=interventionOrdersPanel]')[0];;
        this.interventionOrdersPanel.removeAll();
        
        this.propertiesPanel = this.query('panel[reference=properties]')[0];
        this.propertiesPanel.removeAll();
        
        this.materialPropertiesPanel = this.query('panel[reference=materialProperties]')[0];
        this.materialPropertiesPanel.removeAll();
        
        this.inheritedPropertiesPanel = this.query('panel[reference=inheritedProperties]')[0];
        this.inheritedPropertiesPanel.removeAll();
        
        this.traceabilityPanel = this.query('panel[reference=traceability]')[0];
        this.traceabilityPanel.removeAll();
        
        var attachmentGrid = this.down('grid[name=attachmentGrid]');
        this.attachmentFilesStore = attachmentGrid.getStore();
        this.attachmentFilesStore.removeAll();
        
        this.materialPropertiesPanel.setVisible(false);
        this.inheritedPropertiesPanel.setVisible(false);
        
        this.characteristicsPanel.setTitle(getText('Product reference'));
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
        
        if (data.identified) {

            this.materialPropertiesPanel.setVisible(true);
            this.inheritedPropertiesPanel.setVisible(true);

            var materialProperties = data.materialPropertyConfigurationList;
            var inheritedProperties = data.inheritedMaterialPropertyConfigurationList;

            if (materialProperties) {
                for (var i = 0; i < materialProperties.length; i++) {
                    var propertyFields = this.buildInheritedField(materialProperties[i]);
                    this.materialPropertiesPanel.add(propertyFields);
                }
            }

            if (inheritedProperties) {
                for (var i = 0; i < inheritedProperties.length; i++) {
                    var propertyFields = this.buildInheritedField(inheritedProperties[i]);
                    this.inheritedPropertiesPanel.add(propertyFields);
                }
            }
        } else {
            this.materialPropertiesPanel.setVisible(false);
            this.inheritedPropertiesPanel.setVisible(false);

            this.characteristicsPanel.setTitle(this.characteristicsPanel.title + ' ' + getText('(Materials set)'));
        }
        
        
        this.characteristicsPanel.add(this.buildField({
            name: getText('Reference code'),
            value: data.referenceCode
        }));
        
        this.characteristicsPanel.add(this.buildField({
            name: getText('Reference designation'),
            value: data.designation
        }));
        
        this.characteristicsPanel.add(this.buildField({
            name: getText('Category'),
            value: data.productCategory.fullPath
        }));
        
        if (data.description) {
            this.characteristicsPanel.add(this.buildField({
                name: getText('Description'),
                value: data.description
            }));
        }
        
        this.characteristicsPanel.add(this.buildField({
            name: getText('Last update'),
            value: Ext.Date.format(data.lastUpdateDate, getText('m/d/Y'))
        }));
        
        //var model = this.config.configuration;
        var properties = data.properties;
        
        if (!properties) {
            Dashboard.tool.Utilities.error('[reference.Detail.setData] properties null or empty !');
            return;
        }

        for (var i = 0; i < properties.length; i++) {
            
            try {

                var property = Ext.create('Dashboard.model.PropertyConfiguration', properties[i].configuration);
                property.value = properties[i].value;

                var characteristicFields = null;
                var control = Dashboard.model.PropertyConfiguration.getControl(property);

                if (control !== undefined) {
                    var configuration = control.configuration;
                    if (configuration && configuration.enabledInDetails !== undefined) {
                        if (configuration.enabledInDetails === true) {
                            characteristicFields = this.buildField(property);
                            this.characteristicsPanel.add(characteristicFields);
                        }
                    } else {
                        characteristicFields = this.buildField(property);
                        this.characteristicsPanel.add(characteristicFields);
                    }
                }                  

            } catch (ex) {
                Dashboard.tool.Utilities.error('[reference.Detail.setData] property error : ' + ex);
            }
        }
        
        for(var i = 0; i < data.interventionOrderList.length; i++){
            var ioFields = this.buildField({name: null, value: data.interventionOrderList[i].number});
            this.interventionOrdersPanel.add(ioFields);
        }
        
        // Tracability
        
        if(data.codeList && data.codeList.length > 0){
            parentScope.traceabilityPanel.add(parentScope.buildField({name: getText('Codes'), value: '', 'fontWeight': 'Bold'}));
            for (var i = 0; i < data.codeList.length; i++) {
                var label = Dashboard.store.enums.CodeType[data.codeList[i].codeType +''].label;
                this.traceabilityPanel.add(parentScope.buildField({name: null, value: getText(label) + ' : ' + data.codeList[i].code}));
            }
        }
        
        if(data.assignedLocForPositions && data.assignedLocForPositions.length > 0){
            parentScope.traceabilityPanel.add(parentScope.buildField({name: null, value: ''}));
            parentScope.traceabilityPanel.add(parentScope.buildField({name: getText('Assigned locations'), value: '', 'fontWeight': 'Bold'}));
            for (var i = 0; i < data.assignedLocForPositions.length; i++) {
                if (data.assignedLocForPositions[i].locationAddress) {
                    parentScope.traceabilityPanel.add(parentScope.buildField({name: null, value: data.assignedLocForPositions[i].locationAddress}));
                }
            }
        }

        
        if (data.files) {
            data.files.forEach(function (file) {
                this.attachmentFilesStore.add({
                    name: file.slice(15), // remove timestamp & unique random chars
                    file: file,
                    refId: data.id
                });
            }, this);
        }
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