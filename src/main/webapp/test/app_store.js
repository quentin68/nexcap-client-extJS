describe('app/store/StatisticFilters', function(){

	it('Index should be equal to 0', function(){
		var statStore = new Dashboard.store.StatisticFilters();
		statStore.load({
			callback: function(records, successful, operation){
				expect(successful).not.toBe(true);
			}
		});
	});

});

describe('app/store/OperationType', function(){
	describe('data', function() {
		it('Should have the good operations types', function() {
			var expected = ['BORROW', 'RETURN', 'SEND', 'RECEIVE', 'MOVE', 'CONSUME', 'PROVISION', 'LEAVE_TO_MAINTENANCE', 'RETURN_FROM_MAINTENANCE', 'LEAVE_TO_CALIBRATION', 'RETURN_FROM_CALIBRATION'];
			var obj = null;
			var properties = [];
			var store = new Dashboard.store.OperationType();
			// console.log(store.data.items[1].data['name']);
			for(var indice=0; indice<expected.length; indice++){
				obj = store.data.items[indice].data['name'];
				properties.push(obj);
			}
			for(var i=0; i<expected.length; i++){
           		expect(properties).toContain(expected[i]);
           	}
			for(var i=0; i<properties.length; i++){
           		expect(expected).toContain(properties[i]);
           	}
		});
	});
});
