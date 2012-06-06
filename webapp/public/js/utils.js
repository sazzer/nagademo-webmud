define([], function() {
    /**
     * Mix two objects together
     * @param destination The object to mix into
     * @param source The object to mix from
     */
    function mix(destination, source) {
        for (var k in source) {
            if (source.hasOwnProperty(k) && !destination.hasOwnProperty(k)) {
                destination[k] = source[k];
            }
        }
        return destination;
    }

    /**
     * Create a Class with the defined details
     * @param properties The class properties
     * @param statics Any static details on the class
     * @param bases Any bases to mix in to the class
     */
    function Class(properties, statics, bases) {
        var result = function() {
            if (this.initializer) {
                this.initializer.apply(this, arguments);
            }
        }
        $.each(properties, function(i, v) {
            result.prototype[i] = v;
        });
        if (statics) {
            $.each(statics, function(i, v) {
                result[i] = v;
            });
        }
        if (bases) {
            $.each(bases, function(i, v) {
                mix(result.prototype, v);
            });
        }
        return result;
    }

    return {
        mix: mix,
        Class: Class
    };
});


