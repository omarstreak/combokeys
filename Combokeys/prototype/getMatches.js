/* eslint-env node, browser */
"use strict";

/**
 * finds all callbacks that match based on the keycode, modifiers,
 * and action
 *
 * @param {string} character
 * @param {Array} modifiers
 * @param {Event|Object} e
 * @param {string=} sequenceName - name of the sequence we are looking for
 * @param {string=} combination
 * @param {number=} level
 * @returns {Array}
 */
module.exports = function (character, modifiers, e, sequenceName, combination, level) {
    var self = this,
        j,
        callback,
        matches = [],
        action = e.type,
        isModifier,
        modifiersMatch;

    // if there are no events related to this keycode
    if (!self.callbacks[character]) {
        return [];
    }

    isModifier = require("../../helpers/isModifier");
    // if a modifier key is coming up on its own we should allow it
    if (action === "keyup" && isModifier(character)) {
        modifiers = [character];
    }

    // loop through all callbacks for the key that was pressed
    // and see if any of them match
    var callbackDefinitions = self.callbacks[character].sequences.reverse().concat(self.callbacks[character].singles.reverse());

    //stupid reverse function mutates array
    self.callbacks[character].sequences.reverse();
    self.callbacks[character].singles.reverse();

    for (j = 0; j < callbackDefinitions.length; ++j) {
        var callbackDefinition = callbackDefinitions[j];

        // if a sequence name is not specified, but this is a sequence at
        // the wrong level then move onto the next match
        if (!sequenceName && callbackDefinition.seq && callbackDefinition.originalCallback.currentLevel !== callbackDefinition.level) {
            continue;
        }

        // if the action we are looking for doesn't match the action we got
        // then we should keep going
        if (action !== callbackDefinition.action) {
            continue;
        }

        // if this is a keypress event and the meta key and control key
        // are not pressed that means that we need to only look at the
        // character, otherwise check the modifiers as well
        //
        // chrome will not fire a keypress if meta or control is down
        // safari will fire a keypress if meta or meta+shift is down
        // firefox will fire a keypress if meta or control is down
        modifiersMatch = require("./modifiersMatch");
        if ((action === "keypress" && !e.metaKey && !e.ctrlKey) || modifiersMatch(modifiers, callbackDefinition.modifiers)) {
            matches.push(callbackDefinition);
        }
    }

    return matches;
};
