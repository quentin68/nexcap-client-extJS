describe("app/model/Configuration", function() {

	var model = null;

	beforeEach(function() {
	});

	describe("getControl(...)", function() {
		it("Should be equal", function() {
			var data = {
						data: {
							id: 1,
							name: "test",
							label: "label",
							valueList: "value_list",
							isEditable: "is_editable",
							isDisplayed: "is_displayed",
							control: {
								field: "field",
								configuration: "config"
							},
							options: {
								nexcapweb: {
									id: 6,
									name: "name_nexcap_web"
								}
							}
						}};
			var expected = {field: 'field', configuration: 'config'};

			model = Dashboard.model.PropertyConfiguration.getControl(data);
			expect(model).toEqual(expected);
		});
	});
}); 

describe("app/model/StatisticReferenceProperty", function() {

	beforeEach(function() {
	});

	describe("fields", function() {
		it("Should be contain 3 importantes fields", function() {

			var expected = ['name', 'label', 'type'];
			var obj = null;
			var properties = [];
			for(var indice=0; indice<expected.length; indice++){
				obj = Dashboard.model.StatisticReferenceProperty.fields[indice];
				properties.push(obj['name']);
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

describe("app/model/CalculByType", function() {

	beforeEach(function() {
	});

	describe("fields", function() {
		it("Should be contain 2 importantes fields", function() {

			var expected = ['calculByType', 'label'];
			var obj = null;
			var properties = [];
			for(var indice=0; indice<expected.length; indice++){
				obj = Dashboard.model.CalculByType.fields[indice];
				properties.push(obj['name']);
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

describe("app/model/DashboardScene", function() {

	beforeEach(function() {
	});

	describe("fields", function() {
		it("Should be contain the importantes fields", function() {

			var expected = ['id', 'name', 'title', 'indicatorIds', 'creationDate', 'authorName', 'configuration'];
			var obj = null;
			var properties = [];
			for(var indice=0; indice<expected.length; indice++){
				obj = Dashboard.model.DashboardScene.fields[indice];
				properties.push(obj['name']);
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

describe("app/model/Feature", function() {

	beforeEach(function() {
	});

	describe("fields", function() {
		it("Should be contain the importantes fields", function() {

			var expected = ['id', 'name', 'label', 'configuration', 'userPreferences', 'dynamicPropertiesContext'];
			var obj = null;
			var properties = [];
			for(var indice=0; indice<expected.length; indice++){
				obj = Dashboard.model.Feature.fields[indice];
				properties.push(obj['name']);
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

describe("app/model/Filter", function() {

	beforeEach(function() {
	});

	describe("fields", function() {
		it("Should be contain 3 importantes fields", function() {

			var expected = ['id', 'name', 'label', 'type', 'comparison', 'configuration', 'property'];
			var obj = null;
			var properties = [];
			for(var indice=0; indice<expected.length; indice++){
				obj = Dashboard.model.Filter.fields[indice];
				properties.push(obj['name']);
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