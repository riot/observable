const ALL_CALLBACKS = '*'
const define = Object.defineProperties
const entries = Object.entries

function on(callbacks, el) {
  return (event, fn) => {
    if (callbacks.has(event)) {
      callbacks.get(event).add(fn)
    } else {
      callbacks.set(event, new Set().add(fn))
    }

    return el
  }
}

function off(callbacks, el) {
  return (event, fn) => {
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
}

function one(callbacks, el) {
  return (event, fn) => {
    function on(...args) {
      el.off(event, on)
      fn.apply(el, args)
    }
    return el.on(event, on)
  }
}


function trigger(callbacks, el) {
  return (event, ...args) => {
    const fns = callbacks.get(event)

    if (fns) fns.forEach(fn => fn.apply(el, args))

    if (callbacks.get(ALL_CALLBACKS) && event !== ALL_CALLBACKS) {
      el.trigger.apply(el, [ALL_CALLBACKS, event].concat(args))
    }

    return el
  }
}

const observable = function(el) { // eslint-disable-line
  el = el || {}

  /**
   * Private variables
   */
  const callbacks = new Map()
  const methods = {on, off, one, trigger}

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
export default observable
