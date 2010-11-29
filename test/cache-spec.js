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

});