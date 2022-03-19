Ext.define('Dashboard.store.settings.TriggerEnum', {
    extend: 'Ext.data.Store',
    
    model: 'Dashboard.model.settings.TriggerEnum',
    
    data: [
      {
        id: 0,
        name: 'BORROW_MATERIAL',
        description: getText('Borrow a material')
      },{
        id: 1,
        name: 'BORROW_MATERIAL_LIST',
        description: getText('Borrow a material List')
      },{
        id: 2,
        name: 'SEND_MATERIAL',
        description: getText('Send a material')
      },{
        id: 3,
        name: 'RECEIVE_MATERIAL',
        description: getText('Receive a material')
      },{
        id: 4,
        name: 'MOVE_MATERIAL',
        description: getText('Move a material')
      },{
        id: 5,
        name: 'LEAVE_TO_MAINTENANCE',
        description: getText('Remove a material for maintenance')
      },{
        id: 6,
        name: 'LEAVE_TO_CALIBRATION',
        description: getText('Remove a material for calibration')
      },{
        id: 7,
        name: 'CREATE_MATERIAL',
        description: getText('Create a material')
      },{
        id: 8,
        name: 'UPDATE_MATERIAL',
        description: getText('Update a material')
      },{
        id: 9,
        name: 'CREATE_USER',
        description: getText('Create a user')
      },{
        id: 10,
        name: 'UPDATE_USER',
        description: getText('Update a user')
      },{
        id: 11,
        name: 'CREATE_LOCATION',
        description: getText('Create a localisation')
      },{
        id: 12,
        name: 'UPDATE_LOCATION',
        description: getText('Update a localisation')
      },{
        id: 13,
        name: 'CREATE_SPECIFICCHECK',
        description: getText('Create specific check')
      }, {
        id: 14,
        name: 'NEW_DAY',
        description: getText('New Day')
      }, {
        id: 15,
        name: 'NEW_HOUR',
        description: getText('New Hour')
      }, {
        id: 16,
        name: 'NEW_MONTH',
        description: getText('New Month')
      },  {
        id: 16,
        name: 'NEW_WEEK',
        description: getText('New Week')
      } , {
        id: 17,
        name: 'RETURN_MATERIAL',
        description: getText('Return a material')
      }, {
        id: 18,
        name: 'RETURN_FROM_CALIBRATION',
        description: getText('Return a material for calibration')
      },{
        id: 19,
        name: 'RETURN_FROM_MAINTENANCE',
        description: getText('Return a material for maintenance')
      },{
        id: 20,
        name: 'EDIT_MATERIAL',
        description: getText('Edit a material sheet')
      }





     /* {
        id: 1,
        name: 'RETURN',
        description: getText('Return a material')
      },{
        id: 5,
        name: 'CONSUME',
        description: getText('Use a material')
      },{
        id: 6,
        name: 'TAG_ASSIGNMENT',
        description: getText('Assign a tag to a material')
      },{
        id: 7,
        name: 'ALL_MOVEMENT',
        description: getText('Any movement operation')
      },{
        id: 9,
        name: 'RETURN_FROM_MAINTENANCE',
        description: getText('Return a material for  maintenance')
      },{
        id: 11,
        name: 'RETURN_FROM_CALIBRATION',
        description: getText('Return a material for calibration')
      },{
        id: 12,
        name: 'EDIT_MATERIAL',
        description: getText('Edit a material sheet')
      },{
        id: 13,
        name: 'CHANGE_DAY',
        description: getText('Change of day')
      },{
        id: 14,
        name: 'CREATE_SPECIFIC_CONTROL',
        description: getText('Create a specific control')
      },{
        id: 15,
        name: 'CHANGE_HOUR',
        description: getText('Time change')
      },{
        id: 16,
        name: 'BORROW_LIST',
        description: getText('List of borrowings')
      },{
        id: 17,
        name: 'CREATE_EDIT_ITEM',
        description: getText('Create or edit an item')
      },{
        id: 18,
        name: 'REMOVE_ITEM',
        description: getText('Remove an item')
      },{
        id: 19,
        name: 'CREATE_EDIT_INVENTORY',
        description: getText('Create an inventory')
      },{
        id: 20,
        name: 'CREATE_EDIT_STOCK',
        description: getText('Create or edit a stock')
      },{
        id: 21,
        name: 'REMOVE_STOCK',
        description: getText('Remove a stock')
      },{
        id: 22,
        name: 'CREATE_EDIT_USER',
        description: getText('Create or edit an user')
      },{
        id: 23,
        name: 'REMOVE_USER',
        description: getText('Remove an user')
      },{
        id: 24,
        name: 'CREATE_EDIT_LOCATION',
        description: getText('Create or edit a localisation')
      },{
        id: 25,
        name: 'REMOVE_LOCATION',
        description: getText('Remove a localisation')
      },{
        id: 26,
        name: 'CREATE_EDIT_DEVICE',
        description: getText('Create or edit a device')
      },{
        id: 27,
        name: 'REMOVE_DEVICE',
        description: getText('Remove a device')
      } */
    ]
});