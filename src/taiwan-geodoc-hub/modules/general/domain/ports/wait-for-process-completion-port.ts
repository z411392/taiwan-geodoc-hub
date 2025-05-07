export abstract class WaitForProcessCompletionPort {
    abstract waitFor(processStateId: string): Promise<void>
}
