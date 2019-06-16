;(function(window, undefined) {const ALL_CALLBACKS = '*'
const define = Object.defineProperties
const entries = Object.entries

const on = (callbacks, el) => (event, fn) => {
  if (callbacks.has(event)) {
    callbacks.get(event).add(fn)
  } else {
    callbacks.set(event, new Set().add(fn))
  }

  return el
}

const off = (callbacks, el) => (event, fn) => {
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

const one = (callbacks, el) => (event, fn) => {
  function on(...args) {
    el.off(event, on)
    fn.apply(el, args)
  }
  return el.on(event, on)
}

const trigger = (callbacks, el) => (event, ...args) => {
  const fns = callbacks.get(event)

  if (fns) fns.forEach(fn => fn.apply(el, args))

  if (callbacks.get(ALL_CALLBACKS) && event !== ALL_CALLBACKS) {
    el.trigger(ALL_CALLBACKS, event, ...args)
  }

  return el
}

const observable = function(el) { // eslint-disable-line
  const callbacks = new Map()
  const methods = {on, off, one, trigger}

  el = el || {}

  define(el,
    entries(methods).reduce((acc, [key, method]) => {
      acc[key] = {
        value: method(callbacks, el),
        enumerable: false,
        writable: false,
        configurable: false
      }

      return acc
    }, {})
  )

  return el
}
  /* istanbul ignore next */
  // support CommonJS, AMD & browser
  if (typeof exports === 'object')
    module.exports = observable
  else if (typeof define === 'function' && define.amd)
    define(function() { return observable })
  else
    window.observable = observable

})(typeof window != 'undefined' ? window : undefined);