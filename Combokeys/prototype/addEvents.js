/* eslint-env node, browser */
"use strict";
module.exports = function (useCapture) {
    var self = this,
        addEvent,
        element = self.element,
        handleKeyEvent,
        boundHandler;

    handleKeyEvent = require("./handleKeyEvent");

    addEvent = require("../../helpers/addEvent");
    boundHandler = handleKeyEvent.bind(self);
    addEvent(element, "keypress", boundHandler, useCapture);
    addEvent(element, "keydown", boundHandler, useCapture);
    addEvent(element, "keyup", boundHandler, useCapture);
};
