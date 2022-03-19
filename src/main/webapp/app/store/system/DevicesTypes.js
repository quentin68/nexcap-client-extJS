Ext.define('Dashboard.store.system.DevicesTypes', {
    extend: 'Dashboard.store.StoreBase',
    alias: 'store.devicesTypes',
    
    fields: [
        'type', 
        'label',
        'iconSrc'
    ],
    
    data:[
        {
            type: 'CABINET_XL',
            label: getText('Cabinet XL'),
            iconSrc: 'resources/images/devices/128/cabinet_xl.png',
            containsItems: true
        }, {
            type: 'CABINET_XS',
            label: getText('Cabinet XS'),
            iconSrc: 'resources/images/devices/128/cabinet_xs.png',
            containsItems: true
        }, {
            type: 'CABINET_XD',
            label: getText('Cabinet XD'),
            iconSrc: 'resources/images/devices/128/cabinet_xd.png',
            containsItems: true
        }, {
            type: 'X_DRAWERS',
            label: getText('Cabinet XD'),
            iconSrc: 'resources/images/devices/128/cabinet_xd.png',
            containsItems: true
        }, {
            type: 'CABINET_XLW',
            label: getText('Cabinet XLW'),
            iconSrc: 'resources/images/devices/128/cabinet_xlw.png',
            containsItems: true
        }, {
            type: 'CABINET_XDS',
            label: getText('Cabinet XDS'),
            iconSrc: 'resources/images/devices/128/cabinet_xds.png',
            containsItems: true
        }, {
            type: 'COUNTER',
            label: getText('Counter'),
            iconSrc: 'resources/images/devices/128/counter.png',
            containsItems: false
        },
//        {
//            type: 'PDA',
//            label: getText('PDA'),
//            iconSrc: 'resources/images/devices/128/pda.png'
//        },
        {
            type: 'TABLET',
            label: getText('Tablet'),
            iconSrc: 'resources/images/devices/128/tablet.png',
            containsItems: false
        }, {
            type: 'MOBILE_APP',
            label: getText('Mobile application'),
            iconSrc: 'resources/images/devices/128/mobile.png',
            containsItems: false
        }, {
            type: 'EXTERNAL_SYSTEM',
            label: getText('External system'),
            iconSrc: 'resources/images/devices/128/cloud.png',
            containsItems: false
        }, {
            type: 'NEXPORT',
            label: getText('Nexport'),
            iconSrc: 'resources/images/devices/128/nexport.png',
            containsItems: false
        }, {
            type: 'READING_STATION',
            label: getText('Reading station'),
            iconSrc: 'resources/images/devices/128/reading_station.png',
            containsItems: false
        }, {
            type: 'IOT_GATEWAY',
            label: getText('IOT Gateway'),
            iconSrc: 'resources/images/devices/128/iot_gateway.png',
            containsItems: false
        }
    ]

}); 