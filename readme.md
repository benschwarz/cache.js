# cache.js
HTML5 localStorage with timed expiry

## Why? 

For ajax or heavy computational stuff that could probably be done once a minute, rather than every time the functions/events are called.

## Browser support

Anything that supports localStorage. You could use a [localStorage polyfill](https://gist.github.com/350433) to use it with older browsers. 

For brevity, the browsers that support localStorage are Firefox 3.5, Safari 4, IE8, Chrome 4+

## Usage

Add `cache.js` to your HTML, I've included a closure compressed `cache.min.js` for use online.
When you're in the middle of doing some heavy ajax, you can store the response in cache. 

    Cache.set('a unique identifier', {foo: 'bar'});

Your key of 'a unique identifier' can now be returned using the `get` method. 

    Cache.get('a unique identifier');

    => {foo: 'bar'}

It will only be available for 10000ms (the default)

### Getting a non existant key
    
    Cache.get('will be null');
    => null


Of course, you can set the expiry on a per key basis

    Cache.set('key', 'value', 5e4); // 50,000 Milliseconds

Or set a global expiry to be used for all caches

    Cache.expiry = 5e4 // 50K ms
    
Pulling it all together, you might do something like this:

    var cache = Cache.get("/url");
    if(cache) return cache;
    
    $.get("/url", function (response) {
      Cache.set("/url", response);
      // Do something awesome with your responseText    
    });

## Bugs / Contributions

* [Report a bug](http://github.com/benschwarz/cache.js/issues)
* To contribute, or send an idea wither github message me or fork the project. 
* If you're changing functionality, please perouse the `test/` directory first.
* You can run the tests on a Mac by running `open -a Safari test/suite.html`, otherwise, just open suite.html in a browser
