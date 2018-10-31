import Sentry from 'sentry-expo';


export default class ErrorHandler {

    message = '';
    priority = 0;


    constructor(message, priority) {
        this.message = message;
        this.priority = priority;

        this.report();
    }


    interrogatePriority() {
        switch (this.priority) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
        }
    }


    report() {
        Sentry.withScope(scope => Sentry.captureException(this.message));
    }
}
