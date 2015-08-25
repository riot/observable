riot.observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {}

  /**
   * private variables
   */

  var callbacks = {}

  /**
   * Listen to the given space separated list of `events` and execute the `callback` each time an event is triggered.
   * @param  { String } events - events ids
   * @param  { Function } fn - callback function
   * @returns { Object } el
   */

  el.on = function(events, fn) {
    if (typeof fn != 'function')  return el

    events.replace(/\S+/g, function(name, pos) {
      (callbacks[name] = callbacks[name] || []).push(fn)
      fn.typed = pos > 0
    })

    return el
  }

  /**
   * Removes the given space separated list of `events` listeners
   * @param   { String } events - events ids
   * @param   { Function } fn - callback function
   * @returns { Object } el
   */

  el.off = function(events, fn) {
    if (events == '*') callbacks = {}
    else {
      events.replace(/\S+/g, function(name) {
        if (fn) {
          var arr = callbacks[name]
          for (var i = 0, cb; cb = arr && arr[i]; ++i) {
            if (cb == fn) arr.splice(i--, 1)
          }
        } else delete callbacks[name]
      })
    }
    return el
  }

  /**
   * Listen to the given space separated list of `events` and execute the `callback` at most once
   * @param   { String } events - events ids
   * @param   { Function } fn - callback function
   * @returns { Object } el
   */

  el.one = function(events, fn) {
    function on() {
      el.off(events, on)
      fn.apply(el, arguments)
    }
    return el.on(events, on)
  }

  /**
   * Execute all callback functions that listen to the given space separated list of `events`
   * @param   { String } events - events ids
   * @returns { Object } el
   */

  el.trigger = function(events) {
    var args = [].slice.call(arguments, 1)

    events.replace(/\S+/g, function(name) {

      var fns = callbacks[name] || []

      for (var i = 0, fn; fn = fns[i]; ++i) {
        if (fn.busy) return
        fn.busy = 1
        fn.apply(el, fn.typed ? [name].concat(args) : args)
        if (fns[i] !== fn) i--
        fn.busy = 0
      }

      if (callbacks.all && name != 'all')
        el.trigger.apply(el, ['all', name].concat(args))

    })

    return el
  }

  return el

}
