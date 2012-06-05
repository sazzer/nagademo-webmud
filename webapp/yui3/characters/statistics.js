YUI.add("webmud-character-stats", function(Y) {
    /**
     * Model Class that represents the Stats of a Character
     */
    Y.namespace("WebMud.Character").Stats = Y.Base.create(
        "characterStats",
        Y.Base,
        [],
        {
            /**
             * Validator to ensure the stats stay in range
             * @param v The value to validate
             */
            _statValidator: function(v) {
                return Y.Lang.isNumber(v) && 
                    v >= 1 &&
                    v <= 50;
            },
            /**
             * Get the cost of the stats in character points
             * @return the character point cost
             */
            _getCost: function() {
                var stats = ["body", "muscle", "finesse", "spirit", "reason", "presence"],
                    cost = 0;

                Y.each(stats, function(next) {
                    var value = this.get(next);
                    cost += this._computeStatCost(value);
                }, this);
                return cost;
            },

            /**
             * Helper to compute the character point cost of a given stat value
             * @param v the stat value
             * @return the character point cost
             */
            _computeStatCost: function(v) {
                return v;
            }
        }, {
            ATTRS: {
                /**
                 * The cost of the stats in character points
                 */
                cost: {
                    readonly: true,
                    getter: "_getCost"
                },
                /**
                 * The Body stat
                 */
                body: {
                    value: 10,
                    validator: "_statValidator"
                },
                /**
                 * The Muscle stat
                 */
                muscle: {
                    value: 10,
                    validator: "_statValidator"
                },
                /**
                 * The Finesse stat
                 */
                finesse: {
                    value: 10,
                    validator: "_statValidator"
                },
                /**
                 * The Spirit stat
                 */
                spirit: {
                    value: 10,
                    validator: "_statValidator"
                },
                /**
                 * The Reason stat
                 */
                reason: {
                    value: 10,
                    validator: "_statValidator"
                },
                /**
                 * The Presence stat
                 */
                presence: {
                    value: 10,
                    validator: "_statValidator"
                }
            }
        });
}, "0.0.1", {
    requires: [
        "model",
        "array-extras"
    ]
});


