import { Parameters } from './Parameters';
/**
 * Helper class that can be used to trigger notifications for components.
 */
export declare class Notifier {
    /**
     * Static method for triggering notifications for a component. For a component to be notified, it must
     * implement the [[INotifiable]] interface. This method calls INotifiable's [[INotifiable.notify notify]]
     * method to notify the component passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param component 		the component that is to be notified.
     * @param args              the parameters (arguments) to pass to the component.
     *
     * @see [[INotifiable]]
     */
    static notifyOne(correlationId: string, component: any, args: Parameters): void;
    /**
     * Static method for triggering notifications for multiple components. For a component to be notified,
     * it must implement the [[INotifiable]] interface. This method calls the static [[notifyOne]] method
     * for each of the components passed.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		the list of components that are to be notified.
     * @param args              the parameters (arguments) to pass to the components.
     *
     * @see [[notifyOne]]
     * @see [[INotifiable]]
     */
    static notify(correlationId: string, components: any[], args: Parameters): void;
}
