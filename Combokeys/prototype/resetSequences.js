/* eslint-env node, browser */
"use strict";

/**
 * resets all sequence counters except for the ones passed in
 *
 * @param {Object} doNotReset
 * @returns void
 */
module.exports = function (activeSequences) {
    activeSequences = activeSequences || [];

    for(var key in this.callbacks){
        var callbackDefinitions = this.callbacks[key].sequences;
        for(var ii=0; ii<callbackDefinitions.length; ii++){
            if(activeSequences.indexOf(callbackDefinitions[ii].originalCallback) === -1){
                callbackDefinitions[ii].originalCallback.currentLevel = 0;
            }
        }
    }

    this.nextExpectedAction = activeSequences.length > 0;
};
