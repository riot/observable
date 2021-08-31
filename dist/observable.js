(function(window) {const ALL_CALLBACKS = '*'
  const define = Object.defineProperties
  const entries = Object.entries
  const on = (callbacks, el) => ((event, fn) => {
    const stored = callbacks.get(event)
    if (stored) {
      stored.add(fn)
    }
    else {
      const fns = new Set()
      fns.add(fn)
      callbacks.set(event, fns)
    }
    return el
  })
  const off = (callbacks, el) => ((event, fn) => {
    if (event === ALL_CALLBACKS && !fn) {
      callbacks.clear()
    }
    else {
      if (fn) {
        const fns = callbacks.get(event)
        if (fns) {
          fns.delete(fn)
          if (fns.size === 0)
            callbacks.delete(event)
        }
      }
      else
        callbacks.delete(event)
    }
    return el
  })
  const one = (_, el) => ((event, fn) => {
    function on(...args) {
      el.off(event, on)
      fn.apply(el, args)
    }
    return el.on(event, on)
  })
  const trigger = (callbacks, el) => ((event, ...args) => {
    const fns = callbacks.get(event)
    if (fns)
      fns.forEach(fn => fn.apply(el, args))
    if (callbacks.get(ALL_CALLBACKS) && event !== ALL_CALLBACKS) {
      el.trigger(ALL_CALLBACKS, event, ...args)
    }
    return el
  })
  const observable = function(el = {}) {
    const callbacks = new Map()
    const methods = { on, off, one, trigger }
    define(el, entries(methods).reduce((acc, [key, method]) => {
      acc[key] = {
        value: method(callbacks, el),
        enumerable: false,
        writable: false,
        configurable: false
      }
      return acc
    }, {}))
    return el
  }
  // support CommonJS, AMD & browser
  if (typeof exports === 'object')
    module.exports = observable
  else if (typeof define === 'function' && define.amd)
    define(function() { return observable })
  else
    window.observable = observable

})(typeof window != 'undefined' ? window : undefined)