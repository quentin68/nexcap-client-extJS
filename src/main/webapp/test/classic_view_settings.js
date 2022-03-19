describe("Dashboard.view.settings.specificCheckConfig.paragraph.CreateController", function() {

	var controller = null;

	beforeEach(function(){
		controller = new Dashboard.view.settings.specificCheckConfig.paragraph.CreateController();
	});

	describe("buildField(...)", function() {
		it("Should be not null", function() {
			var response = {
								"id": 1,
								"name": "Catégorie",
								"description": "",
								"lastUpdateDate": "2017-05-24T14:00:44.488+0000",
								"parentCategory": null,
								"subCategoryList": [],
								"productReferenceIdList": [],
								"picture": {
									"pictureName": "",
									"thumbnailName": "",
									"pictureSourceType": null,
									"pictureSourceId": 0
								}
							};

            var model = Ext.create('Dashboard.model.Category', response);
            var field = controller.buildField(model);
            var items = [];
            var pos = 0;

            for(var element in Object.keys(field.items.items)){
            	items[pos] = field.items.items[element];
            	pos = pos + 1;
            }

            expect(items[0].fieldLabel).toBe('Name');
            expect(items[1].fieldLabel).toBe('Type');
            expect(items[2].fieldLabel).toBe('Max');

            // console.log(items[0].fieldLabel);
		});

		it("Should exist data.type at null", function() {
			var response = {
								"id": 1,
								"name": "Catégorie",
								"description": "",
								"type": null,
								"lastUpdateDate": "2017-05-24T14:00:44.488+0000",
								"parentCategory": null,
								"subCategoryList": [],
								"productReferenceIdList": [],
								"picture": {
									"pictureName": "",
									"thumbnailName": "",
									"pictureSourceType": null,
									"pictureSourceId": 0
								}
							};

			var model = Ext.create('Dashboard.model.Category', model);
            var field = controller.buildField(response);
            var items = [];
            var pos = 0;

            for(var element in Object.keys(field.items.items)){
            	items[pos] = field.items.items[element];
            	pos = pos + 1;
            }

            /*
           	var expectedElements = ['Name', 'Max'];
           	
           	var fieldLabels = items.map((item)=>{
           		return item.fieldLabel;
           	});

           	for(var i=0; i<expectedElements.length; i++){
           		expect(fieldLabels).toContain(expectedElements[i]);
           	} 
           	// Syntaxe ligne 74 ne fonctionne pas sous IE
           	*/ 

           	expect(items[0].fieldLabel).toBe('Name');
            expect(items[1].fieldLabel).toBe('Max');
        });

		it("Should be ok without model", function() {
            var field = controller.buildField('');
            var items = [];
            var pos = 0;

            for(var element in Object.keys(field.items.items)){
            	items[pos] = field.items.items[element];
            	pos = pos + 1;
            }

            expect(items[0].fieldLabel).toBe('Name');
            expect(items[1].fieldLabel).toBe('Type');
            expect(items[2].fieldLabel).toBe('Max');

            // console.log(items[0].fieldLabel);
		});
	});
});