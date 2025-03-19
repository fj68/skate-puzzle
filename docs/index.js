"use strict";
;
(function (window) {
    window.addEventListener('DOMContentLoaded', () => {
        const main = document.querySelector("#main");
        if (!main) {
            return;
        }
        main.textContent = "Hello, World!";
    });
})(window);
