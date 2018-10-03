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
     * @param params    array  Additional params to pass with the request
     * @returns {Promise<*>}
     */
    static async doRequest(method = this.isRequired(), table = this.isRequired(), data, params = '') {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`,
        };

        // TODO: Do better validation here
        if (data !== undefined || data !== {}) {
            headers.fields = data;
        }

        try {
            const response = await fetch(`https://api.airtable.com/v0/${config.base}/${table}${params}`, {
                method,
                headers,
            });

            return await response.json();
        } catch (error) {
            return [];
        }
    }


    static isRequired() {
        throw new Error('Parameter required when invoking API method');
    }


    /**
     * Executes a GET request.
     *
     * @since 0.0.1
     *
     * @param table  string The Airtable table to perform the action on
     * @param params string A string containing additional params
     * @returns {Promise<void>}
     */
    static async get(table = this.isRequired(), params) {
        const response = await this.doRequest('GET', table, {}, params);
        const { records } = await response;

        return records;
    }


    /**
     * Executes a POST request.
     *
     * @since 0.0.1
     *
     * @param table string The Airtable table to perform the action on
     * @param data  string An object containing fields and values
     * @returns {Promise<void>}
     */
    static async post(table = this.isRequired(), data = this.isRequired(), params) {
        const response = await this.doRequest('POST', table, data, params);
        const { records } = await response;

        return records;
    }
}
