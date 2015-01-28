/* eslint-env node, browser */
"use strict";

/**
 * binds a single keyboard combination
 *
 * @param {string} combination
 * @param {Function} callback
 * @param {string=} action
 * @param {string=} sequenceName - name of sequence if part of sequence
 * @param {number=} level - what part of the sequence the command is
 * @returns void
 */
module.exports = function (combination, callback, action, sequenceName, level) {
    var self = this;

    // make sure multiple spaces in a row become a single space
    combination = combination.replace(/\s+/g, " ");

    var sequence = combination.split(" "),
        info;

    // if this pattern is a sequence of keys then run through this method
    // to reprocess each pattern one key at a time
    if (sequence.length > 1) {
        return self.bindSequence(combination, sequence, callback, action);
    }

    info = self.getKeyInfo(combination, action);

    // make sure to initialize arrays if this is the first time
    // a callback is added for this key
    self.callbacks[info.key] = self.callbacks[info.key] || {sequences: [], singles: []};

    // add this call back to the array
    // if it is a sequence put it at the beginning
    // if not put it at the end
    //
    // this is important because the way these are processed expects
    // the sequence ones to come first

    var callbacksArray = self.callbacks[info.key][sequenceName ? 'sequences' : 'singles'];
    var callbackDefinition = {
        callback: callback,
        modifiers: info.modifiers,
        action: info.action,
        seq: sequenceName,
        level: level,
        combo: combination
    };


    callbacksArray.push(callbackDefinition);

    return function(){
        var index = callbacksArray.indexOf(callbackDefinition);
        callbacksArray.splice(index, 1);
    };
};
