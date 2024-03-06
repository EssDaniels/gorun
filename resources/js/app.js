import './bootstrap';
import contact from './forms/contact';

(function ($) {
    // jQuery test
    if (window.jQuery) {
        console.log("jQuery is working...");
    }
})(jQuery);

var documentReady = function () {

    contact();

};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    documentReady();
} else {
    document.addEventListener("DOMContentLoaded", documentReady);
}
