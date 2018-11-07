import { SecureStore } from 'expo';

import Sin from './sin';


export default class Storage {

    /**
     * Get a value from local storage by key.
     *
     * @param key   string  The key to retrieve.
     * @returns {Promise<boolean>}
     */
    public static async get(key: string): Promise<any> {
        let data: any = false;

        try {
            const value = await SecureStore.getItemAsync(key);

            if (value !== null) {
                data = value;
            }
        } catch (error) {
            new Sin(error, 1);
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
    public static async set(key: string, value: string): Promise<any> {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            new Sin(error, 1);
        }
    }


    /**
     *
     * @param key
     * @returns {Promise<void>}
     */
    public static async delete(key: string): Promise<any> {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            new Sin(error, 1);
        }
    }
}
