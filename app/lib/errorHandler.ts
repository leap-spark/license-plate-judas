import Sentry from 'sentry-expo';
import { Alert } from 'react-native';


export default class ErrorHandler {

    public static async UI(message: string): Promise<void> {
        await ErrorHandler.LogMessage(message);

        Alert.alert('Uh Oh', message);
    }


    public static async LogMessage(message: string, severity = 'info'): Promise<void> {
        return await Sentry.captureMessage(message, severity);
    }


    public static async LogException(message: string): Promise<null> {
        await Sentry.captureException(message);

        return null;
    }
}
