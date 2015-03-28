/****************************************************
 * Router.js
 ***************************************************/

/**
 * Generic core object
 */
var router = (function () {

    /**
     * Router datastore getter
     */
    function get (key) {
        return router.data[key];
    }


    /**
     * Router datastore setter
     */
    function set (key, value) {
        return router.data[key] = value;
    }


    /**
     * Executes an array of functions, Sequentially
     */
    function executeFunctionArray (functionArray, args) {
        if (typeof(functionArray) !== "object" || !functionArray.length) return false;

        for (var i = 0; i < functionArray.length; i++) {
            args = functionArray[i](args);
        }

        return args;
    }


    /**
     * Registers a new global on the router object
     */
    function registerGlobal (key, value) {

        if (typeof(router[key]) === "undefined") {

            if (typeof(value) === "function") {

                router[key] = function () {
                    /**
                     * Prepare Arguments
                     *
                     * TODO: (Source: MDN)
                     * You should not slice on arguments because it prevents optimizations in JavaScript
                     * engines (V8 for example). Instead, try constructing a new array by iterating
                     * through the arguments object.
                     */
                    // var args = Array.prototype.slice.call(arguments);
                    var args = arguments;
                    if (args.length === 0) args = null;

                    /**
                     * Execute Before hooks on the arguments
                     */
                    if (router.hooks[key] && router.hooks[key].before && router.hooks[key].before.length > 0)
                        args = executeFunctionArray(router.hooks[key].before, args);

                    /**
                     * Execute the intended function
                     */
                    result = value.apply(this, args);

                    /**
                     * Execute After hooks on the result
                     */
                    if (router.hooks[key] && router.hooks[key].after && router.hooks[key].after.length > 0)
                        result = executeFunctionArray(router.hooks[key].after, result);

                    return result;
                };

            } else {

                // If the global is being set to any other type of object or value, just do it.
                router[key] = value;

            }

        } else {
            console.log("ERROR: A module attempted to write to the `" + key + "` namespace, but it is already being used.");
        }
    }


    /**
     * Registers a new before hook on a router method
     *
     * Example:
     * We could add a before hook to generateUID which always set the separator to `+`
     *
     * ```javascript
     * router.before('generateUID', function(args) {
     *     if (args) args[0] = '+';
     *     return args;
     * });
     * ```
     *
     * Then, when we called generateUID('-'), we would get a GUID separated by `+` instead.
     *
     * TODO: Consider moving router.before & router.after to a private namespace to they cannot
     * be easily accessed by 3rd party code.
     *
     */
    function before (key, func) {
        if (!router.hooks[key]) router.hooks[key] = {};
        if (!router.hooks[key].before) router.hooks[key].before = [];
        router.hooks[key].before.push(func);
    }


    /**
     * Registers a new after hook on a router method
     */
    function after (key, func) {
        if (!router.hooks[key]) router.hooks[key] = {};
        if (!router.hooks[key].after) router.hooks[key].after = [];
        router.hooks[key].after.push(func);
    }


    /**
     * Return public objects & methods
     */
    obj = {
        data: {},
        hooks: {},
        executeFunctionArray: executeFunctionArray,
        registerGlobal: registerGlobal,
        before: before,
        after: after,
        get: get,
        set: set
    };

    return obj;
})();





/****************************************************
 * Router.js-specific functionality
 ***************************************************/

/**
 * Transition to a named route
 *
 * ```javascript
 * // Transition to the main menu
 * router.transitionTo('main-menu');
 * ```
 */
router.registerGlobal('transitionTo', function (route) {
    var currentPage = router.get('currentPage');
    var debounce = router.get('debounce');

    if (route !== currentPage && !debounce) {
        // Set transitioning state and initiate debouncing
        router.set('transitioning', true);
        router.set('debounce', true);

        // Unload the current route
        router.unload(currentPage);

        // Load the new route
        router.load(route);

        // Update the values for our current and previous page
        router.set('previousPage', currentPage);
        router.set('currentPage', route);

        // Reset debouncing values & transitioning
        setTimeout(function() {
            router.set('debounce', true);
            router.set('transitioning', false);
        }, 500); // This is the debounce value
    }
});


/**
 * Load a route
 */
router.registerGlobal('load', function (route) {
    if(router.routes[route] && router.routes[route].load)
        var f = router.routes[route].load;

    if (f && typeof(f) === "function") return f();
    return false;
});


/**
 * Unload a route
 */
router.registerGlobal('unload', function (route) {
    if(router.routes[route] && router.routes[route].unload)
        var f = router.routes[route].unload;

    if (f && typeof(f) === "function") return f();
    return false;
});


/**
 * Define a new route or overwrite an existing route
 *
 *
 * ```javascript
 * // Transition to the main menu
 * router.defineRoute('main-menu', {
 *   load: function () {
 *      $('#mainMenu').fadeIn();
 *   },
 *   unload: function () {
 *      $('#mainMenu').fadeOut();
 *   }
 * });
 * ```
 */
router.registerGlobal('defineRoute', function (route, params) {
    if (router.routes && !router.routes[route])
        router.routes[route] = {};

    if (route && params && params.load)
        router.routes[route].load = params.load;

    if (route && params && params.unload)
        router.routes[route].unload = params.unload;

    return true;
});


/**
 * Instantiate an Empty routes object to hold transition functions
 */
router.registerGlobal('routes', {});


/**
 * Facilitate easily transitioning back to the previous route/state
 */
router.registerGlobal('goBack', function () {
    router.transitionTo(previousPage);
});
