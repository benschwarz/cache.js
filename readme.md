# cache.js
A wrapper around localStorage that adds a timed expiry to items stored in your cache.

## Why? 

For ajax or heavy computational stuff that could probably be done once a minute, rather than every time the functions/events are called.

## Browser support

Anything that supports localStorage. You could use a [https://gist.github.com/350433](localStorage polyfill) to use it with older browsers. 

For bervity, the browsers that support localStorage are Firefox 3.5, Safari 4, IE8, Chrome 4+

## Usage

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
    
## Bugs / Contributions

* [http://github.com/benschwarz/cache.js/issues](Report a bug)
* To contribute, or send an idea wither github message me or fork the project. 
* If you're changing functionality, please perouse the `test/` directory first.
* You can run the tests on a Mac by running `open -a Safari test/suite.html`, otherwise, just open suite.html in a browser
