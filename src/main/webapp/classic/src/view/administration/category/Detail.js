/* global Ext  */

Ext.define('Dashboard.view.administration.category.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'categoryDetail',

    initComponent: function (){
        
        this.configDetail();

        var me = this;
        Ext.apply(me, {

            items: [
                {
                    xtype: 'displayfield',
                    bind: {
                        value: '{name}'
                    },
                    cls: 'category-detail-title',
                    margin: '12 12 12 24'

                }, {
                    xtype: 'image',
                    reference: 'thumbnail',
                    width: this.getImageSize() ? this.getImageSize() : '90%',
                    margin: '0 24 12 24'
                }, {
                    title: getText('Characteristics'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Items properties'),
                    reference: 'properties',
                    iconCls: 'fa fa-cube'
                }, {
                    title: getText('References properties'),
                    reference: 'refProperties',
                    iconCls: 'fa fa-cube'
                }, {
                    title: getText('Inherited items properties'),
                    reference: 'inheritedProperties',
                    iconCls: 'fa fa-cubes'
                }, {
                    title: getText('Inherited references properties'),
                    reference: 'refInheritedProperties',
                    iconCls: 'fa fa-cubes'
                }]
        });

        this.callParent(arguments);

    },
    
    
    clean: function (){

        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();
        var traceabilityPanel = this.query('panel[reference=properties]')[0];
        traceabilityPanel.removeAll();
        var alertsPanel = this.query('panel[reference=refProperties]')[0];
        alertsPanel.removeAll();
        var controlPanel = this.query('panel[reference=inheritedProperties]')[0];
        controlPanel.removeAll();
        var controlPanel = this.query('panel[reference=refInheritedProperties]')[0];
        controlPanel.removeAll();
    },
    

    setData: function (data){

        if (!data) {
            return;
        }

        this.viewModel.setData(data);
        
        var imgSrc = data.imageSrc;
        
        Ext.Ajax.request({
            scope:this,
            binary: true,  //set binary to true
            method: "GET",
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
            name: getText('Name'),
            value: data.name
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Parents'),
            value: data.path
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Last update'),
            value: Ext.Date.format(data.lastUpdateDate, getText('m/d/Y'))
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Description'),
            value: data.description
        }));

        // materialPropertyConfigurationList
        var properties = data.materialPropertyConfigurationList;
        var propertiesPanel = this.query('panel[reference=properties]')[0];
        propertiesPanel.removeAll();

        for (var i = 0; i < properties.length; i++) {
            var property = this.buildProperty(properties[i]);
            propertiesPanel.add(property);
        }


        // inheritedMaterialPropertyConfigurationList
        var inheritedMaterialPropertyConfigurationList = data.inheritedMaterialPropertyConfigurationList;
        var inheritedPropertiesPanel = this.query('panel[reference=inheritedProperties]')[0];
        inheritedPropertiesPanel.removeAll();

        if (inheritedMaterialPropertyConfigurationList) {
            for (var i = 0; i < inheritedMaterialPropertyConfigurationList.length; i++) {
                var property = this.buildProperty(inheritedMaterialPropertyConfigurationList[i]);
                inheritedPropertiesPanel.add(property);
            }
        }
        
        // productReferencePropertyConfigurationList
        var productReferenceProperties = data.productReferencePropertyConfigurationList;
        var productReferencePropertiesPanel = this.query('panel[reference=refProperties]')[0];
        productReferencePropertiesPanel.removeAll();

        for (var i = 0; i < productReferenceProperties.length; i++) {
            var property = this.buildProperty(productReferenceProperties[i]);
            productReferencePropertiesPanel.add(property);
        }

        // inheritedProductReferencePropertyConfigurationList
        var inheritedProductReferenceProperties = data.inheritedProductReferencePropertyConfigurationList;
        var inheritedProductReferencePropertiesPanel = this.query('panel[reference=refInheritedProperties]')[0];
        inheritedProductReferencePropertiesPanel.removeAll();

        if (inheritedProductReferenceProperties) {
            for (var i = 0; i < inheritedProductReferenceProperties.length; i++) {
                var property = this.buildProperty(inheritedProductReferenceProperties[i]);
                inheritedProductReferencePropertiesPanel.add(property);
            }
        }

    },

    buildProperty: function (property){

        var html = ['<div>', '<span class="material-detail-text">', property.label, '</span>', '</div>'];

        var field = {
            'html': html
        };

        return field;
    }

});