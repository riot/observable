const ALL_CALLBACKS = '*'
const define = Object.defineProperties
const entries = Object.entries

type CallbacksSet = Set<Function>;
type EventCallbacksMap = Map<string, CallbacksSet>

interface ListenerCallback {
    (event: string, fn: Function): ObservableInstance
}

interface EmitterCallback {
    (event: string, ...args: any[]): ObservableInstance
}

export type ObservableInstance = {
    on: ListenerCallback,
    one: ListenerCallback,
    off: ListenerCallback,
    trigger: EmitterCallback,
};

const on = (
    callbacks: EventCallbacksMap,
    el: ObservableInstance
): ListenerCallback => (

    (event, fn): ObservableInstance => {

        const stored = callbacks.get(event);

        if (stored) {
            stored.add(fn);
        } else {

            const fns: CallbacksSet = new Set();
            fns.add(fn);

            callbacks.set(event, fns);
        }

        return el
    }
)

const off = (
    callbacks: EventCallbacksMap,
    el: ObservableInstance
): ListenerCallback => (

    (event, fn): ObservableInstance => {

        if (event === ALL_CALLBACKS && !fn) {

            callbacks.clear()
        } else {

            if (fn) {
                const fns = callbacks.get(event)

                if (fns) {

                    fns.delete(fn)
                    if (fns.size === 0) callbacks.delete(event)
                }
            } else callbacks.delete(event)
        }

        return el
    }
);

const one = (
    _: EventCallbacksMap,
    el: ObservableInstance
): ListenerCallback => (

    (event, fn): ObservableInstance => {

        function on(...args: any[]) {

            el.off(event, on);
            fn.apply(el, args)
        }

        return el.on(event, on);
    }
);

const trigger = (
    callbacks: EventCallbacksMap,
    el: ObservableInstance
): EmitterCallback => (

    (event, ...args): ObservableInstance => {

        const fns = callbacks.get(event)

        if (fns) fns.forEach(fn => fn.apply(el, args))

        if (callbacks.get(ALL_CALLBACKS) && event !== ALL_CALLBACKS) {
            el.trigger(ALL_CALLBACKS, event, ...args)
        }

        return el
    }
)

const observable = function (el: any = {}): ObservableInstance {

    const callbacks = new Map();
    const methods = { on, off, one, trigger }

    define(el,
        entries(methods).reduce((acc: any, [key, method]: [string, Function]) => {

            acc[key] = {
                value: method(callbacks, (el as ObservableInstance)),
                enumerable: false,
                writable: false,
                configurable: false
            }

            return acc
        }, {})
    )

    return el
}

export default observable;