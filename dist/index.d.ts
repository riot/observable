interface ListenerCallback {
    (event: string, fn: Function): ObservableInstance;
}
interface EmitterCallback {
    (event: string, ...args: any[]): ObservableInstance;
}
export declare type ObservableInstance = {
    on: ListenerCallback;
    one: ListenerCallback;
    off: ListenerCallback;
    trigger: EmitterCallback;
};
declare const observable: (el?: any) => ObservableInstance;
export default observable;
