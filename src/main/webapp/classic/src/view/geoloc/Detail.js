Ext.define('Dashboard.view.geoloc.Detail', {
    extend: 'Dashboard.view.shared.component.Detail',
    xtype: 'geolocDetail',
    
    toolBarVisible: false,
    configEnabled: false,

    initComponent: function () {
        
        this.configDetail();

        var me = this;

        Ext.apply(me, {
            cls: 'detailMap',
            items: [
                {
                    xtype: 'displayfield',
                    reference: 'title',
                    bind: {
                        value: '{name}'
                    },
                    cls: 'material-detail-title',
                    margin: '12 12 12 24'

                }, {
                    title: getText('Map'),
                    reference: 'characteristics',
                    iconCls: 'fa fa-info'
                }, {
                    title: getText('Cartography'),
                    reference: 'map',
                    iconCls: 'fa fa-map'
                }
            ]
        });

        this.callParent(arguments);
    },

    clean: function () {
        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        var mapPanel = this.query('panel[reference=map]')[0];
        mapPanel.removeAll();
    },

    setData: function (data) {
        if (!data) {
            return;
        }

//        if(this.viewModel){
//            this.viewModel.setData(data);
//        }
        
        this.down('displayfield[reference=title]').setValue(data.title);

        var characteristicsPanel = this.query('panel[reference=characteristics]')[0];
        characteristicsPanel.removeAll();

        var mapPanel = this.query('panel[reference=map]')[0];
        mapPanel.removeAll();
        
        var lengthInRealLife = 0;
        var widthInRealLife = 0;
        
        try{
            lengthInRealLife = data.geoLocArea.sizeInRealLife.width;
            widthInRealLife = data.geoLocArea.sizeInRealLife.height;
        }catch(ex){}

        // Classic properties
        characteristicsPanel.add(this.buildField({
            name: getText('Title'),
            value: data.title
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Description'),
            value: data.description
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Length'),
            value: lengthInRealLife + ' m'
        }));
        
        characteristicsPanel.add(this.buildField({
            name: getText('Width'),
            value: widthInRealLife + ' m'
        }));

        characteristicsPanel.add(this.buildField({
            name: getText('Items count'),
            value: data.materialsLayer.mapMaterials.length
        }));

        characteristicsPanel.add(this.buildField({
            name: getText('Locations count'),
            value: data.locationsLayer.mapLocations.length
        }));

        characteristicsPanel.add(this.buildField({
            name: getText('Devices count'),
            value: data.devicesLayer.mapDevices.length
        }));

        if (data.materialsLayer.options && data.materialsLayer.options.displayingRules) {
            var displayingRules = data.materialsLayer.options.displayingRules;
            for (var i = 0; i < displayingRules.length; i++) {
                /////
                var comparaisonString = eval('Dashboard.store.FilterTypes.FILTER_COMPARISON.' + displayingRules[i].comparison);
                var value = '';
                if (displayingRules[i].comparison === 'IS_NULL' || displayingRules[i].comparison === 'IS_NOT_NULL') {
                    // TODO ?
                } else {
                    value = displayingRules[i].value;
                }

                mapPanel.add(this.buildField({
                    name: '<b>' + displayingRules[i].label + '</b> (' + getText(comparaisonString) + ') <b>' + value + '</b>',
                    value: '<div style="width:25px; height:25px;background-color:' + displayingRules[i].color + '"><img style="display:block; display: block; margin: auto; width:23px" src="' + displayingRules[i].iconSrc + '" /></div>'
                }));
                /////
            }
        }
        console.log(data);
    }
});
