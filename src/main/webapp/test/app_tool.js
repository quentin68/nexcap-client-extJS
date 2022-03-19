describe("Dashboard.tool.Utilities", function() {

	var utils = null;
	var data = null;


	beforeEach(function(){
	});

	describe("findIndex(...)", function() {

		data = [
			{ name : 'Test1', age : '3' },
			{ name : 'Test2', age : '8' }
		];

		it("Index should be 1", function() {
			utils = Dashboard.tool.Utilities.findIndex(data, 'name', 'Test2');
			expect(utils).toBe(1);
		});

		it("Index should not be 0", function() {
			utils = Dashboard.tool.Utilities.findIndex(data, 'name', 'Test2');
			expect(utils).not.toBe(0);
		});

		it("Index should be 0", function() {
			utils = Dashboard.tool.Utilities.findIndex(data, 'name', 'Test1');
			expect(utils).toBe(0);
		});
	});

	describe("getBrowser()", function() {
		it("Should return true", function() {
			utils = Dashboard.tool.Utilities.getBrowser();
			if(Ext.browser.is.IE){
				expect(utils).toBe('EXPORER'); // Oui il y a une faute, la même que dans la fonction testée 
			}else{
				expect(utils).toBe('NOT_EXPLORER');
			}
		});
	});

	describe("validateFileExtension(...)", function() {
		it("Should return true for PDF", function() {
			utils = Dashboard.tool.Utilities.validateFileExtension("fichier.pdf");
			expect(utils).toBeTruthy();
		});
		it("Should return true for docx", function() {
			utils = Dashboard.tool.Utilities.validateFileExtension("fichier.docx");
			expect(utils).toBeTruthy();
		});
		it("Should return false for not extension", function() {
			utils = Dashboard.tool.Utilities.validateFileExtension("fichier");
			expect(utils).toBe(false);
		});
	});

	describe("validateFileExtension(...)", function() {
		it("Should return true for PDF", function() {
			utils = Dashboard.tool.Utilities.validateFileExtension("fichier.pdf");
			expect(utils).toBe(true);
		});
		it("Should return true for docx", function() {
			utils = Dashboard.tool.Utilities.validateFileExtension("fichier.docx");
			expect(utils).toBe(true);
		});
		it("Should return false for not extension", function() {
			utils = Dashboard.tool.Utilities.validateFileExtension("fichier");
			expect(utils).toBe(false);
		});
	});

	describe("concatUnique(...)", function() {

		var array1 = ["1", "emplacement2", "test3"];
		var array2 = ["emplacement2", "3", "test"];

		var result = ["1", "emplacement2", "test3", "3", "test"];

		it("Should equal", function() {
			utils = Dashboard.tool.Utilities.concatUnique(array1, array2);
			expect(utils).toEqual(result);
		});
		it("Should not equal", function() {
			var result = ["1", "emplacement2", "emplacement2", "test3", "3", "test"];
			utils = Dashboard.tool.Utilities.concatUnique(array1, array2);
			expect(utils).not.toEqual(result);
		});
	});

	describe("isInt(...)", function() {
		it("Should be Int", function() {
			utils = Dashboard.tool.Utilities.isInt(6);
			expect(utils).toBe(true);
		});
		it("Should not be Int", function() {
			utils = Dashboard.tool.Utilities.isInt("6");
			expect(utils).toBe(false);
		});
		it("Should not be Int", function() {
			utils = Dashboard.tool.Utilities.isInt(6.3);
			expect(utils).toBe(false);
		});
	});
});

describe("Dashboard.tool.DateTime", function() {
	beforeEach(function(){
	});

	describe("getDateFormat()", function() {
		it("Should be 'Y/m/d'", function() {
			date = Dashboard.tool.DateTime.getDateFormat();
			expect(date).toBe('Y/m/d');
		});
	});

	describe("getDateTimeFormat()", function() {
		it("Should be 'm/d/Y H:i:s'", function() {
			date = Dashboard.tool.DateTime.getDateTimeFormat();
			expect(date).toBe('m/d/Y H:i:s');
		});
	});

	describe("getTimeFormat()", function() {
		it("Should be 'H:i:s'", function() {
			date = Dashboard.tool.DateTime.getTimeFormat();
			expect(date).toBe('H:i:s');
		});
	});

	describe("convertFormatDate()", function() {
		it("Should be ''", function() {
			date = Dashboard.tool.DateTime.convertFormatDate('');
			expect(date).toBe('');
		});
		it("Should be return with '/'", function() {
			date = Dashboard.tool.DateTime.convertFormatDate('2017-05-23');
			expect(date).toBe('2017/05/23');
		});
		it("Should not be return ''", function() {
			date = Dashboard.tool.DateTime.convertFormatDate('2017-05-23');
			expect(date).not.toBe('');
		});
		it("Should not be return with '/'", function() {
			date = Dashboard.tool.DateTime.convertFormatDate('2017/05/23');
			expect(date).toBe('2017/05/23');
		});
		it("Should not be return with '/'", function() {
			date = Dashboard.tool.DateTime.convertFormatDate('2017-05/23');
			expect(date).toBe('2017/05/23');
		});
	});

	describe("toDateString()", function() {
		it("Should be convert '/' to '-'", function() {
			date = Dashboard.tool.DateTime.toDateString(new Date('2017/05/23'));
			expect(date).toBe('2017-05-23');
		});
	});

	describe("toDateTimeString()", function() {
		it("Should be convert '/' to '-'", function() {
			date = Dashboard.tool.DateTime.toDateTimeString(new Date('2017/05/23'));
			expect(date).toBe('2017-05-23 00:00:00');
		});
	});

	describe("convertToServerFormat()", function() {
		it("Should be convert '/' to '-'", function() {
			date = Dashboard.tool.DateTime.convertToServerFormat(new Date('2017/05/23'));
			expect(date).toBe('2017-05-23');
		});
	});

	describe("addZero()", function() {
		it("Should be return a 0 before nb", function() {
			nb = Dashboard.tool.DateTime.addZero(6);
			expect(nb).toBe('06');
		});
		it("Should be return a 0 before nb", function() {
			nb = Dashboard.tool.DateTime.addZero('6');
			expect(nb).toBe('06');
		});
		it("Should be return without modif", function() {
			nb = Dashboard.tool.DateTime.addZero('nb');
			expect(nb).toBe('nb');
		});
		it("Should be return without modif", function() {
			nb = Dashboard.tool.DateTime.addZero(100);
			expect(nb).toBe(100);
		});
		it("Should be return a 0", function() {
			nb = Dashboard.tool.DateTime.addZero('');
			expect(nb).toBe('0');
		});
	});

	describe("replace()", function() {
		it("Should replace correctly", function() {
			replace = Dashboard.tool.DateTime.replace('azerty', 'az', 'qw');
			expect(replace).toBe('qwerty');
		});
		it("Should replace correctly", function() {
			replace = Dashboard.tool.DateTime.replace('azerty', 'az', 'qw');
			expect(replace).not.toBe('azerty');
		});
	});
});