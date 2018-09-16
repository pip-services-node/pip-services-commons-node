import { Parameters } from './Parameters';
/**
 * Helper class that can be used to trigger execution of components.
 */
export declare class Executor {
    /**
     * Static method for triggering the execution of a component. For a component to be executed, it must
     * implement the [[IExecutable]] interface. This method calls IExecutable's [[IExecutable.execute execute]]
     * method to execute the component passed as 'component', using the [[Parameters]] passed as 'args'.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param component 		the component that is to be executed.
     * @param args              the parameters (arguments) to pass to the component for its execution.
     * @param callback 			the function to call when execution is complete. It will be called with
     *                          the result of the execution or with an error (if one is raised).
     *
     * @see [[IExecutable]]
     * @see [[Parameters]]
     */
    static executeOne(correlationId: string, component: any, args: Parameters, callback: (err: any, result: any) => void): any;
    /**
     * Static method for triggering the execution of multiple components. For a component to be executed,
     * it must implement the [[IExecutable]] interface. This method calls the static [[executeOne]] method
     * for each of the components passed, using the [[Parameters]] passed as 'args'.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param components 		the list of components that are to be executed.
     * @param args              the parameters (arguments) to pass to the components for their execution.
     * @param callback 			the function to call when execution is complete. It will be called with
     *                          the results of all executions or with an error (if one is raised).
     *
     * @see [[executeOne]]
     * @see [[IExecutable]]
     * @see [[Parameters]]
     */
    static execute(correlationId: string, components: any[], args: Parameters, callback: (err: any, results: any[]) => void): void;
}
