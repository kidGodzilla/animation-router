# animation-router
A JavaScript UI router for creating ambitious transitions between application states

## Goals

In many of my applications, I aim to do somewhat ambitious transitions between application states or views.

Instead of just a quick `fadeOut` or `slideIn`, I may want to time specific elements to take more interesting actions, individually.

However, in a large application, this can quickly become a mess.

So, I created a small object that could transition between any two routes by calling the appropriate setup and teardown scripts, respectively.

## Dependencies

The router itself has no dependencies. However, the example is designed for jQuery.

## Getting Started

After including `animation-router.js` in your project, you will have a `router` object.

You can use this to register your routes, and transition to a new route.

### Registering a route

There are many examples provided, however, the basic pattern resembles this:

    /**
     * Facilitate transitions for the Main Menu
     */
    router.defineRoute('main-menu', {

        // Executes each time we load the `main-menu` route
        load: function () {
            // You execute some code here
        },

        // Executes each time we unload the route
        unload: function () {
            // You execute some code here
        }
    });

This gives you a route named `main-menu`, which has an optional setup and teardown script that executes arbitrary code when performing a route transition.

### Transitioning

It is very simple to transition between routes.

The router object remembers the name of the current route, so you only need to provide the route you wish to transition to.

For example:

    router.transitionTo('main-menu')

Would transition your app into the `main-menu` route.