/****************************************************
 * Example in-app code for animation-router
 ***************************************************/


/**
 * Facilitate transitions for the Main Menu
 */
router.defineRoute('main-menu', {

    // Executes each time we load the `main-menu` route
    load: function () {
        var width = window.innerWidth;
        $('.strip-1').css('-webkit-transform', 'translateX(' + (width + 326) + 'px)');
        $('.strip-2').css('-webkit-transform', 'translateX(' + (width + 226) + 'px) scaleX(-1)');
        $('.strip-3').css('-webkit-transform', 'translateX(-' + (width + 326) + 'px) scaleX(-1)');
        setTimeout(function() {
            $('.middle.two h1').html('Welcome!');
            $('.middle.two h3').html('How can I help you?');
            $('.bar-4,.bar-5,.bar-6').css('-webkit-transform', 'translateX(0)');
            $('.middle.two, .logo').fadeIn('slow');
        }, 500);
    },

    // Executes each time we unload the route
    unload: function () {
        $('.bar-4,.bar-5,.bar-6').css('-webkit-transform', 'translateX(-100%)');
        $('.middle.two, .logo').fadeOut();
    }
});


/**
 * Facilitate transitions for the "I'm here to make a delivery" form
 */
router.defineRoute('delivery-form', {

    // Executes each time we load the `delivery-form` route
    load: function () {
        $('.strip-1').css('-webkit-transform', 'translateX(0px)');
        $('.strip-2, .strip-3').css('-webkit-transform', 'translateX(0px) scaleX(-1)');
        $('.title, .bar-2, .bar-3').css('-webkit-transform', 'translateX(0)');
        $('.title h1').html('Delivery');
        // setTimeout(function () {
        //    $('.middle.one').fadeIn();
        // }, 500);
        setTimeout(function() {
            $('.middle.two h1').html('I am here to<br>make a delivery.');
            $('.middle.two h3').html('');
            $('.bar-3 h1').html('CONFIRM');
            $('.middle.two').fadeIn();
        }, 500);
    },

    // Executes each time we unload the route
    unload: function () {
        $('.title, .bar-2').css('-webkit-transform', 'translateX(-100%)');
        $('.bar-3').css('-webkit-transform', 'translateX(100%)');
        $('.middle.one').fadeOut();
        setTimeout(function() {
            $('button.select').removeClass('selected');
        }, 500);
    }
});


/**
 * Facilitate transitions for the "I'm here to meet someone" form
 */
router.defineRoute('meeting-form', {

    // Executes each time we load the `meeting-form` route
    load: function () {
        matchEmail = null;
        matchName = null;
        phoneNumber = null;
        $('.strip-1').css('-webkit-transform', 'translateX(0px)');
        $('.strip-2, .strip-3').css('-webkit-transform', 'translateX(0px) scaleX(-1)');
        $('.title, .bar-2').css('-webkit-transform', 'translateX(0)');
        $('.title h1').html('Meeting');
        $('.bar-3 h1').html('SUBMIT');
        setTimeout(function() {
            $('.middle.three').fadeIn();
        }, 500);
    },

    // Executes each time we unload the route
    unload: function () {
        $('.title, .bar-2').css('-webkit-transform', 'translateX(-100%)');
        $('.bar-3').css('-webkit-transform', 'translateX(100%)');
        $('.middle.three').fadeOut();
        setTimeout(function() {
            $('input[type=text]').val('');
            meetingWith = visitorName = '';
            $('.bar-3').css('bottom', '5%');
        }, 1000);
    }
});


/**
 * Facilitate transitions for the "No solicitors" screen
 */
router.defineRoute('solicitation', {

    // Executes each time we load the `solicitation` route
    load: function () {
        $('.strip-1').css('-webkit-transform', 'translateX(0px)');
        $('.strip-2, .strip-3').css('-webkit-transform', 'translateX(0px) scaleX(-1)');
        $('.title, .bar-2').css('-webkit-transform', 'translateX(0)');
        $('.title h1').html('No Solicitors');
        setTimeout(function() {
            $('.middle.two h1').html('');
            $('.middle.two h3').html('Solicitation or distribution of printed materials is strictly prohibited on these premises.');
            $('.middle.two').fadeIn();
        }, 500);
    },

    // Executes each time we unload the route
    unload: function () {
        $('.title, .bar-2').css('-webkit-transform', 'translateX(-100%)');
        $('.bar-3').css('-webkit-transform', 'translateX(100%)');
        $('.middle.two').fadeOut();
    }
});


/**
 * Facilitate transitions for the email sent confirmation screen
 */
router.defineRoute('email-confirmation', {

    // Executes each time we load the `email-confirmation` route
    load: function () {
        $('.strip-1').css('-webkit-transform', 'translateX(0px)');
        $('.strip-2, .strip-3').css('-webkit-transform', 'translateX(0px) scaleX(-1)');
        $('.title, .bar-2').css('-webkit-transform', 'translateX(0)');
        $('.title h1').html('Thanks!');
        setTimeout(function() {
            $('.middle.two h1').html('A message has been sent to your contact letting them know you have arrived.');
            $('.middle.two h3').html('');
            $('.middle.two').fadeIn();
        }, 500);
    },

    // Executes each time we unload the route
    unload: function () {
        $('.title, .bar-2').css('-webkit-transform', 'translateX(-100%)');
        $('.bar-3').css('-webkit-transform', 'translateX(100%)');
        $('.middle.two').fadeOut();
    }
});


/**
 * Facilitate transitions for the delivery confirmation screen
 */
router.defineRoute('delivery-confirmation', {

    // Executes each time we load the `delivery-confirmation` route
    load: function () {
        $('.strip-1').css('-webkit-transform', 'translateX(0px)');
        $('.strip-2, .strip-3').css('-webkit-transform', 'translateX(0px) scaleX(-1)');
        $('.title, .bar-2').css('-webkit-transform', 'translateX(0)');
        $('.title h1').html('Thanks!');
        setTimeout(function() {
            $('.middle.two h1').html('Someone will be<br>out shortly.');
            $('.middle.two h3').html('');
            $('.middle.two').fadeIn();
        }, 500);
    },

    // Executes each time we unload the route
    unload: function () {
        $('.title, .bar-2').css('-webkit-transform', 'translateX(-100%)');
        $('.bar-3').css('-webkit-transform', 'translateX(100%)');
        $('.middle.two').fadeOut();
    }
});


/**
 * Facilitate transitions when the app loses internet connectivity
 */
router.defineRoute('offline', {

    // Executes each time we load the `offline` route
    load: function () {
        $('.strip-1').css('-webkit-transform', 'translateX(0px)');
        $('.strip-2, .strip-3').css('-webkit-transform', 'translateX(0px) scaleX(-1)');
        $('.title, .bar-2').css('-webkit-transform', 'translateX(0)');
        $('.title h1').html('No Connection');
        setTimeout(function() {
            $('.middle.two h1').html('For assistance call<br><br>+1 (206) 428-6030 x050');
            $('.middle.two h3').html('');
            $('.middle.two').fadeIn();
        }, 500);
    },

    // Executes each time we unload the route
    unload: function () {
        $('.title, .bar-2').css('-webkit-transform', 'translateX(-100%)');
        $('.bar-3').css('-webkit-transform', 'translateX(100%)');
        $('.middle.two').fadeOut();
    }
});
