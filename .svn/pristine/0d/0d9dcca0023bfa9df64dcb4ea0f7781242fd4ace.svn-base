/* global Ext  */

Ext.define('Dashboard.store.enums.AlertModelType', {
    extend: 'Ext.data.Store',
    alias: 'store.alertModelType',
    
    fields: [
        'name', 
        'label',
        {
            name: 'localizedLabel',
            type: 'string',
            convert: function(val, record){
                if(record.data.label){
                    return getText(record.data.label);
                }
            }
        }
    ],
    
    data: [
        {
            name: 'MATERIAL',
            label: 'Item'
        },  {
            name: 'INVENTORY',
            label: 'Inventory'
        }, {
            name: 'STOCK',
            label: 'Stock level'
        }, {
            name: 'USER',
            label: 'User'
        }, {
            name: 'LOCATION',
            label: 'Localisation'
        }, {
            name: 'DEVICE',
            label: 'Device'
        }
        // , {
        //     name: 'OPERATION',
        //     label: 'Operation'
        // }
    ],

    statics: {
        ITEM: {
            name: 'ITEM',
            label: 'Item'
        },
        INVENTORY: {
            name: 'INVENTORY',
            label: 'Inventory'
        },
        STOCK: {
            name: 'STOCK',
            label: 'Stock level'
        },
        USER: {
            name: 'USER',
            label: 'User'
        },
        LOCATION: {
            name: 'LOCATION',
            label: 'Localisation'
        },
        DEVICE: {
            name: 'DEVICE',
            label: 'Device'
        }
        // ,
        // OPERATION: {
        //     name: 'OPERATION',
        //     label: 'Operation'
        // }
    }
});