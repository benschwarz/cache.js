window.Cache = {
	// Global cache expiry
	expiry: 1e4, // 10,000ms
	
	// Set an item to cache
	set: function (key, value, expiry) {
		var expiry = (expiry) ? expiry : this.expiry;
		
		var cache_object = JSON.stringify({
			expiry: (+new Date + expiry),
			data: value
		});
		
		localStorage.setItem('cache.js' + key, cache_object);
		
		return value;
	},
	
	// Get an item from cache
	get: function (key) {
		var cache = localStorage.getItem('cache.js' + key);

		if(cache !== null) {
			var object = JSON.parse(cache);
			
			if(object.expiry > new Date) {
				return object.data;
			}	else {
				localStorage.removeItem('cache.js' + key);
				return null;
			}
		} else if (Object.prototype.toString.call(arguments[1]) == '[object Function]') {
			return arguments[1](key);
		} else {
			return null;
		}
	}
};