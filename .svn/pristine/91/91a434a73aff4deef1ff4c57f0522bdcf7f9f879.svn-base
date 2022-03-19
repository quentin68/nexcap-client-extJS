Ext.define('Dashboard.store.settings.SpecificCheckControlType', {
    extend: 'Ext.data.Store',
    
    model: 'Dashboard.model.settings.SpecificCheckControlType',
    
    data: [
      {
        type: 'photo',
        label: getText('Photo'),
        jsonExample: '{"numberMediaMax":5,"numberMediaNeeded":0}'
      },{
        type: 'scan',
        label: getText('Scan'),
        jsonExample: '{"numberMediaMax":5,"numberMediaNeeded":0}'
      },{
        type: 'radioButton',
        label: getText('Radio button'),
        jsonExample: '[{ "name": "test1", "selected": "false" }, { "name": "test2", "selected": "true", "alert": { "message": "Message de l’alerte", "level": "alert" } }]'
      },{
        type: 'text',
        label: getText('Text')
      },{
        type: 'textArea',
        label: getText('Textarea')
      },{
        type: 'date',
        label: getText('Date')
      },
      {
        type: 'dateTime',
        label: getText('Date time')
      },
      {
        type: 'list',
        label: getText('List'),
        jsonExample: '[{ "name": "item 1" }, { "name": "item 2", "alert": { "message": "Message de l’alerte", "level": "alert" } }]'
      },{
        type: 'slider',
        label: getText('Slider'),
        jsonExample: '{ "minValue": 0.0, "maxValue": 100.0, "numberDecimals": 0, "isDisplayedInf": "false", "isDisplayedSup": "false", "unit": "%", "supNormalisedValue": "0.8", "alertSup": { "message": "Taux de remplissage > 80%", "level": "info" }, "alertMax": { "message": "Taux de remplissage maximum", "level": "alert" } }'
      },{
        type: 'conformity',
        label: getText('Conformity'),
        jsonExample: '{ "inapplicable": "true", "alert": { "message": "Nom de l\'alerte", "level": "warning" } }'
      }
    ]
});