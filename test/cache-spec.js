describe("Cache", function() {
	
  beforeEach(function() {
    localStorage.clear();
  });

	it("should have a default expiry time of 10000", function () {
		expect(Cache.expiry).toEqual(10000);
	});

	it("should return the value that was set", function () {
		expect(Cache.set("key", {foo: "bar"})).toEqual({foo: "bar"})
	});

	it("should get an item from cache", function () {
		Cache.set("key", {setter: "getter"})
		expect(Cache.get("key")).toEqual({setter: "getter"})
	});
	
	it("should return null for an empty key", function () {
		expect(Cache.get("empty")).toBeNull();
	})
	
	it("should expire after 100ms", function () {
		Cache.set("key", "expire", 100);
		expect(Cache.get("key")).toEqual("expire");
		
		setTimeout(function (){
			expect(Cache.get("key")).toBeNull();
		}, 100);
	});
	
	it("should expire after the default expiry", function () {
		Cache.expiry = 250;
		Cache.set("default expiry", "value");
		expect(Cache.get("default expiry")).toEqual("value");
		
		setTimeout(function () {
			expect(Cache.get("default expiry")).toBeNull();
		}, 500)
	});

	it("should store keys with a prepended 'cache.js' string to avoid collisions", function () {
		Cache.set("foo", "bar");
		expect(localStorage.getItem("cache.jsfoo")).toBeDefined();
	});

	it("should call an optional function if value is null", function () {
		var result = Cache.get('empty with function', function (key) {
			return 'bacon';
		});
		expect(result).toEqual('bacon');
	});

	it("should not call optional function if value is zero", function () {
		Cache.set('zero', 0);
		var result = Cache.get('zero', function (key) {
			return 1000;
		});
		expect(result).toEqual(0);
	});

	it("should not call optional function if value exists", function () {
		Cache.set('existing', 'bacon');
		var result = Cache.get('existing', function (key) {
			return 'porcupine';
		});
		expect(result).toEqual('bacon');
	});
	
	it("should expose and allow to replace storage object", function() {
	  var getItemCalled = false, setItemCalled = false;
	  
	  Cache.storage = {
	    getItem: function() { getItemCalled = true; },
	    setItem: function() { setItemCalled = true; },
	    removeItem: function() { }
	  };
	  
	  Cache.set('foo123', 'bar123');
	  expect(setItemCalled).toEqual(true);
	  
	  Cache.get('foo123');
	  expect(setItemCalled).toEqual(true);
	  
	  expect(window.localStorage.getItem(Cache.prefix + 'foo123')).toBeNull();
	});

});