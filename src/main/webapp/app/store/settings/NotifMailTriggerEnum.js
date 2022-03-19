Ext.define('Dashboard.store.settings.NotifMailTriggerEnum', {
    extend: 'Ext.data.Store',
    
    model: 'Dashboard.model.settings.NotifMailTriggerEnum',
    
    data: [
        {
        name: 'NEW_DAY',
        description: getText('Trigger Time')
      },{
        name: 'NEW_WEEK',
        description: getText('Day and Trigger Time')
      },{
        name: 'NEW_MONTH',
        description: getText('Month and Trigger Time')
      },{
        name: 'NEW_HOUR',
        description: getText('Hour and Trigger Time')
      },{
        name: 'CREATE_ALERT',
        description: getText('Raising for a new alert')
      }
    ]
});