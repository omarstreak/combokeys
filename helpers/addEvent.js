/* eslint-env node, browser */
"use strict";

/**
 * cross browser add event method
 *
 * @param {Element|HTMLDocument} object
 * @param {string} type
 * @param {Function} callback
 * @param {boolean} useCapture specify if event listener should be bound on capture phase
 * @returns void
 */
module.exports = function (object, type, callback, useCapture) {
    if (object.addEventListener) {
        object.addEventListener(type, callback, useCapture);
        return;
    }

    object.attachEvent("on" + type, callback);
};
