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

    return {
        mix: mix
    };
});


