/**
 * Helper function to get item from localStorage.
 * @param {string} key localStorage key name 
 * @returns {*} Decoded data
 */
const LOAD = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
/**
 * Helper function to save item to localStorage.
 * @param {string} key localStorage key name
 * @param {*} data Data to save
 * @returns None
 */
const SAVE = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}
/**
 * Helper function to remove item from localStorage.
 * @param {string} key localStorage key name
 * @returns None
 */
 const CLEAR = (key) => {
    localStorage.removeItem(key);
}
/** String to prefix localStorage keys. */
const PREFIX = "APP-LOCAL-STORE-";
/** Key of list of all other keys.
 *  @example "APP-LOCAL-STORE-MASTER-LIST"
*/
const MASTER_LIST_NAME = PREFIX + "MASTER-LIST";
/** List of item keys in localStorage. */
const GET_KEYS = () => {
    // localStorage.setItem(MASTER_LIST_NAME, JSON.stringify([]));
    // SAVE(MASTER_LIST_NAME, []);
    const LIST = LOAD(MASTER_LIST_NAME);
    if (LIST === null) {
        SAVE(MASTER_LIST_NAME, []);
        return [];
    } else {
        return LIST;
    }
}
/** Provides a clean way to read/write from localStorage.
 *  @example
 *  import storage from "./api";
 *  storage.getItems();
 */
const storage = {
    /** Get a copy of array of item keys in local localStorage.
     *  @param None
     *  @returns {Array} Array of keys
     *  */
    getKeys: () => {
        return GET_KEYS();
    },
    /** Remove an item from local localStorage.
     *  @param {string} key Item key
     *  @returns None
     *  */ 
    remove: (key) => {
        const PREFIX_KEY = PREFIX + key;
        const NEW_KEYS = [];
        if (GET_KEYS().includes(PREFIX_KEY)) {
            CLEAR(PREFIX_KEY);
            GET_KEYS().map((key) => {return(() => {
                if (PREFIX_KEY !== key) NEW_KEYS.push(key);
            })});
            SAVE(MASTER_LIST_NAME, NEW_KEYS);
        }
    },
    /** DANGER Removes all items from local localStorage.
     *  @param None None
     *  @returns None
     *  */ 
    removeAll: () => {
        const KEYS = GET_KEYS();
        for(let i = 0; i < KEYS.length; i++) {
            CLEAR(KEYS[i]);
        }
        CLEAR(MASTER_LIST_NAME);
    },
    /** Save something to localStorage.
     *  @param {string} key localStorage key name
     *  @param {*} data Data to save
     *  @returns None
     *  */
    set: (key, data) => {
        const PREFIX_KEY = PREFIX + key;
        SAVE(PREFIX_KEY, data);
        if (!GET_KEYS().includes(PREFIX_KEY)) {
            const NEW_KEYS = GET_KEYS();
            NEW_KEYS.push(PREFIX_KEY);
            SAVE(MASTER_LIST_NAME, NEW_KEYS);
        }
    },
    /** Read something from localStorage.
     *  @param {string} key localStorage key name
     *  @returns {*} Data
     *  */
    get: (key) => {
        const PREFIX_KEY = PREFIX + key;
        if (GET_KEYS().includes(PREFIX_KEY)) {
            return LOAD(PREFIX_KEY);
        }
    }
}

export default storage;