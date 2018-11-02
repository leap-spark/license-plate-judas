import Sentry from 'sentry-expo';


export default class Sin {

    message = '';
    priority = 0;


    constructor(message, priority = 0) {
        this.message = message;
        this.priority = priority;

        this.processException();
    }


    async processException() {
        switch (this.priority) {
        case 0: // Error for User consumption
            alert(this.message);
            await this.reportMessage();
            break;
        case 1: // Log message to Sentry
            await this.reportMessage();
            break;
        case 2: // Report an exception
            await this.reportException();
            break;
        case 3:
            // slack or email notification
            break;
        default:
            break;
        }
    }


    async reportMessage() {
        await Sentry.captureMessage(this.message);
    }


    async reportException() {
        await Sentry.captureException(this.message);
    }
}
