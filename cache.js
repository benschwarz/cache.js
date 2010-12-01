window.Cache = {
  
	// Global cache expiry
	expiry: 1e4, // 10,000ms

	prefix: 'cache.js -> ',
	
	storage: window.localStorage,

	// Set an item to cache
	set: function (key, value, expiry) {
		expiry = +expiry || +this.expiry || 1e4;
		
		var cache_object = JSON.stringify({
			expiry: +new Date + expiry,
			data: value
		});

		this.storage.setItem(this.prefix + key, cache_object);

		return value;
	},

	// Get an item from cache
	get: function (key, nullCallback) {
		key = this.prefix + key;
		var cache = this.storage.getItem(key);

		if (cache) {
			var object = JSON.parse(cache);

			if (object.expiry > new Date) {
				return object.data;
			}	else {
				this.storage.removeItem(key);
			}
		}
		if (typeof nullCallback == 'function') {
			return nullCallback(key);
		}
		return null;
	},
	
	remove: function(key) {
	  this.storage.removeItem(this.prefix + key);
	}
};