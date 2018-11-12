import { SecureStore } from 'expo';

import ErrorHandler from './errorHandler';


export default class Storage {


    public static async get(key: string): Promise<string | null> {

        try {
            const value: string | null = await SecureStore.getItemAsync(key);

            if (value !== null) {
                return value;
            }

        } catch (error) {
            await ErrorHandler.LogException(error);
        }

        return null;
    }

c
    public static async set(key: string, value: string): Promise<boolean> {
        try {
            await SecureStore.setItemAsync(key, value);
            return true;
        } catch (error) {
            await ErrorHandler.LogException(error);
            return false;
        }
    }


    public static async delete(key: string): Promise<boolean> {
        try {
            await SecureStore.deleteItemAsync(key);
            return true;
        } catch (error) {
            await ErrorHandler.LogException(error);
            return false;
        }
    }
}
