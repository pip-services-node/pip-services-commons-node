/**
 * Defines broad categories of application errors.
 */
export declare class ErrorCategory {
    /**
     * Unknown or unexpected errors.
     */
    static readonly Unknown: string;
    /**
     * Internal errors caused by programming mistakes.
     */
    static readonly Internal: string;
    /**
     * Errors related to mistakes in user-defined configurations.
     */
    static readonly Misconfiguration: string;
    /**
     * Errors related to calling operations, which require the component
     * to be in a specific state.
     *
     * For example: business calls when the component is not ready.
     */
    static readonly InvalidState: string;
    /**
     * Errors that occur during connections to remote services.
     * They can be related to misconfiguration, network issues,
     * or the remote service itself.
     */
    static readonly NoResponse: string;
    /**
     * Errors returned by remote services or by the network
     * during call attempts.
     */
    static readonly FailedInvocation: string;
    /**
     * Errors in read/write file operations.
     */
    static readonly FileError: string;
    /**
     * Errors due to improper user requests.
     *
     * For example: missing or incorrect parameters.
     */
    static readonly BadRequest: string;
    /**
     * Access errors caused by missing user identity (authentication error)
     * or incorrect security permissions (authorization error).
     */
    static readonly Unauthorized: string;
    /**
     * Errors caused by attempts to access missing objects.
     */
    static readonly NotFound: string;
    /**
     * Errors raised by conflicts between object versions that were
     * posted by the user and those that are stored on the server.
     */
    static readonly Conflict: string;
    /**
     * Errors caused by calls to unsupported
     * or not yet implemented functionality.
     */
    static readonly Unsupported: string;
}
