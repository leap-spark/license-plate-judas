import Sentry from 'sentry-expo';


export default class ErrorHandler {

    public static async UI(message: string): Promise<void> {
        await ErrorHandler.LogMessage(message);

        alert(message);
    }


    public static async LogMessage(message: string, severity: string = 'info', showUIerror?: boolean): Promise<void> {

        if (showUIerror) {
            await ErrorHandler.UI(message);
        }

        return await Sentry.captureMessage(message, severity);
    }


    public static async LogException(message: string, showUIerror?: boolean): Promise<null> {

        if (showUIerror) {
            await ErrorHandler.UI(message);
        }

        await Sentry.captureException(message);

        return null;
    }
}
