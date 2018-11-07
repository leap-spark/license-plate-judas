import Sentry from 'sentry-expo';
import { Alert } from 'react-native';


export default class Sin {

    private readonly message: string;
    private readonly priority: number;
    private readonly level: string;


    /**
     * Sin constructor.
     *
     * @constructor
     * @param {string}  message  The error message.
     * @param {int}     priority Priority level, can be 0, 1, 2, or 3.
     * @param {string}  level    The error level, 'info', 'error', 'warning', 'debug', 'fatal', 'critical'.
     */
    public constructor(message: string, priority: number = 0, level: string = 'error') {
        this.message = message;
        this.priority = priority;
        this.level = level;

        this.processException();
    }


    private async processException(): Promise<any> {
        switch (this.priority) {
        case 0: // Error for User consumption

            Alert.alert(
                'Uh Oh',
                this.message,
            );

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


    private async reportMessage(): Promise<any> {
        return await Sentry.captureMessage(this.message, { level: this.level });
    }


    private async reportException(): Promise<any> {
        return await Sentry.captureException(this.message);
    }
}
