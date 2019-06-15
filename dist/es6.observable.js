const observable = function(el) { // eslint-disable-line

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {}

  /**
   * Private variables
   */
  const callbacks = new Map()
  const ALL_CALLBACKS = '*'
  const methodAttributes = {
    enumerable: false,
    writable: false,
    configurable: false
  }

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value(event, fn) {
        if (callbacks.has(event)) {
          callbacks.get(event).add(fn)
        } else {
          callbacks.set(event, new Set().add(fn))
        }

        return el
      },
      ...methodAttributes
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value(event, fn) {
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
      },
      ...methodAttributes
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value(event, fn) {
        function on(...args) {
          el.off(event, on)
          fn.apply(el, args)
        }
        return el.on(event, on)
      },
      ...methodAttributes
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value(event, ...args) {
        const fns = callbacks.get(event)

        if (fns) fns.forEach(fn => fn.apply(el, args))

        if (callbacks.get(ALL_CALLBACKS) && event !== ALL_CALLBACKS) {
          el.trigger.apply(el, [ALL_CALLBACKS, event].concat(args))
        }

        return el
      },
      ...methodAttributes
    }
  })

  return el
}
export default observable
