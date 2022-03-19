describe("app/engine/ExportToFile.js", function() {
	var engine = null;
	var tab = [];
	
	beforeEach(function() {
	});

	describe('cleanSort(...)', function() {
		it('Should Be Equal', function() {
			tab = [{_direction:"1", _property: "test", autre:"autre"}];
			var expected = [{direction:"1", property: "test"}];

			engine = Dashboard.engine.ExportToFile.cleanSort(tab);
			expect(engine).toEqual(expected);
		});

		it('Should Be undefined', function() {
			tab = [{test: "variable_test", autre:"autre"}];
			var expected = [{direction: undefined, property: undefined}];

			engine = Dashboard.engine.ExportToFile.cleanSort(tab);
			expect(engine).toEqual(expected);
		});

		it('Should Be undefined', function() {
			tab = [{test: "variable_test", autre:"autre", "_property": "prop"}];
			var expected = [{direction: undefined, property: "prop"}];

			engine = Dashboard.engine.ExportToFile.cleanSort(tab);
			expect(engine).toEqual(expected);
		});
	});
});