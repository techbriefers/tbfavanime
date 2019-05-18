/**
 * tbfavanime.js - https://techbriefers.com/animate-favicon-techbriefers-tbfavanime
 * Copyright © 2019 Techbriefers
 * @author Sana
 * @authorUrl techbriefers.com
 * @authorEmail techbriefers@gmail.com
 * @Required jQuery version x.x.x
 * @param Object options
 * @param options.images[mandatory] need to be an array of images(png or jpg) to be set as favicon
 * E.g.: $.tbFavAnime({images: ['red.png', 'blue.png']});
 *
 * @param options.interval need to be a number [500 recomended]
 * Eg: $.tbFavAnime({images: ['red.png', 'blue.png'], interval: '500'})
 *
 * @param options.type need to be a number [0 or 1 only]
 * @type  = 0 means always animate, 1 means animate on window focus change[dafault], 2 means animation reverse
 *
 * @param options.imgPath need to be a valid url [if not animation will not work]
 * Eg: $.tbFavAnime({images: ['red.png', 'blue.png'], imgPath: 'https://techbriefers.com/images'})
 * Eg: $.tbFavAnime({images: ['red.png', 'blue.png'], imgPath: '/images/favicons'})
 */
$.tbFavAnime = function (options) {
    if (options.images !== undefined) {
        if (options.images.length < 2) {
            console.warn('[tbFavAnime] Please Use alteast two images for animation.');
        }
        var favcounter = 1;
        var favimgs = options.images;
        var interval;
        var path_to_img = '';
        var defIco = $('link[rel=icon]').attr('href');
        var animeType = 1
        if (options.type !== undefined && (options.type == 0 || options.type == 2)) {
            animeType = options.type;
        }
        if (options.imgPath !== undefined && options.imgPath != '') {
            path_to_img = options.imgPath;
        }

        /**
         * Start Favicon animation
         */
        function startAnime() {
            if (options.images.length > 1) {
                interval = setInterval(function () {
                    if (favcounter == favimgs.length - 1) {
                        favcounter = 0;
                    } else {
                        favcounter++;
                    }
                    $('link[rel=icon]').attr('href', path_to_img + favimgs[favcounter]);
                }, (options.interval !== undefined) ? options.interval : 500);
            } else {
                $('link[rel=icon]').attr('href', path_to_img + favimgs[0]);
            }
        }

        /**
         * Stop Favicon animation
         */
        function stopAnime() {
            if (interval !== undefined) {
                clearInterval(interval);
            }
            $('link[rel=icon]').attr('href', defIco);
        }

        if (animeType == 0) {
            // For always animate
            startAnime();
        } else if (animeType == 2) {
            // For animating when window is focused, stop otherwise
            $(window).focus(function () {
                startAnime();
            });
            $(window).blur(function () {
                stopAnime();
            });
        } else {
            // For animating when window is not focused, stop otherwise
            $(window).blur(function () {
                startAnime();
            });
            $(window).focus(function () {
                stopAnime();
            });
        }

    } else {
        console.warn('[tbFavAnime] Please Use images.');
    }
}
