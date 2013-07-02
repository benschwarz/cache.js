(function ( window ) {
	var storage = window.localStorage,
			prefix = 'cache.js -> ',

	Cache = {
		// Global cache expiry
		expiry: 1e4, // 10,000ms

		// Set an item to cache
		set: function (key, value, expiry) {
			expiry = +expiry || +this.expiry || 1e4;

			var cache_object = JSON.stringify({
				expiry: +new Date + expiry,
				data: value
			});

			storage.setItem(prefix + key, cache_object);

			return value;
		},

		// Get an item from cache
		get: function (key, nullCallback) {
			key = prefix + key;
			var cache = storage.getItem(key);

			if (cache) {
				var object = JSON.parse(cache);

				if (object.expiry > new Date) {
					return object.data;
				}	else {
					storage.removeItem(key);
				}
			}
			if (typeof nullCallback == 'function') {
				return nullCallback(key);
			}
			return null;
		},

		remove: function(key) {
		  storage.removeItem(prefix + key);
		}
	};

	window['Cache'] = Cache;
}( window ));
