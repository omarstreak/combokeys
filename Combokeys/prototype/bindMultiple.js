/* eslint-env node, browser */
"use strict";

/**
 * binds multiple combinations to the same callback
 *
 * @param {Array} combinations
 * @param {Function} callback
 * @param {string|undefined} action
 * @returns void
 */
module.exports = function (combinations, callback, action) {
    var self = this;

    var unbinders = [];
    for (var j = 0; j < combinations.length; ++j) {
        unbinders.push(self.bindSingle(combinations[j], callback, action));
    }

    return function(){
    	for(var ii=0; ii<unbinders.length; ii++){
    		unbinders[ii]();
    	}
    };
};
