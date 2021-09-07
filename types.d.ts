interface ListenerCallback<T extends any, Callback = (...args: T[]) => void> {
    (event: string, fn: Callback): ObservableInstance<T>
}

interface EmitterCallback<T extends any> {
    (event: string, ...args: T[]): ObservableInstance<T>
}

export declare type ObservableInstance<T extends any> = {
    on: ListenerCallback<T>
    one: ListenerCallback<T>
    off: ListenerCallback<T>
    trigger: EmitterCallback<T>
}

declare const observable: <T>(el?: T) => ObservableInstance<T>

export default observable;
