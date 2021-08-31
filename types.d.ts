export declare type ObservableInstance = {

    on: (event: String, fn: Function) => ObservableInstance,
    one: (event: String, fn: Function) => ObservableInstance,
    off: (event: String, fn: Function) => ObservableInstance,
    trigger: (event: String, ...args: any[]) => ObservableInstance
}

export default interface observable {

    (el?: any): any & ObservableInstance
};