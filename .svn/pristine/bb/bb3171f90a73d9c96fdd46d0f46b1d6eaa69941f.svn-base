/* global Ext, moment */

Ext.define('Dashboard.model.system.SensorTypeDescription', {
    extend: 'Dashboard.model.Base',
    requires: ['Dashboard.tool.Utilities'],
    
    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'sensorType',
            type: 'auto'
        }, {
            name: 'compatibleProcessor',
            type: 'auto'
        }, {
            name: 'name',
            type: 'string',
            convert: function(val, record){
                if(record.data.sensorType && record.data.sensorType.name){
                    return record.data.sensorType.name;
                }
            }
        }, {
            name: 'label',
            type: 'string',
            convert: function(val, record){
                if(record.data.sensorType){
                    if(record.data.sensorType.label){
                        return record.data.sensorType.label;
                    }else{
                        if(record.data.sensorType && record.data.sensorType.name){
                            return getText(record.data.sensorType.name);
                        }
                    }
                }
            }
        }
    ]

});