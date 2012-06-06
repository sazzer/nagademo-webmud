define([], function() {
    /**
     * Helper to see of HTML5 Local Storage is supported
     */
    function localStorageSupported() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    /**
     * Get an object from local storage
     * @param id The ID of the object to get
     */
    function get(id) {
        if (localStorageSupported()) {
            return localStorage.getItem(id);
        }
        else {
            throw new Error("Local Storage is not supported");
        }
    }

    /**
     * Set an object in local storage
     * @param id The ID of the object to set
     * @param value The value of the object to set
     */
    function set(id, value) {
        if (localStorageSupported()) {
            localStorage.setItem(id, value);
        }
        else {
            throw new Error("Local Storage is not supported");
        }
    }

    /**
     * Remove an object from local storage
     * @param id The ID of the object to remove
     */
    function remove(id) {
        if (localStorageSupported()) {
            localStorage.removeItem(id);
        }
        else {
            throw new Error("Local Storage is not supported");
        }
    }

    return {
        get: get,
        set: set,
        remove: remove
    };
});

