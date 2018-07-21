import { Parameters } from './Parameters';
/**
 * Helper class that triggers notification for components
 */
export declare class Notifier {
    /**
     * Triggers notification for component that implement INotifiable interface.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		list of components to be notified.
     * @param args 				set of parameters to pass to notified components.
     */
    static notifyOne(correlationId: string, component: any, args: Parameters): void;
    /**
     * Triggers notification for components that implement INotifiable interface.
     *
     * @param correlationId 	unique business transaction id to trace calls across components.
     * @param components 		list of components to be notified.
     * @param args 				set of parameters to pass to notified components.
     */
    static notify(correlationId: string, components: any[], args: Parameters): void;
}
