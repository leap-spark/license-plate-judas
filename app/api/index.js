import config from "../config";


/**
 * The API class
 *
 * Encapsulates methods pertaining to performing API requests against Airtable.
 *
 * @since  0.0.1
 * @author Aaron Arney
 */
export default class API {


    /**
     * Perform the basic fetch request to Airtable.
     *
     * @since 0.0.1
     *
     * @param method    string The HTTP method to perform (get, post, update)
     * @param table     string The Airtable table to perform the action on
     * @param data      object An object of fields and values
     * @returns {Promise<*>}
     */
    static async doRequest(method, table, data) {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`,
        };

        // TODO: Do better validation here
        if (data !== undefined) {
            headers.fields = data;
        }

        try {
            const response = await fetch(`https://api.airtable.com/v0/${config.base}/${table}`, {
                method,
                headers,
            });

            return await response.json();
        } catch (error) {
            return [];
        }
    }


    /**
     * Executes a GET request.
     *
     * @since 0.0.1
     *
     * @param table     string The Airtable table to perform the action on
     * @returns {Promise<void>}
     */
    static async get(table) {

        if (table === '' || table === undefined) {
            throw new Error('Table parameter required when invoking API.get');
        }

        const response = await this.doRequest('GET', table);
        const { records } = await response;

        return records;
    }


    /**
     * Executes a POST request.
     *
     * @since 0.0.1
     *
     * @param table string The Airtable table to perform the action on
     * @param data  object An object containing fields and values
     * @returns {Promise<void>}
     */
    static async post(table, data) {

        if (table === '' || table === undefined) {
            throw new Error('Table parameter required when invoking API.post');
        }

        if (data === '' || data === undefined) {
            throw new Error('Data parameter required when invoking API.post');
        }

        const response = await this.doRequest('POST', table, data);
        const { records } = await response;

        return records;
    }
}
