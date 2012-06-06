define([], function() {
    /**
     * Mix two objects together
     * @param destination The object to mix into
     * @param source The object to mix from
     */
    function mix(destination, source) {
        if ($.isFunction(source)) {
            // Mixing in another class
            // destination must be a class here
            for (var k in source.prototype) {
                if (source.prototype.hasOwnProperty(k) && !destination.prototype.hasOwnProperty(k)) {
                    destination.prototype[k] = source.prototype[k];
                }
            }
            for (var k in source.prototype.constructor) {
                if (source.prototype.constructor.hasOwnProperty(k) && !destination.prototype.constructor.hasOwnProperty(k)) {
                    destination.prototype.constructor[k] = source.prototyp.constructore[k];
                }
            }
        }
        else if ($.isPlainObject(source)) {
            // Mixing in a simple object
            var target = destination;
            if ($.isFunction(target)) {
                target = target.prototype;
            }
            for (var k in source) {
                if (source.hasOwnProperty(k) && !target.hasOwnProperty(k)) {
                    target[k] = source[k];
                }
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
                mix(result, v);
            });
        }
        return result;
    }

    return {
        mix: mix,
        Class: Class
    };
});


