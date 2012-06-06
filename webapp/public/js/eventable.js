define(["radio"], function(radio) {
    /**
     * Eventable Mixin
     */
    var Eventable = {
        /**
         * Register a new listener on the event
         * @param name the name of the event
         * @param callback The listener callback
         */
        on: function(name, callback) {
            this._getEvent(name).subscribe(callback);
            return this;
        },
        /**
         * Unregister a listener from the event
         * @param name the name of the event
         * @param callback the callback to unregister
         */
        off: function(name, callback) {
            this._getEvent(name).unsubscribe(callback);
            return this;
        },
        /**
         * Actually fire the event
         * @param name the name of the event
         * @param data the event data
         */
        fire: function(name, data) {
            this._getEvent(name).broadcast(data);
        },
        /**
         * Get the event with the given name, creating it if necessary
         * @param name the name of the event
         * @return the event
         */
        _getEvent: function(name) {
            if (!this._EVENTS) {
                this._EVENTS = {};
            }
            if (!this._EVENTS[name]) {
                this._EVENTS[name] = radio(name);
            }
            return this._EVENTS[name];
        }
    }

    return Eventable;
});



