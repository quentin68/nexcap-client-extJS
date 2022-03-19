Ext.define('Dashboard.store.demo.Map', {
    extend: 'Ext.data.Store',
    model: 'Dashboard.model.demo.Map',
    data: [
        {
            id: 1,
            name: 'France',
            width: 1030,
            height: 900,
            description: '',
            thumbnailSrc: './resources/images/maps/1.jpg',
            imageSrc: './resources/images/maps/1.jpg',
            links: [
                {
                    'id': 1,
                    'label': 'Paris site',
                    'color': '#2962ff',
                    'linksTo': 2, // #FK 
                    'posX': 0.53,
                    'posY': 0.27,
                    'width': 50,
                    'height': 25
                }
            ]
        },
        {
            id: 2,
            name: 'Paris site',
            width: 1380,
            height: 870,
            description: '',
            thumbnailSrc: './resources/images/maps/2.jpg',
            imageSrc: './resources/images/maps/2.jpg',
            links: [
                {
                    'id': 1,
                    'label': 'Hangar N7',
                    'color': '#293299',
                    'linksTo': 3, // #FK 
                    'posX': 0.81,
                    'posY': 0.16,
                    'width': 150,
                    'height': 123
                }
            ],
            materials: [
                {
                    'id': 1,
                    'name': 'Toolbox #4',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '30000000000000000000AAAA'
                    },
                    'productReference': {
                        'designation': 'Toolbox',
                        'productCategory': {
                            'name': 'Toolbox'
                        },
                        'referenceCode': 'TB'
                    },
                    'mapPosition': {
                        'posX': 0.42,
                        'posY': 0.12
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                }, {
                    'id': 2,
                    'name': 'Container #1',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '30000000000000000000AAAD'
                    },
                    'productReference': {
                        'designation': 'Container',
                        'productCategory': {
                            'name': 'Metal Container'
                        },
                        'referenceCode': 'CO'
                    },
                    'mapPosition': {
                        'posX': 0.25,
                        'posY': 0.57
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                }, {
                    'id': 3,
                    'name': 'Container #2',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '30000000000000000000AAAE'
                    },
                    'productReference': {
                        'designation': 'Container',
                        'productCategory': {
                            'name': 'Metal Container'
                        },
                        'referenceCode': 'CO'
                    },
                    'mapPosition': {
                        'posX': 0.25,
                        'posY': 0.62
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                },
                {
                    'id': 4,
                    'name': 'Box #1',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '30000000000000000000AAAF'
                    },
                    'productReference': {
                        'designation': 'Logistic box 1x1,5m',
                        'productCategory': {
                            'name': 'Wood Container'
                        },
                        'referenceCode': 'BOX-1x1,5'
                    },
                    'mapPosition': {
                        'posX': 0.38,
                        'posY': 0.24
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': []
                }
            ]
        },
        {
            id: 3,
            name: 'Hangar N7',
            width: 780,
            height: 720,
            description: '',
            thumbnailSrc: './resources/images/maps/3.jpg',
            imageSrc: './resources/images/maps/3.jpg',
            materials: [
                {
                    'id': 1,
                    'name': 'Torque Wrench #1',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '300000000000000000000AAA'
                    },
                    'productReference': {
                        'designation': 'Torque Wrench',
                        'productCategory': {
                            'name': 'Electrical Torque Wrench'
                        },
                        'referenceCode': 'TW-270'
                    },
                    'mapPosition': {
                        'posX': 0.84,
                        'posY': 0.85
                    },
                    'previousCalibrationDate': '05/01/2017',
                    'nextCalibrationDate': '08/01/2017',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                },
                {
                    'id': 2,
                    'name': 'Torque Wrench #2',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '300000000000000000000AAB'
                    },
                    'productReference': {
                        'designation': 'Torque Wrench',
                        'productCategory': {
                            'name': 'Electrical Torque Wrench'
                        },
                        'referenceCode': 'TW-270'
                    },
                    'mapPosition': {
                        'posX': 0.47,
                        'posY': 0.47
                    },
                    'previousCalibrationDate': '05/01/2017',
                    'nextCalibrationDate': '08/01/2017',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                },
                {
                    'id': 3,
                    'name': 'Torque Wrench #3',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '300000000000000000000AAC'
                    },
                    'productReference': {
                        'designation': 'Torque Wrench',
                        'productCategory': {
                            'name': 'Electrical Torque Wrench'
                        },
                        'referenceCode': 'TW-270'
                    },
                    'mapPosition': {
                        'posX': 0.88,
                        'posY': 0.85
                    },
                    'previousCalibrationDate': '05/01/2017',
                    'nextCalibrationDate': '08/01/2017',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'To check'
                        }]
                },
                {
                    'id': 4,
                    'name': 'Toolbox #1',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '300000000000000000000AAD'
                    },
                    'productReference': {
                        'designation': 'Toolbox',
                        'productCategory': {
                            'name': 'Toolbox'
                        },
                        'referenceCode': 'TB'
                    },
                    'mapPosition': {
                        'posX': 0.28,
                        'posY': 0.30
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                },
                {
                    'id': 5,
                    'name': 'Toolbox #2',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '300000000000000000000AAE'
                    },
                    'productReference': {
                        'designation': 'Toolbox',
                        'productCategory': {
                            'name': 'Toolbox'
                        },
                        'referenceCode': 'TB'
                    },
                    'mapPosition': {
                        'posX': 0.6,
                        'posY': 0.57
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'Out of order'
                        }]
                },
                {
                    'id': 6,
                    'name': 'Toolbox #3',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '300000000000000000000AAF'
                    },
                    'productReference': {
                        'designation': 'Toolbox',
                        'productCategory': {
                            'name': 'Toolbox'
                        },
                        'referenceCode': 'TB'
                    },
                    'mapPosition': {
                        'posX': 0.85,
                        'posY': 0.94
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'To check'
                        }]
                },
                {
                    'id': 7,
                    'name': 'Transport trolley #1',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '30000000000000000000AAAB'
                    },
                    'productReference': {
                        'designation': 'Transport trolley ',
                        'productCategory': {
                            'name': 'Metal Container'
                        },
                        'referenceCode': 'TT'
                    },
                    'mapPosition': {
                        'posX': 0.91,
                        'posY': 0.60
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': []
                },
                {
                    'id': 8,
                    'name': 'Transport trolley #2',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '30000000000000000000AAAC'
                    },
                    'productReference': {
                        'designation': 'Transport trolley',
                        'productCategory': {
                            'name': 'Metal Container'
                        },
                        'referenceCode': 'TT'
                    },
                    'mapPosition': {
                        'posX': 0.91,
                        'posY': 0.55
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': []
                },
                {
                    'id': 9,
                    'name': 'Box #2',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '30000000000000000000AABA'
                    },
                    'productReference': {
                        'designation': 'Logistic box 1x1,5m',
                        'productCategory': {
                            'name': 'Wood Container'
                        },
                        'referenceCode': 'BOX-1x1,5'
                    },
                    'mapPosition': {
                        'posX': 0.1,
                        'posY': 0.6
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': []
                },
                {
                    'id': 10,
                    'name': 'Box #3',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '30000000000000000000AABB'
                    },
                    'productReference': {
                        'designation': 'Logistic box 1x1,5m',
                        'productCategory': {
                            'name': 'Wood Container'
                        },
                        'referenceCode': 'BOX-2x1,5'
                    },
                    'mapPosition': {
                        'posX': 0.1,
                        'posY': 0.65
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': []
                },
                {
                    'id': 11,
                    'name': 'Engine Support #1',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '3000000000000000000ABAAF'
                    },
                    'productReference': {
                        'designation': 'Engine Support',
                        'productCategory': {
                            'name': 'Engine Support'
                        },
                        'referenceCode': 'ES'
                    },
                    'mapPosition': {
                        'posX': 0.7,
                        'posY': 0.6
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                },
                {
                    'id': 12,
                    'name': 'Engine Support #2',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '3000000000000000000ABBAF'
                    },
                    'productReference': {
                        'designation': 'Engine Support',
                        'productCategory': {
                            'name': 'Engine Support'
                        },
                        'referenceCode': 'ES'
                    },
                    'mapPosition': {
                        'posX': 0.4,
                        'posY': 0.6
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                }, {
                    'id': 13,
                    'name': 'Engine Support #3',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '3000000000000000000ABCAF'
                    },
                    'productReference': {
                        'designation': 'Engine Support',
                        'productCategory': {
                            'name': 'Engine Support'
                        },
                        'referenceCode': 'ES'
                    },
                    'mapPosition': {
                        'posX': 0.91,
                        'posY': 0.15
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                }, {
                    'id': 14,
                    'name': 'Engine Support #4',
                    "picture": {
                        "pictureName": "picture.jpg",
                        "thumbnailName": "thumbnail.jpg",
                        "pictureSourceType": "MATERIAL",
                        "pictureSourceId": 1
                    },
                    'code': {
                        'code': '3000000000000000000ABDAF'
                    },
                    'productReference': {
                        'designation': 'Engine Support',
                        'productCategory': {
                            'name': 'Engine Support'
                        },
                        'referenceCode': 'ES'
                    },
                    'mapPosition': {
                        'posX': 0.91,
                        'posY': 0.20
                    },
                    'calibrationDate': '2017-05-01T09:35:26+02:00',
                    'availabilityDate': '2017-08-01T09:35:26+02:00',
                    'description': 'Material description',
                    'properties': [{
                            'configuration': null,
                            'name': 'curState',
                            'value': 'In service'
                        }]
                }

            ]
        }
    ]
});