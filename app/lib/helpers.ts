

export default class Helpers {

    public static isValidEmail(str: string): boolean {
        return /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm.test(str);
    }
}
