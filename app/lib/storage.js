import { SecureStore } from 'expo';

export default class Storage {

    /**
     * Get a value from local storage by key.
     *
     * @param key   string  The key to retrieve.
     * @returns {Promise<boolean>}
     */
    static async get(key) {
        let data = false;

        try {
            const value = await SecureStore.getItemAsync(key);

            if (value !== null) {
                data = value;
            }
        } catch (error) {
            console.error(error);
        }

        return data;
    }


    /**
     * Store a value by key.
     *
     * @param key   string The key to store to.
     * @param value string The value to store.
     * @returns {Promise<*|boolean>}
     */
    static async set(key, value) {
        let data = true;

        try {
            data = await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error(error);
            data = false;
        }

        return data;
    }


    /**
     *
     * @param key
     * @returns {Promise<void>}
     */
    static async delete(key) {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error(error);
        }
    }
}
